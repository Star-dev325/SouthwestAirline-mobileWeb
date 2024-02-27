import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router';
import AddManualIrnPage from 'src/airBooking/pages/addManualIrnPage';
import AirBookingApplyRapidRewardsPage from 'src/airBooking/pages/airBookingApplyRapidRewardsPage';
import AirBookingApplyTravelFundsPage from 'src/airBooking/pages/airBookingApplyTravelFundsPage';
import AirBookingBillingAddressPage from 'src/airBooking/pages/airBookingBillingAddressPage';
import AirBookingContactMethodPage from 'src/airBooking/pages/airBookingContactMethodPage';
import AirBookingDutyOfCareInfoPage from 'src/airBooking/pages/airBookingDutyOfCareInfoPage';
import AirBookingPassengerPassport from 'src/airBooking/pages/airBookingPassengerPassportPage';
import AirBookingSpecialAssistancePage from 'src/airBooking/pages/airBookingSpecialAssistancePage';
import FlightSelectDepartFarePage from 'src/airBooking/pages/flightSelectDepartFarePage';
import FlightSelectReturnFarePage from 'src/airBooking/pages/flightSelectReturnFarePage';
import FlightShoppingDepartPage from 'src/airBooking/pages/flightShoppingDepartPage';
import FlightShoppingPage from 'src/airBooking/pages/flightShoppingPage';
import FlightShoppingReturnPage from 'src/airBooking/pages/flightShoppingReturnPage';
import FrequentTravelers from 'src/airBooking/pages/frequentTravelersPage';
import InternalReferenceNumberSelect from 'src/airBooking/pages/internalReferenceNumberSelect';
import LowFareCalendarDateSelectPage from 'src/airBooking/pages/lowFareCalendarDateSelectPage';
import LowFareCalendarPage from 'src/airBooking/pages/lowFareCalendarPage';
import PassengerInfoEdit from 'src/airBooking/pages/passengerInfoEdit';
import PassengerInformation from 'src/airBooking/pages/passengerInformation';
import PaymentEdit from 'src/airBooking/pages/paymentEdit';
import PricingSummaryPage from 'src/airBooking/pages/pricingSummaryPage';
import PurchaseConfirmationPage from 'src/airBooking/pages/purchaseConfirmationPage';
import PurchaseSummaryPage from 'src/airBooking/pages/purchaseSummaryPage';
import RecentShoppingSearchesPage from 'src/airBooking/pages/recentSearchesPage';
import RepricingConfirmationPage from 'src/airBooking/pages/repricingConfirmationPage';
import SelectCompanyPage from 'src/airBooking/pages/selectCompanyPage';
import SelectPassengersCountPage from 'src/airBooking/pages/selectPassengersCountPage';
import ShoppingLandingPage from 'src/airBooking/pages/shoppingLandingPage';
import TripAndPriceDetails from 'src/airBooking/pages/tripAndPriceDetails';
import YoungTravelerEditPage from 'src/airBooking/pages/youngTravelerEditPage';
import YoungTravelerPage from 'src/airBooking/pages/youngTravelerPage';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import FareDetailsPage from 'src/wcm/pages/fareDetails';
import YoungTravelerParentConsent from 'src/wcm/pages/youngTravelerParentConsent';

