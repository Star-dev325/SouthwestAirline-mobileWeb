import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import i18n from '@swa-ui/locale';

class LoginButton extends React.Component {
  static propTypes = {
    loginText: PropTypes.node,
    logoutText: PropTypes.node,
    transitionToSimpleLoginForm: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    onLoginClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  };

  static defaultProps = {
    loginText: i18n('SHARED__HEADER_BUTTON__LOGIN_SHORT'),
    logoutText: i18n('SHARED__HEADER_BUTTON__LOGOUT'),
    isLoggedIn: false,
    onLoginClick: _.noop,
    onLogoutClick: _.noop
  };

  _handleClick = () => {
    if (this.props.isLoggedIn) {
      this.props.onLogoutClick();
    } else {
      const { transitionToSimpleLoginForm } = this.props;

      this.props.onLoginClick({ transitionToSimpleLoginForm });
    }
  };

  render() {
    const { loginText, logoutText, isLoggedIn } = this.props;

    return (
      <div ref="loginButtonWrapper" className={cx(this.props.className)} onClick={this._handleClick}>
        <div className="right-btn login-btn" onClick={this._onLogoutClick}>
          {isLoggedIn ? logoutText : loginText}
        </div>
      </div>
    );
  }
}

export default LoginButton;
