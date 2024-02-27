jest.mock('src/shared/interceptors/cleanFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => ({}));
jest.mock('src/shared/interceptors/standbyRedirectFlowInterceptor', () => (props) => ({ ...props }));

import standbyInterceptor from 'src/shared/interceptors/flowInterceptors/standbyInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('standbyInterceptor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to /standby', () => {
    const store = mockStore({ dispatch: jest.fn() });
    const interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
    const result = standbyInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({ ...interceptorContext });
  });
});
