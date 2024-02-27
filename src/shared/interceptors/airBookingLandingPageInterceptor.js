// @flow
import _ from 'lodash';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import {
  updateFlightSearchRequestAndSyncToFormData,
  resetFlightSearchRequest
} from 'src/airBooking/actions/airBookingActions';
import { defaultSearchRequest } from 'src/airBooking/helpers/shoppingLandingPageHelper';
import { clearFormDataById } from 'src/shared/actions/formDataActions';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';

export default (landingPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;

  const { persistentHistory } = _.cloneDeep(store.getState());
  const { state } = getCurrentRouteState(persistentHistory) || {};
  const isOnLandingPage = isOnWebViewLandingPage(persistentHistory, landingPagePath);

  if (isOnLandingPage) {
    return {
      interceptor: () => {
        store.dispatch(clearFormDataById(AIR_BOOKING_SHOPPING_SEARCH_FORM));
        store.dispatch(resetFlightSearchRequest());
        !_.isEmpty(state) &&
          store.dispatch(
            updateFlightSearchRequestAndSyncToFormData({ ...defaultSearchRequest, ...state }, !!state.departureDate)
          );
      },
      ...interceptorContext
    };
  }
};
