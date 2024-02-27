import * as SwaUiBootstrap from '@swa-ui/bootstrap';
import { sandbox } from 'sinon';
import { branchListenerHelper, fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as LoggingHelper from 'src/shared/api/helpers/loggingHelper';
import * as LoggingApi from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import createMockStore from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('bootstrapHelper', () => {
  const mockLocation = '/mock/location/pathname';
  const mockStringifiedError = 'Mock Stringified Error';
  const mockTimestamp = 1234567890;
  let event;
  let getBootstrapDataStub;
  let sendErrorLogStub;
  let setJourneyBannerToggleStub;
  let store;
  let warnStub;

  beforeEach(() => {
    getBootstrapDataStub = sinon.stub(SwaUiBootstrap, 'getBootstrapData');
    sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');
    setJourneyBannerToggleStub = sinon
      .stub(SharedActions, 'setJourneyBannerToggle')
      .returns({ type: 'setJourneyBannerToggle' });
    sinon.stub(LoggingHelper, 'getErrorLogTimestamp').returns(mockTimestamp);
    sinon.stub(LoggingHelper, 'getLocationPathname').returns(mockLocation);
    sinon.stub(LoggingHelper, 'stringifyDetails').returns(mockStringifiedError);
    store = mockStore({});
    
    warnStub = sinon.stub(console, 'warn');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('branchListenerHelper', () => {
    it('should return a function', () => {
      const result = branchListenerHelper();

      expect(result).to.be.a('function');
    });

    it('should not call setJourneyBannerToggle when event is other than didShowJourney and didCloseJourney', () => {
      branchListenerHelper(store)(event);

      expect(setJourneyBannerToggleStub).to.have.not.been.called;
    });

    it('should call setJourneyBannerToggle with true when event is didShowJourney', () => {
      event = 'didShowJourney';

      branchListenerHelper(store)(event);

      expect(setJourneyBannerToggleStub).to.have.been.calledWith(true);
    });

    it('should call setJourneyBannerToggle with false when event is didCloseJourney', () => {
      event = 'didCloseJourney';

      branchListenerHelper(store)(event);

      expect(setJourneyBannerToggleStub).to.have.been.calledWith(false);
    });
  });

  describe('fetchBootstrapData', () => {
    const bootstrapData = 'data';
    const defaultData = 'defaultData';
    const testKey = 'key';
    const error = new Error(`Cannot find module ${testKey}`);
    const expectedErrorMessage = `Failed to load startup data: Cannot find module ${testKey}`;

    it('should call getBootstrapData and return data', () => {
      getBootstrapDataStub.returns(bootstrapData);

      const result = fetchBootstrapData(testKey);

      expect(getBootstrapDataStub).to.have.been.calledWith(testKey);
      expect(result).to.eq(bootstrapData);
    });

    describe('when getBootstrapData fails', () => {
      const expectedLogBody = (message) => [
        {
          action: '',
          component: 'bootstrapHelper',
          count: 1,
          details: mockStringifiedError,
          errorCode: null,
          httpCode: null,
          level: LOG_LEVEL.ERROR,
          location: mockLocation,
          message,
          timestamp: mockTimestamp
        }
      ];

      it('should invoke a console warning', () => {
        getBootstrapDataStub.throws(error);
  
        fetchBootstrapData(testKey, defaultData);
  
        expect(warnStub).to.have.been.calledWith(expectedErrorMessage);
      });

      it('should log undefined error', () => {
        getBootstrapDataStub.throws(error);
  
        fetchBootstrapData(testKey);

        expect(sendErrorLogStub).to.have.been.calledWith(expectedLogBody(expectedErrorMessage));
      });
  
      it('should log defaultValue when supplied', () => {
        getBootstrapDataStub.throws(error);
  
        fetchBootstrapData(testKey, defaultData);
  
        expect(sendErrorLogStub).to.have.been.calledWith(expectedLogBody(expectedErrorMessage));
      });
    });
  });
});
