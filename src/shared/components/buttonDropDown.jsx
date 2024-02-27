// @flow
import React from 'react';
import Select from 'src/shared/components/select';
import type { OptionType } from 'src/shared/flow-typed/shared.types';

type Props = {
  className: string,
  options: Array<OptionType>,
  value: string,
  label: string,
  onChange: (string) => void
};

const ButtonDropDown = ({ className, options, value, label, onChange }: Props) => (
  <div className={`${className}  button-dropdown`}>
    <Select className={'button-dropdown--select'} options={options} value={value} onChange={onChange} />
    <div className="button-dropdown--label">{label}</div>
  </div>
);

export default ButtonDropDown;
