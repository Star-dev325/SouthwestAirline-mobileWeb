// @flow
import React from 'react';
import Button from 'src/shared/components/button';

type Props = {
  isCircular: boolean,
  value: number,
  onIncrementDecrement: (value: number) => void,
  minValue: number,
  maxValue: number,
  disableMinus?: boolean,
  disablePlus?: boolean
};

const MAX_VALUE = 8;
const MIN_VALUE = 1;

const IncrementDecrementButtons = ({
  isCircular,
  value = MIN_VALUE,
  onIncrementDecrement,
  minValue = MIN_VALUE,
  maxValue = MAX_VALUE,
  disableMinus = false,
  disablePlus = false
}: Props) => {
  const onChange = (updatedValue: number) => {
    onIncrementDecrement(updatedValue);
  };

  return (
    <div className="buttons-with-flex">
      <Button
        key="minus"
        type="button"
        icon={!isCircular ? 'minus-normal' : 'minus'}
        circular={isCircular}
        onClick={() => onChange(value - 1)}
        disabled={value <= minValue || disableMinus}
      />
      <div className="selected-passenger-number">{value}</div>
      <Button
        key="plus"
        type="button"
        icon={!isCircular ? 'plus-normal' : 'plus'}
        circular={isCircular}
        onClick={() => onChange(value + 1)}
        disabled={value >= maxValue || disablePlus}
      />
    </div>
  );
};

export default IncrementDecrementButtons;
