import dayjs from 'dayjs';
import _ from 'lodash';
import footer from 'mocks/templates/content-delivery/footer';
import proxyquire from 'proxyquire';
import Q from 'q';
import { sandbox } from 'sinon';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';
import * as menuDataTransformers from 'src/homeAndNav/transformers/menuDataTransformers';
import * as promotionsTransformer from 'src/rapidRewards/transformers/promoBannersTransformer';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as WcmApi from 'src/shared/api/wcmApi';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import { CHANNEL, PAGE_ID_FOOTER } from 'src/shared/constants/requestParameter';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as PathUtils from 'src/shared/helpers/pathUtils';
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import * as WcmTransitionHelper from 'src/shared/helpers/wcmTransitionHelper';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import WcmActionTypes from 'src/wcm/actions/wcmActionsTypes';
import wcmConfig from 'src/wcm/constants/wcmConfig';
import createMockStore from 'test/unit/helpers/createMockStore';

const { window } = BrowserObject;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('WCM Actions', () => {
  const fakeResponse = { fakeProperty: 'fake string' };
  let getNormalizedPageIdStub;
  let isOnOldRouteStub;
  let store;

  beforeEach(() => {
    sinon.stub(promotionsTransformer, 'transformPromoBannerContentToPromotion').returns(fakeResponse);
    isOnOldRouteStub = sinon.stub(UrlHelper, 'isOnOldRoute').returns(true);
    getNormalizedPageIdStub = sinon.stub(UrlHelper, 'getNormalizedPageId');
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('fareDetailsLink', () => {
    const route = 'test-route';
    let removeInitialForwardSlashStub;
    let getJsonFileStub;

    beforeEach(() => {
      removeInitialForwardSlashStub = sinon.stub(UrlHelper, 'removeInitialForwardSlash');
      getJsonFileStub = sinon.stub(WcmApi, 'getJsonFile');
    });

    context('when successful response', () => {
      const expectedActions = [
        { type: WcmActionTypes.WCM__FETCH_FARE_DETAILS, isFetching: true },
        {
          type: WcmActionTypes.WCM__FETCH_FARE_DETAILS_SUCCESS,
          response: 'response',
          isFetching: false
        },
        {
          payload: {
            args: ['test-route'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      it('should retrieve fareDetails content', async () => {
        const store = mockStore({});
        const href = 'href';
        const response = 'response';

        removeInitialForwardSlashStub.returns(href);
        getJsonFileStub.returns(Promise.resolve(response));

        await store.dispatch(WcmActions.fetchFareDetailsJson(href, route));

        expect(getJsonFileStub).to.have.been.calledWith(href);
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    context('when failure response', () => {
      const error = new Error();
      const expectedActions = [
        {
          isFetching: true,
          type: WcmActionTypes.WCM__FETCH_FARE_DETAILS
        },
        {
          error,
          isFetching: false,
          type: WcmActionTypes.WCM__FETCH_FARE_DETAILS_FAILED
        }
      ];

      it('should not retrieve fareDetails content', async () => {
        const store = mockStore({});
        const href = 'href';

        removeInitialForwardSlashStub.returns(href);
        getJsonFileStub.rejects(error);

        await store.dispatch(WcmActions.fetchFareDetailsJson(href, route)).then(() => {
          const actions = store.getActions();

          expect(getJsonFileStub).to.have.been.calledWith(href);
          expect(actions).to.deep.equal(expectedActions);
        });
      });
    });
  });

  context('get wcm content success', () => {
    _.forIn(wcmConfig, (config, key) => {
      it(`should dispatch correct action when fetch ${key} success`, () => {
        sinon.stub(WcmApi, 'getJsonFile').returns(Q(fakeResponse));
        sinon.stub(ContentDeliveryApi, 'getContent').returns(Q(fakeResponse));

        const expectActions = [
          {
            type: config.actionType
          },
          {
            type: `${config.actionType}_SUCCESS`,
            response: fakeResponse
          }
        ];

        if (config.isSpinnerNeeded === undefined || config.isSpinnerNeeded !== false) {
          expectActions[0].isFetching = true;
          expectActions[1].isFetching = false;
        }

        return store.dispatch(WcmActions[`retrieve${_.upperFirst(key)}`]()).then(() => {
          expect(store.getActions()).to.deep.equal(expectActions);
        });
      });
    });
  });

  context('get wcm content fail', () => {
    _.forIn(wcmConfig, (config, key) => {
      it(`should dispatch correct action when fetch ${key} fail`, () => {
        const closeWindowStub = sinon.stub(window, 'close');

        sinon.stub(WcmApi, 'getJsonFile').returns(Q.reject({ errorMessage: 'errorMessage' }));
        sinon.stub(ContentDeliveryApi, 'getContent').returns(Q.reject({ errorMessage: 'errorMessage' }));

        const expectActions = [
          {
            type: config.actionType
          },
          {
            type: `${config.actionType}_FAILED`
          }
        ];

        if (config.isSpinnerNeeded === undefined || config.isSpinnerNeeded !== false) {
          expectActions[0].isFetching = true;
          expectActions[1].isFetching = false;
        }

        return store.dispatch(WcmActions[`retrieve${_.upperFirst(key)}`]()).then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal(expectActions[0]);
          expect(actions[1]).to.deep.equal(expectActions[1]);

          if (config.shouldShowAlert) {
            expect(actions[2].type).to.equal('TOGGLE_DIALOG');
            expect(actions[2].isShowDialog).to.equal(true);
            expect(actions[2].options.title).to.equal(
              "Sorry! We're having trouble accessing this content. This page may be incomplete or not functioning correctly. Please check your connection and try again."
            );
          }

          if (config.closeWindow) {
            actions[2].options.buttons[0].onClick();
            expect(closeWindowStub).to.have.been.called;
          }
        });
      });
    });
  });

  context('refreshHomeNavMenu', () => {
    const { WCM__FETCH_HOME_NAV_MENU, WCM__FETCH_HOME_NAV_MENU_SUCCESS, WCM__FETCH_HOME_NAV_MENU_FAILED } =
      WcmActionTypes;

    const { HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE } = homeAndNavActionTypes;
    const mockContentResponse = { success: true };
    const segments = ['segment1', 'segment2'];
    const successContent = { success: true };
    const mockTransformedWcmMenu = [
      {
        active: false,
        childList: [
          {
            routeName: '/car/booking',
            title: 'Book a Car'
          }
        ],
        isAccordion: true,
        menuTitle: 'Car'
      }
    ];

    const fetchAction = { type: WCM__FETCH_HOME_NAV_MENU, isFetching: true };
    const fetchSuccessAction = {
      response: successContent,
      type: WCM__FETCH_HOME_NAV_MENU_SUCCESS,
      isFetching: false
    };
    const homeNavUpdateActiveLinkIndexAction = {
      payload: 1,
      type: 'HOME_NAV__UPDATE_ACTIVE_LINK_INDEX'
    };
    const updateAction = { type: 'update-action' };
    const homeNavAddCleanFlowToRouteAction = {
      type: HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE,
      payload: mockTransformedWcmMenu
    };

    let getTargetParamsStub;
    let getSegmentsStub;
    let getContentStub;

    beforeEach(() => {
      sinon.stub(menuDataTransformers, 'wcmMenuListDataTransformer').returns(mockTransformedWcmMenu);

      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve());
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segments));
      getContentStub = sinon.stub(ContentDeliveryApi, 'getContent').resolves(mockContentResponse);
      sinon.stub(AnalyticsActions, 'updateContentBlockIds').returns(updateAction);
    });

    context('when expirationDate has passed', () => {
      it('should retrieve home nav menu', async () => {
        store = mockStore({
          app: {
            wcmContent: {
              homeNavMenu: {
                expirationDate: dayjs().subtract(61, 'minutes')
              }
            }
          }
        });

        await store.dispatch(WcmActions.refreshHomeNavMenu());

        expect(store.getActions()[0]).to.deep.equal({
          isFetching: true,
          type: 'WCM__FETCH_HOME_NAV_MENU'
        });
      });
    });

    context('when expirationDate is undefined', () => {
      it('should retrieve home nav menu', async () => {
        await store.dispatch(WcmActions.refreshHomeNavMenu());

        expect(store.getActions()[0]).to.deep.equal({
          isFetching: true,
          type: 'WCM__FETCH_HOME_NAV_MENU'
        });
      });
    });

    context('when expirationDate is not expired', () => {
      it('should not retrieve home nav menu', async () => {
        store = mockStore({
          app: {
            wcmContent: {
              homeNavMenu: {
                expirationDate: dayjs().add(59, 'minutes')
              }
            }
          }
        });

        const result = await store.dispatch(WcmActions.refreshHomeNavMenu());

        expect(store.getActions().length).to.equal(0);
        expect(result).to.equal(undefined);
      });
    });

    context('When ENABLE_TARGET_CONFIG enabled', () => {
      const bootstrapData = {
        default: {},
        'mobile-web-hb-menu': {
          contentParameters: {},
          mboxParameters: {},
          mboxes: ['mWebGlobalNavPromo1']
        }
      };
      let fetchBootstrapDataStub;

      beforeEach(() => {
        store = createMockStore()({
          app: {
            toggles: {
              ENABLE_TARGET_CONFIG: true
            }
          }
        });
        fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData');
      });

      it('should get mbox names from app settings', async () => {
        fetchBootstrapDataStub.returns(bootstrapData);

        await store.dispatch(WcmActions.refreshHomeNavMenu());

        expect(getSegmentsStub).to.have.been.calledWith([{ mbox: 'mWebGlobalNavPromo1', params: undefined }]);
      });
    });

    it('should not attempt to load when isWebView', async () => {
      store = mockStore({
        app: {
          webView: {
            isWebView: true
          }
        }
      });

      await store.dispatch(WcmActions.refreshHomeNavMenu());

      expect(getTargetParamsStub).to.not.have.been.called;
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getContentStub).to.have.been.called;

      expect(store.getActions()).to.deep.equal([
        fetchAction,
        updateAction,
        homeNavAddCleanFlowToRouteAction,
        fetchSuccessAction
      ]);
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', async () => {
      const error = new Error();

      getTargetParamsStub.returns(() => Promise.reject(error));

      const fetchFailedAction = {
        error,
        type: WCM__FETCH_HOME_NAV_MENU_FAILED,
        isFetching: false
      };

      await store.dispatch(WcmActions.refreshHomeNavMenu());

      expect(getTargetParamsStub).to.have.been.called;
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getContentStub).to.not.have.been.called;
      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should trigger fetching, update, home, and success actions home nav menu when api call succeeds', async () => {
      await store.dispatch(WcmActions.refreshHomeNavMenu());

      expect(getTargetParamsStub).to.have.been.called;
      expect(getSegmentsStub).to.have.been.called;
      expect(getContentStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        fetchAction,
        updateAction,
        homeNavAddCleanFlowToRouteAction,
        fetchSuccessAction
      ]);
    });

    it('should update active menu item to the item that isAccordion and active', async () => {
      const updatedMenuList = [
        ...mockTransformedWcmMenu,
        {
          active: true,
          childList: [
            {
              routeName: '/space/booking',
              title: 'Book a Spaceship'
            }
          ],
          isAccordion: true,
          menuTitle: 'Spaceship'
        }
      ];

      menuDataTransformers.wcmMenuListDataTransformer.returns(updatedMenuList);

      const homeNavAddCleanFlowToRouteAction = {
        type: HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE,
        payload: updatedMenuList
      };

      await store.dispatch(WcmActions.refreshHomeNavMenu());

      expect(store.getActions()).to.deep.equal([
        fetchAction,
        updateAction,
        homeNavUpdateActiveLinkIndexAction,
        homeNavAddCleanFlowToRouteAction,
        fetchSuccessAction
      ]);
    });
  });

  context('expireHomeNavMenu', () => {
    it('should return the action', async () => {
      await store.dispatch(WcmActions.expireHomeNavMenu());

      expect(store.getActions()).to.deep.equal([{ type: WcmActionTypes.WCM__EXPIRE_HOME_NAV_MENU }]);
    });
  });

  context('retrieveFooterContent', () => {
    const { WCM__FETCH_FOOTER, WCM__FETCH_FOOTER_SUCCESS, WCM__FETCH_FOOTER_FAILED } = WcmActionTypes;
    const footerResponse = footer.results.footer.content.placement.linkRows;
    const mockContentParams = {
      appContexts: [],
      channel: 'mweb',
      pageId: PAGE_ID_FOOTER,
      segments: []
    };
    const mockContentResponse = { success: true };
    const updateAction = { type: 'update-action' };

    let getContentStub;
    const segment = [];
    let getTargetParamsStub;
    let getMboxConfigStub;
    let getSegmentsStub;

    beforeEach(() => {
      getContentStub = sinon.stub(ContentDeliveryApi, 'getContent');
      sinon.stub(AnalyticsActions, 'updateContentBlockIds').returns(updateAction);
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve('segment'));
      getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve('segment'));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
    });

    context('when successful response', () => {
      it('should retrieve footer content', async () => {
        const successStore = mockStore({
          app: {
            wcmContent: {
              footer: {
                footerResponse
              }
            }
          }
        });

        getContentStub.resolves(mockContentResponse);

        await successStore.dispatch(WcmActions.retrieveFooterContent());

        expect(getContentStub).to.have.been.calledWith(mockContentParams);
        expect(successStore.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: WCM__FETCH_FOOTER
          },
          updateAction,
          {
            isFetching: false,
            response: mockContentResponse,
            type: WCM__FETCH_FOOTER_SUCCESS
          }
        ]);
      });

      it('should retrieve footer content with resolving target config params', async () => {
        const successStore = mockStore({
          app: {
            wcmContent: {
              footer: {
                footerResponse
              }
            }
          }
        });

        getContentStub.resolves(mockContentResponse);

        await successStore.dispatch(WcmActions.retrieveFooterContent());
        expect(getTargetParamsStub).calledWith({}, PAGE_ID_FOOTER);
        expect(getMboxConfigStub).calledWith(PAGE_ID_FOOTER, 'segment', []);
        expect(getSegmentsStub).calledWith('segment');
      });
    });

    context('when error response', () => {
      it('should not retrieve footer content', async () => {
        const error = new Error();
        const errorStore = mockStore({
          app: {
            wcmContent: {
              footer: {
                footerResponse
              }
            }
          }
        });

        getContentStub.rejects(error);

        await errorStore.dispatch(WcmActions.retrieveFooterContent());

        expect(getContentStub).to.have.been.calledWith(mockContentParams);
        expect(errorStore.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: WCM__FETCH_FOOTER
          },
          {
            isFetching: false,
            type: WCM__FETCH_FOOTER_FAILED
          }
        ]);
      });

      it('should retrieve footer content with rejecting target config params', async () => {
        getTargetParamsStub.returns(() => Promise.reject('error'));

        const successStore = mockStore({
          app: {
            wcmContent: {
              footer: {
                footerResponse
              }
            }
          }
        });

        await successStore.dispatch(WcmActions.retrieveFooterContent());
        expect(getTargetParamsStub).calledWith({}, PAGE_ID_FOOTER);
        expect(getMboxConfigStub).not.to.have.been.called;
        expect(getSegmentsStub).not.to.have.been.called;
        expect(getContentStub).not.to.have.been.called;
      });
    });
  });

  context('getPlacements', () => {
    let getContentStub;
    let updateContentBlockIdsStub;

    const updateAction = { type: 'update-action' };

    beforeEach(() => {
      getContentStub = sinon.stub(ContentDeliveryApi, 'getContent');
      updateContentBlockIdsStub = sinon.stub(AnalyticsActions, 'updateContentBlockIds');
    });

    it('should call ContentDeliveryApi with an undefined segment', () => {
      const pageId = 'pageId';
      const content = 'content';

      getContentStub.returns(Promise.resolve(content));
      updateContentBlockIdsStub.returns(updateAction);

      return store.dispatch(WcmActions.getPlacements(pageId)).then((result) => {
        expect(result).to.equal(content);

        expect(getContentStub).to.have.been.calledWith({ appContexts: [], channel: CHANNEL, pageId, segments: [] });
        expect(updateContentBlockIdsStub).to.have.been.calledWith(content);
      });
    });

    it('should call ContentDeliveryApi with a segment', () => {
      const pageId = 'pageId';
      const content = 'content';
      const segment = 'segment';
      const restParams = {
        nearestStation: 'DAL'
      };

      getContentStub.returns(Promise.resolve(content));
      updateContentBlockIdsStub.returns(updateAction);

      return store.dispatch(WcmActions.getPlacements(pageId, [], [segment], restParams)).then((result) => {
        expect(result).to.equal(content);

        expect(getContentStub).to.have.been.calledWith({
          appContexts: [],
          pageId,
          channel: CHANNEL,
          nearestStation: 'DAL',
          segments: [segment]
        });
        expect(updateContentBlockIdsStub).to.have.been.calledWith(content);
      });
    });

    it('should call ContentDeliveryApi with the normalized page id', () => {
      const content = 'content';
      const normalizedPageId = 'normalized-page-id-stub';
      const pageId = 'passed-pageId';
      const path = '/air/booking';
      const segment = 'segment';

      getContentStub.returns(Promise.resolve(content));
      updateContentBlockIdsStub.returns(updateAction);
      getNormalizedPageIdStub.returns(normalizedPageId);
      isOnOldRouteStub.returns(false);
      const browserObjectLocation = BrowserObject.location;

      BrowserObject.location = { pathname: path };

      return store.dispatch(WcmActions.getPlacements(pageId, [], [segment], {}, true)).then(() => {
        BrowserObject.location = browserObjectLocation;
        expect(getContentStub).to.have.been.calledWith({
          appContexts: [],
          pageId: normalizedPageId,
          channel: CHANNEL,
          segments: [segment]
        });
      });
    });

    it('should call ContentDeliveryApi with multiple segments', () => {
      const pageId = 'pageId';
      const content = 'content';
      const segments = ['segment1', 'segment2'];

      getContentStub.returns(Promise.resolve(content));
      updateContentBlockIdsStub.returns(updateAction);

      return store.dispatch(WcmActions.getPlacements(pageId, [], segments)).then((result) => {
        expect(result).to.equal(content);

        expect(getContentStub).to.have.been.calledWith({ appContexts: [], channel: CHANNEL, pageId, segments });
        expect(updateContentBlockIdsStub).to.have.been.calledWith(content);
      });
    });

    it('should call ContentDeliveryApi with multiple appContext', () => {
      const pageId = 'pageId';
      const content = 'content';
      const appContexts = ['earlyBird1', 'earlyBird2'];

      getContentStub.returns(Promise.resolve(content));
      updateContentBlockIdsStub.returns(updateAction);

      return store.dispatch(WcmActions.getPlacements(pageId, ['earlyBird1', 'earlyBird2'])).then((result) => {
        expect(result).to.equal(content);

        expect(getContentStub).to.have.been.calledWith({ appContexts, pageId, channel: CHANNEL, segments: [] });
        expect(updateContentBlockIdsStub).to.have.been.calledWith(content);
      });
    });
  });

  context('handlePlacementLink', () => {
    const transformedTarget = 'transformedTarget';

    let appendParamsIfChaseUrlStub;
    let buildPathWithQueryStub;
    let chasePromoClickedStub;
    let wcmTransitionToStub;
    let WcmActions;
    let actionToDispatchStub;

    beforeEach(() => {
      buildPathWithQueryStub = sinon.stub(PathUtils, 'buildPathWithQuery').returns(transformedTarget);
      chasePromoClickedStub = sinon.stub(WebViewHelper, 'chasePromoClicked');
      wcmTransitionToStub = sinon.stub(WcmTransitionHelper, 'wcmTransitionTo');
      appendParamsIfChaseUrlStub = sinon.stub().returns('target');
      actionToDispatchStub = sinon.stub().returns({ type: 'actionToDispatchTestType' });

      WcmActions = proxyquire('src/wcm/actions/wcmActions', {
        'src/shared/helpers/wcmTransitionHelper': { default: wcmTransitionToStub },
        'src/shared/helpers/webViewHelper': WebViewHelper,
        'src/shared/helpers/pathUtils': PathUtils,
        'src/airBooking/helpers/amcvCookieHelper': { appendParamsIfChaseUrl: appendParamsIfChaseUrlStub }
      });
    });

    context('when isWebView', () => {
      it('should call chasePromoClicked when isChasePlacement', () => {
        const params = {
          target: 'target',
          linkType: 'webview',
          isChaseCombo: true,
          isChasePlacement: true,
          referrer: '',
          pageId: 'test'
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: true
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(appendParamsIfChaseUrlStub).to.have.been.calledWith('target', { isChaseCombo: true, pageId: 'test' });
        expect(buildPathWithQueryStub).to.have.been.called;
        expect(chasePromoClickedStub).to.have.been.calledWith(transformedTarget, 'webview', true, '');
        expect(wcmTransitionToStub).to.have.not.been.called;
        expect(actionToDispatchStub).to.have.not.been.called;
      });

      it('should dispatch actionToDispatch with actionParams when actionToDispatch and actionParams are truthy and isChasePlacement is falsy', () => {
        const actionParams = [
          {
            body: { passengerSearchToken: 'testToken' },
            href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
            labelText: 'Upgrade boarding position to A1 - A15',
            method: 'POST'
          }
        ];

        const params = {
          target: 'target',
          linkType: 'webview',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          actionToDispatch: actionToDispatchStub,
          actionParams
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: true
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(actionToDispatchStub).to.have.been.calledWith(...actionParams);
        expect(store.getActions()).to.deep.equal([{ type: 'actionToDispatchTestType' }]);
        expect(chasePromoClickedStub).to.have.not.been.called;
        expect(wcmTransitionToStub).to.have.not.been.called;
      });

      it('should call wcmTransitionTo with WEB_VIEW linktype when linkType is APP', () => {
        const params = {
          target: 'target',
          linkType: 'app',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          pageId: 'test'
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: true
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(appendParamsIfChaseUrlStub).to.have.been.calledWith('target', { isChaseCombo: false, pageId: 'test' });
        expect(buildPathWithQueryStub).to.not.have.been.called;
        expect(chasePromoClickedStub).to.not.have.been.called;
        expect(actionToDispatchStub).to.have.not.been.called;
        expect(wcmTransitionToStub).to.have.been.calledWith({
          target: 'swaAppLink://target',
          linkType: 'webview',
          useWebViewLinkType: false
        });
      });

      it('should call wcmTransitionTo when not isChasePlacement or app linkType or actionToDispatch or actionParams', () => {
        const params = {
          target: 'target',
          linkType: 'webview',
          isChaseCombo: true,
          isChasePlacement: false,
          referrer: '',
          pageId: 'test'
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: true
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(appendParamsIfChaseUrlStub).to.have.been.calledWith('target', { isChaseCombo: true, pageId: 'test' });
        expect(buildPathWithQueryStub).to.have.been.called;
        expect(chasePromoClickedStub).to.have.not.been.called;
        expect(actionToDispatchStub).to.have.not.been.called;
        expect(wcmTransitionToStub).to.have.been.calledWith({
          target: transformedTarget,
          linkType: 'webview',
          useWebViewLinkType: true
        });
      });
    });

    context('not isWebView', () => {
      const isChaseCombo = true;
      const pageId = undefined;

      it('should call wcmTransitionTo with transformed target when not APP linktype and actionToDispatch or actionParams is falsy ', () => {
        const params = {
          target: 'target',
          linkType: 'webview',
          isChaseCombo: true,
          isChasePlacement: false,
          referrer: ''
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: false
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(appendParamsIfChaseUrlStub).to.have.been.calledWith('target', { isChaseCombo, pageId });
        expect(buildPathWithQueryStub).to.have.been.called;
        expect(chasePromoClickedStub).to.have.not.been.called;
        expect(actionToDispatchStub).to.have.not.been.called;
        expect(wcmTransitionToStub).to.have.been.calledWith({
          target: transformedTarget,
          linkType: 'webview',
          useWebViewLinkType: true
        });
      });

      it('should call wcmTransitionTo with target when APP linktype and actionToDispatch or actionParams is falsy', () => {
        const params = {
          target: 'target',
          linkType: 'app',
          isChaseCombo: true,
          isChasePlacement: false,
          referrer: ''
        };

        store = mockStore({
          app: {
            webView: {
              isWebView: false
            }
          }
        });

        store.dispatch(WcmActions.handlePlacementLink(params));

        expect(appendParamsIfChaseUrlStub).to.have.been.calledWith('target', { isChaseCombo, pageId });
        expect(buildPathWithQueryStub).to.have.not.been.called;
        expect(chasePromoClickedStub).to.have.not.been.called;
        expect(actionToDispatchStub).to.have.not.been.called;
        expect(wcmTransitionToStub).to.have.been.calledWith({
          target: 'target',
          linkType: 'app',
          useWebViewLinkType: true
        });
      });
    });

    context('raiseSatelliteEvent', () => {
      it('should call satellite when shouldRaiseSatelliteEvent is true', () => {
        const params = {
          contentBlockId: 'test',
          shouldRaiseSatelliteEvent: true
        };
        const satelliteTrackStub = sinon.stub(window._satellite, 'track');

        store.dispatch(WcmActions.handlePlacementLink(params));
        expect(satelliteTrackStub).to.be.calledWith('squid', { pagedescription: `link:content-test` });
      });

      it('should not call satellite when shouldRaiseSatelliteEvent is false', () => {
        const params = {
          contentBlockId: 'test',
          shouldRaiseSatelliteEvent: false
        };
        const satelliteTrackStub = sinon.stub(window._satellite, 'track');

        store.dispatch(WcmActions.handlePlacementLink(params));
        expect(satelliteTrackStub).to.be.not.called;
      });
    });
  });

  context('When ENABLE_TARGET_CONFIG enabled', () => {
    let fetchBootstrapDataStub;
    let pageId;
    let bootstrapData;

    beforeEach(() => {
      pageId = 'PAGE_ID';
      bootstrapData = {
        default: {
          mboxSettings: {
            contentParameters: { param1: 'app.content.mock', param2: 'app.content.mock1' }
          }
        },
        PAGE_ID: {
          contentParameters: { persona: 'persona', param3: 'app.content.mock3', param4: 'app.content.mock4' }
        }
      };
      store = createMockStore()({
        app: {
          toggles: {
            ENABLE_TARGET_CONFIG: true
          },
          content: {
            mock: 'mock',
            mock1: 'mock1',
            mock2: 'mock2',
            mock3: 'mock3',
            mock4: 'mock4'
          }
        }
      });
      fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData');
    });

    it('should return content params config values from app settings', () => {
      const resetParams = {
        persona: 'Leisure'
      };

      fetchBootstrapDataStub.returns(bootstrapData);

      const expectedMboxConfig = {
        param1: 'mock',
        param2: 'mock1',
        param3: 'mock3',
        param4: 'mock4',
        persona: 'Leisure'
      };
      const contentParams = store.dispatch(WcmActions.getContentParamsFromAppSettings(pageId, resetParams));

      expect(contentParams).to.be.deep.equal(expectedMboxConfig);
    });

    it('should call getContentParamsFromAppSettings when ENABLE_TARGET_CONFIG is enabled', () => {
      sinon.stub(ContentDeliveryApi, 'getContent').returns(Promise.resolve({}));
      sinon.stub(AnalyticsActions, 'updateContentBlockIds').returns({ type: 'update-action' });

      const fetch = fetchBootstrapDataStub.returns({});

      store.dispatch(WcmActions.getPlacements(pageId));

      expect(fetch).to.have.been.calledWith(BootstrapConstants.APP_SETTINGS, {});
    });
  });
});
