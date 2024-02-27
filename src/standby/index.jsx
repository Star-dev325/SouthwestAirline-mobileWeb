// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import EnhancedStandbyPage from 'src/standby/pages/enhancedStandbyPage';
import StandbyPage from 'src/standby/pages/standbyPage';
import CancelConfirmationStandbyPage from 'src/standby/pages/cancelStandbyListConfirmationPage';

type Props = {
  isEnhancedStandbyList: boolean
};

class Standby extends React.Component<Props> {
  render() {
    const { isEnhancedStandbyList } = this.props;

    return (
      <div className="stand-by">
        <Route exact path="/standby" component={isEnhancedStandbyList ? EnhancedStandbyPage : StandbyPage} />
        <Route exact path="/standby/cancel-confirmation" component={CancelConfirmationStandbyPage} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEnhancedStandbyList: _.get(state, 'app.toggles.ENHANCED_STANDBY_LIST')
});

const enhancers = _.flowRight(withRouter, withRouterHandler, connect(mapStateToProps));

export default enhancers(Standby);
