// @flow

import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { getSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import CountdownTimer from 'src/shared/components/countdownTimer';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { UPGRADED_BOARDING_PURCHASE_FORM } from 'src/shared/constants/formIds';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withPayPal from 'src/shared/enhancers/withPayPal';
import { getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { needToSaveForPrimary } from 'src/shared/helpers/creditCardHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import {
  cancelUpgradedBoardingReservation,
  handleCancelUpgradedBoarding,
  loadPurchasePagePlacements,
  purchaseUpgradedBoarding,
  resetCountdownTimeStamp,
  resetUpgradedBoardingData,
  saveCountdownTimeStamp,
  saveMoneyTotal
} from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import UpgradedBoardingPurchaseForm from 'src/upgradedBoarding/components/upgradedBoardingPurchaseForm';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type {
  ApiErrorType, ApplePayCardWithFormData, CurrencyType,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';
import type {
  UpgradedBoardingPurchasePageType,
  UpgradedBoardingPurchaseType
} from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  accountNumber?: string,
  applePayCard: ?ApplePayCardWithFormData,
  cancelUpgradedBoardingReservationFn: (link: Link) => void,
  CEPTOR_VOID_API: boolean,
  exitWebViewFn: () => void,
  getSavedCreditCardsFn: () => void,
  goBack: () => void,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  handleCancelUpgradedBoardingFn: () => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  hideDialogFn: () => Promise<*>,
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateVoidTransactionFn: (paymentMethod: string, error: ?ApiErrorType, shouldVoidTransaction: boolean, voidReason?: string) => void,
  isLoggedIn: boolean,
  isWebView: boolean,
  loadPurchasePagePlacementsFn: () => void,
  moneyTotal: CurrencyType,
  paymentInfo: PaymentInfo,
  purchasePagePlacements: { promoTop01: ?DynamicPlacementResponse },
  purchaseUpgradedBoardingFn: (upgradedBoardingPurchase: UpgradedBoardingPurchaseType, isLoggedIn: boolean) => void,
  push: Push,
  receiptEmail: string,
  resetCountdownTimeStampFn: () => void,
  resetUpgradedBoardingDataFn: () => void,
  resumeDataFn: () => Promise<*>,
  saveCountdownTimeStampFn: (timeStamp: Date) => void,
  savedCreditCards: PaymentSavedCreditCards,
  saveFormDataFn: (formData: *) => *,
  saveMoneyTotalFn: (moneyTotal: CurrencyType) => void,
  setReLoginCallbackFunctionsFn: (modalOptions: ReLoginCallbackFunctionsType) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeDataFn: () => boolean,
  showDialogFn: (*) => Promise<*>,
  UPGRADED_BOARDING_BY_SEGMENT: boolean,
  upgradedBoardingCountdownTimeStamp: string,
  upgradedBoardingPurchasePage: UpgradedBoardingPurchasePageType
};

const { location } = BrowserObject;

export const UpgradedBoardingPurchasePage = (props: Props) => {
  const {
    applePayCard,
    cancelUpgradedBoardingReservationFn,
    CEPTOR_VOID_API,
    exitWebViewFn,
    getSavedCreditCardsFn,
    gotoPayPalSignInFn,
    handleCancelUpgradedBoardingFn,
    hasSelectedAlternativeFormOfPaymentFn,
    hideDialogFn,
    initiateAlternativeFormOfPaymentFn,
    initiateVoidTransactionFn,
    isLoggedIn,
    isWebView,
    loadPurchasePagePlacementsFn,
    moneyTotal,
    paymentInfo,
    purchasePagePlacements: { promoTop01 },
    purchaseUpgradedBoardingFn,
    push,
    receiptEmail,
    resetUpgradedBoardingDataFn,
    resumeDataFn,
    saveCountdownTimeStampFn,
    savedCreditCards,
    saveFormDataFn,
    saveMoneyTotalFn,
    setReLoginCallbackFunctionsFn,
    shouldGotoPayPalSignInFn,
    shouldResumeDataFn,
    showDialogFn,
    UPGRADED_BOARDING_BY_SEGMENT,
    upgradedBoardingCountdownTimeStamp,
    upgradedBoardingPurchasePage,
    upgradedBoardingPurchasePage: { upgradedBoardingExpiredSeconds } = {}
  } = props;

  const [payPalData, setPayPalData] = useState({});
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const shouldResumeData = shouldResumeDataFn();
  const [upgradedBoardingExpiredSecondsLeft, setUpgradedBoardingExpiredSecondsLeft] = useState(!upgradedBoardingCountdownTimeStamp ? upgradedBoardingExpiredSeconds: null);

  useEffect(() => {
    loadPurchasePagePlacementsFn();

    isLoggedIn && _.isEmpty(savedCreditCards.primaryCard) && getSavedCreditCardsFn();

    return () => {
      handleCancelUpgradedBoardingFn();
    };
  }, []);

  useEffect(() => {
    const mountedTimeStamp = new Date();
    const remainingTimeCountdown = _getRemainingTimeOnCountdown(upgradedBoardingCountdownTimeStamp);
    const shouldSetUpUpgradedBoardingCountdown = upgradedBoardingExpiredSeconds || upgradedBoardingExpiredSeconds === 0;

    if (shouldSetUpUpgradedBoardingCountdown) {
      !upgradedBoardingCountdownTimeStamp && saveCountdownTimeStampFn(mountedTimeStamp);
      setUpgradedBoardingExpiredSecondsLeft(remainingTimeCountdown);
    }
  }, [upgradedBoardingExpiredSeconds]);

  useEffect(() => {
    shouldResumeData && _resumeData();
  }, [shouldResumeData]);

  useEffect(() => {
    const { formData, payPal, isFromPayPalAuthorized } = payPalData;

    if (isFromPayPalAuthorized) {
      const upgradedBoardingPurchase = _buildPurchaseRequest(formData);

      purchaseUpgradedBoardingFn({ ...upgradedBoardingPurchase, payPal }, isLoggedIn);
    }
  }, [payPalData]);

  useEffect(() => {
    const isValid = getIsApplePayCardValid(applePayCard);
    const isOnUpgradedBoardingPurchasePage = location.pathname === getNormalizedRoute({ routeName: 'upgradedBoardingPurchase' });

    if (applePayCard && isValid && isOnUpgradedBoardingPurchasePage) {
      const upgradedBoardingPurchase = _buildPurchaseRequest(applePayCard.formData);

      purchaseUpgradedBoardingFn({ ...upgradedBoardingPurchase, applePayCard }, isLoggedIn);
    }
  }, [applePayCard]);

  const _getRemainingTimeOnCountdown = (countdownTimeStamp) => {
    let countdownRemainingTime = 0;

    if (!countdownTimeStamp) {
      countdownRemainingTime = upgradedBoardingExpiredSeconds;
    } else {
      const currentDate = dayjs();
      const remainingTime = currentDate.diff(countdownTimeStamp, 'seconds');

      if (remainingTime < upgradedBoardingExpiredSeconds) {
        countdownRemainingTime =  upgradedBoardingExpiredSeconds - remainingTime;
      }
    }

    return countdownRemainingTime;
  };

  const _resumeData = () => {
    resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
      setPayPalData({ formData, payPal, isFromPayPalAuthorized });
    });
  };

  const _onPaymentEditClick = () => push(getNormalizedRoute({ routeName: 'payment' }));

  const _onClickCancel = () => {
    const cancelLink = _.get(upgradedBoardingPurchasePage, '_links.upgradedBoardingCancel', {});

    cancelUpgradedBoardingReservationFn(cancelLink);
    isWebView ? exitWebViewFn() : push('/');
  };

  const _continueAsGuest = (formData: *) => {
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY,  _.get(formData, 'paymentInfo'));
    
    if (CEPTOR_VOID_API && !_.isEmpty(applePayCard) && hasSelectedApplePay) {
      initiateVoidTransactionFn(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
    }

    resetUpgradedBoardingDataFn();
  };

  const _onSubmit = (formData: FormData) => {
    const upgradedBoardingPurchase = _buildPurchaseRequest(formData);
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(
      PAYMENT_METHODS.APPLE_PAY,
      _.get(formData, 'paymentInfo')
    );
    let next = () => purchaseUpgradedBoardingFn(upgradedBoardingPurchase, isLoggedIn);
    const continueAsGuest = () => _continueAsGuest(formData);

    setReLoginCallbackFunctionsFn({
      continueAsGuestFn: continueAsGuest,
      postLoginCallbackFn: getSavedCreditCardsFn
    });

    if (shouldGotoPayPalSignInFn(_.get(formData, 'paymentInfo'))) {
      next = () => gotoPayPalSignInFn(moneyTotal, formData);
    } else if (hasSelectedApplePay) {
      next = () => _initiateAlternativeFormOfPayment(PAYMENT_METHODS.APPLE_PAY, formData);
    }

    next();
  };

  const _initiateAlternativeFormOfPayment = (paymentMethod: string, formData: FormData) => {
    saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(paymentMethod));
  };

  const _buildPurchaseRequest = (formData: FormData) => {
    const {
      _links: { upgradedBoardingConfirmationPage: upgradedBoardingConfirmationPageLink }
    } = upgradedBoardingPurchasePage;

    const paymentInfoFormData = _.get(formData, 'paymentInfo');
    const emailInfoFormData = _.get(formData, 'receiptEmail');
    const isPrimary = needToSaveForPrimary(paymentInfoFormData, savedCreditCards);

    return {
      upgradedBoardingConfirmationPageLink,
      formData: { ...formData, paymentInfo: { ...paymentInfoFormData, isPrimary }, receiptEmail: emailInfoFormData },
      moneyTotal
    };
  };

  const _onCountdownFinishCallback = () => {
    const { upgradedBoardingExpiredMessage: { body, key, labelText } = {} } = upgradedBoardingPurchasePage;

    setIsCountdownFinished(true);
    resetUpgradedBoardingDataFn();
    raiseSatelliteEvent('squid', { page_description: "modal:UB timer alert" });
    showDialogFn &&
      showDialogFn({
        buttons: [
          {
            label: labelText,
            onClick: () => {
              hideDialogFn().then(() => {
                _onClickCancel();
              });
            }
          }
        ],
        name: key,
        title: body
      });
  };

  return (
    <div className="upgraded-boarding-purchase">
      {upgradedBoardingPurchasePage?.upgradedBoardingSegment && (
        <>
          <PageHeaderWithButtons
            title={i18n('UB_PAGE_TITLE')}
            rightButtons={[{ name: 'Cancel', onClick: _onClickCancel }]}
          />
          {upgradedBoardingExpiredSecondsLeft || upgradedBoardingExpiredSecondsLeft === 0 ? (
            <CountdownTimer
              time={upgradedBoardingExpiredSecondsLeft}
              text={i18n('UB_TIMER_ALERT_MESSAGE')}
              onCountdownFinishCallback={_onCountdownFinishCallback}
            />
          ) : null}
          {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
          <UpgradedBoardingPurchaseForm
            formId={UPGRADED_BOARDING_PURCHASE_FORM}
            UPGRADED_BOARDING_BY_SEGMENT={UPGRADED_BOARDING_BY_SEGMENT}
            upgradedBoardingPurchasePage={upgradedBoardingPurchasePage}
            onPaymentEditClick={_onPaymentEditClick}
            onSubmit={_onSubmit}
            savedCreditCards={savedCreditCards}
            initialFormData={{ paymentInfo, receiptEmail }}
            saveMoneyTotalFn={saveMoneyTotalFn}
            moneyTotal={moneyTotal}
            isCountdownFinished={isCountdownFinished}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountNumber: _.get(state, 'app.account.accountNumber'),
  applePayCard: _.get(state, 'app.applePay.applePayCard'),
  CEPTOR_VOID_API: state.app.toggles.CEPTOR_VOID_API,
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isWebView: _.get(state, 'app.webView.isWebView'),
  moneyTotal: _.get(state, 'app.upgradedBoarding.upgradedBoardingPage.moneyTotal'),
  paymentInfo: _.get(state, 'app.upgradedBoarding.upgradedBoardingPage.paymentInfo'),
  purchasePagePlacements: _.get(state, 'app.upgradedBoarding.upgradedBoardingPage.purchasePagePlacements', {}),
  receiptEmail: _.get(state, 'app.account.accountInfo.contactInfo.emailAddress'),
  savedCreditCards: _.get(state, 'app.savedCreditCards'),
  UPGRADED_BOARDING_BY_SEGMENT: _.get(state, 'app.toggles.UPGRADED_BOARDING_BY_SEGMENT', false),
  upgradedBoardingCountdownTimeStamp: _.get(
    state,
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingCountdownTimeStamp'
  ),
  upgradedBoardingPurchasePage: _.get(
    state,
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage',
    {}
  )
});

const mapDispatchToProps = {
  cancelUpgradedBoardingReservationFn: cancelUpgradedBoardingReservation,
  exitWebViewFn: exitWebView,
  getSavedCreditCardsFn: getSavedCreditCards,
  handleCancelUpgradedBoardingFn: handleCancelUpgradedBoarding,
  hideDialogFn: hideDialog,
  loadPurchasePagePlacementsFn: loadPurchasePagePlacements,
  purchaseUpgradedBoardingFn: purchaseUpgradedBoarding,
  resetCountdownTimeStampFn: resetCountdownTimeStamp,
  resetUpgradedBoardingDataFn: resetUpgradedBoardingData,
  saveCountdownTimeStampFn: saveCountdownTimeStamp,
  saveMoneyTotalFn: saveMoneyTotal,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/upgraded-boarding/purchase(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.UPGRADED_BOARDING),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('upgraded-boarding-purchase-page')
);

export default enhancers(UpgradedBoardingPurchasePage);
