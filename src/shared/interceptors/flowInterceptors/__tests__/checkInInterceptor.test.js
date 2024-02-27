jest.mock('src/shared/interceptors/checkInBoardingPassInterceptor');
jest.mock('src/shared/interceptors/cleanFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});

import checkInBoardingPassInterceptor from 'src/shared/interceptors/checkInBoardingPassInterceptor';
import checkInInterceptor from 'src/shared/interceptors/flowInterceptors/checkInInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('checkInInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to checkin', () => {
    checkInBoardingPassInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = checkInInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});