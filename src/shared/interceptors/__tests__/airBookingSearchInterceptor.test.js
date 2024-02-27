import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import AirportsActionTypes from 'src/airports/actions/airportsActionTypes';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import airBookingSearchInterceptor from 'src/shared/interceptors/airBookingSearchInterceptor';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';
import waitFor from 'test/unit/helpers/waitFor';

const mockStore = configureMockStore();

describe('airBookingSearchInterceptor', () => {
  const searchPagePath = '/search-page';
  let getCurrentRouteStateMock;
  let flowCleanerMock;
  let isOnWebViewLandingPageMock;

  beforeEach(() => {
    flowCleanerMock = jest.fn();
    getCurrentRouteStateMock = jest.spyOn(RouteStateHelper, 'getCurrentRouteState');
    isOnWebViewLandingPageMock = jest.spyOn(WebViewHelper, 'isOnWebViewLandingPage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isOnWebViewLandingPage false', () => {
    beforeEach(() => {
      isOnWebViewLandingPageMock.mockReturnValue(false);
    });

    it('should not run interceptor', (done) => {
      getCurrentRouteStateMock.mockReturnValue({
        pathname: searchPagePath,
        state: { origin: 'DAL', destination: 'AUS' }
      });

      const pageLoadCompleted = {
        type: 'PAGE_LOAD_COMPLETED',
        location: {
          pathname: '/search-page',
          state: {
            destination: 'AUS',
            origin: 'DAL'
          }
        },
        method: undefined
      };

      const searchForFlightsStub = jest.spyOn(AirBookingActions, 'searchForFlights');

      searchForFlightsStub.mockResolvedValue(pageLoadCompleted);
      const store = mockStore({});
      const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
      const result = airBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

      waitFor.untilAssertPass(() => {
        expect(result).toBeUndefined;
        expect(searchForFlightsStub).toNotHaveBeenCalled;
      }, done);
    });
  });

  describe('isOnWebViewLandingPage true', () => {
    beforeEach(() => {
      isOnWebViewLandingPageMock.mockReturnValue(true);
    });

    it('should run interceptor', (done) => {
      getCurrentRouteStateMock.mockReturnValue({
        pathname: searchPagePath,
        state: { origin: 'DAL', destination: 'AUS' }
      });

      const resetAirBookingFlowAction = { type: 'AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA' };

      const flowStatusChangeAction = {
        flowName: 'airBooking',
        status: 'in_progress',
        type: 'SET_FLOW_STATUS'
      };

      const pageLoadCompleted = {
        type: 'PAGE_LOAD_COMPLETED',
        location: {
          pathname: '/search-page',
          state: {
            destination: 'AUS',
            origin: 'DAL'
          }
        },
        method: undefined
      };

      const searchForFlightsStub = jest.spyOn(AirBookingActions, 'searchForFlights');

      searchForFlightsStub.mockReturnValue(() => Promise.resolve(pageLoadCompleted));

      const store = mockStore({});
      const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
      const result = airBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

      result.interceptor();

      waitFor.untilAssertPass(() => {
        expect(searchForFlightsStub).toHaveBeenCalled;
        expect(store.getActions()).toMatchObject([
          resetAirBookingFlowAction,
          flowStatusChangeAction,
          {
            type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
            formId: "origin"
          },
          {
            type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
            formId: "destination"
          },
          pageLoadCompleted
        ]);
      }, done);
    });

    it('should run interceptor for multi select group', (done) => {
      getCurrentRouteStateMock.mockReturnValue({
        pathname: searchPagePath,
        state: {
          origin: 'DAL',
          destination: 'AUS',
          multiSelectGroupOrigins: ['AUS', 'DAL'],
          multiSelectGroupDestinations: ['DAL', 'AUS']
        }
      });

      const pageLoadCompleted = {
        type: 'PAGE_LOAD_COMPLETED',
        location: {
          pathname: '/search-page',
          state: {
            destination: 'AUS',
            origin: 'DAL',
            multiSelectGroupOrigins: ['AUS', 'DAL'],
            multiSelectGroupDestinations: ['DAL', 'AUS']
          }
        },
        method: undefined
      };

      const searchForMultiSelectGroupFlightsStub = jest.spyOn(AirBookingActions, 'searchForMultiSelectGroupFlights');

      searchForMultiSelectGroupFlightsStub.mockReturnValue(() => Promise.resolve(pageLoadCompleted));

      const store = mockStore({});
      const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
      const result = airBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

      result.interceptor();

      waitFor.untilAssertPass(() => {
        expect(searchForMultiSelectGroupFlightsStub).toHaveBeenCalled;
      }, done);
    });
  });

  it('should run interceptor for multi select group with only destination', (done) => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: searchPagePath,
      state: {
        origin: 'DAL',
        destination: 'AUS',
        multiSelectGroupOrigins: null,
        multiSelectGroupDestinations: ['DAL', 'AUS']
      }
    });

    const pageLoadCompleted = {
      type: 'PAGE_LOAD_COMPLETED',
      location: {
        pathname: '/search-page',
        state: {
          destination: 'AUS',
          origin: 'DAL',
          multiSelectGroupOrigins: null,
          multiSelectGroupDestinations: ['DAL', 'AUS']
        }
      },
      method: undefined
    };

    const searchForMultiSelectGroupFlightsStub = jest.spyOn(AirBookingActions, 'searchForMultiSelectGroupFlights');

    searchForMultiSelectGroupFlightsStub.mockReturnValue(() => Promise.resolve(pageLoadCompleted));

    const store = mockStore({});
    const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
    const result = airBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

    result.interceptor();

    waitFor.untilAssertPass(() => {
      expect(searchForMultiSelectGroupFlightsStub).toHaveBeenCalled;
      expect(store.getActions()[2]).toMatchObject(
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
          formId: "origin"
        }
      );
    }, done);
  });

  it('should run interceptor for multi select group with only origin', (done) => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: searchPagePath,
      state: {
        origin: 'DAL',
        destination: 'AUS',
        multiSelectGroupOrigins: ['AUS', 'DAL'],
        multiSelectGroupDestinations: null
      }
    });

    const pageLoadCompleted = {
      type: 'PAGE_LOAD_COMPLETED',
      location: {
        pathname: '/search-page',
        state: {
          destination: 'AUS',
          origin: 'DAL',
          multiSelectGroupOrigins: ['AUS', 'DAL'],
          multiSelectGroupDestinations: null
        }
      },
      method: undefined
    };

    const searchForMultiSelectGroupFlightsStub = jest.spyOn(AirBookingActions, 'searchForMultiSelectGroupFlights');

    searchForMultiSelectGroupFlightsStub.mockReturnValue(() => Promise.resolve(pageLoadCompleted));

    const store = mockStore({});
    const flowConfig = mockFlowConfig({ flowCleaner: flowCleanerMock });
    const result = airBookingSearchInterceptor(searchPagePath)({ store, flowConfig });

    result.interceptor();

    waitFor.untilAssertPass(() => {
      expect(searchForMultiSelectGroupFlightsStub).toHaveBeenCalled;
      expect(store.getActions()[2]).toMatchObject(
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
          formId: "destination"
        }
      );
    }, done);
  });
});
