jest.mock('src/shared/routeUtils/routeStateHelper');
jest.mock('src/shared/helpers/browserObject', () => ({
  ...jest.requireActual,
  location: { pathname: '/travel-funds/transfer-funds' }
}));

import BrowserObject from 'src/shared/helpers/browserObject';
import * as PathUtils from 'src/shared/helpers/pathUtils';
import transferTravelFundsSearchTokenInterceptor from 'src/shared/interceptors/transferTravelFundsSearchTokenInterceptor.js';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('transferTravelFundsSearchTokenInterceptor', () => {
  let mockInterceptorContext;
  let replaceStub;
  let store;
  let transformSearchToQueryStub;
  let validateTransferFundsStub;

  beforeEach(() => {
    BrowserObject.location = { pathname: '/travel-funds/transfer-funds' };
    replaceStub = jest.fn();
    store = { ...mockStore() };
    transformSearchToQueryStub = jest.spyOn(PathUtils, 'transformSearchToQuery');
    validateTransferFundsStub = jest.spyOn(TravelFundsActions, 'validateTransferFunds');
    mockInterceptorContext = {
      action: {
        location: {
          pathname: '/travel-funds/transfer-funds'
        },
        type: 'SHARED__ROUTE_CHANGED'
      },
      history: {
        replace: replaceStub,
        location: {
          pathname: '/travel-funds/transfer-funds'
        }
      },
      store
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate transfer funds and replace history', () => {
    it('when searchToken is available and url path is /travel-funds/transfer-funds', async () => {
      getCurrentRouteState.mockReturnValue({ search: '?searchToken=1234SEARCH' });
      mockInterceptorContext.history.location.search = 'searchToken=1234SEARCH';
      validateTransferFundsStub.mockReturnValue(() => Promise.resolve('response'));

      const result = transferTravelFundsSearchTokenInterceptor(mockInterceptorContext);

      result.interceptor();

      await expect(validateTransferFundsStub).toHaveBeenCalledWith({
        body: {
          fundSearchToken: '1234SEARCH'
        },
        href: '/v1/mobile-air-booking/page/validate-transfer',
        method: 'POST'
      });

      expect(replaceStub).toHaveBeenCalled();
    });
  });

  describe('not validate and transfer funds and replace history',  () => {
    it('when url path is /travel-funds/transfer-funds but transformSearchToQuery returns undefined', () => {
      getCurrentRouteState.mockReturnValue({ search: '?searchToken=1234SEARCH' });
      mockInterceptorContext.history.location.search = 'searchToken=1234SEARCH';
      validateTransferFundsStub.mockReturnValue(() => Promise.resolve('response'));
      transformSearchToQueryStub.mockReturnValue({ searchToken: undefined });

      const result = transferTravelFundsSearchTokenInterceptor(mockInterceptorContext);

      result.interceptor();

      expect(result).toMatchObject({ ...mockInterceptorContext });
      expect(validateTransferFundsStub).toNotHaveBeenCalled;
      expect(replaceStub).toNotHaveBeenCalled;
    });

    it('when searchToken not available in query params', () => {
      const result = transferTravelFundsSearchTokenInterceptor(mockInterceptorContext);

      expect(result).toBeUndefined();
    });

    it('when url path is not /travel-funds/transfer-funds', () => {
      mockInterceptorContext.action.location.pathname = '/not-travel-funds/not-transfer-funds';

      const result = transferTravelFundsSearchTokenInterceptor(mockInterceptorContext);

      expect(result).toBeUndefined();
    });
  });
});
