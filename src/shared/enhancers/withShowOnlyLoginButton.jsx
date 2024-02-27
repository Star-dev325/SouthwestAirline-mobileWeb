// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { showOnlyLogin, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';

type Props = {
  showOnlyLoginFn: () => void,
  resetGlobalHeaderFn: () => void
};

const withShowOnlyLoginButton = (Component: *) => {
  class WithShowOnlyLoginButtonComponent extends React.Component<Props> {
    componentDidMount() {
      this.props.showOnlyLoginFn();
    }

    componentWillUnmount() {
      this.props.resetGlobalHeaderFn();
    }

    render() {
      const restProps = _.omit(this.props, ['showOnlyLoginFn', 'resetGlobalHeaderFn']);

      return <Component {...restProps} />;
    }
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = {
    showOnlyLoginFn: showOnlyLogin,
    resetGlobalHeaderFn: resetGlobalHeader
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithShowOnlyLoginButtonComponent);
};

export default withShowOnlyLoginButton;
