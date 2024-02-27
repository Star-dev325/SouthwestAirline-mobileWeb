jest.mock('src/shared/api/helpers/loggingHelper', () => ({
  getErrorLogTimestamp: jest.fn().mockReturnValue(1234567890),
  getLocationPathname: jest.fn().mockReturnValue('/mock/location/pathname'),
  stringifyDetails: jest.fn().mockReturnValue('Mock stringified details')
}));
jest.mock('src/shared/helpers/urlHelper', () => ({
  getNormalizedRoute: jest.fn()
}));

import {
  hasValidExternalPaymentRedirectUrl,
  toExternalPaymentPageError
} from 'src/externalPayment/helpers/externalPaymentPageHelper';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

describe('externalPaymentPageHelper', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('hasValidExternalPaymentRedirectUrl', () => {
    it('should return true when url is in whitelist', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      getNormalizedRoute.mockReturnValueOnce('/air/booking/purchase.html');

      expect(hasValidExternalPaymentRedirectUrl('/air/booking/purchase.html', {
        AIR_BOOKING: getNormalizedRoute({ routeName: 'purchase' })
      })).toBe(true);
    });

    it('should return false when url is not in whitelist', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      getNormalizedRoute.mockReturnValueOnce('air/booking');
      
      expect(hasValidExternalPaymentRedirectUrl('/tampered/url', {
        AIR_BOOKING: getNormalizedRoute({ routeName: 'purchase' })
      })).toBe(false);
    });

    it('should return false when url is not a string', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      getNormalizedRoute.mockReturnValueOnce('air/booking');
      
      expect(hasValidExternalPaymentRedirectUrl(undefined, {
        AIR_BOOKING: getNormalizedRoute({ routeName: 'purchase' })
      })).toBe(false);
    });
  });

  describe('toExternalPaymentPageError', () => {
    const message = 'invalid redirectUrl';
    const mockLocationPathname = '/mock/location/pathname';
    const mockRedirectUrl = '/mock/redirect/url';
    const mockTimestamp = 1234567890;

    it('should return formatted error log when redirectUrl passed in', () => {
      expect(toExternalPaymentPageError(mockRedirectUrl)).toEqual([
        {
          action: '',
          component: 'externalPaymentPage',
          count: 1,
          details: `invalid redirectUrl: ${mockRedirectUrl}`,
          errorCode: null,
          httpCode: null,
          level: LOG_LEVEL.ERROR,
          location: mockLocationPathname,
          message,
          timestamp: mockTimestamp
        }
      ]);
    });

    it('should return formatted error log when redirectUrl is undefined', () => {
      expect(toExternalPaymentPageError(undefined)).toEqual([
        {
          action: '',
          component: 'externalPaymentPage',
          count: 1,
          details: 'invalid redirectUrl: undefined',
          errorCode: null,
          httpCode: null,
          level: LOG_LEVEL.ERROR,
          location: mockLocationPathname,
          message,
          timestamp: mockTimestamp
        }
      ]);
    });
  });
});
