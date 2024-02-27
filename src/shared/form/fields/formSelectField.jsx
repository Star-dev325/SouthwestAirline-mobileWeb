// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import Select from 'src/shared/components/select';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  usingNativeStyle?: boolean,
  iconType?: string,
  containerClassName?: string,
  showWarningIcon?: boolean,
  onFocus: (SyntheticInputEvent<*>) => void
} & FieldProps;

const FormSelectField = (props: Props) => {
  const { usingNativeStyle } = props;

  if (usingNativeStyle) {
    return renderNativeSelect(props);
  } else {
    return renderSelect(props);
  }
};

FormSelectField.defaultProps = {
  onFocus: _.noop
};

const renderSelect = (props: Props) => {
  const { clearError, value, onFocus, ...restProps } = props;

  return (
    <Select
      {..._.omit(restProps, ['error', 'usingNativeStyle', 'iconType'])}
      value={value}
      onFocus={_.over(clearError, onFocus)}
      iconFixed
    />
  );
};

const renderNativeSelect = (props: Props) => {
  const { error, showWarningIcon, containerClassName } = props;
  const { iconType, clearError, value, onFocus, ...restProps } = props;

  return (
    <div className="form-field--container">
      {renderNativeIcon(iconType)}
      <div className={cx('form-field--text-container', containerClassName)}>
        <Select
          {..._.omit(restProps, ['error', 'usingNativeStyle'])}
          value={value}
          onFocus={_.over(clearError, onFocus)}
          unformattedInput
          caretIcon={false}
        />
      </div>
      {renderNativeErrorIcon(error, showWarningIcon)}
    </div>
  );
};

const renderNativeIcon = (iconType) => {
  if (iconType) {
    return (
      <div className="form-field--icon">
        <Icon type={iconType} />
      </div>
    );
  }

  return null;
};

const renderNativeErrorIcon = (error, showWarningIcon) => {
  if (error || showWarningIcon) {
    return (
      <div className="form-field--icon icon-right">
        <Icon type={error ? 'exclamation-circle' : 'exclamation-circle warning'} />
      </div>
    );
  }

  return null;
};

export default withField()(FormSelectField);
