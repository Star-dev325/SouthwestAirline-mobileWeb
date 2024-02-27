import {
  getSameDayCurrencyType,
  getSameDayFareSummary,
  getSameDayPricingPageCurrencyType,
  getSameDayRefundPageCurrencyType
} from 'src/sameDay/selectors/sameDayPriceSelectors';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';

describe('sameDayPriceSelectors', () => {
  const TEST_CURRENCY_TYPE = 'TST';
  const createMockPricingPageStateWithFareSummary = (fareSummary) => ({
    app: {
      sameDay: {
        sameDayPricingPage: { fareSummary }
      }
    },
    router: {
      location: {
        pathname: '/same-day/price-difference'
      }
    }
  });
  const createMockRefundPageStateWithFareSummary = (fareSummary) => ({
    app: {
      sameDay: {
        sameDayRefundPage: { fareSummary }
      }
    },
    router: {
      location: {
        pathname: '/same-day/refund-method'
      }
    }
  });

  describe('getSameDayCurrencyType', () => {
    it('should get the same day pricing page currency type', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });

    it('should get the same day refund page currency type', () => {
      const mockState = createMockRefundPageStateWithFareSummary({
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });
  });

  describe('getSameDayFareSummary', () => {
    it('should get the same day pricing page currency type', () => {
      const mockFareSummary = {
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      };
      const mockState = createMockPricingPageStateWithFareSummary(mockFareSummary);

      expect(getSameDayFareSummary(mockState)).toEqual(mockFareSummary);
    });

    it('should get the same day refund page currency type', () => {
      const mockFareSummary = {
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      };
      const mockState = createMockRefundPageStateWithFareSummary(mockFareSummary);

      expect(getSameDayFareSummary(mockState)).toEqual(mockFareSummary);
    });
  });

  describe('getSameDayPricingPageCurrencyType', () => {
    it('should not cause an exception if the pricing page data is not available', () => {
      const mockState = { app: { sameDay: {} } };

      expect(() => getSameDayPricingPageCurrencyType(mockState)).not.toThrow();
    });

    it('should get the same day currency code if there is an amount due', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });

    it('should get the same day currency code if there is a credit due', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        creditDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });

    it('should return points if no amount or credit are due and it is a points booking', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        isPointsBooking: true
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(POINTS);
    });

    it('should default to dollar if no amount or credit are due and it is not a points booking', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        isPointsBooking: false
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(DOLLAR);
    });

    it('should default to points if no amount or credit are due and it is a points booking', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        isPointsBooking: true
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(POINTS);
    });
  });

  describe('getSameDayRefundPageCurrencyType', () => {
    it('should not cause an exception if the pricing page data is not available', () => {
      const mockState = { app: { sameDay: {} } };

      expect(() => getSameDayRefundPageCurrencyType(mockState)).not.toThrow();
    });

    it('should get the same day currency code if there is an amount due', () => {
      const mockState = createMockRefundPageStateWithFareSummary({
        amountDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayRefundPageCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });

    it('should get the same day currency code if there is a credit due', () => {
      const mockState = createMockRefundPageStateWithFareSummary({
        creditDue: {
          fare: {
            currencyCode: TEST_CURRENCY_TYPE
          }
        }
      });

      expect(getSameDayRefundPageCurrencyType(mockState)).toEqual(TEST_CURRENCY_TYPE);
    });

    it('should return points if no amount or credit are due and it is a points booking', () => {
      const mockState = createMockRefundPageStateWithFareSummary({
        isPointsBooking: true
      });

      expect(getSameDayRefundPageCurrencyType(mockState)).toEqual(POINTS);
    });

    it('should default to dollar if no amount or credit are due and it is not a points booking', () => {
      const mockState = createMockRefundPageStateWithFareSummary({
        isPointsBooking: false
      });

      expect(getSameDayRefundPageCurrencyType(mockState)).toEqual(DOLLAR);
    });

    it('should default to points if no amount or credit are due and it is a points booking', () => {
      const mockState = createMockPricingPageStateWithFareSummary({
        isPointsBooking: true
      });

      expect(getSameDayPricingPageCurrencyType(mockState)).toEqual(POINTS);
    });
  });
});
