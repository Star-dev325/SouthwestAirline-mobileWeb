import React from 'react';
import _ from 'lodash';
import { Route, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import EarlyBirdCheckInPage from 'src/earlyBird/pages/earlyBirdCheckInPage';
import EarlyBirdDetailPage from 'src/earlyBird/pages/earlyBirdDetailPage';
import EarlyBirdReview from 'src/earlyBird/pages/earlyBirdReviewPage';
import EarlyBirdConfirmationPage from 'src/earlyBird/pages/earlyBirdConfirmationPage';
import EarlyBirdPayment from 'src/earlyBird/pages/earlyBirdPayment';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';

class EarlyBird extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="earlyBird">
        <Route
          exact
          path={`${match.url}/checkin`}
          component={withFlowStatus({
            action: {
              setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'earlyBird')
            }
          })(EarlyBirdCheckInPage)}
        />
        <Route exact path={`${match.url}/checkin/:pnr`} component={EarlyBirdDetailPage} />
        <Route exact path={`${match.url}/checkin/:pnr/payment`} component={EarlyBirdPayment} />
        <Route exact path={`${match.url}/checkin/:pnr/review`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/checkin/:pnr/review/paypal`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/checkin/:pnr/review/paypal-canceled`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/checkin/:pnr/confirmation`} component={EarlyBirdConfirmationPage} />

        <Route
          exact
          path={`${match.url}/index.html`}
          component={withFlowStatus({
            action: {
              setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'earlyBird')
            }
          })(EarlyBirdCheckInPage)}
        />
        <Route
          exact
          path={`${match.url}/`}
          component={withFlowStatus({
            action: {
              setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'earlyBird')
            }
          })(EarlyBirdCheckInPage)}
        />
        <Route exact path={`${match.url}/select.html`} component={EarlyBirdDetailPage} />
        <Route exact path={`${match.url}/payment.html`} component={EarlyBirdPayment} />
        <Route exact path={`${match.url}/purchase.html`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/purchase/paypal`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/purchase/paypal-canceled`} component={EarlyBirdReview} />
        <Route exact path={`${match.url}/confirmation.html`} component={EarlyBirdConfirmationPage} />
      </div>
    );
  }
}

EarlyBird.propTypes = {
  match: PropTypes.object
};

export default withRouter(EarlyBird);
