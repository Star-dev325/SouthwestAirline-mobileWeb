import { sandbox } from 'sinon';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import _ from 'lodash';

import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as UpgradedBoardingActions from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import upgradedBoardingCancelReservationInterceptor from 'src/shared/interceptors/upgradedBoardingCancelReservationInterceptor';

const sinon = sandbox.create();

describe('upgradedBoardingCancelReservationInterceptor', () => {
  let getCurrentRouteStateStub;
  let cancelUpgradedBoardingReservationStub;
  let exitWebViewStub;
  let dispatchStub;

  const excludedPaths = ['/upgraded-boarding/payment', '/upgraded-boarding/confirmation'];
  const previousPath = '/upgraded-boarding/purchase';
  const linkObject = {
    href: '/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML',
    method: 'PUT',
    body: {
      passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0ghh',
      productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
    }
  };
  const defaultState = {
    app: {
      toggles: {
        UPGRADED_BOARDING: true
      },
      upgradedBoarding: {
        upgradedBoardingPage: {
          upgradedBoardingResponse: {
            upgradedBoardingSelectPage: {
              _links: {
                upgradedBoardingCancel: linkObject
              }
            }
          }
        }
      }
    },
    persistentHistory: ['']
  };

  beforeEach(() => {
    getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    cancelUpgradedBoardingReservationStub = sinon.stub(UpgradedBoardingActions, 'cancelUpgradedBoardingReservation');
    exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView');
    dispatchStub = sinon.stub().onCall(0).returns(Promise.resolve());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should intercept and dispatch cancel action when UPGRADED_BOARDING on, matches from path, and does not match excluded current path', () => {
    const store = mockStore({ dispatch: dispatchStub, state: defaultState });

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: previousPath
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store });

    result.interceptor();

    expect(cancelUpgradedBoardingReservationStub).to.have.been.calledWith(linkObject);
    expect(exitWebViewStub).to.not.have.been.called;
  });

  it('should intercept and dispatch cancel action when UPGRADED_BOARDING on, when user is going back to checkin confirmation page', () => {
    const store = mockStore({ dispatch: dispatchStub, state: defaultState });
    const history = {
      location: {
        pathname: '/check-in/confirmation'
      }
    };

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: '/upgraded-boarding/purchase'
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store, history: history });

    result.interceptor();

    expect(cancelUpgradedBoardingReservationStub).to.have.been.calledWith(linkObject);
  });

  it('should intercept and dispatch cancel action when UPGRADED_BOARDING on, when user is not going back to checkin confirmation page', () => {
    const store = mockStore({ dispatch: dispatchStub, state: defaultState });

    const history = {
      location: {
        pathname: '/not-confirmpage'
      }
    };

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: '/upgraded-boarding/purchase'
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store, history: history });

    result.interceptor();

    expect(cancelUpgradedBoardingReservationStub).to.have.been.calledWith(linkObject);
  });

  it('should return undefined and not dispatch cancel action when UPGRADED_BOARDING toggle off', () => {
    const store = mockStore({
      dispatch: dispatchStub,
      state: _.merge({}, defaultState, { app: { toggles: { UPGRADED_BOARDING: false } } })
    });

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: previousPath
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store });

    expect(result).to.be.undefined;
    expect(cancelUpgradedBoardingReservationStub).to.not.have.been.called;
  });

  it('should return undefined not dispatch cancel action when current path matches excluded path', () => {
    const store = mockStore({ dispatch: dispatchStub, state: defaultState });

    getCurrentRouteStateStub.returns({
      pathname: excludedPaths[0],
      backFrom: {
        pathname: previousPath
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store });

    expect(result).to.be.undefined;
    expect(cancelUpgradedBoardingReservationStub).to.not.have.been.called;
  });

  it('should return undefined and not dispatch cancel action when previous path does not match', () => {
    const store = mockStore({ dispatch: dispatchStub, state: defaultState });

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: '/not-previous-path'
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store });

    expect(result).to.be.undefined;
    expect(cancelUpgradedBoardingReservationStub).to.not.have.been.called;
  });

  it('should return undefined and not dispatch cancel action when cancel link object missing', () => {
    const missingLinkObjectState = {
      app: {
        toggles: {
          UPGRADED_BOARDING: true
        }
      },
      persistentHistory: ['']
    };
    const store = mockStore({ dispatch: dispatchStub, state: missingLinkObjectState });

    getCurrentRouteStateStub.returns({
      pathname: '/not-excluded',
      backFrom: {
        pathname: previousPath
      }
    });

    const result = upgradedBoardingCancelReservationInterceptor(excludedPaths, previousPath)({ store });

    expect(result).to.be.undefined;
    expect(cancelUpgradedBoardingReservationStub).to.not.have.been.called;
  });
});
