// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import {
  getAirBookingContactMethodContent,
  getAirBookingContactMethodInfo,
  isDeclineNotifications
} from 'src/airBooking/selectors/airBookingContactMethodSelectors';
import * as PaymentPageSelectors from 'src/airBooking/selectors/paymentPageSelectors';
import { splitPayOptionsSecureRequestObj } from 'src/airBooking/transformers/applyRapidRewardsTransformer';
import { transformPassengerInfos } from 'src/airBooking/transformers/passengerInfosTransformer';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { RR_VISA_PAYMENT_INFO } from 'src/chase/constants/chaseConstants';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import { getSavedCreditCards } from 'src/shared/actions/creditCardActions';
import { showDialog } from 'src/shared/actions/dialogActions';
import { clearFormDataById } from 'src/shared/actions/formDataActions';
import { addHistoryBackToHome } from 'src/shared/actions/historyActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { saveChaseInstantCreditReturnUrl } from 'src/shared/cache/localStorageCache';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import ProgressionBar from 'src/shared/components/progressionBar';
import PurchaseSummaryForm from 'src/shared/components/purchaseSummaryForm';
import ReviewFooter from 'src/shared/components/reviewFooter';
import { APPLICATION_TYPES, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { POINTS } from 'src/shared/constants/currencyTypes';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM, AIRBOOKING_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withAlternativeFormsOfPayment from 'src/shared/enhancers/withAlternativeFormsOfPayment';
import withAppStateHandler from 'src/shared/enhancers/withAppStateHandler';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withPayPal from 'src/shared/enhancers/withPayPal';
import { isValidAdultBirthDate, isValidYoungTravelerBirthDate } from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import { getMoneyTotalForAirBooking } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getNewApplePayCard } from 'src/shared/helpers/applePayHelper';
import { isBillingAddressComplete } from 'src/shared/helpers/billingAddressHelper';
import { needToSaveForPrimary } from 'src/shared/helpers/creditCardHelper';
import { isEmpty } from 'src/shared/helpers/jsUtils';
import { getNewUpliftCard } from 'src/shared/helpers/upliftHelper';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import { shouldShowChasePlacements } from 'src/shared/selectors/chaseSelector';
import {
  getBalanceRemainingWithEBForAirbooking,
  getPriceTotalWithEBForAirbooking,
  shouldShowEarlyBirdInPathForAirbooking
} from 'src/shared/selectors/earlyBirdSelector';
import RouterStore from 'src/shared/stores/routerStore';
import { transformContactInfoToBillingAddressFormData } from 'src/shared/transformers/billingAddressTransformer';
import { transformExpirationPaymentInfo } from 'src/shared/transformers/cardExpirationDateTransformer';
import { transformToRefreshFundsRequest } from 'src/travelFunds/transformers/travelFundsTransformer';
import { isSplitPaymentFund } from 'src/shared/helpers/travelFundsHelper';

import type {
  EarlyBirdEligibility,
  FlightPricingPageResponse,
  GeneratePurchaseSummaryPageParamsType,
  PayPalPaymentType,
  PurchaseFlightParamsType,
  PurchaseSummaryPagePlacements
} from 'src/airBooking/flow-typed/airBooking.types';
import type { SplitPayLinksObj, TotalPointsAppliedType } from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type { RefreshFundsRequestType } from 'src/airBooking/flow-typed/calcFunds.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type {
  AccountContactInfoType,
  ApiErrorType,
  ApplePayCardWithFormData,
  BillingAddressFormType,
  ContactMethodInfo,
  CurrencySuit,
  CurrencyType,
  DutyOfCare,
  Fee,
  ParentOrGuardianFormDataType,
  IrnInfoType,
  PassengerInfos,
  PaymentInfo,
  PaymentSavedCreditCards,
  PurchaseSummaryFormData,
  Push,
  SelectedFrequentTravelerType,
  TotalsType,
  UpliftCardWithFormData
} from 'src/shared/flow-typed/shared.types';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';
import { debouncedFn } from 'src/shared/helpers/webViewHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes.js';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';

const { EXTERNAL_TARGETS } = SharedConstants;

