// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { setResetDrawerScroll } from 'src/homeAndNav/actions/drawerActions';
import { gotoEmailUsPage, updateActiveLinkIndex } from 'src/homeAndNav/actions/menuListActions';
import MenuListItem from 'src/homeAndNav/components/menuListItem';
import OpenedMenuListItem from 'src/homeAndNav/components/openedMenuListItem';
import { getSalesforceGuid } from 'src/shared/actions/accountActions.js';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { updateQueryStringParameter } from 'src/shared/helpers/urlHelper';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { HAMBURGER_MENU_ID } from 'src/wcm/constants/wcmConstants';

import type { MenuListItemType, Site } from 'src/homeAndNav/flow-typed/homeAndNav.types';

const { window } = BrowserObject;
const contactUsNavItem = i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US');

type FeedbackNavOption = {
  linkType?: string,
  optionName?: string,
  target_android?: string,
  target_ios?: string,
  target_mweb?: string
};

type Props = {
  activeMenuIndex: number,
  featureToggleState: FeedbackNavOption,
  getSalesforceGuidFn: () => void,
  gotoEmailUsPageFn: (string) => void,
  handleFirmOfferOfCreditFn: () => void,
  isLoggedIn: boolean,
  listData: Array<*>,
  onLogoutClick: () => void,
  onLinkClick: (*) => void,
  setResetDrawerScrollFn: (boolean) => void,
  toggleDrawer: (state: boolean) => void,
  updateActiveLinkIndexFn: ?(number | null) => void
};

export class MenuList extends Component<Props> {
  handleClick = (itemTitle: string, index: number) => () => {
    const { activeMenuIndex, getSalesforceGuidFn, isLoggedIn, setResetDrawerScrollFn, updateActiveLinkIndexFn } = this.props;
    const isCurrentFocus = activeMenuIndex === index;

    if (isLoggedIn && itemTitle === contactUsNavItem) {
      getSalesforceGuidFn();
    }

    if (!isCurrentFocus) {
      setResetDrawerScrollFn(true);
    }

    isCurrentFocus && updateActiveLinkIndexFn
      ? updateActiveLinkIndexFn(null)
      : updateActiveLinkIndexFn && updateActiveLinkIndexFn(index);
    setResetDrawerScrollFn(false);
  };

  _onLinkClick = (item: MenuListItemType | Site) => {
    let updatedItem;
    const { gotoEmailUsPageFn, isLoggedIn, onLinkClick, toggleDrawer } = this.props;
    const routeLink = item.link || item.routeName;

    if (item.title === i18n('HOME_AND_NAV__MENU_LIST__MANAGE_BOOKINGS') && isLoggedIn) {
      const link = updateQueryStringParameter(routeLink, 'e45', AccountInfoHelper.getAccountNumber());

      updatedItem = { ...item, link };
    } else if (item.link && item.title === i18n('HOME_AND_NAV__MENU_LIST__EMAIL_US')) {
      gotoEmailUsPageFn(item.link);

      return;
    } else if (item.icon === 'chat-with-us' && window.embedded_svc) {
      raiseSatelliteEvent('link:chatbot');
      toggleDrawer(true);
      window.embedded_svc.inviteAPI.inviteButton.acceptInvite();

      return;
    }
    onLinkClick(updatedItem || item);
  };

  render() {
    const { activeMenuIndex, featureToggleState, handleFirmOfferOfCreditFn, isLoggedIn, listData, onLogoutClick } =
      this.props;
    let adjustedMenuItem;
    let menuChildList = [];

    return (
      <div className="menu-list">
        {_.map(listData, (menuItem, index: number) => {
          const { iconType, menuTitle, childList, className, titleClassName } = menuItem;

          let updatedClassName = className;
          
          menuChildList = [];
          adjustedMenuItem = _.cloneDeep(menuItem);

          if (_.get(menuItem, 'hideForUsers', false) || (!isLoggedIn && _.get(menuItem, 'hideForGuest', false))) {
            return;
          }

          _.forEach(childList, (item) => {
            if (_.get(item, 'hideForUsers', false) || (!isLoggedIn && _.get(item, 'hideForGuest', false))) {
              return;
            } else if (item && item.toggle && !featureToggleState[item.toggle]) {
              return;
            } else {
              menuChildList.push(item);
            }
          });
          adjustedMenuItem.childList = menuChildList;

          if (adjustedMenuItem.menuTitle === contactUsNavItem) {
            updatedClassName = updatedClassName.concat(' menu-list-item--icon-left-align');
          }

          if (adjustedMenuItem.isAccordion) {
            return (
              <MenuListItem
                childList={adjustedMenuItem.childList}
                className={updatedClassName}
                dataQa={adjustedMenuItem.dataQa}
                headerLink={adjustedMenuItem.link}
                icon={iconType}
                isLoggedIn={isLoggedIn}
                key={index}
                onHeaderClick={this.handleClick(adjustedMenuItem.menuTitle, index)}
                onLinkClick={this._onLinkClick}
                open={index === activeMenuIndex}
                menuTitle={menuTitle}
                titleClassName={titleClassName}
              />
            );
          } else if (adjustedMenuItem.isPromo) {
            return (
              <DynamicPlacement
                key={index}
                observerCallback={handleFirmOfferOfCreditFn}
                pageId={HAMBURGER_MENU_ID}
                {...adjustedMenuItem}
              />
            );
          } else {
            return (
              <OpenedMenuListItem
                className={className}
                isLoggedIn={isLoggedIn}
                key={index}
                menuItem={adjustedMenuItem}
                onLinkClick={this._onLinkClick}
                onLogoutClick={onLogoutClick}
              />
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeMenuIndex: state.app.homeAndNav.menuList.activeMenuIndex,
  featureToggleState: state.app.toggles
});

const mapDispatchToProps = {
  getSalesforceGuidFn: getSalesforceGuid,
  gotoEmailUsPageFn: gotoEmailUsPage,
  handleFirmOfferOfCreditFn: ChaseActions.handleFirmOfferOfCredit,
  setResetDrawerScrollFn: setResetDrawerScroll,
  updateActiveLinkIndexFn: updateActiveLinkIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);