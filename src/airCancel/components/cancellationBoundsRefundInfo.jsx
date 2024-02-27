// @flow

import React from 'react';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import PriceTotalLine from 'src/shared/components/priceTotalLine';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  priceTotals: Array<CurrencyType>
};

const CancellationBoundsRefundInfo = (props: Props) => {
  const { priceTotals } = props;
  const total = _.get(priceTotals, '1') || _.get(priceTotals, '0');
  const pointsTotal = priceTotals.length > 1 ? _.get(priceTotals, '0') : null;

  return (
    <div className="cancel-refund-quote">
      <PriceTotalLine
        className="trip-totals--new-trip-total cancel-refund-quote--trip-totals"
        type="total"
        showPts
        title={i18n('SHARED__REFUND_METHOD__REFUND_INFO_TRIP_TOTAL')}
        total={total}
        pointsTotal={pointsTotal}
      />
    </div>
  );
};

export default CancellationBoundsRefundInfo;
