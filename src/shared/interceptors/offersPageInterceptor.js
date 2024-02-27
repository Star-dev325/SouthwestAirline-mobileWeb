import _ from 'lodash';

import { getCurrentRouteState, hasAllInState } from 'src/shared/routeUtils/routeStateHelper';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import { saveOffersPagePlacements, saveOffersPageTemplateData } from 'src/homeAndNav/actions/offersPageActions';
import { updateContentBlockIds } from 'src/shared/analytics/actions/analyticsActions';

const config = {
  name: 'offers',
  path: '/home/offers'
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;

  const { persistentHistory } = _.cloneDeep(store.getState());
  const { state = {} } = getCurrentRouteState(persistentHistory) || {};

  const isOnPage = isOnWebViewLandingPage(persistentHistory, config.path);
  const hasState = hasAllInState(state, ['placements', 'templateData']);

  if (isOnPage && hasState) {
    return {
      interceptor: () => {
        store.dispatch(saveOffersPagePlacements(state.placements));
        store.dispatch(updateContentBlockIds(state.placements));
        store.dispatch(saveOffersPageTemplateData(state.templateData));
      },
      ...interceptorContext
    };
  }
};

export default {
  ...config,
  interceptor
};
