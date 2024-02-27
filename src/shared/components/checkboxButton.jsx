// @flow

import _ from 'lodash';
import React from 'react';
import cx from 'classnames';

import Icon from 'src/shared/components/icon';
import Button from 'src/shared/components/button';

import type { Node } from 'react';

type Props = {
  defaultChecked: ?boolean,
  onChange: (boolean) => void,
  disabled?: boolean,
  iconLabeled?: string,
  className?: string,
  children?: Node
};

type State = {
  checked: boolean,
  disabled: boolean
};

class CheckboxButton extends React.Component<Props, State> {
  static defaultProps = {
    onChange: () => {},
    disabled: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      checked: !!props.defaultChecked,
      disabled: !!props.disabled
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({
      checked: !!nextProps.defaultChecked,
      disabled: !!nextProps.disabled
    });
  }

  _onClick = () => {
    const { disabled, checked } = this.state;

    if (!disabled) {
      this.setState(
        {
          checked: !checked
        },
        () => {
          this.props.onChange(!checked);
        }
      );
    }
  };

  render() {
    const { iconLabeled, disabled, className, children } = this.props;
    const buttonProps = _.pick(this.props, ['size', 'color']);
    const classes = { left: iconLabeled === 'left' };

    if (disabled !== undefined) {
      _.merge(classes, { invisible: !!disabled });
    }

    return (
      <Button
        {...buttonProps}
        className={cx(className, 'checkbox-button', {
          'checkbox-button_checked': this.state.checked
        })}
        onClick={this._onClick}
        fluid
      >
        {children}
        <span className={cx(classes, 'checkbox-button--mark')}>
          <Icon type="check" />
        </span>
      </Button>
    );
  }
}

export default CheckboxButton;
