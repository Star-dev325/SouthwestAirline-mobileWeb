jest.mock('src/shared/interceptors/cleanFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/forceBackToHomeInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/payPalResumeInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});

import earlyBirdInterceptor from 'src/shared/interceptors/flowInterceptors/earlyBirdInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('earlybirdInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to earlybird', () => {
    payPalResumeInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = earlyBirdInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
