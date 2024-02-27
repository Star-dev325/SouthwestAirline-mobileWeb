// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';
import LoginButton from 'src/shared/components/loginButton';
import GlobalHeaderLogo from 'src/shared/components/globalHeaderLogo';
import Icon from 'src/shared/components/icon';
import { clickEditButton, clickCancelButton } from 'src/shared/actions/globalHeaderActions';
import { toggleDrawer } from 'src/homeAndNav/actions/drawerActions';
import { refreshHomeNavMenu } from 'src/wcm/actions/wcmActions';
import {
  EDIT_SHOW_CANCEL_TEXT,
  EDIT_SHOW_EDIT_TEXT,
  LOGIN_SHOW_SHORT_TEXT,
  LOGIN_SHOW_LONG_TEXT
} from 'src/shared/constants/globalHeaderButtonStates';
import i18n from '@swa-ui/locale';

type Props = {
  isLoggedIn: boolean,
  onLoginClick: ({ transitionToSimpleLoginForm: boolean }) => void,
  onLogoutClick: () => void,
  buttonState: string,
  clickEditButtonFn: () => void,
  clickCancelButtonFn: () => void,
  showGlobalHeader: boolean,
  onLogoClick: () => void,
  className?: string,
  isWebView: boolean,
  isDrawerOpen: boolean,
  toggleDrawerFn: (boolean) => void,
  refreshHomeNavMenuFn: () => Promise<*>
};

export class GlobalHeader extends React.Component<Props> {
  _handleMenuIconClick = () => {
    const { toggleDrawerFn, isDrawerOpen, refreshHomeNavMenuFn } = this.props;

    !isDrawerOpen
      ? refreshHomeNavMenuFn()
        .catch(_.noop)
        .finally(() => toggleDrawerFn(isDrawerOpen))
      : toggleDrawerFn(isDrawerOpen);
  };

  _renderLoginButton = () => {
    const { isLoggedIn, onLoginClick, onLogoutClick, buttonState } = this.props;

    const buttonText =
      buttonState === LOGIN_SHOW_SHORT_TEXT
        ? i18n('SHARED__HEADER_BUTTON__LOGIN_SHORT')
        : i18n('SHARED__HEADER_BUTTON__LOGIN_LONG');

    return (
      <LoginButton
        loginText={<span className="login-button--box">{buttonText}</span>}
        transitionToSimpleLoginForm={buttonState === LOGIN_SHOW_SHORT_TEXT}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
    );
  };

  _renderEditButton = () => {
    const { buttonState, clickEditButtonFn, clickCancelButtonFn, toggleDrawerFn, isDrawerOpen } = this.props;
    const buttonText =
      buttonState === EDIT_SHOW_EDIT_TEXT ? i18n('SHARED__HEADER_BUTTON__EDIT') : i18n('SHARED__HEADER_BUTTON__CANCEL');

    return (
      <div
        className="right-btn edit-btn"
        onClick={() => {
          if (buttonState === EDIT_SHOW_EDIT_TEXT) {
            clickEditButtonFn();
          } else {
            clickCancelButtonFn();
          }
          toggleDrawerFn(isDrawerOpen);
        }}
      >
        {buttonText}
      </div>
    );
  };

  _renderHeaderButton = () => {
    const { buttonState } = this.props;

    switch (buttonState) {
      case LOGIN_SHOW_LONG_TEXT:
      case LOGIN_SHOW_SHORT_TEXT:
        return this._renderLoginButton();
      case EDIT_SHOW_EDIT_TEXT:
      case EDIT_SHOW_CANCEL_TEXT:
        return this._renderEditButton();
      default:
        return null;
    }
  };

  render() {
    const { showGlobalHeader, isWebView, onLogoClick, className } = this.props;

    return (
      showGlobalHeader &&
      !isWebView && (
        <div id="header" className={cx('borderless main clearfix', className)}>
          <div className="header--row">
            <Icon type="hamburger" onClick={this._handleMenuIconClick} />
            <GlobalHeaderLogo onClick={onLogoClick} />
            {this._renderHeaderButton()}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  showGlobalHeader: state.app.globalHeader.showGlobalHeader,
  buttonState: state.app.globalHeader.buttonState,
  isLoggedIn: state.app.account.isLoggedIn,
  isWebView: state.app.webView.isWebView,
  isDrawerOpen: _.get(state, 'app.homeAndNav.drawer.isDrawerOpen', false)
});

const mapDispatchToProps = {
  clickEditButtonFn: clickEditButton,
  clickCancelButtonFn: clickCancelButton,
  toggleDrawerFn: toggleDrawer,
  refreshHomeNavMenuFn: refreshHomeNavMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
