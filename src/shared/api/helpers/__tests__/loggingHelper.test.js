jest.mock('dayjs', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    unix: jest.fn(() => (1234567890))
  }))
}));
jest.mock('src/shared/api/loggingApi', () => ({ sendErrorLog: jest.fn() }));
jest.mock('src/shared/helpers/browserObject', () => ({
  location: {
    pathname: '/mock/location/pathname'
  }
}));
jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2022-01-01T00:00:00Z').getTime());

import * as LoggingHelper from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import BrowserObject from 'src/shared/helpers/browserObject';

describe('loggingHelper', () => {
  const component = '<MockComponent>';
  const message = 'This is a mock message.';
  const mockApiPathname = '/api/pathname';
  const mockError = {
    stack: 'This is mock stack details.',
    status: 400,
    statusText: 'This is mock status text.',
    url: mockApiPathname
  };
  const mockLocationPathname = '/mock/location/pathname';
  const mockTimestamp = 1234567890;
  const mockLog = {
    action: mockApiPathname, 
    component,
    count: 1,
    details: "{\"stack\":\"This is mock stack details.\",\"statusText\":\"This is mock status text.\"}",
    errorCode: null,
    httpCode: 400,
    location: mockLocationPathname,
    message,
    timestamp: mockTimestamp
  };
  const mockErrorLog = {
    ...mockLog,
    level: LOG_LEVEL.ERROR
  };
  const mockWarnLog = {
    ...mockLog,
    level: LOG_LEVEL.WARN
  };
  
  afterEach(() => {
    BrowserObject.location = { pathname: mockLocationPathname };
    jest.clearAllMocks();
  });

  describe('getErrorLogTimestamp', () => {
    it('should return the dayjs unix time as a string', () => {
      const result = LoggingHelper.getErrorLogTimestamp();

      expect(result).toEqual(mockTimestamp);
    });
  });

  describe('getLocationPathname', () => {
    it('should return the dayjs unix time as a string', () => {
      const result = LoggingHelper.getLocationPathname();

      expect(result).toEqual(mockLocationPathname);
    });
  });

  describe('stringifyDetails', () => {
    describe('when details are valid', () => {
      it('should return the stringified details', () => {
        const mockDetails = { mockValue: 'mockValue' };
        const result = LoggingHelper.stringifyDetails(mockDetails);
  
        expect(result).toEqual("{\"mockValue\":\"mockValue\"}");
      });
    });

    describe('when details are undefined', () => {
      it('should return an empty string', () => {
        const result = LoggingHelper.stringifyDetails(undefined);
  
        expect(result).toEqual('');
      });
    });
    
    describe('when details throw an error', () => {
      it('should return the stringified details', () => {
        jest.spyOn(JSON, 'stringify').mockImplementationOnce(() => {
          throw new Error('Mock Error');
        });
        const mockDetails = { mockValue: 'mockValue' };
        const result = LoggingHelper.stringifyDetails(mockDetails);

        expect(result).toContain('Error: Mock Error');
      });
    });
  });

  describe('encryptionProviderLoggerAdapter', () => {
    describe('error', () => {
      it('should call sendErrorLog with correct log', () => {
        LoggingHelper.encryptionProviderLoggerAdapter.error(message, component, mockError);
  
        expect(sendErrorLog).toHaveBeenCalledWith([mockErrorLog]);
      });

      it('should use default values when no window location', () => {
        BrowserObject.location = undefined;

        LoggingHelper.encryptionProviderLoggerAdapter.error(message, component, mockError);
  
        expect(sendErrorLog).toHaveBeenCalledWith([{ ...mockErrorLog, location: 'MWEB' }]);
      });

      it('should use default values when no window location pathname', () => {
        BrowserObject.location.pathname = undefined;

        LoggingHelper.encryptionProviderLoggerAdapter.error(message, component, mockError);
  
        expect(sendErrorLog).toHaveBeenCalledWith([{ ...mockErrorLog, location: 'MWEB' }]);
      });

      it('should use default values when none are given', () => {
        LoggingHelper.encryptionProviderLoggerAdapter.error();
  
        expect(sendErrorLog).toHaveBeenCalledWith([
          {
            ...mockErrorLog,
            action: '',
            component: '',
            details: '{}',
            errorCode: null,
            httpCode: null,
            message: ''
          }
        ]);
      });

      it('should use empty string for httpCode when no status is received', () => {
        const mockErrorNoStatus = {
          ...mockError,
          status: undefined
        };

        LoggingHelper.encryptionProviderLoggerAdapter.error(message, component, mockErrorNoStatus);
  
        expect(sendErrorLog).toHaveBeenCalledWith([
          {
            ...mockErrorLog,
            httpCode: null
          }
        ]);
      });

      it('should use empty string for errorCode when no code is received', () => {
        const mockErrorNoStatus = {
          ...mockError,
          code: undefined
        };

        LoggingHelper.encryptionProviderLoggerAdapter.error(message, component, mockErrorNoStatus);
  
        expect(sendErrorLog).toHaveBeenCalledWith([
          {
            ...mockErrorLog,
            errorCode: null
          }
        ]);
      });
    });

    describe('warn', () => {
      it('should call sendErrorLog with correct log', () => {
        LoggingHelper.encryptionProviderLoggerAdapter.warn(message, component, mockError);
  
        expect(sendErrorLog).toHaveBeenCalledWith([mockWarnLog]);
      });

      it('should use default values when none are given', () => {
        LoggingHelper.encryptionProviderLoggerAdapter.warn();
  
        expect(sendErrorLog).toHaveBeenCalledWith([
          { 
            ...mockWarnLog,
            action: '',
            component: '',
            details: '{}',
            errorCode: null,
            httpCode: null,
            message: ''
          }
        ]);
      });
    });
  });
});