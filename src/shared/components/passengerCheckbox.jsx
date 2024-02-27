// @flow
import cx from 'classnames';
import React from 'react';
import ToggleSwitch from 'src/shared/components/toggleSwitch';
import withField from 'src/shared/form/enhancers/withField';
import type { PassengerSelectionType } from 'src/shared/flow-typed/shared.types';

type Props = {
  disabled?: boolean,
  onPassengerSelectedFn: (string, boolean) => void,
  passengerSelection: PassengerSelectionType,
  value?: boolean,
};

const PassengerCheckbox = ({ passengerSelection: { name, passengerId, passengerTypeText }, disabled, value, onPassengerSelectedFn }: Props) => (
  <div className="passenger-checkbox">
    <div className={cx('passenger-checkbox--container', { 'gray5': disabled })}>
      <div className="passenger-checkbox--name">{name}</div>
      <div className="passenger-checkbox--passenger-type-and-button-container">
        {passengerTypeText && <div className="passenger-checkbox--passenger-type">{passengerTypeText}</div>}
        <ToggleSwitch checked={value} disabled={disabled} onChange={() => onPassengerSelectedFn(passengerId, !!value)} />
      </div>
    </div>
  </div>
);

export default withField()(PassengerCheckbox);
