import { sandbox } from 'sinon';

import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import * as pathUtils from 'src/shared/helpers/pathUtils';
import externalPaymentPageInterceptor from 'src/shared/interceptors/externalPaymentPageInterceptor';

const sinon = sandbox.create();

describe('externalPaymentPageInterceptor', () => {
  let store;
  let mockInterceptorContext;
  let fakeAction;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return undefined when persistenceIdentifier is not present in action search', () => {
    fakeAction = {
      payload: {
        location: {
          search: '?paymentMethod=PayMonthly&provider=Uplift'
        }
      }
    };
    mockInterceptorContext = { store, action: fakeAction };
    const result = externalPaymentPageInterceptor(mockInterceptorContext);

    expect(result).to.be.undefined;
  });

  it('should return undefined when paymentMethod is not present in action search', () => {
    fakeAction = {
      payload: {
        location: {
          search: '?persistenceIdentifier=test-transaction-id&provider=Uplift'
        }
      }
    };
    mockInterceptorContext = { store, action: fakeAction };
    const result = externalPaymentPageInterceptor(mockInterceptorContext);

    expect(result).to.be.undefined;
  });

  it('should return undefined when provider is not present in action search', () => {
    fakeAction = {
      payload: {
        location: {
          search: '?persistenceIdentifier=test-transaction-id&paymentMethod=PayMonthly'
        }
      }
    };
    mockInterceptorContext = { store, action: fakeAction };
    const result = externalPaymentPageInterceptor(mockInterceptorContext);

    expect(result).to.be.undefined;
  });

  it('should return undefined when transformSearchToQuery returns undefined', () => {
    fakeAction = {
      payload: {
        location: {
          search: '?persistenceIdentifier=test-transaction-id'
        }
      }
    };
    mockInterceptorContext = { store, action: fakeAction };
    sinon.stub(pathUtils, 'transformSearchToQuery').returns(undefined);
    const result = externalPaymentPageInterceptor(mockInterceptorContext);

    expect(result).to.be.undefined;
  });

  it('should intercept when persistenceIdentifier, provider, and paymentMethod are present in action search', () => {
    fakeAction = {
      payload: {
        location: {
          search: '?persistenceIdentifier=test-transaction-id&paymentMethod=PayMonthly&provider=Uplift'
        }
      }
    };
    mockInterceptorContext = { store, action: fakeAction };
    const result = externalPaymentPageInterceptor(mockInterceptorContext);

    expect(result.interceptor()).to.be.undefined;
  });
});
