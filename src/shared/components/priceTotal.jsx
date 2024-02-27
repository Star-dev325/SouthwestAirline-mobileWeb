// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React, { Fragment } from 'react';
import PriceDetails from 'src/airBooking/components/priceDetails';
import Currency from 'src/shared/components/currency';
import PriceLedgerLine from 'src/shared/components/priceLedgerLine';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';
import type {
  CurrencyType,
  Fee,
  MoneyTotalType,
  PassengerFare,
  TotalsType,
  TotalPerPassenger
} from 'src/shared/flow-typed/shared.types';
import type { TotalPointsAppliedType } from 'src/airBooking/flow-typed/applyRapidRewards.types';

const { TRAVEL_FUNDS_APPLIED, TOTAL_DUE_NOW } = TravelFundsConstants;

export type PriceTotalPropsType = {
  earlyBirdEligibility?: ?EarlyBirdEligibility,
  isReprice?: boolean,
  shouldHidePriceBreakdown?: boolean,
  showEarlyBirdInFareBreakdown?: boolean,
  showOnlyPointsTotal?: boolean,
  showPoints?: boolean,
  taxesAndFees?: Array<Fee>,
  totalAppliedTravelFunds?: ?CurrencyType,
  totalPointsApplied?: ?TotalPointsAppliedType,
  totals: TotalsType,
  travelFundsBalanceRemaining?: CurrencyType,
  updatedPriceTotal?: ?TotalsType
};

type States = {
  showPriceBreakdown: boolean
};

class PriceTotal extends React.Component<PriceTotalPropsType, States> {
  static defaultProps = {
    shouldHidePriceBreakdown: false,
    showEarlyBirdInFareBreakdown: true
  };

  constructor(props: PriceTotalPropsType) {
    super(props);
    this.state = { showPriceBreakdown: false };
  }

  _togglePriceBreakdown() {
    this.setState({ showPriceBreakdown: !this.state.showPriceBreakdown });
  }

  _renderPriceDetails() {
    const priceDetailDivs = [];
    const {
      earlyBirdEligibility,
      showEarlyBirdInFareBreakdown,
      taxesAndFees,
      totals: { adultFare, infantFare, moneyTotal, totalPerPassenger },
      updatedPriceTotal
    } = this.props;

    adultFare &&
      priceDetailDivs.push(
        this._getDetailsDiv(
          adultFare,
          'passengerDetails',
          'Passenger',
          'Lap Child',
          updatedPriceTotal?.moneyTotal ?? moneyTotal,
          showEarlyBirdInFareBreakdown,
          infantFare,
          earlyBirdEligibility,
          taxesAndFees,
          updatedPriceTotal?.totalPerPassenger ?? totalPerPassenger
        )
      );

    return priceDetailDivs;
  }

  _getDetailsDiv(
    passengerFare: PassengerFare,
    key: string,
    passengerType: string,
    lapChildPassengerType: string,
    moneyTotal: MoneyTotalType,
    showEarlyBirdInFareBreakdown?: boolean,
    infantFare?: ?PassengerFare,
    earlyBirdEligibility?: ?EarlyBirdEligibility,
    taxesAndFees?: Array<Fee>,
    totalPerPassenger?: ?TotalPerPassenger
  ) {
    return (
      <PriceDetails
        adultFare={passengerFare}
        adultPassengerType={passengerType}
        earlyBirdEligibility={earlyBirdEligibility}
        infantFare={infantFare}
        key={key}
        lapChildPassengerType={lapChildPassengerType}
        moneyTotal={moneyTotal}
        showEarlyBirdInFareBreakdown={showEarlyBirdInFareBreakdown}
        taxesAndFees={taxesAndFees}
        totalPerPassenger={totalPerPassenger}
      />
    );
  }

  _renderPriceBreakdown() {
    return <div className="price-total--price-break-down">{this._renderPriceDetails()}</div>;
  }

  _getDollarTitle(isReprice: ?boolean, pointsTotal: ?CurrencyType) {
    if (!_.isEmpty(pointsTotal)) {
      return i18n('SHARED__PRICE_LINE_TITLES__DOLLAR_TOTAL');
    }

    return isReprice
      ? i18n('SHARED__PRICE_LINE_TITLES__NEW_TOTAL')
      : i18n('SHARED__PRICE_LINE_TITLES__TOTAL_PASSENGER');
  }

  _renderDollarPriceTotalHeader() {
    const { isReprice, showOnlyPointsTotal = false, totals, updatedPriceTotal } = this.props;
    const dollarTitle = this._getDollarTitle(isReprice, totals.pointsTotal);

    return (
      !showOnlyPointsTotal && (
        <PriceTotalLine type="total" title={dollarTitle} total={updatedPriceTotal?.moneyTotal ?? totals?.moneyTotal} />
      )
    );
  }

  _renderPointPriceTotalHeader() {
    const {
      isReprice,
      showPoints,
      totals: { pointsTotal }
    } = this.props;
    const pointsTitle = isReprice
      ? i18n('SHARED__PRICE_LINE_TITLES__NEW_POINTS_TOTAL')
      : i18n('SHARED__PRICE_LINE_TITLES__POINTS_TOTAL');

    return (
      pointsTotal && (
        <PriceTotalLine type="total" title={pointsTitle} total={pointsTotal} className="mb4" showPts={showPoints} />
      )
    );
  }

  render() {
    const { showPriceBreakdown } = this.state;
    const {
      isReprice,
      shouldHidePriceBreakdown,
      totalPointsApplied,
      totalAppliedTravelFunds,
      travelFundsBalanceRemaining
    } = this.props;

    const { moneyApplied, pointsApplied } = totalPointsApplied || {};

    return (
      <div className="price-total">
        <div className="price-total--info">
          {this._renderPointPriceTotalHeader()}
          {this._renderDollarPriceTotalHeader()}
          <div className={cx('table fullwidth', { mt3: !isReprice })}>
            <div className="price-total--info-col">
              <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
            </div>
            {!shouldHidePriceBreakdown && (
              <div
                className="price-total--info-col"
                data-qa="toggleBreakdown"
                onClick={() => this._togglePriceBreakdown()}
              >
                <p>
                  {showPriceBreakdown
                    ? i18n('SHARED__BREAKDOWN_TOGGLES__HIDE_FARE_BREAKDOWN')
                    : i18n('SHARED__BREAKDOWN_TOGGLES__SHOW_FARE_BREAKDOWN')}
                </p>
              </div>
            )}
          </div>
          {(totalAppliedTravelFunds || totalPointsApplied) && travelFundsBalanceRemaining && (
            <div className="flex flex-column my4">
              {totalAppliedTravelFunds && (
                <PriceLedgerLine title={TRAVEL_FUNDS_APPLIED} currencyAmount={totalAppliedTravelFunds} />
              )}
              {totalPointsApplied && pointsApplied && moneyApplied && (
                <Fragment>
                  <PriceLedgerLine
                    title={i18n('SPLIT_PAY_PAGE__POINTS_APPLIED')}
                    currencyAmount={pointsApplied}
                    showPts={true}
                  />
                  <Currency className="price-total--points-dollars" prefix={'(-'} {...moneyApplied} suffix={')'} />
                </Fragment>
              )}
              <PriceLedgerLine title={TOTAL_DUE_NOW} currencyAmount={travelFundsBalanceRemaining} />
            </div>
          )}
        </div>
        {showPriceBreakdown && this._renderPriceBreakdown()}
      </div>
    );
  }
}

export default PriceTotal;
