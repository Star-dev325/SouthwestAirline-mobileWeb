// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { hideGlobalHeader, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';

type Props = {
  hideGlobalHeaderFn: () => void,
  resetGlobalHeaderFn: () => void
};

const withHideGlobalHeader = (Component: *) => {
  class WithHideGlobalHeaderComponent extends React.Component<Props> {
    componentDidMount() {
      this.props.hideGlobalHeaderFn();
    }

    componentWillUnmount() {
      this.props.resetGlobalHeaderFn();
    }

    render() {
      const restProps = _.omit(this.props, ['hideGlobalHeaderFn', 'resetGlobalHeaderFn']);

      return <Component {...restProps} />;
    }
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = {
    hideGlobalHeaderFn: hideGlobalHeader,
    resetGlobalHeaderFn: resetGlobalHeader
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithHideGlobalHeaderComponent);
};

export default withHideGlobalHeader;
