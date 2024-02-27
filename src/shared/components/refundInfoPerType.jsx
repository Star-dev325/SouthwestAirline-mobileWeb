// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import PriceTotalLine from 'src/shared/components/priceTotalLine';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  amount: CurrencyType,
  taxAmount?: ?CurrencyType,
  label: string,
  needAdditionalPay?: boolean,
  hideRefundMessage?: boolean,
  className?: string
};

const RefundInfoPerType = ({ needAdditionalPay, label, amount, hideRefundMessage, taxAmount, className }: Props) => {
  const isPointsAmount = _.get(amount, 'currencyCode') === 'PTS';

  const priceTotal = {
    title: label,
    pointsTotal: isPointsAmount ? amount : null
  };

  isPointsAmount && taxAmount && _.merge(priceTotal, { total: taxAmount });
  !isPointsAmount && _.merge(priceTotal, { total: amount });

  return (
    <div className={cx('refund-info-per-type', 'p5', 'bgwhite', 'bdt', className)}>
      <PriceTotalLine
        className={cx({ 'refund-info-per-type--price-total-line_credit': !needAdditionalPay })}
        type="total"
        showPts
        {...priceTotal}
      />
      {!hideRefundMessage && (
        <p className="gray4 large block">
          {i18n('SHARED__REFUND_METHOD__REFUND_INFO_NEVER_CHARGE_FEES')}
          <br />
          {i18n('SHARED__REFUND_METHOD__REFUND_INFO_ONLY_PAY_DIFFERENCE')}
        </p>
      )}
    </div>
  );
};

export default RefundInfoPerType;
