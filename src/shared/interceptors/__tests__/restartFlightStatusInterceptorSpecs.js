import { sandbox } from 'sinon';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import restartFlightStatusInterceptor from 'src/shared/interceptors/restartFlightStatusInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';

const sinon = sandbox.create();

describe('restartFlightStatusInterceptor', () => {
  let dispatchStub, store;
  let getCurrentRouteStateStub, getPrevRouteStateStub, isTransitionOrRefreshStub;

  beforeEach(() => {
    isTransitionOrRefreshStub = sinon.stub(routeStateHelper, 'isTransitionOrRefresh');
    getCurrentRouteStateStub = sinon.stub(routeStateHelper, 'getCurrentRouteState');
    getPrevRouteStateStub = sinon.stub(routeStateHelper, 'getPrevRouteState');
    sinon.stub(FlightStatusSearchActions, 'resetFlightStatusFlowData').returns('resetFlightStatusFlowData');
    dispatchStub = sinon.stub();
    store = mockStore({ dispatch: dispatchStub });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch be triggered when transition to current page not from recent list and not in the same page', () => {
    isTransitionOrRefreshStub.returns(true);
    getCurrentRouteStateStub.returns({ pathname: '/flight-status', action: 'push' });
    getPrevRouteStateStub.returns({ pathname: '/' });

    const result = restartFlightStatusInterceptor({ store });

    result.interceptor();

    expect(dispatchStub).to.have.been.calledWith('resetFlightStatusFlowData');
  });

  it('should not return interceptor when not transition or refresh to current page', () => {
    isTransitionOrRefreshStub.returns(false);
    getCurrentRouteStateStub.returns({ pathname: '/flight-status', action: null });
    getPrevRouteStateStub.returns({ pathname: '/' });

    const result = restartFlightStatusInterceptor({ store });

    expect(result).to.deep.equal({ store });
  });

  it('should not return interceptor when from recent list', () => {
    isTransitionOrRefreshStub.returns(true);
    getCurrentRouteStateStub.returns({ pathname: '/flight-status', action: 'push' });
    getPrevRouteStateStub.returns({ pathname: '/flight-status/recent' });

    const result = restartFlightStatusInterceptor({ store });

    expect(result).to.deep.equal({ store });
  });

  it('should not return interceptor when stay on the same page', () => {
    isTransitionOrRefreshStub.returns(true);
    getCurrentRouteStateStub.returns({ pathname: '/flight-status', action: 'push' });
    getPrevRouteStateStub.returns({ pathname: '/flight-status' });

    const result = restartFlightStatusInterceptor({ store });

    expect(result).to.deep.equal({ store });
  });
});
