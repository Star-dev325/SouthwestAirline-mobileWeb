import { sandbox } from 'sinon';
import _ from 'lodash';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import enrollConfirmationPageRefreshInterceptor from 'src/shared/interceptors/enrollConfirmationPageRefreshInterceptor';

const sinon = sandbox.create();

describe('enrollConfirmationPageRefreshInterceptor', () => {
  context('page refresh', () => {
    let matchPath;
    let store;
    let state;
    let dispatchStub;
    let pushStub;
    let flowConfig;
    let interceptorContext;

    beforeEach(() => {
      matchPath = '/enroll/confirmation';
      dispatchStub = sinon.stub();
      pushStub = sinon.stub();
      state = {
        app: {},
        persistentHistory: [
          {
            pathname: '/enroll/confirmation',
            action: null
          }
        ]
      };
      store = mockStore({ dispatch: dispatchStub, state });
      flowConfig = {
        entry: '/enroll'
      };

      interceptorContext = { store, history: { push: pushStub }, flowConfig };
    });

    it('should redirect to entry page when user presses browser refresh on enroll completion page', () => {
      const result = enrollConfirmationPageRefreshInterceptor(matchPath)(interceptorContext);

      result.interceptor();

      expect(pushStub).to.have.been.calledWith('/enroll');
    });

    it('should not redirect to entry page when user presses browser refresh an enroll page other than enroll completion page', () => {
      _.set(state, 'persistentHistory.0.pathname', '/enroll/security-info');
      store = mockStore({ dispatch: dispatchStub, state });
      interceptorContext = { store, history: { push: pushStub }, flowConfig };

      const result = enrollConfirmationPageRefreshInterceptor(matchPath)(interceptorContext);

      expect(result).to.be.undefined;
    });
  });
});
