// @flow

import React from 'react';
import _ from 'lodash';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import withField from 'src/shared/form/enhancers/withField';
import cx from 'classnames';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  label?: string,
  description?: string,
  disabled: boolean
} & FieldProps;

class SwitchRadioField extends React.Component<Props> {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { onChange, value, label, description, disabled } = this.props;

    return (
      <div className={cx('switch-radio-field', { 'switch-radio-field_disabled': disabled })}>
        <div className="save-credit-cards-field">
          <div className="save-credit-cards-field--label">
            <span>{label}</span>
          </div>
          <div className="save-credit-cards-field--radio" onClick={disabled ? _.noop : () => onChange(!value)}>
            <RadioButtonMark isChecked={value} />
          </div>
        </div>
        {description && <div className="switch-radio-field--description">{description}</div>}
      </div>
    );
  }
}

export default withField({
  format: (value) => !!_.toBoolean(value)
})(SwitchRadioField);
