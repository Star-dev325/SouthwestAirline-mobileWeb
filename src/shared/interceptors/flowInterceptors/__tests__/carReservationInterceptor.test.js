jest.mock('src/shared/helpers/interceptorHelpers', () => ({
  isPagePathByLocationOrHistoryChange: jest.fn().mockReturnValue(true),
  isPagePathByLocationChange: jest.fn()
}));
jest.mock('src/shared/interceptors/keepFormDataInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => ({
  viewReservation: {
    car: {
      flowConfig: {
        entry: '/car/manage-reservation/index.html?tab=CAR'
      }
    },
    flowConfig: {
      entry: '/air/manage-reservation/index.html',
      name: 'viewReservation'
    }
  }
}));
jest.mock('src/shared/interceptors/viewCarReservationDetailsInterceptor');

import carReservationInterceptor from 'src/shared/interceptors/flowInterceptors/carReservationInterceptor';
import viewCarReservationDetailsInterceptor from 'src/shared/interceptors/viewCarReservationDetailsInterceptor';
import { viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('carReservationInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to car reservation', () => {
    viewCarReservationDetailsInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = carReservationInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });

  it('should validate the flow config path loaded', () => {
    viewCarReservationDetailsInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = carReservationInterceptor.interceptor(interceptorContext);

    expect(result.flowConfig.entry).toMatch(viewReservationRoutes['carReservationIndexWithTab'].canonicalPath);
  });
});
