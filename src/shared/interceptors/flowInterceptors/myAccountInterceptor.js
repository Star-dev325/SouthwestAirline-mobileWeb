import _ from 'lodash';
import { isMatchPathBeforeRouteSaved, isPagePathByLocationChange } from 'src/shared/helpers/interceptorHelpers';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import upcomingTripDetailsInterceptor from 'src/shared/interceptors/upcomingTripDetailsInterceptor';
import upgradedBoardingCancelReservationInterceptor from 'src/shared/interceptors/upgradedBoardingCancelReservationInterceptor.js';
import upgradedBoardingInterceptor from 'src/shared/interceptors/flowInterceptors/upgradedBoardingInterceptor.js';

const config = {
  name: 'myAccount',
  path: '/my-account',
  pages: {
    upcomingTripDetailsPage: '/my-account/upcoming-trip-details/[0-9]',
    upcomingTripsPage: '/my-account/upcoming-trips'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.cond([
    [isMatchPathBeforeRouteSaved(config.pages.upcomingTripDetailsPage), upcomingTripDetailsInterceptor],
    [isPagePathByLocationChange(config.pages.upcomingTripsPage), upgradedBoardingCancelReservationInterceptor(
      [upgradedBoardingInterceptor.pages.purchase, upgradedBoardingInterceptor.pages.payment, upgradedBoardingInterceptor.pages.confirmation],
      upgradedBoardingInterceptor.pages.purchase
    )]
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
