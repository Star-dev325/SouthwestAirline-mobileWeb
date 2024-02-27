import proxyquire from 'proxyquire';
import Q from 'q';
import { sandbox } from 'sinon';
import environment from 'src/shared/api/apiRoutes';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import waitFor from 'test/unit/helpers/waitFor';
import uri from 'url';

const sinon = sandbox.create();

describe('rest client', () => {
  let loggingApi;
  let ajaxSpy;

  beforeEach(() => {
    ajaxSpy = sinon.spy();

    loggingApi = proxyquire('src/shared/api/loggingApi', {
      'src/shared/api/restClient': {
        ajax: ajaxSpy
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call sendErrorLog for any error', (done) => {
    const defer = Q.defer();
    const messages = [
      {
        action: '',
        component: '',
        count: 1,
        details: 'Sorry! We had a problem. Please try again.',
        errorCode: 503599340,
        httpCode: 400,
        level: LOG_LEVEL.ERROR,
        location: '',
        message: 'Sorry! We had a problem. Please try again.'
      }
    ];
    const expectedErrorInfo = {
      url: uri.resolve(environment.logging, 'v1/logging/mobile/log'),
      body: { messages },
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json'
    };

    defer.reject({
      responseJSON: {
        code: 503599340,
        message: 'Sorry! We had a problem. Please try again.'
      },
      status: 400
    });
    
    loggingApi.sendErrorLog(messages);

    waitFor.untilAssertPass(() => {
      expect(ajaxSpy).to.have.been.calledWith(expectedErrorInfo);
    }, done);
  });

  it('should call sendInfoLog when it is called for logging purposes', (done) => {
    const messages = {
      flow: 'air/booking',
      infoData: {
        amount: 10000,
        isApplePayErrorCode: false
      }
    };
    const expectedInfoData = {
      url: uri.resolve(environment.logging, 'v1/logging/mobile/log'),
      body: { messages },
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json'
    };

    loggingApi.sendInfoLog(messages);

    waitFor.untilAssertPass(() => {
      expect(ajaxSpy).to.have.been.calledWith(expectedInfoData);
    }, done);
  });
});
