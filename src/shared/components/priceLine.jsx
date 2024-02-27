// @flow

import React from 'react';
import cx from 'classnames';
import Currency from 'src/shared/components/currency';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  title: string,
  total: ?CurrencyType,
  sign?: string
};

const PriceLine = ({ total, sign, title }: Props) => {
  const isDiscount = sign === '-';

  return (
    <div
      className={cx('price-line', {
        negative: isDiscount
      })}
    >
      <span>{(sign ? `${sign} ` : '') + title}</span>

      <div className={cx('price-line--currency_normal', { red: isDiscount })}>
        <Currency {...total} />
      </div>
    </div>
  );
};

export default PriceLine;
