import i18n from '@swa-ui/locale';
import { flightStatusOldRoutes } from 'src/flightStatus/constants/flightStatusRoutes';
import { sitePaths } from 'src/shared/constants/siteLinks';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

const MenuList = [
  {
    active: false,
    childList: [],
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    hideForGuest: false,
    hideForUsers: false,
    iconType: 'home',
    isAccordion: false,
    isExtrasMenu: true,
    link: undefined,
    linkType: 'app',
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__HOME'),
    routeName: '/',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isWcmLink: true
  },
  {
    iconType: 'flight',
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__FLIGHT'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: true,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__BOOK_A_FLIGHT'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVBKFLT'
        },
        routeName: '/air/booking?cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__CHECK_IN'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVCHCKIN'
        },
        routeName: getNormalizedRoute({ routeName: 'checkInIndex' }),
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__FLIGHT_STATUS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVFLTSTATUS'
        },
        routeName: flightStatusOldRoutes['indexWithClearForm'],
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__LOOKUP_RESERVATIONS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVFLTRES'
        },
        routeName: '/view-reservation?tab=FLIGHT&cleanFlow=true&clearFormData=false',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__ADD_EARLY_BIRD_CHECK_IN'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVEARLYBIRD'
        },
        routeName: '/earlybird/checkin',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__LOOK_UP_TRAVEL_FUNDS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVTRVLFUNDS'
        },
        routeName: '/travel-funds/look-up?clearFormData=false&cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__SPECIAL_OFFERS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVSPOFFERS'
        },
        routeName: 'https://www.southwest.com/html/specialoffers/air-offers.html',
        linkType: 'browser',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    iconType: 'car',
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CAR'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__BOOK_A_CAR'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVBKCAR'
        },
        routeName: '/car/booking?cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__LOOKUP_RESERVATIONS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVCARVIEWRES'
        },
        routeName: '/view-reservation?tab=CAR&cleanFlow=true&clearFormData=false',
        linkType: 'app',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    iconType: 'hotel',
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__HOTEL'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__BOOK_A_HOTEL'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'ic-external-link',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwesthotels.com/index.html?label=SWA-MOBILE-MENUBOOK-MWEB&ref=LinkMobileWeb&clk=MOBILEMENU',
        linkType: 'browser',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__LOOKUP_RESERVATIONS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'ic-external-link',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://secure.southwesthotels.com/mybooking.en-us.html?label=SWA-MOBILE-MENUMANAGE-MWEB&ref=LinkMobileWeb&clk=MOBILEMENU&aid=2012072',
        linkType: 'browser',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    iconType: 'vacation',
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__VACATIONS'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-bold',
    titleClassName: 'menu-list-item--heading-title-nav-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__BOOK_A_VACATION'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'ic-external-link',
        hideForGuest: false,
        hideForUsers: false,
        link: sitePaths.bookAVacation,
        linkType: 'browser',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__MANAGE_VACATIONS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'ic-external-link',
        hideForGuest: false,
        hideForUsers: false,
        link: sitePaths.manageVacations,
        linkType: 'browser',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__FLYING_SOUTHWEST'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-semi-bold',
    titleClassName: 'menu-list-item--heading-title-nav-semi-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__ABOUT_SOUTHWEST'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVFLYSWA'
        },
        routeName: '/flying-southwest?cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__WHERE_WE_FLY'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVFLTWHERE'
        },
        routeName: '/where-we-fly?cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__WHERE_WE_FLY'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/destinations/route-expansion?clk=gnavnewdest-mweb',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__NEW_DESTINATIONS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/737-max',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__ENROLL_IN_RAPID_REWARDS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVRR'
        },
        routeName: '/rapid-rewards?cleanFlow=true',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__EMAIL_ENROLL'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: '/email-enroll?cleanFlow=true&clk=GNAVEMAIL',
        linkType: 'webview',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__FAQ'),
    isAccordion: true,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-semi-bold',
    titleClassName: 'menu-list-item--heading-title-nav-semi-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__KNOW_BEFORE_YOU_TRAVEL'),
        className: 'menu-list-item--body-item-title-nav-normal',
        dataQa: 'menu-list-faq-know-before-you-travel',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/promise/?clk=GNAVFAQWhatToKnow-Promise',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__CORONAVIRUS_TRAVEL_UPDATES'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/coronavirus/?clk=GNAVFAQCorona',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__CHANGE_YOUR_FLIGHT'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/faq/changing-flights?clk=GNAVFAQChangeCancel',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__REFUNDS_AND_TRAVEL_FUNDS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/faq/travel-funds?clk=GNAVFAQTravelFundsRefunds',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__RAPID_REWARDS_UPDATES'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/RRCoronavirusUpdates?clk=GNAVFAQRRCoronaUpdates',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__FARE_BENEFITS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/airfare-types-benefits/?clk=GNAVFAQFareBenefits',
        linkType: 'webview',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__VIEW_ALL_TOPICS'),
        className: 'menu-list-item--body-item-title-nav-normal',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.southwest.com/faq/?clk=GNAVFAQAllTopics',
        linkType: 'webview',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US'),
    isAccordion: false,
    className: 'menu-list--border-bottom menu-list-item--heading-title-nav-semi-bold',
    titleClassName: 'menu-list-item--heading-title-nav-semi-bold',
    isExtrasMenu: false,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    isWcmLink: true,
    childList: [
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__CALL'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'call-us',
        hideForGuest: false,
        hideForUsers: false,
        query: {
          clk: 'GNAVCONTACTUS'
        },
        routeName: '/contact-us',
        linkType: 'app',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__EMAIL_US'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'email-us',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://support.southwest.com/email-us/s/',
        linkType: 'browser',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__TWEET'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'twitter-2',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://twitter.com/messages/compose?recipient_id=7212562',
        linkType: 'browser',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__FOLLOW'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'facebook-2',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://m.facebook.com',
        linkType: 'browser',
        isWcmLink: true
      },
      {
        title: i18n('HOME_AND_NAV__MENU_LIST__FEEDBACK'),
        className: 'menu-list-item--body-item-title-nav-normal',
        icon: 'ic-feedback',
        hideForGuest: false,
        hideForUsers: false,
        link: 'https://www.surveysouthwest.com/jfe/form/SV_9BpNvIPnO7FyaBn',
        linkType: 'browser',
        isWcmLink: true
      }
    ],
    linkType: null
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__VISIT_SOUTHWEST_DOTCOM'),
    isAccordion: false,
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    childList: [],
    link: 'https://mobile.southwest.com',
    linkType: 'browser',
    isWcmLink: true
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__THE_SOUTHWEST_COMMUNITY'),
    isAccordion: false,
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    childList: [],
    link: 'https://community.southwest.com/',
    linkType: 'browser',
    isWcmLink: true
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__SWABIZ'),
    isAccordion: false,
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    childList: [],
    link: 'https://www.swabiz.com/?clk=GNAVSWABIZ',
    linkType: 'browser',
    isWcmLink: true
  },
  {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__SOUTHWEST_CARGO'),
    isAccordion: false,
    className: 'menu-list-item--heading-title-nav-normal-no-children',
    titleClassName: 'menu-list-item--heading-title-nav-normal-no-children',
    isExtrasMenu: true,
    hideForGuest: false,
    hideForUsers: false,
    active: false,
    childList: [],
    link: 'https://www.swacargo.com/?clk=GNAVCARGO',
    linkType: 'browser',
    isWcmLink: true
  }
];

export default MenuList;
