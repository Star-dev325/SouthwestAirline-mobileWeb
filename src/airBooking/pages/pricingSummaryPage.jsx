// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { getFirstShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { shouldShowChaseInstantCreditCard } from 'src/airBooking/selectors/paymentPageSelectors';
import { hasEnoughPointsForFare } from 'src/airChange/helpers/airChangeHelper';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { getAccountInfo } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { showNativeAppLogin } from 'src/shared/actions/webViewActions';
import { deleteUserInfo, saveChaseInstantCreditReturnUrl } from 'src/shared/cache/localStorageCache';
import PricingDetail from 'src/shared/components/pricingDetail';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withAppStateHandler from 'src/shared/enhancers/withAppStateHandler';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import WithShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { hasActiveSessionCookies } from 'src/shared/helpers/loginSessionHelper';
import {
  getAllSelectedFrequentTravelers,
  getPassengerInfoFormId,
  shouldRemoveFrequentTravelerAtIndex
} from 'src/shared/helpers/passengerInfoHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { shouldShowChasePlacements } from 'src/shared/selectors/chaseSelector';
import {
  getBalanceRemainingWithEBForAirbooking,
  getPriceTotalWithEBForAirbooking
} from 'src/shared/selectors/earlyBirdSelector';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type {
  EarlyBirdEligibility,
  FlightPricingPageResponse,
  FlightProductSearchRequest,
  PassengerInfoRequest
} from 'src/airBooking/flow-typed/airBooking.types';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';
import type { PriceTotalPropsType } from 'src/shared/components/priceTotal';
import type {
  CurrencyType,
  FrequentTravelerType,
  NativeAppLoginOptions,
  PassengerInfos,
  Push,
  SelectedFrequentTravelerType
} from 'src/shared/flow-typed/shared.types';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { EXTERNAL_TARGETS } = SharedConstants;

type Props = {
  flightPricingPage: {
    response: FlightPricingPageResponse,
    resumeAfterLogin: boolean,
    hasUpsellError: boolean
  },
  showChaseInstantCreditCard: boolean,
  searchRequest: FlightProductSearchRequest,
  shouldShowChasePlacement: boolean,
  isEligibleForExpressCheckout: boolean,
  gotoFirstPassengerPageFn: ({ searchRequest: FlightProductSearchRequest, path: string }) => void,
  setExpressCheckoutFromPassengerPageFn: (isExpressCheckoutFromPassengerPage: boolean) => *,
  resetAirBookingPurchaseDataFn: () => void,
  resumeAfterLoginFn: (shouldResume: boolean) => void,
  push: Push,
  history: {
    location: HistoryLocation
  },
  accountRedeemablePoints: number,
  chaseBannerConfig: ?DynamicPlacementResponse,
  promoBannerConfig: {
    promoTop01?: DynamicPlacementResponse,
    promoMiddle01?: DynamicPlacementResponse,
    promoBottom01?: DynamicPlacementResponse,
    promoBottom02?: DynamicPlacementResponse
  },
  isLoggedIn: boolean,
  isWebView: boolean,
  accountNumber: string,
  loadPricePagePlacementsFn: (boolean) => void,
  handleFirmOfferOfCreditFn: () => void,
  fetchSavedCreditCardsAndPassengerInfoFn: (isInternationalBooking: boolean, passengerInfoPageUrl?: string) => void,
  fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: (
    isInternationalBooking: boolean,
    passengerPageUrl?: string,
    passengerNumber: number,
    isExpressCheckoutFromPassengerPage: boolean,
    shouldShowChaseInstantCreditCard: boolean
  ) => Promise<*>,
  generatePassengerPageInfoFn: (PassengerInfoRequest) => void,
  isInternationalBooking: boolean,
  updateFlightSearchRequestAndSyncToFormDataFn: (*) => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: (*) => Promise<*>,
  showNativeAppLoginFn: (NativeAppLoginOptions) => void,
  getProductListFn: ({ searchRequest: FlightProductSearchRequest }) => Promise<*>,
  selectedCompanyName: ?string,
  placements?: { earlyBirdUpsell?: DynamicPlacementResponse },
  earlyBirdEligibility?: EarlyBirdEligibility,
  EARLY_BIRD_AB_TESTING: boolean,
  travelFundsBalanceRemaining?: CurrencyType,
  earlyBirdSelected: boolean,
  priceTotal: PriceTotalPropsType,
  webViewDeepLinkContinue: ?boolean,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  frequentTravelerList: Array<FrequentTravelerType>,
  passengerInfos: PassengerInfos,
  getAccountInfoFn: () => void,
  setWebViewDeepLinkContinueFn: (boolean) => void,
  setChaseBannerShownFn: (boolean) => void,
  shouldResumeAppStateFn: (string) => boolean,
  resumeAppStateFn: () => Promise<*>,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  persistAppStateFn: (string) => void,
  getChaseApplicationStatusFn: () => void,
  removeFrequentTravelerSelectedByPaxNumberFn: (number) => void,
  selectFlightProductWithUpsellFn: (linkObj: Link) => void,
  clearFormDataByIdFn: (string) => {}
};

