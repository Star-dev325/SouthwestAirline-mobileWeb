import { sandbox } from 'sinon';
import _ from 'lodash';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import lowFareCalendarPageInterceptor from 'src/shared/interceptors/lowFareCalendarPageInterceptor';
import BrowserObject from 'src/shared/helpers/browserObject';

const { location } = BrowserObject;
const sinon = sandbox.create();

describe('lowFareCalendarPageInterceptor', () => {
  let getLowFareCalendarStub, state, store;
  let getCurrentRouteStateStub;
  let lfcCurrencyType, searchRequest, searchRequestWithCurrencySwitched;

  beforeEach(() => {
    getLowFareCalendarStub = sinon.stub(AirBookingActions, 'getLowFareCalendar');
    getCurrentRouteStateStub = sinon.stub(routeStateHelper, 'getCurrentRouteState');

    lfcCurrencyType = 'USD';
    searchRequest = {
      origin: 'AUS',
      destination: 'ATL',
      numberOfAdults: 1,
      currencyType: lfcCurrencyType,
      departureDate: '2020-03-04',
      returnDate: '2020-03-09',
      isDateChanged: true,
      tripType: 'roundTrip',
      isRoundTrip: true
    };
    searchRequestWithCurrencySwitched = _.merge({}, searchRequest, { currencyType: 'PTS' });
    state = {};
    _.set(state, 'app.airBooking.searchRequest', searchRequestWithCurrencySwitched);
    _.set(
      state,
      'app.airBooking.lowFareCalendar.response.lowFareCalendarPage._links.flightShoppingPage.query.currency',
      lfcCurrencyType
    );
    store = mockStore({ state });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('user presses browser back', () => {
    beforeEach(() => {
      getCurrentRouteStateStub.returns({
        pathname: '/air/low-fare-calendar',
        backFrom: {
          pathname: '/air/booking/shopping/adult/outbound/results'
        }
      });
    });

    it('should call getLowFareCalendar when user goes to LowFareCalendarPage proceeds to Shopping page switches between $/Pts then presses browser back', () => {
      sinon.stub(location, 'shopping');
      sinon.stub(UrlHelper, 'getNormalizedRoute').returns('/air/low-fare-calendar');
      const result = lowFareCalendarPageInterceptor({ store });

      result.interceptor();

      const expectedSearchRequest = _.merge(searchRequestWithCurrencySwitched, {
        useLowFareCalendar: true
      });

      expect(getLowFareCalendarStub).to.have.been.calledWith(expectedSearchRequest, undefined, false);
    });

    it('should not call getLowFareCalendar when user goes to LowFareCalendarPage proceeds to Shopping page then presses browser back', () => {
      _.set(state, 'app.airBooking.searchRequest', searchRequest);
      store = mockStore({ state });

      lowFareCalendarPageInterceptor({ store });

      expect(getLowFareCalendarStub).to.not.have.been.called;
    });

    it('should not call getLowFareCalendar when user is on LFCPage then presses browser back to shopping landing page', () => {
      getCurrentRouteStateStub.returns({
        pathname: '/air/booking/shopping',
        backFrom: {
          pathname: '/air/booking/shopping/low-fare-calendar'
        }
      });

      lowFareCalendarPageInterceptor({ store });

      expect(getLowFareCalendarStub).to.not.have.been.called;
    });
  });
});
