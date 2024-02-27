// @flow

import React from 'react';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import i18n from '@swa-ui/locale';

type Props = {
  transferredAmount: CurrencyType
};
const TransferFundsTotal = ({ transferredAmount }: Props) => (
  <div className="transfer-funds-total">
    <div className="transfer-funds-total--amount">
      <PriceTotalLine type="total" title={i18n('TOTAL_TRANSFERRED_LABEL')} total={transferredAmount} />
    </div>
  </div>
);

export default TransferFundsTotal;
