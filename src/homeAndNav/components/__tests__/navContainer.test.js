jest.mock('src/shared/helpers/deviceInfo', () => ({
  os: {
    name: 'iOS'
  }
}));
jest.mock('src/shared/config/appConfig', () => ({
  userCanChangeToggles: jest.fn().mockReturnValue(true)
}));
import { fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import * as DrawerActions from 'src/homeAndNav/actions/drawerActions';
import { NavContainer } from 'src/homeAndNav/components/navContainer';
import * as MenuListData from 'src/homeAndNav/constants/menuListData';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import deviceInfo from 'src/shared/helpers/deviceInfo';
import WcmMenusTransformedBuilder from 'test/builders/model/wcmMenusTransformedBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('NavContainer', () => {
  let listData;
  let onLoginClickMock;
  let onNavClickMock;
  let toggleDrawerFnMock;
  let updateContentBlockIdsFromMenuListFnMock;

  beforeEach(() => {
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    onLoginClickMock = jest.fn();
    onNavClickMock = jest.fn();
    toggleDrawerFnMock = jest.spyOn(DrawerActions, 'toggleDrawer');
    updateContentBlockIdsFromMenuListFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderNavContainer(props = {}, menuData) {
    const listData = menuData ? menuData : MenuListData.MenuListData;
    const defaultProps = {
      isDrawerOpen: false,
      isLoggedIn: false,
      isLogin: false,
      menuList: listData,
      onLoginClick: onLoginClickMock,
      onLogoutClick: () => {},
      onNavClick: onNavClickMock,
      toggleDrawerFn: toggleDrawerFnMock,
      updateContentBlockIdsFromMenuListFn: updateContentBlockIdsFromMenuListFnMock,
      userInfo: {
        isLogin: false,
        name: 'test'
      }
    };

    const componentProps = { ...defaultProps, ...props };

    const state = configureMockStore()({
      app: {
        account: {
          isLoggedIn: false
        },
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        homeAndNav: {
          menuList: {
            activeMenuIndex: 1,
            listData: componentProps.menuList
          }
        }
      }
    });

    return integrationRender()(state, NavContainer, componentProps);
  }

  beforeEach(() => {
    listData = getListData();
  });

  afterEach(() => {
    jest.clearAllMocks();
    deviceInfo.os.name = 'iOS';
  });

  describe('contact label', () => {
    describe('multiple mounting', () => {
      it('should show only one get the app link', () => {
        deviceInfo.os.name = 'Android';
        listData = getListData('Android');

        // Multiple mount of this page
        const { unmount } = renderNavContainer({}, listData);

        unmount();

        const { container } = renderNavContainer({}, listData);

        expect(container.querySelectorAll('[data-qa="get-the-mobile-app"]')).toHaveLength(1);
      });
    });

    describe('android', () => {
      it('should have get the mobile app label pointing to the play store', () => {
        deviceInfo.os.name = 'Android';
        listData = getListData('Android');

        const { container } = renderNavContainer({}, listData);
        const pageComponent = container.querySelector('[data-qa="get-the-mobile-app"]');

        fireEvent.click(pageComponent.querySelector('.menu-list-item--heading'));

        expect(onNavClickMock.mock.calls[0][0].link).toEqual(
          'https://play.google.com/store/apps/details?id=com.southwestairlines.mobile&hl=en'
        );
        expect(toggleDrawerFnMock).toHaveBeenCalledWith(true);
      });
    });

    describe('ios', () => {
      it('should have get the ios app label pointing to the app store', () => {
        listData = getListData('iOS');

        const { container } = renderNavContainer({}, listData);
        const pageComponent = container.querySelector('[data-qa="get-the-mobile-app"]');

        fireEvent.click(pageComponent.querySelector('.menu-list-item--heading'));

        expect(onNavClickMock.mock.calls[0][0].link).toEqual(
          'https://itunes.apple.com/us/app/southwest-airlines/id344542975'
        );
        expect(toggleDrawerFnMock).toHaveBeenCalledWith(true);
      });
    });

    describe('other OS', () => {
      it('should not have get the ios app label', () => {
        deviceInfo.os.name = 'Windows';
        listData = getListData('Windows');

        const { container } = renderNavContainer({}, listData);

        expect(container.querySelector('[data-qa="get-the-mobile-app"]')).toBeNull();
      });
    });
  });

  describe('#onLinkClick', () => {
    it('should pass onLogoutClick function to MenuList', () => {
      const { container } = renderNavContainer({}, listData);

      expect(container).toMatchSnapshot();
    });

    it('should pass query parameters to transition function', () => {
      const { container } = renderNavContainer({}, listData);

      fireEvent.click(container.querySelector('[data-link="/view-reservation"]'));

      expect(onNavClickMock.mock.calls[0][0].routeName).toEqual('/view-reservation');
      expect(onNavClickMock.mock.calls[0][0].query).toEqual({ clk: 'GNAVCARVIEWRES', tab: 'CAR' });
    });
  });

  describe('#onDrawerLoginClicked', () => {
    it('should pass query parameters to onLoginClick', () => {
      const { container } = renderNavContainer({}, listData);

      fireEvent.click(container.querySelector('.drawer-login'));

      expect(onLoginClickMock).toHaveBeenCalled();
    });
  });

  describe('feature toggles', () => {
    describe('when in an environment where user can change them', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      describe('the feature toggle page link', () => {
        let featureTogglePageLink;

        it('should exist', () => {
          const { container } = renderNavContainer({}, listData);

          featureTogglePageLink = container.querySelectorAll('.container')[1];

          expect(featureTogglePageLink.textContent).toContain('CHANGE TOGGLES');
        });

        it('should transition to the feature toggle page when clicked', () => {
          const { container } = renderNavContainer({}, listData);

          featureTogglePageLink = container.querySelectorAll('.container')[1];

          fireEvent.click(featureTogglePageLink.querySelector('.menu-list-item--heading'));

          expect(onNavClickMock.mock.calls[0][0].routeName).toEqual('/feature-toggles');
        });
      });

      describe('the environment settings page link', () => {
        let environmentSettingLink;

        it('should exist', () => {
          const { container } = renderNavContainer({}, listData);

          environmentSettingLink = container.querySelectorAll('.container')[2];

          expect(environmentSettingLink.textContent).toContain('ENVIRONMENT SETTINGS');
        });

        it('should transition to the view app config page when clicked', () => {
          const { container } = renderNavContainer({}, listData);

          environmentSettingLink = container.querySelectorAll('.container')[2];

          fireEvent.click(environmentSettingLink.querySelector('.menu-list-item--heading'));

          expect(onNavClickMock.mock.calls[0][0].routeName).toEqual('/view-app-config');
        });
      });
    });
  });

  describe('analytics', () => {
    it('should be called when drawer is open', () => {
      const props = {
        isDrawerOpen: true
      };

      renderNavContainer(props, listData);

      expect(updateContentBlockIdsFromMenuListFnMock).toHaveBeenCalledWith(listData);
      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('overlay:hamburger navigation');
    });
  });
});

const getListData = (deviceOS = 'undefined') =>
  new WcmMenusTransformedBuilder().withGetMobileAppMenu(deviceOS).withChangeTogglesMenu().withEnvSettingsMenu().build();
