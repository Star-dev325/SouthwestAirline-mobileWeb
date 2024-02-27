import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightShoppingMultiSelectMktgSelector } from 'src/airBooking/analytics/flightShoppingMultiSelectMktgSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

describe('flightShoppingMktgSelector', () => {
  const defaultGlobalMktgData = {
    change_search: 'initial search',
    ...ANALYTICS.MULTI_SELECT_OUTBOUND_PAGE,
    ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS,
    ...globalMktgState
  };

  it('should return defaultGlobalMktgData if mktgData does not exist', () => {
    const state = {};
    const [mktgData] = flightShoppingMultiSelectMktgSelector(state);

    expect(mktgData).toStrictEqual(defaultGlobalMktgData);
  });

  it('should return an array containing the contents of the mktg_data and multiSelect data property', () => {
    const mockMktg_data = { mockMktg_data: 'mockMktg_data' };
    const state = {
      app: {
        airBooking: { flightShoppingPage: { multiSelectGroup: { response: { mktg_data: mockMktg_data } } } },
        airports: { multiSelectGroup: { isSelected: true } }
      }
    };
    const [mktgData] = flightShoppingMultiSelectMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultGlobalMktgData, ...mockMktg_data });
  });

  it('should return promocode when available', () => {
    const state = {
      app: {
        airBooking: { searchRequest: { promoCode: 'mock_promocode' } }
      }
    };
    const [mktgData] = flightShoppingMultiSelectMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultGlobalMktgData, promocode: 'mock_promocode' });
  });

  it('should return change_search as initial search when isCalendarStrip is false', () => {
    const state = {
      analytics: { AirBookingStore: { isCalendarStrip: false } }
    };
    const [mktgData] = flightShoppingMultiSelectMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultGlobalMktgData, change_search: 'initial search' });
  });

  it('should return change_search as calendar strip when isCalendarStrip is true', () => {
    const mockDefaultGlobalMktgData = {
      change_search: 'calendar strip',
      ...ANALYTICS.MULTI_SELECT_OUTBOUND_PAGE,
      ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS,
      ...globalMktgState
    };
    const state = {
      analytics: { AirBookingStore: { isCalendarStrip: true } }
    };
    const [mktgData] = flightShoppingMultiSelectMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...mockDefaultGlobalMktgData, change_search: 'calendar strip' });
  });
});
