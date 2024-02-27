jest.mock('src/shared/interceptors/cleanFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/payPalResumeInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});
jest.mock('src/shared/interceptors/upgradedBoardingCancelReservationInterceptor');
jest.mock('src/shared/interceptors/upgradedBoardingPurchasePageInterceptor');

import upgradedBoardingInterceptor from 'src/shared/interceptors/flowInterceptors/upgradedBoardingInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import upgradedBoardingCancelReservationInterceptor from 'src/shared/interceptors/upgradedBoardingCancelReservationInterceptor';
import upgradedBoardingPurchasePageInterceptor from 'src/shared/interceptors/upgradedBoardingPurchasePageInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('upgradedBoardingInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to upgradedBoardingInterceptor', () => {
    upgradedBoardingPurchasePageInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    upgradedBoardingCancelReservationInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    payPalResumeInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = upgradedBoardingInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
