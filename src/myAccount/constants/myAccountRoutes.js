import { airBookingOldRoutes, airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import { airCancelOldRoutes, airCancelRoutes } from 'src/airCancel/constants/airCancelRoutes';
import { airChangeOldRoutes, airChangeRoutes } from 'src/airChange/constants/airChangeRoutes';
import { airReaccomOldRoutes, airReaccomRoutes } from 'src/airChange/constants/airReaccomRoutes';
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { checkInOldRoutes, checkInRoutes } from 'src/checkIn/constants/checkInRoutes';
import { earlyBirdOldRoutes, earlyBirdRoutes } from 'src/earlyBird/constants/earlyBirdRoutes';
import { travelFundsOldRoutes, travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { upgradedBoardingRoutes, upgradedBoardingOldRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

export const myAccountRoutes = {
  airBookingFlightShopping: airBookingRoutes['flightShoppingDepart'],
  airBookingIndex: airBookingRoutes['index'],
  airCancelRefundQuote: airCancelRoutes['airCancelRefundQuote'],
  airCancelRefundSummary: airCancelRoutes['refundSummary'],
  airCancelSelectBound: airCancelRoutes['selectBound'],
  airCancelSelectPassengers: airCancelRoutes['selectPassengers'],
  airChangeSelectPassengers: airChangeRoutes['selectPassengers'],
  airChangeView: airChangeRoutes['view'],
  airReaccomView: airReaccomRoutes['view'],
  airUpgradeSelectBound: airUpgradeRoutes['airUpgradeSelectBound'],
  carBookingIndex: carBookingRoutes['index'],
  carCancelConfirmation: '/car/cancel-reservation/summary.html',
  checkInAdditionalPassportInformation: checkInRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInRoutes['checkInConfirmation'],
  checkInIndex: checkInRoutes['checkInIndex'],
  checkInPassportInformation: checkInRoutes['checkInPassportInformation'],
  checkin: earlyBirdRoutes['checkin'],
  hazmatDeclaration: checkInRoutes['hazmatDeclaration'],
  travelFundsIndex: travelFundsRoutes['index'],
  travelerInformation: viewReservationRoutes['travelerInformation'],
  viewReservationView: viewReservationRoutes['viewReservationView'],
  upgradedBoardingPurchase: upgradedBoardingRoutes['upgradedBoardingPurchase']
};

export const myAccountOldRoutes = {
  airBookingFlightShopping: airBookingOldRoutes['flightShoppingDepart'],
  airBookingIndex: airBookingOldRoutes['index'],
  airCancelRefundQuote: airCancelOldRoutes['airCancelRefundQuote'],
  airCancelRefundSummary: airCancelOldRoutes['refundSummary'],
  airCancelSelectBound: airCancelOldRoutes['selectBound'],
  airCancelSelectPassengers: airCancelOldRoutes['selectPassengers'],
  airChangeSelectPassengers: airChangeOldRoutes['selectPassengers'],
  airChangeView: airChangeOldRoutes['view'],
  airReaccomView: airReaccomOldRoutes['view'],
  airUpgradeSelectBound: airUpgradeOldRoutes['airUpgradeSelectBound'],
  carBookingIndex: carBookingOldRoutes['index'],
  carCancelConfirmation: '/car/cancel/confirmation',
  checkInAdditionalPassportInformation: checkInOldRoutes['checkInAdditionalPassportInformation'],
  checkInAdditionalPassportInformationDestination: checkInOldRoutes['checkInAdditionalPassportInformationDestination'],
  checkInAdditionalPassportInformationGreenCard: checkInOldRoutes['checkInAdditionalPassportInformationGreenCard'],
  checkInAdditionalPassportInformationVisa: checkInOldRoutes['checkInAdditionalPassportInformationVisa'],
  checkInBoardingPass: checkInOldRoutes['checkInBoardingPass'],
  checkInBoardingPosition: checkInOldRoutes['checkInBoardingPosition'],
  checkInConfirmation: checkInOldRoutes['checkInConfirmation'],
  checkInIndex: checkInOldRoutes['checkInIndex'],
  checkInPassportInformation: checkInOldRoutes['checkInPassportInformation'],
  checkin: earlyBirdOldRoutes['checkin'],
  hazmatDeclaration: checkInOldRoutes['hazmatDeclaration'],
  travelFundsIndex: travelFundsOldRoutes['index'],
  travelerInformation: viewReservationOldRoutes['travelerInformation'],
  viewReservationView: viewReservationOldRoutes['viewReservationView'],
  upgradedBoardingPurchase: upgradedBoardingOldRoutes['upgradedBoardingPurchase']
};
