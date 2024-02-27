jest.mock('src/shared/interceptors/cleanFlowInterceptor', () =>
  jest.fn().mockImplementation((props) => ({ ...props }))
);
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () =>
  jest.fn().mockImplementation((props) => ({ ...props }))
);
jest.mock('src/shared/interceptors/payPalResumeInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor',  () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});
jest.mock('src/shared/interceptors/selectPassengersPageInterceptor');

import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import airChangeInterceptor from 'src/shared/interceptors/flowInterceptors/airChangeInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import selectPassengersPageInterceptor from 'src/shared/interceptors/selectPassengersPageInterceptor';

import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airChangeInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to airChange', () => {
    payPalResumeInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    selectPassengersPageInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    cleanFlowInterceptor.mockImplementationOnce(() => {});

    const result = airChangeInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
