import _ from 'lodash';
import { getAmadeusShoppingIds as getAmadeusShoppingIdsSelector } from 'src/airBooking/analytics/getAmadeusShoppingIdsSelector';

describe('getAmadeusShoppingIdsSelector', () => {
  it('should populate amadeus shopping ids when AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS is triggered', () => {
    const analytics = {
      userExperienceId: '4cf580d1-c483b4cc747d',
      requestId: 'pUnA_VM0SbCWV',
      channelId: 'mweb'
    };
    const state = _.set({}, 'app.airBooking.flightShoppingPage.response.flightShoppingPage._analytics', analytics);
    const selectorResults = getAmadeusShoppingIdsSelector(state);

    expect(selectorResults).to.deep.equal(analytics);
  });

  it('should populate amadeus shopping ids with default value when flightShoppingPage response is empty', () => {
    const state = _.set({}, 'app.airBooking.flightShoppingPage.response.flightShoppingPage', {});
    const selectorResults = getAmadeusShoppingIdsSelector(state);

    expect(selectorResults).to.deep.equal({});
  });

  it('should populate amadeus shopping ids with default value when state is undefined', () => {
    const selectorResults = getAmadeusShoppingIdsSelector(undefined);

    expect(selectorResults).to.deep.equal({});
  });
});
