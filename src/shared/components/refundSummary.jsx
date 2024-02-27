// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import RefundTotalItem from 'src/shared/components/refundTotalItem';
import RefundTypes from 'src/shared/constants/refundTypes';
import TravelFunds from 'src/airChange/components/travelFunds';
import i18n from '@swa-ui/locale';

import type { PricingChangeFareItem } from 'src/airChange/flow-typed/airChange.types';

const { HOLD_FUTURE_USE, BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  refundable: ?PricingChangeFareItem,
  nonRefundable: ?PricingChangeFareItem,
  newAmountDue?: ?PricingChangeFareItem,
  totalDueNow?: ?PricingChangeFareItem,
  travelFunds?: ?PricingChangeFareItem,
  refundMethod?: string,
  purchaseWithPoints?: boolean,
  showBriefNotes?: boolean,
  isConfirmationPage?: boolean
};

const RefundSummary = (props: Props) => {
  const {
    refundable,
    nonRefundable,
    travelFunds,
    newAmountDue,
    totalDueNow,
    refundMethod,
    purchaseWithPoints,
    showBriefNotes = false,
    isConfirmationPage = false
  } = props;

  const getBottomRightMessage = () => {
    switch (refundMethod) {
      case BACK_TO_ORIGINAL_PAYMENT:
        return isConfirmationPage
          ? i18n('SHARED__REFUND_METHOD__REFUNDED_TO_CREDIT_CARD')
          : i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
      case HOLD_FUTURE_USE:
        return isConfirmationPage
          ? i18n('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE')
          : i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
      default:
        return '';
    }
  };

  const bottomRightMessage = getBottomRightMessage();
  const refundableFare = _.get(refundable, 'fare');
  const refundableItem = _.get(refundable, 'item');
  const refundableTax = _.get(refundable, 'tax');
  const amountDueFare = _.get(newAmountDue, 'fare');
  const amountDueItem = _.get(newAmountDue, 'item');
  const amountDueTax = _.get(newAmountDue, 'tax');
  const needAdditionalMoneyPay = Number.parseFloat(_.get(amountDueFare, 'amount')) >= 0;
  const needAdditionalPay = needAdditionalMoneyPay || Number.parseFloat(_.get(amountDueTax, 'amount')) >= 0;
  const isSplitPayment =
    purchaseWithPoints === false &&
    refundableFare?.currencyCode === 'PTS' &&
    parseFloat((refundableFare?.amount).replace(/,/g, '')) > 0;

  return (
    <div>
      <div data-qa="refund-summary">
        {refundableFare && (
          <RefundTotalItem
            amount={refundableFare}
            topMessage={refundableItem}
            bottomMessageRight={!isSplitPayment && !purchaseWithPoints ? bottomRightMessage : ''}
          />
        )}

        {refundableTax && (
          <RefundTotalItem amount={refundableTax} topMessage={refundableItem} bottomMessageRight={bottomRightMessage} />
        )}

        {nonRefundable && (
          <RefundTotalItem
            topMessage={nonRefundable.item}
            amount={purchaseWithPoints ? _.get(nonRefundable, 'tax') : _.get(nonRefundable, 'fare')}
            bottomMessageRight={
              isConfirmationPage
                ? i18n('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE')
                : i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')
            }
          />
        )}

        {amountDueFare && (
          <RefundTotalItem
            topMessage={amountDueItem}
            amount={amountDueFare}
            needAdditionalPay={needAdditionalMoneyPay}
          />
        )}
        {travelFunds && newAmountDue && totalDueNow && !purchaseWithPoints && (
          <div className="refund-total-item_amount-due" data-qa="review-form--travel-funds">
            <TravelFunds travelFunds={travelFunds} totalDueNow={totalDueNow} />
          </div>
        )}

        {amountDueTax && <RefundTotalItem topMessage={amountDueItem} amount={amountDueTax} needAdditionalPay />}

        {travelFunds && newAmountDue && totalDueNow && !!purchaseWithPoints && (
          <div className="refund-total-item_amount-due" data-qa="review-form--travel-funds">
            <TravelFunds travelFunds={travelFunds} totalDueNow={totalDueNow} />
          </div>
        )}
      </div>
      {showBriefNotes && (
        <div
          className={cx('air-change-price-total--fare-summary-note price-total--info-col', {
            bggreen: !needAdditionalPay
          })}
        >
          <p>{i18n('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE')}</p>
        </div>
      )}
    </div>
  );
};

export default RefundSummary;
