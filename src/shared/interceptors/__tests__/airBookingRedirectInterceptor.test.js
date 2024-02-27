import airBookingRedirectInterceptor from 'src/shared/interceptors/airBookingRedirectInterceptor';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('airBookingRedirectInterceptor', () => {
  const landingPagePath = '/air/booking/shopping';
  let getStateStub;
  let mockAction;
  let mockHistory;
  let mockInterceptorContext;
  let replaceStub;
  let store;

  beforeEach(() => {
    getStateStub = jest.fn().mockReturnValue({ app: {} });
    replaceStub = jest.fn();
    mockHistory = { replace: replaceStub };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to /air/booking', () => {
    createMockInterceptorContext('/air/booking');
    const result = airBookingRedirectInterceptor(landingPagePath)(mockInterceptorContext);

    result.interceptor();

    expect(replaceStub).toHaveBeenCalled();
  });

  it('should trigger replace when going to /air/booking/', () => {
    createMockInterceptorContext('/air/booking/');
    const result = airBookingRedirectInterceptor(landingPagePath)(mockInterceptorContext);

    result.interceptor();

    expect(replaceStub).toHaveBeenCalled();
  });

  it('should not trigger replace when going to /air/booking/shopping', () => {
    createMockInterceptorContext('/air/booking/shopping');

    const result = airBookingRedirectInterceptor(landingPagePath)(mockInterceptorContext);

    expect(result).toBeUndefined();
  });

  const createMockInterceptorContext = (pathname) => {
    mockAction = {
      type: 'SHARED__ROUTE_CHANGED',
      location: {
        pathname
      }
    };
    store = {
      ...mockStore,
      getState: getStateStub
    };
    mockInterceptorContext = { store, action: mockAction, history: mockHistory };
  };
});
