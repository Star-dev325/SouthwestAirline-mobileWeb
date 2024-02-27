import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';
import * as MenuListActions from 'src/homeAndNav/actions/menuListActions';
import browser from 'src/shared/helpers/browserObject';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

const { HOME_NAV__UPDATE_ACTIVE_LINK_INDEX } = homeAndNavActionTypes;

describe('MenuListActions', () => {
  const GUID = 'TEST_GUID';
  let openInBrowserMock;
  let store;

  beforeEach(() => {
    openInBrowserMock = jest.spyOn(browser.window, 'open');
    store = mockStore({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('updateActiveLinkIndex', () => {
    expect(MenuListActions.updateActiveLinkIndex(3)).toEqual({
      type: HOME_NAV__UPDATE_ACTIVE_LINK_INDEX,
      payload: 3
    });
  });

  describe('gotoEmailUsPage', () => {
    const email360Link = 'https://360.com/';

    it('should redirect to 360 email url without guid and hide menu when user is not logged in', () => {
      store.dispatch(MenuListActions.gotoEmailUsPage(email360Link));

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US'
        },
        {
          payload: false,
          type: 'HOME_NAV__TOGGLE_MENU_DRAWER'
        },
        {
          isFetching: false,
          response: email360Link,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US_SUCCESS'
        }
      ]);

      expect(openInBrowserMock).toHaveBeenCalledWith(email360Link, '_blank');
    });

    it('should redirect to 360 email url with guid and hide menu when user is logged in and getSalesforceGuidMock returns successfully', async () => {
      store = mockStore({
        app: {
          account: {
            salesforceGuid: 'TEST_GUID'
          }
        }
      });

      await store.dispatch(MenuListActions.gotoEmailUsPage(email360Link));

      const linkWithGuid = `https://360.com?guid=${GUID}`;

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US'
        },
        {
          payload: false,
          type: 'HOME_NAV__TOGGLE_MENU_DRAWER'
        },
        {
          isFetching: false,
          response: linkWithGuid,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US_SUCCESS'
        }
      ]);

      expect(openInBrowserMock).toHaveBeenCalledWith(linkWithGuid, '_blank');
    });

    it('should redirect to 360 email url with guid and hide menu when user is logged in and getSalesforceGuidMock returns successfully, when the URL does not have a trailing slash', async () => {
      store = mockStore({
        app: {
          account: {
            salesforceGuid: 'TEST_GUID'
          }
        }
      });

      await store.dispatch(MenuListActions.gotoEmailUsPage('https://360.com'));

      const linkWithGuid = `https://360.com?guid=${GUID}`;

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US'
        },
        {
          payload: false,
          type: 'HOME_NAV__TOGGLE_MENU_DRAWER'
        },
        {
          isFetching: false,
          response: linkWithGuid,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US_SUCCESS'
        }
      ]);

      expect(openInBrowserMock).toHaveBeenCalledWith(linkWithGuid, '_blank');
    });

    it('should redirect to 360 email url without guid and hide menu when user is logged in and getSalesforceGuidMock fails', async () => {
      await store.dispatch(MenuListActions.gotoEmailUsPage(email360Link));

      expect(store.getActions()).toEqual([
        {
          isFetching: true,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US'
        },
        {
          payload: false,
          type: 'HOME_NAV__TOGGLE_MENU_DRAWER'
        },
        {
          isFetching: false,
          response: email360Link,
          type: 'HOME_NAV__NAVIGATE_TO_EMAIL_US_SUCCESS'
        }
      ]);

      expect(openInBrowserMock).toHaveBeenCalledWith(email360Link, '_blank');
    });
  });
});
