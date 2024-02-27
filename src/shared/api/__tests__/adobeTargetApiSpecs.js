import _ from 'lodash';
import sinonModule from 'sinon';
import * as AdobeTargetApi from 'src/shared/api/adobeTargetApi';
import * as LoggingHelper from 'src/shared/api/helpers/loggingHelper';
import * as LoggingApi from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';

const sinon = sinonModule.sandbox.create();

describe('AdobeTargetApi', () => {
  const mockLocationPathname = '/mock/location/pathname';
  const mockStringifiedError = 'Mock Stringified Error';
  const mockTimestamp = 1234567890;
  const getErrorLog = (status, component) => [
    {
      action: '',
      component: component,
      count: 1,
      details: mockStringifiedError,
      errorCode: null,
      httpCode: null,
      level: LOG_LEVEL.ERROR,
      location: mockLocationPathname,
      message: `Failed to ${_.startCase(component).toLowerCase()} for mbox with a status of ${status}`,
      timestamp: mockTimestamp
    }
  ];
  let getErrorLogTimestampStub;
  let getLocationPathnameStub;
  let sendErrorLogStub;
  let stringifyDetailsStub;

  beforeEach(() => {
    getErrorLogTimestampStub = sinon.stub(LoggingHelper, 'getErrorLogTimestamp').returns(mockTimestamp);
    getLocationPathnameStub = sinon.stub(LoggingHelper, 'getLocationPathname').returns(mockLocationPathname);
    sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');
    stringifyDetailsStub = sinon.stub(LoggingHelper, 'stringifyDetails').returns(mockStringifiedError);
  });

  afterEach(() => {
    sinon.restore();
    global.adobe = undefined;
  });

  context('getOffer', () => {
    it('should return an empty object when adobe is undefined', () =>
      AdobeTargetApi.getOffer('', {}).catch((response) => {
        expect(response).to.deep.equal({});
      }));

    context('when adobe target has a getOffers method', () => {
      let getOfferStub;

      beforeEach(() => {
        getOfferStub = sinon.stub();
        global.adobe = { target: { getOffer: getOfferStub } };
      });

      it('should call getOffer with passed in parameters', () => {
        const mbox = 'mbox';
        const params = { key: 'value' };
        const timeout = 2500;

        AdobeTargetApi.getOffer(mbox, params, timeout);

        expect(getOfferStub).to.have.been.calledWith({
          mbox,
          params,
          timeout,
          success: sinon.match.any,
          error: sinon.match.any
        });
      });

      it('should call getOffer with default timeout', () => {
        const mbox = 'mbox';
        const params = { key: 'value' };

        AdobeTargetApi.getOffer(mbox, params);

        expect(getOfferStub).to.have.been.calledWith({
          mbox,
          params,
          timeout: 5000,
          success: sinon.match.any,
          error: sinon.match.any
        });
      });
    });

    context('when adobe target invokes callbacks', () => {
      it('should return resolved promise for success callback', () => {
        const response = 'response';

        global.adobe = { target: { getOffer: (params) => params.success(response) } };

        const mbox = 'mbox';
        const params = { key: 'value' };
        const timeout = 2500;

        return AdobeTargetApi.getOffer(mbox, params, timeout).then((result) => {
          expect(result).to.equal(response);
        });
      });

      it('should return rejected promise for error callback', () => {
        const status = 'status';
        const error = new Error('error', 'status');

        global.adobe = { target: { getOffer: (params) => params.error(status, error) } };

        const mbox = 'mbox';
        const params = { key: 'value' };
        const timeout = 2500;
        const response = AdobeTargetApi.getOffer(mbox, params, timeout);

        return response.catch((result) => {
          expect(result.status).to.equal(status);
          expect(result.error).to.equal(error);
          expect(sendErrorLogStub).to.have.been.calledWith(getErrorLog(result.status, 'getOffer'));
        });
      });
    });
  });

  context('getOffers', () => {
    it('should return an empty object when adobe is undefined', () =>
      AdobeTargetApi.getOffers([]).catch((response) => {
        expect(response).to.deep.equal({});
      }));

    context('when adobe target has a getOffers method', () => {
      let getOffersStub;

      beforeEach(() => {
        getOffersStub = sinon.stub();
        global.adobe = { target: { getOffers: getOffersStub } };
      });

      it('should call getOffers with passed in segments', () => {
        const chaseCodes = {
          offerIdentifier: 'offerIdentifier',
          acquisitionSourceCodes: 'acquisitionSourceCodes',
          highValueIndicator: 'false'
        };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2', params: chaseCodes }];
        const expectedMboxes = [
          { index: 0, name: 'mbox1', parameters: {} },
          { index: 1, name: 'mbox2', parameters: chaseCodes }
        ];
        const timeout = 2500;

        AdobeTargetApi.getOffers(mboxes, timeout);

        expect(getOffersStub).to.have.been.calledWith({
          request: {
            execute: {
              mboxes: expectedMboxes
            }
          },
          timeout
        });
      });

      it('should call getOffers with default timeout', () => {
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2' }];
        const expectedMboxes = [
          { index: 0, name: 'mbox1', parameters: {} },
          { index: 1, name: 'mbox2', parameters: {} }
        ];

        AdobeTargetApi.getOffers(mboxes);

        expect(getOffersStub).to.have.been.calledWith({
          request: {
            execute: {
              mboxes: expectedMboxes
            }
          },
          timeout: 5000
        });
      });

      it('should handle call success', () => {
        const response = 'response';
        const mbox = 'mbox';
        const params = { key: 'value' };
        const options = { mbox, params };
        const timeout = 2500;

        global.adobe = { target: { getOffers: () => new Promise((resolve) => resolve(response)) } };

        AdobeTargetApi.getOffers(options, timeout).then((result) => {
          expect(result).to.equal(response);
        });
      });

      it('should handle call failure', () => {
        const mbox = 'mbox';
        const params = { key: 'value' };
        const options = [{ mbox, params }];
        const status = 'Mock Status';
        const timeout = 2500;

        global.adobe = { target: { getOffers: () => Promise.reject(status) } };
        const response = AdobeTargetApi.getOffers(options, timeout);

        return response.catch((result) => {
          expect(getErrorLogTimestampStub).to.have.been.called;
          expect(getLocationPathnameStub).to.have.been.called;
          expect(result.status).to.equal(status);
          expect(sendErrorLogStub).to.have.been.calledWith(getErrorLog(status, 'getOffers'));
          expect(stringifyDetailsStub).to.have.been.called;
        });
      });
    });
  });
});
