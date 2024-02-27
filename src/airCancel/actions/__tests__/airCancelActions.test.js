jest.mock('src/shared/actions/dialogActions', () => ({
  hideDialog: jest.fn().mockReturnValue({ type: 'HIDE_DIALOG' }),
  showDialog: jest.fn().mockReturnValue({ type: 'SHOW_DIALOG' })
}));
jest.mock('src/shared/api/airCancelApi');
jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/air/cancel/', search: '' } }));
jest.mock('src/viewReservation/actions/viewReservationActions');

import { CALL_HISTORY_METHOD } from 'connected-react-router';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import * as DialogActions from 'src/shared/actions/dialogActions';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AirCancelApi from 'src/shared/api/airCancelApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import * as selectPassengersHelper from 'src/shared/helpers/selectPassengersHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import {
  refundQuoteLinkObject,
  splitPnrLinkObjWithSelectedIdsAndEmail
} from 'test/builders/model/selectPassengersPageBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const AirCancelApiMock = jest.mocked(AirCancelApi);
const ViewReservationActionsMock = jest.mocked(ViewReservationActions);

BrowserObject.window = { navigator: { vibrate: jest.fn() } };

const {
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_FAILED,
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
  AIR_CANCEL__FETCH_CONFIRMATION_FAILED,
  AIR_CANCEL__FETCH_CONFIRMATION_SUCCESS,
  AIR_CANCEL__FETCH_CONFIRMATION,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_FAILED,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_FAILED,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_FAILED,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL,
  AIR_CANCEL__RESET_FLOW_DATA
} = airCancelActionTypes;
const { SET_FLOW_STATUS } = FlowStatusActionTypes;
const { SHARED__ASYNC_ACTION_FINISH } = SharedActionTypes;

const mockStore = createMockStore();

