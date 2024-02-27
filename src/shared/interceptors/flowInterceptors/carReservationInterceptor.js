import _ from 'lodash';
import {
  isPagePathByLocationChange,
  isPagePathByLocationOrHistoryChange
  
} from 'src/shared/helpers/interceptorHelpers';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import viewCarReservationDetailsInterceptor from 'src/shared/interceptors/viewCarReservationDetailsInterceptor';
import keepFormDataInterceptor from 'src/shared/interceptors/keepFormDataInterceptor';

const config = {
  name: 'viewReservation',
  path: '/car/manage-reservation',
  pages: {
    viewCarReservationDetailsPage: '/car/manage-reservation/view.html',
    viewReservationPage: '/car/manage-reservation/index.html'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.car.flowConfig`, {});

  return _.cond([
    [
      isPagePathByLocationOrHistoryChange(config.pages.viewCarReservationDetailsPage),
      viewCarReservationDetailsInterceptor
    ],
    [isPagePathByLocationChange(config.pages.viewReservationPage), keepFormDataInterceptor]
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
