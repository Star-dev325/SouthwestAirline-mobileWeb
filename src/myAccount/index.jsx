// @flow
import React from 'react';
import { Route, withRouter } from 'react-router';
import _ from 'lodash';

import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import MyAccountLandingPage from 'src/myAccount/pages/myAccountLandingPage';
import RapidRewardsSnapshotPage from 'src/myAccount/pages/rapidRewardsSnapshotPage';
import RapidRewardsEnrollPage from 'src/myAccount/pages/rapidRewardsEnrollPage';
import TierBenefitsPage from 'src/myAccount/pages/tierBenefitsPage';
import ExclusivePromotionsPage from 'src/myAccount/pages/exclusivePromotionsPage';
import ExclusivePromotionDetailsPage from 'src/myAccount/pages/exclusivePromotionDetailsPage';
import SavedFlightsPage from 'src/myAccount/pages/savedFlightsPage';
import PastFlightsPage from 'src/myAccount/pages/pastFlightsPage';
import UpcomingTripsPage from 'src/myAccount/pages/upcomingTripsPage';
import UpcomingTripDetailsPage from 'src/myAccount/pages/upcomingTripDetailsPage';
import DayOfTravelContactMethodPage from 'src/shared/pages/dayOfTravelContactMethodPage';
import MyPromoCodesPage from './pages/myPromoCodesPage';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class MyAccount extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="my-account">
        <Route exact path={`${match.url}`} component={MyAccountLandingPage} />
        <Route exact path={`${match.url}/enroll-rapid-rewards`} component={RapidRewardsEnrollPage} />
        <Route exact path={`${match.url}/my-rapid-rewards`} component={RapidRewardsSnapshotPage} />
        <Route exact path={`${match.url}/my-rapid-rewards/promotions`} component={ExclusivePromotionsPage} />
        <Route exact path={`${match.url}/tier-benefits-page`} component={TierBenefitsPage} />
        <Route exact path={`${match.url}/promotion-detail`} component={ExclusivePromotionDetailsPage} />
        <Route exact path={`${match.url}/upcoming-trips`} component={UpcomingTripsPage} />
        <Route exact path={`${match.url}/saved-flights`} component={SavedFlightsPage} />
        <Route exact path={`${match.url}/past-flights`} component={PastFlightsPage} />
        <Route exact path={`${match.url}/upcoming-trip-details/:tripIndex`} component={UpcomingTripDetailsPage} />
        <Route exact path={`${match.url}/promo-codes`} component={MyPromoCodesPage} />
        <Route
          exact
          path={`${match.url}/upcoming-trip-details/:tripIndex/contact-method`}
          component={DayOfTravelContactMethodPage}
        />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(MyAccount);