type Props = {
  accountNumber?: string,
  addHistoryBackToHomeFn: (boolean) => void,
  applePayCard: ?ApplePayCardWithFormData,
  CEPTOR_VOID_API: boolean,
  chaseSessionId: ?string,
  clearFormDataByIdFn: (formId: string, exactMatch?: boolean) => void,
  contactInfo?: AccountContactInfoType,
  contactMethodContent: ?string,
  contactMethodInfo: ContactMethodInfo,
  contactTravelManagerInfo: DutyOfCare,
  currencyType: CurrencySuit,
  currentState: *,
  declineNotifications?: boolean,
  dutyOfCareContact?: ?DutyOfCare,
  EARLY_BIRD_AB_TESTING: boolean,
  earlyBirdEligibility: ?EarlyBirdEligibility,
  earlyBirdPricingDifference?: string,
  earlyBirdSelected: boolean,
  fetchSavedCreditCardsFn: () => Promise<*>,
  flightPricingPageResponse: FlightPricingPageResponse,
  fundsAppliedToken?: string,
  generatePurchaseSummaryPageFn: (GeneratePurchaseSummaryPageParamsType) => void,
  getChaseApplicationStatusFn: () => void,
  gotoPayPalSignInFn: (CurrencyType, *) => void,
  getSplitPayOptionsListFn: (SplitPayLinksObj) => void,
  handleFirmOfferOfCreditFn: () => void,
  hasSelectedAlternativeFormOfPaymentFn: (string, PaymentInfo) => boolean,
  history: {
    location: HistoryLocation
  },
  initiateAlternativeFormOfPaymentFn: (string, *) => void,
  initiateVoidTransactionFn: (paymentMethod: string, error: ?ApiErrorType, shouldVoidTransaction: boolean, voidReason?: string) => void,
  irnInfo?: IrnInfoType,
  isExpressCheckout: boolean,
  isInternationalBooking: boolean,
  isLoggedIn: boolean,
  isPaymentOptionsAndPassengerInfoFetched: boolean,
  isSplitPayVisible: boolean,
  isWebView: boolean,
  itineraryPricingToken: string,
  loadPurchasePagePlacementsFn: () => Promise<*>,
  parentOrGuardianFormDataInfo: ParentOrGuardianFormDataType,
  passengerInfos: PassengerInfos,
  paymentInfo: PaymentInfo,
  persistAppStateFn: (string) => void,
  placements: PurchaseSummaryPagePlacements,
  prevState: *,
  priceTotal: { totals: TotalsType },
  purchaseFlightFn: (PurchaseFlightParamsType, boolean, boolean, ?boolean) => void,
  purchaseSummaryPage: *,
  push: Push,
  refreshFundsFn: (RefreshFundsRequestType, ?string, ?boolean) => void,
  removeFrequentTravelerSelectedByPaxNumberFn: (number) => void,
  resetAirBookingPurchaseDataFn: () => void,
  resumeAppStateFn: () => Promise<*>,
  resumeDataFn: () => Promise<*>,
  resumeSplitPayAfterLoginFn: (shouldResume: boolean) => void,
  savedCreditCards: PaymentSavedCreditCards,
  saveFormDataFn: (formData: *) => *,
  selectedCompanyName: ?string,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  selectedIrn?: string,
  selectedSplitPay: ?number,
  setChaseBannerShownFn: (boolean) => void,
  setIsExpressCheckoutFn: (boolean) => void,
  setPaymentInfoForChaseFn: (PaymentInfo) => void,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  setShouldRetryInstantCreditsCallFn: (boolean) => void,
  setWebViewDeepLinkContinueFn: (boolean) => void,
  shouldGotoPayPalSignInFn: (PaymentInfo) => boolean,
  shouldResumeAppStateFn: (string) => boolean,
  shouldResumeDataFn: () => boolean,
  shouldResumeSplitPayAfterLogin: boolean,
  shouldRetryInstantCreditsCall: boolean,
  shouldShowChaseInstantCreditCard?: boolean,
  shouldShowChasePlacement: boolean,
  showDialogFn: (*) => Promise<*>,
  showEarlyBirdInPath: boolean,
  showNativeAppLoginFn: (*) => void,
  splitPayLink: ?SplitPayLinksObj,
  switchEarlyBirdInPathButtonFn: () => void,
  taxesAndFees?: Array<Fee>,
  totalAppliedTravelFunds?: CurrencyType,
  travelFunds: ?Array<RetrievedFundType>,
  travelFundsAddress?: BillingAddressFormType,
  travelFundsBalanceRemaining?: CurrencyType,
  totalPointsApplied?: TotalPointsAppliedType,
  updateFrequentTravelerSelectionFn: ({
    paxNumber: number,
    frequentTravelerId: string,
    frequentTravelerToken: string,
    addFrequentTravelerToggle: boolean
  }) => void,
  updatedPriceTotal: ?TotalsType,
  upliftAdditionalMessaging?: string,
  upliftCard: ?UpliftCardWithFormData,
  webViewDeepLinkContinue: ?boolean
};
const { CHASE, EXTERNAL_PAYMENT } = EXTERNAL_TARGETS;
const { PURCHASE_PAGE_LOAD } = ANALYTICS;

