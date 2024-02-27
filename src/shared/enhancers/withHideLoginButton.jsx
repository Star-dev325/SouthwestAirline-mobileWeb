// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { hideButton, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';

type Props = {
  hideButtonFn: () => void,
  resetGlobalHeaderFn: () => void
};

const withHideLoginButton = (Component: *) => {
  class WithHideLoginButtonComponent extends React.Component<Props> {
    componentDidMount() {
      this.props.hideButtonFn();
    }

    componentWillUnmount() {
      this.props.resetGlobalHeaderFn();
    }

    render() {
      const restProps = _.omit(this.props, ['hideButtonFn', 'resetGlobalHeaderFn']);

      return <Component {...restProps} />;
    }
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = {
    hideButtonFn: hideButton,
    resetGlobalHeaderFn: resetGlobalHeader
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithHideLoginButtonComponent);
};

export default withHideLoginButton;
