import { sandbox } from 'sinon';

import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import keepFormDataInterceptor from 'src/shared/interceptors/keepFormDataInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';

const sinon = sandbox.create();

describe('keepFormDataInterceptor', () => {
  let store;
  let getCurrentRouteStateStub;
  let replaceStub;

  beforeEach(() => {
    getCurrentRouteStateStub = sinon.stub(routeStateHelper, 'getCurrentRouteState');
    replaceStub = sinon.stub();
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add "clearFormData=false" flag to url when coming from hamburger menu and page path is not changed and url query does not have "clearFormData=false"', () => {
    getCurrentRouteStateStub.returns({
      pathname: '/view-reservation',
      search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true',
      hash: '',
      key: 'vc4iij',
      action: 'push'
    });

    const action = {
      payload: {
        location: {
          pathname: '/view-reservation',
          search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true',
          hash: '',
          key: 'mp4iac'
        },
        action: 'PUSH'
      }
    };

    const result = keepFormDataInterceptor({ store, history: { replace: replaceStub, action: 'PUSH' }, action });

    result.interceptor();

    expect(replaceStub).to.have.been.calledWith(
      '/view-reservation?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true&clearFormData=false'
    );
  });

  it('should not add "clearFormData=false" flag to url when coming from hamburger menu and page path is not changed and url query has "clearFormData=false"', () => {
    getCurrentRouteStateStub.returns({
      pathname: '/view-reservation',
      search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true',
      hash: '',
      key: 'vc4iij',
      action: 'push'
    });

    const action = {
      payload: {
        location: {
          pathname: '/view-reservation',
          search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true&clearFormData=false',
          hash: '',
          key: 'mp4iac'
        },
        action: 'PUSH'
      }
    };

    const interceptorContext = { store, history: { replace: replaceStub, action: 'REPLACE' }, action };

    const result = keepFormDataInterceptor(interceptorContext);

    expect(result).to.be.equal(interceptorContext);
    expect(replaceStub).not.to.have.been.called;
  });

  it('should not add "clearFormData=false" flag to url when not coming from hamburger menu and page path is not changed and url query does not have "clearFormData=false"', () => {
    getCurrentRouteStateStub.returns({
      pathname: '/view-reservation',
      search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true',
      hash: '',
      key: 'vc4iij',
      action: 'push'
    });

    const action = {
      payload: {
        routeState: {
          pathname: '/view-reservation',
          search: '?tab=CAR',
          hash: '',
          key: 'mp4iac',
          action: 'push'
        }
      }
    };

    const interceptorContext = { store, history: { replace: replaceStub, action: 'PUSH' }, action };

    const result = keepFormDataInterceptor(interceptorContext);

    expect(result).to.be.equal(interceptorContext);
    expect(replaceStub).not.to.have.been.called;
  });

  it('should not add "clearFormData=false" flag to url when coming from hamburger menu and page path is changed and url query does not have "clearFormData=false"', () => {
    getCurrentRouteStateStub.returns({
      pathname: '/',
      search: '',
      hash: '',
      key: 'vc4iij',
      action: 'push'
    });

    const action = {
      payload: {
        routeState: {
          pathname: '/view-reservation',
          search: '?tab=FLIGHT&clk=GNAVFLTRES&cleanFlow=true',
          hash: '',
          key: 'mp4iac',
          action: 'push'
        }
      }
    };

    const interceptorContext = { store, history: { replace: replaceStub, action: 'REPLACE' }, action };

    const result = keepFormDataInterceptor(interceptorContext);

    expect(result).to.be.equal(interceptorContext);
    expect(replaceStub).not.to.have.been.called;
  });
});
