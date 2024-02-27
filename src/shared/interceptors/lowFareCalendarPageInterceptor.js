// @flow
import _ from 'lodash';
import { getLowFareCalendar } from 'src/airBooking/actions/airBookingActions';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const lowFareCalendarPageInterceptor = (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentRouteState = getCurrentRouteState(persistentHistory);
  const isTransitionToLfcPage = currentRouteState?.pathname === getNormalizedRoute({ routeName: 'lowFareCalendar' });
  const regex = new RegExp('^/air/booking/(shopping/)?\\w+/outbound/results$');
  const backFrom = _.get(currentRouteState, 'backFrom.pathname', '');
  const isBackFromShoppingPage = regex.test(backFrom);
  const searchRequest = _.get(store.getState(), 'app.airBooking.searchRequest');
  const searchRequestCurrencyType = _.get(searchRequest, 'currencyType');
  const lfcResponseCurrencyType = _.get(
    store.getState(),
    'app.airBooking.lowFareCalendar.response.lowFareCalendarPage._links.flightShoppingPage.query.currency'
  );

  if (isTransitionToLfcPage && isBackFromShoppingPage && searchRequestCurrencyType !== lfcResponseCurrencyType) {
    return {
      interceptor() {
        const newSearchRequest = _.merge({}, searchRequest, {
          useLowFareCalendar: true
        });

        store.dispatch(getLowFareCalendar(newSearchRequest, undefined, false));
      },
      ...interceptorContext
    };
  }
};

export default lowFareCalendarPageInterceptor;
