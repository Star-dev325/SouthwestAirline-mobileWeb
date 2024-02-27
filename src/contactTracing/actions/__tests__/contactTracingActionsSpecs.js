import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as Actions from 'src/contactTracing/actions/contactTracingActions';
import * as ReservationApi from 'src/shared/api/reservationApi';
import Q from 'q';

const mockStore = createMockStore();
const sinon = sandbox.create();

describe('Contact Tracing Reducer', () => {
  let store;
  let retrieveContactTracingStub;
  let updateContactTracingStub;

  beforeEach(() => {
    store = mockStore({});
    retrieveContactTracingStub = sinon.stub(ReservationApi, 'retrieveContactTracing');
    updateContactTracingStub = sinon.stub(ReservationApi, 'updateContactTracing');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch reset action', async () => {
    await store.dispatch(Actions.resetData());

    expect(store.getActions()).deep.equals([
      {
        type: 'CONTACT_TRACING__RESET_DATA'
      }
    ]);
  });

  it('should dispatch update passenger index action', async () => {
    await store.dispatch(Actions.updatePassengerIndex(2));

    expect(store.getActions()).deep.equals([
      {
        type: 'CONTACT_TRACING__PASSENGER_INDEX',
        passengerIndex: 2
      }
    ]);
  });

  it('should dispatch search and navigation events on goToContactTracing', async () => {
    await store.dispatch(Actions.goToContactTracing({ method: 'GET' }, 'ABC123'));

    expect(store.getActions()).deep.equals([
      {
        request: {
          search: {
            confirmationNumber: 'ABC123',
            link: {
              method: 'GET'
            }
          }
        },
        type: 'CONTACT_TRACING__SEARCH_REQUEST'
      },
      {
        payload: {
          args: ['/contact-tracing'],
          method: 'push'
        },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ]);
  });

  it('should dispatch successful events on retrieve contact tracing', async () => {
    const response = {
      contactTracingPage: {
        passengers: []
      }
    };

    retrieveContactTracingStub.returns(Q(response));
    await store.dispatch(
      Actions.retrieveContractTracing({
        link: { method: 'POST' },
        confirmationNumber: 'ABC123'
      })
    );

    expect(store.getActions()).deep.equals([
      {
        isFetching: true,
        request: {
          confirmationNumber: 'ABC123',
          link: {
            method: 'POST'
          }
        },
        type: 'CONTACT_TRACING__FETCH_CONTACT_TRACING'
      },
      {
        isFetching: false,
        response: {
          confirmationNumber: 'ABC123',
          passengers: []
        },
        type: 'CONTACT_TRACING__FETCH_CONTACT_TRACING_SUCCESS'
      }
    ]);
  });

  it('should dispatch error events on retrieve contact tracing error', async () => {
    retrieveContactTracingStub.returns(Q.reject('error'));
    await store.dispatch(Actions.retrieveContractTracing({ link: { method: 'POST' } }));

    expect(store.getActions()).deep.equals([
      {
        isFetching: true,
        request: {
          link: {
            method: 'POST'
          }
        },
        type: 'CONTACT_TRACING__FETCH_CONTACT_TRACING'
      },
      {
        error: 'error',
        isFetching: false,
        type: 'CONTACT_TRACING__FETCH_CONTACT_TRACING_FAILED'
      }
    ]);
  });

  it('should dispatch successful events on update contact tracing', async () => {
    const update = {
      passengers: []
    };
    const mockResponse = {
      contactTracingUpdate: {
        message: {
          key: 'CONTACT_TRACING'
        }
      }
    };
    const onCompleteStub = sinon.stub();

    updateContactTracingStub.returns(Q(mockResponse));

    await store.dispatch(Actions.updateContactTracing(onCompleteStub, { link: { method: 'POST' }, update }));

    expect(store.getActions()).deep.equals([
      {
        isFetching: true,
        request: {
          method: 'POST'
        },
        type: 'CONTACT_TRACING__SAVE_CONTACT_TRACING'
      },
      {
        isFetching: false,
        response: mockResponse,
        type: 'CONTACT_TRACING__SAVE_CONTACT_TRACING_SUCCESS'
      }
    ]);

    expect(updateContactTracingStub).to.have.been.calledWith({ method: 'POST' }, update);
    expect(onCompleteStub).to.have.been.calledWith(mockResponse.contactTracingUpdate.message);
  });

  it('should dispatch updatePassengerToApplyToAll', async () => {
    const passengerToApplyToAll = {
      saveToAll: true,
      passengerId: 'testId'
    };

    updateContactTracingStub.returns(Q({}));

    await store.dispatch(Actions.updatePassengerToApplyToAll(passengerToApplyToAll));

    expect(store.getActions()).deep.equals([
      {
        type: 'CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL',
        passengerToApplyToAll
      }
    ]);
  });

  it('should dispatch updatePassengerToApplyToAll', async () => {
    const passengerToApplyToAll = {
      saveToAll: true,
      passengerId: 'testId'
    };

    updateContactTracingStub.returns(Q({}));

    await store.dispatch(Actions.updatePassengerToApplyToAll(passengerToApplyToAll));

    expect(store.getActions()).deep.equals([
      {
        type: 'CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL',
        passengerToApplyToAll
      }
    ]);
  });

  it('should dispatch error events on update contact tracing error', async () => {
    const update = {
      passengers: []
    };
    const onCompleteStub = sinon.stub();

    updateContactTracingStub.returns(Q.reject('error'));

    await store.dispatch(Actions.updateContactTracing(onCompleteStub, { link: { method: 'POST' }, update }));

    expect(store.getActions()).deep.equals([
      {
        isFetching: true,
        request: {
          method: 'POST'
        },
        type: 'CONTACT_TRACING__SAVE_CONTACT_TRACING'
      },
      {
        error: 'error',
        isFetching: false,
        type: 'CONTACT_TRACING__SAVE_CONTACT_TRACING_FAILED'
      }
    ]);

    expect(updateContactTracingStub).to.have.been.calledWith({ method: 'POST' }, update);
    expect(onCompleteStub).not.to.have.been.called;
  });
});
