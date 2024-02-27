// @flow

import React from 'react';
import _ from 'lodash';

import Icon from 'src/shared/components/icon';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  radioGroupOptions: {},
  className: string,
  disabled?: boolean,
  isAirBooking?: boolean
} & FieldProps;

const ContactMethodRadioGroupField = (props: Props) => {
  const { className, radioGroupOptions, value, onChange, disabled, isAirBooking } = props;

  return (
    <ul className={className}>
      {_.map(radioGroupOptions, (method, key) => (
        <li key={key} className="contact-method-item" onClick={!disabled ? () => onChange(key) : _.noop}>
          <span>{method}</span>
          {isAirBooking ? <RadioButtonMark isChecked={value === key} /> : value === key && <Icon type="check" />}
        </li>
      ))}
    </ul>
  );
};

export default withField()(ContactMethodRadioGroupField);
