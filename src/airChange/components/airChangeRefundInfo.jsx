// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import RefundInfoPerType from 'src/shared/components/refundInfoPerType';
import RefundMethod from 'src/shared/components/refundMethod';
import { get } from 'src/shared/helpers/jsUtils';

import type { PricingChangeFareItem } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  nonRefundable: ?PricingChangeFareItem,
  refundable: ?PricingChangeFareItem,
  amountDue: ?PricingChangeFareItem,
  purchaseWithPoints: ?boolean
};

const AirChangeRefundInfo = (props: Props) => {
  const { nonRefundable, refundable, amountDue, purchaseWithPoints } = props;
  const amountDueFare = get(amountDue, 'fare');
  const amountDueItem = get(amountDue, 'item');
  const amountDueTax = get(amountDue, 'tax');
  const needAdditionalPay = Number.parseFloat(get(amountDueFare, 'amount')) > 0;
  const refundableFare = get(refundable, 'fare');
  const refundableItem = get(refundable, 'item');
  const refundableTax = get(refundable, 'tax');
  const isSplitPayment =
    purchaseWithPoints === false &&
    refundable?.fare?.currencyCode === 'PTS' &&
    parseFloat((refundableFare?.amount).replace(/,/g, '')) > 0;

  return (
    <div>
      {amountDueFare && (
        <div className={cx({ 'refund-info-for-points': purchaseWithPoints }, 'bgwhite', 'mb6')}>
          <RefundInfoPerType
            amount={amountDueFare}
            taxAmount={needAdditionalPay ? amountDueTax : null}
            label={amountDueItem}
            needAdditionalPay={needAdditionalPay}
          />
        </div>
      )}
      {refundableFare && (
        <div className={cx({ 'refund-info-for-points': purchaseWithPoints }, 'bgwhite', 'mb6', 'bdb')}>
          <RefundInfoPerType amount={refundableFare} label={refundableItem} hideRefundMessage={!!amountDueFare} />
          {!purchaseWithPoints && !isSplitPayment && (
            <div className="bdt">
              <RefundMethod />
            </div>
          )}
        </div>
      )}
      {(isSplitPayment || purchaseWithPoints) && refundableTax && (
        <div className={'refund-info-for-points bgwhite mb6 bdb'}>
          <RefundInfoPerType
            amount={refundableTax}
            label={refundableItem}
            hideRefundMessage={!!amountDueFare || !!refundableFare}
          />
          <div className="bdt">
            <RefundMethod />
          </div>
        </div>
      )}
      {nonRefundable && (
        <div className="bgwhite mb6" data-qa="travel-funds-refund-info">
          <RefundInfoPerType
            amount={purchaseWithPoints ? get(nonRefundable, 'tax') : get(nonRefundable, 'fare')}
            label={nonRefundable.item}
            hideRefundMessage={!!amountDueFare || !!refundable}
          />
          <div className="p5 bdt">
            <div className="xlarge">{i18n('SHARED__REFUND_METHOD__MESSAGE')}</div>
            <span className="large gray4">{i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')}</span>
          </div>
        </div>
      )}
      {amountDueTax && !needAdditionalPay && (
        <div className={cx({ 'refund-info-for-points': purchaseWithPoints }, 'bgwhite')}>
          <RefundInfoPerType amount={amountDueTax} label={amountDueItem} needAdditionalPay hideRefundMessage />
        </div>
      )}
    </div>
  );
};

export default AirChangeRefundInfo;
