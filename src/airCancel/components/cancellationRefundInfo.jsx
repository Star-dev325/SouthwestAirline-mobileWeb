// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import RefundMethod from 'src/shared/components/refundMethod';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import i18n from '@swa-ui/locale';
import RefundInfoPerType from 'src/shared/components/refundInfoPerType';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { CurrencyLabelType } from 'src/airCancel/flow-typed/airCancel.types';

type Props = {
  refundableFunds: ?CurrencyLabelType,
  nonRefundableFunds: ?CurrencyLabelType,
  pointsToCreditTotal: ?CurrencyLabelType,
  priceTotals: Array<CurrencyType>
};

const CancellationRefundInfo = (props: Props) => {
  const { refundableFunds, nonRefundableFunds, pointsToCreditTotal, priceTotals } = props;
  const total = _.get(priceTotals, '1') || _.get(priceTotals, '0');
  const pointsTotal = priceTotals.length > 1 ? _.get(priceTotals, '0') : null;

  return (
    <div className="cancel-refund-info">
      <PriceTotalLine
        className="trip-totals--new-trip-total cancel-refund-info--trip-totals"
        type="total"
        showPts
        title={i18n('SHARED__REFUND_METHOD__REFUND_INFO_TRIP_TOTAL')}
        total={total}
        pointsTotal={pointsTotal}
      />
      {!!pointsToCreditTotal && (
        <div>
          <PriceTotalLine
            className="refund-info-per-type refund-info-per-type--price-total-line_credit cancel-refund-info--points-total"
            type="total"
            showPts
            title={pointsToCreditTotal.item}
            pointsTotal={pointsTotal}
          />
        </div>
      )}

      {!!refundableFunds && (
        <div>
          <RefundInfoPerType className="bdb" label={refundableFunds.item} amount={refundableFunds} hideRefundMessage />
          <RefundMethod className={cx({ mb6: !!nonRefundableFunds })} />
        </div>
      )}

      {!!nonRefundableFunds && (
        <div>
          <RefundInfoPerType
            className="bdb"
            label={nonRefundableFunds.item}
            amount={nonRefundableFunds}
            hideRefundMessage
          />

          <div className="p5 bgwhite" data-qa="non-refundable-method">
            <div className="xlarge">{i18n('SHARED__REFUND_METHOD__MESSAGE')}</div>
            <span className="large gray4">{i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancellationRefundInfo;
