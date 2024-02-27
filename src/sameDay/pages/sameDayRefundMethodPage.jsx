// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getPaymentOptions } from 'src/airChange/actions/airChangeActions';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import {
  cancelStandbyListingAndBackToPreviousPage,
  initiateSameDayVoidTransactionForGuest,
  resetSameDayPaymentData,
  updateSameDayConfirmationMethod
} from 'src/sameDay/actions/sameDayActions';
import { SameDayRefundMethodForm } from 'src/sameDay/components/sameDayRefundMethodForm';
import SameDayPriceDifferenceForm from 'src/sameDay/components/sameDayPriceDifferenceForm';
import { getSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { hideGlobalHeader, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';
import { showErrorHeaderMsg } from 'src/shared/actions/sharedActions.js';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { SAME_DAY_REFUND_METHOD_FORM, SAME_DAY_STANDBY_PRICE_DIFFERENCE_FORM } from 'src/shared/constants/formIds';
import { STATUS } from 'src/shared/constants/flowConstants';
import { REFUND_METHOD } from 'src/shared/constants/refundMethods.js';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withPayPal from 'src/shared/enhancers/withPayPal';
import { getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';

import type {
  AmountDue,
  SameDayConfirmationRequest,
  sameDayRefundPageType
} from 'src/sameDay/flow-typed/sameDay.types';
import type {
  ApplePayCardWithFormData,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { CancelStandbyListing } from 'src/standby/flow-typed/standby.types';

type Props = {
  applePayCard: ?ApplePayCardWithFormData,
  cancelStandbyListingAndBackToPreviousPageFn: (cancelStandbyListing?: CancelStandbyListing) => void,
  getPaymentOptionsFn: () => Promise<*>,
  getSavedCreditCardsFn: () => void,
  gotoPayPalSignInFn: (any, *) => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  hideDialogFn: () => Promise<*>,
  hideGlobalHeaderFn: () => void,
  isLoggedIn: boolean,
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateSameDayVoidTransactionForGuestFn: () => void,
  isWebView: boolean,
  paymentInfo: PaymentInfo,
  push: Push,
  resetGlobalHeaderFn: () => void,
  resetSameDayPaymentDataFn: () => () => void,
  resumeDataFn: () => Promise<*>,
  sameDayFlowStatus: ?string,
  sameDayRefundPage: sameDayRefundPageType,
  savedCreditCards: PaymentSavedCreditCards,
  saveFormDataFn: (formData: *) => *,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  showDialogFn: (*) => Promise<*>,
  showErrorHeaderMsgFn: (error: string) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeDataFn: () => boolean,
  updateFormDataValueFn: *,
  updateSameDayConfirmationMethodFn: (
    isLoggedIn: boolean,
    formData: FormData,
    sameDayConfirmationRequest: SameDayConfirmationRequest,
    cancelStandbyListing?: CancelStandbyListing | null,
    creditDue?: AmountDue,
    shouldNavigateToConfirmationPage?: boolean,
    errorHandler?: () => void
  ) => Promise<*>
};

const { BACK_TO_ORIGINAL_PAYMENT, HOLD_FUTURE_USE, SELECT_A_REFUND_METHOD } = REFUND_METHOD;

const { location } = BrowserObject;

export const SameDayRefundMethodPage = ({
  applePayCard,
  cancelStandbyListingAndBackToPreviousPageFn,
  getPaymentOptionsFn,
  getSavedCreditCardsFn,
  gotoPayPalSignInFn,
  hasSelectedAlternativeFormOfPaymentFn,
  hideDialogFn,
  hideGlobalHeaderFn,
  initiateAlternativeFormOfPaymentFn,
  initiateSameDayVoidTransactionForGuestFn,
  isLoggedIn,
  isWebView,
  paymentInfo,
  push,
  resetGlobalHeaderFn,
  resetSameDayPaymentDataFn,
  resumeDataFn,
  sameDayFlowStatus,
  sameDayRefundPage,
  savedCreditCards,
  saveFormDataFn,
  setReLoginCallbackFunctionsFn,
  showDialogFn,
  shouldGotoPayPalSignInFn,
  shouldResumeDataFn,
  showErrorHeaderMsgFn,
  updateFormDataValueFn,
  updateSameDayConfirmationMethodFn
}: Props) => {
  const errorText = i18n('SHARED__ERROR_MESSAGES__CORRECT_HIGHLIGHTED_ERRORS');
  const holdForFutureUseText = i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
  const pageHeaderPriceDifferenceTitle = i18n('SAME_DAY__STANDBY_PRICE_DIFFERENCE__LABEL');
  const pageHeaderRefundTitle = i18n('SAME_DAY__REFUND_METHOD__MESSAGE');
  const refundToCreditCardText = i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
  const selectARefundMethodText = i18n('SAME_DAY__SELECT_A_REFUND_METHOD__TEXT');
  const refundMethodLabels = {
    [BACK_TO_ORIGINAL_PAYMENT]: refundToCreditCardText,
    [HOLD_FUTURE_USE]: holdForFutureUseText,
    [SELECT_A_REFUND_METHOD]: selectARefundMethodText
  };
  const {
    _links: { cancelStandbyListing, sameDayConfirmation } = {},
    fareSummary,
    selectedFlight,
    showRefundableSelection,
    showRefundPage
  } = sameDayRefundPage ?? {};
  const { amountDue, creditDue, creditInfoMessage, isPaymentRequired, refundMessage, taxesAndFeesWithLinks } =
    fareSummary || {};
  const { fare: amountDueFare, item: amountDueTitle, tax: amountDueTax } = amountDue || {};
  const { fare: creditDueFare, item: creditDueTitle, tax: creditDueTax } = creditDue || {};
  const primaryCard = savedCreditCards?.primaryCard?.savedCreditCardId;
  const paymentDetail = paymentInfo?.selectedCardId ?? primaryCard ?? '';
  const isCVVRequired = paymentDetail && isSavedCreditCardThatRequiresCVV(savedCreditCards, paymentDetail);
  const shouldCancelPartialStandbyRef = useRef(true);
  const [payPalData, setPayPalData] = useState({});
  const [refundMethod, setRefundMethod] = useState(showRefundableSelection ? SELECT_A_REFUND_METHOD : HOLD_FUTURE_USE);
  const [showError, setShowError] = useState(false);
  const paymentOptionsRequested = useRef(false);
  const isAmountDueTax = parseFloat(amountDueTax?.amount) > 0;
  const isCreditDueFare = parseFloat(creditDueFare?.amount) > 0;
  const isAmountDueFare = parseFloat(amountDueFare?.amount) > 0;
  const isEvenexchangeFare = parseFloat(amountDueFare?.amount) === 0;
  const isDollarAmountDue = amountDueFare?.currencyCode === DOLLAR;
  const isDollarAmountTax = amountDueTax?.currencyCode === DOLLAR;
  const isDollarAmountDueFareWithoutAmountDueTax = isDollarAmountDue && !isAmountDueTax;
  const isPointsAmountDue = !isDollarAmountDue && (isEvenexchangeFare || isAmountDueFare);
  const isPointsCreditDue = creditDueFare?.currencyCode === POINTS;
  const isPointsAmountDueWithCreditDueTax = !isDollarAmountDue && isAmountDueFare && !creditDueFare && creditDueTax;
  const isPointsCreditDueWithAmountDueTax = !amountDueFare && isAmountDueTax && isPointsCreditDue && isCreditDueFare;
  const isPointsEvenExchangeWithCreditDueTax = isEvenexchangeFare && !creditDueFare && creditDueTax;
  const isDollarCreditDueOnly = !creditDueTax && isPointsCreditDue && isCreditDueFare;
  const isPointsCreditDueWithCreditDueTax = isPointsCreditDue && creditDueTax;
  const dollarRefund =
    !isDollarCreditDueOnly &&
    (isPointsEvenExchangeWithCreditDueTax || isPointsAmountDueWithCreditDueTax || isPointsCreditDueWithCreditDueTax)
      ? creditDueTax
      : creditDueFare;
  const hasPointsTotalDue =
    isPointsAmountDueWithCreditDueTax && !isPointsCreditDueWithCreditDueTax
      ? amountDueFare
      : creditDueTax
        ? creditDueFare
        : undefined;
  const pointsTotalTitle =
    isPointsAmountDueWithCreditDueTax && !isPointsCreditDueWithCreditDueTax ? amountDueTitle : creditDueTitle;
  const isTaxDue = isDollarAmountTax || isDollarAmountDue;

  const colorClassName = {
    black: isPointsAmountDueWithCreditDueTax,
    green: isPointsCreditDueWithCreditDueTax
  };

  const pointsAmountDueAndTaxDueClassName = {
    'price-difference-credit-section--no-margin-top-with-border': isDollarAmountDueFareWithoutAmountDueTax || (isPointsAmountDue && isAmountDueTax)
  };

  const totalDueSectionClassName = {
    'price-difference-credit-section--total-due': isTaxDue
  };

  const _refundMethodClassNames = {
    'same-day-refund-method-list-section--error-text': showError
  };
  const shouldResumeData = shouldResumeDataFn && shouldResumeDataFn();

  useEffect(
    () => () => {
      !!cancelStandbyListing &&
      sameDayFlowStatus === STATUS.IN_PROGRESS &&
      shouldCancelPartialStandbyRef.current &&
      cancelStandbyListingAndBackToPreviousPageFn(cancelStandbyListing);
    },
    []
  );

  useEffect(() => {
    if (!paymentOptionsRequested.current) {
      isLoggedIn && _.isEmpty(savedCreditCards.primaryCard) && isPaymentRequired && getPaymentOptionsFn();
      paymentOptionsRequested.current = true;
    }
  }, [isLoggedIn, isPaymentRequired, paymentOptionsRequested, savedCreditCards]);

  useEffect(() => {
    shouldResumeData && _resumeData();
  }, [shouldResumeData]);

  useEffect(() => {
    const { formData, isFromPayPalAuthorized, payPal } = payPalData;

    if (isFromPayPalAuthorized && sameDayConfirmation) {
      updateSameDayConfirmationMethodFn(isLoggedIn, { ...formData, payPal: payPal }, sameDayConfirmation, cancelStandbyListing, amountDue);
    }
  }, [payPalData]);

  useEffect(() => {
    const isValid = getIsApplePayCardValid(applePayCard);
    const isSameDayRefundMethodPage = location.pathname === '/same-day/refund-method';

    if (applePayCard && isValid && isSameDayRefundMethodPage && sameDayConfirmation) {
      const { formData } = applePayCard;

      updateSameDayConfirmationMethodFn(
        isLoggedIn,
        { ...formData, applePayCard: applePayCard },
        sameDayConfirmation,
        cancelStandbyListing,
        amountDue
      );
    }
  }, [applePayCard]);

  const _resumeData = () => {
    resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
      setPayPalData({ formData, payPal, isFromPayPalAuthorized });
    });
  };

  useEffect(() => {
    hideGlobalHeaderFn();

    return () => resetGlobalHeaderFn();
  }, []);

  const _gotoPaymentEditPage = () => {
    const { fromAirportCode, toAirportCode } = selectedFlight || {};

    shouldCancelPartialStandbyRef.current = false;
    push(`/same-day/refund-method/payment?airportsCode=${fromAirportCode}-${toAirportCode}`);
  };

  const _onRefundMethodFieldClick = () => {
    showDialogFn({
      buttons: [],
      message: (
        <div className="same-day-refund-method--form-body">
          <div
            aria-label={refundToCreditCardText}
            className="same-day-refund-method--form-option same-day-refund-method--form-option_first"
            onClick={() => _chooseRefundMethod(REFUND_METHOD.BACK_TO_ORIGINAL_PAYMENT)}
            tabIndex="0"
          >
            {refundToCreditCardText}
          </div>
          <div
            aria-label={holdForFutureUseText}
            className="same-day-refund-method--form-option"
            onClick={() => _chooseRefundMethod(REFUND_METHOD.HOLD_FUTURE_USE)}
            tabIndex="0"
          >
            {holdForFutureUseText}
          </div>
        </div>
      ),
      name: 'same-day-refund-method',
      onDimmerClick: () => hideDialogFn(),
      title: i18n('SAME_DAY__REFUND_METHOD__MESSAGE'),
      titleClassName: 'same-day-refund-method--form-title'
    });
  };

  const _onConfirmPaymentButtonClick = (formData: FormData) => {
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData?.paymentInfo);

    shouldCancelPartialStandbyRef.current = false;

    let next = () =>
      updateSameDayConfirmationMethodFn(isLoggedIn, formData, sameDayConfirmation, cancelStandbyListing, amountDue, false, () => {
        shouldCancelPartialStandbyRef.current = true;
      });

    const continueAsGuest = () => _continueAsGuest(formData);

    setReLoginCallbackFunctionsFn({
      continueAsGuestFn: continueAsGuest,
      postLoginCallbackFn: getSavedCreditCardsFn
    });

    if (shouldGotoPayPalSignInFn(formData?.paymentInfo)) {
      next = () => gotoPayPalSignInFn(amountDue?.tax || amountDue?.fare, formData);
    } else if (hasSelectedApplePay) {
      next = () => _initiateAlternativeFormOfPayment(PAYMENT_METHODS.APPLE_PAY, formData);
    }

    next();
  };

  const _initiateAlternativeFormOfPayment = (paymentMethod: string, formData: FormData) => {
    saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(paymentMethod));
  };

  const _continueAsGuest = (formData: *) => {
    if (hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData?.paymentInfo)) {
      initiateSameDayVoidTransactionForGuestFn();
    }

    resetSameDayPaymentDataFn();
  };

  const _onConfirmButtonClick = () => {
    if (refundMethod !== SELECT_A_REFUND_METHOD) {
      shouldCancelPartialStandbyRef.current = false;

      updateSameDayConfirmationMethodFn(isLoggedIn, { refundMethod }, sameDayConfirmation, cancelStandbyListing, creditDue, false, () => {
        shouldCancelPartialStandbyRef.current = true;
      });
    } else {
      setShowError(true);
      showErrorHeaderMsgFn(errorText);
    }
  };

  const _chooseRefundMethod = (selectedRefundMethod: string) => {
    setRefundMethod(selectedRefundMethod);
    updateFormDataValueFn(SAME_DAY_REFUND_METHOD_FORM, { ['refundMethod']: selectedRefundMethod });
    setShowError(false);
    hideDialogFn();
  };

  const renderSameDayPriceDifferenceForm = () => (
    <div className="same-day-refund-method same-day-refund-method-price-difference">
      {<PageHeaderWithButtons showBackButton={!isWebView} title={pageHeaderPriceDifferenceTitle} />}
      {(isDollarAmountDueFareWithoutAmountDueTax || isPointsAmountDue) && (
        <div className={cx('price-difference-credit-section', totalDueSectionClassName)}>
          <div className="price-difference-credit-section--price-line">
            <PriceTotalLine
              title={amountDueTitle || i18n('SHARED__PRICE_LINE_TITLES__AMOUNT_DUE')}
              total={amountDueFare}
              showPts={true}
              type="total"
            />
          </div>
        </div>
      )}
      {(isPointsCreditDueWithAmountDueTax || isAmountDueTax) && (
        <div
          className={cx('price-difference-credit-section', totalDueSectionClassName, pointsAmountDueAndTaxDueClassName)}
        >
          <div className="price-difference-credit-section--price-line">
            <PriceTotalLine
              title={amountDueTitle || i18n('SHARED__PRICE_LINE_TITLES__AMOUNT_DUE')}
              total={amountDueTax}
              showPts={false}
              type="total"
            />
          </div>
        </div>
      )}
      <SameDayPriceDifferenceForm
        amountDue={amountDue}
        creditDue={creditDue}
        creditInfoMessage={creditInfoMessage}
        formId={SAME_DAY_STANDBY_PRICE_DIFFERENCE_FORM}
        initialFormData={{ paymentInfo }}
        isCVVRequired={isCVVRequired}
        isPaymentRequired={isPaymentRequired}
        labelText={sameDayConfirmation?.labelText}
        onPaymentEditClick={_gotoPaymentEditPage}
        onSubmit={_onConfirmPaymentButtonClick}
        paymentNavItemFieldClassName={'same-day-refund-method--payment-nav-item-field'}
        savedCreditCards={savedCreditCards}
        showEmailReceiptTo={false}
        showRefundPage={showRefundPage}
        taxesAndFeesWithLinks={taxesAndFeesWithLinks}
      />
      {isPointsCreditDueWithAmountDueTax && (
        <div className="same-day-refund-method-credit-section">
          <PriceTotalLine
            className="same-day-refund-method--price-line"
            priceCurrencyClass="same-day-refund-method--price-line-currency-total"
            priceTitleClass="same-day-refund-method--price-line-title"
            title={creditDueTitle || i18n('SAME_DAY__PRICING__PRICE_DIFFERENCE_REFUND_CREDIT_LABEL')}
            total={creditDueFare}
            showPts={true}
            type="total"
          />
          {creditInfoMessage && (
            <div className="same-day-refund-method-credit-section--description">{creditInfoMessage}</div>
          )}
        </div>
      )}
    </div>
  );

  const renderSameDayRefundMethodForm = () => (
    <div className="same-day-refund-method">
      {<PageHeaderWithButtons showBackButton={!isWebView} title={pageHeaderRefundTitle} />}
      {hasPointsTotalDue && (
        <div className={cx('same-day-refund-method-credit-section', colorClassName)}>
          <PriceTotalLine
            className="same-day-refund-method--price-line"
            priceCurrencyClass={cx('same-day-refund-method--price-line-currency-total', colorClassName)}
            priceTitleClass={cx('same-day-refund-method--price-line-title', colorClassName)}
            title={pointsTotalTitle || i18n('SAME_DAY__PRICING__PRICE_DIFFERENCE_REFUND_CREDIT_LABEL')}
            total={hasPointsTotalDue}
            showPts={true}
            type="total"
          />
          {!amountDueFare && creditDueFare && creditInfoMessage && (
            <div className="same-day-refund-method-credit-section--description">{creditInfoMessage}</div>
          )}
        </div>
      )}
      {dollarRefund && (
        <SameDayRefundMethodForm
          amountDue={amountDue}
          className={_refundMethodClassNames}
          creditDue={creditDue}
          creditInfoMessage={creditInfoMessage}
          formId={SAME_DAY_REFUND_METHOD_FORM}
          isWebView={isWebView}
          labelText={sameDayConfirmation?.labelText}
          onRefundMethodFieldClick={_onRefundMethodFieldClick}
          onSubmit={_onConfirmButtonClick}
          refundMessage={refundMessage}
          refundMethod={refundMethod}
          refundMethodLabels={refundMethodLabels}
          showRefundableSelection={showRefundableSelection}
          taxesAndFeesWithLinks={taxesAndFeesWithLinks}
        />
      )}
    </div>
  );

  return isPaymentRequired ? renderSameDayPriceDifferenceForm() : renderSameDayRefundMethodForm();
};

