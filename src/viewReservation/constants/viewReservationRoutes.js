import { carBookingRoutes, carBookingOldRoutes } from "src/carBooking/constants/carBookingRoutes";
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { earlyBirdOldRoutes, earlyBirdRoutes } from 'src/earlyBird/constants/earlyBirdRoutes';

export const viewReservationRoutes = {
  airCancelRefundQuote: '/air/cancel-reservation/refund-quote.html',
  airCancelRefundSummary: '/air/cancel-reservation/summary.html',
  airCancelSelectBound: {
    canonicalPath: '/air/cancel-reservation/',
    htmlPath: '/air/cancel-reservation/view.html'
  },
  airCancelSelectPassengers: '/air/cancel-reservation/select-passengers.html',
  airChangeSelectPassengers: '/air/change/select-passengers.html',
  airChangeView: {
    canonicalPath: '/air/change/',
    htmlPath: '/air/change/view.html'
  },
  airReaccomView: '/air/reaccom/view.html',
  airUpgradeSelectBound: airUpgradeRoutes['airUpgradeSelectBound'],
  carBookingIndex: carBookingRoutes['index'],
  carCancelConfirmation: '/car/cancel-reservation/summary.html',
  carReservationDetails: '/car/manage-reservation/view.html',
  carReservationIndex: {
    canonicalPath: '/car/manage-reservation/',
    htmlPath: '/car/manage-reservation/index.html'
  },
  carReservationIndexWithTab: {
    canonicalPath: '/car/manage-reservation/',
    htmlPath: '/car/manage-reservation/index.html?tab=CAR'
  },
  checkin: earlyBirdRoutes['checkin'],
  checkInAdditionalPassportInformation: checkInRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInRoutes['checkInConfirmation'],
  checkInIndex: checkInRoutes['checkInIndex'],
  checkInPassportInformation: checkInRoutes['checkInPassportInformation'],
  contactMethod: '/air/manage-reservation/contact-information.html',
  hazmatDeclaration: checkInRoutes['hazmatDeclaration'],
  index: {
    canonicalPath: '/air/manage-reservation/',
    htmlPath: '/air/manage-reservation/index.html'
  },
  specialAssistance: '/air/manage-reservation/disability-options.html',
  travelerInformation: '/air/manage-reservation/traveler-information.html',
  viewReservationView: '/air/manage-reservation/view.html'
};

export const viewReservationOldRoutes = {
  airCancelRefundQuote: '/air/cancel/:recordLocator',
  airCancelRefundSummary: '/air/cancel/:recordLocator/refund-summary',
  airCancelSelectBound: '/air/cancel/:recordLocator/select-bound',
  airCancelSelectPassengers: '/air/cancel/select-passengers',
  airChangeSelectPassengers: '/air/change/select-passengers',
  airChangeView: '/air/change',
  airReaccomView: '/air/change',
  airUpgradeSelectBound: airUpgradeOldRoutes['airUpgradeSelectBound'],
  carBookingIndex: carBookingOldRoutes['index'],
  carCancelConfirmation: '/car/cancel/confirmation',
  carReservationDetails: '/view-reservation/car-details',
  carReservationIndex: '/view-reservation',
  carReservationIndexWithTab: '/view-reservation?tab=CAR',
  checkin: earlyBirdOldRoutes['checkin'],
  checkInAdditionalPassportInformation: checkInOldRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInOldRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInOldRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInOldRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInOldRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInOldRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInOldRoutes['checkInConfirmation'],
  checkInIndex: checkInOldRoutes['checkInIndex'],
  checkInPassportInformation: checkInOldRoutes['checkInPassportInformation'],
  contactMethod: '/view-reservation/trip-details/:recordLocator/contact-method',
  hazmatDeclaration: checkInOldRoutes['hazmatDeclaration'],
  index: '/view-reservation',
  specialAssistance: '/view-reservation/trip-details/travel-info-page/:passengerReference/special-assistance',
  travelerInformation: '/view-reservation/trip-details/travel-info-page/:passengerReference',
  viewReservationView: '/view-reservation/trip-details/:recordLocator'
};
