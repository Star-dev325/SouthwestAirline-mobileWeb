// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import withField from 'src/shared/form/enhancers/withField';
import Icon from 'src/shared/components/icon';
import Select from 'src/shared/components/select';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { OptionType } from 'src/shared/flow-typed/shared.types';

type Props = FieldProps & {
  placeholder: string,
  disablePlaceholder?: boolean,
  options: Array<OptionType>
};

const FormSelectWithPlaceHolderField = (props: Props) => {
  const { clearError, value, placeholder, disablePlaceholder, options, error, ...restProps } = props;

  const _getOptionItemLabel = (optionValue) => {
    const optionItem = _.find(options, { value: optionValue });

    return _.get(optionItem, 'label', '');
  };

  const fieldLabel = _getOptionItemLabel(value);
  const selectOptions = [{ value: '', label: placeholder, disabled: disablePlaceholder }, ...options];

  return (
    <div className="form-select-placeholder-field">
      <div className="form-select-placeholder-field--wrapper">
        <div className="form-select-placeholder-field--wrapper-label">
          <label className={cx('xlarge', { error: !_.isEmpty(error) })}>{placeholder}</label>
          <label className="large gray4">{fieldLabel}</label>
        </div>
        <Icon key="icon" className="form-select-placeholder-field--wrapper-icon" type={'caret-down'} />
      </div>
      <Select
        {...restProps}
        className="form-select-placeholder-field--select"
        defaultValue=""
        value={value}
        options={selectOptions}
        onFocus={clearError}
        placeholder={placeholder}
      />
    </div>
  );
};

export default withField()(FormSelectWithPlaceHolderField);
