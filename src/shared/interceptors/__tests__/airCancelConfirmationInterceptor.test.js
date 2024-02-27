import * as HistoryActions from 'src/shared/actions/historyActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import airCancelConfirmationInterceptor from 'src/shared/interceptors/airCancelConfirmationInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airCancelConfirmationInterceptor', () => {
  let mockHistory, store;
  let addHistoryForceRedirectMock, getCurrentRouteStateMock;
  const pagePath = '/air/cancel/ABC123/refund-summary';

  beforeEach(() => {
    getCurrentRouteStateMock = jest.spyOn(routeStateHelper, 'getCurrentRouteState');
    addHistoryForceRedirectMock = jest.spyOn(HistoryActions, 'addHistoryForceRedirect');
    store = mockStore({});
    mockHistory = { location: { state: null }, push: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should force to / when back from checkIn confirmation page and landing on airCancelConfirmation', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('check-in');
    BrowserObject.location = { pathname: '/check-in' };

    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel/ABC123/refund-summary',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: {
        pathname: '/check-in/confirmation'
      }
    });

    const result = airCancelConfirmationInterceptor(pagePath)({ store, history: mockHistory });

    result.interceptor();

    expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/');
    expect(mockHistory.push).toHaveBeenCalledWith('/');
  });

  it('should send user to /view-reservation when loading the page but having no airCancel flow state (covers refresh)', () => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel/ABC123/refund-summary',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: null
    });

    const result = airCancelConfirmationInterceptor(pagePath)({
      store,
      history: mockHistory,
      flowConfig: { entry: '/view-reservation' }
    });

    result.interceptor();

    expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/view-reservation');
    expect(mockHistory.push).toHaveBeenCalledWith('/view-reservation');
  });

  it('should not send user to /check-in or /view-reservation when loading the page but having airCancel flow state and not coming back from checkin', () => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel/ABC123/refund-summary',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: null
    });

    const result = airCancelConfirmationInterceptor(pagePath)({
      store,
      history: mockHistory,
      flowConfig: {
        entry: '/view-reservation',
        flowStatusGetter: () => 'completed'
      }
    });

    expect(result).toEqual(undefined);
    expect(mockHistory.push).not.toHaveBeenCalled();
  });

  it('should not force back to /check-in when back from checkin reservation page but not on summary', () => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel/ABC123/refund-summary',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: null
    });

    const result = airCancelConfirmationInterceptor('/')({ store, history: mockHistory });

    expect(result).toEqual(undefined);
    expect(mockHistory.push).not.toHaveBeenCalled();
  });

  it('should redirect back to the beginning of the route flow when the user has a searchToken in the URL query and the flow status is not set', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
    BrowserObject.location = { pathname: '/air/cancel-reservation/summary.html' };

    const currentPagePath = '/air/cancel-reservation/summary.html';

    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel-reservation/summary.html',
      search: 'searchToken=123abc',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: {
        pathname: '/air/cancel-reservation/summary.html'
      }
    });

    const result = airCancelConfirmationInterceptor(currentPagePath)({
      store,
      history: mockHistory,
      flowConfig: {
        entry: '/air/manage-reservation/'
      }
    });

    result.interceptor();

    expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/air/manage-reservation/');
    expect(mockHistory.push).toHaveBeenCalledWith('/air/manage-reservation/');
  });

  it('should default to the canonical path if the flowConfig entry returns an object with canoical and regular paths', () => {
    getCurrentRouteStateMock.mockReturnValue({
      pathname: '/air/cancel/ABC123/refund-summary',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: null,
      backFrom: null
    });

    const result = airCancelConfirmationInterceptor(pagePath)({
      store,
      history: mockHistory,
      flowConfig: {
        entry: {
          canonical: '/air/manage-reservation/',
          path: '/air/manage-reservation/index.html'
        }
      }
    });

    result.interceptor();

    expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/air/manage-reservation/');
    expect(mockHistory.push).toHaveBeenCalledWith('/air/manage-reservation/');
  });
});
