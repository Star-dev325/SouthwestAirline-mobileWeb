// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Input from 'src/shared/components/input';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

function getMaskedStr(value, maskChar) {
  if (_.isEmpty(value)) {
    return '';
  }

  if (maskChar) {
    return _.repeat(maskChar, value.length);
  }

  return value;
}

type Props = {
  maskChar: string,
  noErrorIcon?: boolean,
  placeholder?: string,
  showWarningIcon?: boolean,
  type?: string
} & FieldProps;

type State = {
  enableMask: boolean
};

export class FormInputMaskAllField extends React.Component<Props, State> {
  static defaultProps = {
    noErrorIcon: false,
    showWarningIcon: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      enableMask: true
    };
  }

  _onBlur = () => {
    this.setState({
      enableMask: true
    });
  };

  _onFocus = () => {
    const { onChange, onFocus } = this.props;

    onChange();

    onFocus && onFocus();
    this.setState(
      {
        enableMask: false
      },
      () => {
        if (this.refs.input) {
          const inputDomNode = ReactDOM.findDOMNode(this.refs.input);

          if (inputDomNode instanceof HTMLElement) {
            const inputDom = inputDomNode.querySelector('input');

            inputDom && inputDom.focus();
          }
        }
      }
    );
  };

  _getInputFieldIcon(hasError: boolean, showWarningIcon: ?boolean, noErrorIcon: ?boolean, text: string) {
    if (hasError && !noErrorIcon) {
      return 'exclamation-circle';
    } else if (!hasError && showWarningIcon && !text) {
      return 'exclamation-circle warning';
    }

    return null;
  }

  render() {
    const { onChange, placeholder, value, showWarningIcon, error, maskChar, type, ...restProps } = this.props;
    const { enableMask } = this.state;

    if (enableMask)
      return (
        <Input
          ref="mask"
          type={type}
          className="mask-field"
          value={getMaskedStr(value, maskChar)}
          placeholder={placeholder}
          icon={this._getInputFieldIcon(!_.isEmpty(error), showWarningIcon, this.props.noErrorIcon, value)}
          onChange={() => {}}
          onFocus={this._onFocus}
          {...restProps}
        />
      );

    return (
      <Input
        ref="input"
        type={type}
        value={value}
        placeholder={placeholder}
        icon={this._getInputFieldIcon(!_.isEmpty(error), showWarningIcon, this.props.noErrorIcon, value)}
        onBlur={this._onBlur}
        onChange={onChange}
        {..._.omit(restProps, 'clearError')}
      />
    );
  }
}

export default withField({
  parse: (event: SyntheticInputEvent<*>) => {
    if (event) {
      event.preventDefault();

      return event.target.value;
    }

    return '';
  }
})(FormInputMaskAllField);
