jest.mock('src/shared/interceptors/airCancelConfirmationInterceptor');
jest.mock('src/shared/interceptors/airCancelSelectPassengersPageInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});

import airCancelConfirmationInterceptor from  'src/shared/interceptors/airCancelConfirmationInterceptor';
import airCancelSelectPassengersPageInterceptor from 'src/shared/interceptors/airCancelSelectPassengersPageInterceptor';
import airCancelInterceptor from 'src/shared/interceptors/flowInterceptors/airCancelInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airCancelInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to aircancel', () => {
    airCancelConfirmationInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    airCancelSelectPassengersPageInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = airCancelInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});