// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { enrollOldRoutes, enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import LoginForm from 'src/login/components/loginForm';
import RapidRewardsComponent from 'src/login/components/rapidRewardsComponent';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import Button from 'src/shared/components/button';
import Container from 'src/shared/components/container';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { LOGIN_FORM } from 'src/shared/constants/formIds';
import { COOKIE_DURATION_DAYS, COOKIES } from 'src/shared/constants/webViewConstants';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import { getBooleanValue } from 'src/shared/helpers/formDataHelper';
import { transformSearchToQuery, buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import RouterStore from 'src/shared/stores/routerStore';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import * as WcmActions from 'src/wcm/actions/wcmActions';

import type { LoginFormDataType, RapidRewardsInfoDataType } from 'src/login/flow-typed/login.types';
import type { Push, Replace } from 'src/shared/flow-typed/shared.types';

type Props = {
  ENABLE_URL_NORMALIZATION: boolean,
  goBack: () => void,
  history: {
    location: HistoryLocation
  },
  isTransferFundsLogin: boolean,
  isUsingSimpleLogin: boolean,
  isUsingSimpleLoginWithPoints: boolean,
  loginFn: (loginRequest: LoginFormDataType) => Promise<*>,
  push: Push,
  query: {
    simpleLogin?: string,
    transferFunds?: string,
    withPoints?: string
  },
  rapidRewardsInfo?: RapidRewardsInfoDataType,
  replace: Replace,
  retrieveRapidRewardsInfoFn: () => void,
  savedUserName?: string,
  shouldRememberUser: boolean,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, fieldValue: *) => void
};

export class LoginPage extends React.Component<Props> {
  componentDidMount() {
    this.props.retrieveRapidRewardsInfoFn();
  }

  _onEnrollClick = () => {
    this.props.push(this.props.ENABLE_URL_NORMALIZATION ? enrollRoutes.index : enrollOldRoutes.index);
  };

  _onSubmit = (formData: LoginFormDataType) => {
    const { loginFn, isUsingSimpleLogin } = this.props;
    const loginRequest = {
      password: encodeURIComponent(formData.password ?? ''),
      shouldRememberUser: formData.shouldRememberUser,
      userNameOrAccountNumber: _.trim(formData.userNameOrAccountNumber)
    };

    if (isUsingSimpleLogin) {
      loginRequest.shouldRememberUser = getBooleanValue(formData.shouldRememberUser);
    }

    loginFn(loginRequest)
      .then(() => {
        const { to: toPathAfterUserLoginSuccess, params, query } = transformSearchToQuery(this.props.query);

        if (AccountInfoHelper.isLoggedIn()) {
          Cookie.setValue(COOKIES.SHOW_LOGIN_BANNER, 'false', COOKIE_DURATION_DAYS.LOGIN_BANNER);

          if (toPathAfterUserLoginSuccess) {
            const prevPath = RouterStore.getPrevPath();
            const nextPath = buildPathWithParamAndQuery(toPathAfterUserLoginSuccess, params, query);

            if (prevPath === '/' && nextPath === '/') {
              this.props.push('/');
            } else if (prevPath === nextPath) {
              this.props.goBack();
            } else {
              this.props.replace(nextPath);
            }
          } else {
            this.props.push('/');
          }
        }
      })
      .catch(this._clearPassword);
  };

  _clearPassword = () => {
    const { updateFormFieldDataValueFn } = this.props;

    updateFormFieldDataValueFn(LOGIN_FORM, 'password', '');

    const passwordNode = ReactDOM.findDOMNode(this.refs.password);

    passwordNode instanceof HTMLElement && passwordNode.blur();
  };

  _getPrompt = () => {
    const { isUsingSimpleLoginWithPoints, isTransferFundsLogin } = this.props;

    if (isUsingSimpleLoginWithPoints) return i18n('LOGIN__USING_SIMPLE_LOGIN_WITH_POINTS');

    if (isTransferFundsLogin) return i18n('TRAVEL_FUNDS_LOGIN_PROMPT');
  };

  render() {
    const {
      goBack,
      isTransferFundsLogin,
      isUsingSimpleLogin,
      isUsingSimpleLoginWithPoints,
      rapidRewardsInfo,
      savedUserName,
      shouldRememberUser
    } = this.props;
    const buttons = isUsingSimpleLogin ? [{ name: 'Cancel', onClick: goBack }] : [];
    const headerTitle = isTransferFundsLogin ? i18n('TRAVEL_FUNDS_LOGIN_TITLE') : 'Login';
    const prompt = this._getPrompt();

    return (
      <div className={cx({ 'attach-top': isUsingSimpleLogin }, 'login-page')}>
        <PageHeaderWithButtons title={headerTitle} rightButtons={buttons} />
        <Container>
          <LoginForm
            formId={LOGIN_FORM}
            isUsingSimpleLogin={isUsingSimpleLogin}
            isUsingSimpleLoginWithPoints={isUsingSimpleLoginWithPoints}
            onEnrollClick={this._onEnrollClick}
            onSubmit={this._onSubmit}
            onValidationFailed={this._clearPassword}
            shouldRememberUser={shouldRememberUser}
            userNameOrAccountNumber={savedUserName}
          />
          {prompt && (
            <p className="login-page--prompt" data-qa="login-prompt">
              {prompt}
            </p>
          )}
          {!isUsingSimpleLogin && (
            <div data-qa="is-hidden-if-simple-login">
              <RapidRewardsComponent rapidRewardsInfo={rapidRewardsInfo} />
              <Button
                className="mt4"
                color="grey"
                fluid
                name="enrollButton"
                onClick={this._onEnrollClick}
                ref="enrollButton"
                size="larger"
              >
                {i18n('LOGIN__LOGIN_PAGE__ENROLL_NOW')}
              </Button>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    query: { simpleLogin, transferFunds, withPoints }
  } = props;
  const ENABLE_URL_NORMALIZATION = state?.app?.toggles?.ENABLE_URL_NORMALIZATION;
  const isUsingSimpleLogin = simpleLogin === 'true';
  const isUsingSimpleLoginWithPoints = simpleLogin === 'true' && withPoints === 'true';
  const shouldRememberUser = !!AccountInfoHelper.getSavedUserNameOrAccountNumber();
  const savedUserName = AccountInfoHelper.getSavedUserNameOrAccountNumber();
  const rapidRewardsInfo = state?.app?.wcmContent?.rapidRewardsInfo;
  const isTransferFundsLogin = transferFunds === 'true';

  return {
    ENABLE_URL_NORMALIZATION,
    isTransferFundsLogin,
    isUsingSimpleLogin,
    isUsingSimpleLoginWithPoints,
    rapidRewardsInfo,
    savedUserName,
    shouldRememberUser
  };
};

const mapDispatchToProps = {
  loginFn: AccountActions.login,
  retrieveRapidRewardsInfoFn: WcmActions.retrieveRapidRewardsInfo,
  updateFormFieldDataValueFn: FormDataActions.updateFormFieldDataValue
};

export default _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps))(LoginPage);
