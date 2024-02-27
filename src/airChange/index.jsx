import React from 'react';
import _ from 'lodash';
import { Route, withRouter } from 'react-router';
import PropTypes from 'prop-types';

import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

import AirChangeSelectPage from 'src/airChange/pages/airChangeSelectPage';
import AirChangeShoppingSearchPage from 'src/airChange/pages/airChangeShoppingSearchPage';
import AirChangeShoppingPage from 'src/airChange/pages/airChangeShoppingPage';
import AirChangeReviewPage from 'src/airChange/pages/airChangeReviewPage';
import AirChangePaymentPage from 'src/airChange/pages/airChangePaymentPage';
import AirChangeConfirmationPage from 'src/airChange/pages/airChangeConfirmationPage';
import AirChangeSummaryPage from 'src/airChange/pages/airChangeSummaryPage';
import AirChangeRepricingPage from 'src/airChange/pages/airChangeRepricingPage';
import AirChangeContactMethodPage from 'src/airChange/pages/airChangeContactMethodPage';
import AirReaccomTripSummaryPage from 'src/airChange/pages/airReaccomTripSummaryPage';
import AirChangeApplyTravelFundsPage from 'src/airChange/pages/airChangeApplyTravelFundsPage';
import FareDetailsPage from 'src/wcm/pages/fareDetails';
import AirChangeSelectFarePage from 'src/airChange/pages/airChangeSelectFarePage';
import AirChangeSelectPassengersPage from 'src/airChange/pages/airChangeSelectPassengersPage';

class AirChange extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="air-change">
        <Route exact path={match.url} component={AirChangeSelectPage} />
        <Route exact path={`${match.url}/shopping`} component={AirChangeShoppingSearchPage} />
        <Route
          exact
          path={`${match.url}/shopping/:paxType/:direction/select-fare`}
          component={AirChangeSelectFarePage}
        />
        <Route exact path={`${match.url}/confirmation`} component={AirChangeConfirmationPage} />
        <Route exact path={`${match.url}/pricing/payment`} component={AirChangePaymentPage} />
        <Route exact path={`${match.url}/pricing/repricing`} component={AirChangeRepricingPage} />
        <Route exact path={`${match.url}/pricing/review/paypal-canceled`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/pricing/review/paypal`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/pricing/review`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/pricing/summary`} component={AirChangeSummaryPage} />
        <Route exact path={`${match.url}/reaccom/summary`} component={AirReaccomTripSummaryPage} />
        <Route exact path={`${match.url}/select-passengers`} component={AirChangeSelectPassengersPage} />
        <Route exact path={`${match.url}/shopping/:paxType/:direction/results`} component={AirChangeShoppingPage} />
        <Route exact path={`${match.url}/shopping/fare-details`} component={FareDetailsPage} />

        <Route exact path={`${match.url}/:direction/results`} component={AirChangeShoppingPage} />
        <Route exact path={`${match.url}/:direction/select-fare`} component={AirChangeSelectFarePage} />
        <Route exact path={`${match.url}/confirmation.html`} component={AirChangeConfirmationPage} />
        <Route exact path={`${match.url}/fare-details`} component={FareDetailsPage} />
        <Route exact path={`${match.url}/find-flights.html`} component={AirChangeShoppingSearchPage} />
        <Route exact path={`${match.url}/payment`} component={AirChangePaymentPage} />
        <Route exact path={`${match.url}/price.html`} component={AirChangeSummaryPage} />
        <Route exact path={`${match.url}/reconcile/paypal-canceled`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/reconcile/paypal`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/details`} component={AirReaccomTripSummaryPage} />
        <Route exact path={`${match.url}/reconcile.html`} component={AirChangeReviewPage} />
        <Route exact path={`${match.url}/reprice`} component={AirChangeRepricingPage} />
        <Route exact path={`${match.url}/select-passengers.html`} component={AirChangeSelectPassengersPage} />
        <Route exact path={`${match.url}/view.html`} component={AirChangeSelectPage} />

        <Route exact path={`${match.url}/contact-method`} component={AirChangeContactMethodPage} />
        <Route exact path={`${match.url}/apply-travel-funds`} component={AirChangeApplyTravelFundsPage} />
      </div>
    );
  }
}

AirChange.propTypes = {
  match: PropTypes.object
};

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(AirChange);
