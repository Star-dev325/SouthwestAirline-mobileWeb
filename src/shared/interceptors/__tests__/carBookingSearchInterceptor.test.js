import { mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import carBookingSearchInterceptor from 'src/shared/interceptors/carBookingSearchInterceptor';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';

const mockStore = configureMockStore();

describe('carBookingSearchInterceptor', () => {
  const searchPagePath = '/search-page';
  let getCurrentRouteStateMock;
  let flowCleanerMock;
  let isOnWebViewLandingPageMock;
  let hasAllInStateMock;

  beforeEach(() => {
    flowCleanerMock = jest.fn();
    getCurrentRouteStateMock = jest.spyOn(RouteStateHelper, 'getCurrentRouteState');
    isOnWebViewLandingPageMock = jest.spyOn(WebViewHelper, 'isOnWebViewLandingPage');
    hasAllInStateMock = jest.spyOn(RouteStateHelper, 'hasAllInState');
  });

  describe('isOnWebViewLandingPage false', () => {
    beforeEach(() => {
      isOnWebViewLandingPageMock.mockReturnValue(false);
    });

    describe('should return interceptor context', () => {
      it('when on search page and showing a modal', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: searchPagePath });
        jest.spyOn(FullScreenModalHelper, 'getModalId').mockReturnValue('modal_id');

        const store = mockStore({});
        const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
        const interceptorContext = { store, flowConfig };
        const result = carBookingSearchInterceptor(searchPagePath)(interceptorContext);

        expect(store.getActions()).toBeEmpty;
        expect(flowCleanerMock).toNotHaveBeenCalled;
        expect(result).toMatchObject(interceptorContext);
      });
    });
  });

  describe('isOnWebViewLandingPage true', () => {
    beforeEach(() => {
      isOnWebViewLandingPageMock.mockReturnValue(true);
    });

    describe('hasAllInState true', () => {
      beforeEach(() => {
        hasAllInStateMock.mockReturnValue(true);
      });
      
      it('when valid state exists', () => {
        getCurrentRouteStateMock.mockReturnValue({
          pathname: searchPagePath,
          state: { pickUp: 'ABC', dropOff: 'CBA' }
        });

        const action = { type: 'saveSelectedRecentSearchRequest' };
        const saveSelectedRecentSearchRequestStub = jest.spyOn(CarBookingActions, 'saveSelectedRecentSearchRequest');

        saveSelectedRecentSearchRequestStub.mockReturnValue(action);

        const store = mockStore({});
        const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
        const result = carBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

        result.interceptor();

        expect(saveSelectedRecentSearchRequestStub).toHaveBeenCalled;
        expect(store.getActions()).toMatchObject([action]);
        expect(flowCleanerMock).toNotHaveBeenCalled;
      });
    });

    describe('hasAllInState false', () => {
      beforeEach(() => {
        hasAllInStateMock.mockReturnValue(false);
      });
      
      it('when valid state does not exist', () => {
        getCurrentRouteStateMock.mockReturnValue({
          pathname: searchPagePath,
          state: { pickUp: 'ABC', dropOff: 'CBA' }
        });

        const action = { type: 'saveSelectedRecentSearchRequest' };
        const saveSelectedRecentSearchRequestStub = jest.spyOn(CarBookingActions, 'saveSelectedRecentSearchRequest');

        saveSelectedRecentSearchRequestStub.mockReturnValue(action);

        const store = mockStore({});
        const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
        const result = carBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

        result.interceptor();

        expect(saveSelectedRecentSearchRequestStub).toNotHaveBeenCalled;
        expect(flowCleanerMock).toHaveBeenCalled;
      });
    });
  });
});
