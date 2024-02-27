// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { appId } from 'src/shared/constants/webViewConstants';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import type { RouterHistory } from 'react-router';
import { DEBOUNCE_DELAY } from 'src/shared/constants/timeoutConstants';
import { useHybrid, WEBVIEW_MESSAGE_KEYS } from '@swa-ui/hybrid';

const {
  ADD_OAUTH,
  AUTH_EVENT,
  REMOVE_OAUTH,
  ROUTE_CHANGE,
  PAYPAL_AUTHORIZED,
  APPLE_PAY_AUTHORIZED,
  ADD_CHASE_SESSION,
  DEEP_LINK_CONTINUE,
  SAVE_CHASE_OFFERS,
  EXTERNAL_PAYMENT_AUTHORIZED
} = WEBVIEW_MESSAGE_KEYS;

type Props = {
  history: RouterHistory,
  isWebView: boolean,
  handleOAuthFn: (boolean, string) => void,
  handleAuthEventFn: (string) => void,
  handleRouteChangeFn: (RouterHistory, string, string) => void,
  handlePaypalAuthFn: (string) => void,
  handleNativeApplePayFn: (string) => void,
  handleChaseSessionFn: (string) => void,
  handleDeepLinkContinueFn: (boolean) => void,
  handleSaveChaseOffersFn: (string) => void,
  handleExternalPaymentAuthorizedFn: (string) => void
};
const debouncedFn = _.debounce((fn) => fn(), DEBOUNCE_DELAY, { leading: true, trailing: false });

const withWebView = (Component: *) => {
  const WithWebViewComponent = ({
    isWebView,
    history,
    handleOAuthFn,
    handleAuthEventFn,
    handleRouteChangeFn,
    handlePaypalAuthFn,
    handleNativeApplePayFn,
    handleChaseSessionFn,
    handleDeepLinkContinueFn,
    handleSaveChaseOffersFn,
    handleExternalPaymentAuthorizedFn,
    ...rest
  }: Props) => {
    const additionalMessagesFromNativeApp = {
      [ADD_OAUTH]: (value) => debouncedFn(() => handleOAuthFn(true, value)),
      [AUTH_EVENT]: (value) => handleAuthEventFn(value),
      [REMOVE_OAUTH]: () => handleOAuthFn(false, ''),
      [ROUTE_CHANGE]: (value, state) => handleRouteChangeFn(history, value, state),
      [PAYPAL_AUTHORIZED]: (value) => handlePaypalAuthFn(value),
      [APPLE_PAY_AUTHORIZED]: (value) => handleNativeApplePayFn(value),
      [ADD_CHASE_SESSION]: (value) => handleChaseSessionFn(value),
      [DEEP_LINK_CONTINUE]: () => handleDeepLinkContinueFn(true),
      [SAVE_CHASE_OFFERS]: (value) => handleSaveChaseOffersFn(value),
      [EXTERNAL_PAYMENT_AUTHORIZED]: (value) => handleExternalPaymentAuthorizedFn(value)
    };

    useHybrid({ additionalMessagesFromNativeApp, appId, history });

    useEffect(() => {
      isWebView && _.invoke(document, 'body.classList.add', 'is-webview');

      return () => {
        _.invoke(document, 'body.classList.remove', 'is-webview');
      };
    }, [isWebView]);

    const restProps = {
      ...rest,
      history,
      handleExternalPaymentAuthorizedFn
    };

    return <Component {...restProps} />;
  };

  const mapStateToProps = (state) => ({
    isWebView: _.get(state, 'app.webView.isWebView')
  });

  const mapDispatchToProps = {
    handleOAuthFn: WebViewActions.handleOAuth,
    handleAuthEventFn: WebViewActions.handleAuthEvent,
    handleRouteChangeFn: WebViewActions.handleRouteChange,
    handlePaypalAuthFn: WebViewActions.setPaypalAuthorized,
    handleNativeApplePayFn: WebViewActions.handleNativeApplePay,
    handleChaseSessionFn: WebViewActions.handleChaseSession,
    handleDeepLinkContinueFn: WebViewActions.handleDeepLinkContinue,
    handleSaveChaseOffersFn: WebViewActions.handleSaveChaseOffers,
    handleExternalPaymentAuthorizedFn: WebViewActions.handleExternalPaymentAuthorized
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithWebViewComponent);
};

export default withWebView;
