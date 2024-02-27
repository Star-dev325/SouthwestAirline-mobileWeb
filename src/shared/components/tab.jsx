// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';
import ContentLink from 'src/shared/components/contentLink';

import type { Node } from 'react';

type Props = {
  onSelect?: (eventKey?: *, href?: string, target?: string) => *,
  active?: boolean,
  disabled?: boolean,
  href?: string,
  title?: Node,
  eventKey?: *,
  target?: string,
  children?: Node,
  className?: string,
  MWEB_HOMEPAGE_REDESIGN?: boolean
};

class Tab extends Component<Props> {
  handleClick = (event: SyntheticEvent<HTMLElement>) => {
    const { eventKey, onSelect, disabled } = this.props;

    if (onSelect) {
      event.preventDefault();

      if (!disabled) {
        onSelect(eventKey);
      }
    }
  };

  render() {
    const { disabled, className, active, children, MWEB_HOMEPAGE_REDESIGN } = this.props;
    const classes = {
      'nav--item': true,
      'nav--item_homepage-redesign': MWEB_HOMEPAGE_REDESIGN,
      active,
      disabled
    };

    const restProps = _.omit(this.props, ['active', 'eventKey', 'activeKey', 'activeHref', 'navItem']);

    return (
      <li {...filterDOMProps(restProps)} className={cx(className, classes)}>
        <ContentLink onClick={this.handleClick}>{children}</ContentLink>
      </li>
    );
  }
}

export default Tab;