const { CHASE } = EXTERNAL_TARGETS;

export class PricingSummaryPage extends Component<Props> {
  componentDidMount() {
    const { shouldResumeAppStateFn } = this.props;

    shouldResumeAppStateFn(CHASE) && this._resumeFromChaseApplication();
    this._handleResumeAfterLogin();
    this._setupPricePagePlacements();
  }

  componentDidUpdate(prevProps: Props) {
    const { shouldResumeAppStateFn, webViewDeepLinkContinue, setWebViewDeepLinkContinueFn } = this.props;

    if (webViewDeepLinkContinue) {
      shouldResumeAppStateFn(CHASE) && this._resumeFromChaseApplication();
      this._setupPricePagePlacements();
      setWebViewDeepLinkContinueFn(false);
    } else {
      this._handleEarlyBirdStateChange(prevProps);
    }

    this._handleResumeAfterLogin();
    this._setChaseBannerShown(prevProps);
  }

  _resumeFromChaseApplication = () => {
    const { resumeAppStateFn, getChaseApplicationStatusFn } = this.props;

    resumeAppStateFn().then(() => getChaseApplicationStatusFn());
  };

  _setupPricePagePlacements() {
    const { loadPricePagePlacementsFn, shouldShowChasePlacement } = this.props;

    loadPricePagePlacementsFn(shouldShowChasePlacement);
  }

  _setChaseBannerShown(prevProps: Props) {
    const { chaseBannerConfig, shouldShowChasePlacement, setChaseBannerShownFn } = this.props;

    const hasBannerConfigChanged = !_.isEqual(chaseBannerConfig, prevProps.chaseBannerConfig);
    const hasSelectorChanged = shouldShowChasePlacement !== prevProps.shouldShowChasePlacement;

    if (hasBannerConfigChanged || hasSelectorChanged) {
      setChaseBannerShownFn(!!chaseBannerConfig && !!shouldShowChasePlacement);
    }
  }

  _handleEarlyBirdStateChange = (prevProps: Props) => {
    const { earlyBirdSelected } = this.props;
    const { earlyBirdSelected: prevEarlyBirdSelected } = prevProps;

    if (earlyBirdSelected !== prevEarlyBirdSelected) {
      this._setupPricePagePlacements();
    }
  };

  _handleResumeAfterLogin() {
    const {
      isLoggedIn,
      flightPricingPage: { resumeAfterLogin },
      resumeAfterLoginFn
    } = this.props;

    if (isLoggedIn && resumeAfterLogin) {
      this._continue();
      resumeAfterLoginFn(false);
    }
  }

  _handleContinueClick = () => {
    const { setReLoginCallbackFunctionsFn } = this.props;

    setReLoginCallbackFunctionsFn({ continueAsGuestFn: this._continueAsGuest });
    this._continue();
  };

  _fetchSavedCCsAndPassengerInfoWithExpressCheckOut = () => {
    const {
      flightPricingPage: {
        response: { prefill }
      },
      searchRequest,
      isLoggedIn,
      isInternationalBooking,
      generatePassengerPageInfoFn,
      fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn,
      showChaseInstantCreditCard,
      selectedFrequentTravelers,
      removeFrequentTravelerSelectedByPaxNumberFn
    } = this.props;
    const { numberOfAdults, numberOfLapInfants = 0 } = searchRequest;
    const passengerPageUrl = `${getNormalizedRoute({ routeName: 'passengers' })}/0`;
    const passengerAmount = parseInt(numberOfAdults + numberOfLapInfants);
    const isExpressCheckoutFromPassengerPage = false;

    generatePassengerPageInfoFn({
      searchRequest,
      ...(isLoggedIn ? {} : { chaseCardHolder: _.get(prefill, 'chaseCardHolder') })
    });
    shouldRemoveFrequentTravelerAtIndex(selectedFrequentTravelers, 0) && removeFrequentTravelerSelectedByPaxNumberFn(0);

    return fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn(
      isInternationalBooking,
      passengerPageUrl,
      passengerAmount,
      isExpressCheckoutFromPassengerPage,
      showChaseInstantCreditCard
    );
  };

