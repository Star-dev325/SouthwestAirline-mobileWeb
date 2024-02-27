import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import CancelBoundConfirmationPage from 'src/airCancel/pages/airCancelBoundConfirmationPage';
import CancelBoundSelectPage from 'src/airCancel/pages/airCancelBoundSelectPage';
import CancelRefundQuotePage from 'src/airCancel/pages/airCancelRefundQuotePage';
import AirCancelSelectPassengersPage from 'src/airCancel/pages/airCancelSelectPassengersPage';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

class AirCancel extends React.Component {
  render() {
    const { match } = this.props;
    
    return (
      <div className="air-cancel">
        <Switch>
          <Route component={AirCancelSelectPassengersPage} exact path={`${match.url}/select-passengers`} />
          <Route component={CancelBoundConfirmationPage} exact path={`${match.url}/:recordLocator/refund-summary`} />
          <Route component={CancelBoundSelectPage} exact path={`${match.url}/:recordLocator/select-bound`} />
          <Route component={AirCancelSelectPassengersPage} exact path={`${match.url}/select-passengers.html`} />
          <Route
            component={withFlowStatus({
              action: {
                setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'airCancel')
              },
              flowStatus: STATUS.IN_PROGRESS
            })(CancelRefundQuotePage)}
            exact
            path={`${match.url}/refund-quote.html`}
          />
          <Route component={CancelBoundConfirmationPage} exact path={`${match.url}/summary.html`} />
          <Route component={CancelBoundSelectPage} exact path={`/air/cancel-reservation/`} />
          <Route component={CancelBoundSelectPage} exact path={`${match.url}/view.html`} />
          <Route
            component={withFlowStatus({
              action: {
                setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'airCancel')
              },
              flowStatus: STATUS.IN_PROGRESS
            })(CancelRefundQuotePage)}
            exact
            path={`${match.url}/:recordLocator`}
          />
        </Switch>
      </div>
    );
  }
}

AirCancel.propTypes = {
  match: PropTypes.object
};

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(AirCancel);