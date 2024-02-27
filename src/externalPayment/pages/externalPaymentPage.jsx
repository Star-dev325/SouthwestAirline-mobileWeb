// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import {
  getAfpAvailability,
  getPaymentMethodAvailabilities,
  getBaseCeptorConfig
} from 'src/shared/selectors/alternativeFormsOfPaymentSelector';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import * as ExternalPaymentActions from 'src/externalPayment/actions/externalPaymentActions';
import Button from 'src/shared/components/button';
import { transformSearchToQuery, buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import { toCeptorErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import {
  hasValidExternalPaymentRedirectUrl,
  toExternalPaymentPageError
} from 'src/externalPayment/helpers/externalPaymentPageHelper';
import i18n from '@swa-ui/locale';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import URLS from 'src/shared/bootstrap/urls';

const { externalPaymentDeepLinkUrl, externalPaymentAndroidCustomSchemePrefix, externalPaymentIOSCustomSchemePrefix } =
  URLS;

import type {
  AfpAvailability,
  CeptorAFPConfig,
  CeptorCallback,
  CeptorCallbackResponse,
  CeptorConfig,
  CeptorTokenAvailability
} from 'src/shared/flow-typed/shared.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';

type Props = {
  location: HistoryLocation,
  ceptorConfig: CeptorConfig,
  afpAvailability: AfpAvailability,
  paymentMethodAvailabilities: Array<AfpAvailability>,
  requestedAFPParams: ?CeptorAFPConfig,
  tokenAvailability: CeptorTokenAvailability,
  isWebView: boolean,
  displayButton: boolean,
  externalPaymentRedirectUrlWhitelist: *,
  setUpExternalPaymentPageFn: (
    ceptorConfig: CeptorConfig,
    paymentMethodAvailabilities: Array<AfpAvailability>,
    provider: string,
    paymentMethod: string,
    persistenceIdentifier: string,
    callbackFn: CeptorCallback
  ) => void,
  initiateExternalPaymentMethodFn: (
    ceptorConfig: CeptorConfig,
    requestedAFPParams: CeptorAFPConfig,
    provider: string,
    paymentMethod: string
  ) => void,
  completeExternalPaymentFn: (response: CeptorCallbackResponse) => void,
  setDisplayButtonFn: (shouldDisplayButton: boolean) => void,
  showDialogFn: (options: DialogOptionsType) => void,
  hideDialogFn: () => Promise<*>,
  goBack: () => void
};

type State = {
  containerRef: { current: null | HTMLDivElement }
};

export class ExternalPaymentPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      containerRef: React.createRef()
    };
  }

  componentDidMount() {
    const { ceptorConfig, paymentMethodAvailabilities, location, setUpExternalPaymentPageFn } = this.props;
    const { persistenceIdentifier, provider, paymentMethod } = transformSearchToQuery(_.get(location, 'search'));

    setUpExternalPaymentPageFn(
      ceptorConfig,
      paymentMethodAvailabilities,
      provider,
      paymentMethod,
      persistenceIdentifier,
      this._callbackFn
    );
  }

  componentDidUpdate(prevProps: Props) {
    const {
      paymentMethodAvailabilities,
      ceptorConfig,
      requestedAFPParams,
      location,
      displayButton,
      initiateExternalPaymentMethodFn,
      setDisplayButtonFn
    } = this.props;
    const { provider, paymentMethod } = transformSearchToQuery(_.get(location, 'search'));

    const { paymentMethodAvailabilities: prevPaymentMethodAvailabilities } = prevProps;
    const prevAvailability =
      _.find(prevPaymentMethodAvailabilities, (afp) => afp.paymentMethod === paymentMethod) || {};
    const availability = _.find(paymentMethodAvailabilities, (afp) => afp.paymentMethod === paymentMethod) || {};

    if (availability.isAvailable && !prevAvailability.isAvailable && requestedAFPParams) {
      initiateExternalPaymentMethodFn(ceptorConfig, requestedAFPParams, provider, paymentMethod);
    }

    if (!displayButton && availability.paymentMethod && !availability.isAvailable) {
      setDisplayButtonFn(true);
    }
  }

  _callbackFn = (response: CeptorCallbackResponse) => {
    const { completeExternalPaymentFn, setDisplayButtonFn } = this.props;
    const { code, paymentMethod } = response || {};
    const hasError = code !== '201';

    hasError && sendErrorLog(toCeptorErrorLog(response, paymentMethod));

    switch (paymentMethod) {
      case PAYMENT_METHODS.UPLIFT: {
        hasError ? setDisplayButtonFn(true) : completeExternalPaymentFn(response);
        break;
      }
      case PAYMENT_METHODS.APPLE_PAY: {
        break;
      }
      default: {
        hasError && setDisplayButtonFn(true);
        break;
      }
    }
  };

  _handleCompleteButtonClick = () => {
    const {
      location,
      isWebView,
      tokenAvailability,
      showDialogFn,
      externalPaymentRedirectUrlWhitelist,
      hideDialogFn,
      goBack
    } = this.props;
    const { redirectUrl, paymentMethod } = transformSearchToQuery(_.get(location, 'search'));
    const path = this._getRedirectUrl(redirectUrl);

    if (!isWebView && !hasValidExternalPaymentRedirectUrl(redirectUrl, externalPaymentRedirectUrlWhitelist)) {
      sendErrorLog(toExternalPaymentPageError(redirectUrl));

      return showDialogFn({
        name: 'external-payment-redirect-error',
        title: i18n('REDIRECT_ERROR_POPUP'),
        verticalLinks: {
          links: [
            {
              label: i18n('REDIRECT_ERROR_BUTTON_TEXT'),
              dataQa: 'return-to-southwest-button',
              onClick: () => {
                hideDialogFn().then(goBack);
              }
            }
          ]
        }
      });
    }

    const target = buildPathWithParamAndQuery(path, null, {
      tokenAvailable: tokenAvailability.isAvailable,
      paymentMethod
    });

    return wcmTransitionTo({ linkType: WcmLinkTypes.BROWSER, target, useWebViewLinkType: true });
  };

  _getRedirectUrl = (redirectUrl: string) => {
    const { isWebView, requestedAFPParams } = this.props;
    const channel = _.get(requestedAFPParams, 'channel');
    const deepLinkPath = removeInitialForwardSlash(externalPaymentDeepLinkUrl);

    switch (channel) {
      case 'ios':
        return `${externalPaymentIOSCustomSchemePrefix}${deepLinkPath}`;
      case 'android':
        return `${externalPaymentAndroidCustomSchemePrefix}${deepLinkPath}`;
      default:
        return isWebView ? externalPaymentDeepLinkUrl : redirectUrl;
    }
  };

  _getContainerId = () => {
    const { ceptorConfig, location } = this.props;
    const { paymentMethod } = transformSearchToQuery(_.get(location, 'search'));

    switch (paymentMethod) {
      case PAYMENT_METHODS.UPLIFT: {
        const paymentMethodConfigParams = _.get(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams');
        const upliftPaymentMethodConfigParams = _.find(
          paymentMethodConfigParams,
          (param) => param && param.paymentMethod === PAYMENT_METHODS.UPLIFT
        );

        return _.get(upliftPaymentMethodConfigParams, 'config.container', '');
      }
      default: {
        return '';
      }
    }
  };

  render() {
    const containerId = this._getContainerId().slice(1);
    const { tokenAvailability, displayButton } = this.props;
    const { containerRef = {} } = this.state;

    const contentLoaded = containerRef.current && !_.isEmpty(containerRef.current.children);

    return (
      <div>
        <div ref={this.state.containerRef} id={containerId} />
        {(contentLoaded || displayButton) && (
          <div className="external-payment-btn-container m4">
            <Button
              className="external-payment-btn"
              size="huge"
              fluid
              color="blue"
              onClick={this._handleCompleteButtonClick}
            >
              {tokenAvailability.isAvailable ? 'PURCHASE' : 'Choose a different payment method'}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ceptorConfig: getBaseCeptorConfig(state),
  afpAvailability: getAfpAvailability(state),
  paymentMethodAvailabilities: getPaymentMethodAvailabilities(state),
  requestedAFPParams: _.get(state, 'app.externalPayment.requestedAFPParams'),
  tokenAvailability: _.get(state, 'app.externalPayment.tokenAvailability'),
  isWebView: _.get(state, 'app.webView.isWebView', false),
  displayButton: _.get(state, 'app.externalPayment.displayButton', false),
  externalPaymentRedirectUrlWhitelist: _.get(
    state,
    'app.wcmContent.applicationProperties.EXTERNAL_PAYMENT_REDIRECT_URL_WHITELIST'
  )
});

const mapDispatchToProps = {
  setUpExternalPaymentPageFn: ExternalPaymentActions.setUpExternalPaymentPage,
  initiateExternalPaymentMethodFn: ExternalPaymentActions.initiateExternalPaymentMethod,
  completeExternalPaymentFn: ExternalPaymentActions.completeExternalPayment,
  setDisplayButtonFn: ExternalPaymentActions.setDisplayButton,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(
  withBodyClass('bgwhite'),
  withHideGlobalHeader,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(ExternalPaymentPage);
