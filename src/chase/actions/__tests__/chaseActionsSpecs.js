import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';

import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import * as ChaseApi from 'src/shared/api/chaseApi';
import * as ChasePrequalApi from 'src/shared/api/chasePrequalApi';
import * as ChasePrequalHelper from 'src/shared/helpers/chasePrequalHelper';
import * as ChaseSelector from 'src/shared/selectors/chaseSelector';
import * as ChaseTransformer from 'src/chase/transformers/chaseTransformer';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import * as PaymentPageSelectors from 'src/airBooking/selectors/paymentPageSelectors';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

import ChaseApplicationInfoBuilder from 'test/builders/model/chaseApplicationInfoBuilder';
import ChaseInstantCreditResponseBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/instant-credit/chaseInstantCreditResponseBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';

import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

const { CHASE_TTL_CONFIG_PATH } = BootstrapConstants;

const sinon = sandbox.create();

const mockStore = createMockStore();
const webViewStore = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

const {
  CHASE__FETCH_APPLICATION_STATUS_FAILED,
  CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
  CHASE__RESET_CHASE_APPLICATION_INFO,
  CHASE__RESET_CHASE_TEMPORARY_CARD,
  CHASE__SET_CHASE_BANNER_SHOWN,
  CHASE__SET_CHASE_CREDIT_STATUS,
  CHASE__SET_CHASE_EXISTING_CARD_MEMBER,
  CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
  CHASE__UPDATE_CHASE_FLOW_COMPLETED
} = ChaseActionTypes;

const accountNumber = '12345678';
const error = { error: 'error' };
const expireHomeNavMenuAction = { type: 'expireHomeNavMenuAction' };
const updateChaseAnalyticsCodesAction = { type: 'updateChaseAnalyticsCodesAction' };

const baseMockedRequest = {
  SPID: 'MOCK_SPID',
  CELL: 'MOCK_CELL',
  chaseSessionId: 'MOCK_SESSION_ID',
  isComboApp: true
};

