import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import LookUpTravelFundsPage from 'src/travelFunds/pages/lookUpTravelFundsPage';
import TransferTravelFundsPage from 'src/travelFunds/pages/transferTravelFundsPage';
import TransferTravelFundsConfirmationPage from 'src/travelFunds/pages/transferTravelFundsConfirmationPage';

class TravelFunds extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="travel-funds">
        <Route exact path={`${match.url}/look-up`} component={LookUpTravelFundsPage} />
        <Route exact path={`${match.url}/transfer-funds`} component={TransferTravelFundsPage} />
        <Route
          exact
          path={`${match.url}/transfer-funds/confirmation`}
          component={TransferTravelFundsConfirmationPage}
        />

        <Route exact path={`${match.url}/`} component={LookUpTravelFundsPage} />
        <Route exact path={`${match.url}/index.html`} component={LookUpTravelFundsPage} />
        <Route exact path={`${match.url}/transfer-review.html`} component={TransferTravelFundsPage} />
        <Route
          exact
          path={`${match.url}/transfer-confirmation.html`}
          component={TransferTravelFundsConfirmationPage}
        />
      </div>
    );
  }
}

TravelFunds.propTypes = {
  match: PropTypes.object
};

export default TravelFunds;