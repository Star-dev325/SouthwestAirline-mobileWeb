import React from 'react';
import { Route, withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import SearchFlights from 'src/flightStatus/pages/flightStatusLandingPage';
import SearchFlightsResultsPage from 'src/flightStatus/pages/searchFlightsResultsPage';
import FlightDetailsPage from 'src/flightStatus/pages/flightDetailsPage';
import FlightStatusRecentPage from 'src/flightStatus/pages/flightStatusRecentPage';
import { flowRight } from 'src/shared/helpers/jsUtils';

class FlightStatus extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/flight-status" component={SearchFlights} />
        <Route exact path="/flight-status/recent" component={FlightStatusRecentPage} />
        <Route exact path="/flight-status/:from/:to/:date" component={SearchFlightsResultsPage} />
        <Route exact path="/flight-details" component={FlightDetailsPage} />

        <Route exact path="/air/flight-status/" component={SearchFlights} />
        <Route exact path="/air/flight-status/index.html" component={SearchFlights} />
        <Route exact path="/air/flight-status/recent.html" component={FlightStatusRecentPage} />
        <Route exact path="/air/flight-status/results.html" component={SearchFlightsResultsPage} />
        <Route exact path="/air/flight-status/details.html" component={FlightDetailsPage} />
      </div>
    );
  }
}

const enhancers = flowRight(withRouter, withRouterHandler);

export default enhancers(FlightStatus);
