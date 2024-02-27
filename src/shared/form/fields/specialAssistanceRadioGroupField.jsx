// @flow

import _ from 'lodash';
import cx from 'classnames';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import React from 'react';
import Select from 'src/shared/components/select';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  batteryDefault?: string,
  batteryOptions?: Array<string>,
  className: string,
  DRY_BATTERIES?: string,
  goBack?: () => void,
  radioGroupOptions: {},
  updateNumberOfBatteriesFn?: (string, string) => void,
  WET_BATTERIES?: string
} & FieldProps;

const SpecialAssistanceRadioGroupField = (props: Props) => {
  const { batteryOptions, className, radioGroupOptions, value } = props;

  const _updateBatterySelection = (batteries) => {
    const { onChange, updateNumberOfBatteriesFn } = props;

    onChange(value);
    updateNumberOfBatteriesFn && updateNumberOfBatteriesFn(value, batteries);
  };

  const _isWheelchairStowageType = (key) =>
    key === 'WET_CELL_BATTERY_WHEELCHAIR' || key === 'DRY_CELL_BATTERY_WHEELCHAIR';

  const _getBatteryAmount = (key) => {
    const { WET_BATTERIES, DRY_BATTERIES, batteryDefault = '1' } = props;

    if (key === 'WET_CELL_BATTERY_WHEELCHAIR' && WET_BATTERIES !== batteryDefault && WET_BATTERIES !== null) {
      return WET_BATTERIES;
    } else if (key === 'DRY_CELL_BATTERY_WHEELCHAIR' && DRY_BATTERIES !== batteryDefault && DRY_BATTERIES !== null) {
      return DRY_BATTERIES;
    } else {
      return batteryDefault;
    }
  };

  const _fieldClicked = (key) => {
    const { onChange, updateNumberOfBatteriesFn } = props;

    if (value === key) {
      return null;
    }

    onChange(key);

    _isWheelchairStowageType(key)
      ? updateNumberOfBatteriesFn && updateNumberOfBatteriesFn(key, _getBatteryAmount(key))
      : updateNumberOfBatteriesFn && updateNumberOfBatteriesFn('', '');
  };

  const _renderSpecialAssistanceSelect = (key, options) => {
    const batteries = _getBatteryAmount(key);

    return (
      <div className="sa-radio-item-quantity">
        <Select
          caretIcon
          disablePlaceholder
          name={key}
          onChange={_updateBatterySelection}
          options={optionsHelper.getOptionsByValueList(options)}
          value={batteries}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      {_.map(radioGroupOptions, (specialAssistanceOption, key) => {
        const isChecked = value === key;

        return (
          <div
            key={key}
            className={cx('sa-radio-item', {
              'sa-radio-item_checked': isChecked,
              'sa-radio-item_select': specialAssistanceOption.select
            })}
            onClick={() => _fieldClicked(key)}
            name={key}
          >
            <div className="sa-radio-item--radio">
              <RadioButtonMark isChecked={isChecked} />
            </div>
            <div className="sa-radio-item--text">{specialAssistanceOption.text}</div>
            {isChecked && specialAssistanceOption.select && _renderSpecialAssistanceSelect(key, batteryOptions)}
          </div>
        );
      })}
    </div>
  );
};

SpecialAssistanceRadioGroupField.defaultProps = {
  updateNumberOfBatteriesFn: _.noop
};

export default withField()(SpecialAssistanceRadioGroupField);
