// @flow

import _ from 'lodash';
import { saveSplitPayTermsAndConditions } from 'src/airBooking/actions/airBookingActions';
import SharedActionTypes, { apiActionCreator } from 'src/shared/actions/sharedActionTypes';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { push } from 'connected-react-router';
import { clearAllApplyForms } from 'src/travelFunds/actions/travelFundsActions';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import { ROUTES, NORMALIZED_ROUTES } from 'src/shared/constants/webViewConstants';
import i18n from '@swa-ui/locale';

import type {
  CalcFundsRequestType,
  RemoveFundRequestType,
  RefreshFundsRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';

const {
  SHARED__RESET_CALCULATE_FLOW_DATA,
  SHARED__CALC_FUNDS,
  SHARED__REMOVE_TRAVEL_FUND,
  SHARED__REFRESH_TRAVEL_FUNDS
} = SharedActionTypes;

const DEFAULT_REDIRECT_PATH = '/';
const DEFAULT_LOGGEDIN_BOOL = false;
const TOKEN_EXPIRED_ERROR_CODE = 400310756;

const _handleError = (error, dispatch, failedAction, redirectPath, isWebView) => {
  const errorCode = _.get(error, 'responseJSON.code');

  if (errorCode === TOKEN_EXPIRED_ERROR_CODE) {
    const dialogConfig = generateDialogConfigFromError(error);

    dispatch(failedAction());
    dispatch(
      showDialog({
        name: 'fund-token-expired-message',
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              dispatch(hideDialog()).then(() => {
                if (isWebView && redirectPath === (ROUTES.AIR_BOOKING_LEGACY || NORMALIZED_ROUTES.AIR_BOOKING_INDEX)) {
                  dispatch(exitWebView());
                } else {
                  dispatch(push(redirectPath));
                }

                dispatch(clearAllApplyForms());
              });
            }
          }
        ],
        ...dialogConfig
      })
    );
  } else {
    dispatch(failedAction(error));
  }
};

export const resetCalculateFlowData = () => ({
  type: SHARED__RESET_CALCULATE_FLOW_DATA
});

const { calcFunds, calcFundsSuccess, calcFundsFailed } = apiActionCreator(SHARED__CALC_FUNDS);

export const calculateFunds =
  (
    request: CalcFundsRequestType,
    redirectPath: string = DEFAULT_REDIRECT_PATH,
    isLoggedIn: boolean = DEFAULT_LOGGEDIN_BOOL
  ) =>
    (dispatch: *, getState: *) => {
      const isWebView = _.get(getState(), 'app.webView.isWebView', false);
      const cashPointsPage = request?.body?.cashPointsPage === true;

      dispatch(calcFunds(request));

      return FlightBookingApi.calculateFunds(request, isLoggedIn)
        .then((response) => {
          dispatch(calcFundsSuccess(response));
          cashPointsPage && dispatch(saveSplitPayTermsAndConditions(response?.termsAndConditions));
          dispatch(clearAllApplyForms());

          return response;
        })
        .catch((error) => _handleError(error, dispatch, calcFundsFailed, redirectPath, isWebView));
    };

const { removeTravelFund, removeTravelFundSuccess, removeTravelFundFailed } =
  apiActionCreator(SHARED__REMOVE_TRAVEL_FUND);

export const removeFund =
  (
    request: RemoveFundRequestType,
    redirectPath: string = DEFAULT_REDIRECT_PATH,
    isLoggedIn: boolean = DEFAULT_LOGGEDIN_BOOL
  ) =>
    (dispatch: *, getState: *) => {
      const isWebView = _.get(getState(), 'app.webView.isWebView', false);
      const cashPointsPage = request?.body?.cashPointsPage === true;

      dispatch(removeTravelFund(request));

      return FlightBookingApi.calculateFunds(request, isLoggedIn)
        .then((response) => {
          dispatch(removeTravelFundSuccess(response));
          cashPointsPage && dispatch(saveSplitPayTermsAndConditions(response?.termsAndConditions));

          return response;
        })
        .catch((error) => _handleError(error, dispatch, removeTravelFundFailed, redirectPath, isWebView));
    };

const { refreshTravelFunds, refreshTravelFundsSuccess, refreshTravelFundsFailed } =
  apiActionCreator(SHARED__REFRESH_TRAVEL_FUNDS);

export const refreshFunds =
  (
    request: RefreshFundsRequestType,
    redirectPath: string = DEFAULT_REDIRECT_PATH,
    isLoggedIn: boolean = DEFAULT_LOGGEDIN_BOOL
  ) =>
    (dispatch: *, getState: *) => {
      const isWebView = _.get(getState(), 'app.webView.isWebView', false);

      dispatch(refreshTravelFunds(request));

      return FlightBookingApi.calculateFunds(request, isLoggedIn)
        .then((response) => dispatch(refreshTravelFundsSuccess(response)))
        .catch((error) => _handleError(error, dispatch, refreshTravelFundsFailed, redirectPath, isWebView));
    };
