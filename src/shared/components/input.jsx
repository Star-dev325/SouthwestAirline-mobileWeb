// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import MaskedInputElement from 'react-input-mask';

import Icon from 'src/shared/components/icon';
import filterDOMProps, { filterDOMPropsWithMask } from 'src/shared/helpers/dom-whitelist/filterDomProps';

import type { Node, Element } from 'react';

const { cloneElement } = React;

type Props = {
  action?: Element<*>,
  actionLeft?: boolean,
  icon?: ?string,
  iconWhite?: boolean,
  iconLeft?: boolean,
  inputTagClassName?: string,
  fluid?: boolean,
  formattedInput?: Node,
  formattedInputFill?: boolean,
  label?: Node,
  labelLeft?: boolean,
  mask?: string,
  maskChar?: string | null,
  formatChars?: { [key: string | number]: string },
  onClick?: () => void,
  size?: string,
  transparent?: boolean,
  unformattedInput?: Node | boolean,
  onLabelClick?: () => void,
  labelStyles?: string,
  className?: string
};

export default class Input extends Component<Props> {
  static defaultProps = {
    onLabelClick: _.noop
  };

  _renderIcon = () => {
    const { iconWhite, icon } = this.props;
    const iconProps = {
      key: 'icon',
      className: cx({ white: !!iconWhite })
    };

    icon && _.set(iconProps, 'type', icon);

    return <Icon {...iconProps} />;
  };

  _renderLabel = () => (
    <div key="label" className={cx('input--label', this.props.labelStyles)} onClick={this.props.onLabelClick}>
      {this.props.label}
    </div>
  );

  _renderAction = () => {
    const { action } = this.props;

    if (action && React.isValidElement(action)) {
      return cloneElement(action, { key: 'action' });
    }

    return null;
  };

  getInputDOMNode = () => ReactDOM.findDOMNode(this.refs.input);

  getValue = () => _.get(this.getInputDOMNode(), 'value');

  render() {
    const {
      transparent,
      fluid,
      label,
      action,
      formattedInput,
      unformattedInput,
      size,
      icon,
      iconLeft,
      labelLeft,
      actionLeft,
      className,
      onClick,
      formattedInputFill,
      mask,
      inputTagClassName
    } = this.props;

    const classes = {
      transparent: !!transparent,
      fluid: !!fluid,
      labeled: !!label,
      action: !!action,
      formatted: !!formattedInput,
      input: !unformattedInput
    };

    if (size) {
      classes[size] = true;
    }

    const addOnsLeft = [];
    const addOnsRight = [];

    if (icon) {
      iconLeft ? addOnsLeft.push(this._renderIcon()) : addOnsRight.push(this._renderIcon());
    }

    if (label) {
      labelLeft ? addOnsLeft.push(this._renderLabel()) : addOnsRight.push(this._renderLabel());
    }

    if (action) {
      actionLeft ? addOnsLeft.push(this._renderAction()) : addOnsRight.push(this._renderAction());
    }

    const maskedInputRestProps = _.omit(this.props, [
      'transparent',
      'fluid',
      'labelLeft',
      'onLabelClick',
      'labelStyles',
      'fieldModel',
      'isClearValueOnFocusWhenHaveError',
      'iconFixed',
      'disablePlaceholder',
      'caretIcon',
      'formattedInput',
      'formattedInputFill',
      'validatorDefaultError',
      'validator',
      'validatorError',
      'unformattedInput',
      'defaultSelected',
      'refs',
      'noErrorIcon',
      'className'
    ]);

    const inputRestProps = _.omit(maskedInputRestProps, ['maskChar', 'formatChars']);

    return (
      <div className={cx(className, classes)} onClick={onClick}>
        {addOnsLeft}
        {formattedInput && (
          <span className={cx('formatted-input', { 'formatted-input--fill': !!formattedInputFill })}>
            {formattedInput}
          </span>
        )}
        {unformattedInput && <span>{unformattedInput}</span>}
        {mask ? (
          <MaskedInputElement {...filterDOMPropsWithMask(maskedInputRestProps)} />
        ) : (
          <input className={cx(inputTagClassName)} {...filterDOMProps(inputRestProps)} />
        )}
        {addOnsRight}
      </div>
    );
  }
}
