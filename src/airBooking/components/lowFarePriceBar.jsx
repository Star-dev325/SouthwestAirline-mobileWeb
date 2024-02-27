// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import dayjs from 'dayjs';
import Currency from 'src/shared/components/currency';

import type { LowestPriceType } from 'src/airBooking/flow-typed/lowFare.types';

type Props = {
  date: string,
  lowestPrice: ?LowestPriceType,
  barHeight: string,
  isDisabled: boolean,
  isSelected: boolean,
  onSelect: (date: string, el: HTMLElement) => void,
  showAsUnselectableBar: boolean
};

const LowFarePriceBar = (props: Props) => {
  const { date, barHeight, lowestPrice, isDisabled = false, onSelect, isSelected, showAsUnselectableBar } = props;
  const price = _.get(lowestPrice, 'price');
  const pricePointsTaxAmount = _.get(lowestPrice, 'pricePointsTax.amount');
  const pointsTax = pricePointsTaxAmount ? parseFloat(pricePointsTaxAmount).toFixed(2) : '';
  const taxCurrencySymbol = _.get(lowestPrice, 'pricePointsTax.currencySymbol', '');
  const dayOfWeek = dayjs(date).format('ddd').toUpperCase();

  return (
    <div className="calendar-day" data-date={date}>
      {isDisabled && <div className="calendar-day--fare-price-disabled">N/A</div>}
      {!isDisabled && lowestPrice && (
        <div
          className={cx({ selected: isSelected, unselectable: showAsUnselectableBar }, 'calendar-day--fare-price')}
          style={{ height: barHeight }}
          data-date={date}
          onClick={(event) => {
            onSelect(date, event.currentTarget);
          }}
        >
          <Currency {...price} ceil />
          {pointsTax && (
            <span className="calendar-day--points-tax" data-qa="points-tax">
              {'+'}
              {taxCurrencySymbol}
              {pointsTax}
            </span>
          )}
        </div>
      )}
      <div className="calendar-day--menu">{dayOfWeek}</div>
    </div>
  );
};

export default LowFarePriceBar;
