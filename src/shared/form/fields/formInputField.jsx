// @flow

import React from 'react';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import Input from 'src/shared/components/input';
import withField from 'src/shared/form/enhancers/withField';
import cx from 'classnames';

import type { FieldProps, FormValidationError } from 'src/shared/form/flow-typed/form.types';
import type { Node } from 'react';

type Props = {
  containerClassName?: string,
  noErrorIcon?: boolean,
  showWarningIcon?: boolean,
  labelStyles?: string,
  inputLabel?: Node,
  usingNativeStyle?: boolean,
  iconType?: string,
  description?: string,
  id?: string,
  onFocus: (SyntheticInputEvent<*>) => void,
  shouldClearErrorOnUnmount?: boolean,
  mask?: string,
  maskChar?: string | null,
  formatChars?: { [key: string | number]: string },
} & FieldProps;

export class FormInputField extends React.Component<Props> {
  static defaultProps = {
    noErrorIcon: false,
    showWarningIcon: false,
    onFocus: _.noop
  };

  componentWillUnmount() {
    const { shouldClearErrorOnUnmount, clearError } = this.props;

    shouldClearErrorOnUnmount ? clearError() : null;
  }

  _getInputFieldIcon(hasError: boolean, showWarningIcon?: boolean, noErrorIcon?: boolean, text: string) {
    if (hasError && !noErrorIcon) {
      return 'exclamation-circle';
    } else if (!hasError && showWarningIcon && !text) {
      return 'exclamation-circle warning';
    }

    return null;
  }

  getInputDOMNode = () => this.refs.input.getInputDOMNode();

  _renderInput = () => {
    const { props } = this;
    const { onChange, onFocus, clearError, labelStyles, inputLabel, value, showWarningIcon, error, id, ...restProps } =
      this.props;

    return (
      <Input
        ref="input"
        label={inputLabel}
        labelStyles={labelStyles}
        icon={this._getInputFieldIcon(!_.isEmpty(error), showWarningIcon, props.noErrorIcon, value)}
        onChange={onChange}
        onFocus={_.over(clearError, onFocus)}
        value={value}
        key={id}
        {..._.omit(restProps, ['usingNativeStyle', 'iconType', 'description'])}
      />
    );
  };

  _renderNativeInput = () => {
    const {
      onChange,
      containerClassName,
      onFocus,
      clearError,
      labelStyles,
      inputLabel,
      value,
      showWarningIcon,
      error,
      iconType,
      description,
      ...restProps
    } = this.props;

    return (
      <div className="form-field--container">
        {this._renderNativeIcon(iconType)}
        <div className={cx("form-field--text-container", containerClassName)}>
          <Input
            ref="input"
            label={inputLabel}
            labelStyles={labelStyles}
            onChange={onChange}
            onFocus={_.over(clearError, onFocus)}
            value={value}
            unformattedInput
            {..._.omit(restProps, 'usingNativeStyle')}
          />
          {description && <div className="form-field--description">{description}</div>}
        </div>
        {this._renderNativeErrorIcon(error, showWarningIcon)}
      </div>
    );
  };

  _renderNativeIcon = (iconType?: string) => {
    if (iconType) {
      return (
        <div className="form-field--icon">
          <Icon type={iconType} />
        </div>
      );
    }

    return null;
  };

  _renderNativeErrorIcon = (error?: FormValidationError, showWarningIcon?: boolean) => {
    if (error || showWarningIcon) {
      return (
        <div className="form-field--icon icon-right">
          <Icon type={error ? 'exclamation-circle' : 'exclamation-circle warning'} />
        </div>
      );
    }

    return null;
  };

  render() {
    const { usingNativeStyle } = this.props;

    if (usingNativeStyle) {
      return this._renderNativeInput();
    } else {
      return this._renderInput();
    }
  }
}

export default withField({
  parse: (event: SyntheticInputEvent<*>) => {
    event.preventDefault();

    return event.target.value;
  }
})(FormInputField);
