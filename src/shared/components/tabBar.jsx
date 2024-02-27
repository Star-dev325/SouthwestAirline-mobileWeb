// @flow

import React, { Component, cloneElement } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import ValidComponentChildren from 'src/shared/helpers/validComponentChildren';
import createChainedFunction from 'src/shared/helpers/createChainedFunction';

import type { Node, Element } from 'react';

type Props = {
  activeHref?: string,
  activeKey?: string | number,
  onSelect?: () => void,
  eventKey?: string | number,
  justified?: boolean,
  children?: Node,
  className?: string,
  analyticsTrackViewTabFn: (string) => void
};

class TabBar extends Component<Props> {
  UNSAFE_componentWillMount = () => {
    const { analyticsTrackViewTabFn, activeKey } = this.props;

    analyticsTrackViewTabFn(_.toString(activeKey));
  };

  UNSAFE_componentWillUpdate = (newProps: Props) => {
    const { analyticsTrackViewTabFn, activeKey } = this.props;

    if (newProps.activeKey !== activeKey) {
      analyticsTrackViewTabFn(_.toString(newProps.activeKey));
    }
  };

  _getChildActiveProp = (child: Element<*>) => {
    if (child.props.active) {
      return true;
    }

    if (!_.isUndefined(this.props.activeKey)) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }

    if (!_.isUndefined(this.props.activeHref)) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return !!child.props.active;
  };

  _renderNavItem = (child: Element<*>, index: number) =>
    cloneElement(child, {
      active: this._getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index,
      navItem: true
    });

  render() {
    const restProps = _.omit(this.props, ['justified', 'activeKey', 'analyticsTrackViewTabFn']);
    const classes: { [string]: ?boolean } = {
      nav: true
    };

    classes['nav--justified'] = this.props.justified;

    return (
      <ul {...restProps} className={cx(this.props.className, classes)} ref="ul">
        {ValidComponentChildren.map(this.props.children, this._renderNavItem)}
      </ul>
    );
  }
}

export default TabBar;
