import * as AccountActions from 'src/shared/actions/accountActions';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import removeCorporateTokenInterceptor from 'src/shared/interceptors/removeCorporateTokenInterceptor';

describe('RemoveCorporateTokenInterceptor', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ dispatch: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when isOnWebViewLandingPage is true', () => {
    const removeSelectedCompanyStub = jest.spyOn(AccountActions, 'removeSelectedCompany');

    it('should dispatch remove selected company', () => {
      const interceptorContext = { store, history: { location: { pathname: '/pathname' } } };
      const result = removeCorporateTokenInterceptor(interceptorContext);

      result.interceptor();

      expect(removeSelectedCompanyStub).toHaveBeenCalled();
    });
  });
});
