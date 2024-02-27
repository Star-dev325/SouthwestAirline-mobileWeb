// @flow
import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import _ from 'lodash';
import airCancelActionTypes, { apiActionCreator } from 'src/airCancel/actions/airCancelActionTypes';
import { AIR_CANCEL_SPLIT_PNR_FLOW_NAME, ERRORS } from 'src/airCancel/constants/airCancelConstants';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { asyncActionFinish } from 'src/shared/actions/sharedActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AirCancelApi from 'src/shared/api/airCancelApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import RefundTypes from 'src/shared/constants/refundTypes';
import BrowserObject from 'src/shared/helpers/browserObject';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getRefundQuoteRequestData } from 'src/shared/helpers/selectPassengersHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import { retrieveFlightReservation } from 'src/viewReservation/actions/viewReservationActions';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  CancelBoundConfirmationRequestType,
  CancelBoundRefundQuoteRequestType
} from 'src/airCancel/flow-typed/airCancel.types';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';

const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

const {
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION,
  AIR_CANCEL__FETCH_CONFIRMATION,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL,
  AIR_CANCEL__RESET_FLOW_DATA,
  AIR_CANCEL__SELECT_BOUND_ANALYTICS
} = airCancelActionTypes;

const { location } = BrowserObject;

const { fetchReservationForCancelBound, fetchReservationForCancelBoundSuccess, fetchReservationForCancelBoundFailed } =
  apiActionCreator(AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND);

const { fetchRefundQuoteForCancelBound, fetchRefundQuoteForCancelBoundSuccess, fetchRefundQuoteForCancelBoundFailed } =
  apiActionCreator(AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND);

const { fetchCancelBoundConfirmation, fetchCancelBoundConfirmationSuccess, fetchCancelBoundConfirmationFailed } =
  apiActionCreator(AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION);

export const selectBoundAnalytics = () => ({
  type: AIR_CANCEL__SELECT_BOUND_ANALYTICS
});

export const { fetchConfirmation, fetchConfirmationSuccess, fetchConfirmationFailed } =
  apiActionCreator(AIR_CANCEL__FETCH_CONFIRMATION);

export const {
  fetchSplitPnrReservationForCancel,
  fetchSplitPnrReservationForCancelFailed,
  fetchSplitPnrReservationForCancelSuccess
} = apiActionCreator(AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL);

export const resetAirCancelFlowData = () => ({
  type: AIR_CANCEL__RESET_FLOW_DATA
});

export const retrieveReservationForCancelBound =
  (cancelLink: Link, isLoggedIn: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(resetAirCancelFlowData());
      dispatch(fetchReservationForCancelBound(cancelLink));

      return AirCancelApi.retrieveReservationForCancel(cancelLink, isLoggedIn)
        .then((response) => {
          dispatch(fetchReservationForCancelBoundSuccess(response));
          raiseSatelliteEvent('cancel choose flight');

          return response;
        })
        .catch((error) => {
          dispatch(fetchReservationForCancelBoundFailed(error));
          throw error;
        });
    };

// TODO: remove useHardCodedRoute once getNormalizedRoute is added to standby flow (MOB-125381)
export const retrieveRefundQuoteForCancelBound =
  (request: CancelBoundRefundQuoteRequestType, navigateToAirCancelQuotePage: boolean, isLoggedIn: boolean, useHardCodedRoute?: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchRefundQuoteForCancelBound(request));

      return AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound(request, isLoggedIn)
        .then((response) => {
          dispatch(fetchRefundQuoteForCancelBoundSuccess(response));
          
          if (navigateToAirCancelQuotePage) {
            const { searchToken } = transformSearchToQuery(location?.search);
            const queryParams = searchToken ? { searchToken } : {};

            if (useHardCodedRoute) {
              dispatch(push(`/air/cancel/${response.cancelRefundQuotePage.recordLocator}`));
            } else {
              dispatch(
                push(
                  buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airCancelRefundQuote' }), {
                    recordLocator: response.cancelRefundQuotePage.recordLocator
                  }, queryParams)
                )
              );
            }
          }

          return response;
        })
        .catch((error) => {
          dispatch(fetchRefundQuoteForCancelBoundFailed(error));
        });
    };

export const cancelReservationByBounds =
  (request: CancelBoundConfirmationRequestType, isLoggedIn: boolean) =>
    (dispatch: *): Promise<*> => {
      dispatch(fetchCancelBoundConfirmation(request));

      return AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound(request, isLoggedIn)
        .then((response) => {
          const { searchToken } = transformSearchToQuery(location?.search);
          const queryParams = searchToken ? { searchToken } : {};

          dispatch(fetchCancelBoundConfirmationSuccess(response));
          dispatch(FlowStatusActions.setFlowStatus('airCancel', STATUS.COMPLETED));
          dispatch(
            push(
              buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'refundSummary' }), {
                recordLocator: response.cancelBoundConfirmationPage.recordLocator
              }, queryParams)
            )
          );
        })
        .catch((error) => {
          const errorCode = _.get(error, 'responseJSON.code');

          if (errorCode === ERRORS.CANCEL_BOUND_REFUND_QUOTE_MISMATCH) {
            const dialogConfig = generateDialogConfigFromError(error);

            dispatch(
              showDialog({
                name: 'air-cancel-quote-mismatch-message',
                buttons: [
                  {
                    label: i18n('SHARED__BUTTON_TEXT__OK'),
                    onClick: () => {
                      dispatch(hideDialog()).then(() => {
                        dispatch(goBack());
                      });
                    }
                  }
                ],
                ...dialogConfig
              })
            );
            error.$customized = true;
            dispatch(fetchCancelBoundConfirmationFailed(error));
          } else {
            dispatch(fetchCancelBoundConfirmationFailed(error));
          }
        });
    };