describe('airCancelActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    BrowserObject.location.search = '';
  });

  describe('reset AirCancel flow data', () => {
    it('should dispatch reset flow data action', () => {
      store.dispatch(AirCancelActions.resetAirCancelFlowData());
      expect(store.getActions()).toEqual([
        {
          type: AIR_CANCEL__RESET_FLOW_DATA
        }
      ]);
    });
  });

  describe('retrieve reservation for cancelBound', () => {
    let cancelLink;

    beforeEach(() => {
      cancelLink = {
        href: '/v1/cancel/fakeRecordLocator',
        query: { 'first-name': 'firstName', 'last-name': 'lastName' }
      };

      AirCancelApiMock.retrieveReservationForCancel.mockReturnValue(Promise.resolve('response'));
      jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    });

    it('should call the reservation API when given air cancel bound request', async () => {
      await store.dispatch(AirCancelActions.retrieveReservationForCancelBound(cancelLink, false));

      expect(AirCancelApi.retrieveReservationForCancel).toHaveBeenCalledWith(cancelLink, false);
    });

    it('should trigger fetchReservationCancelBoundSuccess action and reset redux flow action when reservation API success', async () => {
      await store.dispatch(AirCancelActions.retrieveReservationForCancelBound(cancelLink, false));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__RESET_FLOW_DATA
        },
        {
          type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND,
          request: cancelLink,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
          response: 'response',
          isFetching: false
        }
      ]);
      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('cancel choose flight');
    });

    it('should trigger to fetchReservationCancelBoundFailed action and reset redux flow action when reservation API failed', async () => {
      AirCancelApiMock.retrieveReservationForCancel.mockRejectedValue('error');

      await store
        .dispatch(AirCancelActions.retrieveReservationForCancelBound(cancelLink, false))
        .then(() => {
          const actions = store.getActions();

          expect(actions).toEqual([
            {
              type: AIR_CANCEL__RESET_FLOW_DATA
            },
            {
              type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND,
              request: cancelLink,
              isFetching: true
            },
            {
              type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_FAILED,
              error: 'error',
              isFetching: false
            }
          ]);
        })
        .catch((err) => expect(err).toEqual('error'));
    });
  });

  describe('retrieve quote for cancelBound', () => {
    let cancelBoundQuoteRequest;
    const stubbedResponse = {
      cancelRefundQuotePage: {
        recordLocator: 'ABCDEF'
      }
    };

    beforeEach(() => {
      cancelBoundQuoteRequest = {
        href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TTIIZ9',
        method: 'POST',
        body: {
          passengerSearchToken: 'pToken',
          cancelToken: 'cToken',
          productIds: ['id1', 'id2', 'id3']
        }
      };

      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValue(stubbedResponse);
    });

    it('should call the reservation API when given air cancel bound quote request', async () => {
      await store.dispatch(AirCancelActions.retrieveRefundQuoteForCancelBound(cancelBoundQuoteRequest, false, false));

      expect(AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound).toHaveBeenCalledWith(cancelBoundQuoteRequest, false);
    });

    it('should trigger fetchRefundQuoteForCancelBoundSuccess action and reset redux flow action when reservation API success and push user to next route when the searchToken is present in the URL', async () => {
      BrowserObject.location.search = 'searchToken=eyJhbGci';
      await store.dispatch(AirCancelActions.retrieveRefundQuoteForCancelBound(cancelBoundQuoteRequest, true, false));
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
          request: cancelBoundQuoteRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
          response: stubbedResponse,
          isFetching: false
        },
        {
          payload: {
            args: ['/air/cancel/ABCDEF?searchToken=eyJhbGci'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger fetchRefundQuoteForCancelBoundSuccess action and reset redux flow action when reservation API success and push user to next route and enabled hard coded route flag', async () => {
      await store.dispatch(AirCancelActions.retrieveRefundQuoteForCancelBound(cancelBoundQuoteRequest, true, false, true));
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
          request: cancelBoundQuoteRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
          response: stubbedResponse,
          isFetching: false
        },
        {
          payload: {
            args: ['/air/cancel/ABCDEF'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger fetchRefundQuoteForCancelBoundSuccess action and reset redux flow action when reservation API success and not push user to next route if not requested', async () => {
      await store.dispatch(AirCancelActions.retrieveRefundQuoteForCancelBound(cancelBoundQuoteRequest, false, false));
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
          request: cancelBoundQuoteRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
          response: stubbedResponse,
          isFetching: false
        }
      ]);
    });

    it('should trigger to fetchRefundQuoteForCancelBoundFailed action and reset redux flow action when reservation API failed', async () => {
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockRejectedValue('error');

      await store
        .dispatch(AirCancelActions.retrieveRefundQuoteForCancelBound(cancelBoundQuoteRequest, false, false))
        .catch((err) => expect(err).toEqual('error'));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
          request: cancelBoundQuoteRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });

  describe('retrieve cancel bound confirmation', () => {
    let cancelBoundConfirmationRequest;
    const stubbedResponse = {
      cancelBoundConfirmationPage: {
        recordLocator: 'ABCDEF'
      }
    };

    beforeEach(() => {
      cancelBoundConfirmationRequest = {
        href: '/v1/mobile-air-booking/page/flights/cancel-bound/LCWFUQ',
        method: 'PUT',
        body: {
          passengerSearchToken: 'pToken',
          cancelToken: 'cToken',
          productIds: ['id1', 'id2'],
          refundRequested: true,
          receiptEmail: 'ab@cd.com'
        }
      };
    });

    it('should call the reservation API when given air cancel bound confirmation', async () => {
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValueOnce(stubbedResponse);

      await store.dispatch(AirCancelActions.cancelReservationByBounds(cancelBoundConfirmationRequest, false));

      expect(AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound).toHaveBeenCalledWith(
        cancelBoundConfirmationRequest,
        false
      );
    });

    it('should trigger fetchCancelBoundConfirmationSuccess action when reservation API success', async () => {
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValueOnce(stubbedResponse);

      await store.dispatch(AirCancelActions.cancelReservationByBounds(cancelBoundConfirmationRequest, false));
      
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
          request: cancelBoundConfirmationRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
          response: stubbedResponse,
          isFetching: false
        },
        {
          status: 'completed',
          flowName: 'airCancel',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: ['/air/cancel/ABCDEF/refund-summary'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger fetchCancelBoundConfirmationSuccess action when reservation API success with searchToken', async () => {
      BrowserObject.location.search = 'searchToken=eyJhbGci';
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValueOnce(stubbedResponse);

      await store.dispatch(AirCancelActions.cancelReservationByBounds(cancelBoundConfirmationRequest, false));
      
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
          request: cancelBoundConfirmationRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
          response: stubbedResponse,
          isFetching: false
        },
        {
          status: 'completed',
          flowName: 'airCancel',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: ['/air/cancel/ABCDEF/refund-summary?searchToken=eyJhbGci'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger to fetchCancelBoundConfirmationFailed action when reservation API failed', async () => {
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockRejectedValueOnce('error');

      await store
        .dispatch(AirCancelActions.cancelReservationByBounds(cancelBoundConfirmationRequest, false))
        .catch((err) => expect(err).toEqual('error'));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
          request: cancelBoundConfirmationRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });

    it('should dispatch customized error dialog when CANCEL_BOUND_REFUND_QUOTE_MISMATCH happens', async () => {
      jest.spyOn(DialogActions, 'hideDialog').mockReturnValue(() => Promise.resolve(''));
      const errResponse = {
        responseJSON: {
          code: 400620560,
          message: 'message'
        }
      };

      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockRejectedValueOnce(errResponse);

      await store
        .dispatch(AirCancelActions.cancelReservationByBounds(cancelBoundConfirmationRequest, false))
        .catch((err) => expect(err).toEqual(errResponse));

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
        request: cancelBoundConfirmationRequest,
        isFetching: true
      });

      expect(actions[1].type).toEqual('SHOW_DIALOG');

      expect(actions[2]).toEqual({
        type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_FAILED,
        error: errResponse,
        isFetching: false
      });

      DialogActions.showDialog.mock.calls[0][0].buttons[0].onClick();

      expect(DialogActions.hideDialog).toHaveBeenCalled();
    });
  });

  describe('fetch confirmation for cancel', () => {
    const cancelLink = {
      href: '/v1/mobile-air-booking/page/cancel-reservation/Q3VDYV',
      method: 'DELETE',
      query: {
        ['first-name']: 'R',
        ['last-name']: 'Macy',
        ['receipt-email']: 'TEST@TEST.COM',
        ['boarding-pass-exists']: false,
        ['refund-requested']: true,
        isInternational: false
      }
    };

    const cancelLinkFormatted = {
      href: '/v1/mobile-air-booking/page/cancel-reservation/Q3VDYV',
      method: 'DELETE',
      query: {
        ['first-name']: 'R',
        ['last-name']: 'Macy',
        ['refund-requested']: false,
        ['boarding-pass-exists']: false,
        ['receipt-email']: 'TEST@TEST.COM',
        isInternational: false
      }
    };

    const cancelLinkFormattedWithNewEmail = {
      href: '/v1/mobile-air-booking/page/cancel-reservation/Q3VDYV',
      method: 'DELETE',
      query: {
        ['first-name']: 'R',
        ['last-name']: 'Macy',
        ['refund-requested']: false,
        ['boarding-pass-exists']: false,
        ['receipt-email']: 'whatever@email.com',
        isInternational: false
      }
    };

    const cancelLinkFormattedWithNullRefundRequest = {
      href: '/v1/mobile-air-booking/page/cancel-reservation/Q3VDYV',
      method: 'DELETE',
      query: {
        ['first-name']: 'R',
        ['last-name']: 'Macy',
        ['refund-requested']: null,
        ['boarding-pass-exists']: false,
        ['receipt-email']: 'whatever@email.com',
        isInternational: false
      }
    };

    const recordLocator = 'Q3VDYV';
    const formData = { refundMethod: 'HOLD_FUTURE_USE' };
    const formDataWithReceiptEmail = { refundMethod: 'HOLD_FUTURE_USE', emailReceiptTo: 'whatever@email.com' };
    const formDataWithNoRefund = { emailReceiptTo: 'whatever@email.com' };

    beforeEach(() => {
      AirCancelApiMock.cancelReservation.mockResolvedValue('response');
    });

    it('should trigger fetchConfirmationSuccess action when reservation API success and searchToken is present in the URL', async () => {
      BrowserObject.location.search = 'searchToken=eyJhbGci';
      await store.dispatch(AirCancelActions.cancelReservation(cancelLink, recordLocator, formData, false));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION,
          request: cancelLinkFormatted,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION_SUCCESS,
          response: 'response',
          isFetching: false
        },
        {
          status: 'completed',
          flowName: 'airCancel',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: ['/air/cancel/Q3VDYV/refund-summary?searchToken=eyJhbGci'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger fetchConfirmationSuccess action when custom receipt email is present', async () => {
      await store.dispatch(
        AirCancelActions.cancelReservation(cancelLink, recordLocator, formDataWithReceiptEmail, false)
      );

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION,
          request: cancelLinkFormattedWithNewEmail,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION_SUCCESS,
          response: 'response',
          isFetching: false
        },
        {
          status: 'completed',
          flowName: 'airCancel',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: ['/air/cancel/Q3VDYV/refund-summary'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should trigger fetchConfirmationSuccess action when refund-requested is null', async () => {
      await store.dispatch(
        AirCancelActions.cancelReservation(
          cancelLinkFormattedWithNullRefundRequest,
          recordLocator,
          formDataWithNoRefund,
          false
        )
      );

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION,
          request: cancelLinkFormattedWithNullRefundRequest,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION_SUCCESS,
          response: 'response',
          isFetching: false
        },
        {
          status: 'completed',
          flowName: 'airCancel',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: [
              buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'refundSummary' }), {
                recordLocator: 'Q3VDYV'
              })
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should play haptic feedback with reservation API success', async () => {
      const playHapticFeedbackMock = jest.spyOn(HapticFeedbackHelper, 'playHapticFeedback');

      await store.dispatch(AirCancelActions.cancelReservation(cancelLink, recordLocator, formData, false));
      expect(playHapticFeedbackMock).toHaveBeenCalled();
    });

    it('should trigger to fetchReservationCancelFailed action when reservation API failed', async () => {
      AirCancelApiMock.cancelReservation.mockRejectedValue('error');

      await store.dispatch(AirCancelActions.cancelReservation(cancelLink, recordLocator, formData, false));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION,
          request: cancelLinkFormatted,
          isFetching: true
        },
        {
          type: AIR_CANCEL__FETCH_CONFIRMATION_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });

  describe('getSplitPnrReservationForCancel', () => {
    let retrieveSplitPnrReservationMock;

    beforeEach(() => {
      retrieveSplitPnrReservationMock = jest.spyOn(AirCancelApi, 'retrieveSplitPnrReservation').mockResolvedValue({});
      jest.spyOn(selectPassengersHelper, 'getRefundQuoteRequestData');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should call the reservation API when given link object', async () => {
      await store.dispatch(AirCancelActions.getSplitPnrReservationForCancel(splitPnrLinkObjWithSelectedIdsAndEmail));

      expect(AirCancelApi.retrieveSplitPnrReservation).toHaveBeenCalledWith(splitPnrLinkObjWithSelectedIdsAndEmail);
    });

    describe('when reservation API success', () => {
      const expectedActions = [
        {
          type: AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL,
          request: splitPnrLinkObjWithSelectedIdsAndEmail,
          isFetching: true
        },
        {
          flowName: AIR_CANCEL_SPLIT_PNR_FLOW_NAME,
          status: STATUS.IN_PROGRESS,
          type: SET_FLOW_STATUS
        },
        {
          flowName: AIR_CANCEL_SPLIT_PNR_FLOW_NAME,
          status: STATUS.COMPLETED,
          type: SET_FLOW_STATUS
        }
      ];

      it('should trigger fetchSplitPnrReservationForCancelSuccess action and push to select bound page when showBoundSelection is true and the searchToken is present in the URL', async () => {
        BrowserObject.location.search = 'searchToken=eyJhbGci';
        const response = {
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: true
            },
            recordLocator: 'TEST12'
          }
        };

        retrieveSplitPnrReservationMock.mockResolvedValue(response);

        await store.dispatch(AirCancelActions.getSplitPnrReservationForCancel(splitPnrLinkObjWithSelectedIdsAndEmail));

        const actions = store.getActions();

        expect(selectPassengersHelper.getRefundQuoteRequestData).not.toHaveBeenCalled();
        expect(actions).toEqual([
          ...expectedActions,
          {
            type: AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
            response,
            isFetching: false
          },
          {
            payload: { method: 'push', args: ['/air/cancel/TEST12/select-bound?searchToken=eyJhbGci'] },
            type: CALL_HISTORY_METHOD
          }
        ]);
      });

      it('should trigger fetchSplitPnrReservationForCancelSuccess action and push to select bound page when showBoundSelection is true and the searchToken is not present in the URL', async () => {
        const response = {
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: true
            },
            recordLocator: 'TEST12'
          }
        };

        retrieveSplitPnrReservationMock.mockResolvedValue(response);

        await store.dispatch(AirCancelActions.getSplitPnrReservationForCancel(splitPnrLinkObjWithSelectedIdsAndEmail));

        const actions = store.getActions();

        expect(selectPassengersHelper.getRefundQuoteRequestData).not.toHaveBeenCalled();
        expect(actions).toEqual([
          ...expectedActions,
          {
            type: AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
            response,
            isFetching: false
          },
          {
            payload: { method: 'push', args: ['/air/cancel/TEST12/select-bound'] },
            type: CALL_HISTORY_METHOD
          }
        ]);
      });

      it('should trigger asyncActionFinish and retrieveRefundQuoteForCancelBound actions when showBoundSelection is false', async () => {
        const response = {
          viewForCancelBoundPage: {
            _links: {
              refundQuote: refundQuoteLinkObject
            },
            _meta: {
              showBoundSelection: false
            },
            recordLocator: 'TEST12'
          }
        };

        AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValue({ cancelRefundQuotePage: { recordLocator: 'ABCDEF' } });

        retrieveSplitPnrReservationMock.mockResolvedValue(response);

        await store.dispatch(AirCancelActions.getSplitPnrReservationForCancel(splitPnrLinkObjWithSelectedIdsAndEmail));

        const actions = store.getActions();

        expect(selectPassengersHelper.getRefundQuoteRequestData).toHaveBeenCalled();
        expect(actions).toEqual([
          ...expectedActions,
          {
            type: SHARED__ASYNC_ACTION_FINISH
          },
          {
            type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
            request: {
              body: {
                cancelToken: 'testCancelToken',
                passengerSearchToken: 'testPassengerSearchToken',
                refundRequested: null
              },
              href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/PPUWKZ',
              method: 'POST'
            },
            isFetching: true
          },
          {
            type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
            response: { cancelRefundQuotePage: { recordLocator: 'ABCDEF' } },
            isFetching: false
          },
          {
            type: CALL_HISTORY_METHOD,
            payload: { method: 'push', args: ['/air/cancel/ABCDEF'] }
          }
        ]);
      });
    });

    it('should trigger fetchSplitPnrReservationFailed action when reservation API fails', async () => {
      AirCancelApiMock.retrieveSplitPnrReservation.mockRejectedValue('error');

      await store
        .dispatch(AirCancelActions.getSplitPnrReservationForCancel(splitPnrLinkObjWithSelectedIdsAndEmail))
        .catch((error) => expect(error).toEqual('error'));

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL,
          request: splitPnrLinkObjWithSelectedIdsAndEmail,
          isFetching: true
        },
        {
          flowName: AIR_CANCEL_SPLIT_PNR_FLOW_NAME,
          status: STATUS.IN_PROGRESS,
          type: SET_FLOW_STATUS
        },
        {
          type: AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });

  describe('retrieveFlightAndCancelBoundWithSearchToken', () => {
    let reservationForCancelResponse;

    beforeEach(() => {
      const flightReservationResponse = {
        viewReservationViewPage: {
          _links: {
            cancelBound: ''
          }
        }
      };

      const cancelBoundResponse = {
        viewReservationViewPage: {
          recordLocator: 'ABCDEF',
          _links: {
            refundQuote: ''
          }
        }
      };

      reservationForCancelResponse = {
        viewForCancelBoundPage: {
          _links: {
            refundQuote: ''
          }
        }
      };

      ViewReservationActionsMock.retrieveFlightReservation.mockReturnValueOnce(() => Promise.resolve(flightReservationResponse));
      AirCancelApiMock.retrieveRefundQuoteAndConfirmationForCancelBound.mockResolvedValueOnce(cancelBoundResponse);
      AirCancelApiMock.retrieveReservationForCancel.mockResolvedValueOnce(reservationForCancelResponse);
    });

    it('should call retrieveRefundQuoteForCancelBound when the retrieveReservationForCancelBound call is successful and isRefundQuote is false', async () => {
      await store.dispatch(AirCancelActions.retrieveFlightAndCancelBoundWithSearchToken('', false, false));

      expect(ViewReservationActions.retrieveFlightReservation).toHaveBeenCalled();
      expect(AirCancelApi.retrieveReservationForCancel).toHaveBeenCalled();
    });

    it('should call retrieveRefundQuoteForCancelBound when the retrieveReservationForCancelBound call is successful and isRefundQuote is false and refundQuote is not returned', async () => {
      AirCancelApiMock.retrieveReservationForCancel.mockResolvedValueOnce('response');
      await store.dispatch(AirCancelActions.retrieveFlightAndCancelBoundWithSearchToken('', false, false));

      expect(ViewReservationActions.retrieveFlightReservation).toHaveBeenCalled();
      expect(AirCancelApi.retrieveReservationForCancel).toHaveBeenCalled();
    });

    it('should call retrieveRefundQuoteForCancelBound when the retrieveReservationForCancelBound call is successful and isRefundQuote is false and cancelBound is not returned', async () => {
      ViewReservationActionsMock.retrieveFlightReservation.mockReturnValueOnce(() => Promise.resolve('response'));
      AirCancelApiMock.retrieveReservationForCancel.mockResolvedValueOnce('response');
      await store.dispatch(AirCancelActions.retrieveFlightAndCancelBoundWithSearchToken('', false, false));

      expect(ViewReservationActions.retrieveFlightReservation).toHaveBeenCalled();
      expect(AirCancelApi.retrieveReservationForCancel).toHaveBeenCalled();
    });

    it('should call retrieveRefundQuoteForCancelBound when the retrieveReservationForCancelBound call is successful and isRefundQuote is true', async () => {
      await store.dispatch(AirCancelActions.retrieveFlightAndCancelBoundWithSearchToken('', false, true));

      expect(ViewReservationActions.retrieveFlightReservation).toHaveBeenCalled();
      expect(AirCancelApi.retrieveReservationForCancel).toHaveBeenCalled();
      expect(AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound).toHaveBeenCalled();
    });
  });
});
