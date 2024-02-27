// @flow

import React from 'react';

import Currency from 'src/shared/components/currency';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  currencyAmount: CurrencyType,
  negative?: boolean,
  title: string,
  showPts?: boolean
};

const PriceLedgerLine = (props: Props) => {
  const { currencyAmount, negative, title, showPts } = props;

  return (
    <div className="flex flex-main-between mt3">
      <div className="flex-item-center large">
        <p>{title}</p>
      </div>
      <div className="flex-item-center bold xxlarge">
        <Currency prefix={negative ? '-' : ''} {...currencyAmount} showPts={showPts} />
      </div>
    </div>
  );
};

export default PriceLedgerLine;
