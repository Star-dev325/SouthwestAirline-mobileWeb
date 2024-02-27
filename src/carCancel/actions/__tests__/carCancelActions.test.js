jest.mock('src/shared/api/carCancelApi.js');
jest.mock('src/shared/helpers/hapticFeedbackHelper', () => ({
  playHapticFeedback: jest.fn()
}));
jest.mock('src/viewReservation/actions/viewReservationActions');

import * as CarCancelActions from 'src/carCancel/actions/carCancelActions';
import * as CarCancelApi from 'src/shared/api/carCancelApi';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import upcomingCarTripDetailBuilder from 'test/builders/apiResponse/upcomingCarTripDetailBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import waitFor from 'test/unit/helpers/waitFor';

const CarCancelApiMock = jest.mocked(CarCancelApi);
const mockStore = configureMockStore();
const ViewReservationActionsMock = jest.mocked(ViewReservationActions);

describe('carCancelActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cancelCarReservation', () => {
    it('should dispatch correct actions when fetch car cancel reservation failed', (done) => {
      CarCancelApiMock.cancelCarReservation.mockRejectedValueOnce('error');
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('reservation');

      const reservation = upcomingCarTripDetailBuilder.build();
      const expectedActions = [
        {
          flowName: 'carCancel',
          type: 'CLEAR_FLOW_STATUS'
        },
        {
          flowName: 'carCancel',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: true,
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION'
        },
        {
          error: 'error',
          isFetching: false,
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_FAILED'
        },
        {
          payload: {
            args: ['/car/cancel-reservation/summary.html'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(CarCancelActions.cancelCarReservationAndTransitionToConfirmationPage(reservation));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, done);
    });

    it('should dispatch correct actions when fetch car cancel reservation successfully and transition to confirmation page', (done) => {
      CarCancelApiMock.cancelCarReservation.mockResolvedValueOnce({});

      const reservation = upcomingCarTripDetailBuilder.build();
      const expectedActions = [
        { type: 'CLEAR_FLOW_STATUS', flowName: 'carCancel' },
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'carCancel',
          status: 'in_progress'
        },
        {
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION',
          isFetching: true
        },
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'carCancel',
          status: 'completed'
        },
        {
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_SUCCESS',
          isFetching: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/car/cancel-reservation/summary.html'] }
        }
      ];

      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('reservation');

      store.dispatch(CarCancelActions.cancelCarReservationAndTransitionToConfirmationPage(reservation));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, done);
    });

    it('should dispatch correct actions when fetch car cancel reservation successfully and transition to confirmation page with searchToken', (done) => {
      CarCancelApiMock.cancelCarReservation.mockResolvedValueOnce({});

      const reservation = upcomingCarTripDetailBuilder.build();
      const expectedActions = [
        { type: 'CLEAR_FLOW_STATUS', flowName: 'carCancel' },
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'carCancel',
          status: 'in_progress'
        },
        {
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION',
          isFetching: true
        },
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'carCancel',
          status: 'completed'
        },
        {
          type: 'CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_SUCCESS',
          isFetching: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/car/cancel-reservation/summary.html?searchToken=aw1!sdfasdfasdfasdfasdfsadsfdadfasd'] }
        }
      ];

      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('reservation');

      store.dispatch(CarCancelActions.cancelCarReservationAndTransitionToConfirmationPage(reservation, 'aw1!sdfasdfasdfasdfasdfsadsfdadfasd'));

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, done);
    });

    it('should dispatch correct actions when fetch car cancel reservation successfully and transition to confirmation page with searchToken', async () => {
      ViewReservationActionsMock.retrieveCarReservationWithSearchToken.mockImplementationOnce(() => () => Promise.resolve());
      CarCancelApiMock.cancelCarReservation.mockResolvedValueOnce({});

      await store.dispatch(CarCancelActions.retrieveAndCancelCarReservationWithSearchToken('aw1!sdfasdfasdfasdfasdfsadsfdadfasd'));

      expect(ViewReservationActionsMock.retrieveCarReservationWithSearchToken).toHaveBeenCalledWith('aw1!sdfasdfasdfasdfasdfsadsfdadfasd');
      expect(CarCancelApiMock.cancelCarReservation).toHaveBeenCalled();
    });

    it('should play haptic feedback when purchase succeeds', async () => {
      CarCancelApiMock.cancelCarReservation.mockResolvedValueOnce({});
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('reservation');

      const reservation = upcomingCarTripDetailBuilder.build();

      await store.dispatch(CarCancelActions.cancelCarReservationAndTransitionToConfirmationPage(reservation));

      expect(playHapticFeedback).toBeCalled();
    });
  });
});