export class PurchaseSummaryPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const {
      clearFormDataByIdFn,
      flightPricingPageResponse,
      fundsAppliedToken,
      generatePurchaseSummaryPageFn,
      getChaseApplicationStatusFn,
      itineraryPricingToken,
      loadPurchasePagePlacementsFn,
      parentOrGuardianFormDataInfo,
      passengerInfos,
      paymentInfo,
      purchaseSummaryPage,
      selectedFrequentTravelers,
      setPaymentInfoForChaseFn,
      shouldResumeAppStateFn,
      shouldRetryInstantCreditsCall,
      shouldShowChaseInstantCreditCard,

    } = this.props;

    if (shouldResumeAppStateFn(CHASE)) {
      this._resumeFromChaseApplication();
    } else if (shouldRetryInstantCreditsCall) {
      getChaseApplicationStatusFn();
    } else {
      generatePurchaseSummaryPageFn({ flightPricingPageResponse, passengerInfos });
    }

    if (_.isEmpty(paymentInfo) && shouldShowChaseInstantCreditCard) {
      setPaymentInfoForChaseFn(RR_VISA_PAYMENT_INFO);
    }

    loadPurchasePagePlacementsFn()
      .catch(_.noop)
      .finally(() => raiseSatelliteEvent(PURCHASE_PAGE_LOAD));

    fundsAppliedToken &&
      this._refreshTravelFunds(
        transformToRefreshFundsRequest(passengerInfos, fundsAppliedToken, itineraryPricingToken)
      );
    Array.isArray(selectedFrequentTravelers) &&
      selectedFrequentTravelers.length &&
      this.resetSelectedFrequentTravelers();

    this._handleSplitPayAfterLogin();

    const { bounds } = purchaseSummaryPage?.tripSummary ?? {};

    if (bounds && passengerInfos && parentOrGuardianFormDataInfo) {
      const { departureDate } = bounds[0];
      const hasAdultPassenger = passengerInfos.some(({ passengerInfo: { dateOfBirth } }) =>
        isValidAdultBirthDate(dateOfBirth, departureDate)
      );
      const hasYoungTravelerPassenger = passengerInfos.some(({ passengerInfo: { dateOfBirth } }) =>
        isValidYoungTravelerBirthDate(dateOfBirth, departureDate)
      );

      if (!hasYoungTravelerPassenger || (hasAdultPassenger && hasYoungTravelerPassenger)) {
        clearFormDataByIdFn(AIR_BOOKING_PARENT_OR_GUARDIAN_FORM);
      }
    }
  }

  resetSelectedFrequentTravelers() {
    const {
      passengerInfos,
      selectedFrequentTravelers,
      updateFrequentTravelerSelectionFn,
      removeFrequentTravelerSelectedByPaxNumberFn
    } = this.props;

    passengerInfos.forEach((passenger, index) => {
      const passengerInfo = _.get(passenger, 'passengerInfo', []);
      const hasSaveAsFrequentTravelerField = Object.keys(passengerInfo).includes('saveAsFrequentTraveler');
      const { frequentTravelerId = '', frequentTravelerToken = '' } = passengerInfo;
      const [frequentTraveler] = selectedFrequentTravelers.filter(
        (frequentTraveler) => frequentTraveler.paxNumber === index
      );

      if (
        (frequentTravelerId && frequentTraveler && frequentTravelerId !== frequentTraveler.frequentTravelerId) ||
        hasSaveAsFrequentTravelerField
      ) {
        updateFrequentTravelerSelectionFn({
          paxNumber: index,
          frequentTravelerId,
          frequentTravelerToken,
          addFrequentTravelerToggle: false
        });
      } else if (_.isEmpty(frequentTravelerId) && frequentTraveler) {
        removeFrequentTravelerSelectedByPaxNumberFn(index);
      }
    });
  }

  componentDidUpdate(prevProps: Props) {
    const {
      applePayCard,
      earlyBirdSelected,
      flightPricingPageResponse,
      generatePurchaseSummaryPageFn,
      loadPurchasePagePlacementsFn,
      passengerInfos,
      setShouldRetryInstantCreditsCallFn,
      setWebViewDeepLinkContinueFn,
      shouldResumeAppStateFn,
      shouldResumeDataFn,
      shouldRetryInstantCreditsCall,
      upliftCard,
      webViewDeepLinkContinue
    } = this.props;
    const {
      applePayCard: prevApplePayCard,
      earlyBirdSelected: prevEarlyBirdSelected,
      upliftCard: prevUpliftCard
    } = prevProps;

    if (shouldRetryInstantCreditsCall) {
      generatePurchaseSummaryPageFn({ flightPricingPageResponse, passengerInfos });
      setShouldRetryInstantCreditsCallFn(false);
    }

    const newApplePayCard = getNewApplePayCard(prevApplePayCard, applePayCard);

    newApplePayCard && this._callPurchaseFlightFn(newApplePayCard.formData);

    const newUpliftCard = getNewUpliftCard(prevUpliftCard, upliftCard);

    newUpliftCard && this._callPurchaseFlightFn(newUpliftCard.formData);

    if (webViewDeepLinkContinue) {
      shouldResumeAppStateFn(CHASE) && this._resumeFromChaseApplication();
      raiseSatelliteEvent(PURCHASE_PAGE_LOAD);
      setWebViewDeepLinkContinueFn(false);
    }

    this._setChaseBannerShown(prevProps);

    if (earlyBirdSelected !== prevEarlyBirdSelected) {
      loadPurchasePagePlacementsFn().catch(_.noop);
    }

    if (shouldResumeDataFn()) {
      this._resumeFromPayPal();
    }

    this._handleSplitPayAfterLogin();
  }

  _handleSplitPayAfterLogin() {
    const { isLoggedIn, resumeSplitPayAfterLoginFn, shouldResumeSplitPayAfterLogin } = this.props;

    if (isLoggedIn && shouldResumeSplitPayAfterLogin) {
      resumeSplitPayAfterLoginFn(false);
      this._callSplitPayOptionsList();
    }
  }

  _setChaseBannerShown(prevProps: Props) {
    const {
      placements: { bottomPromo1 },
      shouldShowChasePlacement,
      setChaseBannerShownFn
    } = this.props;

    const hasPromoChanged = !_.isEqual(bottomPromo1, _.get(prevProps, 'placements.bottomPromo1'));
    const hasSelectorChanged = shouldShowChasePlacement !== prevProps.shouldShowChasePlacement;

    if (hasPromoChanged || hasSelectorChanged) {
      setChaseBannerShownFn(!!bottomPromo1 && !!shouldShowChasePlacement);
    }
  }

  _continueAsGuestFn = () => {
    const { resetAirBookingPurchaseDataFn, addHistoryBackToHomeFn, push } = this.props;

    resetAirBookingPurchaseDataFn();
    addHistoryBackToHomeFn(true);
    push(getNormalizedRoute({ routeName: 'price' }));
  };

  _refreshTravelFunds = (request: RefreshFundsRequestType) => {
    const { fetchSavedCreditCardsFn, isLoggedIn, refreshFundsFn, setReLoginCallbackFunctionsFn } = this.props;

    const expiredAirBookingUrl = getNormalizedRoute({ routeName: 'index' });

    if (this._isPointsBooking()) {
      refreshFundsFn(request, expiredAirBookingUrl, isLoggedIn);
      setReLoginCallbackFunctionsFn({
        postLoginCallbackFn: fetchSavedCreditCardsFn,
        continueAsGuestFn: this._continueAsGuestFn
      });
    } else {
      refreshFundsFn(request, expiredAirBookingUrl);
    }
  };

  _setContinueAsGuestAfterResume = () => {
    const { fetchSavedCreditCardsFn, setReLoginCallbackFunctionsFn } = this.props;

    setReLoginCallbackFunctionsFn({
      continueAsGuestFn: this._continueAsGuestFn,
      postLoginCallbackFn: fetchSavedCreditCardsFn
    });
  };

  _resumeFromPayPal = () => {
    const { resumeDataFn } = this.props;

    resumeDataFn().then(({ formData, payPal, isFromPayPalAuthorized }) => {
      if (isFromPayPalAuthorized) {
        this._callPurchaseFlightFn(formData, payPal);
      }
    });

    this._setContinueAsGuestAfterResume();
  };

  _resumeFromChaseApplication = () => {
    const { resumeAppStateFn, getChaseApplicationStatusFn, setIsExpressCheckoutFn } = this.props;

    setIsExpressCheckoutFn(false);
    resumeAppStateFn().then(() => getChaseApplicationStatusFn());
    this._setContinueAsGuestAfterResume();
  };

  _handleChasePlacementClick = () => {
    const {
      persistAppStateFn,
      history: {
        location: { pathname }
      }
    } = this.props;

    saveChaseInstantCreditReturnUrl(pathname);
    persistAppStateFn(CHASE);
  };

  _gotoPaymentEditPage = () => {
    const { paymentEdit } = airBookingRoutes;
    const { purchaseSummaryPage } = this.props;
    const {
      tripSummary: {
        bounds: [{ departureAirportCode: originAirportCode, arrivalAirportCode: destinationAirportCode }]
      }
    } = purchaseSummaryPage;
    const path = `${paymentEdit}?airportsCode=${originAirportCode}-${destinationAirportCode}`;

    this._navigateToPath(path);
  };

  _gotoPassengerEditPage = (index: number) => {
    this._navigateToPath(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'passengersWithPaxEdit' }), { paxNumber: index })
    );
  };

  _goToYoungTravelerEditPage = () => {
    this._navigateToPath(
      getNormalizedRoute({ routeName: 'youngTravelerEditWithoutClearForm' })
    );
  };

  _gotoIrnInfoPage = () => {
    this.props.push(getNormalizedRoute({ routeName: 'internalReferenceNumber' }));
  };

  _goToApplyTravelFundsPage = () => {
    const { applyTravelFunds } = airBookingRoutes;

    raiseSatelliteEvent('apply travel funds');
    this._navigateToPath(`${applyTravelFunds}?clearFormData=false`);
  };

  _goToTripAndPricePage() {
    this.props.push(getNormalizedRoute({ routeName: 'priceReview' }));
  }

  _goToContactMethodPage() {
    const { contactMethod } = airBookingRoutes;

    this._navigateToPath(contactMethod);
  }

  _goToContactInfoTravelManagerMethodPage() {
    const { contactInfoTravelManager } = airBookingRoutes;

    this._navigateToPath(contactInfoTravelManager);
  }

  _goToBillingAddressPage = () => {
    const { billingAddress } = airBookingRoutes;

    this.props.push(billingAddress);
    raiseSatelliteEvent('travel funds billing address');
  };

  _navigateToPath = (path: string) => {
    const { setIsExpressCheckoutFn, push } = this.props;

    setIsExpressCheckoutFn(false);
    path && push(path);
  };

  _callSplitPayOptionsList = () => {
    const { fundsAppliedToken, getSplitPayOptionsListFn, passengerInfos, splitPayLink } = this.props;

    splitPayLink &&
      getSplitPayOptionsListFn(splitPayOptionsSecureRequestObj(fundsAppliedToken, passengerInfos, splitPayLink));
  };

  _initiateSplitPayOptionsList = () => {
    const { isLoggedIn, isWebView, push, resumeSplitPayAfterLoginFn, showNativeAppLoginFn } = this.props;

    if (isLoggedIn) {
      this._callSplitPayOptionsList();
      raiseSatelliteEvent('squid', { page_description: 'button:cash plus points' });
    } else {
      if (isWebView) {
        const loginType = LOGIN_TYPES.PURCHASE;

        showNativeAppLoginFn({ loginType });
      } else {
        push('/login', null, {
          to: getNormalizedRoute({ routeName: 'purchase' }),
          simpleLogin: true
        });
      }
      resumeSplitPayAfterLoginFn(true);
      raiseSatelliteEvent('squid', { page_description: 'button:cash plus points login' });
    }
  };

  _initiateAlternativeFormOfPayment = (paymentMethod: string, formData: *) => {
    const { saveFormDataFn, persistAppStateFn, initiateAlternativeFormOfPaymentFn } = this.props;

    saveFormDataFn(formData).then(() => {
      if (paymentMethod === PAYMENT_METHODS.UPLIFT) {
        persistAppStateFn(EXTERNAL_PAYMENT);
      }

      initiateAlternativeFormOfPaymentFn(paymentMethod);
    });
  };

  _handlePurchaseFlightsClick = (formData: PurchaseSummaryFormData) => {
    const {
      priceTotal,
      shouldGotoPayPalSignInFn,
      fetchSavedCreditCardsFn,
      fundsAppliedToken,
      gotoPayPalSignInFn,
      setReLoginCallbackFunctionsFn,
      hasSelectedAlternativeFormOfPaymentFn,
      shouldShowChaseInstantCreditCard,
      travelFundsBalanceRemaining
    } = this.props;

    if (shouldShowChaseInstantCreditCard) {
      formData.chasePhoneNumber && _.set(formData.paymentInfo, 'chasePhoneNumber', formData.chasePhoneNumber);
    }

    const moneyTotal = getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, formData.paymentInfo);
    const hasSelectedUplift = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.UPLIFT, formData.paymentInfo);
    const continueAsGuest = () => this._continueAsGuest(formData, undefined);

    setReLoginCallbackFunctionsFn({
      postLoginCallbackFn: fetchSavedCreditCardsFn,
      continueAsGuestFn: continueAsGuest
    });

    if (shouldGotoPayPalSignInFn(formData.paymentInfo)) {
      moneyTotal && gotoPayPalSignInFn(moneyTotal, formData);
    } else if (hasSelectedApplePay) {
      this._initiateAlternativeFormOfPayment(PAYMENT_METHODS.APPLE_PAY, formData);
    } else if (hasSelectedUplift) {
      this._initiateAlternativeFormOfPayment(PAYMENT_METHODS.UPLIFT, formData);
    } else {
      this._callPurchaseFlightFn(formData);
    }
  };

  _continueAsGuest = (formData: ?PurchaseSummaryFormData, payPal: ?PayPalPaymentType) => {
    const {
      addHistoryBackToHomeFn,
      applePayCard,
      CEPTOR_VOID_API,
      hasSelectedAlternativeFormOfPaymentFn,
      initiateVoidTransactionFn,
      push,
      resetAirBookingPurchaseDataFn
    } = this.props;
    const isUsingSavedCreditCard = _.isEmpty(_.get(formData, 'paymentInfo.cardNumber'));
    const hasSelectedApplePay = hasSelectedAlternativeFormOfPaymentFn(
      PAYMENT_METHODS.APPLE_PAY,
      _.get(formData, 'paymentInfo')
    );

    if (CEPTOR_VOID_API && !_.isEmpty(applePayCard) && hasSelectedApplePay) {
      initiateVoidTransactionFn(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
    }

    if (!formData || isUsingSavedCreditCard || this._isPointsBooking()) {
      resetAirBookingPurchaseDataFn();
      addHistoryBackToHomeFn(true);
      push(getNormalizedRoute({ routeName: 'price' }));
    } else {
      this._callPurchaseFlightFn(formData, payPal);
    }
  };

  _isPointsBooking = () => this.props.currencyType === POINTS;

  _callPurchaseFlightFn = (formData: PurchaseSummaryFormData, payPal: ?PayPalPaymentType) => {
    const {
      applePayCard,
      chaseSessionId,
      contactMethodInfo,
      contactTravelManagerInfo,
      EARLY_BIRD_AB_TESTING,
      earlyBirdEligibility,
      earlyBirdPricingDifference,
      earlyBirdSelected,
      flightPricingPageResponse,
      fundsAppliedToken,
      isExpressCheckout,
      isLoggedIn,
      isPaymentOptionsAndPassengerInfoFetched,
      isWebView,
      passengerInfos: originalPassengerInfos,
      priceTotal,
      purchaseFlightFn,
      savedCreditCards,
      selectedCompanyName,
      selectedIrn,
      showDialogFn,
      taxesAndFees,
      travelFundsBalanceRemaining,
      upliftCard
    } = this.props;

    const paymentInfo =
      isWebView && formData.paymentInfo
        ? transformExpirationPaymentInfo(formData.paymentInfo, 'YYYY-MM')
        : formData.paymentInfo;

    const isPrimary = needToSaveForPrimary(paymentInfo, savedCreditCards);
    const isWebViewExpressCheckout = isWebView && isExpressCheckout;
    const passengerInfos = isWebView
      ? transformPassengerInfos(originalPassengerInfos, 'MM/DD/YYYY')
      : originalPassengerInfos;
    const isSplitPayFund = this._isSplitPayment();

    if (selectedCompanyName && !isPaymentOptionsAndPassengerInfoFetched) {
      showDialogFn({ title: i18n('AIR_BOOKING__ERROR__CID_NOT_AVAILABLE') });
    } else {
      debouncedFn(() =>
        purchaseFlightFn(
          _.merge(
            {},
            {
              ...(contactTravelManagerInfo?.contactMethod ? { dutyOfCareContact: contactTravelManagerInfo } : {}),
              applePayCard,
              calculateFundsTaxesAndFees: isSplitPayFund && taxesAndFees,
              chaseSessionId,
              contactMethodInfo,
              earlyBirdEligibility,
              earlyBirdPricingDifference,
              earlyBirdSelected: EARLY_BIRD_AB_TESTING && earlyBirdSelected,
              flightPricingPageResponse,
              fundsAppliedToken,
              isSavedAsPrimaryCard: !savedCreditCards.primaryCard,
              passengerInfos,
              paymentInfo: { ...paymentInfo, isPrimary },
              payPal,
              priceTotal,
              selectedIrn,
              travelFundsBalanceRemaining,
              upliftCard
            },
            { formData, formId: AIRBOOKING_PURCHASE_SUMMARY_FORM }
          ),
          isLoggedIn,
          isWebViewExpressCheckout
        )
      );
    }
  };

  _buildBillingAddressFormData = () => {
    const { travelFundsAddress, contactInfo } = this.props;

    if (!_.isEmpty(travelFundsAddress)) {
      return travelFundsAddress;
    } else if (!_.isEmpty(contactInfo)) {
      const billingAddressFormData = transformContactInfoToBillingAddressFormData(contactInfo);

      if (isBillingAddressComplete(billingAddressFormData)) return billingAddressFormData;
    }
  };

  _isSplitPayment = () => {
    const { travelFunds } = this.props;

    return travelFunds && isSplitPaymentFund(travelFunds);
  };

  _updatePricingAfterFundsApplied = () => {
    const { priceTotal, updatedPriceTotal } = this.props;

    return {
      ...priceTotal,
      totals: {
        ...priceTotal.totals,
        moneyTotal: updatedPriceTotal?.moneyTotal,
        pointsTotal: updatedPriceTotal?.pointsTotal,
        totalPerPassenger: updatedPriceTotal?.totalPerPassenger
      }
    };
  };

  _updateTripSummaryAfterFundsApplied = () => {
    const { purchaseSummaryPage, updatedPriceTotal } = this.props;
    const { tripSummary } = purchaseSummaryPage;

    return !isEmpty(tripSummary)
      ? {
        ...tripSummary,
        currency: updatedPriceTotal?.moneyTotal
      }
      : {};
  };

  render() {
    const {
      contactMethodContent,
      contactTravelManagerInfo,
      declineNotifications,
      dutyOfCareContact,
      EARLY_BIRD_AB_TESTING,
      earlyBirdEligibility,
      earlyBirdSelected,
      handleFirmOfferOfCreditFn,
      irnInfo,
      isInternationalBooking,
      isLoggedIn,
      isSplitPayVisible,
      isWebView,
      parentOrGuardianFormDataInfo,
      paymentInfo,
      placements,
      priceTotal,
      purchaseSummaryPage,
      savedCreditCards,
      selectedCompanyName,
      selectedIrn,
      selectedSplitPay,
      shouldShowChasePlacement,
      showEarlyBirdInPath,
      splitPayLink,
      switchEarlyBirdInPathButtonFn,
      taxesAndFees,
      totalAppliedTravelFunds,
      travelFundsBalanceRemaining,
      totalPointsApplied,
      upliftAdditionalMessaging
    } = this.props;

    const { body: splitPayBody } = splitPayLink || {};
    const { bottomPromo1, earlyBirdUpsell } = placements || {};
    const { passengers, reviewMessages, tripSummary } = purchaseSummaryPage;
    const billingAddressFormData = this._buildBillingAddressFormData();
    const contactTravelManagerInfoFormData = contactTravelManagerInfo ?? {};
    const shouldRenderForm = !_.isEmpty(tripSummary) && !_.isEmpty(passengers) && !_.isEmpty(priceTotal);
    const travelFundsApplied = !!totalAppliedTravelFunds;
    const rapidRewardsApplied = !!selectedSplitPay;
    const isSplitPayFund = this._isSplitPayment();
    const fundsAppliedPriceTotal = isSplitPayFund ? this._updatePricingAfterFundsApplied() : priceTotal;
    const fundsAppliedTripSummary = isSplitPayFund ? this._updateTripSummaryAfterFundsApplied() : tripSummary;

    return (
      <div>
        <ProgressionBar totalStep={3} step={3} title="Purchase" currentIconType="airplane" />
        {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
        {shouldRenderForm && (
          <PurchaseSummaryForm
            billingAddressFormData={billingAddressFormData}
            bottomPromo1={bottomPromo1}
            clickContactInfoTravelManagerMethodFn={() => this._goToContactInfoTravelManagerMethodPage()}
            clickContactMethodFn={() => this._goToContactMethodPage()}
            companyName={selectedCompanyName}
            declineNotifications={declineNotifications}
            dutyOfCareContact={dutyOfCareContact}
            EARLY_BIRD_AB_TESTING={EARLY_BIRD_AB_TESTING}
            earlyBirdEligibility={earlyBirdEligibility}
            earlyBirdSelected={earlyBirdSelected}
            earlyBirdUpsell={earlyBirdUpsell}
            formId={AIRBOOKING_PURCHASE_SUMMARY_FORM}
            handleChasePlacementClick={this._handleChasePlacementClick}
            handleFirmOfferOfCreditFn={handleFirmOfferOfCreditFn}
            initialFormData={{
              contactMethodContent,
              contactTravelManagerInfo: contactTravelManagerInfoFormData,
              internalReferenceNumber: selectedIrn,
              paymentInfo
            }}
            irnInfo={irnInfo}
            isCurrencyInPoints={this._isPointsBooking()}
            isInternationalBooking={isInternationalBooking}
            isWebView={isWebView}
            onApplyRapidRewardsClick={this._initiateSplitPayOptionsList}
            onApplyTravelFundsClick={this._goToApplyTravelFundsPage}
            onClickBillingAddress={this._goToBillingAddressPage}
            onEarlyBirdCheckInClick={() => wcmTransitionTo({ link_type: 'browser', target: '/early-bird-check-in' })}
            onIrnInfoClick={this._gotoIrnInfoPage}
            onParentOrGuardianItemClick={this._goToYoungTravelerEditPage}
            onPassengerItemClick={this._gotoPassengerEditPage}
            onPaymentEditClick={this._gotoPaymentEditPage}
            onSubmit={this._handlePurchaseFlightsClick}
            onSwitchEarlyBirdInPathButton={switchEarlyBirdInPathButtonFn}
            onTripAndPriceClick={() => this._goToTripAndPricePage()}
            onUnmount={() => {}}
            parentOrGuardianFormDataInfo={parentOrGuardianFormDataInfo?.data}
            passengers={passengers}
            priceTotal={fundsAppliedPriceTotal}
            rapidRewardsApplied={rapidRewardsApplied}
            reviewMessages={reviewMessages}
            savedCreditCards={savedCreditCards}
            selectedIrn={selectedIrn}
            shouldShowApplyRapidRewards={isSplitPayVisible && !!splitPayBody}
            shouldShowChasePlacement={shouldShowChasePlacement}
            showEarlyBirdInPath={showEarlyBirdInPath}
            showSaveContactMethod={isLoggedIn}
            taxesAndFees={taxesAndFees}
            totalAppliedTravelFunds={totalAppliedTravelFunds}
            travelFundsApplied={travelFundsApplied}
            travelFundsBalanceRemaining={travelFundsBalanceRemaining}
            totalPointsApplied={totalPointsApplied}
            tripSummary={fundsAppliedTripSummary}
            upliftAdditionalInfoLink={i18n('AIR_BOOKING__LEARN_MORE')}
            upliftAdditionalMessaging={upliftAdditionalMessaging}
          />
        )}
        <ReviewFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accountNumber: _.get(state, 'app.account.accountNumber'),
  applePayCard: _.get(state, 'app.applePay.applePayCard'),
  CEPTOR_VOID_API: state.app.toggles.CEPTOR_VOID_API,
  chaseSessionId: _.get(state, 'app.airBooking.chaseSessionId'),
  contactInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
  contactMethodContent: getAirBookingContactMethodContent(state),
  contactMethodInfo: getAirBookingContactMethodInfo(state),
  contactTravelManagerInfo: _.get(state, 'app.airBooking.contactTravelInfo'),
  currencyType: _.get(state, 'app.airBooking.searchRequest.currencyType'),
  currentState: RouterStore.getCurrentState(),
  declineNotifications: isDeclineNotifications(state),
  dutyOfCareContact: _.get(state, 'app.airBooking.accountInfo.dutyOfCareContact'),
  EARLY_BIRD_AB_TESTING: _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false),
  earlyBirdEligibility: _.get(state, 'app.airBooking.earlyBirdEligibility'),
  earlyBirdPricingDifference: _.get(state, 'app.airBooking.earlyBirdPricingDifference'),
  earlyBirdSelected: _.get(state, 'app.airBooking.earlyBirdSelected', false),
  flightPricingPageResponse: _.get(state, 'app.airBooking.flightPricingPage.response'),
  fundsAppliedToken: _.get(state, 'app.airBooking.applyTravelFundsPage.response.fundsAppliedToken'),
  irnInfo: _.get(state, 'app.airBooking.irnInfo'),
  isExpressCheckout: _.get(state, 'app.airBooking.isExpressCheckout'),
  isInternationalBooking: _.get(state, 'app.airBooking.isInternationalBooking'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isPaymentOptionsAndPassengerInfoFetched: _.get(state, 'app.airBooking.isPaymentOptionsAndPassengerInfoFetched'),
  isSplitPayVisible: _.get(state, 'app.airBooking.isSplitPayVisible', false),
  itineraryPricingToken: _.get(
    state,
    'app.airBooking.flightPricingPage.response.flightPricingPage._links.calculateFunds.body.itineraryPricingToken'
  ),
  isWebView: _.get(state, 'app.webView.isWebView', false),
  parentOrGuardianFormDataInfo: state?.app?.formData?.AIR_BOOKING_PARENT_OR_GUARDIAN_FORM,
  passengerInfos: _.get(state, 'app.airBooking.passengerInfos'),
  paymentInfo: _.get(state, 'app.airBooking.paymentInfo'),
  placements: _.get(state, 'app.airBooking.purchasePagePlacements'),
  prevState: RouterStore.getPrevState(),
  priceTotal: getPriceTotalWithEBForAirbooking(state),
  purchaseSummaryPage: _.get(state, 'app.airBooking.purchaseSummaryPage'),
  savedCreditCards: _.get(state, 'app.savedCreditCards'),
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName'),
  selectedFrequentTravelers: _.get(state, 'app.airBooking.selectedFrequentTravelers', null),
  selectedIrn: _.get(state, 'app.airBooking.selectedIrn.name'),
  selectedSplitPay: state?.app?.airBooking?.applyTravelFundsPage?.response?.selectedSplitPay,
  shouldResumeSplitPayAfterLogin: _.get(state, 'app.airBooking.resumeSplitPayAfterLogin'),
  shouldRetryInstantCreditsCall: _.get(state, 'app.chase.shouldRetryInstantCreditsCall', false),
  shouldShowChaseInstantCreditCard: PaymentPageSelectors.shouldShowChaseInstantCreditCard(state),
  shouldShowChasePlacement: shouldShowChasePlacements(state),
  showEarlyBirdInPath: shouldShowEarlyBirdInPathForAirbooking(state),
  splitPayLink: _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage._links.splitPay'),
  totalAppliedTravelFunds: _.get(state, 'app.airBooking.applyTravelFundsPage.response.totalFunds'),
  totalPointsApplied: _.get(state, 'app.airBooking.applyTravelFundsPage.response.totalPointsApplied'),
  travelFunds: state?.app?.airBooking?.applyTravelFundsPage?.response?.travelFunds,
  taxesAndFees: state?.app?.airBooking?.applyTravelFundsPage?.response?.taxesAndFees,
  travelFundsAddress: _.get(state, 'app.airBooking.purchaseSummaryPage.travelFundsAddress'),
  travelFundsBalanceRemaining: getBalanceRemainingWithEBForAirbooking(state).totals.moneyTotal,
  updatedPriceTotal: state?.app?.airBooking?.applyTravelFundsPage?.response?.totals,
  upliftAdditionalMessaging: PaymentPageSelectors.getUpliftAdditionalMessagingTripTotal(state),
  upliftCard: _.get(state, 'app.uplift.upliftCard'),
  webViewDeepLinkContinue: _.get(state, 'app.webView.webViewDeepLinkContinue')
});

const mapDispatchToProps = {
  addHistoryBackToHomeFn: addHistoryBackToHome,
  clearFormDataByIdFn: clearFormDataById,
  fetchSavedCreditCardsFn: getSavedCreditCards,
  generatePurchaseSummaryPageFn: AirBookingActions.generatePurchaseSummaryPage,
  getChaseApplicationStatusFn: ChaseActions.getChaseApplicationStatus,
  getSplitPayOptionsListFn: AirBookingActions.getSplitPayOptionsList,
  handleFirmOfferOfCreditFn: ChaseActions.handleFirmOfferOfCredit,
  loadPurchasePagePlacementsFn: AirBookingActions.loadPurchasePagePlacements,
  purchaseFlightFn: AirBookingActions.purchaseFlight,
  refreshFundsFn: ApplyTravelFundsActions.refreshFunds,
  removeFrequentTravelerSelectedByPaxNumberFn: AirBookingActions.removeFrequentTravelerSelectedByPaxNumber,
  resetAirBookingPurchaseDataFn: AirBookingActions.resetAirBookingPurchaseData,
  resumeSplitPayAfterLoginFn: AirBookingActions.resumeSplitPayAfterLogin,
  setChaseBannerShownFn: ChaseActions.setChaseBannerShown,
  setIsExpressCheckoutFn: AirBookingActions.setIsExpressCheckout,
  setPaymentInfoForChaseFn: AirBookingActions.savePaymentInfo,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  setShouldRetryInstantCreditsCallFn: ChaseActions.setShouldRetryInstantCreditsCall,
  setWebViewDeepLinkContinueFn: WebViewActions.handleDeepLinkContinue,
  showDialogFn: showDialog,
  showNativeAppLoginFn: WebViewActions.showNativeAppLogin,
  switchEarlyBirdInPathButtonFn: AnalyticsActions.switchEarlyBirdInPathButton,
  updateFrequentTravelerSelectionFn: AirBookingActions.updateFrequentTravelerSelection
};

const enhancers = _.flowRight(
  withPayPal({ pathnameRegExp: '^/air/booking/(review|purchase)(/(paypal|paypal-canceled))?$' }),
  withAlternativeFormsOfPayment(APPLICATION_TYPES.AIR_BOOKING),
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withAppStateHandler,
  withBodyClass('purchase-summary-page')
);

export default enhancers(PurchaseSummaryPage);
