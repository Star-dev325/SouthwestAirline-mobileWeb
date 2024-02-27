import React from 'react';
import { Route } from 'react-router';
import AirBooking from 'src/airBooking/index';
import AirCancel from 'src/airCancel/index';
import AirChange from 'src/airChange/index';
import AirUpgrade from 'src/airUpgrade/index';
import App from 'src/app/app';
import Branch from 'src/branch/index';
import CarBooking from 'src/carBooking/index';
import CarCancel from 'src/carCancel/index';
import Chase from 'src/chase/index';
import CheckIn from 'src/checkIn/index';
import Companion from 'src/companion/index';
import ContactTracing from 'src/contactTracing';
import EarlyBird from 'src/earlyBird';
import Enroll from 'src/enroll/index';
import ExternalPaymentPage from 'src/externalPayment/pages/externalPaymentPage';
import FlightStatus from 'src/flightStatus/index';
import HomeAndNav from 'src/homeAndNav/index';
import OffersPage from 'src/homeAndNav/pages/offersPage';
import Login from 'src/login/index';
import MyAccount from 'src/myAccount/index';
import RapidRewards from 'src/rapidRewards/index';
import sameDay from 'src/sameDay';
import appConfig from 'src/shared/config/appConfig';
import FeatureTogglePage from 'src/shared/featureToggle/featureTogglePage';
import GenerateErrorPage from 'src/shared/featureToggle/generateErrorPage';
import ViewAppConfigPage from 'src/shared/featureToggle/viewAppConfigPage';
import BlankPage from 'src/shared/pages/blankPage';
import Standby from 'src/standby/index';
import TravelAdvisory from 'src/travelAdvisory/index';
import TravelFunds from 'src/travelFunds/index';
import UpgradedBoarding from 'src/upgradedBoarding/index';
import ViewReservation from 'src/viewReservation';
import Wcm from 'src/wcm/index';
import WhereWeFly from 'src/whereWeFly/index';

const { USER_CAN_CHANGE_TOGGLES } = appConfig;

export default (
  <App>
    <HomeAndNav />
    <Wcm />
    <FlightStatus />
    <RapidRewards />
    <Standby />
    <WhereWeFly />
    <Chase />
    <Branch />
    <Route path="/account/enroll" component={Enroll} />
    <Route path="/air/upgrade" component={AirUpgrade} />
    <Route path="/upgraded-boarding" component={UpgradedBoarding} />
    <Route path="/contact-tracing" component={ContactTracing} />
    <Route path="/earlybird" component={EarlyBird} />
    <Route path="/view-reservation" component={ViewReservation} />
    <Route path="/air/manage-reservation" component={ViewReservation} />
    <Route path="/car/manage-reservation" component={ViewReservation} />
    <Route path="/same-day" component={sameDay} />
    <Route path="/air/cancel" component={AirCancel} />
    <Route path="/air/cancel-reservation" component={AirCancel} />
    <Route path="/air/booking" component={AirBooking} />
    <Route path="/air/change" component={AirChange} />
    <Route path="/air/reaccom" component={AirChange} />
    <Route path="/air/check-in" component={CheckIn} />
    <Route path="/air/low-fare-calendar" component={AirBooking} />
    <Route path="/car/booking" component={CarBooking} />
    <Route path="/car/cancel" component={CarCancel} />
    <Route path="/car/cancel-reservation" component={CarCancel} />
    <Route path="/check-in" component={CheckIn} />
    <Route path="/companion" component={Companion} />
    <Route path="/enroll" component={Enroll} />
    <Route path="/my-account" component={MyAccount} />
    <Route path="/travel-advisories" component={TravelAdvisory} />
    <Route path="/travel-funds" component={TravelFunds} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/blank" component={BlankPage} />
    <Route exact path="/home/offers" component={OffersPage} />
    <Route exact path="/payment/external" component={ExternalPaymentPage} />
    {USER_CAN_CHANGE_TOGGLES && <Route exact path="/feature-toggles" component={FeatureTogglePage} />}
    {USER_CAN_CHANGE_TOGGLES && <Route exact path="/view-app-config" component={ViewAppConfigPage} />}
    {USER_CAN_CHANGE_TOGGLES && <Route exact path="/generate-error" component={GenerateErrorPage} />}
  </App>
);
