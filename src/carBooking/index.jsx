// @flow
import _ from 'lodash';
import React from 'react';
import { Route, withRouter } from 'react-router';
import CarBookingConfirmationPage from 'src/carBooking/pages/carBookingConfirmationPage';
import CarBookingPricingPage from 'src/carBooking/pages/carBookingPricingPage';
import CarBookingPurchasePage from 'src/carBooking/pages/carBookingPurchasePage';
import CarBookingRecentSearchesPage from 'src/carBooking/pages/carBookingRecentSearchesPage';
import CarBookingSearchPage from 'src/carBooking/pages/carBookingSearchPage';
import CarShoppingResultsPage from 'src/carBooking/pages/carShoppingResultsPage';
import DriverInfoEditPage from 'src/carBooking/pages/driverInfoEditPage';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class CarBooking extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="car-booking">
        <Route
          exact
          path={`${match.url}`}
          component={withFlowStatus({
            action: { setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'carBooking') }
          })(CarBookingSearchPage)}
        />
        <Route exact path={`${match.url}/index.html`} component={CarBookingSearchPage} />
        <Route exact path={`${match.url}/recent`} component={CarBookingRecentSearchesPage} />
        <Route exact path={`${match.url}/recent.html`} component={CarBookingRecentSearchesPage} />
        <Route exact path={`${match.url}/results`} component={CarShoppingResultsPage} />
        <Route exact path={`${match.url}/select.html`} component={CarShoppingResultsPage} />
        <Route exact path={`${match.url}/pricing`} component={CarBookingPricingPage} />
        <Route exact path={`${match.url}/price.html`} component={CarBookingPricingPage} />
        <Route exact path={`${match.url}/purchase.html`} component={CarBookingPurchasePage} />
        <Route exact path={`${match.url}/purchase`} component={CarBookingPurchasePage} />
        <Route exact path={`${match.url}/driver-info.html`} component={DriverInfoEditPage} />
        <Route exact path={`${match.url}/driver-info`} component={DriverInfoEditPage} />
        <Route exact path={`${match.url}/confirmation`} component={CarBookingConfirmationPage} />
        <Route exact path={`${match.url}/confirmation.html`} component={CarBookingConfirmationPage} />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(CarBooking);
