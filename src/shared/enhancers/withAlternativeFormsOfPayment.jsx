// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { sendErrorLog, sendInfoLog } from 'src/shared/api/loggingApi';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY_CARD_ID, UPLIFT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import withAppStateHandler from 'src/shared/enhancers/withAppStateHandler';
import AlternativeFormsOfPaymentError from 'src/shared/errors/alternativeFormsOfPaymentError';
import { containsError } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import {
  getAfpAvailability,
  getCeptorConfig,
  getPaymentMethodAvailabilities
} from 'src/shared/selectors/alternativeFormsOfPaymentSelector';
import { getShouldDisableUplift, getShouldShowUplift } from 'src/shared/selectors/upliftSelector';
import { toCeptorErrorLog, toInfoLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { toApplePayCard } from 'src/shared/transformers/applePayTransformer';
import { toUpliftCard } from 'src/shared/transformers/upliftTransformer';

import type {
  AfpAvailability,
  AfpErrorHandler,
  CeptorCallback,
  CeptorCallbackResponse,
  CeptorCardType,
  CeptorConfigWithAmount,
  CeptorValidationCallback,
  CeptorValidationResponse,
  PaymentInfo
} from 'src/shared/flow-typed/shared.types';

const { EXTERNAL_PAYMENT } = SharedConstants.EXTERNAL_TARGETS;

type Props = {
  afpAvailability: AfpAvailability,
  alternativeFormsOfPaymentFailedFn: (error?: *) => void,
  applePayTransactionId: string,
  ceptorConfig: CeptorConfigWithAmount,
  history: {
    location: HistoryLocation
  },
  initiateAlternativeFormOfPaymentFn: (
    AfpAvailability,
    CeptorConfigWithAmount,
    string,
    boolean,
    ?boolean,
    ?boolean,
    AfpErrorHandler
  ) => void,
  initiatePaymentFailedFn: (AlternativeFormsOfPaymentError) => void,
  initiatePaymentSuccessFn: ({ paymentMethod: string, uatpCard: CeptorCardType }) => void,
  isWebView: boolean,
  paymentMethodAvailabilities: Array<AfpAvailability>,
  reloadAndSubmitAlternativeFormOfPaymentFn: (string, CeptorConfigWithAmount, CeptorCallback, AfpErrorHandler) => void,
  reloadAndSubmitSuccessFn: () => void,
  resumeAppStateFn: () => Promise<*>,
  saveFormDataFn: (formData: *) => void,
  setExternalPaymentAuthorizedSearchStringFn: (?string) => void,
  setUpAlternativeFormsOfPaymentFn: (
    paymentMethodAvailabilities: Array<AfpAvailability>,
    CeptorConfigWithAmount,
    CeptorCallback,
    CeptorValidationCallback,
    ?boolean
  ) => void,
  shouldDisableUplift: ?boolean,
  shouldShowUplift: ?boolean,
  shouldResumeAppStateFn: (string) => boolean,
  validateAlternativeFormsOfPaymentFn: (CeptorValidationResponse) => void,
  webViewExternalPaymentAuthorizedSearchString?: string
};

const withAlternativeFormsOfPayment = (applicationType: string) => (Component: *) => {
  class WithAlternativeFormsOfPaymentComponent extends React.Component<Props> {
    componentDidMount() {
      const { shouldResumeAppStateFn } = this.props;

      if (shouldResumeAppStateFn(EXTERNAL_PAYMENT)) {
        this._reloadAndSubmitAlternativeFormOfPayment();
      } else {
        this._setUpAlternativeFormsOfPayment();
      }
    }

    componentDidUpdate(prevProps: Props) {
      const {
        afpAvailability,
        initiatePaymentFailedFn,
        ceptorConfig,
        webViewExternalPaymentAuthorizedSearchString,
        shouldResumeAppStateFn,
        setExternalPaymentAuthorizedSearchStringFn
      } = this.props;
      const { isActive, hasError } = afpAvailability;

      if (webViewExternalPaymentAuthorizedSearchString && shouldResumeAppStateFn(EXTERNAL_PAYMENT)) {
        this._reloadAndSubmitAlternativeFormOfPayment();
        setExternalPaymentAuthorizedSearchStringFn(null);
      }

      if (!_.isEqual(prevProps.ceptorConfig, ceptorConfig)) {
        this._setUpAlternativeFormsOfPayment();
      }

      if (isActive && hasError) {
        const errorHandler = () => this._setUpAlternativeFormsOfPayment();

        initiatePaymentFailedFn(new AlternativeFormsOfPaymentError(errorHandler));
      }
    }

    _ceptorCallbackFn = (response: CeptorCallbackResponse) => {
      const {
        alternativeFormsOfPaymentFailedFn,
        applePayTransactionId,
        initiatePaymentSuccessFn,
        isWebView,
        reloadAndSubmitSuccessFn
      } = this.props;
      const { paymentData, paymentMethod } = response || {};
      const digitalTransactionId = isWebView ? null : applePayTransactionId;
      const logInfoDetails = {
        digitalTransactionId,
        isWebView,
        lastFourDigits: paymentData?.lastFourDigits,
        paymentMethod
      };

      if (containsError(response)) {
        sendErrorLog(toCeptorErrorLog(response, paymentMethod));
        sendInfoLog(toInfoLog({ ...response, message: 'UATPFailureResponse' }));

        return alternativeFormsOfPaymentFailedFn();
      }

      sendInfoLog(toInfoLog({ ...logInfoDetails, CeptorCallbackResponse: true, message: 'UATPSuccessResponse' }));

      switch (paymentMethod) {
        case PAYMENT_METHODS.APPLE_PAY:
          initiatePaymentSuccessFn({ paymentMethod, uatpCard: toApplePayCard(response, digitalTransactionId) });
          break;
        case PAYMENT_METHODS.UPLIFT:
          initiatePaymentSuccessFn({ paymentMethod, uatpCard: toUpliftCard(response) });
          reloadAndSubmitSuccessFn();
          break;
      }
    };

    _validationCallbackFn = (response: CeptorValidationResponse) => {
      const { validateAlternativeFormsOfPaymentFn } = this.props;

      validateAlternativeFormsOfPaymentFn(response);
    };

    _setUpAlternativeFormsOfPayment = () => {
      const { paymentMethodAvailabilities, ceptorConfig, setUpAlternativeFormsOfPaymentFn } = this.props;

      setUpAlternativeFormsOfPaymentFn(
        paymentMethodAvailabilities,
        ceptorConfig,
        this._ceptorCallbackFn,
        this._validationCallbackFn
      );
    };

    _hasSelectedAlternativeFormOfPayment = (paymentMethod: string, paymentInfo: PaymentInfo) => {
      switch (paymentMethod) {
        case PAYMENT_METHODS.APPLE_PAY:
          return !!paymentInfo && paymentInfo.selectedCardId === APPLE_PAY_CARD_ID;
        case PAYMENT_METHODS.UPLIFT:
          return !!paymentInfo && paymentInfo.selectedCardId === UPLIFT_CARD_ID;
        default:
          return false;
      }
    };

    _initiateAlternativeFormOfPayment = (paymentMethod: string) => {
      const {
        initiateAlternativeFormOfPaymentFn,
        afpAvailability,
        ceptorConfig,
        isWebView,
        shouldShowUplift,
        shouldDisableUplift
      } = this.props;

      const errorHandler = () => this._setUpAlternativeFormsOfPayment();

      initiateAlternativeFormOfPaymentFn(
        afpAvailability,
        ceptorConfig,
        paymentMethod,
        isWebView,
        shouldShowUplift,
        shouldDisableUplift,
        errorHandler
      );
    };

    _reloadAndSubmitAlternativeFormOfPayment = () => {
      const {
        ceptorConfig,
        reloadAndSubmitAlternativeFormOfPaymentFn,
        isWebView,
        webViewExternalPaymentAuthorizedSearchString,
        resumeAppStateFn,
        history: { location }
      } = this.props;

      const searchString = isWebView ? webViewExternalPaymentAuthorizedSearchString : _.get(location, 'search');

      resumeAppStateFn().then(() => {
        const { paymentMethod, tokenAvailable } = transformSearchToQuery(searchString);

        if (tokenAvailable === 'true') {
          const errorHandler = () => this._setUpAlternativeFormsOfPayment();

          reloadAndSubmitAlternativeFormOfPaymentFn(paymentMethod, ceptorConfig, this._ceptorCallbackFn, errorHandler);
        } else {
          this._setUpAlternativeFormsOfPayment();
        }
      });
    };

    render() {
      const restProps = _.omit(this.props, [
        'afpAvailability',
        'ceptorConfig',
        'setUpAlternativeFormsOfPaymentFn',
        'initiateAlternativeFormOfPaymentFn',
        'alternativeFormsOfPaymentFailedFn',
        'initiatePaymentFailedFn',
        'initiatePaymentSuccessFn',
        'reloadAndSubmitAlternativeFormOfPaymentFn'
      ]);

      return (
        <Component
          hasSelectedAlternativeFormOfPaymentFn={this._hasSelectedAlternativeFormOfPayment}
          initiateAlternativeFormOfPaymentFn={this._initiateAlternativeFormOfPayment}
          {...restProps}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    afpAvailability: getAfpAvailability(state),
    applePayTransactionId: _.get(state, 'app.applePay.applePayAvailability.parameters.transactionId'),
    ceptorConfig: getCeptorConfig(applicationType, state)(state),
    isWebView: _.get(state, 'app.webView.isWebView', false),
    paymentMethodAvailabilities: getPaymentMethodAvailabilities(state),
    shouldDisableUplift: getShouldDisableUplift(state, applicationType)(state),
    shouldShowUplift: getShouldShowUplift(applicationType)(state),
    webViewExternalPaymentAuthorizedSearchString: _.get(
      state,
      'app.webView.webViewExternalPaymentAuthorizedSearchString'
    )
  });

  const mapDispatchToProps = {
    alternativeFormsOfPaymentFailedFn: AlternativeFormsOfPaymentActions.alternativeFormsOfPaymentFailed,
    initiateAlternativeFormOfPaymentFn: AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment,
    initiatePaymentFailedFn: AlternativeFormsOfPaymentActions.initiatePaymentFailed,
    initiatePaymentSuccessFn: AlternativeFormsOfPaymentActions.initiatePaymentSuccess,
    initiateVoidTransactionFn: AlternativeFormsOfPaymentActions.initiateVoidTransaction,
    reloadAndSubmitAlternativeFormOfPaymentFn: AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment,
    reloadAndSubmitSuccessFn: AlternativeFormsOfPaymentActions.reloadAndSubmitSuccess,
    saveFormDataFn: AlternativeFormsOfPaymentActions.saveFormData,
    setExternalPaymentAuthorizedSearchStringFn: WebViewActions.handleExternalPaymentAuthorized,
    setUpAlternativeFormsOfPaymentFn: AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment,
    validateAlternativeFormsOfPaymentFn: AlternativeFormsOfPaymentActions.validateAlternativeFormsOfPayment
  };

  return _.flowRight(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withAppStateHandler
  )(WithAlternativeFormsOfPaymentComponent);
};

export default withAlternativeFormsOfPayment;
