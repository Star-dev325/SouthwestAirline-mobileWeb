import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import { mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';
import lookUpTravelFundsSearchInterceptor from 'src/shared/interceptors/lookUpTravelFundsSearchInterceptor';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('lookUpTravelFundsSearchInterceptor', () => {
  const lookUpTravelFundsPagePath = '/travel-funds/look-up';

  let store;
  let getCurrentRouteStateStub;
  let flowCleanerStub;
  let flowConfig;
  let retrieveTravelFundsStub;
  let isOnWebViewLandingPage;

  beforeEach(() => {
    flowCleanerStub = sinon.stub();
    flowConfig = mockFlowConfig({ flowCleaner: flowCleanerStub });
    store = mockStore({});
    getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    retrieveTravelFundsStub = sinon
      .stub(TravelFundsActions, 'retrieveTravelFunds')
      .returns({ type: 'retrieveTravelFunds' });
    isOnWebViewLandingPage = sinon.stub(WebViewHelper, 'isOnWebViewLandingPage');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('isOnWebViewLandingPage true', () => {
    beforeEach(() => {
      isOnWebViewLandingPage.returns(true);
    });

    it('should call flowCleaner if searchRequest is empty', (done) => {
      getCurrentRouteStateStub.returns({
        pathname: lookUpTravelFundsPagePath,
        state: ''
      });
      const result = lookUpTravelFundsSearchInterceptor(lookUpTravelFundsPagePath)({ store, flowConfig });

      expect(result).to.not.be.undefined;

      result.interceptor();

      waitFor.untilAssertPass(() => {
        expect(store.getActions()).to.be.empty;
        expect(flowCleanerStub).to.be.called;
        expect(retrieveTravelFundsStub).to.not.have.been.called;
      }, done);
    });

    it('should dispatch action is searchRequest is not empty', (done) => {
      getCurrentRouteStateStub.returns({
        pathname: lookUpTravelFundsPagePath,
        state: {
          checkTravelFunds: 'searchRequest'
        }
      });
      const result = lookUpTravelFundsSearchInterceptor(lookUpTravelFundsPagePath)({ store, flowConfig });

      result.interceptor();

      waitFor.untilAssertPass(() => {
        expect(retrieveTravelFundsStub).to.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: 'retrieveTravelFunds'
          }
        ]);
        expect(flowCleanerStub).to.not.be.called;
      }, done);
    });
  });

  context('isOnWebViewLandingPage false', () => {
    it('should not run interceptor', () => {
      isOnWebViewLandingPage.returns(false);
      const result = lookUpTravelFundsSearchInterceptor(lookUpTravelFundsPagePath)({ store, flowConfig });

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.empty;
      expect(retrieveTravelFundsStub).to.not.have.been.called;
      expect(flowCleanerStub).to.not.be.called;
    });
  });
});
