// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  inputClassName?: string,
  isChecked: boolean
};

const RadioButtonMark = ({ inputClassName, isChecked }: Props) => (
  <span className="radio-button--mark">
    <span
      className={cx('radio-input--mark', {
        active: isChecked
      }, inputClassName)}
    />
  </span>
);

export default RadioButtonMark;