const mapStateToProps = (state) => ({
  applePayCard: state.app?.applePay?.applePayCard,
  isLoggedIn: state.app?.account?.isLoggedIn,
  isWebView: state.app?.webView?.isWebView,
  paymentInfo: state.app?.sameDay?.sameDayPaymentPage,
  resetSameDayPaymentDataFn: resetSameDayPaymentData,
  sameDayFlowStatus: state.app?.flowStatus?.sameDay,
  sameDayRefundPage: state.app?.sameDay?.sameDayRefundPage,
  savedCreditCards: state.app?.savedCreditCards
});

const mapDispatchToProps = {
  cancelStandbyListingAndBackToPreviousPageFn: cancelStandbyListingAndBackToPreviousPage,
  getPaymentOptionsFn: getPaymentOptions,
  getSavedCreditCardsFn: getSavedCreditCards,
  hideDialogFn: hideDialog,
  hideGlobalHeaderFn: hideGlobalHeader,
  initiateSameDayVoidTransactionForGuestFn: initiateSameDayVoidTransactionForGuest,
  resetGlobalHeaderFn: resetGlobalHeader,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showDialogFn: showDialog,
  showErrorHeaderMsgFn: showErrorHeaderMsg,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethod
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/same-day/refund-method(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.SAME_DAY),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('same-day-refund-method-page')
);

export default enhancers(SameDayRefundMethodPage);
