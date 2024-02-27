// @flow
import React from 'react';
import { connect } from 'react-redux';
import { store } from 'src/shared/redux/createStore';
import RouterStore from 'src/shared/stores/routerStore';
import { isBrowserBackOrForward, shouldCleanFlow, isModalOpen } from 'src/shared/routeUtils/routeStateHelper';
import { STATUS } from 'src/shared/constants/flowConstants';
import { addHistoryForceRedirect } from 'src/shared/actions/historyActions';

type Options = {
  action: *,
  flowStatus?: string
};

type Props = {
  currentRouteState: *
};

const withFlowStatus = (options: Options) => (Component: *) => {
  const { action, flowStatus = STATUS.INITIAL } = options;

  class WithFlowStatusComponent extends React.Component<Props> {
    componentDidMount() {
      const { currentRouteState } = this.props;

      this._isForceRedirectNeeded() && store.dispatch(addHistoryForceRedirect(currentRouteState.pathname));
      !isBrowserBackOrForward(currentRouteState) && store.dispatch(action.setFlowStatus(flowStatus));
    }

    _isForceRedirectNeeded = () => {
      const { currentRouteState } = this.props;

      return (
        !isBrowserBackOrForward(currentRouteState) &&
        shouldCleanFlow(currentRouteState) &&
        !RouterStore.isComingFromHomePage() &&
        !isModalOpen(currentRouteState)
      );
    };

    render() {
      return !this._isForceRedirectNeeded() && <Component {...this.props} />;
    }
  }

  const mapStateToProps = () => ({
    currentRouteState: RouterStore.getCurrentState()
  });

  return connect(mapStateToProps, {})(WithFlowStatusComponent);
};

export default withFlowStatus;
