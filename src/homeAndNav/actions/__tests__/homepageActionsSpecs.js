import { sandbox } from 'sinon';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as HeroShotsTransformers from 'src/homeAndNav/transformers/heroShotsTransformers';
import * as HomePageActions from 'src/homeAndNav/actions/homepageActions';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import createMockStore from 'test/unit/helpers/createMockStore';
import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';

const mockStore = createMockStore();
const sinon = sandbox.create();

const {
  HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT,
  HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
  HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_SUCCESS,
  HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_FAILED,
  HOME_NAV__RESET_HERO_CONTENTS,
  HOME_NAV__RESET_MENUS_TO_INIT
} = homeAndNavActionTypes;
const { HOME_PAGE_MBOX1_ID, HOME_PAGE_MBOX2_ID } = AdobeTargetConstants;

describe('HomepageActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('sync actions', () => {
    it('clearUpcomingTripsCount', () => {
      expect(HomePageActions.clearUpcomingTripsCount()).to.deep.equal({
        type: HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT,
        payload: 0
      });
    });

    it('resetHeroContents', () => {
      expect(HomePageActions.resetHeroContents()).to.deep.equal({
        type: HOME_NAV__RESET_HERO_CONTENTS
      });
    });

    it('resetNavMenus', () => {
      expect(HomePageActions.resetNavMenus()).to.deep.equal({
        type: HOME_NAV__RESET_MENUS_TO_INIT
      });
    });
  });

  context('async actions', () => {
    context('loadHomepagePlacements', () => {
      const mockParams = { key: 'value' };
      const mockMboxes = [
        { mbox: HOME_PAGE_MBOX1_ID, params: mockParams },
        { mbox: HOME_PAGE_MBOX2_ID, params: mockParams }
      ];
      const mockResponse = { response: { key: 'value' } };
      const mockHomeHeroTransform = {
        banners: [],
        heroes: []
      };

      let getTargetParamsStub;
      let getMboxConfigStub;
      let getSegmentsStub;
      let transformHomeHeroesToHeroContentsStub;
      let getPlacementsStub;

      beforeEach(() => {
        getTargetParamsStub = sinon
          .stub(AdobeTargetActions, 'getTargetParams')
          .returns(() => Promise.resolve(mockParams));
        getMboxConfigStub = sinon
          .stub(AdobeTargetActions, 'getMboxConfig')
          .returns(() => Promise.resolve(mockMboxes));
        getSegmentsStub = sinon
          .stub(AdobeTargetActions, 'getSegments')
          .returns(() => Promise.resolve(['4053152', '1234']));
        transformHomeHeroesToHeroContentsStub = sinon
          .stub(HeroShotsTransformers, 'transformHomeHeroesToHeroContents')
          .returns(mockHomeHeroTransform);
        getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(mockResponse));
      });

      it('should trigger success action when API resolves', () =>
        store.dispatch(HomePageActions.loadHomepagePlacements()).then(() => {
          expect(getTargetParamsStub).to.have.been.called;
          expect(getMboxConfigStub).to.have.been.called;
          expect(getSegmentsStub).to.have.been.calledWith(mockMboxes);

          expect(getPlacementsStub).to.have.been.called;
          expect(transformHomeHeroesToHeroContentsStub).to.have.been.calledWith(mockResponse);

          expect(store.getActions()).to.deep.equal([
            {
              type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
              isFetching: true
            },
            {
              type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_SUCCESS,
              isFetching: false,
              response: mockHomeHeroTransform
            }
          ]);
        }));

      it('should trigger failed action when getTargetParams throws unhandled exception', async () => {
        getTargetParamsStub.returns(() => Promise.reject());

        await store.dispatch(HomePageActions.loadHomepagePlacements());

        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.not.have.been.called;
        expect(getSegmentsStub).to.not.have.been.called;
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
            isFetching: true
          },
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_FAILED,
            isFetching: false
          }
        ]);
      });

      it('should trigger failed action when getSegments throws unhandled exception', async () => {
        getSegmentsStub.returns(() => Promise.reject());

        await store.dispatch(HomePageActions.loadHomepagePlacements());

        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.have.been.called;
        expect(getSegmentsStub).to.have.been.calledWith(mockMboxes);
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
            isFetching: true
          },
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_FAILED,
            isFetching: false
          }
        ]);
      });

      it('should trigger failed action when getPlacements throws unhandled exception', async () => {
        const error = new Error();

        getPlacementsStub.returns(() => Promise.reject(error));

        await store.dispatch(HomePageActions.loadHomepagePlacements());

        expect(getTargetParamsStub).to.have.been.called;
        expect(getMboxConfigStub).to.have.been.called;
        expect(getSegmentsStub).to.have.been.calledWith(mockMboxes);
        expect(getPlacementsStub).to.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
            isFetching: true
          },
          {
            type: HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_FAILED,
            isFetching: false,
            error
          }
        ]);
      });
    });
  });
});
