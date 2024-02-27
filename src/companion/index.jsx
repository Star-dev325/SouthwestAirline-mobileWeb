// @flow
import React from 'react';
import { Route, withRouter } from 'react-router';
import _ from 'lodash';
import CompanionPricingPage from 'src/companion/pages/companionPricingPage';
import CompanionPassengerPage from 'src/companion/pages/companionPassengerPage';
import CompanionConfirmationPage from 'src/companion/pages/companionConfirmationPage';
import CompanionTripAndPriceDetailsPage from 'src/companion/pages/companionTripAndPriceDetailsPage';
import CompanionPaymentEditPage from 'src/companion/pages/companionPaymentEditPage';
import CompanionPassengerEditPage from 'src/companion/pages/companionPassengerEditPage';
import CompanionContactMethodPage from 'src/companion/pages/companionContactMethodPage';
import CompanionPurchaseSummaryPage from 'src/companion/pages/companionPurchaseSummaryPage';
import CompanionSpecialAssistancePage from 'src/companion/pages/companionSpecialAssistancePage';
import CompanionApplyTravelFundsPage from 'src/companion/pages/companionApplyTravelFundsPage';
import CompanionBillingAddressPage from 'src/companion/pages/companionBillingAddressPage';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

const Companion = ({ match }: Props) => (
  <div className="companion">
    <Route exact path={`${match.url}/pricing`} component={CompanionPricingPage} />
    <Route exact path={`${match.url}/passenger`} component={CompanionPassengerPage} />
    <Route exact path={`${match.url}/purchase`} component={CompanionPurchaseSummaryPage} />
    <Route exact path={`${match.url}/purchase/paypal`} component={CompanionPurchaseSummaryPage} />
    <Route exact path={`${match.url}/purchase/paypal-canceled`} component={CompanionPurchaseSummaryPage} />
    <Route exact path={`${match.url}/confirmation`} component={CompanionConfirmationPage} />
    <Route exact path={`${match.url}/paymentEdit`} component={CompanionPaymentEditPage} />
    <Route exact path={`${match.url}/review`} component={CompanionTripAndPriceDetailsPage} />
    <Route exact path={`${match.url}/passengerEdit`} component={CompanionPassengerEditPage} />
    <Route exact path={`${match.url}/contact-method`} component={CompanionContactMethodPage} />
    <Route exact path={`${match.url}/special-assistance`} component={CompanionSpecialAssistancePage} />
    <Route exact path={`${match.url}/apply-travel-funds`} component={CompanionApplyTravelFundsPage} />
    <Route exact path={`${match.url}/billing-address`} component={CompanionBillingAddressPage} />
  </div>
);

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(Companion);
