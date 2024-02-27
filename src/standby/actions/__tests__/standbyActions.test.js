jest.mock('src/shared/api/standbyApi', () => ({
  fetchStandbyList: jest.fn(),
  fetchEnhancedStandbyList: jest.fn()
}));
jest.mock('src/shared/selectors/appSelector', () => ({
  getCurrentAppFlow: jest.fn()
}));

import * as standbyApi from 'src/shared/api/standbyApi';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import * as standbyActions from 'src/standby/actions/standbyActions';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('standby actions', () => {
  let store;
  let query;

  beforeEach(() => {
    store = mockStore({});
    query = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkStandbyNearAirport', () => {
    it('should call fetchStandbyList api', async () => {
      standbyApi.fetchStandbyList.mockResolvedValueOnce('response');

      await store.dispatch(standbyActions.checkStandbyNearAirport(query, false, false));

      expect(standbyApi.fetchStandbyList).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        {
          type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
          isFetching: true,
          request: query
        },
        {
          flowName: 'standby',
          status: 'initial',
          type: 'SET_FLOW_STATUS'
        },
        {
          type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
          isFetching: false,
          response: 'response'
        },
        {
          flowName: 'standby',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        }
      ]);
    });

    it('should call failed action when fetchStandbyList api call fails', async () => {
      standbyApi.fetchStandbyList.mockRejectedValueOnce('error');

      await store.dispatch(standbyActions.checkStandbyNearAirport(query, false, false));

      expect(store.getActions()[0]).toEqual({
        type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
        isFetching: true,
        request: query
      });

      expect(store.getActions()[2].type).toEqual('STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_FAILED');
      expect(store.getActions()[2].isFetching).toEqual(false);
    });

    describe('push to standby page', () => {
      beforeEach(() => {
        standbyApi.fetchStandbyList.mockResolvedValueOnce('response');
      });

      it('should call push to standby and set isRevenue to false when fetchStandbyList and shouldPushToStandby is true and isRevenue is false', async () => {
        await store.dispatch(standbyActions.checkStandbyNearAirport(query, true, false));

        expect(store.getActions()).toEqual([
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
            isFetching: true,
            request: query
          },
          {
            flowName: 'standby',
            status: 'initial',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
            isFetching: false,
            response: 'response'
          },
          {
            flowName: 'standby',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'STANDBY__SAVE_IS_REVENUE',
            isRevenue: false
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              args: ['/standby'],
              method: 'push'
            }
          }
        ]);
      });

      it('should call push to standby and set isRevenue to true when fetchStandbyList and shouldPushToStandby is true and isRevenue is true', async () => {
        await store.dispatch(standbyActions.checkStandbyNearAirport(query, true, true));

        expect(store.getActions()).toEqual([
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
            isFetching: true,
            request: query
          },
          {
            flowName: 'standby',
            status: 'initial',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
            isFetching: false,
            response: 'response'
          },
          {
            flowName: 'standby',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'STANDBY__SAVE_IS_REVENUE',
            isRevenue: true
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              args: ['/standby'],
              method: 'push'
            }
          }
        ]);
      });
    });
  });

  describe('enhanced standby actions', () => {
    describe('checkEnhancedStandbyNearAirport', () => {
      it('should call enhancedFetchStandbyList api', async () => {
        standbyApi.fetchEnhancedStandbyList.mockResolvedValueOnce('response');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(standbyApi.fetchEnhancedStandbyList).toHaveBeenCalled();

        expect(store.getActions()).toEqual([
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
            isFetching: true,
            request: query
          },
          {
            flowName: 'standby',
            status: 'initial',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
            isFetching: false,
            response: 'response'
          },
          {
            flowName: 'standby',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          }
        ]);
      });

      it('should call failed action when enhancedFetchStandbyList api call fails', async () => {
        standbyApi.fetchEnhancedStandbyList.mockRejectedValueOnce('error');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[0]).toEqual({
          type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
          isFetching: true,
          request: query
        });

        expect(store.getActions()[2].type).toEqual('STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_FAILED');
        expect(store.getActions()[2].isFetching).toEqual(false);
      });

      it('should return to home page when search token expires on same-day', async () => {
        const error = { responseJSON: { code: 400308278 } };

        standbyApi.fetchEnhancedStandbyList.mockRejectedValueOnce('error');
        getCurrentAppFlow.mockReturnValueOnce('same-day');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[2].shouldRedirectToHomePage({}, error)).toEqual(true);
      });

      it('should return to home page when search token expires on standby', async () => {
        const error = { responseJSON: { code: 400308278 } };

        standbyApi.fetchEnhancedStandbyList.mockRejectedValueOnce('error');
        getCurrentAppFlow.mockReturnValueOnce('standby');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[2].shouldRedirectToHomePage({}, error)).toEqual(true);
      });

      it('should not return to home page when error is not an expired search token', async () => {
        const state = undefined;
        const error = { responseJSON: { code: 99999999 } };

        standbyApi.fetchEnhancedStandbyList.mockRejectedValueOnce('error');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[2].shouldRedirectToHomePage(state, error)).toEqual(false);
      });

      it('should not return to home page when search token expires and not same-day or standby', async () => {
        const state = { router: { location: { pathname: '/test' } } };
        const error = { responseJSON: { code: 400308278 } };

        standbyApi.fetchEnhancedStandbyList.mockRejectedValueOnce('error');

        await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[2].shouldRedirectToHomePage(state, error)).toEqual(false);
      });

      describe('push to standby page (enhanced)', () => {
        beforeEach(() => {
          standbyApi.fetchEnhancedStandbyList.mockResolvedValueOnce('response');
        });

        it('should call push to standby and set isRevenue to false when enhancedFetchStandbyList and shouldPushToStandby is true and isRevenue is false', async () => {
          await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, true, false));

          expect(store.getActions()).toEqual([
            {
              type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
              isFetching: true,
              request: query
            },
            {
              flowName: 'standby',
              status: 'initial',
              type: 'SET_FLOW_STATUS'
            },
            {
              type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
              isFetching: false,
              response: 'response'
            },
            {
              flowName: 'standby',
              status: 'in_progress',
              type: 'SET_FLOW_STATUS'
            },
            {
              type: 'STANDBY__SAVE_IS_REVENUE',
              isRevenue: false
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: {
                args: ['/standby', {}],
                method: 'push'
              }
            }
          ]);
        });

        it('should call push to standby and set isRevenue to true when enhancedFetchStandbyList and shouldPushToStandby is true and isRevenue is true', async () => {
          await store.dispatch(standbyActions.checkEnhancedStandbyNearAirport(query, true, true));

          expect(store.getActions()).toEqual([
            {
              type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
              isFetching: true,
              request: query
            },
            {
              flowName: 'standby',
              status: 'initial',
              type: 'SET_FLOW_STATUS'
            },
            {
              type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
              isFetching: false,
              response: 'response'
            },
            {
              flowName: 'standby',
              status: 'in_progress',
              type: 'SET_FLOW_STATUS'
            },
            {
              type: 'STANDBY__SAVE_IS_REVENUE',
              isRevenue: true
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: {
                args: ['/standby', {}],
                method: 'push'
              }
            }
          ]);
        });
      });
    });
  });
});
