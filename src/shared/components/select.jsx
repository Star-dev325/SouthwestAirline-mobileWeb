// @flow
import _ from 'lodash';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Input from 'src/shared/components/input';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';

import type { OptionType } from 'src/shared/flow-typed/shared.types';

type Props = {
  placeholder?: string,
  disablePlaceholder?: boolean,
  defaultValue?: string | number | boolean,
  value?: number | string,
  options: Array<OptionType>,
  iconFixed?: boolean,
  caretIcon?: boolean,
  onChange: (...args: *) => void,
  unformattedInput?: boolean,
  defaultHidden?: boolean,
  defaultSelected?: boolean,
  size?: string,
  className?: string
};

type State = {
  value?: string | number | boolean
};

export default class Select extends Component<Props, State> {
  static defaultProps = {
    disablePlaceholder: false,
    caretIcon: true,
    onChange: _.noop
  };

  constructor(props: Props) {
    super(props);
    this.state = this._getStateFromProps(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState(this._getStateFromProps(nextProps));
  }

  _getStateFromProps = (props: Props) => ({
    value: props.defaultValue || `${_.get(props, 'value')}` || ''
  });

  _renderSelect = () => {
    const { placeholder, size, disablePlaceholder, defaultHidden, options } = this.props;

    const dropdownClasses = {
      dropdown: true,
      empty: placeholder && _.isEmpty(this.state.value)
    };

    if (size) {
      dropdownClasses[size] = true;
    }

    const restProps = _.omit(this.props, [
      'fieldModel',
      'options',
      'isClearValueOnFocusWhenHaveError',
      'iconFixed',
      'disablePlaceholder',
      'caretIcon',
      'validator',
      'validatorError',
      'unformattedInput',
      'defaultSelected',
      'defaultValue',
      'value'
    ]);

    return (
      <select
        {...filterDOMProps(restProps)}
        ref="select"
        value={this.state.value}
        onChange={this._handleChange}
        className={cx(dropdownClasses)}
        data-qa={"select-dropdown"}
      >
        {placeholder && (
          <option
            disabled={disablePlaceholder}
            className="placeholder"
            data-qa={disablePlaceholder ? 'dqa-disabled-option' : 'dqa-enabled-option'}
            key="placeholder"
            hidden={defaultHidden}
            value=""
          >
            {placeholder}
          </option>
        )}
        {_.map(options, (optionItem: OptionType, idx: number) => (
          <option
            key={idx}
            disabled={optionItem.disabled}
            data-qa={optionItem.disabled ? 'dqa-disabled-option' : 'dqa-enabled-option'}
            hidden={optionItem.hidden}
            value={optionItem.value}
          >
            {optionItem.label}
          </option>
        ))}
      </select>
    );
  };

  _handleChange = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();

    const { value } = evt.target;
    const { onChange, options } = this.props;

    this.setState({ value }, () => onChange(value, _.find(options, { value })));
  };

  getSelectDOMNode = () => ReactDOM.findDOMNode(this.refs.select);

  render() {
    const { unformattedInput, className, iconFixed, caretIcon } = this.props;

    const inputProps = _.omit(this.props, ['value', 'options', 'onChange']);

    const inputKey = unformattedInput ? 'unformattedInput' : 'formattedInput';
    const input = { [inputKey]: this._renderSelect() };

    return (
      <Input
        {...inputProps}
        {...input}
        className={cx(className, 'select-input', {
          'icon-fixed': iconFixed
        })}
        icon={caretIcon ? 'caret-down' : null}
        formattedInputFill
      />
    );
  }
}
