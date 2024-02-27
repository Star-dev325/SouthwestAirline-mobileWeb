// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import EarlybirdCheckInPricingBanner from 'src/earlyBird/components/earlyBirdCheckInPricingBanner';
import EarlyBirdReviewForm from 'src/earlyBird/components/earlyBirdReviewForm';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { addHistoryBackToHome } from 'src/shared/actions/historyActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import ReviewFooter from 'src/shared/components/reviewFooter';
import SubHeader from 'src/shared/components/subHeader';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { EARLY_BIRD_REVIEW_FORM } from 'src/shared/constants/formIds';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withPayPal from 'src/shared/enhancers/withPayPal';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { getNewApplePayCard } from 'src/shared/helpers/applePayHelper';
import { needToSaveForPrimary } from 'src/shared/helpers/creditCardHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { EarlyBirdPriceResponseType, EarlyBirdPurchaseType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type {
  ApiErrorType,
  ApplePayCardWithFormData,
  CurrencyType,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  CEPTOR_VOID_API: boolean,
  accountNumber?: string,
  addHistoryBackToHomeFn: (boolean) => void,
  applePayCard: ?ApplePayCardWithFormData,
  getPaymentOptionsFn: () => void,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  history: {
    location: {
      pathname: string
    }
  },
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateVoidTransactionFn: (paymentMethod: string, error: ?ApiErrorType, shouldVoidTransaction: boolean, voidReason?: string) => void,
  isLoggedIn: boolean,
  params: { pnr: string },
  paymentInfo: PaymentInfo,
  purchaseFn: (earlyBirdPurchase: EarlyBirdPurchaseType) => void,
  resetPaymentInfoFn: () => void,
  resumeDataFn: () => Promise<*>,
  reviewPage: EarlyBirdPriceResponseType & {
    firstName: string,
    lastName: string,
    moneyTotalFare: CurrencyType,
    productIds: Array<string>
  },
  saveFormDataFn: (formData: *) => *,
  savedCreditCards: PaymentSavedCreditCards,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeDataFn: () => boolean,
  traceEarlybirdPaymentTypeFn: () => void,
  push: Push
};

export class EarlyBirdReviewPage extends React.Component<Props> {
  componentDidMount() {
    const { shouldResumeDataFn, resumeDataFn, traceEarlybirdPaymentTypeFn } = this.props;

    traceEarlybirdPaymentTypeFn();

    if (shouldResumeDataFn()) {
      resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
        if (isFromPayPalAuthorized) {
          const {
            reviewPage: {
              productIds,
              moneyTotalFare,
              _links: { earlyBirdConfirmationPage: earlyBirdConfirmationPageLink }
            },
            isLoggedIn,
            savedCreditCards
          } = this.props;
          const shouldSaveAsPrimaryCard = isLoggedIn && !savedCreditCards.primaryCard;
          const earlyBirdPurchase = {
            formData,
            earlyBirdPurchaseInfo: { productIds, moneyTotalFare, shouldSaveAsPrimaryCard },
            earlyBirdConfirmationPageLink,
            payPal,
            isLoggedIn
          };

          this._purchase(earlyBirdPurchase);
        }
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { applePayCard } = this.props;
    const { applePayCard: prevCard } = prevProps;

    const newApplePayCard = getNewApplePayCard(prevCard, applePayCard);

    newApplePayCard && this._purchaseWithApplePay(newApplePayCard);
  }

  _purchaseWithApplePay = (applePayCard: ApplePayCardWithFormData) => {
    const {
      reviewPage: {
        productIds,
        moneyTotalFare,
        _links: { earlyBirdConfirmationPage: earlyBirdConfirmationPageLink }
      },
      isLoggedIn,
      savedCreditCards
    } = this.props;

    const paymentInfo = _.get(applePayCard, 'formData.paymentInfo');
    const isPrimary = needToSaveForPrimary(paymentInfo, savedCreditCards);

    this._purchase({
      formData: { ...applePayCard.formData, paymentInfo: { ...applePayCard.formData.paymentInfo, isPrimary } },
      earlyBirdPurchaseInfo: { productIds, moneyTotalFare },
      earlyBirdConfirmationPageLink,
      isLoggedIn,
      applePayCard
    });
  };

  _continueAsGuest = (formData: FormData) => {
    const {
      addHistoryBackToHomeFn,
      applePayCard,
      CEPTOR_VOID_API,
      hasSelectedAlternativeFormOfPaymentFn,
      initiateVoidTransactionFn,
      purchaseFn,
      push,
      resetPaymentInfoFn,
      reviewPage: {
        _links: { earlyBirdConfirmationPage: earlyBirdConfirmationPageLink },
        moneyTotalFare,
        productIds,
        recordLocator
      }
    } = this.props;
    const selectedCreditCard = _.get(formData, 'paymentInfo.selectedCardId');
    const isUsingSavedCreditCard = selectedCreditCard !== NEW_CREDIT_CARD_ID;
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);

    if (CEPTOR_VOID_API && !_.isEmpty(applePayCard) && hasSelectedApplePay) {
      initiateVoidTransactionFn(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
    }

    if (isUsingSavedCreditCard) {
      const checkinRoute = getNormalizedRoute({ routeName: 'checkin' });

      addHistoryBackToHomeFn(true);
      push(buildPathWithParamAndQuery(checkinRoute, { pnr: recordLocator }, null));
      resetPaymentInfoFn();
    } else {
      purchaseFn({
        formData,
        earlyBirdPurchaseInfo: { productIds, moneyTotalFare },
        earlyBirdConfirmationPageLink,
        isLoggedIn: false
      });
    }
  };

  _initiateAlternativeFormOfPayment = (paymentMethod: string, formData: *) => {
    const { saveFormDataFn, initiateAlternativeFormOfPaymentFn } = this.props;

    saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(paymentMethod));
  };

