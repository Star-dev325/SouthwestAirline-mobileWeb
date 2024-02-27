// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import { transformToChangeTravelFundSummary } from 'src/travelFunds/transformers/travelFundsTransformer';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import FundTypeSelector from 'src/travelFunds/components/fundTypeSelector';
import LookUpFundsForm from 'src/travelFunds/components/lookUpFundsForm';
import FundResultsList from 'src/shared/components/fundResultsList';
import PriceTotal from 'src/shared/components/priceTotal';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';
import RefundSummary from 'src/shared/components/refundSummary';
import { sitePaths } from 'src/shared/constants/siteLinks';

import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import type { TotalsType, CurrencyType } from 'src/shared/flow-typed/shared.types';
import type {
  LookUpRTFFundType,
  LookUpVoucherFundType,
  LookUpCardFundType,
  TravelFundsOptionsType,
  ApplyTravelFundsPageResponse
} from 'src/travelFunds/flow-typed/travelFunds.types';
import PriceLedgerLine from 'src/shared/components/priceLedgerLine';

const {
  APPLY_TRAVEL_FUNDS,
  FUND_TYPES,
  FUND_TYPES_FORMATTED,
  TRAVEL_FUNDS_FORM_FIELDS,
  LUV_VOUCHER_FORM_FIELDS,
  APPLY_FUNDS,
  APPLY_VOUCHER,
  APPLY_GIFT_CARD,
  GIFT_CARD_FORM_FIELDS,
  APPLY_TRAVEL_FUNDS_FORM_ID,
  APPLY_LUV_VOUCHER_FORM_ID,
  APPLY_GIFT_CARD_FORM_ID,
  LUV_VOUCHER_SPEND_NOTE,
  TRAVEL_FUNDS_APPLIED,
  TOTAL_DUE_NOW
} = TravelFundsConstants;

type Props = {
  priceTotal: { totals: ?TotalsType },
  applyTravelFundsPageResponse: ?ApplyTravelFundsPageResponse,
  currentlySelectedTab: TravelFundsOptionsType,
  travelFundsBalanceRemaining: CurrencyType,
  applyFundsToPurchaseFn: () => void,
  onClickCancelButtonFn: () => void,
  onSelectionChangeFn: (selection: TravelFundsOptionsType) => void,
  onSubmitRTFCalculateFn: (formData: LookUpRTFFundType) => void,
  onSubmitVoucherCalculateFn: (formData: LookUpVoucherFundType) => void,
  onSubmitCardCalculateFn: (formData: LookUpCardFundType) => void,
  removeTravelFundFn: (string) => void,
  requireRemoveFundLinkToShowRemoveButton?: boolean,
  showChangeTFCalculations?: boolean
};

