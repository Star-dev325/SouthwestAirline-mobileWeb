// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import i18n from '@swa-ui/locale';

import type { TotalsType } from 'src/shared/flow-typed/shared.types';
import type { FareSummary, ChangeType } from 'src/airChange/flow-typed/airChange.types';

export type AirChangePriceTotalPropsType = {
  totals: TotalsType,
  change: ChangeType,
  fareSummary?: FareSummary,
  isPointsChange?: boolean,
  shouldHidePriceBreakdown?: boolean
};

class AirChangePriceTotal extends React.Component<AirChangePriceTotalPropsType> {
  _renderChangePointsHeader(fareSummary: FareSummary, change: ChangeType) {
    const { newAmountDue, totalRefundability } = fareSummary;
    const { evenExchange } = change;
    const zeroPointAmount = { amount: '0', currencyCode: 'PTS' };
    const pointsEvenExchangeWithoutTaxUpgrade = evenExchange && !_.get(newAmountDue, 'tax');
    const showGreenBackground = pointsEvenExchangeWithoutTaxUpgrade || (totalRefundability && !newAmountDue);

    return (
      <div>
        {evenExchange && (
          <div className="air-change-price-total--fare-summary bggreen">
            <PriceTotalLine type="total" title={_.get(newAmountDue, 'item')} pointsTotal={zeroPointAmount} showPts />
          </div>
        )}
        {evenExchange && _.get(newAmountDue, 'tax') && (
          <div className="air-change-price-total--fare-summary">
            <PriceTotalLine type="total" title={_.get(newAmountDue, 'item')} total={_.get(newAmountDue, 'tax')} />
          </div>
        )}
        {totalRefundability && (
          <div className="air-change-price-total--fare-summary bggreen">
            <PriceTotalLine
              type="total"
              title={_.get(totalRefundability, 'item')}
              pointsTotal={_.get(totalRefundability, 'fare')}
              total={_.get(totalRefundability, 'tax')}
              showPts
            />
          </div>
        )}
        {!evenExchange && newAmountDue && (
          <div className="air-change-price-total--fare-summary">
            <PriceTotalLine
              type="total"
              title={_.get(newAmountDue, 'item')}
              pointsTotal={_.get(newAmountDue, 'fare')}
              total={_.get(newAmountDue, 'tax')}
              showPts
            />
          </div>
        )}
        <div className={cx('air-change-price-total--fare-summary-note', { bggreen: showGreenBackground })}>
          <div className="price-total--info-col">
            <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
          </div>
        </div>
      </div>
    );
  }

  _renderChangeMoneyHeader(fareSummary: FareSummary, change: ChangeType) {
    const { evenExchange, upGrade, downGrade } = change;
    const { newAmountDue, totalRefundability } = fareSummary;
    const showGreenBackground = (evenExchange || downGrade) && !_.isEmpty(fareSummary);

    return (
      <div>
        {(upGrade || evenExchange) && newAmountDue && (
          <div className={cx('air-change-price-total--fare-summary', { bggreen: showGreenBackground })}>
            <PriceTotalLine type="total" title={_.get(newAmountDue, 'item')} total={_.get(newAmountDue, 'fare')} />
          </div>
        )}
        {downGrade && totalRefundability && (
          <div className={cx('air-change-price-total--fare-summary', { bggreen: showGreenBackground })}>
            <PriceTotalLine
              pointsTotal={_.get(totalRefundability, 'fare')}
              showPts
              title={_.get(totalRefundability, 'item')}
              total={_.get(totalRefundability, 'tax')}
              type="total"
            />
          </div>
        )}
        <div className={cx('air-change-price-total--fare-summary-note', { bggreen: showGreenBackground })}>
          <div className="price-total--info-col">
            <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
          </div>
        </div>
      </div>
    );
  }

  _renderChangeHeader() {
    const {
      isPointsChange,
      fareSummary = {
        originalTripCost: null,
        newTripCost: null,
        tax: null,
        nonRefundable: null,
        refundable: null,
        newAmountDue: null,
        totalDueNow: null,
        totalRefundability: null,
        travelFunds: null,
        remainingTravelFunds: null
      },
      change = {
        evenExchange: false,
        upGrade: false,
        downGrade: false
      }
    } = this.props;

    return isPointsChange
      ? this._renderChangePointsHeader(fareSummary, change)
      : this._renderChangeMoneyHeader(fareSummary, change);
  }

  _renderPriceDifference() {
    const {
      isPointsChange,
      fareSummary = {
        originalTripCost: null,
        newTripCost: null,
        tax: null,
        nonRefundable: null,
        refundable: null,
        travelFunds: null
      }
    } = this.props;

    const { originalTripCost, newTripCost } = fareSummary;

    const originalTotal = {
      title: _.get(originalTripCost, 'item'),
      total: isPointsChange ? _.get(originalTripCost, 'tax') : _.get(originalTripCost, 'fare'),
      pointsTotal: isPointsChange ? _.get(originalTripCost, 'fare') : null
    };
    const newTotal = {
      title: _.get(newTripCost, 'item'),
      total: isPointsChange ? _.get(newTripCost, 'tax') : _.get(newTripCost, 'fare'),
      pointsTotal: isPointsChange ? _.get(newTripCost, 'fare') : null
    };

    return (
      <div className="air-change-price-total--info">
        <div className="pb5 mb5 bdb" data-qa="change-refund-summary--never-change">
          {i18n('AIR_CHANGE__REFUND_SUMMARY__NEVER_CHARGE_FEES_TIPS')}
        </div>
        <PriceTotalLine className="price-change" type="total" {...originalTotal} showPts />
        <PriceTotalLine className="price-change" type="total" {...newTotal} showPts />
      </div>
    );
  }

  _renderChangeTotal() {
    const { totals, isPointsChange } = this.props;

    return (
      <div>
        <div className="air-change-price-total--fare-summary">
          <PriceTotalLine
            type="total"
            title={i18n('SHARED__PRICE_LINE_TITLES__TOTAL_PASSENGER')}
            total={isPointsChange ? _.get(totals, 'pointsTotal') : _.get(totals, 'moneyTotal')}
            className="mb4"
          />
        </div>
        <div className="air-change-price-total--fare-summary-note">
          <div className="price-total--info-col">
            <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { fareSummary } = this.props;

    return (
      <div className="air-change-price-total">
        {!_.isEmpty(fareSummary) && this._renderPriceDifference()}
        {_.isEmpty(fareSummary) && this._renderChangeTotal()}
        {!_.isEmpty(fareSummary) && this._renderChangeHeader()}
      </div>
    );
  }
}

export default AirChangePriceTotal;
