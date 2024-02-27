import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import viewCarReservationDetailsInterceptor from 'src/shared/interceptors/viewCarReservationDetailsInterceptor';

describe('viewCarReservationDetailsInterceptor', () => {
  let action;
  let dispatchStub;
  let pushStub;
  let store;

  beforeEach(() => {
    dispatchStub = jest.fn();
    pushStub = jest.fn();

    action = { payload: { location: { state: undefined } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to home when car has already canceled', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: true,
          carReservation: {}
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });

    const result = viewCarReservationDetailsInterceptor({ store, history: { push: pushStub } });

    result.interceptor();

    expect(pushStub).toHaveBeenCalledWith('/');
  });

  it('should redirect to entry page when it is back/forward without car reservation', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: false,
          carReservation: {}
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });
    action = {
      payload: {
        routeState: {
          action: 'pop'
        }
      }
    };

    const result = viewCarReservationDetailsInterceptor({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });

    result.interceptor();

    expect(pushStub).toHaveBeenCalledWith('entry');
  });

  it('should not redirect to entry page when it is back/forward without car reservation with searchToken', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: false,
          carReservation: {}
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });
    action = {
      payload: {
        location: {
          search: '?searchToken=eracfw!ew1wg'
        },
        routeState: {
          action: 'pop'
        }
      }
    };

    viewCarReservationDetailsInterceptor({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });

    expect(pushStub).not.toHaveBeenCalled();
  });

  it('should redirect to entry page when it is refresh', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: false,
          carReservation: { car: 'reservation' }
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });
    action = {
      payload: {
        routeState: {
          action: null
        }
      }
    };

    const result = viewCarReservationDetailsInterceptor({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });

    result.interceptor();

    expect(pushStub).toHaveBeenCalledWith('entry');
  });

  it('should not redirect to entry page when it is refresh with searchToken', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: false,
          carReservation: { car: 'reservation' }
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });
    action = {
      payload: {
        location: {
          search: '?searchToken=eracfw!ew1wg'
        },
        routeState: {
          action: null
        }
      }
    };

    viewCarReservationDetailsInterceptor({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });

    expect(pushStub).not.toHaveBeenCalled();
  });

  it('should not return interceptor when it is pushed', () => {
    const state = {
      app: {
        viewReservation: {
          carCanceled: false,
          carReservation: { car: 'reservation' }
        }
      }
    };
    const action = {
      payload: {
        routeState: {
          action: 'push'
        }
      }
    };

    store = mockStore({ dispatch: dispatchStub, state });

    const result = viewCarReservationDetailsInterceptor({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });

    expect(result).toEqual({
      action,
      store,
      history: { push: pushStub },
      flowConfig: {
        entry: 'entry'
      }
    });
  });
});
