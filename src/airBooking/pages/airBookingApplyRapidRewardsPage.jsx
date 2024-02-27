// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import ApplyRapidRewardsForm from 'src/airBooking/components/applyRapidRewardsForm';
import { transformToCalculateSplitPayCalcFundsRequest } from 'src/airBooking/transformers/applyRapidRewardsTransformer';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import Button from 'src/shared/components/button';
import FundResultsList from 'src/shared/components/fundResultsList';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PriceTotal from 'src/shared/components/priceTotal';
import Segment from 'src/shared/components/segment';
import { DESTRUCTIVE } from 'src/shared/constants/buttonPopupStyleTypes';
import { AIR_BOOKING_APPLY_RAPID_REWARDS_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import { transformToRemoveFundsRequest } from 'src/travelFunds/transformers/travelFundsTransformer';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type {
  ApplySplitPayPageCalcFundsResponse,
  SplitPayCalcFundsRequestType,
  SplitPayMessageType,
  SplitPayOptionsListRequestType,
  SplitPayPageResponseType,
  SplitPayPageSuccessType,
  TotalPointsAppliedType,
  UserNameInfo
} from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type { RemoveFundRequestType } from 'src/airBooking/flow-typed/calcFunds.types';
import type { PassengerInfos } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { SPLIT_PAYMENT } = TravelFundsConstants;

type Props = {
  accountRedeemablePoints: number,
  applySplitPayPageCalcFundsResponse: ?ApplySplitPayPageCalcFundsResponse,
  calculateFundsFn: (SplitPayCalcFundsRequestType, ?string, ?boolean) => void,
  clearFormDataByIdFn: (string) => {},
  goBack: () => void,
  hideDialogFn: () => Promise<*>,
  isLoggedIn: boolean,
  isWebView: boolean,
  itineraryPricingToken: string,
  loadSplitPayPagePlacementsFn: (*) => void,
  onSubmitApplyRapidRewardPoints: (formData: *) => void,
  passengerInfos: PassengerInfos,
  radioOptionSelected?: string,
  removeFundFn: (RemoveFundRequestType, ?string, ?boolean) => void,
  resetCalculateFlowDataFn: () => void,
  resetSplitPayTermsAndConditionsFn: () => void,
  showDialogFn: (*) => Promise<*>,
  splitPayMessage?: SplitPayMessageType,
  splitPayOptionsSecureRequestObj: SplitPayOptionsListRequestType,
  splitPayPage: SplitPayPageSuccessType,
  splitPayPagePlacements: { paymentBanner: DynamicPlacementResponse },
  splitPayPageResponse: SplitPayPageResponseType,
  termsAndConditions: ?string,
  totalPointsApplied?: ?TotalPointsAppliedType,
  userNameInfo: UserNameInfo
};

export const AirBookingApplyRapidRewardsPage = ({
  accountRedeemablePoints,
  applySplitPayPageCalcFundsResponse,
  calculateFundsFn,
  clearFormDataByIdFn,
  goBack,
  hideDialogFn,
  isLoggedIn,
  isWebView,
  itineraryPricingToken,
  loadSplitPayPagePlacementsFn,
  passengerInfos,
  radioOptionSelected,
  removeFundFn,
  resetCalculateFlowDataFn,
  resetSplitPayTermsAndConditionsFn,
  showDialogFn,
  splitPayMessage,
  splitPayPage,
  splitPayPagePlacements,
  splitPayPageResponse,
  termsAndConditions,
  userNameInfo
}: Props) => {
  const { _links, splitPayOptions } = splitPayPage || {};
  const { balanceRemaining } = splitPayPageResponse || {};
  const { fundsAppliedToken, selectedSplitPay, totalFunds, totalPointsApplied, travelFunds } = applySplitPayPageCalcFundsResponse || {};
  const { paymentBanner } = splitPayPagePlacements || {};
  const applyRapidRewardsUrl = getNormalizedRoute({ routeName: 'applyRapidRewards' });
  const DEFAULT_REDIRECT_PATH = '/air/booking';
  const splitPayOptionsExists = splitPayOptions && splitPayOptions.length > 0;
  const totals = applySplitPayPageCalcFundsResponse?.totals ?? splitPayPageResponse?.totals;

  const priceTotalProps = {
    shouldHidePriceBreakdown: true,
    totalAppliedTravelFunds: applySplitPayPageCalcFundsResponse?.totalFunds ?? totalFunds,
    totalPointsApplied,
    totals: totals,
    travelFundsBalanceRemaining: applySplitPayPageCalcFundsResponse?.balanceRemaining ?? balanceRemaining
  };

  useEffect(() => {
    loadSplitPayPagePlacementsFn();
  }, []);

  const onSubmitApplyRapidRewardPoints = (formData) => {
    const splitPayCalcFundsRequest = transformToCalculateSplitPayCalcFundsRequest(
      formData,
      fundsAppliedToken,
      itineraryPricingToken,
      passengerInfos,
      userNameInfo
    );

    calculateFundsFn(splitPayCalcFundsRequest, DEFAULT_REDIRECT_PATH, isLoggedIn);
    raiseSatelliteEvent('squid', { page_description: 'button:cash plus points apply points' });
  };

  const getSplitPayFundId = () => {
    const splitPayFund = travelFunds && travelFunds.filter((fund) => fund.travelFundType === SPLIT_PAYMENT);

    return (splitPayFund && splitPayFund[0]?._links?.removeTravelFund?.body?.removalTravelFundId) ?? '0';
  };

  const removeSplitPayFund = async (fundId: string) => {
    const removeSPFundRequest = transformToRemoveFundsRequest(
      fundId,
      passengerInfos,
      fundsAppliedToken,
      itineraryPricingToken,
      true
    );
    const splitPayFundId = getSplitPayFundId();

    if (fundId === splitPayFundId) {
      clearFormDataByIdFn(AIR_BOOKING_APPLY_RAPID_REWARDS_FORM);
    }

    travelFunds &&
      travelFunds.length > 1 &&
      (await removeFundFn(removeSPFundRequest, applyRapidRewardsUrl, isLoggedIn));

    if (travelFunds && travelFunds.length === 1) {
      resetCalculateFlowDataFn();
      resetSplitPayTermsAndConditionsFn();
    }
  };

  const splitPayCancel = async (fundRemovalId) => {
    await removeSplitPayFund(fundRemovalId);
    goBack();
  };

  const onClickCancelButton = () => {
    if (totalPointsApplied) {
      const fundRemovalId = getSplitPayFundId();

      showDialogFn({
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: hideDialogFn
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn();
              splitPayCancel(fundRemovalId);
            },
            style: DESTRUCTIVE
          }
        ],
        message: i18n('SPLIT_PAY_PAGE__CANCEL_DIALOG_MESSAGE'),
        name: 'SPLIT_PAY_PAGE__CANCEL_DIALOG',
        title: i18n('SPLIT_PAY_PAGE__CANCEL_DIALOG_TITLE')
      });
    } else {
      goBack();
    }
  };

  const rightButton = [
    {
      name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
      onClick: onClickCancelButton
    }
  ];

  return (
    <div className="apply-rapid-rewards-page">
      {<PageHeaderWithButtons rightButtons={rightButton} title={i18n('SPLIT_PAY_PAGE__TITLE')} />}
      {splitPayOptionsExists && (
        <>
          {paymentBanner && (
            <DynamicPlacement
              {...paymentBanner}
              additionalTemplateData={accountRedeemablePoints}
              data-qa="paymentBanner"
              isWebView={isWebView}
            />
          )}
          <ApplyRapidRewardsForm
            formId={AIR_BOOKING_APPLY_RAPID_REWARDS_FORM}
            links={_links}
            onSubmit={onSubmitApplyRapidRewardPoints}
            radioOptionSelected={radioOptionSelected}
            selectedSplitPay={selectedSplitPay}
            splitPayRadioOptions={splitPayOptions}
            termsAndConditions={termsAndConditions}
            totalPointsApplied={totalPointsApplied}
          />
        </>
      )}
      {!splitPayOptionsExists && splitPayMessage && (
        <div className="split-pay-message" dangerouslySetInnerHTML={{ __html: splitPayMessage.body }} />
      )}
      {travelFunds && (
        <div className="apply-travel-funds--results">
          <FundResultsList
            listTitle={i18n('SHARED__FUND_RESULT__ELIGIBLE_FUNDS')}
            removeFundFn={removeSplitPayFund}
            retrievedFunds={travelFunds}
          />
        </div>
      )}
      {(totalPointsApplied || travelFunds) && totals && (
        <Segment className="purchase-content--summary-footer">
          <PriceTotal {...priceTotalProps} />
          <div className="purchase-content--summary-footer-nav">
            <Button className="apply-continue-button purchase" fluid onClick={goBack} size="larger" type="button">
              {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
            </Button>
          </div>
        </Segment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountRedeemablePoints: state?.app?.account?.accountInfo?.rapidRewardsDetails?.redeemablePoints,
  applySplitPayPageCalcFundsResponse: state?.app?.airBooking?.applyTravelFundsPage?.response,
  itineraryPricingToken:
    state?.app?.airBooking?.splitPay?.splitPayPage?._links?.calculateFunds?.body?.itineraryPricingToken ||
    state?.app?.airBooking?.flightPricingPage?.response?.flightPricingPage?._links?.calculateFunds?.body
      ?.itineraryPricingToken,
  passengerInfos: state?.app?.airBooking?.passengerInfos,
  radioOptionSelected: state?.app?.formData?.AIR_BOOKING_APPLY_RAPID_REWARDS_FORM?.data?.selectedRadioOption,
  splitPayMessage: state?.app?.airBooking?.splitPay?.splitPayMessage,
  splitPayPage: state?.app?.airBooking?.splitPay?.splitPayPage,
  splitPayPagePlacements: state?.app?.airBooking?.splitPayPagePlacements,
  splitPayPageResponse: state?.app?.airBooking?.splitPay,
  termsAndConditions: state?.app?.airBooking?.splitPayTermsAndConditions,
  userNameInfo: state?.app?.account?.accountInfo?.customerInfo?.name
});

const mapDispatchToProps = {
  calculateFundsFn: ApplyTravelFundsActions.calculateFunds,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  hideDialogFn: DialogActions.hideDialog,
  loadSplitPayPagePlacementsFn: AirBookingActions.loadSplitPayPagePlacements,
  removeFundFn: ApplyTravelFundsActions.removeFund,
  resetCalculateFlowDataFn: ApplyTravelFundsActions.resetCalculateFlowData,
  resetSplitPayTermsAndConditionsFn: AirBookingActions.resetSplitPayTermsAndConditions,
  showDialogFn: DialogActions.showDialog
};

const enhancers = _.flowRight(
  withBodyClass('air-booking-apply-rapid-rewards-page'),
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirBookingApplyRapidRewardsPage);
