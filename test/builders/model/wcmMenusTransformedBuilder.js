import NavDrawerConstants from 'src/homeAndNav/constants/navDrawerConstants';

const { ANDROID_URL, IOS_URL } = NavDrawerConstants;
const deviceLinks = { Android: ANDROID_URL, iOS: IOS_URL };

class WcmMenusTransformedBuilder {
  constructor() {
    this.menuData = [
      transformedHomeMenu,
      transformedCarMenu
    ];
  }

  withGetMobileAppMenu(deviceOS) {
    deviceLinks[deviceOS] && this.menuData.push({
      menuTitle: 'Get the mobile app',
      dataQa: 'get-the-mobile-app',
      className: 'menu-list--border-bottom menu-list__get-the-app-link',
      isAccordion: false,
      link: deviceLinks[deviceOS],
      childList: [],
      isWcmLink: false
    });

    return this;
  }

  withChangeTogglesMenu() {
    this.menuData.push(transformedChangeToggleMenu);

    return this;
  }

  withEnvSettingsMenu() {
    this.menuData.push(transformedEnvSettingsMenu);

    return this;
  }

  build() {
    return this.menuData;
  }
}

const
  transformedHomeMenu = {
    iconType: 'home',
    dataQa: 'menu-list-home',
    isAccordion: false,
    routeName: '/',
    menuTitle: 'Home',
    className:
      'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    childList: [],
    isWcmLink: true
  };

const
  transformedCarMenu = {
    iconType: 'car',
    menuTitle: 'Car',
    isAccordion: true,
    className:
      'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: undefined,
    hideForUsers: undefined,
    active: false,
    isWcmLink: true,
    childList: [
      {
        dataQa: 'menu-list-car-book-a-car',
        query: {
          int: 'GNAVBKCAR'
        },
        routeName: '/car/booking',
        title: 'Book a Car',
        isWcmLink: true
      },
      {
        dataQa: 'menu-list-car-lookup-reservations',
        query: {
          clk: 'GNAVCARVIEWRES',
          tab: 'CAR'
        },
        routeName: '/view-reservation',
        title: 'Look Up Reservations',
        isWcmLink: true
      }
    ]
  };

const
  transformedChangeToggleMenu = {
    active: false,
    childList: [],
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    menuTitle: 'CHANGE TOGGLES',
    routeName: '/feature-toggles',
    isAccordion: false,
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    isWcmLink: false
  };

const
  transformedEnvSettingsMenu = {
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
  };

module.exports = WcmMenusTransformedBuilder;
