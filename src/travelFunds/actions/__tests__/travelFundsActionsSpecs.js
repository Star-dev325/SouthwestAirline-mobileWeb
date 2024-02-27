import { sandbox } from 'sinon';

import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as TravelFundsApi from 'src/shared/api/travelFundsApi';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';

import { TRAVEL_FUNDS_ID } from 'src/wcm/constants/wcmConstants';
import { STATUS } from 'src/shared/constants/flowConstants';

const sinon = sandbox.create();
const mockStore = createMockStore();

const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };
const {
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_FAILED,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_FAILED,
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS,
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_FAILED,
  TRAVEL_FUNDS__SAVE_PREV_SEARCH,
  TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_FAILED
} = travelFundActionTypes;

describe('TravelFundsActions', () => {
  let store;
  let travelFundLookupRequest;
  let validateFundsRequest;

  beforeEach(() => {
    travelFundLookupRequest = {
      method: 'POST',
      href: `/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS`,
      body: {
        travelFundIdentifier: 'ABC123',
        firstName: 'Firstname',
        lastName: 'Lastname'
      }
    };

    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('lookup actions', () => {
    it('resetLookupFlowData', () => {
      expect(TravelFundsActions.resetLookupFlowData()).to.deep.equal({
        type: 'TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA'
      });
    });

    it('updateSelectedLookupTab', () => {
      expect(TravelFundsActions.updateSelectedLookupTab('travel-funds')).to.deep.equal({
        type: 'TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB',
        selection: 'travel-funds'
      });
    });

    it('clearAllLookUpForms', () => {
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      store.dispatch(TravelFundsActions.clearAllLookUpForms());

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        clearFormDataByIdStub,
        clearFormDataByIdStub,
        clearFormDataByIdStub
      ]);
    });

    it('clearAllApplyForms', () => {
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      store.dispatch(TravelFundsActions.clearAllApplyForms());

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        clearFormDataByIdStub,
        clearFormDataByIdStub,
        clearFormDataByIdStub
      ]);
    });

    context('look up travel funds', () => {
      beforeEach(() => {
        sinon.stub(TravelFundsApi, 'retrieveTravelFunds').returns(Promise.resolve('response'));
        sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      });

      it('should call the travel funds API when given a request', async () => {
        await store.dispatch(TravelFundsActions.retrieveTravelFunds(travelFundLookupRequest));

        expect(TravelFundsApi.retrieveTravelFunds).to.be.calledWith(travelFundLookupRequest);
      });

      context(
        'should trigger fetchTravelFundsSuccess action, reset redux flow action, and save search when Travel Funds API succeeds',
        () => {
          it('should send isRefreshCall false when no param is passed in', async () => {
            await store
              .dispatch(TravelFundsActions.retrieveTravelFunds(travelFundLookupRequest))
              .then((res) => expect(res).to.equal('response'));
            const actions = store.getActions();

            expect(actions).to.deep.equal([
              {
                type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
                request: travelFundLookupRequest,
                isFetching: true
              },
              {
                type: TRAVEL_FUNDS__SAVE_PREV_SEARCH,
                request: travelFundLookupRequest
              },
              {
                type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
                isFetching: false,
                response: {
                  isRefreshCall: false,
                  viewTravelFund: undefined,
                  mktg_data: undefined
                }
              },
              clearFormDataByIdStub,
              clearFormDataByIdStub,
              clearFormDataByIdStub
            ]);
          });

          it('should send isRefreshCall param when one is passed in', async () => {
            await store
              .dispatch(TravelFundsActions.retrieveTravelFunds(travelFundLookupRequest, true))
              .then((res) => expect(res).to.equal('response'));
            const actions = store.getActions();

            expect(actions).to.deep.equal([
              {
                type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
                request: travelFundLookupRequest,
                isFetching: true
              },
              {
                type: TRAVEL_FUNDS__SAVE_PREV_SEARCH,
                request: travelFundLookupRequest
              },
              {
                type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
                isFetching: false,
                response: {
                  isRefreshCall: true,
                  viewTravelFund: undefined,
                  mktg_data: undefined
                }
              },
              clearFormDataByIdStub,
              clearFormDataByIdStub,
              clearFormDataByIdStub
            ]);
          });
        }
      );

      it('should trigger to fetchTravelFundsFailed action and reset redux flow action when Travel Funds API failed', async () => {
        TravelFundsApi.retrieveTravelFunds.returns(Promise.reject('error'));

        await store
          .dispatch(TravelFundsActions.retrieveTravelFunds(travelFundLookupRequest))
          .catch((err) => expect(err).to.equal('error'));

        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
            request: travelFundLookupRequest,
            isFetching: true
          },
          {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);
      });
    });

    context('unused travel funds', () => {
      beforeEach(() => {
        sinon.stub(TravelFundsApi, 'retrieveTravelFunds').resolves({ viewTravelFund: 'response', message: null });
      });

      it('should call the unused funds API when given a request', async () => {
        await store.dispatch(TravelFundsActions.retrieveTravelFunds());

        expect(TravelFundsApi.retrieveTravelFunds).to.be.called;
      });

      it('should trigger fetchTravelFundsSuccess action and reset redux flow action when Travel Funds API succeeds', async () => {
        await store.dispatch(
          TravelFundsActions.retrieveUnusedFunds({
            href: 'v1/mobile-air-booking/page/view-fund',
            method: 'GET'
          })
        );

        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: TRAVEL_FUNDS__FETCH_UNUSED_FUNDS,
            request: {
              href: 'v1/mobile-air-booking/page/view-fund',
              method: 'GET'
            },
            isFetching: true
          },
          {
            type: TRAVEL_FUNDS__SAVE_PREV_SEARCH,
            request: {
              href: 'v1/mobile-air-booking/page/view-fund',
              method: 'GET'
            }
          },
          {
            type: TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS,
            response: { viewTravelFund: 'response', message: null },
            isFetching: false
          }
        ]);
      });

      it('should trigger to fetchTravelFundsFailed action and reset redux flow action when Travel Funds API failed', async () => {
        TravelFundsApi.retrieveTravelFunds.rejects({ error: 'error' });

        await store.dispatch(TravelFundsActions.retrieveUnusedFunds());

        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: TRAVEL_FUNDS__FETCH_UNUSED_FUNDS,
            isFetching: true
          },
          {
            type: TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });
  });

  context('Apply Travel Funds actions', () => {
    it('updateSelectedApplyTab', () => {
      expect(TravelFundsActions.updateSelectedApplyTab('travel-funds')).to.deep.equal({
        type: 'TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB',
        selection: 'travel-funds'
      });
    });
  });

  context('validateTransferFunds', () => {
    beforeEach(() => {
      validateFundsRequest = {
        body: {
          fundSearchToken: 'fundToken'
        },
        labelText: 'labelText',
        href: '/v1/mobile-air-booking/page/transfer-fund',
        method: 'PUT'
      };
      sinon.stub(TravelFundsApi, 'retrieveTravelFunds').returns(Promise.resolve('response'));
    });

    it('should call retrieveTravelFunds api call when given a request', async () => {
      await store.dispatch(TravelFundsActions.validateTransferFunds(validateFundsRequest));

      expect(TravelFundsApi.retrieveTravelFunds).to.be.calledWith(validateFundsRequest);
    });

    it('should trigger fetchValidateFundsSuccess action when Travel Funds API succeeds', async () => {
      await store.dispatch(TravelFundsActions.validateTransferFunds(validateFundsRequest));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS,
          request: validateFundsRequest,
          isFetching: true
        },
        {
          flowName: 'travelFunds',
          status: STATUS.IN_PROGRESS,
          type: FlowStatusActionTypes.SET_FLOW_STATUS
        },
        {
          type: TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
          isFetching: false
        }
      ]);
    });

    it('should trigger to fetchValidateFundsFailed action when Travel Funds API failed', async () => {
      TravelFundsApi.retrieveTravelFunds.returns(Promise.reject('error'));

      try {
        await store.dispatch(TravelFundsActions.validateTransferFunds(validateFundsRequest));

        expect.fail('An error should be thrown when retrieveTravelFunds fails');
      } catch (error) {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS,
            request: validateFundsRequest,
            isFetching: true
          },
          {
            type: TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);
        expect(error).to.equal('error');
      }
    });
  });

  context('transferTravelFunds', () => {
    let transferTravelFundsRequest;

    beforeEach(() => {
      transferTravelFundsRequest = {
        body: {
          fundSearchToken: 'fundToken',
          recipientFirstName: 'Chandler',
          recipientLastName: 'Bing',
          recipientAccountNumber: '601940404',
          recipientEmailAddress: 'chandler@bing.com',
          personalMessage: 'personal message',
          receiptEmailAddress: 'e@a.com',
          transferAmount: {
            currencySymbol: '$',
            currencyType: 'USD',
            amount: '10.00'
          }
        },
        labelText: 'labelText',
        href: '/v1/mobile-air-booking/page/transfer-fund',
        method: 'POST'
      };
      sinon.stub(TravelFundsApi, 'retrieveTravelFunds').returns(Promise.resolve('response'));
    });

    it('should call retrieveTravelFunds api call when given a request', async () => {
      await store.dispatch(TravelFundsActions.transferTravelFunds(transferTravelFundsRequest));

      expect(TravelFundsApi.retrieveTravelFunds).to.be.calledWith(transferTravelFundsRequest);
    });

    it('should trigger fetchTransferTravelFundsSuccess action when Travel Funds API succeeds', async () => {
      await store.dispatch(TravelFundsActions.transferTravelFunds(transferTravelFundsRequest));
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS,
          request: transferTravelFundsRequest,
          isFetching: true
        },
        {
          flowName: 'travelFunds',
          status: STATUS.COMPLETED,
          type: FlowStatusActionTypes.SET_FLOW_STATUS
        },
        {
          type: TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
          isFetching: false
        }
      ]);
    });

    it('should trigger to fetchTransferTravelFundsFailed action when Travel Funds API failed', async () => {
      const expectedResult = 'error';

      TravelFundsApi.retrieveTravelFunds.returns(Promise.reject(expectedResult));

      const result = await store.dispatch(TravelFundsActions.transferTravelFunds(transferTravelFundsRequest));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS,
          request: transferTravelFundsRequest,
          isFetching: true
        },
        {
          type: TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
      expect(result).eq(expectedResult);
    });
  });

  context('associateFunds', () => {
    let associateFundsRequest;

    beforeEach(() => {
      associateFundsRequest = {
        body: {
          fundSearchToken: 'fundToken'
        },
        labelText: 'labelText',
        href: '/v1/mobile-air-booking/page/associate-fund',
        method: 'PUT'
      };
      sinon.stub(TravelFundsApi, 'retrieveTravelFunds').returns(Promise.resolve('response'));
    });

    it('should call retrieveTravelFunds api call when given a request', async () => {
      await store.dispatch(TravelFundsActions.associateFunds(associateFundsRequest));

      expect(TravelFundsApi.retrieveTravelFunds).to.be.calledWith(associateFundsRequest);
    });

    it('should trigger associateTravelFundsSuccess action when Travel Funds API succeeds', async () => {
      await store.dispatch(TravelFundsActions.associateFunds(associateFundsRequest));
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS,
          request: associateFundsRequest,
          isFetching: true
        },
        {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
          isFetching: false
        }
      ]);
    });

    it('should trigger to associateTravelFundsFailed action when Travel Funds API failed', async () => {
      TravelFundsApi.retrieveTravelFunds.returns(Promise.reject('error'));

      await store.dispatch(TravelFundsActions.associateFunds(associateFundsRequest));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS,
          request: associateFundsRequest,
          isFetching: true
        },
        {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });

  context('resumeAfterLogin', () => {
    it('should dispatch action', () => {
      store.dispatch(TravelFundsActions.resumeAfterLogin(true, { test: 'object' }));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
          shouldResume: true,
          requestInfo: {
            test: 'object'
          }
        }
      ]);
    });

    it('should dispatch action with default parameter', () => {
      store.dispatch(TravelFundsActions.resumeAfterLogin(false));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
          shouldResume: false,
          requestInfo: {}
        }
      ]);
    });
  });

  context('loadTravelFundsPagePlacements', () => {
    let getPlacementsStub;
    let getTargetParamsStub;
    let getMboxConfigStub;
    let getSegmentsStub;

    const params = { key: 'value' };
    const segment = 'segment';
    const args = [{ mbox: TRAVEL_FUNDS_ID, params }];

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve([]));
      getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve([]));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
    });

    it('should trigger fetchTravelFundsPagePlacementsSuccess when getPlacements succeeds', async () => {
      getPlacementsStub.returns(() => Promise.resolve('placements'));
      await store.dispatch(TravelFundsActions.loadTravelFundsPagePlacements());
      const actions = store.getActions();

      expect(getPlacementsStub).to.have.been.calledWith(TRAVEL_FUNDS_ID);
      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS
        },
        {
          type: TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS,
          response: 'placements',
          isFetching: false
        }
      ]);
    });

    it('should trigger fetchOffersPagePromotionsFailed when getPlacements fails', async () => {
      getPlacementsStub.returns(() => Promise.reject('error'));
      await store.dispatch(TravelFundsActions.loadTravelFundsPagePlacements());
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS
        },
        {
          type: TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });

    it('should trigger getTargetParams, getMboxConfig', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getMboxConfigStub.returns(() => Promise.resolve(args));
      getPlacementsStub.returns(() => Promise.resolve('placements'));

      await store.dispatch(TravelFundsActions.loadTravelFundsPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, TRAVEL_FUNDS_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(TRAVEL_FUNDS_ID, [], segment);
    });

    it('should not trigger getPlacements if getMboxConfig fails', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getMboxConfigStub.returns(() => Promise.reject('failed'));
      getPlacementsStub.returns(() => Promise.resolve('placements'));

      await store.dispatch(TravelFundsActions.loadTravelFundsPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, TRAVEL_FUNDS_ID);
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getPlacementsStub).to.not.have.been.called;
    });
  });
});
