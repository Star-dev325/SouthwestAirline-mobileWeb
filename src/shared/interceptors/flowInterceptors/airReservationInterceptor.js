import _ from 'lodash';
import {
  isMatchPathAndPathChanged,
  isPagePathByLocationChange
} from 'src/shared/helpers/interceptorHelpers';
import keepFormDataInterceptor from 'src/shared/interceptors/keepFormDataInterceptor';
import travelInformationPageInterceptor from 'src/shared/interceptors/travelInformationPageInterceptor';
import viewReservationDetailsInterceptor from 'src/shared/interceptors/viewReservationDetailsInterceptor';

const config = {
  name: 'viewReservation',
  path: '/air/manage-reservation',
  pages: {
    dayOfTravelContactMethodPage: '/air/manage-reservation/contact-information.html',
    travelInformationPage: '/air/manage-reservation/traveler-information.html',
    travelInformationSpecialAssistancePage: '/air/manage-reservation/disability-options.html',
    viewCarReservationDetailsPage: '/air/manage-reservation/car-details',
    viewReservationDetailsPage: '/air/manage-reservation/view.html',
    viewReservationPage: '/air/manage-reservation'
  }
};

const interceptor = (interceptorContext) => _.cond([
  [
    isMatchPathAndPathChanged(config.pages.travelInformationSpecialAssistancePage),
    travelInformationPageInterceptor(false)
  ],
  [isMatchPathAndPathChanged(config.pages.travelInformationPage), travelInformationPageInterceptor(true)],
  [isMatchPathAndPathChanged(config.pages.dayOfTravelContactMethodPage), travelInformationPageInterceptor(true)],
  [isMatchPathAndPathChanged(config.pages.viewReservationDetailsPage), viewReservationDetailsInterceptor],
  [isPagePathByLocationChange(config.pages.viewReservationPage), keepFormDataInterceptor]
])({ ...interceptorContext });

export default {
  ...config,
  interceptor
};
