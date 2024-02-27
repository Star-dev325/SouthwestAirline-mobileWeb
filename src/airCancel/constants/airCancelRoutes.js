import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { travelFundsOldRoutes, travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

export const airCancelRoutes = {
  airBookingIndex: airBookingRoutes['index'],
  airCancelRefundQuote: '/air/cancel-reservation/refund-quote.html',
  checkInAdditionalPassportInformation: checkInRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInRoutes['checkInConfirmation'],
  checkInIndex: checkInRoutes['checkInIndex'],
  checkInPassportInformation: checkInRoutes['checkInPassportInformation'],
  refundSummary: '/air/cancel-reservation/summary.html',
  selectBound: {
    canonicalPath: '/air/cancel-reservation/',
    htmlPath: '/air/cancel-reservation/view.html'
  },
  selectPassengers: '/air/cancel-reservation/select-passengers.html',
  viewReservationIndex: viewReservationRoutes['index'],
  travelFundsIndex: travelFundsRoutes['index']
};

export const airCancelOldRoutes = {
  airBookingIndex: '/air/booking/shopping',
  airCancelRefundQuote: '/air/cancel/:recordLocator',
  checkInAdditionalPassportInformation: checkInOldRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInOldRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInOldRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInOldRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInOldRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInOldRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInOldRoutes['checkInConfirmation'],
  checkInIndex: checkInOldRoutes['checkInIndex'],
  checkInPassportInformation: checkInOldRoutes['checkInPassportInformation'],
  refundSummary: '/air/cancel/:recordLocator/refund-summary',
  selectBound: '/air/cancel/:recordLocator/select-bound',
  selectPassengers: '/air/cancel/select-passengers',
  travelFundsIndex: travelFundsOldRoutes['index'],
  viewReservationIndex: viewReservationOldRoutes['index']
};
