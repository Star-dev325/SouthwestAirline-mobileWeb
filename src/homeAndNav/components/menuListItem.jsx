// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Accordion from 'src/homeAndNav/components/accordion';
import Icon from 'src/shared/components/icon';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';

import type { MenuListItemType } from 'src/homeAndNav/flow-typed/homeAndNav.types';

type Props = {
  icon?: string,
  menuTitle: string,
  childList: Array<*>,
  onLinkClick: (item: MenuListItemType) => void,
  open: boolean,
  onHeaderClick: () => void,
  dataQa: ?string,
  headerLink?: string,
  className?: string,
  titleClassName: ?string,
  isLoggedIn: boolean
};

class MenuListItem extends Component<Props> {
  _onHeaderClick = () => {
    const { headerLink } = this.props;
    const item = _.isEmpty(headerLink) ? { routeName: '/' } : { link: headerLink };

    _.isEmpty(this.props.childList) && this.props.onLinkClick(item);
  };

  _onBodyClick = (item: MenuListItemType) => {
    const { onLinkClick } = this.props;

    return () => {
      onLinkClick(item);
    };
  };

  _renderHeading = () => {
    const { icon, dataQa, menuTitle, titleClassName } = this.props;
    const titleClass = titleClassName ? `${titleClassName}` : 'menu-list-item--heading-title';

    return (
      <div data-qa={dataQa} className="menu-list-item--heading" onClick={this._onHeaderClick}>
        {!!icon && <Icon type={icon} className="menu-list-item--heading-icon mr4" />}
        <span className={titleClass}>{menuTitle}</span>
      </div>
    );
  };

  _renderBody = () => {
    const { childList, isLoggedIn } = this.props;

    return (
      <ul className="menu-list-item--body">
        {_.map(childList, (item, index: number) => {
          const titleClassName = item && item.className ? `${item.className} inline` : 'inline';

          if (_.get(item, 'hideForUsers', false) || (!isLoggedIn && _.get(item, 'hideForGuest', false))) {
            return;
          }

          return (
            <div className="menu-list-item--body-item" key={index} onClick={this._onBodyClick(item)}>
              <li
                data-link={item.routeName}
                data-qa={item.dataQa ? item.dataQa : ''}
                className={titleClassName}
                dangerouslySetInnerHTML={{ __html: `${item.title}${item.registerMark ? '<sup>&reg;</sup>' : ''}` }}
              />
              {item.icon && <Icon type={item.icon} className="ml2" />}
            </div>
          );
        })}
      </ul>
    );
  };

  render() {
    const { className, childList, open, onHeaderClick } = this.props;

    return (
      <Accordion
        heading={this._renderHeading()}
        body={this._renderBody()}
        open={open}
        className={className}
        icon={!_.isEmpty(childList)}
        onHeaderClick={onHeaderClick}
      />
    );
  }
}

export default withFeatureToggles(MenuListItem);
