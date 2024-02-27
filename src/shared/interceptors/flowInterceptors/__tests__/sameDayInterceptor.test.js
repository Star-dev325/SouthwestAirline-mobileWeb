jest.mock('src/shared/interceptors/cleanFlowInterceptor', () =>
  jest.fn().mockImplementation((props) => ({ ...props }))
);
jest.mock('src/shared/interceptors/payPalResumeInterceptor');
jest.mock('src/shared/interceptors/redirectFlowInterceptor', () =>
  jest.fn().mockImplementation((props) => ({ ...props }))
);
jest.mock('src/shared/interceptors/routeFlowConfigGetter', () => () => ({}));

import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import sameDayInterceptor from 'src/shared/interceptors/flowInterceptors/sameDayInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

describe('sameDayInterceptor', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger replace when going to /same-day', () => {
    const interceptorContext = { store, history: { location: { pathname: '/pathname' } } };

    payPalResumeInterceptor.mockReturnValueOnce(() => ({ ...interceptorContext }));

    const result = sameDayInterceptor.interceptor(interceptorContext);

    expect(result).toMatchObject({
      ...interceptorContext
    });
  });

  it('should use the same day select bound as entry point when in web view', () => {
    const mockInterceptorContext = {
      store: {
        dispatch: jest.fn(),
        getState: jest.fn().mockReturnValue({ app: { webView: { isWebView: true } } })
      }
    };

    cleanFlowInterceptor.mockImplementationOnce(() => {});
    payPalResumeInterceptor.mockReturnValueOnce(() => null).mockReturnValueOnce(() => null);

    sameDayInterceptor.interceptor(mockInterceptorContext);

    expect(redirectFlowInterceptor.mock.calls[0][0].flowConfig.entry).toEqual('/same-day/bound-selection');
  });
});