class Booking extends React.Component {
  render() {
    const { match } = this.props;
    
    return (
      <div className="booking">
        <Route exact path={`${match.url}/confirmation`} component={PurchaseConfirmationPage} />
        <Route
          exact
          path={`${match.url}/shopping`}
          component={withFlowStatus({
            action: { setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'airBooking') }
          })(ShoppingLandingPage)}
        />
        <Route exact path={`${match.url}/passengers/:paxNumber/edit`} component={PassengerInfoEdit} />
        <Route exact path={`${match.url}/passengers/:paxNumber/frequent-travelers`} component={FrequentTravelers} />
        <Route exact path={`${match.url}/passengers/:paxNumber/passport`} component={AirBookingPassengerPassport} />
        <Route exact path={`${match.url}/passengers/:paxNumber/special-assistance`} component={AirBookingSpecialAssistancePage} />
        <Route exact path={`${match.url}/passengers/:paxNumber`} component={PassengerInformation} />
        <Route exact path={`${match.url}/pricing/repricing`} component={RepricingConfirmationPage} />
        <Route exact path={`${match.url}/pricing/review`} component={TripAndPriceDetails} />
        <Route exact path={`${match.url}/pricing/summary`} component={PricingSummaryPage} />
        <Route exact path={`${match.url}/review/paypal-canceled`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/review/paypal`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/review`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/shopping/:paxType/:direction/results`} component={FlightShoppingPage} />
        <Route exact path={`${match.url}/shopping/:paxType/outbound/select-fare`} component={FlightSelectDepartFarePage} />
        <Route exact path={`${match.url}/shopping/:paxType/inbound/select-fare`} component={FlightSelectReturnFarePage} />
        <Route exact path={`${match.url}/shopping/fare-details`} component={FareDetailsPage} />
        <Route exact path={`${match.url}/shopping/low-fare-calendar/date-select`} component={LowFareCalendarDateSelectPage} />
        <Route exact path={`${match.url}/shopping/low-fare-calendar`} component={LowFareCalendarPage} />
        <Route exact path={`${match.url}/shopping/recent`} component={RecentShoppingSearchesPage} />
        <Route exact path={`${match.url}/shopping/select-company`} component={SelectCompanyPage} />
        <Route exact path={`${match.url}/shopping/select-passengers`} component={SelectPassengersCountPage} />
        <Route
          exact
          path={`/air/booking`}
          component={withFlowStatus({
            action: { setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'airBooking') }
          })(ShoppingLandingPage)}
        />
        <Route
          exact
          path={`/air/booking/index.html`}
          component={withFlowStatus({
            action: { setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'airBooking') }
          })(ShoppingLandingPage)}
        />
        <Route exact path={`${match.url}/:direction/results`} component={FlightShoppingPage} />
        <Route exact path={`${match.url}/select-depart.html`} component={FlightShoppingDepartPage} />
        <Route exact path={`${match.url}/select-return.html`} component={FlightShoppingReturnPage} />
        <Route exact path={`${match.url}/select-fare-depart.html`} component={FlightSelectDepartFarePage} />
        <Route exact path={`${match.url}/select-fare-return.html`} component={FlightSelectReturnFarePage} />
        <Route exact path={`${match.url}/confirmation.html`} component={PurchaseConfirmationPage} />
        <Route exact path={`${match.url}/fare-details`} component={FareDetailsPage} />
        <Route exact path={`${match.url}/low-fare-calendar/date-select`} component={LowFareCalendarDateSelectPage} />
        <Route exact path={`/air/low-fare-calendar/date-select`} component={LowFareCalendarDateSelectPage} />
        <Route exact path={`/air/low-fare-calendar/`} component={LowFareCalendarPage} />
        <Route exact path={`${match.url}/passenger/:paxNumber/edit`} component={PassengerInfoEdit} />
        <Route exact path={`${match.url}/passenger/:paxNumber/frequent-travelers`} component={FrequentTravelers} />
        <Route exact path={`${match.url}/passenger/:paxNumber/passport`} component={AirBookingPassengerPassport} />
        <Route exact path={`${match.url}/passenger/:paxNumber/special-assistance`} component={AirBookingSpecialAssistancePage} />
        <Route exact path={`${match.url}/passenger/:paxNumber`} component={PassengerInformation} />
        <Route exact path={`${match.url}/price.html`} component={PricingSummaryPage} />
        <Route exact path={`${match.url}/price/detail`} component={TripAndPriceDetails} />
        <Route exact path={`${match.url}/purchase.html`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/purchase/paypal-canceled`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/purchase/paypal`} component={PurchaseSummaryPage} />
        <Route exact path={`${match.url}/recent`} component={RecentShoppingSearchesPage} />
        <Route exact path={`${match.url}/reprice`} component={RepricingConfirmationPage} />
        <Route exact path={`${match.url}/select-company`} component={SelectCompanyPage} />
        <Route exact path={`${match.url}/select-dates.html`} component={LowFareCalendarPage} />
        <Route exact path={`${match.url}/select-passenger`} component={SelectPassengersCountPage} />
        <Route exact path={`${match.url}/irn-info`} component={InternalReferenceNumberSelect} />
        <Route exact path={`${match.url}/manual-irn`} component={AddManualIrnPage} />

        <Route exact path={`${match.url}/payment/edit`} component={PaymentEdit} />
        <Route exact path={`${match.url}/apply-rapid-rewards`} component={AirBookingApplyRapidRewardsPage} />
        <Route exact path={`${match.url}/apply-travel-funds`} component={AirBookingApplyTravelFundsPage} />
        <Route exact path={`${match.url}/contact-method`} component={AirBookingContactMethodPage} />
        <Route exact path={`${match.url}/contact-info-travel-manager`} component={AirBookingDutyOfCareInfoPage} />
        <Route exact path={`${match.url}/irnInfo`} component={InternalReferenceNumberSelect} />
        <Route exact path={`${match.url}/addManualIrn`} component={AddManualIrnPage} />
        <Route exact path={`${match.url}/billing-address`} component={AirBookingBillingAddressPage} />
        <Route exact path={`${match.url}/young-traveler`} component={YoungTravelerPage} />
        <Route exact path={`${match.url}/young-traveler-parent-consent`} component={YoungTravelerParentConsent} />
        <Route exact path={`${match.url}/young-traveler/edit`} component={YoungTravelerEditPage} />
      </div>
    );
  }
}

Booking.propTypes = {
  match: PropTypes.object
};

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(Booking);
