jest.mock('src/shared/interceptors/viewCarReservationDetailsInterceptor');
jest.mock('src/shared/interceptors/travelInformationPageInterceptor');
jest.mock('src/shared/interceptors/viewReservationDetailsInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/keepFormDataInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/helpers/interceptorHelpers', () => ({
  isPagePathByLocationOrHistoryChange: jest.fn().mockReturnValue(true),
  isMatchPathAndPathChanged: jest.fn(),
  isPagePathByLocationChange: jest.fn()
}));

import airReservationInterceptor from  'src/shared/interceptors/flowInterceptors/airReservationInterceptor';
import travelInformationPageInterceptor from 'src/shared/interceptors/travelInformationPageInterceptor';
import viewCarReservationDetailsInterceptor from 'src/shared/interceptors/viewCarReservationDetailsInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airReservationInterceptor', () => {
  let interceptorContext;
  let store;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to view reservation', () => {
    viewCarReservationDetailsInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    travelInformationPageInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = airReservationInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
