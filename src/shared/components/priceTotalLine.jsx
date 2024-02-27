// @flow
import cx from 'classnames';
import _ from 'lodash';
import pluralize from 'pluralize';
import React from 'react';
import Currency from 'src/shared/components/currency';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  className?: string,
  passengerCount?: number,
  passengerType?: ?string,
  pointsTotal?: ?CurrencyType,
  priceCurrencyClass?: string,
  priceTitleClass?: string,
  showPts?: boolean,
  showTravelFundAppliedFormat?: boolean,
  taxCreditRefund?: CurrencyType,
  title: string,
  total?: CurrencyType,
  type: string
};

const PriceTotalLine = (props: Props) => {
  const {
    className,
    passengerCount,
    passengerType,
    pointsTotal,
    priceCurrencyClass,
    priceTitleClass,
    showPts = false,
    showTravelFundAppliedFormat,
    taxCreditRefund,
    title,
    total,
    type
  } = props;
  const passengerSpan = passengerCount && passengerType && (
    <span className="price-line-sub-title">
      x {passengerCount} {pluralize(`${passengerType}`, passengerCount)}
    </span>
  );
  const toClass = () => `price-line--currency_${_.kebabCase(type)}`;
  const travelFundProps = showTravelFundAppliedFormat ? { prefix: '-' } : {};

  return (
    <div className={cx('price-line', className)}>
      <span className={cx('price-line--title', priceTitleClass)}>{title}</span>
      <div className="price-amount">
        <div className={cx(`${toClass()}`, priceCurrencyClass)}>
          {pointsTotal && <Currency {...pointsTotal} showPts={showPts} type={type} />}
          {total && <Currency {...total} {...travelFundProps} showPts={showPts} />}
          {taxCreditRefund && <Currency {...taxCreditRefund} showPts={showPts} />}
        </div>
        {passengerSpan}
      </div>
    </div>
  );
};

export default PriceTotalLine;
