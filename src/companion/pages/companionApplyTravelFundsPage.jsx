// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import ApplyFundsFormWithLedger from 'src/travelFunds/components/applyFundsFormWithLedger';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import {
  transformToRTFCalculateRequest,
  transformToVoucherCalculateRequest,
  transformToCardCalculateRequest,
  transformToRemoveFundsRequest,
  transformToRefreshFundsRequest
} from 'src/travelFunds/transformers/travelFundsTransformer';
import {
  getPriceTotalWithEBForCompanion,
  getBalanceRemainingWithEBForCompanion
} from 'src/shared/selectors/earlyBirdSelector';
import { getCompanionPassengerInfos } from 'src/companion/selectors/companionPurchaseSummaryPageSelectors';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import { TRAVEL_FUNDS } from 'src/companion/constants/companionConstants';
import i18n from '@swa-ui/locale';

import type { Push, PassengerInfos, TotalsType } from 'src/shared/flow-typed/shared.types';
import type {
  LookUpRTFFundType,
  LookUpVoucherFundType,
  LookUpCardFundType,
  TravelFundsOptionsType,
  ApplyTravelFundsPageResponse
} from 'src/travelFunds/flow-typed/travelFunds.types';
import type {
  CalcFundsRequestType,
  RemoveFundRequestType,
  RefreshFundsRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const { APPLY_FUNDS_CANCEL_DIALOG, FUND_TYPES_FORMATTED } = TravelFundsConstants;

type Props = {
  push: Push,
  goBack: () => void,
  balanceRemaining?: { totals: TotalsType },
  priceTotal: { totals: ?TotalsType },
  applyTravelFundsPageResponse: ?ApplyTravelFundsPageResponse,
  removeFundFn: (RemoveFundRequestType, ?string, ?boolean) => void,
  calculateFundsFn: (CalcFundsRequestType, ?string, ?boolean) => void,
  updateSelectedApplyTabFn: (TravelFundsOptionsType) => void,
  refreshFundsFn: (RefreshFundsRequestType, ?string, ?boolean) => void,
  resetCalculateFlowDataFn: () => void,
  hideDialogFn: () => Promise<*>,
  showDialogFn: (*) => Promise<*>,
  fundsAppliedToken?: string,
  passengerInfos: PassengerInfos,
  itineraryPricingToken: string,
  isLoggedIn: boolean,
  currentlySelectedTab: TravelFundsOptionsType,
  saveLastSearchedFundFn: (TravelFundsOptionsType, FormData) => void,
  clearAllApplyFormsFn: () => void
};

const { TOKEN_EXPIRED_COMPANION_URL } = TRAVEL_FUNDS;

export class CompanionApplyTravelFundsPage extends Component<Props> {
  componentDidMount() {
    const { refreshFundsFn, passengerInfos, fundsAppliedToken, itineraryPricingToken, isLoggedIn } = this.props;

    fundsAppliedToken &&
      refreshFundsFn(
        transformToRefreshFundsRequest(passengerInfos, fundsAppliedToken, itineraryPricingToken),
        TOKEN_EXPIRED_COMPANION_URL,
        isLoggedIn
      );
  }

  _onSelectionChange = (selection: TravelFundsOptionsType) => {
    const { updateSelectedApplyTabFn } = this.props;

    updateSelectedApplyTabFn(selection);
  };

  _onSubmitRTFCalculate = (formData: LookUpRTFFundType) => {
    const {
      calculateFundsFn,
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      isLoggedIn,
      saveLastSearchedFundFn
    } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[0], formData);
    calculateFundsFn(
      transformToRTFCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken),
      TOKEN_EXPIRED_COMPANION_URL,
      isLoggedIn
    );
  };

  _onSubmitVoucherCalculate = (formData: LookUpVoucherFundType) => {
    const {
      calculateFundsFn,
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      isLoggedIn,
      saveLastSearchedFundFn
    } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[1], formData);
    calculateFundsFn(
      transformToVoucherCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken),
      TOKEN_EXPIRED_COMPANION_URL,
      isLoggedIn
    );
  };

  _onSubmitCardCalculate = (formData: LookUpCardFundType) => {
    const {
      calculateFundsFn,
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      isLoggedIn,
      saveLastSearchedFundFn
    } = this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[2], formData);
    calculateFundsFn(
      transformToCardCalculateRequest(formData, passengerInfos, fundsAppliedToken, itineraryPricingToken),
      TOKEN_EXPIRED_COMPANION_URL,
      isLoggedIn
    );
  };

  _removeTravelFund = (fundId: string) => {
    const {
      removeFundFn,
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      resetCalculateFlowDataFn,
      applyTravelFundsPageResponse,
      isLoggedIn
    } = this.props;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds', []);

    travelFunds.length > 1 &&
      removeFundFn(
        transformToRemoveFundsRequest(fundId, passengerInfos, fundsAppliedToken, itineraryPricingToken),
        TOKEN_EXPIRED_COMPANION_URL,
        isLoggedIn
      );
    travelFunds.length === 1 && resetCalculateFlowDataFn();
  };

  _onClickCancelButton = () => {
    const {
      applyTravelFundsPageResponse,
      hideDialogFn,
      showDialogFn,
      goBack,
      clearAllApplyFormsFn,
      resetCalculateFlowDataFn
    } = this.props;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds', null);

    travelFunds &&
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
                goBack();
                clearAllApplyFormsFn();
                resetCalculateFlowDataFn();
              });
            }
          }
        ]
      });

    if (!travelFunds) {
      clearAllApplyFormsFn();
      goBack();
    }
  };

  _returnToPurchasePage = () => {
    const { goBack, clearAllApplyFormsFn } = this.props;

    clearAllApplyFormsFn();
    goBack();
  };

  render() {
    const { currentlySelectedTab, applyTravelFundsPageResponse, priceTotal, balanceRemaining } = this.props;
    const travelFundsBalanceRemaining = _.get(balanceRemaining, 'totals.moneyTotal', null);

    return (
      <ApplyFundsFormWithLedger
        currentlySelectedTab={currentlySelectedTab}
        travelFundsBalanceRemaining={travelFundsBalanceRemaining}
        applyTravelFundsPageResponse={applyTravelFundsPageResponse}
        priceTotal={priceTotal}
        applyFundsToPurchaseFn={this._returnToPurchasePage}
        onSubmitRTFCalculateFn={this._onSubmitRTFCalculate}
        onSubmitVoucherCalculateFn={this._onSubmitVoucherCalculate}
        onClickCancelButtonFn={this._onClickCancelButton}
        onSelectionChangeFn={this._onSelectionChange}
        onSubmitCardCalculateFn={this._onSubmitCardCalculate}
        removeTravelFundFn={this._removeTravelFund}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  passengerInfos: getCompanionPassengerInfos(state),
  applyTravelFundsPageResponse: _.get(state, 'app.companion.applyTravelFundsPage.response'),
  itineraryPricingToken: _.get(
    state,
    'app.companion.flightPricingPage._links.calculateFunds.body.itineraryPricingToken'
  ),
  currentlySelectedTab: _.get(state, 'app.companion.applyTravelFundsPage.currentlySelectedTab') || 'travel-funds',
  fundsAppliedToken: _.get(state, 'app.companion.applyTravelFundsPage.response.fundsAppliedToken'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  priceTotal: getPriceTotalWithEBForCompanion(state),
  balanceRemaining: getBalanceRemainingWithEBForCompanion(state)
});

const mapDispatchToProps = {
  calculateFundsFn: ApplyTravelFundsActions.calculateFunds,
  removeFundFn: ApplyTravelFundsActions.removeFund,
  refreshFundsFn: ApplyTravelFundsActions.refreshFunds,
  resetCalculateFlowDataFn: ApplyTravelFundsActions.resetCalculateFlowData,
  updateSelectedApplyTabFn: TravelFundsActions.updateSelectedApplyTab,
  clearAllApplyFormsFn: TravelFundsActions.clearAllApplyForms,
  showDialogFn: DialogActions.showDialog,
  hideDialogFn: DialogActions.hideDialog,
  saveLastSearchedFundFn: AnalyticsActions.saveLastSearchedFund
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CompanionApplyTravelFundsPage);
