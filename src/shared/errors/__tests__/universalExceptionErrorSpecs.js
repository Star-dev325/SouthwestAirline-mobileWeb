import sinonModule from 'sinon';
import * as LoggingHelper from 'src/shared/api/helpers/loggingHelper';
import * as LoggingApi from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import { addUniversalErrorListener, handleError } from 'src/shared/errors/universalExceptionError';

const sinon = sinonModule.sandbox.create();

describe('Universal Exception Error', () => {
  const mockLocationPathname = '/mock/location/pathname';
  const mockStringifiedError = 'Mock Stringified Error';
  const mockTimestamp = 1234567890;
  let addEventListenerStub;
  let getErrorLogTimestampStub;
  let getLocationPathnameStub;
  let sendErrorLogStub;
  let stringifyDetailsStub;

  beforeEach(() => {
    addEventListenerStub = sinon.stub(window, 'addEventListener');
    getErrorLogTimestampStub = sinon.stub(LoggingHelper, 'getErrorLogTimestamp').returns(mockTimestamp);
    getLocationPathnameStub = sinon.stub(LoggingHelper, 'getLocationPathname').returns(mockLocationPathname);
    sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');
    stringifyDetailsStub = sinon.stub(LoggingHelper, 'stringifyDetails').returns(mockStringifiedError);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should log an error when handling an error', () => {
    addUniversalErrorListener();

    expect(addEventListenerStub).to.have.been.called;
  });

  it('should not call addEventListener if window.addEventListener is undefined', () => {
    window.addEventListener = undefined;
    addUniversalErrorListener();

    expect(addEventListenerStub).to.not.have.been.called;
  });

  it('should log an error when handling an error', () => {
    const mockErrorMessage = 'MOCK ERROR MESSAGE';
    const mockError = new Error(mockErrorMessage);
    const mockErrors = [
      {
        action: '',
        component: 'UniversalExceptionResolver',
        count: 1,
        details: mockStringifiedError,
        errorCode: 900000000,
        httpCode: null,
        level: LOG_LEVEL.ERROR,
        location: mockLocationPathname,
        message: mockErrorMessage,
        timestamp: mockTimestamp
      }
    ];

    handleError(mockError);

    expect(getErrorLogTimestampStub).to.have.been.called;
    expect(getLocationPathnameStub).to.have.been.called;
    expect(sendErrorLogStub).to.have.been.calledWith(mockErrors);
    expect(stringifyDetailsStub).to.have.been.called;
  });
});
