// @flow

import React from 'react';

import Currency from 'src/shared/components/currency';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  message: string,
  currency: CurrencyType
};

const TitleAndPrice = (props: Props) => {
  const { message, currency } = props;

  return (
    <div className="title-and-price flex bgwhite py5 px5 bdb larger">
      <span className="flex7 gray4 inline-block">{message}</span>
      <div className="flex5 align-right bold normal">
        <Currency {...currency} />
      </div>
    </div>
  );
};

export default TitleAndPrice;
