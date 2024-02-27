jest.mock('src/shared/interceptors/airUpgradeSelectBoundsInterceptor');

import airUpgradeSelectBoundsInterceptor from 'src/shared/interceptors/airUpgradeSelectBoundsInterceptor';
import airUpgradeInterceptor from 'src/shared/interceptors/flowInterceptors/airUpgradeInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airUpgradeInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to airUpgrade', () => {
    airUpgradeSelectBoundsInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = airUpgradeInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
