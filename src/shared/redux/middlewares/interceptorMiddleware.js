import _ from 'lodash';
import { history } from 'src/appHistory';
import {
  didLeaveCorporateFlow,
  isAddingForceRedirect,
  isBrowserRefreshAndOutOfWhiteList,
  isFlowPath,
  isFlowPathByLocationChange,
  isFlowPathByLocationOrHistoryChange,
  isTransitionWithForceRedirect
} from 'src/shared/helpers/interceptorHelpers';
import addForceRedirectFlagInterceptor from 'src/shared/interceptors/addForceRedirectFlagInterceptor';
import applyInterceptor from 'src/shared/interceptors/applyInterceptor';
import airBooking from 'src/shared/interceptors/flowInterceptors/airBookingInterceptor';
import airCancel from 'src/shared/interceptors/flowInterceptors/airCancelInterceptor';
import airChange from 'src/shared/interceptors/flowInterceptors/airChangeInterceptor';
import airReservation from 'src/shared/interceptors/flowInterceptors/airReservationInterceptor';
import airUpgrade from 'src/shared/interceptors/flowInterceptors/airUpgradeInterceptor';
import carBooking from 'src/shared/interceptors/flowInterceptors/carBookingInterceptor';
import carCancel from 'src/shared/interceptors/flowInterceptors/carCancelInterceptor';
import carReservation from 'src/shared/interceptors/flowInterceptors/carReservationInterceptor';
import checkIn from 'src/shared/interceptors/flowInterceptors/checkInInterceptor';
import companion from 'src/shared/interceptors/flowInterceptors/companionInterceptor';
import earlyBird from 'src/shared/interceptors/flowInterceptors/earlyBirdInterceptor';
import enroll from 'src/shared/interceptors/flowInterceptors/enrollInterceptor';
import externalPaymentInterceptor from 'src/shared/interceptors/flowInterceptors/externalPaymentInterceptor';
import flightStatus from 'src/shared/interceptors/flowInterceptors/flightStatusInterceptor';
import lookUpTravelFunds from 'src/shared/interceptors/flowInterceptors/lookUpTravelFundsInterceptor';
import lowFareCalendar from 'src/shared/interceptors/flowInterceptors/lowFareCalendarInterceptor';
import myAccount from 'src/shared/interceptors/flowInterceptors/myAccountInterceptor';
import sameDay from 'src/shared/interceptors/flowInterceptors/sameDayInterceptor';
import standby from 'src/shared/interceptors/flowInterceptors/standbyInterceptor';
import upgradedBoarding from 'src/shared/interceptors/flowInterceptors/upgradedBoardingInterceptor';
import viewReservation from 'src/shared/interceptors/flowInterceptors/viewReservationInterceptor';
import forceRedirectInterceptor from 'src/shared/interceptors/forceRedirectInterceptor';
import forceRedirectToHomeInterceptor from 'src/shared/interceptors/forceRedirectToHomeInterceptor';
import OffersPage from 'src/shared/interceptors/offersPageInterceptor';
import removeCorporateTokenInterceptor from 'src/shared/interceptors/removeCorporateTokenInterceptor';
import resumeAppStateCleanUpInterceptor from 'src/shared/interceptors/unconditionalInterceptors/resumeAppStateCleanUpInterceptor';

const unconditionalInterceptors = [resumeAppStateCleanUpInterceptor];

const globalInterceptors = [
  [isBrowserRefreshAndOutOfWhiteList, forceRedirectToHomeInterceptor],
  [isTransitionWithForceRedirect, forceRedirectInterceptor],
  [isAddingForceRedirect, addForceRedirectFlagInterceptor],
  [didLeaveCorporateFlow, removeCorporateTokenInterceptor]
];

const flowInterceptors = [
  [isFlowPath(airBooking.path), airBooking.interceptor],
  [isFlowPath(airCancel.path), airCancel.interceptor],
  [isFlowPath(airChange.path), airChange.interceptor],
  [isFlowPath('/air/reaccom'), airChange.interceptor],
  [isFlowPath(airUpgrade.path), airUpgrade.interceptor],
  [isFlowPath(carBooking.path), carBooking.interceptor],
  [isFlowPath(carCancel.path), carCancel.interceptor],
  [isFlowPath('/car/cancel-reservation'), carCancel.interceptor],
  [isFlowPath(checkIn.path), checkIn.interceptor],
  [isFlowPath(checkIn.normalizedPath), checkIn.interceptor],
  [isFlowPath(companion.path), companion.interceptor],
  [isFlowPath(earlyBird.path), earlyBird.interceptor],
  [isFlowPath(enroll.path), enroll.interceptor],
  [isFlowPath(enroll.normalizedPath), enroll.interceptor],
  [isFlowPath(flightStatus.path), flightStatus.interceptor],
  [isFlowPath(lookUpTravelFunds.path), lookUpTravelFunds.interceptor],
  [isFlowPath(lowFareCalendar.path), airBooking.interceptor],
  [isFlowPath(OffersPage.path), OffersPage.interceptor],
  [isFlowPath(sameDay.path), sameDay.interceptor],
  [isFlowPath(standby.path), standby.interceptor],
  [isFlowPath(upgradedBoarding.path), upgradedBoarding.interceptor],
  [isFlowPathByLocationChange(externalPaymentInterceptor.path), externalPaymentInterceptor.interceptor],
  [isFlowPathByLocationOrHistoryChange(myAccount.path), myAccount.interceptor],
  [isFlowPathByLocationOrHistoryChange(viewReservation.path), viewReservation.interceptor],
  [isFlowPathByLocationOrHistoryChange(airReservation.path), airReservation.interceptor],
  [isFlowPathByLocationOrHistoryChange(carReservation.path), carReservation.interceptor]
];

const interceptorMiddleware = (store) => (next) => (action) => {
  const defaultInterceptorContext = { store, next, action, history };

  unconditionalInterceptors.forEach((interceptorFn) => {
    interceptorFn(defaultInterceptorContext);
  });

  const updatedInterceptorContext =
    _.cond([...globalInterceptors, ...flowInterceptors])(defaultInterceptorContext) || defaultInterceptorContext;

  return applyInterceptor(updatedInterceptorContext);
};

export default interceptorMiddleware;
