import _ from 'lodash';
import appConfig from 'src/shared/config/appConfig';
import { getTheAppLink } from 'src/homeAndNav/helpers/menuListDataHelper';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';
import { MenuListData } from 'src/homeAndNav/constants/menuListData';

const _transformNavDrawerContentChildren = (navDrawerContent) =>
  _.map(navDrawerContent.children, (node) => _wcmMenuTransformer(node));

export const wcmMenuListDataTransformer = (wcmMenus) => {
  let transformedMwebMenus;
  const wcmNavDrawerNavTop = _.get(wcmMenus, 'results.navTop.content.placement.navDrawer.navDrawerContent', []);
  const wcmNavDrawerNavBottom = _.get(wcmMenus, 'results.navBottom.content.placement.navDrawer.navDrawerContent', []);

  const isContentEmpty = _.isEmpty(wcmNavDrawerNavTop) && _.isEmpty(wcmNavDrawerNavBottom);

  const wcmNavDrawerNavTopTransformed = _.flatten(
    _.map(wcmNavDrawerNavTop, (navTop) => _transformNavDrawerContentChildren(navTop))
  );
  const wcmNavDrawerNavBottomTransformed = _.flatten(
    _.map(wcmNavDrawerNavBottom, (navBottom) => _transformNavDrawerContentChildren(navBottom))
  );

  const wcmNavDrawerPromo1 = toDynamicPlacement(wcmMenus, 'navPromo1');
  const wcmNavDrawerPromo1Transformed = wcmNavDrawerPromo1 ? _.merge({}, wcmNavDrawerPromo1, { isPromo: true }) : [];

  transformedMwebMenus = _.concat(
    wcmNavDrawerNavTopTransformed,
    wcmNavDrawerPromo1Transformed,
    wcmNavDrawerNavBottomTransformed
  );

  _addGetMobileAppMenu(transformedMwebMenus);

  if (appConfig.userCanChangeToggles()) {
    transformedMwebMenus = transformedMwebMenus.concat(featureTogglePageLink);
  }

  return isContentEmpty ? MenuListData : _.compact(transformedMwebMenus);
};

const _addGetMobileAppMenu = (mwebMenus) => {
  const menuTitle = 'Contact Us';
  const indexToInsertAfter = _.findIndex(mwebMenus, ['menuTitle', menuTitle]) + 1;
  const getMobileAppMenu = getTheAppLink();

  getMobileAppMenu && mwebMenus.splice(indexToInsertAfter, 0, getMobileAppMenu);
};

const _wcmMenuTransformer = (wcmMenu) => {
  const hasChildren = !_.isEmpty(wcmMenu.children);
  const { title, canExpand, style, hideForGuest, hideForUsers, isAutoExpanded, children, linkType, target } = wcmMenu;
  const menu = {
    iconType: _.get(_.find(ICON_LOOKUP, ['wcmName', wcmMenu.icon]), 'iconType'),
    menuTitle: title,
    isAccordion: canExpand,
    className: _getHeaderContainerStyle(style),
    titleClassName: _getHeaderFontStyle(style),
    isExtrasMenu: !hasChildren,
    hideForGuest: !!hideForGuest,
    hideForUsers: !!hideForUsers,
    active: isAutoExpanded,
    childList: _.map(children, (child) => _wcmChildMenuTransformer(child)),
    routeName: !hasChildren && linkType === 'app' ? target : undefined,
    link: !hasChildren && (linkType === 'browser' || linkType === 'webView') ? target : undefined,
    linkType,
    isWcmLink: true
  };

  return menu;
};

const _wcmChildMenuTransformer = (wcmChildMenu) => {
  const { title, style, icon, hideForGuest, hideForUsers, clickCode, linkType, target } = wcmChildMenu;
  const child = {
    title,
    className: _getChildFontStyle(style),
    icon: _.get(_.find(CHILD_ICON_LOOKUP, ['wcmName', icon]), 'iconType'),
    hideForGuest: !!hideForGuest,
    hideForUsers: !!hideForUsers,
    query: clickCode && { clk: clickCode },
    routeName: linkType === 'app' ? target : undefined,
    link: linkType === 'browser' || linkType === 'webview' ? target : undefined,
    linkType,
    isWcmLink: true
  };

  return child;
};

const _getHeaderContainerStyle = (style) => {
  let fontStyle = 'menu-list-item--heading-title-nav-normal-no-children';

  if (style === 'bold') {
    fontStyle = 'menu-list--border-bottom menu-list-item--heading-title-nav-bold';
  } else if (style === 'semi-bold') {
    fontStyle = 'menu-list--border-bottom menu-list-item--heading-title-nav-semi-bold';
  }

  return fontStyle;
};

const _getHeaderFontStyle = (style) => {
  let fontStyle = 'menu-list-item--heading-title-nav-normal-no-children';

  if (style === 'bold') {
    fontStyle = 'menu-list-item--heading-title-nav-bold';
  } else if (style === 'semi-bold') {
    fontStyle = 'menu-list-item--heading-title-nav-semi-bold';
  }

  return fontStyle;
};

const _getChildFontStyle = (style) => {
  let fontStyle = 'menu-list-item--body-item-title-nav-normal';

  if (style === 'bold') {
    fontStyle = 'menu-list-item--body-item-title-nav-bold';
  } else if (style === 'semi-bold') {
    fontStyle = 'menu-list-item--body-item-title-nav-semi-bold';
  }

  return fontStyle;
};

const ICON_LOOKUP = [
  {
    wcmName: 'HOME',
    iconType: 'home'
  },
  {
    wcmName: 'PLANE',
    iconType: 'flight'
  },
  {
    wcmName: 'CAR',
    iconType: 'car'
  },
  {
    wcmName: 'HOTEL',
    iconType: 'hotel'
  },
  {
    wcmName: 'VACATION',
    iconType: 'vacation'
  },
  {
    wcmName: 'POINTS',
    iconType: 'points'
  },
  {
    wcmName: 'nav_bag_icon',
    iconType: 'bag'
  }
];

const CHILD_ICON_LOOKUP = [
  {
    wcmName: 'BROWSER_LINK',
    iconType: 'ic-external-link'
  },
  {
    wcmName: 'PHONE',
    iconType: 'call-us'
  },
  {
    wcmName: 'EMAIL',
    iconType: 'email-us'
  },
  {
    wcmName: 'TWITTER',
    iconType: 'twitter-2'
  },
  {
    wcmName: 'FACEBOOK',
    iconType: 'facebook-2'
  },
  {
    wcmName: 'FEEDBACK',
    iconType: 'ic-feedback'
  },
  {
    wcmName: 'CHAT',
    iconType: 'chat-with-us'
  }
];

export const featureTogglePageLink = [
  {
    active: false,
    childList: [],
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    dataQa: 'feature-toggles',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    menuTitle: 'CHANGE TOGGLES',
    routeName: '/feature-toggles',
    isAccordion: false,
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    isWcmLink: false
  },
  {
    active: false,
    childList: [],
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    menuTitle: 'ENVIRONMENT SETTINGS',
    routeName: '/view-app-config',
    isAccordion: false,
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    isWcmLink: false
  },
  {
    active: false,
    childList: [],
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    menuTitle: 'GENERATE ERROR',
    routeName: '/generate-error',
    isAccordion: false,
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    isWcmLink: false
  }
];
