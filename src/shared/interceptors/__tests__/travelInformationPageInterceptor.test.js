import travelInformationPageInterceptor from 'src/shared/interceptors/travelInformationPageInterceptor';
import * as AppSelector from 'src/shared/selectors/appSelector';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('travelInformationPageInterceptor', () => {
  let replaceStub;
  let mockedStore;

  beforeEach(() => {
    replaceStub = jest.fn();
    mockedStore = mockStore(() => ({
      app: {
        account: {
          isLoggedIn: false
        }
      }
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('browser refresh', () => {
    let action;

    beforeEach(() => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
      action = {
        payload: {
          routeState: {
            action: null,
            state: undefined
          }
        }
      };
    });

    it('should not go back when it is push', () => {
      const action = {
        payload: {
          routeState: {
            action: 'push'
          }
        }
      };

      const result = travelInformationPageInterceptor(false)({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });

      expect(result).toEqual({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });
    });

    it('should not navigate when it is push with valid state', () => {
      action = {
        payload: {
          routeState: {
            action: 'push',
            state: {
              firstName: 'first',
              lastName: 'last'
            }
          }
        }
      };

      const result = travelInformationPageInterceptor(true)({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });

      expect(result).toEqual({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });
    });

    it('should not navigate when it is push with searchToken in location', () => {
      action = {
        payload: {
          location: {
            search: '?searchToken=eracfw!ew1wg'
          }
        }
      };

      const result = travelInformationPageInterceptor(true)({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });

      expect(result).toEqual({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });
    });

    it('should navigate to beginning of the view-res flow when browser refresh and user logged out', () => {
      const result = travelInformationPageInterceptor(false)({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });

      result.interceptor();

      expect(replaceStub).toHaveBeenCalledWith('/air/manage-reservation/');
    });

    it('should navigate to beginning of the upcoming trips flow when browser refresh and user logged in', () => {
      const result = travelInformationPageInterceptor(false)({
        action,
        history: { replace: replaceStub },
        store: mockStore(() => ({
          app: {
            account: {
              isLoggedIn: true
            }
          }
        }))
      });

      result.interceptor();

      expect(replaceStub).toHaveBeenCalledWith('/my-account/upcoming-trips');
    });

    it('should navigate to beginning of the view-res flow when invalid state and user logged out', () => {
      const action = {
        payload: {
          routeState: {
            action: 'push'
          }
        }
      };

      const result = travelInformationPageInterceptor(true)({
        action,
        history: { replace: replaceStub },
        store: mockedStore
      });

      result.interceptor();

      expect(replaceStub).toHaveBeenCalledWith('/air/manage-reservation/');
    });

    it('should navigate to beginning of the upcoming trips flow when invalid state and user logged in', () => {
      const result = travelInformationPageInterceptor(false)({
        action,
        history: { replace: replaceStub },
        store: mockStore(() => ({
          app: {
            account: {
              isLoggedIn: true
            }
          }
        }))
      });

      result.interceptor();

      expect(replaceStub).toHaveBeenCalledWith('/my-account/upcoming-trips');
    });
  });
});
