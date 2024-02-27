jest.mock('src/shared/interceptors/airBookingCorporateRedirectInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/airBookingLandingPageInterceptor');
jest.mock('src/shared/interceptors/airBookingRedirectInterceptor');
jest.mock('src/shared/interceptors/airBookingSearchInterceptor');
jest.mock('src/shared/interceptors/cleanFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/forceBackToHomeInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/lowFareCalendarPageInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/payPalResumeInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/removeCeptorModalInterceptor');
jest.mock('src/shared/interceptors/resumeAppStateInterceptor', () => (props) => ({ ...props }));
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => {});
jest.mock('src/shared/interceptors/airBookingRedirectInterceptor');

import airBookingLandingPageInterceptor from  'src/shared/interceptors/airBookingLandingPageInterceptor';
import airBookingInterceptor from 'src/shared/interceptors/flowInterceptors/airBookingInterceptor';
import airBookingSearchInterceptor from 'src/shared/interceptors/airBookingSearchInterceptor';
import airBookingRedirectInterceptor from 'src/shared/interceptors/airBookingRedirectInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import removeCeptorModalInterceptor from 'src/shared/interceptors/removeCeptorModalInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('airBookingInterceptor', () => {
  let store;
  let interceptorContext;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
    interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to airbooking', () => {
    airBookingRedirectInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    airBookingLandingPageInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    airBookingSearchInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    payPalResumeInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));
    removeCeptorModalInterceptor.mockReturnValue(jest.fn().mockReturnValue({ ...interceptorContext }));

    const result = airBookingInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });
});
