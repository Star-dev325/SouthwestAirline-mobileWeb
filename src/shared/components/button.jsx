// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import Icon from 'src/shared/components/icon';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';

import type { Node } from 'react';

type Props = {
  color?: string,
  size?: string,
  type?: string,
  icon?: string,
  fluid?: boolean,
  circular?: boolean,
  className?: string,
  children?: Node,
  iconLabeled?: string | boolean,
  href?: string,
  target?: string,
  onClick?: (*) => void
};

class Button extends React.Component<Props> {
  _onButtonClick = (event: Event) => {
    const { onClick } = this.props;

    if (onClick) {
      event.preventDefault();
      onClick(event);
      event.stopPropagation();
    }
  };

  render() {
    const {
      color,
      type = 'button',
      size,
      icon,
      iconLabeled,
      fluid,
      circular,
      href,
      target = '_self',
      className,
      children,
      ...restProps
    } = this.props;
    const Component = href ? 'a' : 'button';
    const customClasses = {
      icon: !!icon,
      button: true,
      button_link: !!href,
      labeled: !!iconLabeled,
      right: iconLabeled === 'right',
      circular: !!circular,
      'button--fluid': !!fluid
    };

    size && _.merge(customClasses, { [size]: true });
    color && _.merge(customClasses, { [`button--${color}`]: !!color });

    const buttonProps = {
      className: cx(className, customClasses),
      type,
      ...filterDOMProps(restProps)
    };

    if (href) {
      buttonProps['href'] = href;
      buttonProps['target'] = target;
    } else {
      buttonProps['onClick'] = this._onButtonClick;
    }

    return (
      <Component {...buttonProps}>
        {icon && <Icon type={icon} />}
        {children}
      </Component>
    );
  }
}

export default Button;
