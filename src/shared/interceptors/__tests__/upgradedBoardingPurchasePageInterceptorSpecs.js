import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';

import * as FlowStatusActions from 'src/shared/actions/flowStatusActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import upgradedBoardingPurchasePageInterceptor from 'src/shared/interceptors/upgradedBoardingPurchasePageInterceptor';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as UpgradedBoardingActions from 'src/upgradedBoarding/actions/upgradedBoardingActions';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('UpgradedBoardingPurchasePageInterceptor', () => {
  const landingPagePath = '/upgraded-boarding/purchase';
  const expectedRouteStateKeys = ['body', 'href', 'method'];
  const persistentHistory = 'persistentHistory';
  const body = { passengerSearchToken: 'testToken' };
  const href = 'testHref';
  const method = 'POST';
  const state = { body, href, method };
  const currentState = {
    pathname: '/upgraded-boarding/purchase',
    action: 'replace',
    state
  };

  let isOnWebViewLandingPageStub;
  let getCurrentRouteStateStub;
  let hasAllInStateStub;
  let getUpgradedBoardingReservationStub;
  let setFlowStatusStub;
  let store;

  beforeEach(() => {
    BrowserObject.location = { pathname: '/upgraded-boarding/purchase' };
    isOnWebViewLandingPageStub = sinon.stub(WebViewHelper, 'isOnWebViewLandingPage');
    getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    hasAllInStateStub = sinon.stub(RouteStateHelper, 'hasAllInState');
    getUpgradedBoardingReservationStub = sinon.stub(UpgradedBoardingActions, 'getUpgradedBoardingReservation');
    setFlowStatusStub = sinon.stub(FlowStatusActions, 'setFlowStatus');
    store = mockStore({ persistentHistory });
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('upgraded-boarding');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('should return interceptor', () => {
    it('when on webview landing page and has route state', () => {
      const upgradedBoardingAction = { type: 'upgraded-boarding-action' };

      getCurrentRouteStateStub.returns(currentState);
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(true);

      getUpgradedBoardingReservationStub.returns(upgradedBoardingAction);

      const result = upgradedBoardingPurchasePageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).to.deep.equal([upgradedBoardingAction]);
      expect(setFlowStatusStub).to.not.have.called;
      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, landingPagePath);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(getUpgradedBoardingReservationStub).to.have.been.calledWith(state);
    });
  });

  context('should call flow type status', () => {
    it('when user flow is from /blank to upgradedboarding, set flow status to in progress', () => {
      const upgradedBoardingAction = { type: 'upgraded-boarding-action' };
      const flowStatusAction = {
        flowName: "upgradedBoarding",
        status: "in_progress",
        type: "SET_FLOW_STATUS"
      };

      const mockPersistentanceHistory = [
        { pathname: '/blank', action: 'pop', state },
        { pathname: '/upgraded-boarding/purchase', action: 'replace', state }
      ];

      getCurrentRouteStateStub.returns(currentState);
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(true);

      getUpgradedBoardingReservationStub.returns(upgradedBoardingAction);
      store = mockStore({ persistentHistory: mockPersistentanceHistory });

      const result = upgradedBoardingPurchasePageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).to.deep.equal([flowStatusAction, upgradedBoardingAction]);
      expect(getCurrentRouteStateStub).to.have.been.calledWith(mockPersistentanceHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(mockPersistentanceHistory, landingPagePath);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(getUpgradedBoardingReservationStub).to.have.been.calledWith(state);
    });

    it('when user flow is from /boardingdetails to upgradedboarding, set flow status to in progress', () => {
      const upgradedBoardingAction = { type: 'upgraded-boarding-action' };
      const flowStatusAction = {
        flowName: "upgradedBoarding",
        status: "initial",
        type: "SET_FLOW_STATUS"
      };

      const mockPersistentanceHistory = [
        { pathname: '/upgraded-boarding/confirmation', action: 'pop', state },
        { pathname: '/upgraded-boarding/purchase', action: 'pop', state }
      ];

      getCurrentRouteStateStub.returns(currentState);
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(true);

      getUpgradedBoardingReservationStub.returns(upgradedBoardingAction);
      store = mockStore({ persistentHistory: mockPersistentanceHistory });

      const result = upgradedBoardingPurchasePageInterceptor(landingPagePath)({ store });

      result.interceptor();

      expect(store.getActions()).to.deep.equal([flowStatusAction, upgradedBoardingAction]);
      expect(getCurrentRouteStateStub).to.have.been.calledWith(mockPersistentanceHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(mockPersistentanceHistory, landingPagePath);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(getUpgradedBoardingReservationStub).to.have.been.calledWith(state);
    });
  });

  context('should not return interceptor', () => {
    it('when not on webview landing page', () => {
      getCurrentRouteStateStub.returns({ state });
      isOnWebViewLandingPageStub.returns(false);
      hasAllInStateStub.returns(true);

      const result = upgradedBoardingPurchasePageInterceptor(landingPagePath)({ store });

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.empty;
      expect(setFlowStatusStub).to.not.have.called;
      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, landingPagePath);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(getUpgradedBoardingReservationStub).to.not.have.been.called;
    });

    it('when does not have route state', () => {
      getCurrentRouteStateStub.returns(undefined);
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(false);

      const result = upgradedBoardingPurchasePageInterceptor(landingPagePath)({ store });

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.empty;
      expect(setFlowStatusStub).to.not.have.called;
      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, landingPagePath);
      expect(getUpgradedBoardingReservationStub).to.not.have.been.called;
    });
  });
});
