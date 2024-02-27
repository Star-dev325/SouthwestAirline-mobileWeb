// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import i18n from '@swa-ui/locale';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as HistoryActions from 'src/shared/actions/historyActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { DESTRUCTIVE } from 'src/shared/constants/buttonPopupStyleTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { isSplitPaymentFund } from 'src/shared/helpers/travelFundsHelper';
import {
  getBalanceRemainingWithEBForAirbooking,
  getPriceTotalWithEBForAirbooking
} from 'src/shared/selectors/earlyBirdSelector';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import ApplyFundsFormWithLedger from 'src/travelFunds/components/applyFundsFormWithLedger';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import {
  transformToCardCalculateRequest,
  transformToRTFCalculateRequest,
  transformToRefreshFundsRequest,
  transformToRemoveAllTravelFundRequest,
  transformToRemoveFundsRequest,
  transformToVoucherCalculateRequest
} from 'src/travelFunds/transformers/travelFundsTransformer';

import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';

import type {
  CalcFundsRequestType,
  RefreshFundsRequestType,
  RemoveFundRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';
import type { PassengerInfos, Push, TotalsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import type {
  ApplyTravelFundsPageResponse,
  LookUpCardFundType,
  LookUpRTFFundType,
  LookUpVoucherFundType,
  TravelFundsOptionsType
} from 'src/travelFunds/flow-typed/travelFunds.types';

const { APPLY_FUNDS_CANCEL_DIALOG, FUND_TYPES_FORMATTED } = TravelFundsConstants;

type Props = {
  push: Push,
  priceTotal: { totals: ?TotalsType },
  balanceRemaining?: { totals: TotalsType },
  goBack: () => void,
  applyTravelFundsPageResponse: ?ApplyTravelFundsPageResponse,
  calculateFundsFn: (CalcFundsRequestType, ?string, ?boolean) => void,
  refreshFundsFn: (RefreshFundsRequestType, ?string, ?boolean) => void,
  removeFundFn: (RemoveFundRequestType, ?string, ?boolean) => void,
  updateSelectedApplyTabFn: (TravelFundsOptionsType) => void,
  resetCalculateFlowDataFn: () => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: () => Promise<*>,
  currentlySelectedTab: TravelFundsOptionsType,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  fundsAppliedToken?: string,
  itineraryPricingToken: string,
  passengerInfos: PassengerInfos,
  isLoggedIn: boolean,
  resetAirBookingPurchaseDataFn: () => void,
  fetchSavedCreditCardsFn: () => void,
  addHistoryBackToHomeFn: (boolean) => void,
  accountNumber?: string,
  saveLastSearchedFundFn: (TravelFundsOptionsType, FormData) => void,
  clearAllApplyFormsFn: () => void
};

export class AirBookingApplyTravelFundsPage extends Component<Props> {
  componentDidMount() {
    const { passengerInfos, fundsAppliedToken, itineraryPricingToken } = this.props;

    fundsAppliedToken &&
      this._refreshToken(transformToRefreshFundsRequest(passengerInfos, fundsAppliedToken, itineraryPricingToken));
  }

  _onSelectionChange = (selection: TravelFundsOptionsType) => {
    const { updateSelectedApplyTabFn } = this.props;

    updateSelectedApplyTabFn(selection);
  };

  _onSubmitRTFCalculate = (formData: LookUpRTFFundType) => {
    const { passengerInfos, fundsAppliedToken, itineraryPricingToken, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[0], formData);
    this._checkSessionThenCalculate(
      transformToRTFCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken)
    );
  };

  _onSubmitVoucherCalculate = (formData: LookUpVoucherFundType) => {
    const { passengerInfos, fundsAppliedToken, itineraryPricingToken, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[1], formData);
    this._checkSessionThenCalculate(
      transformToVoucherCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken)
    );
  };

  _onSubmitCardCalculate = (formData: LookUpCardFundType) => {
    const { passengerInfos, fundsAppliedToken, itineraryPricingToken, saveLastSearchedFundFn } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[2], formData);
    this._checkSessionThenCalculate(
      transformToCardCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken)
    );
  };

  _removeTravelFund = (fundId: string) => {
    const {
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      resetCalculateFlowDataFn,
      applyTravelFundsPageResponse
    } = this.props;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds', []);

    travelFunds.length > 1 &&
      this._checkSessionThenRemove(
        transformToRemoveFundsRequest(fundId, passengerInfos, fundsAppliedToken, itineraryPricingToken)
      );
    travelFunds.length === 1 && resetCalculateFlowDataFn();
  };

  _handleNextAction = (next: *, postLoginCallback: *) => {
    const { setReLoginCallbackFunctionsFn } = this.props;
    const continueAsGuest = () => this._continueAsGuest();

    next();
    setReLoginCallbackFunctionsFn({ continueAsGuestFn: continueAsGuest, postLoginCallbackFn: postLoginCallback });
  };

  _checkSessionThenCalculate = (request: CalcFundsRequestType) => {
    const { calculateFundsFn, fetchSavedCreditCardsFn, isLoggedIn } = this.props;
    const expiredAirBookingUrl = getNormalizedRoute({
      routeName: 'index'
    });
    const next = () => calculateFundsFn(request, expiredAirBookingUrl, this._isPointsBooking() && isLoggedIn);

    this._handleNextAction(next, fetchSavedCreditCardsFn);
  };

  _checkSessionThenRemove = (request: RemoveFundRequestType) => {
    const { removeFundFn, fetchSavedCreditCardsFn, isLoggedIn } = this.props;
    const expiredAirBookingUrl = getNormalizedRoute({ routeName: 'index' });
    const next = () => removeFundFn(request, expiredAirBookingUrl, this._isPointsBooking() && isLoggedIn);

    this._handleNextAction(next, fetchSavedCreditCardsFn);
  };

  _refreshToken = (request: RefreshFundsRequestType) => {
    const { refreshFundsFn, fetchSavedCreditCardsFn, isLoggedIn } = this.props;
    const expiredAirBookingUrl = getNormalizedRoute({ routeName: 'index' });
    const next = () => refreshFundsFn(request, expiredAirBookingUrl, this._isPointsBooking() && isLoggedIn);

    this._handleNextAction(next, fetchSavedCreditCardsFn);
  };

  _continueAsGuest = () => {
    const { resetAirBookingPurchaseDataFn, addHistoryBackToHomeFn } = this.props;

    resetAirBookingPurchaseDataFn();
    addHistoryBackToHomeFn(true);
    this._goToPricingPage();
  };

  _isPointsBooking() {
    return _.get(this.props.priceTotal, 'totals.pointsTotal', null) !== null;
  }

  _goToPricingPage = () => {
    this.props.push(getNormalizedRoute({ routeName: 'price' }));
  };

  _returnToReviewPage = () => {
    const { goBack, clearAllApplyFormsFn } = this.props;

    clearAllApplyFormsFn();
    goBack();
  };

  _removeAllTravelFundAndGoBack = async () => {
    const { fundsAppliedToken, goBack, itineraryPricingToken, passengerInfos, removeFundFn } = this.props;
    const removeAllTravelFundRequest = transformToRemoveAllTravelFundRequest(
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken
    );

    await removeFundFn(removeAllTravelFundRequest);
    goBack();
  };

  _onClickCancelButton = () => {
    const {
      applyTravelFundsPageResponse,
      showDialogFn,
      hideDialogFn,
      goBack,
      clearAllApplyFormsFn,
      resetCalculateFlowDataFn
    } = this.props;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds');
    const isSplitPaymentAdded = travelFunds && isSplitPaymentFund(travelFunds);
    const hideCancelDialog = travelFunds?.length === 1 && isSplitPaymentAdded;

    if (travelFunds && !hideCancelDialog) {
      showDialogFn({
        name: APPLY_FUNDS_CANCEL_DIALOG.name,
        title: APPLY_FUNDS_CANCEL_DIALOG.title,
        message: APPLY_FUNDS_CANCEL_DIALOG.message,
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: hideDialogFn
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                clearAllApplyFormsFn();

                if (isSplitPaymentAdded) {
                  this._removeAllTravelFundAndGoBack();
                } else {
                  resetCalculateFlowDataFn();
                  goBack();
                }
              });
            },
            style: DESTRUCTIVE
          }
        ]
      });
    } else {
      clearAllApplyFormsFn();
      goBack();
    }
  };

  render() {
    const { applyTravelFundsPageResponse, currentlySelectedTab, priceTotal, balanceRemaining } = this.props;

    const travelFundsBalanceRemaining = _.get(balanceRemaining, 'totals.moneyTotal');

    return (
      <ApplyFundsFormWithLedger
        currentlySelectedTab={currentlySelectedTab}
        applyTravelFundsPageResponse={applyTravelFundsPageResponse}
        travelFundsBalanceRemaining={travelFundsBalanceRemaining}
        priceTotal={priceTotal}
        applyFundsToPurchaseFn={this._returnToReviewPage}
        onClickCancelButtonFn={this._onClickCancelButton}
        onSelectionChangeFn={this._onSelectionChange}
        onSubmitRTFCalculateFn={this._onSubmitRTFCalculate}
        onSubmitVoucherCalculateFn={this._onSubmitVoucherCalculate}
        onSubmitCardCalculateFn={this._onSubmitCardCalculate}
        removeTravelFundFn={this._removeTravelFund}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  applyTravelFundsPageResponse: _.get(state, 'app.airBooking.applyTravelFundsPage.response'),
  currentlySelectedTab: _.get(state, 'app.airBooking.applyTravelFundsPage.currentlySelectedTab') || 'travel-funds',
  passengerInfos: _.get(state, 'app.airBooking.passengerInfos'),
  itineraryPricingToken: _.get(
    state,
    'app.airBooking.flightPricingPage.response.flightPricingPage._links.calculateFunds.body.itineraryPricingToken'
  ),
  fundsAppliedToken: _.get(state, 'app.airBooking.applyTravelFundsPage.response.fundsAppliedToken'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  priceTotal: getPriceTotalWithEBForAirbooking(state),
  balanceRemaining: getBalanceRemainingWithEBForAirbooking(state),
  accountNumber: _.get(state, 'app.account.accountNumber')
});

const mapDispatchToProps = {
  calculateFundsFn: ApplyTravelFundsActions.calculateFunds,
  removeFundFn: ApplyTravelFundsActions.removeFund,
  refreshFundsFn: ApplyTravelFundsActions.refreshFunds,
  resetCalculateFlowDataFn: ApplyTravelFundsActions.resetCalculateFlowData,
  updateSelectedApplyTabFn: TravelFundsActions.updateSelectedApplyTab,
  clearAllApplyFormsFn: TravelFundsActions.clearAllApplyForms,
  setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
  showDialogFn: DialogActions.showDialog,
  hideDialogFn: DialogActions.hideDialog,
  resetAirBookingPurchaseDataFn: AirBookingActions.resetAirBookingPurchaseData,
  addHistoryBackToHomeFn: HistoryActions.addHistoryBackToHome,
  fetchSavedCreditCardsFn: CreditCardActions.getSavedCreditCards,
  saveLastSearchedFundFn: AnalyticsActions.saveLastSearchedFund
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-booking-apply-travel-funds-page')
);

export default enhancers(AirBookingApplyTravelFundsPage);
