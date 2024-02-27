import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { defaultSearchRequest } from 'src/airBooking/helpers/shoppingLandingPageHelper';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import airBookingLandingPageInterceptor from 'src/shared/interceptors/airBookingLandingPageInterceptor';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('AirBookingLandingPageInterceptor', () => {
  const landingPagePath = 'landingPagePath';

  let isOnWebViewLandingPageMock;
  let getCurrentRouteStateMock;
  let updateFlightSearchRequestMock;
  let resetFlightSearchRequestMock;
  let clearFormDataByIdMock;

  beforeEach(() => {
    isOnWebViewLandingPageMock = jest.spyOn(WebViewHelper, 'isOnWebViewLandingPage');
    getCurrentRouteStateMock = jest.spyOn(RouteStateHelper, 'getCurrentRouteState');
    updateFlightSearchRequestMock = jest.spyOn(AirBookingActions, 'updateFlightSearchRequestAndSyncToFormData');
    resetFlightSearchRequestMock = jest.spyOn(AirBookingActions, 'resetFlightSearchRequest');
    clearFormDataByIdMock = jest.spyOn(FormDataActions, 'clearFormDataById');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should return interceptor', () => {
    it('when on webview landing page and has route state', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });
      const state = { data: 'data' };
      const updateAction = { type: 'update-action' };
      const resetAction = { type: 'reset-action' };
      const clearAction = { type: 'clear-action' };
      const expectedState = { ...defaultSearchRequest, ...state };

      getCurrentRouteStateMock.mockReturnValue({ state });
      isOnWebViewLandingPageMock.mockReturnValue(true);
      resetFlightSearchRequestMock.mockReturnValue(resetAction);
      updateFlightSearchRequestMock.mockReturnValue(updateAction);
      clearFormDataByIdMock.mockReturnValue(clearAction);

      const result = airBookingLandingPageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).toEqual([clearAction, resetAction, updateAction]);

      expect(getCurrentRouteStateMock).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPageMock).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(updateFlightSearchRequestMock).toHaveBeenCalledWith(expectedState, false);
      expect(clearFormDataByIdMock).toHaveBeenCalledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM);
    });

    it('when on webview landing page and has route state with departureDate', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });
      const state = { departureDate: '2025-12-01' };
      const updateAction = { type: 'update-action' };
      const resetAction = { type: 'reset-action' };
      const clearAction = { type: 'clear-action' };
      const expectedState = { ...defaultSearchRequest, ...state };

      getCurrentRouteStateMock.mockReturnValue({ state });
      isOnWebViewLandingPageMock.mockReturnValue(true);
      resetFlightSearchRequestMock.mockReturnValue(resetAction);
      updateFlightSearchRequestMock.mockReturnValue(updateAction);
      clearFormDataByIdMock.mockReturnValue(clearAction);

      const result = airBookingLandingPageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).toEqual([clearAction, resetAction, updateAction]);

      expect(getCurrentRouteStateMock).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPageMock).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(updateFlightSearchRequestMock).toHaveBeenCalledWith(expectedState, true);
      expect(clearFormDataByIdMock).toHaveBeenCalledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM);
    });

    it('when on webview landing page and has no route sate', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });
      const resetAction = { type: 'reset-action' };
      const clearAction = { type: 'clear-action' };

      getCurrentRouteStateMock.mockReturnValue(undefined);
      isOnWebViewLandingPageMock.mockReturnValue(true);
      resetFlightSearchRequestMock.mockReturnValue(resetAction);
      clearFormDataByIdMock.mockReturnValue(clearAction);

      const result = airBookingLandingPageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).toEqual([clearAction, resetAction]);

      expect(getCurrentRouteStateMock).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPageMock).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(clearFormDataByIdMock).toHaveBeenCalledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM);
    });
  });

  describe('should not return interceptor', () => {
    it('when not on webview landing page', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });
      const state = { data: 'data' };

      getCurrentRouteStateMock.mockReturnValue({ state });
      isOnWebViewLandingPageMock.mockReturnValue(false);

      const result = airBookingLandingPageInterceptor(landingPagePath)({ store });

      expect(result).toBeUndefined;
      expect(store.getActions()).toEqual([]);

      expect(getCurrentRouteStateMock).toHaveBeenCalledWith(persistentHistory);
      expect(isOnWebViewLandingPageMock).toHaveBeenCalledWith(persistentHistory, landingPagePath);
      expect(updateFlightSearchRequestMock).not.toHaveBeenCalled();
    });
  });
});