  _continueAsGuest = () => {
    const { resetAirBookingPurchaseDataFn } = this.props;
    const isPointsBooking = this._isPointsBooking();

    resetAirBookingPurchaseDataFn();

    if (!isPointsBooking) this._goToFirstPassengerPage();
  };

  _continue = () => {
    const { isLoggedIn, isEligibleForExpressCheckout } = this.props;
    const isPointsBooking = this._isPointsBooking();

    if (isPointsBooking) {
      this._handleContinueForPointsBooking();
    } else {
      isLoggedIn && isEligibleForExpressCheckout ? this._fetchPassengerPageInfo() : this._goToFirstPassengerPage();
    }
  };

  _isPointsBooking() {
    return _.get(this.props, 'flightPricingPage.response.flightPricingPage.totals.pointsTotal', null) !== null;
  }

  _handleContinueForPointsBooking() {
    const {
      isLoggedIn,
      isWebView,
      showNativeAppLoginFn,
      push,
      resumeAfterLoginFn,
      isEligibleForExpressCheckout,
      flightPricingPage,
      accountRedeemablePoints
    } = this.props;
    const amount = _.get(flightPricingPage, 'response.flightPricingPage.totals.pointsTotal.amount', '0');

    if (isLoggedIn) {
      hasEnoughPointsForFare(amount, accountRedeemablePoints)
        ? isEligibleForExpressCheckout
          ? this._fetchPassengerPageInfo()
          : this._goToFirstPassengerPage()
        : this._showNotEnoughPointsDialog();
    } else if (isWebView) {
      showNativeAppLoginFn({ loginType: LOGIN_TYPES.POINTS });
      resumeAfterLoginFn(true);
    } else {
      push('/login', null, {
        to: getNormalizedRoute({ routeName: 'price' }),
        simpleLogin: true,
        withPoints: true
      });

      resumeAfterLoginFn(true);
    }
  }

  _fetchPassengerPageInfo() {
    const { isLoggedIn, isEligibleForExpressCheckout, setExpressCheckoutFromPassengerPageFn } = this.props;

    setExpressCheckoutFromPassengerPageFn(false);
    isLoggedIn &&
      isEligibleForExpressCheckout &&
      this._fetchSavedCCsAndPassengerInfoWithExpressCheckOut().then(() => {
        this.syncSelectedFrequentTravelers();
        this._goToFirstPassengerPage();
      });
  }

  syncSelectedFrequentTravelers() {
    const {
      selectedFrequentTravelers,
      frequentTravelerList,
      passengerInfos,
      removeFrequentTravelerSelectedByPaxNumberFn,
      clearFormDataByIdFn
    } = this.props;

    const getFrequentTravelersById = getAllSelectedFrequentTravelers(selectedFrequentTravelers);

    getFrequentTravelersById.forEach((frequentTraveler) => {
      const noFrequentTravelers = frequentTravelerList.every(
        (traveler: FrequentTravelerType) => traveler.frequentTravelerId !== frequentTraveler.frequentTravelerId
      );

      if (noFrequentTravelers) {
        const { paxNumber } = frequentTraveler;
        const { type } = passengerInfos[paxNumber];

        clearFormDataByIdFn(getPassengerInfoFormId(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, type, paxNumber));
        removeFrequentTravelerSelectedByPaxNumberFn(paxNumber);
      }
    });
  }

  _goToFirstPassengerPage() {
    const {
      searchRequest,
      flightPricingPage: {
        response: { prefill }
      },
      isLoggedIn,
      isEligibleForExpressCheckout,
      gotoFirstPassengerPageFn
    } = this.props;
    const shouldGotoFirstPassengerPage = !isEligibleForExpressCheckout || !isLoggedIn || !hasActiveSessionCookies();

    shouldGotoFirstPassengerPage &&
      gotoFirstPassengerPageFn({
        searchRequest,
        path: `${getNormalizedRoute({ routeName: 'passengers' })}/0`,
        ...(isLoggedIn ? {} : { chaseCardHolder: _.get(prefill, 'chaseCardHolder') })
      });
  }

