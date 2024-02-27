jest.mock('src/sameDay/selectors/sameDayPriceSelectors', () => ({
  getSameDayCurrencyType: jest.fn()
}));
jest.mock('src/shared/selectors/appSelector', () => ({
  getCurrentAppFlow: jest.fn()
}));

import * as sameDayPriceSelectors from 'src/sameDay/selectors/sameDayPriceSelectors';
import { DOLLAR } from 'src/shared/constants/currencyTypes';
import * as appSelectors from 'src/shared/selectors/appSelector';
import * as priceSelectors from 'src/shared/selectors/priceSelectors';

describe('priceSelector', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCurrencyType', () => {
    it('should return correct currency type for air booking', () => {
      const state = { app: { airBooking: { searchRequest: { currencyType: 'USD' } } } };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/booking');

      expect(priceSelectors.getCurrencyType(state)).toEqual('USD');
    });

    it('should return correct currency type for air change', () => {
      const state = { app: { airChange: { selectFarePage: { selectedFlight: { page: { currencyType: 'PTS' } } } } } };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/change');

      expect(priceSelectors.getCurrencyType(state)).toEqual('PTS');
    });

    it('should return correct currency type for air upgrade', () => {
      const state = {
        app: {
          airUpgrade: {
            airUpgradeReducer: {
              viewUpgradeReservationPage: { pricingDataList: [{ upgradePrice: { currencyCode: 'PTS' } }] }
            }
          }
        }
      };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/upgrade');

      expect(priceSelectors.getCurrencyType(state)).toEqual('PTS');
    });

    it('should return correct currency type for same day', () => {
      const mockCurrencyType = 'TST';
      const state = { app: { sameDay: { sameDayPricingPage: { fareSummary: { isPointsBooking: true } } } } };

      appSelectors.getCurrentAppFlow.mockReturnValue('same-day');
      sameDayPriceSelectors.getSameDayCurrencyType.mockReturnValue(mockCurrencyType);

      expect(priceSelectors.getCurrencyType(state)).toEqual(mockCurrencyType);
    });

    it('should return correct currency type for other flows', () => {
      appSelectors.getCurrentAppFlow.mockReturnValue('invalid');

      expect(priceSelectors.getCurrencyType()).toEqual(DOLLAR);
    });
  });

  describe('isPointsBooking', () => {
    it('should return true if currency type is points', () => {
      const state = { app: { airChange: { selectFarePage: { selectedFlight: { page: { currencyType: 'PTS' } } } } } };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/change');

      expect(priceSelectors.isPointsBooking(state)).toBe(true);
    });

    it('should return true if currency type is points', () => {
      const state = {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                totals: {
                  pointsTotal: {
                    currencyCode: 'PTS'
                  }
                }
              }
            }
          }
        }
      };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/change');

      expect(priceSelectors.isPointsBooking(state)).toBe(true);
    });

    it('should return false if pointsTotal is null', () => {
      const state = {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                totals: {
                  pointsTotal: null
                }
              }
            }
          }
        }
      };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/change');

      expect(priceSelectors.isPointsBooking(state)).toBe(false);
    });

    it('should return false if currency type is not points', () => {
      const state = { app: { airBooking: { searchRequest: { currencyType: 'USD' } } } };

      appSelectors.getCurrentAppFlow.mockReturnValue('air/booking');

      expect(priceSelectors.isPointsBooking(state)).toBe(false);
    });
  });
});
