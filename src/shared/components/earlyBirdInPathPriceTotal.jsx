// @flow
import React from 'react';
import util from 'util';
import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  unitPrice: CurrencyType,
  total: CurrencyType,
  purchasedCount: number,
  description: string
};

const EarlyBirdInPathPriceTotal = (props: Props) => {
  const { unitPrice, total, purchasedCount, description } = props;

  return (
    <div className="early-bird-in-path--price-total">
      <div className="large gray5">{description}</div>
      <div className="align-right">
        <Currency {...unitPrice} />
        <div className="medium gray5">
          &times; {util.format(i18n('SHARED__EARLY_BIRD__CHECK_IN_WAY_TRIPS'), purchasedCount)}
        </div>
        <Currency {...total} />
      </div>
    </div>
  );
};

export default EarlyBirdInPathPriceTotal;
