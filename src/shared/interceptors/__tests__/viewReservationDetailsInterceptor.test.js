import _ from 'lodash';
import viewReservationDetailsInterceptor from 'src/shared/interceptors/viewReservationDetailsInterceptor';
import * as AppSelector from 'src/shared/selectors/appSelector';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('viewReservationDetailsInterceptor', () => {
  let replaceStub;
  let action;

  beforeEach(() => {
    replaceStub = jest.fn();

    action = { payload: { location: { state: undefined } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not navigate to view-reservation when has valid state', () => {
    const state = {
      firstName: 'first',
      lastName: 'last'
    };

    _.set(action, 'payload.location.state', state);

    const result = viewReservationDetailsInterceptor({ action, history: { replace: replaceStub }, store: mockStore });

    expect(result).toEqual({
      action,
      history: { replace: replaceStub },
      store: mockStore
    });
  });

  it('should not navigate to view-reservation when has searchToken in location', () => {
    const search = '?searchToken=aew!1dsdf';

    _.set(action, 'payload.location.search', search);

    const result = viewReservationDetailsInterceptor({ action, history: { replace: replaceStub }, store: mockStore });

    expect(result).toEqual({
      action,
      history: { replace: replaceStub },
      store: mockStore
    });
  });

  it('should navigate to view-reservation with invalid state', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
    const state = {
      invalid: 'state'
    };

    _.set(action, 'payload.location.state', state);

    const result = viewReservationDetailsInterceptor({ action, history: { replace: replaceStub }, store: mockStore });

    result.interceptor();

    expect(replaceStub).toHaveBeenCalledWith('/air/manage-reservation/');
  });

  it('should navigate to view-reservation with no state', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('reservation');
    const result = viewReservationDetailsInterceptor({ action, history: { replace: replaceStub }, store: mockStore });

    result.interceptor();

    expect(replaceStub).toHaveBeenCalledWith('/air/manage-reservation/');
  });
});
