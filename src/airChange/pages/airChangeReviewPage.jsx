// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { changeFlight, getPassengerInfo, getPaymentOptions } from 'src/airChange/actions/airChangeActions';
import AirChangeReviewForm from 'src/airChange/components/airChangeReviewForm';
import {
  getAirChangeContactMethodContent,
  getSearchRequest
} from 'src/airChange/selectors/airChangeReviewPageSelectors';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { traceAirChangePaymentType } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageHeader from 'src/shared/components/pageHeader';
import ReviewFooter from 'src/shared/components/reviewFooter';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { AIR_CHANGE_REVIEW_FORM } from 'src/shared/constants/formIds';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withPayPal from 'src/shared/enhancers/withPayPal';
import { getMoneyTotalForAirChange } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getNewApplePayCard } from 'src/shared/helpers/applePayHelper';
import { needToSaveForPrimary } from 'src/shared/helpers/creditCardHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { isPointsBooking } from 'src/shared/selectors/priceSelectors';

import type { PayPalPaymentType } from 'src/airBooking/flow-typed/airBooking.types';
import type {
  ChangePricingPage,
  FlightChangeRequestDataType,
  SearchRequest
} from 'src/airChange/flow-typed/airChange.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type {
  ApiErrorType,
  ApplePayCardWithFormData,
  ContactMethodInfo,
  CurrencyType,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';

type Props = {
  AIR_UPGRADE: boolean,
  applePayCard: ?ApplePayCardWithFormData,
  CEPTOR_VOID_API: boolean,
  changeFlightFn: (FlightChangeRequestDataType, Link, boolean) => void,
  changePricingPage: ChangePricingPage,
  contactMethodContent: *,
  contactMethodInfo: ContactMethodInfo,
  fundsAppliedToken: ?string,
  getPassengerInfoFn: (isInternational: boolean) => void,
  getPaymentOptionsFn: () => Promise<*>,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateVoidTransactionFn: (paymentMethod: string, error: ?ApiErrorType, shouldVoidTransaction: boolean, voidReason?: string) => void,
  isLoggedIn: boolean,
  isWebView: boolean,
  loginType: string,
  paymentInfo: PaymentInfo,
  push: Push,
  resumeDataFn: () => Promise<*>,
  savedCreditCards: PaymentSavedCreditCards,
  saveFormDataFn: (formData: *) => *,
  searchRequest: SearchRequest,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeDataFn: () => boolean,
  traceAirChangePaymentTypeFn: () => void
};

export class AirChangeReviewPage extends React.Component<Props> {
  componentDidMount() {
    const { changePricingPage, isLoggedIn, shouldResumeDataFn, traceAirChangePaymentTypeFn } = this.props;

    traceAirChangePaymentTypeFn();
    shouldResumeDataFn() ? this._resumeFromPayPal() : isLoggedIn && changePricingPage && this._postLoginCallbacks();
  }

  _continueAsGuest = (formData: *) => {
    const { applePayCard, CEPTOR_VOID_API, hasSelectedAlternativeFormOfPaymentFn, initiateVoidTransactionFn } =
      this.props;
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);

    if (CEPTOR_VOID_API && !_.isEmpty(applePayCard) && hasSelectedApplePay) {
      initiateVoidTransactionFn(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
    }
  };

  _postLoginCallbacks = () => {
    const {
      changePricingPage: {
        _meta: { isInternational = false },
        paymentRequired
      },
      contactMethodInfo,
      getPassengerInfoFn,
      getPaymentOptionsFn,
      paymentInfo,
      savedCreditCards,
      traceAirChangePaymentTypeFn
    } = this.props;

    _.isEmpty(savedCreditCards.primaryCard) &&
      _.isEmpty(paymentInfo) &&
      paymentRequired &&
      getPaymentOptionsFn().then(traceAirChangePaymentTypeFn);
    _.isEmpty(contactMethodInfo) && getPassengerInfoFn(isInternational);
  };

  componentDidUpdate(prevProps: Props) {
    const { applePayCard, shouldResumeDataFn } = this.props;
    const { applePayCard: prevCard } = prevProps;
    const newApplePayCard = getNewApplePayCard(prevCard, applePayCard);

    newApplePayCard && this._changeFlight(newApplePayCard.formData);
    shouldResumeDataFn() && this._resumeFromPayPal();
  }

  _resumeFromPayPal = () => {
    const { resumeDataFn } = this.props;

    resumeDataFn().then(
      ({ formData, isFromPayPalAuthorized, payPal }) => isFromPayPalAuthorized && this._changeFlight(formData, payPal)
    );
  };

  _onPaymentInfoClicked = () => {
    const {
      push,
      searchRequest: { from, to }
    } = this.props;

    push(`${getNormalizedRoute({ routeName: 'payment' })}?airportsCode=${from}-${to}`);
  };

  _onSubmit = (formData: *, payPal?: PayPalPaymentType) => {
    const {
      changePricingPage: {
        _meta: { purchaseWithPoints },
        fareSummary: { newAmountDue, totalDueNow }
      },
      gotoPayPalSignInFn,
      hasSelectedAlternativeFormOfPaymentFn,
      initiateAlternativeFormOfPaymentFn,
      loginType,
      saveFormDataFn,
      setReLoginCallbackFunctionsFn,
      shouldGotoPayPalSignInFn
    } = this.props;

    const moneyTotal = getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);
    const continueAsGuest = loginType === LOGIN_TYPES.POINTS ? null : () => this._continueAsGuest(formData);