  _showNotEnoughPointsDialog() {
    const { showDialogFn, hideDialogFn, getAccountInfoFn } = this.props;

    showDialogFn({
      name: 'flight-purchase-not-enough-points-modify',
      title: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__TITLE'),
      message: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__MESSAGE'),
      className: 'not-enough-points-dialog',
      closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL'),
      closeLabelStyle: PRIMARY,
      onClose: () => hideDialogFn().then(() => getAccountInfoFn()),
      verticalLinks: {
        links: [
          {
            label: 'With Points',
            dataQa: 'continue-with-points-button',
            onClick: this._handlePopupChoosePointsOnClick
          },
          {
            label: 'With Dollars',
            dataQa: 'continue-with-dollars-button',
            onClick: this._handlePopupChooseDollarsOnClick
          }
        ]
      }
    });
  }

  _handlePopupChooseDollarsOnClick = async () => {
    const {
      searchRequest,
      hideDialogFn,
      updateFlightSearchRequestAndSyncToFormDataFn,
      getProductListFn,
      getAccountInfoFn
    } = this.props;
    const newSearchRequest = { ...searchRequest, currencyType: DOLLAR };

    await getProductListFn({ searchRequest: newSearchRequest });

    hideDialogFn().then(() => {
      updateFlightSearchRequestAndSyncToFormDataFn({ ...searchRequest, currencyType: DOLLAR });
      this.props.push(
        buildPathWithParamAndQuery(
          getNormalizedRoute({ routeName: 'flightShoppingDepart' }),
          getFirstShoppingPageParams()
        )
      );
      getAccountInfoFn();
    });
  };

  _handlePopupChoosePointsOnClick = async () => {
    const {
      searchRequest,
      hideDialogFn,
      getProductListFn,
      updateFlightSearchRequestAndSyncToFormDataFn,
      getAccountInfoFn
    } = this.props;

    deleteUserInfo();
    const currencyType = _.get(searchRequest, 'currencyType', POINTS);

    if (currencyType === DOLLAR) {
      const newSearchRequest = { ...searchRequest, currencyType: POINTS };

      await getProductListFn({ searchRequest: newSearchRequest });
    }

    hideDialogFn().then(() => {
      updateFlightSearchRequestAndSyncToFormDataFn({ ...searchRequest, currencyType: POINTS });
      this.props.push(
        buildPathWithParamAndQuery(
          getNormalizedRoute({ routeName: 'flightShoppingDepart' }),
          getFirstShoppingPageParams()
        )
      );
      getAccountInfoFn();
    });
  };

  _onChaseButtonClick = () => {
    const {
      persistAppStateFn,
      history: {
        location: { pathname }
      }
    } = this.props;

    saveChaseInstantCreditReturnUrl(pathname);
    persistAppStateFn(CHASE);
  };

