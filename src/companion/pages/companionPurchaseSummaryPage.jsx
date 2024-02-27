// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { RouterHistory } from 'react-router';

import ProgressionBar from 'src/shared/components/progressionBar';
import PurchaseSummaryForm from 'src/shared/components/purchaseSummaryForm';
import ReviewFooter from 'src/shared/components/reviewFooter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { COMPANION_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';
import { TRAVEL_FUNDS } from 'src/companion/constants/companionConstants';
import {
  getCompanionPurchaseSummaryPage,
  getCompanionPassengerInfos
} from 'src/companion/selectors/companionPurchaseSummaryPageSelectors';
import {
  getPriceTotalWithEBForCompanion,
  shouldShowEarlyBirdInPathForCompanion,
  getBalanceRemainingWithEBForCompanion
} from 'src/shared/selectors/earlyBirdSelector';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import withPayPal from 'src/shared/enhancers/withPayPal';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import { needToSaveForPrimary } from 'src/shared/helpers/creditCardHelper';
import { getMoneyTotalForAirBooking } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getNewApplePayCard } from 'src/shared/helpers/applePayHelper';
import { transformToRefreshFundsRequest } from 'src/travelFunds/transformers/travelFundsTransformer';
import { getCompanionContactMethodContent } from 'src/companion/selectors/companionContactMethodSelectors';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import { isBillingAddressComplete } from 'src/shared/helpers/billingAddressHelper';
import { transformContactInfoToBillingAddressFormData } from 'src/shared/transformers/billingAddressTransformer';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { PAYMENT_METHODS, APPLICATION_TYPES } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

import type {
  EarlyBirdEligibility,
  FlightPricingPageResponse,
  PayPalPaymentType,
  PurchaseFlightParamsType
} from 'src/airBooking/flow-typed/airBooking.types';
import type {
  ContactMethodInfo,
  CurrencyType,
  PassengerInfos,
  PaymentInfo,
  PaymentSavedCreditCards,
  PurchaseSummaryFormData,
  Push,
  TotalsType,
  AccountContactInfoType,
  BillingAddressFormType,
  ApplePayCardWithFormData,
  SpecialAssistanceType
} from 'src/shared/flow-typed/shared.types';
import type { RefreshFundsRequestType } from 'src/airBooking/flow-typed/calcFunds.types';

type Props = {
  flightPricingPageResponse: FlightPricingPageResponse,
  purchaseSummaryPage: *,
  contactMethodInfo: ContactMethodInfo,
  push: Push,
  history: RouterHistory,
  isLoggedIn: boolean,
  priceTotal: { totals: TotalsType },
  passengerInfos: PassengerInfos,
  companionAccountNumber: string,
  declineNotifications: boolean,
  earlyBirdEligibility: ?EarlyBirdEligibility,
  shouldShowEarlyBirdInPath: boolean,
  goToCompanionConfirmationPageFn: (PurchaseFlightParamsType) => void,
  fetchEarlybirdPricingFn: (Link, PassengerInfos) => void,
  switchEarlyBirdInPathButtonFn: () => void,
  contactMethodContent: ?string,
  paymentInfo: PaymentInfo,
  savedCreditCards: PaymentSavedCreditCards,
  accountNumber?: string,
  savePaymentInfoFn: (PaymentInfo) => void,
  companionPassengerPage: *,
  shouldResumeDataFn: () => boolean,
  resumeDataFn: () => Promise<*>,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  specialAssistance?: SpecialAssistanceType,
  travelFundsBalanceRemaining?: CurrencyType,
  fundsAppliedToken?: string,
  itineraryPricingToken: string,
  totalAppliedTravelFunds?: CurrencyType,
  refreshFundsFn: (RefreshFundsRequestType, ?string, ?boolean) => void,
  contactInfo?: AccountContactInfoType,
  travelFundsAddress?: BillingAddressFormType,
  applePayCard: ?ApplePayCardWithFormData,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  saveFormDataFn: (formData: *) => *
};

const { TOKEN_EXPIRED_COMPANION_URL } = TRAVEL_FUNDS;

export class CompanionPurchaseSummaryPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchEarlybirdPricingFn,
      passengerInfos,
      companionAccountNumber,
      flightPricingPageResponse,
      shouldResumeDataFn,
      resumeDataFn,
      fundsAppliedToken,
      itineraryPricingToken,
      refreshFundsFn,
      isLoggedIn
    } = this.props;

    if (shouldResumeDataFn()) {
      resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
        if (isFromPayPalAuthorized) {
          this._purchase(formData, payPal);
        }
      });
    } else {
      const earlybirdPricingLink = _.get(flightPricingPageResponse, 'flightPricingPage._links.earlyBirdPricing');

      if (earlybirdPricingLink) {
        const passengerInfosWithRRNumber = [
          _.merge({}, passengerInfos[0], { passengerInfo: { rapidRewardsNumber: companionAccountNumber } })
        ];

        fetchEarlybirdPricingFn(earlybirdPricingLink, passengerInfosWithRRNumber);
      }
    }

    if (fundsAppliedToken) {
      refreshFundsFn(
        transformToRefreshFundsRequest(passengerInfos, fundsAppliedToken, itineraryPricingToken),
        TOKEN_EXPIRED_COMPANION_URL,
        isLoggedIn
      );
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { applePayCard } = this.props;
    const { applePayCard: prevCard } = prevProps;

    const newApplePayCard = getNewApplePayCard(prevCard, applePayCard);

    newApplePayCard && this._purchase(newApplePayCard.formData);
  }

  _purchase = (formData: PurchaseSummaryFormData, payPal?: PayPalPaymentType) => {
    const {
      flightPricingPageResponse,
      contactMethodInfo,
      priceTotal,
      passengerInfos,
      earlyBirdEligibility,
      goToCompanionConfirmationPageFn,
      savedCreditCards,
      fundsAppliedToken,
      specialAssistance,
      travelFundsBalanceRemaining,
      applePayCard
    } = this.props;

    const isPrimary = needToSaveForPrimary(formData.paymentInfo, savedCreditCards);

    goToCompanionConfirmationPageFn({
      flightPricingPageResponse,
      passengerInfos,
      isSavedAsPrimaryCard: !savedCreditCards.primaryCard,
      contactMethodInfo,
      paymentInfo: { ...formData.paymentInfo, isPrimary },
      earlyBirdEligibility,
      formData,
      priceTotal,
      payPal,
      formId: COMPANION_PURCHASE_SUMMARY_FORM,
      specialAssistance,
      fundsAppliedToken,
      travelFundsBalanceRemaining,
      applePayCard
    });
  };

  _continue = (formData: PurchaseSummaryFormData, payPal?: PayPalPaymentType) => {
    const {
      priceTotal,
      savePaymentInfoFn,
      shouldGotoPayPalSignInFn,
      gotoPayPalSignInFn,
      hasSelectedAlternativeFormOfPaymentFn,
      initiateAlternativeFormOfPaymentFn,
      saveFormDataFn,
      fundsAppliedToken,
      travelFundsBalanceRemaining
    } = this.props;

    const moneyTotal = getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);

    if (shouldGotoPayPalSignInFn(formData.paymentInfo)) {
      savePaymentInfoFn(formData.paymentInfo);
      moneyTotal && gotoPayPalSignInFn(moneyTotal, formData);
    } else if (hasSelectedApplePay) {
      saveFormDataFn(formData).then(() => initiateAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY));
    } else {
      this._purchase(formData, payPal);
    }
  };

  _goToTripAndPricePage = () => {
    this.props.push('/companion/review');
  };

  _goToPassengerEditPage = () => {
    this.props.push('/companion/passengerEdit');
  };

  _goToContactMethodPage = () => {
    this.props.push('/companion/contact-method');
  };

  _goToPaymentEditPage = () => {
    this.props.push('/companion/paymentEdit');
  };

  _goToCompanionBillingAddressPage = () => {
    this.props.push('/companion/billing-address');
    raiseSatelliteEvent('travel funds billing address');
  };

  _goToApplyTravelFundsPage = () => {
    this.props.push('/companion/apply-travel-funds?clearFormData=false');
    raiseSatelliteEvent('apply travel funds');
  };

  _buildCompanionBillingAddressFormData = () => {
    const { contactInfo, travelFundsAddress } = this.props;

    if (!_.isEmpty(travelFundsAddress)) {
      return travelFundsAddress;
    } else if (!_.isEmpty(contactInfo)) {
      const companionBillingAddressFormData = transformContactInfoToBillingAddressFormData(contactInfo);

      if (isBillingAddressComplete(companionBillingAddressFormData)) {
        return companionBillingAddressFormData;
      }
    }
  };

  render() {
    const {
      purchaseSummaryPage,
      isLoggedIn,
      priceTotal,
      declineNotifications,
      earlyBirdEligibility,
      shouldShowEarlyBirdInPath,
      contactMethodContent,
      savedCreditCards,
      paymentInfo,
      switchEarlyBirdInPathButtonFn,
      passengerInfos,
      flightPricingPageResponse,
      travelFundsBalanceRemaining,
      fundsAppliedToken,
      totalAppliedTravelFunds
    } = this.props;
    const { tripSummary, passengers } = purchaseSummaryPage;

    if (_.isEmpty(passengerInfos) || _.isEmpty(purchaseSummaryPage) || _.isEmpty(flightPricingPageResponse)) {
      return null;
    }

    const travelFundsApplied = !!fundsAppliedToken;
    const billingAddressFormData = this._buildCompanionBillingAddressFormData();

    return (
      <div>
        <ProgressionBar totalStep={3} step={3} title="Purchase" currentIconType="airplane" />
        <PurchaseSummaryForm
          formId={COMPANION_PURCHASE_SUMMARY_FORM}
          tripSummary={tripSummary}
          passengers={passengers}
          savedCreditCards={savedCreditCards}
          initialFormData={{ contactMethodContent, paymentInfo }}
          priceTotal={priceTotal}
          onTripAndPriceClick={this._goToTripAndPricePage}
          onPassengerItemClick={this._goToPassengerEditPage}
          onPaymentEditClick={this._goToPaymentEditPage}
          onApplyTravelFundsClick={this._goToApplyTravelFundsPage}
          onSubmit={this._continue}
          onUnmount={() => {}}
          onEarlyBirdCheckInClick={() => wcmTransitionTo({ link_type: 'browser', target: '/early-bird-check-in' })}
          showSaveContactMethod={isLoggedIn}
          clickContactMethodFn={this._goToContactMethodPage}
          declineNotifications={declineNotifications}
          earlyBirdEligibility={earlyBirdEligibility}
          showEarlyBirdInPath={shouldShowEarlyBirdInPath}
          onSwitchEarlyBirdInPathButton={switchEarlyBirdInPathButtonFn}
          travelFundsApplied={travelFundsApplied}
          travelFundsBalanceRemaining={travelFundsBalanceRemaining}
          totalAppliedTravelFunds={totalAppliedTravelFunds}
          onClickBillingAddress={this._goToCompanionBillingAddressPage}
          billingAddressFormData={billingAddressFormData}
          EARLY_BIRD_AB_TESTING={false}
        />
        <ReviewFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightPricingPageResponse: { flightPricingPage: _.get(state, 'app.companion.flightPricingPage') },
  contactMethodInfo: state.app.companion.contactMethodInfo,
  paymentInfo: state.app.companion.paymentInfo,
  savedCreditCards: state.app.savedCreditCards,
  earlyBirdEligibility: state.app.companion.earlyBirdEligibility,
  shouldShowEarlyBirdInPath: shouldShowEarlyBirdInPathForCompanion(state),
  purchaseSummaryPage: getCompanionPurchaseSummaryPage(state),
  passengerInfos: getCompanionPassengerInfos(state),
  isLoggedIn: state.app.account.isLoggedIn,
  priceTotal: getPriceTotalWithEBForCompanion(state),
  companionAccountNumber: _.get(state, 'app.account.accountInfo.companionAccountNumber'),
  companionPassengerPage: _.get(state, 'app.companion.companionPassengerPage'),
  declineNotifications: _.toBoolean(_.get(state.app.companion, 'contactMethodInfo.declineNotifications')),
  contactMethodContent: getCompanionContactMethodContent(state),
  specialAssistance: _.get(state, 'app.companion.specialAssistance'),
  itineraryPricingToken: _.get(
    state,
    'app.companion.flightPricingPage._links.calculateFunds.body.itineraryPricingToken'
  ),
  fundsAppliedToken: _.get(state, 'app.companion.applyTravelFundsPage.response.fundsAppliedToken'),
  travelFundsBalanceRemaining: getBalanceRemainingWithEBForCompanion(state).totals.moneyTotal,
  totalAppliedTravelFunds: _.get(state, 'app.companion.applyTravelFundsPage.response.totalFunds'),
  contactInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
  travelFundsAddress: _.get(state, 'app.companion.travelFundsAddress'),
  applePayCard: _.get(state, 'app.applePay.applePayCard')
});

const mapDispatchToProps = {
  goToCompanionConfirmationPageFn: CompanionActions.goToCompanionConfirmationPage,
  fetchEarlybirdPricingFn: CompanionActions.fetchEarlybirdPricing,
  switchEarlyBirdInPathButtonFn: AnalyticsActions.switchEarlyBirdInPathButton,
  savePaymentInfoFn: CompanionActions.savePaymentInfo,
  refreshFundsFn: ApplyTravelFundsActions.refreshFunds
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/companion/purchase(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.COMPANION),
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CompanionPurchaseSummaryPage);