export class ApplyFundsFormWithLedger extends Component<Props> {
  render() {
    const {
      priceTotal,
      applyTravelFundsPageResponse,
      currentlySelectedTab,
      travelFundsBalanceRemaining,
      applyFundsToPurchaseFn,
      onClickCancelButtonFn,
      onSelectionChangeFn,
      onSubmitRTFCalculateFn,
      onSubmitVoucherCalculateFn,
      onSubmitCardCalculateFn,
      removeTravelFundFn,
      requireRemoveFundLinkToShowRemoveButton,
      showChangeTFCalculations
    } = this.props;

    const rightButton = [
      {
        name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        onClick: onClickCancelButtonFn
      }
    ];

    const changeTFRFSummary = transformToChangeTravelFundSummary(priceTotal);
    const fundTotal = applyTravelFundsPageResponse?.totals ?? priceTotal?.totals;
    const giftCardSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[2];
    const luvVoucherSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[1];
    const totalAppliedTravelFunds = _.get(applyTravelFundsPageResponse, 'totalFunds');
    const totalPointsApplied = applyTravelFundsPageResponse?.totalPointsApplied;
    const travelFunds = _.get(applyTravelFundsPageResponse, 'travelFunds', []);
    const travelFundsSelected = currentlySelectedTab === FUND_TYPES_FORMATTED[0];
    const travelFundsTermsAndConditions = applyTravelFundsPageResponse?.termsAndConditions;

    return (
      <div>
        <PageHeaderWithButtons title={APPLY_TRAVEL_FUNDS} rightButtons={rightButton} />
        <div className="apply-travel-funds">
          <div className="apply-travel-funds--selector">
            <FundTypeSelector
              selectedFund={currentlySelectedTab}
              onClickSelector={onSelectionChangeFn}
              fundTypes={FUND_TYPES}
            />
          </div>
          <div className="apply-travel-funds--forms">
            {travelFundsSelected && (
              <LookUpFundsForm
                formId={APPLY_TRAVEL_FUNDS_FORM_ID}
                formFields={TRAVEL_FUNDS_FORM_FIELDS}
                buttonText={APPLY_FUNDS}
                onSubmit={onSubmitRTFCalculateFn}
              />
            )}
            {luvVoucherSelected && (
              <LookUpFundsForm
                formId={APPLY_LUV_VOUCHER_FORM_ID}
                formFields={LUV_VOUCHER_FORM_FIELDS}
                buttonText={APPLY_VOUCHER}
                onSubmit={onSubmitVoucherCalculateFn}
                specialNote={LUV_VOUCHER_SPEND_NOTE}
              />
            )}
            {giftCardSelected && (
              <LookUpFundsForm
                formId={APPLY_GIFT_CARD_FORM_ID}
                formFields={GIFT_CARD_FORM_FIELDS}
                buttonText={APPLY_GIFT_CARD}
                onSubmit={onSubmitCardCalculateFn}
              />
            )}
          </div>
          <p
            className="apply-travel-funds--disclaimer"
            dangerouslySetInnerHTML={{
              __html: travelFundsTermsAndConditions || i18n('TRAVEL_FUNDS_DISCLAIMER')
            }}
          />
          <a className="learn-more-link" target="_blank" href={sitePaths.fundsTermsAndConditions}>
            Learn more
          </a>
          {!_.isEmpty(travelFunds) && (
            <div className="apply-travel-funds--results">
              <FundResultsList
                listTitle={i18n('SHARED__FUND_RESULT__ELIGIBLE_FUNDS')}
                retrievedFunds={travelFunds}
                removeFundFn={removeTravelFundFn}
                requireRemoveFundLinkToShowRemoveButton={requireRemoveFundLinkToShowRemoveButton}
              />
            </div>
          )}
          {(totalPointsApplied || totalAppliedTravelFunds) && fundTotal && (
            <div className="purchase-content--summary-footer apply-travel-funds--footer">
              {showChangeTFCalculations && (
                <div className="change-travel-funds--totals">
                  <RefundSummary
                    nonRefundable={null}
                    newAmountDue={changeTFRFSummary.owe}
                    refundable={changeTFRFSummary.refund}
                  />
                  <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
                  {travelFundsBalanceRemaining && (
                    <div className="change-travel-funds--price-ledger-lines">
                      <PriceLedgerLine title={TRAVEL_FUNDS_APPLIED} currencyAmount={totalAppliedTravelFunds} negative />
                      <PriceLedgerLine title={TOTAL_DUE_NOW} currencyAmount={travelFundsBalanceRemaining} />
                    </div>
                  )}
                </div>
              )}
              {!showChangeTFCalculations && (
                <PriceTotal
                  totals={fundTotal}
                  totalPointsApplied={totalPointsApplied}
                  totalAppliedTravelFunds={totalAppliedTravelFunds}
                  travelFundsBalanceRemaining={travelFundsBalanceRemaining}
                  shouldHidePriceBreakdown
                />
              )}
              <div className="purchase-content--summary-footer-nav">
                <Button
                  type="button"
                  onClick={applyFundsToPurchaseFn}
                  className="purchase apply-continue-button"
                  ref="continueButton"
                  color="yellow"
                  size="larger"
                  fluid
                >
                  {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ApplyFundsFormWithLedger;
