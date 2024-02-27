jest.mock('src/shared/helpers/webViewHelper');
jest.mock('src/shared/routeUtils/routeStateHelper');
jest.mock('src/airUpgrade/actions/airUpgradeActions');
jest.mock('src/shared/actions/webViewActions');

import airUpgradeSelectBoundsInterceptor from 'src/shared/interceptors/airUpgradeSelectBoundsInterceptor';
import createMockStore from 'test/unit/helpers/configureMockStore';
import { getUpgradeFareReservation } from 'src/airUpgrade/actions/airUpgradeActions';
import { getCurrentRouteState, hasAllInState } from 'src/shared/routeUtils/routeStateHelper';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import { exitWebView } from 'src/shared/actions/webViewActions';

const mockStore = createMockStore();

describe('AirUpgradeSelectBoundsInterceptor', () => {
  const body = { passengerSearchToken: 'testToken' };
  const href = 'testHref';
  const landingPagePath = '/air/upgrade/select-bounds';
  const method = 'POST';
  const persistentHistory = 'persistentHistory';
  const state = { body, href, method };
  let store;

  beforeEach(() => {
    store = mockStore({ persistentHistory });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when isOnWebViewLandingPage is true', () => {
    it('should dispatch air upgrade action', () => {
      const airUpgradeAction = { type: 'air-upgrade-action' };
      const exitWebviewAction = { type: 'exit-webview-action' };

      getCurrentRouteState.mockReturnValue({ state });
      getUpgradeFareReservation.mockReturnValue(airUpgradeAction);
      hasAllInState.mockReturnValue(true);
      isOnWebViewLandingPage.mockReturnValue(true);
      exitWebView.mockReturnValue(exitWebviewAction);

      const result = airUpgradeSelectBoundsInterceptor(landingPagePath)({ store });

      result.interceptor();

      const mockErrorHandler = getUpgradeFareReservation.mock.calls[0][2];

      expect(store.getActions()).toMatchObject([airUpgradeAction]);
      expect(getCurrentRouteState).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPage).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(getUpgradeFareReservation).toHaveBeenCalledWith(
        { recordLocator: '', link: state },
        false,
        mockErrorHandler
      );
    });

    describe('when error handler is called', () => {
      it('should dispatch the exit webview action', () => {
        const exitWebviewAction = { type: 'exit-webview-action' };

        getCurrentRouteState.mockReturnValue({ state });
        hasAllInState.mockReturnValue(true);
        isOnWebViewLandingPage.mockReturnValue(true);
        exitWebView.mockReturnValue(exitWebviewAction);

        const result = airUpgradeSelectBoundsInterceptor(landingPagePath)({ store });

        result.interceptor();

        const mockErrorHandler = getUpgradeFareReservation.mock.calls[0][2];

        store.clearActions();
        mockErrorHandler();

        expect(store.getActions()).toMatchObject([exitWebviewAction]);
        expect(exitWebView).toHaveBeenCalled;
      });
    });
  });

  describe('when isOnWebViewLandingPage is false', () => {
    it('should not dispatch air upgrade action', () => {
      getCurrentRouteState.mockReturnValue({ state });
      hasAllInState.mockReturnValue(true);
      isOnWebViewLandingPage.mockReturnValue(false);

      const result = airUpgradeSelectBoundsInterceptor(landingPagePath)({ store });

      expect(result).toBeUndefined;
      expect(store.getActions()).toBeEmpty;
      expect(getCurrentRouteState).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPage).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(getUpgradeFareReservation).not.toHaveBeenCalled;
    });

    describe('when does not have route state', () => {
      it('should not dispatch air upgrade action', () => {
        getCurrentRouteState.mockReturnValue(undefined);
        hasAllInState.mockReturnValue(false);
        isOnWebViewLandingPage.mockReturnValue(false);

        const result = airUpgradeSelectBoundsInterceptor(landingPagePath)({ store });

        expect(result).toBeUndefined;
        expect(store.getActions()).toBeEmpty;
        expect(getCurrentRouteState).toHaveBeenCalledWith(persistentHistory);
        expect(isOnWebViewLandingPage).toHaveBeenCalledWith(persistentHistory, landingPagePath);
        expect(getUpgradeFareReservation).not.toHaveBeenCalled;
      });
    });
  });
});
