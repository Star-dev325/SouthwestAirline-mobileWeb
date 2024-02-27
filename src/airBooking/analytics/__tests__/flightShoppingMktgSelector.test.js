import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightShoppingMktgSelector } from 'src/airBooking/analytics/flightShoppingMktgSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

describe('flightShoppingMktgSelector', () => {
  const defaultLfcBoundData = {
    change_search: 'initial search',
    lfc_bound1_selectedcurrency: 'none',
    lfc_bound2_selectedcurrency: 'none',
    lfc_bound1_selectedpoints: 'none',
    lfc_bound2_selectedpoints: 'none',
    ...globalMktgState
  };

  it('should return defaultLfcBoundData for mktgData if "state.app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data" does not exist', () => {
    const state = {};
    const [mktgData] = flightShoppingMktgSelector(state);

    expect(mktgData).toStrictEqual(defaultLfcBoundData);
  });

  it('should return an array containing the contents of the mktg_data property and lfcBoundData', () => {
    const mockMktg_data = { mockMktg_data: 'mockMktg_data' };
    const state = _.set({}, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data', mockMktg_data);
    const [mktgData] = flightShoppingMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultLfcBoundData, ...mockMktg_data });
  });

  it('should return promocode when available', () => {
    const state = _.set({}, 'app.airBooking.searchRequest.promoCode', 'mock_promocode');
    const [mktgData] = flightShoppingMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultLfcBoundData, promocode: 'mock_promocode' });
  });

  it('should return initial search when isCalendarStrip is false', () => {
    const state = _.set({}, 'analytics.AirBookingStore.isCalendarStrip', false);
    const [mktgData] = flightShoppingMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultLfcBoundData, change_search: 'initial search' });
  });

  it('should return calendar strip when isCalendarStrip is true', () => {
    const state = _.set({}, 'analytics.AirBookingStore.isCalendarStrip', true);
    const [mktgData] = flightShoppingMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...defaultLfcBoundData, change_search: 'calendar strip' });
  });

  it('should return an multi select data for mktg_data property', () => {
    const mockMktg_data = { mockMktg_data: 'mockMktg_data' };
    const expectedResult = [
      {
        ...defaultLfcBoundData,
        ...mockMktg_data,
        ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS,
        ...ANALYTICS.MULTI_SELECT_OUTBOUND_BOUNDS_PAGE
      },
      'otter',
      {
        page: ANALYTICS.MULTI_SELECT_OUTBOUND_BOUNDS_PAGE.page
      }
    ];
    const state = {
      app: {
        airBooking: {
          flightShoppingPage: { response: { flightShoppingPage: { mktg_data: mockMktg_data } } }
        },
        airports: { multiSelectGroup: { isSelected: true, currentDirection: 'outbound' } }
      }
    };
    const result = flightShoppingMktgSelector(state);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an multi select data for mktg_data property on return flight page', () => {
    const mockMktg_data = { mockMktg_data: 'mockMktg_data' };
    const expectedResult = [
      {
        ...defaultLfcBoundData,
        ...mockMktg_data,
        ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS,
        ...ANALYTICS.MULTI_SELECT_INBOUND_PAGE
      },
      'otter',
      {
        page: ANALYTICS.MULTI_SELECT_INBOUND_PAGE.page
      }
    ];
    const state = {
      app: {
        airBooking: {
          flightShoppingPage: { response: { flightShoppingPage: { mktg_data: mockMktg_data } } }
        },
        airports: { multiSelectGroup: { isSelected: true, currentDirection: 'inbound' } }
      }
    };
    const result = flightShoppingMktgSelector(state);

    expect(result).toStrictEqual(expectedResult);
  });
});