export const cancelReservation = (cancelLink: Link, recordLocator: string, formData: *, isLoggedIn: boolean) => {
  const { refundMethod, emailReceiptTo } = formData;
  const refundRequested = refundMethod === BACK_TO_ORIGINAL_PAYMENT;
  const cancelQuery = _.get(cancelLink, 'query');

  const newQueryValues = {};

  emailReceiptTo && _.set(newQueryValues, 'query["receipt-email"]', emailReceiptTo);
  cancelQuery['refund-requested'] !== null && _.set(newQueryValues, 'query["refund-requested"]', refundRequested);

  return (dispatch: ReduxDispatch<*>): Promise<*> => {
    const cancelReservationLink = _.merge({}, cancelLink, newQueryValues);

    dispatch(fetchConfirmation(cancelReservationLink));

    return AirCancelApi.cancelReservation(cancelReservationLink, isLoggedIn)
      .then((response) => {
        const { searchToken } = transformSearchToQuery(location?.search);
        const queryParams = searchToken ? { searchToken } : {};

        dispatch(fetchConfirmationSuccess(response));
        dispatch(FlowStatusActions.setFlowStatus('airCancel', STATUS.COMPLETED));
        dispatch(
          push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'refundSummary' }), { recordLocator }, queryParams))
        );
        playHapticFeedback();
      })
      .catch((error) => dispatch(fetchConfirmationFailed(error)));
  };
};

export const getSplitPnrReservationForCancel =
  (link: Link) =>
    (dispatch: *, getState: () => *): Promise<*> => {
      dispatch(fetchSplitPnrReservationForCancel(link));
      dispatch(FlowStatusActions.setFlowStatus(AIR_CANCEL_SPLIT_PNR_FLOW_NAME, STATUS.IN_PROGRESS));

      return AirCancelApi.retrieveSplitPnrReservation(link)
        .then((response) => {
          const state = _.cloneDeep(getState());
          const isUserLoggedIn = _.get(state, 'app.account.isLoggedIn', false);
          const recordLocator = _.get(response, 'viewForCancelBoundPage.recordLocator', '');
          const refundQuoteLinkObject = _.get(response, 'viewForCancelBoundPage._links.refundQuote', {});
          const showBoundSelection = _.get(response, 'viewForCancelBoundPage._meta.showBoundSelection');

          dispatch(FlowStatusActions.setFlowStatus(AIR_CANCEL_SPLIT_PNR_FLOW_NAME, STATUS.COMPLETED));

          if (showBoundSelection) {
            const { searchToken } = transformSearchToQuery(location?.search);

            const queryParams = searchToken ? { searchToken } : {};

            dispatch(fetchSplitPnrReservationForCancelSuccess(response));
            dispatch(
              push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectBound' }), { recordLocator }, queryParams))
            );
          } else {
            const refundQuoteRequestData = refundQuoteLinkObject && getRefundQuoteRequestData(refundQuoteLinkObject);

            dispatch(asyncActionFinish());
            dispatch(retrieveRefundQuoteForCancelBound(refundQuoteRequestData, true, isUserLoggedIn));
          }
        })
        .catch((error) => {
          dispatch(fetchSplitPnrReservationForCancelFailed(error));
        });
    };

export const retrieveFlightAndCancelBoundWithSearchToken =
(searchToken: string, isLoggedIn: boolean, isRefundQuote: boolean) =>
  (dispatch: ThunkDispatch): Promise<*> =>
    dispatch(retrieveFlightReservation({ passengerSearchToken: searchToken }, true))
      .then(reservationData => {
        const cancelBoundRequest = reservationData?.viewReservationViewPage?._links?.cancelBound ?? '';

        return dispatch(retrieveReservationForCancelBound(cancelBoundRequest, isLoggedIn))
          .then(cancelBoundResponse => {
            if (isRefundQuote) {
              const refundQuoteLink = cancelBoundResponse?.viewForCancelBoundPage?._links?.refundQuote ?? '';
              const quoteRequestData: CancelBoundRefundQuoteRequestType = _.merge({}, refundQuoteLink, {
                body: {
                  refundRequested: null
                }
              });

              return dispatch(retrieveRefundQuoteForCancelBound(quoteRequestData, false, isLoggedIn));
            } else {
              return cancelBoundResponse;
            }
          });
      });
