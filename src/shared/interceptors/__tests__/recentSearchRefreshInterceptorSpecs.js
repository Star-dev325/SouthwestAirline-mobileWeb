import { sandbox } from 'sinon';
import recentSearchRefreshInterceptor from 'src/shared/interceptors/recentSearchRefreshInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

const sinon = sandbox.create();

describe('recentSearchRefreshInterceptor', () => {
  let goBackStub, replaceStub;
  let getCurrentRouteStateStub, getPrevRouteStateStub;
  let mockHistory;

  beforeEach(() => {
    goBackStub = sinon.stub();
    replaceStub = sinon.stub();
    getCurrentRouteStateStub = sinon.stub(routeStateHelper, 'getCurrentRouteState');
    getPrevRouteStateStub = sinon.stub(routeStateHelper, 'getPrevRouteState');

    mockHistory = { goBack: goBackStub, replace: replaceStub };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should trigger goBack when refresh on current page', () => {
    getCurrentRouteStateStub.returns({ pathname: '/flight-status/recent', action: null });
    getPrevRouteStateStub.returns({ pathname: '/flight-status', action: 'push' });

    const result = recentSearchRefreshInterceptor({ store: mockStore({}), history: mockHistory });

    result.interceptor();

    expect(goBackStub).to.be.called;
    expect(replaceStub).to.not.be.called;
  });

  it('should trigger replace when typing recent search url in a new tab', () => {
    getCurrentRouteStateStub.returns({ pathname: '/flight-status/recent', action: null });
    getPrevRouteStateStub.returns({});

    const result = recentSearchRefreshInterceptor({ store: mockStore({}), history: mockHistory });

    result.interceptor();

    expect(goBackStub).to.not.be.called;
    expect(replaceStub).to.be.called;
  });
});
