// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Input from 'src/shared/components/input';
import withField from 'src/shared/form/enhancers/withField';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

const DEFAULT_MASK_LEN = 5;
const UNMASK_LEN = 4;
const MASK_CHAR = 'X';

function getMaskedStr(str) {
  if (_.isEmpty(str)) {
    return '';
  }

  const defaultMaskLens = str.length === UNMASK_LEN ? DEFAULT_MASK_LEN : 0;
  const maskLen = str.length > UNMASK_LEN ? str.length - UNMASK_LEN : defaultMaskLens;

  return _.repeat(MASK_CHAR, maskLen).concat(str.slice(-UNMASK_LEN));
}

type Props = {
  inputLabel?: string,
  placeholder?: string,
  noErrorIcon?: boolean
} & FieldProps;

type State = {
  enableMask: boolean
};

class FormInputMaskField extends React.Component<Props, State> {
  static defaultProps = {
    noErrorIcon: false
  };

  constructor(props) {
    super(props);

    this.state = {
      enableMask: true
    };
  }

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

  _onBlur = () => {
    this.setState({
      enableMask: true
    });
  };

  render() {
    const { error, inputLabel, value, noErrorIcon, placeholder, ...restProps } = this.props;
    const { enableMask } = this.state;

    const hasError = !_.isEmpty(error);

    if (enableMask)
      return (
        <Input
          placeholder={placeholder}
          ref="mask"
          className="mask-field"
          label={inputLabel}
          value={getMaskedStr(value)}
          icon={!noErrorIcon && hasError ? 'exclamation-circle' : null}
          onChange={() => {}}
          onFocus={this._onFocus}
        />
      );

    return (
      <Input
        label={inputLabel}
        placeholder={placeholder}
        ref="input"
        icon={!noErrorIcon && hasError ? 'exclamation-circle' : null}
        value={value}
        onBlur={this._onBlur}
        {..._.omit(restProps, 'clearError')}
      />
    );
  }
}

export default withField({
  parse: (event?: SyntheticInputEvent<*>) => {
    if (event) {
      event.preventDefault();

      return event.target.value;
    }

    return '';
  }
})(FormInputMaskField);
