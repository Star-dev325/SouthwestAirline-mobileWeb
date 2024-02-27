import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();

describe('viewReservationActionErrorHandler', () => {
  let store;
  let viewReservationActionErrorHandler;
  let getNormalizedRouteFnStub;

  context('Coming from search view veservation', () => {
    beforeEach(() => {
      store = createMockStore()({
        app: {},
        persistentHistory: [{ pathname: '/view-reservation' }, { pathname: '/view-reservation/trip-details/U3FITG' }]
      });
      getNormalizedRouteFnStub = sinon.stub().returns('/view-reservation');
      viewReservationActionErrorHandler = proxyquire(
        'src/viewReservation/actions/actionErrorHelper/viewReservationActionErrorHandler',
        {
          'src/shared/redux/createStore': { store },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub }
        }
      );
    });

    it('should dispatch goback when it called', () => {
      const expectActions = [
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: [],
            method: 'goBack'
          }
        }
      ];

      viewReservationActionErrorHandler.retrieveFlightReservationErrorHandler();

      expect(store.getActions()).to.deep.equal(expectActions);
    });
  });

  context('Coming from whole link of view reservation details page', () => {
    beforeEach(() => {
      store = createMockStore()({
        app: {},
        persistentHistory: [{ pathname: '/view-reservation/trip-details/U3FITG' }]
      });
      viewReservationActionErrorHandler = proxyquire(
        'src/viewReservation/actions/actionErrorHelper/viewReservationActionErrorHandler',
        {
          'src/shared/redux/createStore': { store },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub }
        }
      );
    });

    it('should dispatch goback when it called', () => {
      const expectActions = [
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/view-reservation'],
            method: 'replace'
          }
        }
      ];

      viewReservationActionErrorHandler.retrieveFlightReservationErrorHandler();

      expect(store.getActions()).to.deep.equal(expectActions);
    });
  });

  context('Coming from branch redirect link', () => {
    beforeEach(() => {
      store = createMockStore()({
        app: {},
        persistentHistory: [{ pathname: '/redirect-branch' }, { pathname: '/view-reservation/trip-details/U3FITG' }]
      });
      viewReservationActionErrorHandler = proxyquire(
        'src/viewReservation/actions/actionErrorHelper/viewReservationActionErrorHandler',
        {
          'src/shared/redux/createStore': { store },
          'src/shared/helpers/urlHelper': { getNormalizedRoute: getNormalizedRouteFnStub }
        }
      );
    });

    it('should dispatch goback when it called', () => {
      const expectActions = [
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/view-reservation'],
            method: 'replace'
          }
        }
      ];

      viewReservationActionErrorHandler.retrieveFlightReservationErrorHandler();

      expect(store.getActions()).to.deep.equal(expectActions);
    });
  });
});
