// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router';
import AirChangeApplyTravelFundsPage from 'src/airChange/pages/airChangeApplyTravelFundsPage';
import AirChangeConfirmationPage from 'src/airChange/pages/airChangeConfirmationPage';
import AirChangeContactMethodPage from 'src/airChange/pages/airChangeContactMethodPage';
import AirChangePaymentPage from 'src/airChange/pages/airChangePaymentPage';
import AirChangeReviewPage from 'src/airChange/pages/airChangeReviewPage';
import UpgradeFarePage from 'src/airUpgrade/pages/upgradeFarePage';
import UpgradeFareSelectBoundsPage from 'src/airUpgrade/pages/upgradeFareSelectBoundsPage';

import type { Match } from 'react-router';

type Props = {
  AIR_UPGRADE: boolean,
  match: Match
};

export const AirUpgrade = (props: Props) => {
  const { AIR_UPGRADE, match } = props;

  return (
    <div>
      {AIR_UPGRADE ? (
        <>
          <Route exact path={`${match.url}`} component={UpgradeFarePage} />
          <Route exact path={`${match.url}/select-bounds`} component={UpgradeFareSelectBoundsPage} />

          <Route exact path={`${match.url}/index.html`} component={UpgradeFarePage} />
          <Route exact path={`${match.url}/select.html`} component={UpgradeFareSelectBoundsPage} />
          <Route exact path={`${match.url}/purchase/paypal-canceled`} component={AirChangeReviewPage} />
          <Route exact path={`${match.url}/purchase/paypal`} component={AirChangeReviewPage} />
          <Route exact path={`${match.url}/purchase.html`} component={AirChangeReviewPage} />
          <Route exact path={`${match.url}/confirmation.html`} component={AirChangeConfirmationPage} />

          <Route exact path={`${match.url}/payment`} component={AirChangePaymentPage} />
          <Route exact path={`${match.url}/contact-method`} component={AirChangeContactMethodPage} />
          <Route exact path={`${match.url}/apply-travel-funds`} component={AirChangeApplyTravelFundsPage} />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  AIR_UPGRADE: _.get(state, 'app.toggles.AIR_UPGRADE', false)
});

const enhancers = _.flowRight(withRouter, connect(mapStateToProps, {}));

export default enhancers(AirUpgrade);
