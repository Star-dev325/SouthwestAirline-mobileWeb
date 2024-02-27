// @flow
import _ from 'lodash';
import { resetAirBookingFlowData, searchForFlights, searchForMultiSelectGroupFlights } from 'src/airBooking/actions/airBookingActions';
import { clearMultiSelectGroupFormId } from 'src/airports/actions/airportsActions.js';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { pageLoadCompletedForAnalytics } from 'src/shared/analytics/actions/analyticsActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import type { MultiSelectGroup } from 'src/shared/flow-typed/shared.types';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const airBookingSearchInterceptor = (searchPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;
  const state = _.cloneDeep(store.getState());
  const persistentHistory = _.get(state, 'persistentHistory');
  const currentState = getCurrentRouteState(persistentHistory);
  const preventFlowStatusChange = true;
  const searchRequest = _.get(currentState, 'state');
  const multiGroupOrigin = _.get(searchRequest, 'multiSelectGroupOrigins');
  const multiGroupDestination = _.get(searchRequest, 'multiSelectGroupDestinations');

  if (isOnWebViewLandingPage(persistentHistory, searchPagePath)) {
    return {
      interceptor() {
        const errorHandler = () => store.dispatch(exitWebView());

        store.dispatch(resetAirBookingFlowData());
        store.dispatch(FlowStatusActions.setFlowStatus('airBooking', STATUS.IN_PROGRESS));

        !multiGroupOrigin && store.dispatch(clearMultiSelectGroupFormId('origin'));
        !multiGroupDestination && store.dispatch(clearMultiSelectGroupFormId('destination'));

        if (multiGroupOrigin || multiGroupDestination) {
          const multiSelectGroup: MultiSelectGroup = { isSelected: true, origin: multiGroupOrigin, destination: multiGroupDestination };

          store.dispatch(searchForMultiSelectGroupFlights({ errorHandler, multiSelectGroup, searchRequest })).then(() => {
            store.dispatch(pageLoadCompletedForAnalytics(currentState));
          });
        } else {
          store.dispatch(searchForFlights({ searchRequest, preventFlowStatusChange, errorHandler })).then(() => {
            store.dispatch(pageLoadCompletedForAnalytics(currentState));
          });
        }
      },
      ...interceptorContext
    };
  }
};

export default airBookingSearchInterceptor;
