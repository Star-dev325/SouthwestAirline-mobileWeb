import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';

import OffersPage from 'src/shared/interceptors/offersPageInterceptor';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as OffersPageActions from 'src/homeAndNav/actions/offersPageActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';

const { path, interceptor } = OffersPage;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('OffersPageInterceptor', () => {
  const expectedRouteStateKeys = ['placements', 'templateData'];

  let isOnWebViewLandingPageStub;
  let getCurrentRouteStateStub;
  let hasAllInStateStub;
  let saveOffersPagePlacementsStub;
  let saveOffersPageTemplateDataStub;
  let updateContentBlockIdsStub;

  beforeEach(() => {
    isOnWebViewLandingPageStub = sinon.stub(WebViewHelper, 'isOnWebViewLandingPage');
    getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    hasAllInStateStub = sinon.stub(RouteStateHelper, 'hasAllInState');
    saveOffersPagePlacementsStub = sinon.stub(OffersPageActions, 'saveOffersPagePlacements');
    saveOffersPageTemplateDataStub = sinon.stub(OffersPageActions, 'saveOffersPageTemplateData');
    updateContentBlockIdsStub = sinon.stub(AnalyticsActions, 'updateContentBlockIds');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('should return interceptor', () => {
    it('when on webview landing page and has route state', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });

      const placements = ['placement'];
      const templateData = { key: 'value' };
      const state = { placements, templateData };

      const placementsAction = { type: 'placements-action' };
      const contentBlockAction = { type: 'content-block-action' };
      const templateDataAction = { type: 'template-data-action' };

      getCurrentRouteStateStub.returns({ state });
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(true);

      saveOffersPagePlacementsStub.returns(placementsAction);
      saveOffersPageTemplateDataStub.returns(templateDataAction);
      updateContentBlockIdsStub.returns(contentBlockAction);

      const result = interceptor({ store });

      result.interceptor();

      expect(store.getActions()).to.deep.equal([placementsAction, contentBlockAction, templateDataAction]);

      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, path);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(saveOffersPagePlacementsStub).to.have.been.calledWith(placements);
      expect(updateContentBlockIdsStub).to.have.been.calledWith(placements);
      expect(saveOffersPageTemplateDataStub).to.have.been.calledWith(templateData);
    });
  });

  context('should not return interceptor', () => {
    it('when not on webview landing page', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });

      const placements = ['placement'];
      const templateData = { key: 'value' };
      const state = { placements, templateData };

      getCurrentRouteStateStub.returns({ state });
      isOnWebViewLandingPageStub.returns(false);
      hasAllInStateStub.returns(true);

      const result = interceptor({ store });

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.empty;

      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, path);
      expect(hasAllInStateStub).to.have.been.calledWith(state, expectedRouteStateKeys);
      expect(saveOffersPagePlacementsStub).to.not.have.been.called;
      expect(updateContentBlockIdsStub).to.not.have.been.called;
      expect(saveOffersPageTemplateDataStub).to.not.have.been.called;
    });

    it('when does not have route state', () => {
      const persistentHistory = 'persistentHistory';
      const store = mockStore({ persistentHistory });

      getCurrentRouteStateStub.returns(undefined);
      isOnWebViewLandingPageStub.returns(true);
      hasAllInStateStub.returns(false);

      const result = interceptor({ store });

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.empty;

      expect(getCurrentRouteStateStub).to.have.been.calledWith(persistentHistory);
      expect(isOnWebViewLandingPageStub).to.have.been.calledWith(persistentHistory, path);
      expect(hasAllInStateStub).to.have.been.calledWith({}, expectedRouteStateKeys);
      expect(saveOffersPagePlacementsStub).to.not.have.been.called;
      expect(updateContentBlockIdsStub).to.not.have.been.called;
      expect(saveOffersPageTemplateDataStub).to.not.have.been.called;
    });
  });
});