    setReLoginCallbackFunctionsFn({
      continueAsGuestFn: continueAsGuest,
      postLoginCallbackFn: this._postLoginCallbacks
    });

    if (shouldGotoPayPalSignInFn(formData.paymentInfo)) {
      gotoPayPalSignInFn(moneyTotal, formData);
    } else if (hasSelectedApplePay) {
      saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY));
    } else {
      this._changeFlight(formData, payPal);
    }
  };

  _changeFlight = (formData: *, payPal?: PayPalPaymentType) => {
    const {
      contactMethodInfo,
      isLoggedIn,
      changePricingPage: {
        paymentRequired,
        fareSummary: { totalDueNow, newAmountDue },
        _links: { changeConfirmationPage },
        _meta: { purchaseWithPoints }
      },
      savedCreditCards,
      changeFlightFn,
      fundsAppliedToken,
      applePayCard
    } = this.props;

    if (paymentRequired) {
      const isPrimary = needToSaveForPrimary(formData.paymentInfo, savedCreditCards);

      formData = { ...formData, paymentInfo: { ...formData.paymentInfo, isPrimary } };
    }
    const moneyFareObj = totalDueNow ? totalDueNow : newAmountDue;
    const requestData = {
      ..._.omit(formData, ['contactMethodContent']),
      contactMethodInfo,
      moneyTotalFare: purchaseWithPoints ? _.get(moneyFareObj, 'tax') : _.get(moneyFareObj, 'fare'),
      paymentRequired,
      shouldSaveAsPrimaryCard: !savedCreditCards.primaryCard,
      payPal,
      fundsAppliedToken,
      applePayCard
    };

    changeFlightFn(requestData, changeConfirmationPage, isLoggedIn);
  };

  _onClickContactMethod = () => {
    const contactMethod = getNormalizedRoute({ routeName: 'contactMethod' });

    this.props.push(contactMethod);
  };

  _onClickApplyTravelFunds = () => {
    const applyTravelFunds = getNormalizedRoute({ routeName: 'applyTravelFunds' });

    this.props.push(applyTravelFunds);
    raiseSatelliteEvent('apply travel funds');
  };

  render() {
    if (_.isEmpty(this.props.changePricingPage)) {
      return null;
    }

    const {
      AIR_UPGRADE,
      changePricingPage,
      changePricingPage: { emailReceiptTo, reviewMessages },
      contactMethodContent,
      contactMethodInfo: { declineNotifications },
      fundsAppliedToken,
      isWebView,
      paymentInfo,
      savedCreditCards
    } = this.props;

    const hasAppliedTravelFunds = !!fundsAppliedToken;

    return (
      <div className="air-change-review-page">
        <PageHeader hidden={isWebView}>{i18n('AIR_CHANGE__PRICE_DIFFERENCE__PRICE_DIFFERENCE_HEADER')}</PageHeader>
        <AirChangeReviewForm
          AIR_UPGRADE={AIR_UPGRADE}
          changePricingPage={changePricingPage}
          clickContactMethodFn={this._onClickContactMethod}
          declineNotifications={_.toBoolean(declineNotifications)}
          formId={AIR_CHANGE_REVIEW_FORM}
          initialFormData={{ paymentInfo, contactMethodContent, emailReceiptTo }}
          onApplyTravelFundsClick={this._onClickApplyTravelFunds}
          onPaymentEditClick={this._onPaymentInfoClicked}
          onSubmit={this._onSubmit}
          reviewMessages={reviewMessages}
          savedCreditCards={savedCreditCards}
          showHeading
          travelFundsApplied={hasAppliedTravelFunds}
        />
        <ReviewFooter
          remainingTravelFundsDisclaimerText={_.get(
            changePricingPage,
            'fareSummary.remainingTravelFundsDisclaimerText'
          )}
          className="large"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  changePricingPage: state.app.airChange.changePricingPage.response,
  paymentInfo: state.app.airChange.paymentInfo,
  CEPTOR_VOID_API: state.app.toggles.CEPTOR_VOID_API,
  contactMethodInfo: state.app.airChange.contactMethodInfo,
  contactMethodContent: getAirChangeContactMethodContent(state),
  savedCreditCards: state.app.savedCreditCards,
  searchRequest: getSearchRequest(state),
  AIR_UPGRADE: state.app.toggles.AIR_UPGRADE,
  isLoggedIn: state.app.account.isLoggedIn,
  loginType: isPointsBooking(state) ? LOGIN_TYPES.POINTS : LOGIN_TYPES.PURCHASE,
  declineNotifications: _.toBoolean(_.get(state.app.airChange, 'contactMethodInfo.declineNotifications')),
  fundsAppliedToken: _.get(state, 'app.airChange.fundsAppliedToken'),
  applePayCard: _.get(state, 'app.applePay.applePayCard'),
  isWebView: _.get(state, 'app.webView.isWebView')

});

const mapDispatchToProps = {
  changeFlightFn: changeFlight,
  getPassengerInfoFn: getPassengerInfo,
  getPaymentOptionsFn: getPaymentOptions,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  traceAirChangePaymentTypeFn: traceAirChangePaymentType
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/air/(change/(pricing/review|reconcile)(/paypal|/paypal-canceled)?|upgrade/purchase(/paypal|/paypal-canceled)?)$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.AIR_CHANGE),
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeReviewPage);
