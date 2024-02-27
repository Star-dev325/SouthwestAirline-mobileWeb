// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import store2 from 'store2';

import * as PayPalActions from 'src/shared/actions/payPalActions';
import { getNeededAppState } from 'src/shared/selectors/appSelector';
import appConfig from 'src/shared/config/appConfig';

import { PAY_PAL_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { CHANNEL } from 'src/shared/constants/webViewConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import URLS from 'src/shared/bootstrap/urls';

import type { ComponentType } from 'react';
import type { CurrencyType, PayPalSignInRequestType, PaymentInfo } from 'src/shared/flow-typed/shared.types';

const { PAYPAL_DATA_KEY } = StorageKeys;
const { externalPaymentAndroidCustomSchemePrefix } = URLS;

type Options = {
  pathnameRegExp: string
};
type Props = {
  app: *,
  history: { location: { pathname: string } },
  isLoggedIn: boolean,
  isWebView: boolean,
  webViewChannel: string,
  webViewPayPalAuthorizedToken?: string,
  resumeAppStateFn: (state: { app: * }) => void,
  gotoPayPalSignInFn: (PayPalSignInRequestType, *, *, boolean) => void
};

const withPayPal = (options: Options) => {
  const { pathnameRegExp } = options;

  return (Component: ComponentType<*>): ComponentType<*> => {
    class withPayPal extends React.Component<Props> {
      _shouldResumeData = () => this._shouldResumePayPalPurchaseFlow() && store2.session.has(PAYPAL_DATA_KEY);

      _resumeData = () => {
        const { resumeAppStateFn, isWebView, webViewPayPalAuthorizedToken } = this.props;
        const currentPathname = _.get(this.props, 'history.location.pathname');
        const endPartOfPathname = _.split(currentPathname, '/').pop();

        const { state, options: payPalOptions, analytics } = store2.session(PAYPAL_DATA_KEY);

        store2.session.remove(PAYPAL_DATA_KEY);

        const isWebViewAuthorized = webViewPayPalAuthorizedToken === _.get(payPalOptions, 'payPal.token');
        const isFromPayPalAuthorized = isWebView ? isWebViewAuthorized : endPartOfPathname === 'paypal';

        resumeAppStateFn(state);

        _.set(window, 'data_a.stores', _.get(analytics, 'stores'));

        return Promise.resolve({ ...payPalOptions, isFromPayPalAuthorized });
      };

      _shouldGotoPayPalSignIn = (paymentInfo: PaymentInfo) =>
        paymentInfo && paymentInfo.selectedCardId === PAY_PAL_CARD_ID;

      _getURL() {
        const { host, protocol, pathname } = window.location;
        const firstPartOfPathname = _.split(pathname, '/paypal')[0];

        return `${protocol}//${host}${firstPartOfPathname}`;
      }

      _gotoPayPalSignIn = (moneyTotal: CurrencyType, formData: *) => {
        const { ANDROID, IOS } = CHANNEL;
        const { PAYPAL_WEBVIEW_ENV, PAYPAL_WEBVIEW_CANCEL_URL, PAYPAL_WEBVIEW_RETURN_URL } = appConfig;
        const { gotoPayPalSignInFn, app, isLoggedIn, isWebView, webViewChannel } = this.props;
        const url = this._getURL().replace('.html', '');
        let cancelURL = `${url}/paypal-canceled`;
        let returnURL = `${url}/paypal`;

        if (isWebView) {
          const { pathname } = window.location;

          switch (pathname) {
            case getNormalizedRoute({ routeName: 'purchase' }):
            case '/air/change/pricing/review':
            case '/air/change/reconcile.html':
            case '/air/upgrade/purchase.html':
            case '/same-day/price-difference':
            case '/same-day/refund-method':
            case '/upgraded-boarding/purchase':
              if (webViewChannel === ANDROID) {
                cancelURL = `${externalPaymentAndroidCustomSchemePrefix}${PAYPAL_WEBVIEW_CANCEL_URL}`;
                returnURL = `${externalPaymentAndroidCustomSchemePrefix}${PAYPAL_WEBVIEW_RETURN_URL}`;
              } else if (webViewChannel === IOS) {
                cancelURL = `${PAYPAL_WEBVIEW_ENV}${PAYPAL_WEBVIEW_CANCEL_URL}`;
                returnURL = `${PAYPAL_WEBVIEW_ENV}${PAYPAL_WEBVIEW_RETURN_URL}`;
              }
              break;
          }
        }

        const optionsFormData = { formData };

        const request = {
          tokenRequest: {
            totalFare: {
              value: moneyTotal.amount,
              currencyCode: moneyTotal.currencyCode
            },
            redirectURLs: {
              cancelURL,
              returnURL
            }
          }
        };

        gotoPayPalSignInFn(request, { app }, optionsFormData, isLoggedIn);
      };

      _shouldResumePayPalPurchaseFlow = () => {
        const withPayPalPathnameRegExpr = new RegExp(pathnameRegExp);
        const { isWebView, webViewPayPalAuthorizedToken } = this.props;
        const currentPathname = _.get(this.props, 'history.location.pathname');

        return isWebView ? !_.isEmpty(webViewPayPalAuthorizedToken) : withPayPalPathnameRegExpr.test(currentPathname.replace('.html', ''));
      };

      render() {
        const omittedProps = _.omit(this.props, [
          'app',
          'gotoPayPalSignInFn',
          'resumeAppStateFn',
          'isWebView',
          'webViewPayPalAuthorizedToken'
        ]);

        return (
          <Component
            shouldGotoPayPalSignInFn={this._shouldGotoPayPalSignIn}
            gotoPayPalSignInFn={this._gotoPayPalSignIn}
            shouldResumeDataFn={this._shouldResumeData}
            resumeDataFn={this._resumeData}
            {...omittedProps}
          />
        );
      }
    }

    const mapStateToProps = (state) => ({
      app: getNeededAppState(state),
      isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
      isWebView: _.get(state, 'app.webView.isWebView'),
      webViewPayPalAuthorizedToken: _.get(state, 'app.webView.webViewPayPalAuthorizedToken'),
      webViewChannel: _.get(state, 'app.webView.webViewChannel')
    });

    const mapDispatchToProps = {
      gotoPayPalSignInFn: PayPalActions.gotoPayPalSignIn,
      resumeAppStateFn: PayPalActions.resumeAppState
    };

    return connect(mapStateToProps, mapDispatchToProps)(withPayPal);
  };
};

export default withPayPal;
