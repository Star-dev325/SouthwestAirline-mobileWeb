import sinonModule from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import * as OffersPageActions from 'src/homeAndNav/actions/offersPageActions';
import HomeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { OFFERS_PAGE_ID } from 'src/wcm/constants/wcmConstants';

const { OFFERS_PAGE_OFFER1_MBOX_ID, OFFERS_PAGE_OFFER2_MBOX_ID } = AdobeTargetConstants;

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

describe('OffersPageActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('loadOffersPagePlacements', () => {
    const {
      HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS,
      HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS,
      HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_FAILED
    } = HomeAndNavActionTypes;

    const params = { key: 'value' };
    const segment1 = 'segment1';
    const segment2 = 'segment2';

    const fetchAction = { type: HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS, isFetching: true };
    const fetchFailedAction = { type: HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_FAILED, isFetching: false };

    const expectedTargetConfig = [
      { mbox: OFFERS_PAGE_OFFER1_MBOX_ID, params },
      { mbox: OFFERS_PAGE_OFFER2_MBOX_ID, params }
    ];

    let getTargetParamsStub;
    let getMboxConfigStub;
    let getSegmentsStub;
    let getPlacementsStub;

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams');
      getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve(expectedTargetConfig));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments');
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
    });

    it('should not dispatch actions when placements exist in state', () => {
      const placements = [{ key: 'value' }];
      const state = { app: { homeAndNav: { offersPage: { placements } } } };

      store = mockStore(state);

      return store.dispatch(OffersPageActions.loadOffersPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.not.have.been.called;
        expect(getMboxConfigStub).to.not.have.been.called;
        expect(getSegmentsStub).to.not.have.been.called;
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.be.empty;
      });
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', () => {
      const error = new Error();

      getTargetParamsStub.returns(() => Promise.reject(error));

      return store.dispatch(OffersPageActions.loadOffersPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.not.have.been.called;
        expect(getSegmentsStub).to.not.have.been.called;
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([fetchAction, { ...fetchFailedAction }]);
      });
    });

    it('should dispatch failed action when getSegments throws unhandled exception', () => {
      const error = new Error();

      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.reject(error));

      return store.dispatch(OffersPageActions.loadOffersPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.have.been.called;
        expect(getSegmentsStub).to.have.been.calledWith(expectedTargetConfig);
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([fetchAction, { ...fetchFailedAction }]);
      });
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', () => {
      const error = new Error();

      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve([segment1, segment2]));
      getPlacementsStub.returns(() => Promise.reject(error));

      return store.dispatch(OffersPageActions.loadOffersPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.have.been.called;
        expect(getSegmentsStub).to.have.been.calledWith(expectedTargetConfig);
        expect(getPlacementsStub).to.have.been.calledWith(OFFERS_PAGE_ID, [], [segment1, segment2]);

        expect(store.getActions()).to.deep.equal([fetchAction, { ...fetchFailedAction }]);
      });
    });

    it('should dispatch success action when no errors', () => {
      const content = 'content';

      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve([segment1, segment2]));
      getPlacementsStub.returns(() => Promise.resolve(content));

      const fetchSuccessAction = {
        type: HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS,
        isFetching: false,
        response: content
      };

      return store.dispatch(OffersPageActions.loadOffersPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.have.been.called;
        expect(getSegmentsStub).to.have.been.calledWith(expectedTargetConfig);
        expect(getPlacementsStub).to.have.been.calledWith(OFFERS_PAGE_ID, [], [segment1, segment2]);

        expect(store.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
      });
    });
  });

  it('should return action for saveOffersPagePlacements', () => {
    const response = 'response';

    store.dispatch(OffersPageActions.saveOffersPagePlacements(response));

    expect(store.getActions()).to.deep.equal([
      {
        type: HomeAndNavActionTypes.HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS,
        response
      }
    ]);
  });

  it('should return action for saveOffersPageTemplateData', () => {
    const templateData = 'templateData';

    store.dispatch(OffersPageActions.saveOffersPageTemplateData(templateData));

    expect(store.getActions()).to.deep.equal([
      {
        type: HomeAndNavActionTypes.HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA,
        templateData
      }
    ]);
  });
});
