// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getPaymentOptions } from 'src/airChange/actions/airChangeActions';
import { hasEnoughPointsForFare } from 'src/airChange/helpers/airChangeHelper';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import SameDayPriceDifferenceForm from 'src/sameDay/components/sameDayPriceDifferenceForm';
import { sameDayRoutes } from 'src/sameDay/constants/sameDayRoutes';
import { getSameDayPricingPageFareCurrencyType } from 'src/sameDay/selectors/sameDayPriceSelectors';
import { getAccountInfo } from 'src/shared/actions/accountActions';
import { getSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { showNativeAppLogin } from 'src/shared/actions/webViewActions';
import { traceSameDayPaymentType } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import BasicBanner from 'src/shared/components/basicBanner';
import { FlightTimesAndPassengersCard } from 'src/shared/components/flightTimesAndPassengersCard/flightTimesAndPassengersCard';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import ReviewFooter from 'src/shared/components/reviewFooter';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { SAME_DAY_PRICE_DIFFERENCE_FORM } from 'src/shared/constants/formIds';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withPayPal from 'src/shared/enhancers/withPayPal';
import { getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { noop } from 'src/shared/helpers/jsUtils';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type {
  AmountDue,
  SameDayConfirmationRefundRequest,
  SameDayConfirmationRequest,
  SameDayPricingPage
} from 'src/sameDay/flow-typed/sameDay.types';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import type {
  ApplePayCardWithFormData,
  CurrencyType,
  NativeAppLoginOptions,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { CancelStandbyListing } from 'src/standby/flow-typed/standby.types';

type Props = {
  accountRedeemablePoints: number,
  applePayCard: ?ApplePayCardWithFormData,
  getAccountInfoFn: () => void,
  getPaymentOptionsFn: () => Promise<*>,
  getSavedCreditCardsFn: () => void,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  hideDialogFn: (*) => Promise<*>,
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateSameDayVoidTransactionForGuestFn: () => void,
  isChangeFlow: boolean,
  isLoggedIn: boolean,
  isShowPoints: boolean,
  isWebView: boolean,
  paymentInfo: PaymentInfo,
  push: Push,
  resetSameDayPaymentDataFn: () => () => void,
  resumeDataFn: () => Promise<*>,
  sameDayPricingPage: SameDayPricingPage,
  savedCreditCards: PaymentSavedCreditCards,
  saveFormDataFn: (formData: *) => *,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  showDialogFn: (*) => Promise<*>,
  showNativeAppLoginFn: (NativeAppLoginOptions: NativeAppLoginOptions) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeDataFn: () => boolean,
  traceSameDayPaymentTypeFn: () => void,
  updateSameDayConfirmationMethodFn: (
    isLoggedIn: boolean,
    formData: FormData,
    sameDayConfirmationRequest: SameDayConfirmationRequest,
    cancelStandbyListing: CancelStandbyListing | null,
    amountDue?: AmountDue
  ) => Promise<*>,
  updateSameDayConfirmationRefundMethodFn: (
    formData: FormData,
    sameDayConfirmationRefund: SameDayConfirmationRefundRequest,
    isLoggedIn: boolean
  ) => void
};

const { location } = BrowserObject;

export const SameDayPriceDifferencePage = ({
  accountRedeemablePoints,
  applePayCard,
  getAccountInfoFn,
  getPaymentOptionsFn,
  getSavedCreditCardsFn,
  gotoPayPalSignInFn,
  hasSelectedAlternativeFormOfPaymentFn,
  hideDialogFn,
  isChangeFlow,
  isLoggedIn,
  initiateAlternativeFormOfPaymentFn,
  initiateSameDayVoidTransactionForGuestFn,
  isShowPoints,
  isWebView,
  paymentInfo,
  push,
  resetSameDayPaymentDataFn,
  resumeDataFn,
  sameDayPricingPage,
  savedCreditCards,
  saveFormDataFn,
  setReLoginCallbackFunctionsFn,
  showDialogFn,
  showNativeAppLoginFn,
  shouldGotoPayPalSignInFn,
  shouldResumeDataFn,
  traceSameDayPaymentTypeFn,
  updateSameDayConfirmationMethodFn,
  updateSameDayConfirmationRefundMethodFn
}: Props) => {
  const { _links, currentFlight, fareSummary, message, recipientEmail, selectedFlight, showEmailReceiptTo } =
    sameDayPricingPage;
  const { amountDue, creditDue, creditInfoMessage, isPaymentRequired, taxesAndFeesWithLinks } = fareSummary || {};
  const availableAmountDue = isChangeFlow && isPaymentRequired ? amountDue : undefined;
  const cards = currentFlight && selectedFlight && [currentFlight, selectedFlight];
  const creditDueFare = creditDue?.fare;
  const creditDueTaxPts = creditDue?.tax;
  const sameDayConfirmation = _links?.sameDayConfirmation;
  const sameDayConfirmationRefund = _links?.sameDayConfirmationRefund;
  const labelText = sameDayConfirmationRefund?.labelText || sameDayConfirmation?.labelText;
  const primaryCard = savedCreditCards?.primaryCard?.savedCreditCardId;
  const paymentDetail = paymentInfo?.selectedCardId ? paymentInfo.selectedCardId : primaryCard ? primaryCard : '';
  const isCVVRequired = paymentDetail && isSavedCreditCardThatRequiresCVV(savedCreditCards, paymentDetail);
  const isRefundScenario = creditDue?.item === 'Credit';

  const [callMade, setCallMade] = useState(false);
  const [payPalData, setPayPalData] = useState({});

  const shouldResumeData = shouldResumeDataFn();

  useEffect(() => {
    isLoggedIn && _.isEmpty(savedCreditCards.primaryCard) && getSavedCreditCardsFn();
  }, []);

  useEffect(() => {
    shouldResumeData && _resumeData();
  }, [shouldResumeData]);

  useEffect(() => {
    const { formData, isFromPayPalAuthorized, payPal } = payPalData;

    if (isFromPayPalAuthorized && sameDayConfirmation) {
      updateSameDayConfirmationMethodFn(
        isLoggedIn,
        { ...formData, payPal: payPal },
        sameDayConfirmation,
        null,
        availableAmountDue
      );
    }
  }, [payPalData]);

  useEffect(() => {
    const isValid = getIsApplePayCardValid(applePayCard);
    const isSameDayPriceDifferencePage = location.pathname === '/same-day/price-difference';

    if (applePayCard && isValid && isSameDayPriceDifferencePage && sameDayConfirmation) {
      const { formData } = applePayCard;

      updateSameDayConfirmationMethodFn(
        isLoggedIn,
        { ...formData, applePayCard: applePayCard },
        sameDayConfirmation,
        null,
        availableAmountDue
      );
    }
  }, [applePayCard]);

  useEffect(() => {
    if (!callMade) {
      isLoggedIn &&
        _.isEmpty(savedCreditCards.primaryCard) &&
        isChangeFlow &&
        isPaymentRequired &&
        getPaymentOptionsFn();
      setCallMade(true);
    }
  }, [callMade, isChangeFlow, isLoggedIn, isPaymentRequired, savedCreditCards]);

  const _resumeData = () => {
    resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
      setPayPalData({ formData, payPal, isFromPayPalAuthorized });
    });
  };

  const _gotoPaymentEditPage = () => {
    const { fromAirportCode, toAirportCode } = selectedFlight;

    traceSameDayPaymentTypeFn();
    push(`/same-day/pricing/payment?airportsCode=${fromAirportCode}-${toAirportCode}`);
  };

  const _onSameDayContinueButtonClick = (formData: FormData) => {
    const continueAsGuest = isShowPoints ? null : noop;

    setReLoginCallbackFunctionsFn({
      continueAsGuestFn: continueAsGuest
    });

    if (isShowPoints) {
      _handleContinueForPointsBooking(formData);
    } else {
      _handleContinueForBooking(formData);
    }
  };

  const _handleContinueForPointsBooking = (formData: FormData) => {
    if (isLoggedIn) {
      hasEnoughPointsForFare(amountDue?.fare?.amount || '', accountRedeemablePoints)
        ? _handleContinueForBooking(formData)
        : _showNotEnoughPointsDialog();
    } else if (isWebView) {
      showNativeAppLoginFn({ loginType: LOGIN_TYPES.POINTS });
    } else {
      push('/login', null, {
        simpleLogin: true,
        to: '/same-day/price-difference',
        withPoints: true
      });
    }
  };

  const _continueAsGuest = (formData: *) => {
    if (hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData?.paymentInfo)) {
      initiateSameDayVoidTransactionForGuestFn();
    }

    resetSameDayPaymentDataFn();
  };

  const _handleContinueForBooking = (formData: FormData) => {
    if (sameDayConfirmationRefund) {
      updateSameDayConfirmationRefundMethodFn(formData, sameDayConfirmationRefund, isLoggedIn);
    } else if (sameDayConfirmation) {
      const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(
        PAYMENT_METHODS.APPLE_PAY,
        formData?.paymentInfo
      );

      let next = () => updateSameDayConfirmationMethodFn(isLoggedIn, formData, sameDayConfirmation, null, availableAmountDue);
      const continueAsGuest = () => _continueAsGuest(formData);

      setReLoginCallbackFunctionsFn({
        continueAsGuestFn: continueAsGuest,
        postLoginCallbackFn: getSavedCreditCardsFn
      });

      const amount = (amountDue?.fare?.currencyCode === DOLLAR && parseFloat(amountDue?.fare?.amount) > 0) ? amountDue?.fare : amountDue?.tax;

      if (amount && shouldGotoPayPalSignInFn(formData?.paymentInfo)) {
        next = () => gotoPayPalSignInFn(amount, formData);
      } else if (hasSelectedApplePay) {
        next = () => _initiateAlternativeFormOfPayment(PAYMENT_METHODS.APPLE_PAY, formData);
      }

      next();
    }
  };

  const _initiateAlternativeFormOfPayment = (paymentMethod: string, formData: FormData) => {
    saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(paymentMethod));
  };

  const _showNotEnoughPointsDialog = () => {
    raiseSatelliteEvent('squid', { page_description: 'modal: not enough points' });
    showDialogFn({
      className: 'not-enough-points-dialog',
      closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL'),
      closeLabelStyle: PRIMARY,
      message: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__MESSAGE'),
      name: 'flight-purchase-not-enough-points-modify',
      onClose: () => hideDialogFn().then(() => getAccountInfoFn()),
      title: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__TITLE'),
      verticalLinks: {
        links: [
          {
            dataQa: 'continue-with-points-button',
            label: i18n('SAME_DAY__PRICING_PAGE__WITH_POINTS'),
            onClick: _handlePopupChoosePointsOnClick
          }
        ]
      }
    });
  };

  const _handlePopupChoosePointsOnClick = () => {
    hideDialogFn().then(() => {
      push(sameDayRoutes.shopping);
      getAccountInfoFn();
    });
  };

  return (
    <Router>
      <div className="same-day-price-difference">
        {<PageHeaderWithButtons showBackButton={!isWebView} title={i18n('SAME_DAY__PRICING__REVIEW')} />}
        {message && <BasicBanner
          className="same-day-price-difference--basic-banner"
          icon={message.icon}
          iconClassName="same-day-price-difference--basic-banner_icon"
          message={message.body}
          subtitleClassName="same-day-price-difference--basic-banner_subtitle"
          title={message.header}
        />}
        <div className="price-difference-page-section">
          {cards?.length &&
            cards.map((card, index) => (
              <div key={index} className="price-difference-section">
                <div className="price-difference-section--title">{card?.labelDescription}</div>
                <FlightTimesAndPassengersCard key={index} card={card} />
              </div>
            ))}
        </div>
        {isRefundScenario && (
          <div className="price-difference-credit-section">
            {creditDueTaxPts ? (
              <div className="price-difference-credit-section--price-line">
                <PriceTotalLine
                  pointsTotal={creditDueFare}
                  showPts={isShowPoints}
                  title={i18n('SAME_DAY__PRICING__PRICE_DIFFERENCE_REFUND_CREDIT_LABEL')}
                  total={creditDueTaxPts}
                  type="total"
                />
              </div>
            ) : (
              <div className="price-difference-credit-section--price-line">
                <PriceTotalLine
                  showPts={isShowPoints}
                  title={i18n('SAME_DAY__PRICING__PRICE_DIFFERENCE_REFUND_CREDIT_LABEL')}
                  total={creditDueFare}
                  type="total"
                />
              </div>
            )}
            {creditInfoMessage && (
              <div className="price-difference-credit-section--description">{creditInfoMessage}</div>
            )}
          </div>
        )}
        {showEmailReceiptTo && (
          <div className="price-difference-section">
            <div className="price-difference-section--title">{i18n('SAME_DAY__PRICING__EMAIL_RECEIPT_TO')}</div>
          </div>
        )}
        <SameDayPriceDifferenceForm
          amountDue={amountDue}
          creditDue={creditDue}
          creditInfoMessage={creditInfoMessage}
          formId={SAME_DAY_PRICE_DIFFERENCE_FORM}
          initialFormData={{ paymentInfo, recipientEmail }}
          isCVVRequired={isCVVRequired}
          isPaymentRequired={isChangeFlow && isPaymentRequired}
          isRefundScenario={isRefundScenario}
          labelText={labelText}
          onPaymentEditClick={_gotoPaymentEditPage}
          onSubmit={_onSameDayContinueButtonClick}
          savedCreditCards={savedCreditCards}
          showEmailReceiptTo={showEmailReceiptTo}
          taxesAndFeesWithLinks={taxesAndFeesWithLinks}
        />
        <ReviewFooter />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  applePayCard: state.app.applePay?.applePayCard,
  accountRedeemablePoints: state.app.account?.accountInfo?.rapidRewardsDetails?.redeemablePoints,
  isChangeFlow: state.app.sameDay.sameDaySelectFarePage?.isChangeFlow,
  isLoggedIn: state.app.account?.isLoggedIn,
  isShowPoints: getSameDayPricingPageFareCurrencyType(state) === POINTS,
  isWebView: state.app?.webView?.isWebView,
  paymentInfo: state.app.sameDay.sameDayPaymentPage,
  sameDayPricingPage: state.app.sameDay.sameDayPricingPage,
  savedCreditCards: state.app.savedCreditCards
});

const mapDispatchToProps = {
  getAccountInfoFn: getAccountInfo,
  getPaymentOptionsFn: getPaymentOptions,
  getSavedCreditCardsFn: getSavedCreditCards,
  hideDialogFn: hideDialog,
  initiateSameDayVoidTransactionForGuestFn: sameDayActions.initiateSameDayVoidTransactionForGuest,
  resetSameDayPaymentDataFn: sameDayActions.resetSameDayPaymentData,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showDialogFn: showDialog,
  showNativeAppLoginFn: showNativeAppLogin,
  traceSameDayPaymentTypeFn: traceSameDayPaymentType,
  updateSameDayConfirmationMethodFn: sameDayActions.updateSameDayConfirmationMethod,
  updateSameDayConfirmationRefundMethodFn: sameDayActions.updateSameDayConfirmationRefundMethod
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/same-day/price-difference(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.SAME_DAY),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('same-day-pricing-difference-page')
);

export default enhancers(SameDayPriceDifferencePage);
