import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightConfirmationMktgSelector } from 'src/airBooking/analytics/flightConfirmationMktgSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

describe('flightConfirmationMktgSelector', () => {
  it('should return an empty object for mktgData if "state.app.airBooking.flightConfirmationPage.response.flightConfirmationPage.mktg_data" does not exist', () => {
    const [mktgData] = flightConfirmationMktgSelector({});

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...ANALYTICS.FLIGHT_CONFIRMATION_PAGE });
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set(
      {},
      'app.airBooking.flightConfirmationPage.response.flightConfirmationPage.mktg_data',
      mockData
    );
    const [mktgData] = flightConfirmationMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData, ...ANALYTICS.FLIGHT_CONFIRMATION_PAGE });
  });

  it('should return an array containing the contents of the mktg_data property if promoCode is supplied and valid', () => {
    const mockData = {
      promocode: 'TESTPROMO',
      promovalid: '1'
    };
    const stateData = _.merge(
      _.set({}, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage.mktg_data', mockData),
      _.set({}, 'app.airBooking.searchRequest.promoCode', 'TESTPROMO'),
      _.set({}, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data', { air_validpromo: true })
    );
    const [mktgData] = flightConfirmationMktgSelector(stateData);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData, ...ANALYTICS.FLIGHT_CONFIRMATION_PAGE });
  });

  it('should return an array containing the contents of the mktg_data property if promoCode is supplied and not valid', () => {
    const mockData = {
      promocode: 'TESTPROMO',
      promovalid: '0'
    };
    const stateData = _.merge(
      _.set({}, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage.mktg_data', mockData),
      _.set({}, 'app.airBooking.searchRequest.promoCode', 'TESTPROMO'),
      _.set({}, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data', { air_validpromo: false })
    );
    const [mktgData] = flightConfirmationMktgSelector(stateData);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData, ...ANALYTICS.FLIGHT_CONFIRMATION_PAGE });
  });
});
