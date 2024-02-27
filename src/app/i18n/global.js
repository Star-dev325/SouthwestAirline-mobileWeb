import myAccountText from 'src/myAccount/i18n/myAccountText';
import airBooking from 'src/airBooking/i18n/';
import airCancelText from 'src/airCancel/i18n/airCancelText';
import airChangeText from 'src/airChange/i18n/airChangeText';
import chaseText from 'src/chase/i18n/chaseText';
import checkIn from 'src/checkIn/i18n/';
import flightStatusText from 'src/flightStatus/i18n/flightStatusText';
import companionText from 'src/companion/i18n/companionText';
import carBookingText from 'src/carBooking/i18n/carBookingText';
import carCancelText from 'src/carCancel/i18n/carCancelText';
import contactTracingText from 'src/contactTracing/i18n/contactTracingText';
import earlyBirdText from 'src/earlyBird/i18n/earlyBirdText';
import enrollText from 'src/enroll/i18n/enrollText';
import externalPaymentText from 'src/externalPayment/i18n/externalPaymentText';
import homeAndNavText from 'src/homeAndNav/i18n/';
import locationServicesText from 'src/locationServices/i18n/locationServicesText';
import loginText from 'src/login/i18n/loginText';
import standbyText from 'src/standby/i18n/standbyText';
import loneStarText from 'src/lonestar/i18n/loneStarText';
import shared from 'src/shared/i18n/';
import transferTravelFundsText from 'src/travelFunds/i18n/transferTravelFundsText';
import travelAdvisoryText from 'src/travelAdvisory/i18n/travelAdvisoryText';
import upgradedBoardingText from 'src/upgradedBoarding/i18n/upgradedBoardingText';
import upgradeFareText from 'src/airUpgrade/i18n/upgradeFareText';
import viewReservation from 'src/viewReservation/i18n/';
import sameDay from 'src/sameDay/i18n/sameDayText';

export const i18nSources = [
  myAccountText,
  airBooking,
  airCancelText,
  airChangeText,
  chaseText,
  checkIn,
  carBookingText,
  companionText,
  carCancelText,
  contactTracingText,
  earlyBirdText,
  enrollText,
  externalPaymentText,
  flightStatusText,
  homeAndNavText,
  locationServicesText,
  loginText,
  myAccountText,
  standbyText,
  loneStarText,
  shared,
  transferTravelFundsText,
  travelAdvisoryText,
  upgradedBoardingText,
  upgradeFareText,
  viewReservation,
  sameDay
];

export default Object.freeze(Object.assign({}, ...i18nSources));
