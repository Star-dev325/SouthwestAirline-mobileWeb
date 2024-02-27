import { sandbox } from 'sinon';
import Q from 'q';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as StandbyApi from 'src/shared/api/standbyApi';
import * as StandbyActions from 'src/standby/actions/standbyActions';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('standby actions', () => {
  let store;
  let query;

  beforeEach(() => {
    store = mockStore({});
    query = {};
  });

  afterEach(() => {
    sinon.restore();
  });

  context('checkStandbyNearAirport', () => {
    it('should call fetchStandbyList api', async () => {
      sinon.stub(StandbyApi, 'fetchStandbyList').returns(Q('response'));

      await store.dispatch(StandbyActions.checkStandbyNearAirport(query, false, false));

      expect(StandbyApi.fetchStandbyList).to.be.called;

      expect(store.getActions()).to.deep.equals([
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
      sinon.stub(StandbyApi, 'fetchStandbyList').returns(Q.reject('error'));

      await store.dispatch(StandbyActions.checkStandbyNearAirport(query, false, false));

      expect(store.getActions()[0]).to.deep.equals({
        type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
        isFetching: true,
        request: query
      });

      expect(store.getActions()[2].type).to.deep.equals('STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_FAILED');
      expect(store.getActions()[2].isFetching).to.deep.equals(false);
    });

    context('push to standby page', () => {
      beforeEach(() => {
        sinon.stub(StandbyApi, 'fetchStandbyList').returns(Q('response'));
      });

      it('should call push to standby and set isRevenue to false when fetchStandbyList and shouldPushToStandby is true and isRevenue is false', async () => {
        await store.dispatch(StandbyActions.checkStandbyNearAirport(query, true, false));

        expect(store.getActions()).to.deep.equals([
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
        await store.dispatch(StandbyActions.checkStandbyNearAirport(query, true, true));

        expect(store.getActions()).to.deep.equals([
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
    context('checkEnhancedStandbyNearAirport', () => {
      it('should call enhancedFetchStandbyList api', async () => {
        sinon.stub(StandbyApi, 'fetchEnhancedStandbyList').returns(Q('response'));

        await store.dispatch(StandbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(StandbyApi.fetchEnhancedStandbyList).to.be.called;

        expect(store.getActions()).to.deep.equal([
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
        sinon.stub(StandbyApi, 'fetchEnhancedStandbyList').returns(Q.reject('error'));

        await store.dispatch(StandbyActions.checkEnhancedStandbyNearAirport(query, false, false));

        expect(store.getActions()[0]).to.deep.equal({
          type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT',
          isFetching: true,
          request: query
        });

        expect(store.getActions()[2].type).to.deep.equal('STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_FAILED');
        expect(store.getActions()[2].isFetching).to.deep.equal(false);
      });

      context('push to standby page (enhanced)', () => {
        beforeEach(() => {
          sinon.stub(StandbyApi, 'fetchEnhancedStandbyList').returns(Q('response'));
        });

        it('should call push to standby and set isRevenue to false when enhancedFetchStandbyList and shouldPushToStandby is true and isRevenue is false', async () => {
          await store.dispatch(StandbyActions.checkEnhancedStandbyNearAirport(query, true, false));

          expect(store.getActions()).to.deep.equal([
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
          await store.dispatch(StandbyActions.checkEnhancedStandbyNearAirport(query, true, true));

          expect(store.getActions()).to.deep.equal([
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
