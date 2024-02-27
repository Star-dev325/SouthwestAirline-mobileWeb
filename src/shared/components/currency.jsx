// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import i18n from '@swa-ui/locale';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = CurrencyType & {
  strikeThrough?: boolean,
  ceil?: boolean,
  className?: string,
  showPts?: boolean,
  prefix?: string,
  sign?: ?string,
  suffix?: string
};

const Currency = (props: Props) => {
  const { amount, currencyCode, currencySymbol, strikeThrough, ceil, showPts, prefix, sign, suffix } = props;
  const isPoints = currencyCode === 'PTS';
  const displayAmount = !isPoints && ceil ? Math.ceil(_.toNumber(amount)) : amount;

  return (
    <div className={cx('currency', { 'strike-through': strikeThrough }, props.className)}>
      {sign}
      {prefix}
      {!isPoints && <span className="money-sign">{currencySymbol}</span>}
      <span data-qa="total-amount">{displayAmount}</span>
      {isPoints && showPts && <span className="points-sign">
        {i18n('SHARED__COMMON__POINTS_TEXT')}</span>}
      {suffix}
    </div>
  );
};

Currency.defaultProps = {
  amount: '0.00',
  currencyCode: 'USD',
  currencySymbol: '$'
};

export default Currency;
