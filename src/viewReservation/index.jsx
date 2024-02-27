// @flow
import _ from 'lodash';
import React from 'react';
import { Route, withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import DayOfTravelContactMethodPage from 'src/shared/pages/dayOfTravelContactMethodPage';
import TravelInformationPage from 'src/viewReservation/pages/travelInformationPage';
import ViewCarReservationDetailsPage from 'src/viewReservation/pages/viewCarReservationDetailsPage';
import ViewReservationDetailsPage from 'src/viewReservation/pages/viewReservationDetailPage';
import ViewReservationPage from 'src/viewReservation/pages/viewReservationPage';
import ViewReservationSpecialAssistancePage from 'src/viewReservation/pages/viewReservationSpecialAssistancePage';
import ViewReservationDayOfTravelContactMethodPage from 'src/viewReservation/pages/viewReservationDayOfTravelContactMethodPage';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class ViewReservation extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="view-reservation">
        <Route exact path={match.url} component={ViewReservationPage} />
        <Route exact path={`${match.url}/trip-details/:recordLocator`} component={ViewReservationDetailsPage} />
        <Route
          exact
          path={`${match.url}/trip-details/travel-info-page/:passengerReference`}
          component={TravelInformationPage}
        />
        <Route exact path={`${match.url}/car-details`} component={ViewCarReservationDetailsPage} />
        <Route
          exact
          path={`${match.url}/trip-details/travel-info-page/:passengerReference/special-assistance`}
          component={ViewReservationSpecialAssistancePage}
        />
        <Route
          exact
          path={`${match.url}/trip-details/:recordLocator/contact-method`}
          component={DayOfTravelContactMethodPage}
        />

        <Route exact path={`${match.url}/index.html`} component={ViewReservationPage} />
        <Route exact path={`/air/manage-reservation/view.html`} component={ViewReservationDetailsPage} />
        <Route
          exact
          path={`${match.url}/contact-information.html`}
          component={ViewReservationDayOfTravelContactMethodPage}
        />
        <Route
          exact
          path={`${match.url}/traveler-information.html`}
          component={TravelInformationPage}
        />
        <Route
          exact
          path={`${match.url}/disability-options.html`}
          component={ViewReservationSpecialAssistancePage}
        />
        <Route exact path={`/car/manage-reservation/view.html`} component={ViewCarReservationDetailsPage} />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(ViewReservation);
