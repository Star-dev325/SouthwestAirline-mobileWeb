import reducer from 'src/contactTracing/reducers/contactTracingReducer';
import Actions from 'src/contactTracing/actions/contactTracingActionTypes';

const {
  CONTACT_TRACING__PASSENGER_INDEX,
  CONTACT_TRACING__RESET_DATA,
  CONTACT_TRACING__SEARCH_REQUEST,
  CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL,
  CONTACT_TRACING__FETCH_CONTACT_TRACING_SUCCESS
} = Actions;

describe('Contact Tracing Reducer', () => {
  it('should return empty object on default action', () => {
    const state = reducer();

    expect(state).to.deep.equal({});
  });

  it('should update search parameters on search requested', () => {
    const state = reducer(
      {
        passengerIndex: 3
      },
      {
        type: CONTACT_TRACING__SEARCH_REQUEST,
        request: { confirmationNumber: 'ABC123' }
      }
    );

    expect(state).to.deep.equal({
      confirmationNumber: 'ABC123',
      passengerIndex: 0
    });
  });

  it('should add response on fetch success', () => {
    const state = reducer(
      {
        passengerIndex: 3
      },
      {
        type: CONTACT_TRACING__FETCH_CONTACT_TRACING_SUCCESS,
        response: { contactTracingPage: {} }
      }
    );

    expect(state).to.deep.equal({
      passengerIndex: 3,
      response: {
        contactTracingPage: {}
      }
    });
  });

  it('should update passenger index', () => {
    const state = reducer(
      {
        somePreExistingKey: true
      },
      {
        type: CONTACT_TRACING__PASSENGER_INDEX,
        passengerIndex: 2
      }
    );

    expect(state).to.deep.equal({
      somePreExistingKey: true,
      passengerIndex: 2
    });
  });

  it('should save contact tracing for all passengers', () => {
    const state = reducer(
      {
        somePreExistingKey: true
      },
      {
        type: CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL,
        passengerToApplyToAll: {
          passengerId: 'tesTID',
          saveToAll: true
        }
      }
    );

    expect(state).to.deep.equal({
      somePreExistingKey: true,
      passengerToApplyToAll: {
        passengerId: 'tesTID',
        saveToAll: true
      }
    });
  });

  it('should reset contact tracing', () => {
    const state = reducer(
      {
        passengerIndex: 2
      },
      {
        type: CONTACT_TRACING__RESET_DATA
      }
    );

    expect(state).to.deep.equal({});
  });

  it('should reset contact tracing', () => {
    const state = reducer(
      {
        passengerIndex: 2
      },
      {
        type: CONTACT_TRACING__RESET_DATA
      }
    );

    expect(state).to.deep.equal({});
  });
});