  render() {
    const {
      flightPricingPage: {
        response: { flightPricingPage },
        hasUpsellError
      },
      searchRequest,
      shouldShowChasePlacement,
      chaseBannerConfig,
      promoBannerConfig,
      handleFirmOfferOfCreditFn,
      history: {
        location: { pathname }
      },
      isLoggedIn,
      selectedCompanyName,
      placements,
      travelFundsBalanceRemaining,
      earlyBirdSelected,
      EARLY_BIRD_AB_TESTING,
      priceTotal,
      earlyBirdEligibility,
      isWebView,
      selectFlightProductWithUpsellFn
    } = this.props;

    const { promoTop01, promoMiddle01, promoBottom01, promoBottom02 } = promoBannerConfig;
    const { earlyBirdUpsell } = placements || {};

    if (!flightPricingPage) {
      return null;
    }

    return (
      <React.Fragment>
        <PricingDetail
          totalStep={3}
          flightPricingPage={flightPricingPage}
          onContinueClick={this._handleContinueClick}
          selectedCompanyName={selectedCompanyName}
          promoTop01={promoTop01}
          promoMiddle01={promoMiddle01}
          EARLY_BIRD_AB_TESTING={EARLY_BIRD_AB_TESTING}
          earlyBirdEligibility={earlyBirdEligibility}
          earlyBirdUpsell={earlyBirdUpsell}
          earlyBirdSelected={earlyBirdSelected}
          priceTotal={priceTotal}
          travelFundsBalanceRemaining={travelFundsBalanceRemaining}
          searchRequest={searchRequest}
          selectFlightProductWithUpsellFn={selectFlightProductWithUpsellFn}
          hasUpsellError={hasUpsellError}
          chaseBannerConfig={chaseBannerConfig}
          shouldShowChasePlacement={shouldShowChasePlacement}
          pathname={pathname}
          isLoggedIn={isLoggedIn}
          isWebView={isWebView}
          onChaseButtonClick={this._onChaseButtonClick}
          handleFirmOfferOfCreditFn={handleFirmOfferOfCreditFn}
        />
        <div className="pricing-summary--promos">
          {promoBottom01 && <DynamicPlacement {...promoBottom01} data-qa="promoBottom01" />}
          {promoBottom02 && <DynamicPlacement {...promoBottom02} data-qa="promoBottom02" />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView'),
  flightPricingPage: _.get(state, 'app.airBooking.flightPricingPage'),
  earlyBirdEligibility: _.get(state, 'app.airBooking.earlyBirdEligibility'),
  earlyBirdSelected: _.get(state, 'app.airBooking.earlyBirdSelected', false),
  priceTotal: getPriceTotalWithEBForAirbooking(state),
  travelFundsBalanceRemaining: getBalanceRemainingWithEBForAirbooking(state).totals.moneyTotal,
  searchRequest: _.get(state, 'app.airBooking.searchRequest'),
  chaseBannerConfig: _.get(state, 'app.airBooking.chaseBannerConfig'),
  promoBannerConfig: _.get(state, 'app.airBooking.pricingPromoBannerConfig', {}),
  isLoggedIn: state.app.account.isLoggedIn,
  showChaseInstantCreditCard: shouldShowChaseInstantCreditCard(state),
  accountNumber: _.get(state, 'app.account.accountNumber'),
  accountRedeemablePoints: _.get(state.app, 'account.accountInfo.rapidRewardsDetails.redeemablePoints', 0),
  isEligibleForExpressCheckout: _.get(state, 'app.airBooking.isEligibleForExpressCheckout'),
  shouldShowChasePlacement: shouldShowChasePlacements(state),
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName'),
  EARLY_BIRD_AB_TESTING: _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false),
  placements: _.get(state, 'app.airBooking.pricePagePlacements'),
  isInternationalBooking: _.get(state, 'app.airBooking.isInternationalBooking'),
  webViewDeepLinkContinue: _.get(state, 'app.webView.webViewDeepLinkContinue'),
  selectedFrequentTravelers: _.get(state, 'app.airBooking.selectedFrequentTravelers', []),
  frequentTravelerList: _.get(state, 'app.airBooking.accountInfo.frequentTravelerList'),
  passengerInfos: _.get(state, 'app.airBooking.passengerInfos')
});

const mapDispatchToProps = {
  gotoFirstPassengerPageFn: AirBookingActions.gotoFirstPassengerPage,
  setExpressCheckoutFromPassengerPageFn: AirBookingActions.setExpressCheckoutFromPassengerPage,
  fetchSavedCreditCardsAndPassengerInfoFn: AirBookingActions.fetchSavedCreditCardsAndPassengerInfo,
  fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn:
    AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut,
  resetAirBookingPurchaseDataFn: AirBookingActions.resetAirBookingPurchaseData,
  resumeAfterLoginFn: AirBookingActions.resumeAfterLogin,
  loadPricePagePlacementsFn: AirBookingActions.loadPricePagePlacements,
  generatePassengerPageInfoFn: AirBookingActions.generatePassengerPageInfo,
  handleFirmOfferOfCreditFn: ChaseActions.handleFirmOfferOfCredit,
  updateFlightSearchRequestAndSyncToFormDataFn: AirBookingActions.updateFlightSearchRequestAndSyncToFormData,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  getAccountInfoFn: getAccountInfo,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  getProductListFn: AirBookingActions.getProductList,
  setWebViewDeepLinkContinueFn: WebViewActions.handleDeepLinkContinue,
  setChaseBannerShownFn: ChaseActions.setChaseBannerShown,
  getChaseApplicationStatusFn: ChaseActions.getChaseApplicationStatus,
  removeFrequentTravelerSelectedByPaxNumberFn: AirBookingActions.removeFrequentTravelerSelectedByPaxNumber,
  selectFlightProductWithUpsellFn: AirBookingActions.selectFlightProductWithUpsell,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  showNativeAppLoginFn: showNativeAppLogin
};

export default _.flowRight(
  withConnectedReactRouter,
  WithShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withAppStateHandler,
  withBodyClass('pricing-summary-page')
)(PricingSummaryPage);