describe('ChaseActions', () => {
  let expireHomeNavMenuStub;
  let getChasePrequalOffersStub;
  let shouldCheckPrequalStub;
  let store;
  let fetchBootstrapDataStub;

  beforeEach(() => {
    expireHomeNavMenuStub = sinon.stub(WcmActions, 'expireHomeNavMenu');
    getChasePrequalOffersStub = sinon.stub(ChasePrequalApi, 'getChasePrequalOffers');
    shouldCheckPrequalStub = sinon.stub(ChaseSelector, 'shouldCheckPrequal');
    store = mockStore({});
    fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns([
      { ttlInSeconds: 86400, type: 'offers' },
      { ttlInSeconds: 86460, type: 'no_offers' },
      { ttlInSeconds: 86520, type: 'foc' }
    ]);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getChasePrequalOffers', () => {
    const codes = {
      acquisitionSourceCodes: '1234',
      highValueIndicator: true,
      offerIdentifier: '5678'
    };
    const emptyCodes = {
      acquisitionSourceCodes: '',
      highValueIndicator: '',
      offerIdentifier: ''
    };

    let loadChasePrequalOffersStub;
    let saveChasePrequalOffersStub;
    let sendChaseOffersStub;
    let toChaseCodesStub;
    let updateChaseAnalyticsCodesStub;

    beforeEach(() => {
      loadChasePrequalOffersStub = sinon.stub(LocalStorageCache, 'loadChasePrequalOffers');
      saveChasePrequalOffersStub = sinon.stub(LocalStorageCache, 'saveChasePrequalOffers');
      sendChaseOffersStub = sinon.stub(WebViewHelper, 'sendChaseOffers');
      toChaseCodesStub = sinon.stub(ChasePrequalHelper, 'toChaseCodes').returns(codes);
      updateChaseAnalyticsCodesStub = sinon
        .stub(AnalyticsActions, 'updateChaseAnalyticsCodes')
        .returns(updateChaseAnalyticsCodesAction);
    });

    it('should return default offers when shouldCheckPrequal returns false', () => {
      shouldCheckPrequalStub.returns(false);
      loadChasePrequalOffersStub.returns(Promise.reject());
      toChaseCodesStub.returns(emptyCodes);

      return store.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
        expect(shouldCheckPrequalStub).to.have.been.called;
        expect(loadChasePrequalOffersStub).to.have.been.called;
        expect(toChaseCodesStub).to.have.been.called;
        expect(sendChaseOffersStub).to.not.have.been.called;
        expect(updateChaseAnalyticsCodesStub).to.have.been.called;

        expect(getChasePrequalOffersStub).to.not.have.been.called;
        expect(saveChasePrequalOffersStub).to.not.have.been.called;

        expect(result).to.deep.equal(DEFAULT_OFFERS);
      });
    });

    it('should return cached offers when in cache', () => {
      const offers = 'offers';

      shouldCheckPrequalStub.returns(sinon.stub().returns(true));
      loadChasePrequalOffersStub.returns(Promise.resolve(offers));

      return store.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
        expect(shouldCheckPrequalStub).to.have.been.called;

        expect(loadChasePrequalOffersStub).to.have.been.called;
        expect(getChasePrequalOffersStub).to.not.have.been.called;
        expect(saveChasePrequalOffersStub).to.not.have.been.called;
        expect(sendChaseOffersStub).to.not.have.been.called;
        expect(toChaseCodesStub).to.have.been.called;
        expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(codes);

        expect(result).to.deep.equal(codes);
      });
    });

    it('should return default offers when fetching offers fails', () => {
      toChaseCodesStub.returns(emptyCodes);
      shouldCheckPrequalStub.returns(sinon.stub().returns(true));
      loadChasePrequalOffersStub.returns(Promise.reject());
      getChasePrequalOffersStub.returns(Promise.reject());

      return store.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
        expect(shouldCheckPrequalStub).to.have.been.called;

        expect(loadChasePrequalOffersStub).to.have.been.called;
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(toChaseCodesStub).to.have.been.called;
        expect(saveChasePrequalOffersStub).to.not.have.been.called;
        expect(sendChaseOffersStub).to.not.have.been.called;
        expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(emptyCodes);

        expect(result).to.deep.equal(emptyCodes);
      });
    });

    it('should return default offers when empty response is returned', () => {
      toChaseCodesStub.returns(emptyCodes);
      shouldCheckPrequalStub.returns(sinon.stub().returns(true));
      loadChasePrequalOffersStub.returns(Promise.reject());
      getChasePrequalOffersStub.returns(Promise.resolve(undefined));

      return store.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
        expect(shouldCheckPrequalStub).to.have.been.called;

        expect(loadChasePrequalOffersStub).to.have.been.called;
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(toChaseCodesStub).to.have.been.called;
        expect(saveChasePrequalOffersStub).to.not.have.been.called;
        expect(sendChaseOffersStub).to.not.have.been.called;
        expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(emptyCodes);

        expect(result).to.deep.equal(emptyCodes);
      });
    });
    context('wcm returns', () => {
      const updatedStore = mockStore({
        app: {
          account: {
            accountNumber
          }
        }
      });
      const response = {
        offers: [{ key: 'value' }]
      };

      const expectedOffers = {
        expirationTimestamp: sinon.match.any,
        focCalled: false,
        ...response,
        accountNumber: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
      };

      context('offers', () => {
        it('should save and return offers', () => {
          shouldCheckPrequalStub.returns(sinon.stub().returns(true));
          loadChasePrequalOffersStub.returns(Promise.reject());
          getChasePrequalOffersStub.returns(Promise.resolve(response));
          expireHomeNavMenuStub.returns(expireHomeNavMenuAction);

          return updatedStore.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
            const expectedActions = updatedStore.getActions();

            expect(fetchBootstrapDataStub).to.have.been.calledWith(CHASE_TTL_CONFIG_PATH, []);
            expect(getChasePrequalOffersStub).to.have.been.called;
            expect(loadChasePrequalOffersStub).to.have.been.called;
            expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(codes);
            expect(saveChasePrequalOffersStub).to.have.been.calledWith(expectedOffers, 1440);
            expect(sendChaseOffersStub).to.have.been.calledWith(expectedOffers);

            expect(expectedActions[0]).to.deep.equal(expireHomeNavMenuAction);
            expect(expectedActions[1]).to.deep.equal(updateChaseAnalyticsCodesAction);

            expect(result).to.deep.equal(codes);
          });
        });
      });

      context('no offers', () => {
        it('should save and return no offers', () => {
          const expectedNoOffers = {
            expirationTimestamp: sinon.match.any,
            focCalled: false,
            accountNumber: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
          };

          toChaseCodesStub.returns(emptyCodes);
          shouldCheckPrequalStub.returns(sinon.stub().returns(true));
          loadChasePrequalOffersStub.returns(Promise.reject());
          getChasePrequalOffersStub.returns(Promise.resolve({}));
          expireHomeNavMenuStub.returns({ type: 'expireHomeNavMenuAction' });

          return updatedStore.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
            const expectedActions = updatedStore.getActions();

            expect(fetchBootstrapDataStub).to.have.been.calledWith(CHASE_TTL_CONFIG_PATH, []);
            expect(getChasePrequalOffersStub).to.have.been.called;
            expect(loadChasePrequalOffersStub).to.have.been.called;
            expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(emptyCodes);
            expect(saveChasePrequalOffersStub).to.have.been.calledWith(expectedNoOffers, 1441);
            expect(sendChaseOffersStub).to.have.been.called;

            expect(expectedActions[0]).to.deep.equal(expireHomeNavMenuAction);
            expect(expectedActions[1]).to.deep.equal(updateChaseAnalyticsCodesAction);

            expect(result).to.deep.equal(emptyCodes);
          });
        });

        context('the chaseTtlConfig value is null', () => {
          const updatedStore = mockStore({
            app: {
              account: {
                accountNumber
              }
            }
          });

          it('should use the cached prequal offers in seconds', () => {
            fetchBootstrapDataStub.returns([]);
            toChaseCodesStub.returns(emptyCodes);
            shouldCheckPrequalStub.returns(sinon.stub().returns(true));
            loadChasePrequalOffersStub.returns(Promise.reject());
            getChasePrequalOffersStub.returns(Promise.resolve(response));
            expireHomeNavMenuStub.returns({ type: 'expireHomeNavMenuAction' });

            return updatedStore.dispatch(ChaseActions.getChasePrequalOffers()).then((result) => {
              const expectedActions = updatedStore.getActions();

              expect(getChasePrequalOffersStub).to.have.been.called;
              expect(loadChasePrequalOffersStub).to.have.been.called;
              expect(updateChaseAnalyticsCodesStub).to.have.been.calledWith(emptyCodes);
              expect(saveChasePrequalOffersStub).to.have.been.calledWith(expectedOffers);
              expect(sendChaseOffersStub).to.have.been.called;

              expect(expectedActions[0]).to.deep.equal(expireHomeNavMenuAction);
              expect(expectedActions[1]).to.deep.equal(updateChaseAnalyticsCodesAction);
              expect(expectedActions.length).to.eq(2);

              expect(result).to.deep.equal(emptyCodes);
            });
          });
        });
      });
    });
  });

  context('update chase completed flow', () => {
    it('should update chase completed flow', () => {
      const isChaseFlowCompleted = true;
      const expectedAction = {
        type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
        isChaseFlowCompleted
      };

      expect(ChaseActions.updateChaseFlowCompleted(isChaseFlowCompleted)).to.deep.equal(expectedAction);
    });
  });

  context('setChaseCreditStatus', () => {
    it('should set chase credit status with passed in argument', () => {
      const creditStatus = true;

      const result = ChaseActions.setChaseCreditStatus(creditStatus);

      expect(result).to.deep.equal({
        type: CHASE__SET_CHASE_CREDIT_STATUS,
        creditStatus
      });
    });
  });

  context('setShouldRetryInstantCreditsCall', () => {
    it('should set shouldSetRetryInstantCreditsCall with passed in argument', () => {
      const shouldSetRetryInstantCreditsCall = true;

      const result = ChaseActions.setShouldRetryInstantCreditsCall(shouldSetRetryInstantCreditsCall);

      expect(result).to.deep.equal({
        type: CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
        shouldSetRetryInstantCreditsCall
      });
    });

    context('when no argument is passed in', () => {
      it('should set shouldSetRetryInstantCreditsCall to false', () => {
        const result = ChaseActions.setShouldRetryInstantCreditsCall();

        expect(result).to.deep.equal({
          type: CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
          shouldSetRetryInstantCreditsCall: false
        });
      });
    });
  });

  context('setIsChaseExistingCardMember', () => {
    it('should generate correct action', () => {
      const result = ChaseActions.setIsChaseExistingCardMember('ecm');

      expect(result).to.deep.equal({
        type: CHASE__SET_CHASE_EXISTING_CARD_MEMBER,
        isChaseExistingCardMember: true
      });
    });
  });

  context('setChaseBannerShown', () => {
    it('should set chase banner shown with passed in parameter', () => {
      const isChaseBannerShown = true;

      const result = ChaseActions.setChaseBannerShown(isChaseBannerShown);

      expect(result).to.deep.equal({
        type: CHASE__SET_CHASE_BANNER_SHOWN,
        isChaseBannerShown
      });
    });
  });

  context('resetChaseData', () => {
    it('should reset chase data', () => {
      const removeChaseSessionIdStub = sinon.stub(AccountInfoHelper, 'removeChaseSessionId');

      store.dispatch(ChaseActions.resetChaseData());

      expect(removeChaseSessionIdStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: CHASE__RESET_CHASE_TEMPORARY_CARD
        },
        {
          type: CHASE__RESET_CHASE_APPLICATION_INFO
        }
      ]);
    });
  });

  context('handleFirmOfferOfCredit', () => {
    const expirationTimestamp = 123456789;
    const offerIdentifier = 'offerIdentifier';
    const focCalled = false;
    const offers = { expirationTimestamp, focCalled, offerIdentifier, accountNumber, swaOffersIdentitySource: 't' };

    let confirmCustomerViewedFirmOfferOfCreditStub;
    let loadChasePrequalOffersStub;
    let saveChasePrequalOffersStub;
    let sendChaseOffersStub;

    beforeEach(() => {
      confirmCustomerViewedFirmOfferOfCreditStub = sinon.stub(
        ChasePrequalApi,
        'confirmCustomerViewedFirmOfferOfCredit'
      );
      loadChasePrequalOffersStub = sinon.stub(LocalStorageCache, 'loadChasePrequalOffers');
      saveChasePrequalOffersStub = sinon.stub(LocalStorageCache, 'saveChasePrequalOffers');
      sendChaseOffersStub = sinon.stub(WebViewHelper, 'sendChaseOffers');
    });

    it('should call confirmCustomerViewedFirmOfferOfCredit with cached offer', () => {
      loadChasePrequalOffersStub.returns(Promise.resolve(offers));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.have.been.calledWith(offerIdentifier);
      });
    });

    it('should call confirmCustomerViewedFirmOfferOfCredit with additional params', () => {
      const additionalParams = { SPID: 'GKLL', CELL: '23532' };

      loadChasePrequalOffersStub.returns(Promise.resolve(offers));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit(additionalParams)).then(() => {
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.have.been.calledWith(offerIdentifier, {
          CELL: '23532',
          SPID: 'GKLL',
          loginState: false,
          swaOffersIdentitySource: 't'
        });
      });
    });

    it('should not call confirmCustomerViewedFirmOfferOfCredit with cached offer when focCalled is true', () => {
      const updatedOffers = { ...offers, focCalled: true, accountNumber };

      loadChasePrequalOffersStub.returns(Promise.resolve(updatedOffers));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.not.have.been.called;
      });
    });

    it('should save offer and send to native on successful confirmCustomerViewedFirmOfferOfCredit call', () => {
      const updatedOffers = { ...offers, focCalled: true, accountNumber };

      confirmCustomerViewedFirmOfferOfCreditStub.returns(Promise.resolve(offerIdentifier));
      loadChasePrequalOffersStub.returns(Promise.resolve(offers));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(saveChasePrequalOffersStub).to.have.been.calledWith(updatedOffers, null, expirationTimestamp);
        expect(sendChaseOffersStub).to.have.been.calledWith(updatedOffers);
      });
    });

    it('should not throw error confirmCustomerViewedFirmOfferOfCredit fails', () => {
      loadChasePrequalOffersStub.returns(Promise.resolve(offers));
      confirmCustomerViewedFirmOfferOfCreditStub.returns(Promise.reject(new Error()));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.have.been.calledWith(offerIdentifier);
      });
    });

    it('should not call confirmCustomerViewedFirmOfferOfCredit with no cached offers', () => {
      loadChasePrequalOffersStub.returns(Promise.reject());

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.not.have.been.called;
      });
    });

    it('should not call confirmCustomerViewedFirmOfferOfCredit with empty offerIdentifier', () => {
      const updatedOffers = { ...offers, offerIdentifier: '' };

      loadChasePrequalOffersStub.returns(Promise.resolve(updatedOffers));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.not.have.been.called;
      });
    });

    it('should not call confirmCustomerViewedFirmOfferOfCredit with no offerData', () => {
      loadChasePrequalOffersStub.returns(Promise.resolve(undefined));

      return store.dispatch(ChaseActions.handleFirmOfferOfCredit()).then(() => {
        expect(loadChasePrequalOffersStub).to.have.been.calledWith(false);
        expect(confirmCustomerViewedFirmOfferOfCreditStub).to.not.have.been.called;
      });
    });
  });

  context('getChaseApplicationInfo', () => {
    let getApplicationInfoStub;

    const { CHASE__GET_APPLICATION_INFO, CHASE__GET_APPLICATION_INFO_SUCCESS, CHASE__GET_APPLICATION_INFO_FAILED } =
      ChaseActionTypes;

    const mockedRequest = {
      ...baseMockedRequest,
      returnToURL: 'MOCK_RETURN_TO_URL',
      appendToDAOURL: {
        mcvid: 'mcvid',
        clk: 'clk',
        datachannel: 'datachannel'
      }
    };

    const mockedSuccessResponse = {
      links: [
        {
          rel: 'DAOCARD-URL',
          href: 'fake-href'
        }
      ],
      originationApplicationIdentifier: '33285f07-f9a2-4805-8b00-59013ab7cb3c'
    };

    beforeEach(() => {
      getApplicationInfoStub = sinon.stub(ChaseApi, 'getApplicationInfo').resolves(mockedSuccessResponse);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should get Chase application info', async () => {
      await store.dispatch(ChaseActions.getChaseApplicationInfo(mockedRequest));
      const actions = store.getActions();

      expect(getApplicationInfoStub).to.have.been.calledWith(mockedRequest);
      expect(actions).to.deep.equal([
        {
          type: CHASE__GET_APPLICATION_INFO,
          request: mockedRequest,
          isFetching: true
        },
        {
          type: CHASE__GET_APPLICATION_INFO_SUCCESS,
          response: mockedSuccessResponse,
          isFetching: false
        }
      ]);
    });

    it('should trigger an error if create prefill is rejected', () => {
      getApplicationInfoStub.rejects(error);

      return store.dispatch(ChaseActions.getChaseApplicationInfo(mockedRequest)).catch((expectedError) => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: CHASE__GET_APPLICATION_INFO,
            request: mockedRequest,
            isFetching: true
          },
          {
            type: CHASE__GET_APPLICATION_INFO_FAILED,
            isFetching: false
          }
        ]);
        expect(expectedError).to.deep.equal(error);
      });
    });
  });

  context('createChaseSession', () => {
    let createChaseSessionApiStub;
    let saveChaseSessionIdStub;
    let saveSwaOffersIdentityStub;
    let deleteChasePrequalOffers;

    const {
      CHASE__CREATE_SESSION_FOR_CHASE,
      CHASE__CREATE_SESSION_FOR_CHASE_SUCCESS,
      CHASE__CREATE_SESSION_FOR_CHASE_FAILED
    } = ChaseActionTypes;

    const mockedSuccessResponse = {
      chaseSessionId: 'MOCK_SESSION_ID'
    };

    beforeEach(() => {
      createChaseSessionApiStub = sinon.stub(ChaseApi, 'createSession');
      saveChaseSessionIdStub = sinon.stub(LocalStorageCache, 'saveChaseSessionId');
      saveSwaOffersIdentityStub = sinon.stub(LocalStorageCache, 'saveSwaOffersIdentity');
      deleteChasePrequalOffers = sinon.stub(LocalStorageCache, 'deleteChasePrequalOffers');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should request a session ID from the Chase API', async () => {
      createChaseSessionApiStub.resolves(mockedSuccessResponse);
      expireHomeNavMenuStub.returns(expireHomeNavMenuAction);

      await store.dispatch(ChaseActions.createChaseSession('mock/url', true));

      expect(createChaseSessionApiStub).to.be.calledWithExactly('mock/url', true, undefined);
      expect(store.getActions()).to.deep.equal([
        {
          type: CHASE__CREATE_SESSION_FOR_CHASE,
          isFetching: true
        },
        {
          type: CHASE__CREATE_SESSION_FOR_CHASE_SUCCESS,
          response: mockedSuccessResponse,
          isFetching: false
        },
        expireHomeNavMenuAction
      ]);
    });

    it('should request a session ID from the Chase API with encryptedRapidRewardsNumber', async () => {
      const mockEncryptedRapidRewardsNumber = 'abc123';

      createChaseSessionApiStub.resolves(mockedSuccessResponse);
      expireHomeNavMenuStub.returns(expireHomeNavMenuAction);

      await store.dispatch(ChaseActions.createChaseSession('mock/url', true, mockEncryptedRapidRewardsNumber));

      expect(createChaseSessionApiStub).to.have.been.calledWithExactly(
        'mock/url',
        true,
        mockEncryptedRapidRewardsNumber
      );
      expect(store.getActions()).to.deep.equal([
        {
          type: CHASE__CREATE_SESSION_FOR_CHASE,
          isFetching: true
        },
        {
          type: CHASE__CREATE_SESSION_FOR_CHASE_SUCCESS,
          response: mockedSuccessResponse,
          isFetching: false
        },
        expireHomeNavMenuAction
      ]);
    });

    it('should update localstorage and update nav if Chase API resolves with a session ID', async () => {
      createChaseSessionApiStub.resolves(mockedSuccessResponse);
      expireHomeNavMenuStub.returns(expireHomeNavMenuAction);

      await store.dispatch(ChaseActions.createChaseSession('mock/url', true));

      const expectedActions = store.getActions();

      expect(saveChaseSessionIdStub).to.be.calledWith(mockedSuccessResponse.chaseSessionId);
      expect(saveSwaOffersIdentityStub).to.be.called;
      expect(deleteChasePrequalOffers).to.be.called;
      expect(expectedActions[2]).to.deep.equal(expireHomeNavMenuAction);
    });

    it('should not update localstorage if Chase API resolves but does not provide a session ID', async () => {
      createChaseSessionApiStub.resolves({ chaseSessionId: null });

      await store.dispatch(ChaseActions.createChaseSession('mock/url', true));

      expect(saveChaseSessionIdStub).to.not.be.called;
      expect(saveSwaOffersIdentityStub).to.not.be.called;
      expect(deleteChasePrequalOffers).to.not.be.called;

      expect(store.getActions()[1]).to.deep.equal({
        type: CHASE__CREATE_SESSION_FOR_CHASE_SUCCESS,
        response: { chaseSessionId: null },
        isFetching: false
      });
    });

    it('should use default response value when it resolves and returns undefined', async () => {
      createChaseSessionApiStub.resolves(undefined);

      await store.dispatch(ChaseActions.createChaseSession('mock/url', true));

      expect(saveChaseSessionIdStub).to.not.be.called;
      expect(saveSwaOffersIdentityStub).to.not.be.called;
      expect(deleteChasePrequalOffers).to.not.be.called;

      expect(store.getActions()[1]).to.deep.equal({
        type: CHASE__CREATE_SESSION_FOR_CHASE_SUCCESS,
        isFetching: false
      });
    });

    it('should trigger to createSessionForChaseFailed action when Chase API rejects', () => {
      createChaseSessionApiStub.rejects(error);

      return store.dispatch(ChaseActions.createChaseSession('mock/url', true)).catch((expectedError) => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: CHASE__CREATE_SESSION_FOR_CHASE,
            isFetching: true
          },
          {
            type: CHASE__CREATE_SESSION_FOR_CHASE_FAILED,
            isFetching: false
          }
        ]);
        expect(expectedError).to.deep.equal(error);
      });
    });

    context('webview', () => {
      it('should update localstorage and not update nav if Chase API resolves with a session ID', async () => {
        const updatedStore = mockStore(webViewStore);

        createChaseSessionApiStub.resolves(mockedSuccessResponse);
        expireHomeNavMenuStub.returns(expireHomeNavMenuAction);

        await updatedStore.dispatch(ChaseActions.createChaseSession('mock/url', true));

        expect(saveChaseSessionIdStub).to.be.calledWith(mockedSuccessResponse.chaseSessionId);
        expect(saveSwaOffersIdentityStub).to.be.called;
        expect(deleteChasePrequalOffers).to.be.called;
      });
    });
  });

  context('getChaseApplicationStatus', () => {
    let generatePassengerPageInfoStub;
    let loadChaseSessionIdStub;
    let regeneratePurchaseSummaryPageStub;
    let retrieveChaseInstantCreditResponseStub;
    let saveChaseCardPaymentInfoStub;
    let shouldShowChaseInstantCreditCardStub;
    let toApplicationInfoStub;

    const applicationInfoApprovedStatus = new ChaseApplicationInfoBuilder().build();
    const fakeAction = { type: 'fakeAction' };
    const { flightPricingPage } = new PricesBuilder().build();
    const instantCreditApprovedResponse = new ChaseInstantCreditResponseBuilder().build();
    const passengerInfos = 'passengerInfos';
    const searchRequest = new SearchForFlightsRequestBuilder().build();
    const selectedProducts = 'selectedProducts';

    const { CHASE__FETCH_APPLICATION_STATUS, CHASE__SET_CHASE_CREDIT_STATUS, CHASE__UPDATE_CHASE_FLOW_COMPLETED } =
      ChaseActionTypes;

    beforeEach(() => {
      generatePassengerPageInfoStub = sinon.stub(AirBookingActions, 'generatePassengerPageInfo').returns(fakeAction);
      loadChaseSessionIdStub = sinon.stub(AirBookingActions, 'loadChaseSessionId');
      regeneratePurchaseSummaryPageStub = sinon
        .stub(AirBookingActions, 'regeneratePurchaseSummaryPage')
        .returns(fakeAction);
      retrieveChaseInstantCreditResponseStub = sinon.stub(ChaseApi, 'retrieveChaseInstantCreditResponse');
      saveChaseCardPaymentInfoStub = sinon.stub(AirBookingActions, 'saveChaseCardPaymentInfo').returns(fakeAction);
      shouldShowChaseInstantCreditCardStub = sinon
        .stub(PaymentPageSelectors, 'shouldShowChaseInstantCreditCard')
        .returns(true);
      toApplicationInfoStub = sinon.stub(ChaseTransformer, 'toApplicationInfo');

      store = mockStore({
        app: {
          airBooking: {
            flightPricingPage: { response: flightPricingPage },
            passengerInfos,
            searchRequest,
            selectedProducts
          },
          chase: {
            applicationInfo: {
              ...applicationInfoApprovedStatus
            }
          }
        }
      });
    });

    it('should not fetch data with no chase session id', () => {
      loadChaseSessionIdStub.returns(Promise.reject(error));

      return store.dispatch(ChaseActions.getChaseApplicationStatus()).catch(() => {
        expect(loadChaseSessionIdStub).to.have.been.calledOnce;
        expect(store.getActions()).to.deep.equal([]);
      });
    });

    context('with valid chase session', () => {
      it('should handle approved status with sufficient funds and account number', () => {
        const chaseSessionId = 'chaseSessionId';
        const { chaseCreditStatus, chaseApplicationCompleted } = applicationInfoApprovedStatus;

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditApprovedResponse));
        toApplicationInfoStub.returns(applicationInfoApprovedStatus);

        return store.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(generatePassengerPageInfoStub).to.be.calledOnce;
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(regeneratePurchaseSummaryPageStub).to.be.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;
          expect(saveChaseCardPaymentInfoStub).to.be.calledOnce;
          expect(shouldShowChaseInstantCreditCardStub).to.be.calledOnce;

          expect(store.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: applicationInfoApprovedStatus
              }
            },
            {
              type: CHASE__SET_CHASE_CREDIT_STATUS,
              creditStatus: chaseCreditStatus
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: chaseApplicationCompleted
            },
            fakeAction,
            fakeAction,
            fakeAction
          ]);
        });
      });

      it('should handle declined status', () => {
        const applicationInfoDeclinedStatus = new ChaseApplicationInfoBuilder().withDeclinedStatus().build();
        const { chaseCreditStatus, chaseApplicationCompleted } = applicationInfoDeclinedStatus;
        const chaseSessionId = 'chaseSessionId';
        const instantCreditDeclinedResponse = new ChaseInstantCreditResponseBuilder().withDeclinedStatus().build();

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditDeclinedResponse));
        toApplicationInfoStub.returns(applicationInfoDeclinedStatus);

        const declinedStatusStore = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: flightPricingPage },
              passengerInfos,
              searchRequest,
              selectedProducts
            },
            chase: {
              applicationInfo: {
                ...applicationInfoDeclinedStatus
              }
            }
          }
        });

        return declinedStatusStore.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;

          expect(declinedStatusStore.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: applicationInfoDeclinedStatus
              }
            },
            {
              type: CHASE__SET_CHASE_CREDIT_STATUS,
              creditStatus: chaseCreditStatus
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: chaseApplicationCompleted
            }
          ]);
        });
      });

      it('should handle pending status', () => {
        const applicationInfoPendingStatus = new ChaseApplicationInfoBuilder().withDeclinedStatus().build();
        const { chaseCreditStatus, chaseApplicationCompleted } = applicationInfoPendingStatus;
        const chaseSessionId = 'chaseSessionId';
        const instantCreditPendingResponse = new ChaseInstantCreditResponseBuilder().withDeclinedStatus().build();

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditPendingResponse));
        toApplicationInfoStub.returns(applicationInfoPendingStatus);

        const pendingStatusStore = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: flightPricingPage },
              passengerInfos,
              searchRequest,
              selectedProducts
            },
            chase: {
              applicationInfo: {
                ...applicationInfoPendingStatus
              }
            }
          }
        });

        return pendingStatusStore.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;

          expect(pendingStatusStore.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: applicationInfoPendingStatus
              }
            },
            {
              type: CHASE__SET_CHASE_CREDIT_STATUS,
              creditStatus: chaseCreditStatus
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: chaseApplicationCompleted
            }
          ]);
        });
      });

      it('should handle insufficient funds', () => {
        const applicationInfoInsufficientFunds = new ChaseApplicationInfoBuilder().build();
        const { chaseCreditStatus, chaseApplicationCompleted } = applicationInfoInsufficientFunds;
        const chaseSessionId = 'chaseSessionId';
        const showDialogStub = sinon.stub(DialogActions, 'showDialog').returns(fakeAction);

        toApplicationInfoStub.returns(applicationInfoInsufficientFunds);
        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditApprovedResponse));
        shouldShowChaseInstantCreditCardStub.returns(false);

        const insufficientFundsStore = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: flightPricingPage },
              passengerInfos,
              searchRequest,
              selectedProducts
            },
            chase: {
              applicationInfo: {
                ...applicationInfoInsufficientFunds
              }
            }
          }
        });

        return insufficientFundsStore.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(generatePassengerPageInfoStub).to.be.calledOnce;
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(regeneratePurchaseSummaryPageStub).to.be.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;
          expect(showDialogStub).to.be.calledOnce;
          expect(shouldShowChaseInstantCreditCardStub).to.be.calledOnce;

          expect(insufficientFundsStore.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: applicationInfoApprovedStatus
              }
            },
            {
              type: CHASE__SET_CHASE_CREDIT_STATUS,
              creditStatus: chaseCreditStatus
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: chaseApplicationCompleted
            },
            fakeAction,
            fakeAction,
            fakeAction
          ]);
        });
      });

      it('should handle no account number', () => {
        const applicationInfoNoAccountNumber = new ChaseApplicationInfoBuilder().withNoAccountNumber().build();
        const { chaseCreditStatus, chaseApplicationCompleted } = applicationInfoNoAccountNumber;
        const instantCreditNoAccountNumberResponse = new ChaseInstantCreditResponseBuilder()
          .withNoAccountNumber()
          .build();
        const chaseSessionId = 'chaseSessionId';

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditNoAccountNumberResponse));
        toApplicationInfoStub.returns(applicationInfoNoAccountNumber);

        const noAccountNumberStore = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: flightPricingPage },
              passengerInfos,
              searchRequest,
              selectedProducts
            },
            chase: {
              applicationInfo: {
                ...applicationInfoNoAccountNumber
              }
            }
          }
        });

        return noAccountNumberStore.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;
          expect(saveChaseCardPaymentInfoStub).to.be.calledOnce;
          expect(shouldShowChaseInstantCreditCardStub).to.be.calledOnce;

          expect(noAccountNumberStore.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: applicationInfoNoAccountNumber
              }
            },
            {
              type: CHASE__SET_CHASE_CREDIT_STATUS,
              creditStatus: chaseCreditStatus
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: chaseApplicationCompleted
            },
            fakeAction
          ]);
        });
      });

      it('should handle failure when instant credits call fails', () => {
        const chaseSessionId = 'chaseSessionId';

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.reject());

        const store = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: flightPricingPage },
              passengerInfos,
              searchRequest,
              selectedProducts
            },
            chase: {
              applicationInfo: {}
            }
          }
        });

        return store.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;

          expect(store.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_FAILED,
              isFetching: false
            }
          ]);
        });
      });

      it('should handle undefined applicationInfo', () => {
        const chaseSessionId = 'chaseSessionId';

        loadChaseSessionIdStub.returns(Promise.resolve(chaseSessionId));
        retrieveChaseInstantCreditResponseStub.returns(Promise.resolve(instantCreditApprovedResponse));
        toApplicationInfoStub.returns(undefined);

        return store.dispatch(ChaseActions.getChaseApplicationStatus()).then(() => {
          expect(loadChaseSessionIdStub).to.have.been.calledOnce;
          expect(retrieveChaseInstantCreditResponseStub).to.be.calledOnce;

          expect(store.getActions()).to.deep.equal([
            {
              type: CHASE__FETCH_APPLICATION_STATUS,
              isFetching: true
            },
            {
              type: CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
              isFetching: false,
              response: {
                applicationInfo: undefined
              }
            },
            {
              type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
              isChaseFlowCompleted: false
            }
          ]);
        });
      });
    });
  });
});
