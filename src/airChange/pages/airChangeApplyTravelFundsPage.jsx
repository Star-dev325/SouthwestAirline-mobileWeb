// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToPricing } from 'src/airChange/actions/airChangeActions';
import * as AirChangeApplyTravelFundsPageSelectors from 'src/airChange/selectors/airChangeApplyTravelFundsPageSelectors';
import { getSelectedProducts } from 'src/airChange/selectors/airChangeShoppingPageSelectors';
import * as AirUpgradeActions from 'src/airUpgrade/actions/airUpgradeActions';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { saveLastSearchedFund } from 'src/shared/analytics/actions/analyticsActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { clearAllApplyForms, updateSelectedApplyTab } from 'src/travelFunds/actions/travelFundsActions';
import ApplyFundsFormWithLedger from 'src/travelFunds/components/applyFundsFormWithLedger';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import {
  transformToCardCalculateRequest,
  transformToRefreshFundsRequest,
  transformToRemoveFundsRequest,
  transformToRTFCalculateRequest,
  transformToVoucherCalculateRequest
} from 'src/travelFunds/transformers/travelFundsTransformer';

import type {
  CalcFundsRequestType,
  RefreshFundsRequestType,
  RemoveFundRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';
import type { SelectedProducts } from 'src/airChange/flow-typed/airChange.types';
import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';
import type { CurrencyType, Push } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
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
  goBack: () => void,
  balanceRemaining: CurrencyType,
  applyTravelFundsPageResponse: ?ApplyTravelFundsPageResponse,
  removeFundFn: (RemoveFundRequestType, ?string, ?boolean) => void,
  calculateFundsFn: (CalcFundsRequestType, ?string, ?boolean) => void,
  updateSelectedApplyTabFn: (TravelFundsOptionsType) => void,
  refreshFundsFn: (RefreshFundsRequestType, ?string, ?boolean) => void,
  resetCalculateFlowDataFn: () => void,
  hideDialogFn: () => Promise<*>,
  showDialogFn: (*) => Promise<*>,
  fundsAppliedToken?: string,
  itineraryPricingToken: string,
  isLoggedIn: boolean,
  isUpgrade: boolean,
  currentlySelectedTab: TravelFundsOptionsType,
  saveLastSearchedFundFn: (TravelFundsOptionsType, FormData) => void,
  clearAllApplyFormsFn: () => void,
  goToPricingFn: (Link, SelectedProducts | Array<PricingDataType>, boolean, boolean, boolean) => Promise<*>,
  goToAirChangePricingReviewFn: (
    changePricingPage: Link,
    selectedBounds: Array<PricingDataType> | SelectedProducts,
    isLoggedIn: boolean,
    shouldResetCalculateFundsFlow: boolean,
    ignoreNavigationLogic: boolean
  ) => void,
  selectedProducts: SelectedProducts | Array<PricingDataType>,
  changePricingPageLink: Link
};

type State = {
  userIsCancelling: boolean
};

export class AirChangeApplyTravelFundsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userIsCancelling: false
    };
  }

  componentDidMount() {
    const { refreshFundsFn, fundsAppliedToken, itineraryPricingToken, isLoggedIn } = this.props;

    fundsAppliedToken &&
      refreshFundsFn(
        transformToRefreshFundsRequest(null, fundsAppliedToken, itineraryPricingToken),
        getNormalizedRoute({ routeName: 'viewReservationIndex' }),
        isLoggedIn
      );
  }

  componentWillUnmount() {
    const {
      goToPricingFn,
      goToAirChangePricingReviewFn,
      changePricingPageLink,
      selectedProducts,
      fundsAppliedToken,
      isLoggedIn,
      isUpgrade,
      applyTravelFundsPageResponse
    } = this.props;
    const pageLinkWithFundsToken = _.merge({}, changePricingPageLink, { body: { fundsAppliedToken } });

    if (!_.isEmpty(applyTravelFundsPageResponse)) {
      const userCanceledTravelFunds = this.state.userIsCancelling;
      const pageLink = userCanceledTravelFunds ? changePricingPageLink : pageLinkWithFundsToken;
      const gotoPricingPageFn = isUpgrade ? goToAirChangePricingReviewFn : goToPricingFn;

      gotoPricingPageFn(pageLink, selectedProducts, isLoggedIn, userCanceledTravelFunds, true);
    }
  }

  _onSelectionChange = (selection: TravelFundsOptionsType) => {
    const { updateSelectedApplyTabFn } = this.props;

    updateSelectedApplyTabFn(selection);
  };

  _onSubmitRTFCalculate = (formData: LookUpRTFFundType) => {
    const { calculateFundsFn, fundsAppliedToken, itineraryPricingToken, isLoggedIn, saveLastSearchedFundFn } =
      this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[0], formData);
    calculateFundsFn(
      transformToRTFCalculateRequest(formData, null, fundsAppliedToken, itineraryPricingToken),
      getNormalizedRoute({ routeName: 'viewReservationIndex' }),
      isLoggedIn
    );
  };

  _onSubmitVoucherCalculate = (formData: LookUpVoucherFundType) => {
    const { calculateFundsFn, fundsAppliedToken, itineraryPricingToken, isLoggedIn, saveLastSearchedFundFn } =
      this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[1], formData);
    calculateFundsFn(
      transformToVoucherCalculateRequest(formData, null, fundsAppliedToken, itineraryPricingToken),
      getNormalizedRoute({ routeName: 'viewReservationIndex' }),
      isLoggedIn
    );
  };

  _onSubmitCardCalculate = (formData: LookUpCardFundType) => {
    const { calculateFundsFn, fundsAppliedToken, itineraryPricingToken, isLoggedIn, saveLastSearchedFundFn } =
      this.props;

    saveLastSearchedFundFn(FUND_TYPES_FORMATTED[2], formData);
    calculateFundsFn(
      transformToCardCalculateRequest(formData, null, fundsAppliedToken, itineraryPricingToken),
      getNormalizedRoute({ routeName: 'viewReservationIndex' }),
      isLoggedIn
    );
  };

  _removeTravelFund = (fundId: string) => {
    const { removeFundFn, fundsAppliedToken, itineraryPricingToken, isLoggedIn } = this.props;

    removeFundFn(
      transformToRemoveFundsRequest(fundId, null, fundsAppliedToken, itineraryPricingToken),
      getNormalizedRoute({ routeName: 'viewReservationIndex' }),
      isLoggedIn
    );
  };

  _onClickCancelButton = () => {
    const { applyTravelFundsPageResponse, hideDialogFn, showDialogFn, goBack, clearAllApplyFormsFn } = this.props;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds', null);
    const onlyAutoAppliedFunds = travelFunds && !travelFunds.some((fund) => fund._links);

    if (travelFunds && !onlyAutoAppliedFunds) {
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
              this.setState(
                {
                  userIsCancelling: true
                },
                () => {
                  hideDialogFn();
                  goBack();
                }
              );
            }
          }
        ]
      });
    } else {
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
    const { currentlySelectedTab, applyTravelFundsPageResponse, balanceRemaining } = this.props;
    const priceTotal = { totals: _.get(applyTravelFundsPageResponse, 'totals', null) };

    return (
      <ApplyFundsFormWithLedger
        currentlySelectedTab={currentlySelectedTab}
        travelFundsBalanceRemaining={balanceRemaining}
        applyTravelFundsPageResponse={applyTravelFundsPageResponse}
        priceTotal={priceTotal}
        applyFundsToPurchaseFn={this._returnToPurchasePage}
        onSubmitRTFCalculateFn={this._onSubmitRTFCalculate}
        onSubmitVoucherCalculateFn={this._onSubmitVoucherCalculate}
        onClickCancelButtonFn={this._onClickCancelButton}
        onSelectionChangeFn={this._onSelectionChange}
        onSubmitCardCalculateFn={this._onSubmitCardCalculate}
        removeTravelFundFn={this._removeTravelFund}
        requireRemoveFundLinkToShowRemoveButton
        showChangeTFCalculations
      />
    );
  }
}

const mapStateToProps = (state) => ({
  applyTravelFundsPageResponse: _.get(state, 'app.airChange.applyTravelFundsPage.response'),
  currentlySelectedTab: _.get(state, 'app.airChange.applyTravelFundsPage.currentlySelectedTab') || 'travel-funds',
  fundsAppliedToken: _.get(state, 'app.airChange.fundsAppliedToken', null),
  itineraryPricingToken: _.get(
    state,
    'app.airChange.changePricingPage.response._links.calculateFunds.body.itineraryPricingToken'
  ),
  isUpgrade: _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  balanceRemaining: _.get(state, 'app.airChange.applyTravelFundsPage.response.balanceRemaining', null),
  changePricingPageLink: AirChangeApplyTravelFundsPageSelectors.getChangePricingPageLink(state),
  selectedProducts: getSelectedProducts(state)
});

const mapDispatchToProps = {
  calculateFundsFn: ApplyTravelFundsActions.calculateFunds,
  removeFundFn: ApplyTravelFundsActions.removeFund,
  refreshFundsFn: ApplyTravelFundsActions.refreshFunds,
  resetCalculateFlowDataFn: ApplyTravelFundsActions.resetCalculateFlowData,
  updateSelectedApplyTabFn: updateSelectedApplyTab,
  clearAllApplyFormsFn: clearAllApplyForms,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  saveLastSearchedFundFn: saveLastSearchedFund,
  goToAirChangePricingReviewFn: AirUpgradeActions.goToAirChangePricingReview,
  goToPricingFn: goToPricing
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeApplyTravelFundsPage);
