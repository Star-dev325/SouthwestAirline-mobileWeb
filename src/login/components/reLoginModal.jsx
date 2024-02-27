// @flow
import { connect } from 'react-redux';
import React from 'react';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Container from 'src/shared/components/container';
import ReloginForm from 'src/login/components/reloginForm';
import {
  setReLoginCallbackFunctions,
  hideReLoginModal,
  setRetryFunctions,
  cleanupReLoginModal
} from 'src/login/actions/reLoginModalActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import { RELOGIN_FORM } from 'src/shared/constants/formIds';
import _ from 'lodash';
import * as AccountActions from 'src/shared/actions/accountActions';
import ReactDOM from 'react-dom';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { removeForbidUserClickBrowserBack } from 'src/shared/helpers/historyHelper';
import { login } from 'src/shared/actions/accountActions';
import i18n from '@swa-ui/locale';

import type { LoginFormDataType } from 'src/login/flow-typed/login.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';

const { location } = BrowserObject;

type Props = {
  updateFormFieldDataValueFn?: (string, string, string) => void,
  setReLoginCallbackFunctionsFn: (modalOptions: ReLoginCallbackFunctionsType) => void,
  accountNumber?: string,
  loginFn: (loginRequest: LoginFormDataType) => Promise<*>,
  reLoginModal: {
    isReLoginPointsBooking: boolean,
    reLoginLocation: string,
    isActive: boolean,
    reLoginModalOptions: {
      hasCancelButton?: boolean,
      shouldRedirectToHomePage?: boolean,
      isAccountNumberEditable?: boolean
    },
    retryFunctions: [() => *],
    reLoginCallbackFunctions: ?ReLoginCallbackFunctionsType
  },
  cleanUpEndOfSessionFn: (isReLogin?: boolean) => void,
  setRetryFunctionsFn: (*) => void,
  cleanupReLoginModalFn: () => void,
  hideReLoginFn: () => void
};

type State = {
  isFetching: boolean,
  hasLoginError: boolean
};

export class ReLoginModal extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      hasLoginError: false
    };
  }

  _clearPassword = () => {
    const { updateFormFieldDataValueFn } = this.props;
    const passwordNode = ReactDOM.findDOMNode(this.refs.password);

    updateFormFieldDataValueFn && updateFormFieldDataValueFn(RELOGIN_FORM, 'password', '');
    passwordNode instanceof HTMLElement && passwordNode.blur();
  };

  _continueAsGuest = () => {
    const { reLoginModal, cleanupReLoginModalFn } = this.props;
    const { reLoginCallbackFunctions = {} } = reLoginModal;
    const { continueAsGuestFn } = reLoginCallbackFunctions || {};

    continueAsGuestFn && continueAsGuestFn(true);
    cleanupReLoginModalFn();
    removeForbidUserClickBrowserBack();
  };

  _onCancel = () => {
    const { cleanupReLoginModalFn } = this.props;

    cleanupReLoginModalFn();
    removeForbidUserClickBrowserBack();
  };

  _retryFailedCalls() {
    const { reLoginModal, setRetryFunctionsFn } = this.props;
    const { retryFunctions } = reLoginModal;

    Promise.all(_.map(retryFunctions, (retryFunction) => retryFunction()))
      .catch(_.noop)
      .finally(() => {
        setRetryFunctionsFn();
      });
  }

  _handlePromiseCatch = () => {
    this.setState({ hasLoginError: true });
    this._clearPassword();
  };

  _handlePromiseFinally = () => {
    const { setReLoginCallbackFunctionsFn } = this.props;
    const { hasLoginError } = this.state;

    if (!hasLoginError) {
      setReLoginCallbackFunctionsFn({});
      removeForbidUserClickBrowserBack();
    }

    this.setState({ isFetching: false, hasLoginError: false });
  };

  _onSubmit = (formData: *) => {
    const {
      accountNumber,
      cleanUpEndOfSessionFn,
      hideReLoginFn,
      loginFn,
      reLoginModal,
      setReLoginCallbackFunctionsFn
    } = this.props;
    const {
      reLoginCallbackFunctions,
      reLoginLocation,
      reLoginModalOptions: { isAccountNumberEditable }
    } = reLoginModal;
    const { postLoginCallbackFn = _.noop } = reLoginCallbackFunctions || {};
    const password = encodeURIComponent(formData.password);
    const hasCallbackFunctionsForCurrentPage = reLoginLocation === location.pathname;
    const userNameOrAccountNumber = isAccountNumberEditable ? _.trim(formData.userNameOrAccountNumber) : accountNumber;

    this.setState({ isFetching: true });
    !hasCallbackFunctionsForCurrentPage && setReLoginCallbackFunctionsFn({});
    cleanUpEndOfSessionFn(true);
    loginFn({ userNameOrAccountNumber, password })
      .then(() => this._retryFailedCalls())
      .then(hideReLoginFn)
      .then(() => this._clearPassword())
      .then(postLoginCallbackFn)
      .catch(() => this._handlePromiseCatch())
      .finally(() => this._handlePromiseFinally());
  };

  render() {
    const {
      accountNumber,
      reLoginModal: { isActive, isReLoginPointsBooking },
      reLoginModal
    } = this.props;
    const {
      reLoginModalOptions: { hasCancelButton, isAccountNumberEditable },
      reLoginCallbackFunctions = {},
      reLoginLocation
    } = reLoginModal || {};
    const { continueAsGuestFn } = reLoginCallbackFunctions || {};
    const rightButtons = hasCancelButton
      ? [{ name: i18n('LOGIN__LOGIN_PAGE__CANCEL_BUTTON'), onClick: this._onCancel }]
      : [];
    const shouldShowContinueAsGuest = continueAsGuestFn && reLoginLocation === location.pathname;

    return isActive ? (
      <div
        className={`session-expired-login-form login-page attach-full ${this.state.isFetching ? '' : 're-login-modal'}`}
      >
        <PageHeaderWithButtons title={i18n('LOGIN__LOGIN_PAGE__TITLE')} rightButtons={rightButtons} />
        <Container>
          <ReloginForm
            formId={RELOGIN_FORM}
            accountNumber={accountNumber}
            onSubmit={this._onSubmit}
            continueAsGuest={shouldShowContinueAsGuest ? this._continueAsGuest : null}
            onValidationFailed={this._clearPassword}
            isAccountNumberEditable={isAccountNumberEditable}
            isReLoginPointsBooking={isReLoginPointsBooking}
          />
        </Container>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  reLoginModal: _.get(state, 'app.reLoginModal'),
  accountNumber: _.get(state, 'app.account.accountNumber')
});

const mapDispatchToProps = {
  updateFormFieldDataValueFn: updateFormFieldDataValue,
  hideReLoginFn: hideReLoginModal,
  loginFn: login,
  cleanUpEndOfSessionFn: AccountActions.cleanUpEndOfSession,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  cleanupReLoginModalFn: cleanupReLoginModal,
  setRetryFunctionsFn: setRetryFunctions
};

export default connect(mapStateToProps, mapDispatchToProps)(ReLoginModal);
