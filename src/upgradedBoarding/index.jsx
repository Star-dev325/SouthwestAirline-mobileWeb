// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import UpgradedBoardingPage from 'src/upgradedBoarding/pages/upgradedBoardingPage';
import UpgradedBoardingPaymentPage from 'src/upgradedBoarding/pages/upgradedBoardingPaymentPage';
import UpgradedBoardingPurchasePage from 'src/upgradedBoarding/pages/upgradedBoardingPurchasePage';
import UpgradedBoardingConfirmationPage from 'src/upgradedBoarding/pages/upgradedBoardingConfirmationPage';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';

import type { Match } from 'react-router';

type Props = {
  match: Match,
  UPGRADED_BOARDING: boolean
};

export const UpgradedBoarding = (props: Props) => {
  const { match, UPGRADED_BOARDING } = props;

  return (
    <div className="upgraded-boarding">
      {UPGRADED_BOARDING ? (
        <React.Fragment>
          <Route
            exact
            path={`${match.url}`}
            component={withFlowStatus({
              action: {
                setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'upgradedBoarding')
              }
            })(UpgradedBoardingPage)}
          />
          <Route exact path={`${match.url}/payment`} component={UpgradedBoardingPaymentPage} />
          <Route exact path={`${match.url}/purchase`} component={UpgradedBoardingPurchasePage} />
          <Route exact path={`${match.url}/purchase/paypal`} component={UpgradedBoardingPurchasePage} />
          <Route exact path={`${match.url}/purchase/paypal-canceled`} component={UpgradedBoardingPurchasePage} />
          <Route exact path={`${match.url}/confirmation`} component={UpgradedBoardingConfirmationPage} />
          <Route
            exact
            path={`${match.url}/index.html`}
            component={withFlowStatus({
              action: {
                setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'upgradedBoarding')
              }
            })(UpgradedBoardingPage)}
          />
          <Route exact path={`${match.url}/purchase.html`} component={UpgradedBoardingPurchasePage} />
          <Route exact path={`${match.url}/confirmation.html`} component={UpgradedBoardingConfirmationPage} />
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  UPGRADED_BOARDING: _.get(state, 'app.toggles.UPGRADED_BOARDING', false)
});

const enhancers = _.flowRight(withRouter, connect(mapStateToProps, {}));

export default enhancers(UpgradedBoarding);