  _handleNextAction = (next: () => void, postLoginCallback: () => void, formData: FormData) => {
    const { setReLoginCallbackFunctionsFn } = this.props;
    const continueAsGuest = () => this._continueAsGuest(formData);

    setReLoginCallbackFunctionsFn({ continueAsGuestFn: continueAsGuest, postLoginCallbackFn: postLoginCallback });
    next();
  };

  _onPurchaseEarlyBirdClick = (formData: FormData) => {
    const {
      savedCreditCards,
      reviewPage: {
        productIds,
        moneyTotalFare,
        _links: { earlyBirdConfirmationPage: earlyBirdConfirmationPageLink }
      },
      isLoggedIn,
      getPaymentOptionsFn,
      shouldGotoPayPalSignInFn,
      gotoPayPalSignInFn,
      hasSelectedAlternativeFormOfPaymentFn
    } = this.props;

    const isPrimary = needToSaveForPrimary(formData.paymentInfo, savedCreditCards);
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);

    if (shouldGotoPayPalSignInFn(_.get(formData, 'paymentInfo'))) {
      const next = () => gotoPayPalSignInFn(moneyTotalFare, formData);

      this._handleNextAction(next, getPaymentOptionsFn, formData);
    } else if (hasSelectedApplePay) {
      const next = () => this._initiateAlternativeFormOfPayment(PAYMENT_METHODS.APPLE_PAY, formData);

      this._handleNextAction(next, getPaymentOptionsFn, formData);
    } else {
      this._purchase({
        formData: { ...formData, paymentInfo: { ...formData.paymentInfo, isPrimary } },
        earlyBirdPurchaseInfo: { productIds, moneyTotalFare },
        earlyBirdConfirmationPageLink,
        isLoggedIn
      });
    }
  };

  _purchase = (earlyBirdPurchase: EarlyBirdPurchaseType) => {
    const { getPaymentOptionsFn, purchaseFn } = this.props;
    const next = () => purchaseFn(earlyBirdPurchase);

    this._handleNextAction(next, getPaymentOptionsFn, _.get(earlyBirdPurchase, 'formData'));
  };

  onPaymentEditClick = () => {
    const {
      reviewPage: { recordLocator },
      push
    } = this.props;
    const checkinRoute = getNormalizedRoute({ routeName: 'payment' });

    push(buildPathWithParamAndQuery(checkinRoute, { pnr: recordLocator }, null));
  };

  render() {
    const {
      savedCreditCards,
      reviewPage: { earlyBirdBounds, moneyTotalFare, receiptEmail },
      paymentInfo
    } = this.props;

    return (
      <div className="early-bird-review">
        <SubHeader title={i18n('EARLY_BIRD_PURCHASE_TITLE')} />
        <EarlybirdCheckInPricingBanner />
        <EarlyBirdReviewForm
          formId={EARLY_BIRD_REVIEW_FORM}
          savedCreditCards={savedCreditCards}
          earlyBirdBounds={earlyBirdBounds}
          initialFormData={{ paymentInfo }}
          total={moneyTotalFare}
          onSubmit={this._onPurchaseEarlyBirdClick}
          onPaymentEditClick={this.onPaymentEditClick}
          receiptEmail={receiptEmail}
        />
        <ReviewFooter size="small" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  CEPTOR_VOID_API: state.app.toggles.CEPTOR_VOID_API,
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  savedCreditCards: _.get(state, 'app.savedCreditCards'),
  paymentInfo: _.get(state, 'app.earlyBird.paymentInfo'),
  reviewPage: _.get(state, 'app.earlyBird.reviewPage'),
  accountNumber: _.get(state, 'app.account.accountNumber'),
  applePayCard: _.get(state, 'app.applePay.applePayCard')
});

const mapDispatchToProps = {
  traceEarlybirdPaymentTypeFn: AnalyticsActions.traceEarlybirdPaymentType,
  purchaseFn: EarlyBirdActions.purchase,
  getPaymentOptionsFn: EarlyBirdActions.getPaymentOptions,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  addHistoryBackToHomeFn: addHistoryBackToHome,
  resetPaymentInfoFn: EarlyBirdActions.resetPaymentInfo
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/earlybird/(checkin/[0-9A-Z]{6}/)?(review|purchase)(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.EARLYBIRD),
  withConnectedReactRouter,
  withHideLoginButton,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(EarlyBirdReviewPage);
