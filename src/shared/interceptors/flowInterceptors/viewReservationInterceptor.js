import _ from 'lodash';
import {
  isMatchPathAndPathChanged,
  isPagePathByLocationChange,
  isPagePathByLocationOrHistoryChange
} from 'src/shared/helpers/interceptorHelpers';
import keepFormDataInterceptor from 'src/shared/interceptors/keepFormDataInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import travelInformationPageInterceptor from 'src/shared/interceptors/travelInformationPageInterceptor';
import viewCarReservationDetailsInterceptor from 'src/shared/interceptors/viewCarReservationDetailsInterceptor';
import viewReservationDetailsInterceptor from 'src/shared/interceptors/viewReservationDetailsInterceptor';

const config = {
  name: 'viewReservation',
  path: '/view-reservation',
  pages: {
    dayOfTravelContactMethodPage: '/view-reservation/trip-details/[0-9A-Z]{6}/contact-method',
    travelInformationPage: '/view-reservation/trip-details/travel-info-page/[0-9]',
    travelInformationSpecialAssistancePage: '/view-reservation/trip-details/travel-info-page/[0-9]/special-assistance',
    viewCarReservationDetailsPage: '/view-reservation/car-details',
    viewReservationDetailsPage: '/view-reservation/trip-details/[0-9A-Z]{6}',
    viewReservationPage: '/view-reservation'
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
    [
      isMatchPathAndPathChanged(config.pages.travelInformationSpecialAssistancePage),
      travelInformationPageInterceptor(false)
    ],
    [isMatchPathAndPathChanged(config.pages.travelInformationPage), travelInformationPageInterceptor(true)],
    [isMatchPathAndPathChanged(config.pages.dayOfTravelContactMethodPage), travelInformationPageInterceptor(true)],
    [isMatchPathAndPathChanged(config.pages.viewReservationDetailsPage), viewReservationDetailsInterceptor],
    [isPagePathByLocationChange(config.pages.viewReservationPage), keepFormDataInterceptor]
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
