jest.mock('src/shared/helpers/browserObject', () => ({
  location: { pathname: 'test' },
  window: { embedded_svc: { inviteAPI: { inviteButton: { acceptInvite: jest.fn() } } } }
}));
import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { MenuList } from 'src/homeAndNav/components/menuList';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('menuList', () => {
  let acceptInviteMock;
  let filterFeatureToggleLinksFnMock;
  let getSalesforceGuidFnMock;
  let gotoEmailUsPageFnMock;
  let handleFirmOfferOfCreditFnMock;
  let onLinkClickMock;
  let onLogoutClickMock;
  let satelliteTrackMock;
  let setResetDrawerScrollFnMock;
  let toggleDrawerMock;
  let updateActiveLinkIndexFnMock;

  beforeEach(() => {
    acceptInviteMock = jest.fn();
    filterFeatureToggleLinksFnMock = jest.fn();
    getSalesforceGuidFnMock = jest.fn();
    gotoEmailUsPageFnMock = jest.fn();
    handleFirmOfferOfCreditFnMock = jest.spyOn(ChaseActions, 'handleFirmOfferOfCredit');
    onLinkClickMock = jest.fn();
    onLogoutClickMock = jest.fn();
    satelliteTrackMock = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    setResetDrawerScrollFnMock = jest.fn();
    toggleDrawerMock = jest.fn();
    updateActiveLinkIndexFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hardcoded menus', () => {
    it('should call original link when item title is not `Manage Bookings`', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });

    it('should call original link when item title is `Manage Bookings` but user is not logged-in', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });

    it('should add link with `e45` parameter when item title is `Manage Bookings` and user is logged-in', () => {
      const { container } = createComponent({ isLoggedIn: true });

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });

    it('should call gotoEmailUsPageFn when item title is `Email`', () => {
      const { container } = createComponent({ listData: listDataEmailUs });

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(gotoEmailUsPageFnMock).toHaveBeenCalledWith('https://defaultlink.com');
      expect(acceptInviteMock).not.toHaveBeenCalled();
      expect(onLinkClickMock).not.toHaveBeenCalled();
    });

    it('should call window.embedded_svc.inviteAPI.inviteButton.acceptInvite() when item icon is `chat-with-us`', () => {
      const { container } = createComponent({ listData: listDataChat });

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(toggleDrawerMock).toHaveBeenCalledWith(true);
      expect(BrowserObject.window.embedded_svc.inviteAPI.inviteButton.acceptInvite).toHaveBeenCalled();
      expect(onLinkClickMock).not.toHaveBeenCalled();
    });

    it('should raise a satellite event to track a chat link click when item icon is `chat-with-us`', () => {
      const { container } = createComponent({ listData: listDataChat });

      fireEvent.click(container.querySelector('[data-link="/fake/path"]'));

      expect(satelliteTrackMock).toHaveBeenCalledWith('link:chatbot');
    });

    it('should contain `Email` menu item in `Contact Us` Menu when item.link is specified', () => {
      const { container } = createComponent({ listData: listDataEmailUs });

      expect(container.querySelector('[data-link="/fake/path"]')).not.toBeNull();
    });

    it("should remove a child from the accordion if that item's toggle is false", () => {
      const { container } = createComponent({ listData: listDataTwoChildren });

      expect(container.querySelectorAll('div.menu-list__flights')).toHaveLength(1);
    });
  });

  describe('handleClick', () => {
    it('should fire the handleClick function when an accordion parent is clicked', () => {
      const titleClassName = 'title-class-name';

      const props = {
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: true,
            menuTitle: 'Parent Menu',
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(setResetDrawerScrollFnMock).toHaveBeenCalled();
    });

    it('should fire the handleClick function when an accordion parent is clicked and call the getSalesforceGuidFn when the accordion item is Contact Us and the user is logged in', () => {
      const titleClassName = 'title-class-name';

      const props = {
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: true,
            menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US'),
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(getSalesforceGuidFnMock).toHaveBeenCalled();
      expect(setResetDrawerScrollFnMock).toHaveBeenCalled();
    });

    it('should fire the handleClick function when an accordion parent is clicked and call the getSalesforceGuidFn when the activeMenuIndex does not match the clicked index', () => {
      const titleClassName = 'title-class-name';

      const props = {
        activeMenuIndex: 1,
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: true,
            menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US'),
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.accordion--heading'));

      expect(setResetDrawerScrollFnMock).toHaveBeenCalledWith(true);
    });
  });

  describe('onLinkClick', () => {
    it('should fire the onLinkClick function and then set the correct link when the user is logged in and the clicked item title is HOME_AND_NAV__MENU_LIST__MANAGE_BOOKINGS', () => {
      const titleClassName = 'title-class-name';

      const props = {
        activeMenuIndex: 1,
        isLoggedIn: true,
        listData: [
          {
            childList: [
              {
                link: 'https://defaultlink.com',
                routeName: '/fake/path',
                title: i18n('HOME_AND_NAV__MENU_LIST__MANAGE_BOOKINGS')
              }
            ],
            className: 'class-name',
            isAccordion: true,
            menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US'),
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.menu-list-item--body-item'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });
  });

  describe('wcmMenu', () => {
    it('should pass isLoggedIn and titleClassName to MenuListItem', () => {
      const titleClassName = 'title-class-name';

      const props = {
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: true,
            menuTitle: 'Parent Menu',
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should pass isLoggedIn to OpenedMenuListItem', () => {
      const props = {
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: false,
            menuTitle: 'Parent Menu'
          }
        ]
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    describe('should hide parent menu', () => {
      it('when hideForUsers is true', () => {
        const titleClassName = 'title-class-name';

        const props = {
          isLoggedIn: true,
          listData: [
            {
              className: 'class-name',
              hideForUsers: true,
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container).toMatchSnapshot();
      });

      it('when isLoggedIn is false and hideForGuest is true', () => {
        const titleClassName = 'title-class-name';

        const props = {
          isLoggedIn: false,
          listData: [
            {
              className: 'class-name',
              hideForUsers: true,
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container).toMatchSnapshot();
      });
    });

    it('should display menu when isLoggedIn is true and hideForGuest is true', () => {
      const titleClassName = 'title-class-name';

      const props = {
        isLoggedIn: true,
        listData: [
          {
            className: 'class-name',
            isAccordion: true,
            menuTitle: 'Parent Menu',
            titleClassName
          }
        ]
      };
      const { container } = createComponent(props);

      expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
    });

    describe('child menus', () => {
      it('should pass childList to MenuListItem', () => {
        const props = {
          listData: [
            {
              childList: [
                {
                  routeName: 'route',
                  title: 'Child Menu'
                }
              ],
              className: 'class-name',
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName: 'title-class-name'
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
        expect(container.querySelector('.menu-list i.icon')).not.toBeNull();
      });

      it('should pass empty childList to MenuListItem when child hideForUsers is true', () => {
        const props = {
          listData: [
            {
              childList: [
                {
                  hideForUsers: true,
                  routeName: 'route',
                  title: 'Child Menu'
                }
              ],
              className: 'class-name',
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName: 'title-class-name'
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
        expect(container.querySelector('.menu-list i.icon')).toBeNull();
      });

      it('should pass childList to MenuListItem when child hideForGuest is true and logged in', () => {
        const props = {
          isLoggedIn: true,
          listData: [
            {
              childList: [
                {
                  hideForGuest: true,
                  routeName: 'route',
                  title: 'Child Menu'
                }
              ],
              className: 'class-name',
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName: 'title-class-name'
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
        expect(container.querySelector('.menu-list i.icon')).not.toBeNull();
      });

      it('should pass empty childList to MenuListItem when child hideForGuest is true', () => {
        const props = {
          listData: [
            {
              childList: [
                {
                  hideForGuest: true,
                  routeName: 'route',
                  title: 'Child Menu'
                }
              ],
              className: 'class-name',
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName: 'title-class-name'
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
        expect(container.querySelector('.menu-list i.icon')).toBeNull();
      });

      it('should pass empty childList to MenuListItem when child hideForGuest is true and not logged in', () => {
        const props = {
          isLoggedIn: false,
          listData: [
            {
              childList: [
                {
                  hideForGuest: true,
                  routeName: 'route',
                  title: 'Child Menu'
                }
              ],
              className: 'class-name',
              isAccordion: true,
              menuTitle: 'Parent Menu',
              titleClassName: 'title-class-name'
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.menu-list .title-class-name')).not.toBeNull();
        expect(container.querySelector('.menu-list i.icon')).toBeNull();
      });

      it('should render Dynamic Placement when isPromo', () => {
        const { container } = createComponent({ listData: listDataPromo });

        expect(container.querySelector('.dynamic-placement')).not.toBeNull();
      });

      describe('should not render Dynamic Placement', () => {
        it('when isPromo is false', () => {
          const updatedListDataPromo = { ...listDataPromo[0], isPromo: false };
          const { container } = createComponent(updatedListDataPromo);

          expect(container.querySelector('.dynamic-placement')).toBeNull();
        });
      });
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      activeMenuIndex: 0,
      featureToggleState: {
        linkType: '',
        optionName: '',
        target_android: '',
        target_ios: '',
        target_mweb: ''
      },
      filterFeatureToggleLinksFn: filterFeatureToggleLinksFnMock,
      getSalesforceGuidFn: getSalesforceGuidFnMock,
      gotoEmailUsPageFn: gotoEmailUsPageFnMock,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnMock,
      isLoggedIn: false,
      listData: listDataTwoChildren,
      onLinkClick: onLinkClickMock,
      onLogoutClick: onLogoutClickMock,
      setResetDrawerScrollFn: setResetDrawerScrollFnMock,
      toggleDrawer: toggleDrawerMock,
      updateActiveLinkIndexFn: updateActiveLinkIndexFnMock
    };
    const finalProps = { ...defaultProps, ...props };
    const state = configureMockStore()({
      account: {
        isLoggedIn: false
      },
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return integrationRender()(state, MenuList, finalProps);
  }
});
const listDataTwoChildren = [
  {
    active: true,
    childList: [
      {
        routeName: '/fake/path',
        title: 'First Fake Nav Item'
      },
      {
        routeName: '/another/fake/path',
        title: 'Second Fake Nav Item'
      }
    ],
    className: 'menu-list__flights',
    dataQa: 'menu-list-flight',
    iconType: 'flight',
    isAccordion: true,
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__FLIGHT')
  }
];
const listDataEmailUs = [
  {
    active: true,
    childList: [
      {
        link: 'https://defaultlink.com',
        routeName: '/fake/path',
        title: i18n('HOME_AND_NAV__MENU_LIST__EMAIL_US')
      }
    ],
    className: 'menu-list__email',
    dataQa: 'menu-list-email',
    iconType: 'email',
    isAccordion: true,
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US')
  }
];

const listDataChat = [
  {
    active: true,
    childList: [
      {
        icon: 'chat-with-us',
        link: 'https://defaultlink.com',
        routeName: '/fake/path',
        title: i18n('HOME_AND_NAV__MENU_LIST__CHAT_WITH_US')
      }
    ],
    className: 'menu-list__chat',
    dataQa: 'menu-list-chat',
    iconType: 'chat',
    isAccordion: true,
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__CONTACT_US')
  }
];

const listDataPromo = [
  {
    backgroundImage: '/image/path',
    backgroundImageAltText: 'image alt text',
    blocks: [],
    childList: [],
    contentBlockId: '12345',
    displayType: 'displayType',
    isChaseCombo: false,
    isPromo: true,
    linkType: 'webview',
    shouldObserveViewPort: false,
    target: 'target',
    viewPortThreshold: 1
  }
];
