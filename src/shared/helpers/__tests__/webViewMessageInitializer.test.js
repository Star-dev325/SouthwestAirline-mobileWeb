jest.mock('src/shared/api/helpers/loggingHelper', () => ({
  getErrorLogTimestamp: jest.fn().mockReturnValue(1234567890),
  getLocationPathname: jest.fn().mockReturnValue('/mock/location/pathname')
}));
jest.mock('src/shared/api/loggingApi', () => ({
  sendErrorLog: jest.fn()
}));
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import webViewMessageInitializer from 'src/shared/helpers/webViewMessageInitializer';

describe('webViewMessageInitializer', () => {
  it('should initialize window.api.message', () => {
    webViewMessageInitializer();

    expect(window.api.message).toBeDefined();
  });

  it('should initialize window.swa.webViewMessage', () => {
    webViewMessageInitializer();

    expect(window.swa.webViewMessage).toBeDefined();
  });

  describe('when interface not ready', () => {
    const windowApiMessagePath = 'window.api.message';
    const windowSwaWebViewMessagePath = 'window.swa.webViewMessage';
    const mockErrorMessage = (messageName) => `Attempted to call ${messageName} before it's interface has been established.`;
    const mockErrorLog = {
      action: '',
      component: 'webViewMessageInitializer',
      count: 1,
      details: '',
      errorCode: null,
      httpCode: null,
      level: LOG_LEVEL.ERROR,
      location: '/mock/location/pathname',
      timestamp: 1234567890
    };

    it(`should send error log when initialized function on ${windowApiMessagePath} is called`, () => {
      webViewMessageInitializer();

      window.api.message();
      
      expect(sendErrorLog).toHaveBeenCalledWith([
        { ...mockErrorLog, message: mockErrorMessage('window.api.message') }
      ]);
    });
  
    it(`should send error log when initialized function on ${windowSwaWebViewMessagePath} is called`, () => {
      webViewMessageInitializer();
      window.swa.webViewMessage();
  
      expect(sendErrorLog).toHaveBeenCalledWith([{ ...mockErrorLog, message: mockErrorMessage('window.swa.webViewMessage') }]);
    });
  });
});
