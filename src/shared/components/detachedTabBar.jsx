// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

type Props = {
  tabs: Array<string>,
  active: number,
  onTabClick: (number) => void,
  activeTabClassName?: string,
  className?: string,
  analyticsTrackViewTabFn: (string) => void
};

class DetachedTabBar extends React.Component<Props> {
  static defaultProps = {
    activeTabClassName: 'white'
  };

  UNSAFE_componentWillMount() {
    this.props.analyticsTrackViewTabFn(this.props.tabs[this.props.active]);
  }

  UNSAFE_componentWillUpdate(newProps: Props) {
    const { active, analyticsTrackViewTabFn, tabs } = this.props;

    if (newProps.active !== active) {
      analyticsTrackViewTabFn(tabs[newProps.active]);
    }
  }

  _renderTab(tab: string, index: number) {
    const { active, activeTabClassName, onTabClick } = this.props;

    const activeClasses = cx('border-none bgtransp', activeTabClassName);
    const notActiveClasses = { white: true };
    const isActiveTab = active === index;
    const itemClasses = isActiveTab ? activeClasses : notActiveClasses;

    return (
      <div
        key={index}
        data-qa={`detached-tab-bar-${_.kebabCase(tab.toLowerCase())}`}
        className={cx('tab-bar-item bgpblue center flex-equal-width bdr bdsdkblue bold py5', itemClasses)}
        style={{ cursor: 'pointer' }}
        onClick={onTabClick.bind(null, index)}
      >
        <div className="mx-auto tab-bar-item--text">{tab}</div>
      </div>
    );
  }

  render() {
    const { tabs, className } = this.props;

    return (
      <div data-qa="detached-tab-bar" className={cx('bd bdpblue rd2 flex', className)}>
        {tabs.map((tab, index) => this._renderTab(tab, index))}
      </div>
    );
  }
}

export default DetachedTabBar;
