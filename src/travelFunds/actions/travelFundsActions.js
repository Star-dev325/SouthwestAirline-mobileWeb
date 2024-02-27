// @flow

import travelFundActionTypes, { apiActionCreator } from 'src/travelFunds/actions/travelFundsActionTypes';
import * as TravelFundsApi from 'src/shared/api/travelFundsApi';
import { clearFormDataById } from 'src/shared/actions/formDataActions';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { TRAVEL_FUNDS_ID } from 'src/wcm/constants/wcmConstants';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import { STATUS } from 'src/shared/constants/flowConstants';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import type {
  LookUpFundRequestType,
  TravelFundsOptionsType,
  ViewTravelFundLinkRequestType,
  TransferTravelFundsRequestType,
  ViewTravelFundsLinkRequestInfo
} from 'src/travelFunds/flow-typed/travelFunds.types';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';

const {
  TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA,
  TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
  TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS,
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS,
  TRAVEL_FUNDS__SAVE_PREV_SEARCH,
  TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS
} = travelFundActionTypes;
const {
  LOOK_UP_TRAVEL_FUNDS_FORM_ID,
  LOOK_UP_LUV_VOUCHER_FORM_ID,
  LOOK_UP_GIFT_CARD_FORM_ID,
  APPLY_TRAVEL_FUNDS_FORM_ID,
  APPLY_LUV_VOUCHER_FORM_ID,
  APPLY_GIFT_CARD_FORM_ID
} = TravelFundsConstants;

export const resetLookupFlowData = () => ({
  type: TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA
});

export const updateSelectedLookupTab = (selection: TravelFundsOptionsType) => ({
  type: TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB,
  selection
});

export const updateSelectedApplyTab = (selection: TravelFundsOptionsType) => ({
  type: TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB,
  selection
});

export const clearAllLookUpForms = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(clearFormDataById(LOOK_UP_TRAVEL_FUNDS_FORM_ID));
  dispatch(clearFormDataById(LOOK_UP_LUV_VOUCHER_FORM_ID));
  dispatch(clearFormDataById(LOOK_UP_GIFT_CARD_FORM_ID));
};

export const clearAllApplyForms = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(clearFormDataById(APPLY_TRAVEL_FUNDS_FORM_ID));
  dispatch(clearFormDataById(APPLY_LUV_VOUCHER_FORM_ID));
  dispatch(clearFormDataById(APPLY_GIFT_CARD_FORM_ID));
};

const { lookUpTravelFunds, lookUpTravelFundsSuccess, lookUpTravelFundsFailed } = apiActionCreator(
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS
);

export const retrieveTravelFunds =
  (request: LookUpFundRequestType, isRefreshCall: boolean = false) =>
    (dispatch: *) => {
      dispatch(lookUpTravelFunds(request));

      return TravelFundsApi.retrieveTravelFunds(request)
        .then((response) => {
          dispatch(savePreviousTravelFundsSearchRequest(request));
          dispatch(
            lookUpTravelFundsSuccess({
              viewTravelFund: response.viewTravelFund,
              isRefreshCall,
              mktg_data: response['mktg_data']
            })
          );
          dispatch(clearAllLookUpForms());

          return response;
        })
        .catch((error) => dispatch(lookUpTravelFundsFailed(error)));
    };

const { fetchValidateFunds, fetchValidateFundsSuccess, fetchValidateFundsFailed } = apiActionCreator(
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS
);

export const validateTransferFunds = (request: ViewTravelFundLinkRequestType) => (dispatch: ThunkDispatch) => {
  dispatch(fetchValidateFunds(request));

  return TravelFundsApi.retrieveTravelFunds(request, true)
    .then((response) => {
      dispatch(FlowStatusActions.setFlowStatus('travelFunds', STATUS.IN_PROGRESS));
      dispatch(fetchValidateFundsSuccess(response.validateTransferPage));
    })
    .catch((error) => {
      dispatch(fetchValidateFundsFailed(error));

      throw error;
    });
};

const { fetchTransferTravelFunds, fetchTransferTravelFundsSuccess, fetchTransferTravelFundsFailed } = apiActionCreator(
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS
);

export const transferTravelFunds = (request: TransferTravelFundsRequestType) => (dispatch: ThunkDispatch) => {
  dispatch(fetchTransferTravelFunds(request));

  return TravelFundsApi.retrieveTravelFunds(request, true)
    .then((response) => {
      dispatch(FlowStatusActions.setFlowStatus('travelFunds', STATUS.COMPLETED));
      dispatch(fetchTransferTravelFundsSuccess(response.transferConfirmationPage));
    })
    .catch((error) => {
      dispatch(fetchTransferTravelFundsFailed(error));

      return error;
    });
};

const { associateTravelFunds, associateTravelFundsSuccess, associateTravelFundsFailed } = apiActionCreator(
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS
);

export const associateFunds = (request: ViewTravelFundLinkRequestType) => (dispatch: ThunkDispatch) => {
  dispatch(associateTravelFunds(request));

  return TravelFundsApi.retrieveTravelFunds(request, true)
    .then((response) => dispatch(associateTravelFundsSuccess(response.message)))
    .catch((error) => dispatch(associateTravelFundsFailed(error)));
};

const { fetchUnusedFunds, fetchUnusedFundsSuccess, fetchUnusedFundsFailed } = apiActionCreator(
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS
);

export const retrieveUnusedFunds = (request: LookUpFundRequestType) => (dispatch: *) => {
  dispatch(fetchUnusedFunds(request));

  return TravelFundsApi.retrieveTravelFunds(request, true)
    .then((response) => {
      dispatch(savePreviousTravelFundsSearchRequest(request));
      dispatch(fetchUnusedFundsSuccess(response));
    })
    .catch((error) => dispatch(fetchUnusedFundsFailed(error)));
};

const savePreviousTravelFundsSearchRequest = (request: LookUpFundRequestType) => ({
  type: TRAVEL_FUNDS__SAVE_PREV_SEARCH,
  request
});

export const resumeAfterLogin = (shouldResume: boolean, requestInfo: ViewTravelFundsLinkRequestInfo = {}) => ({
  type: TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
  shouldResume,
  requestInfo
});

const { fetchTravelFundsPagePlacements, fetchTravelFundsPagePlacementsSuccess, fetchTravelFundsPagePlacementsFailed } =
  apiActionCreator(TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS);

export const loadTravelFundsPagePlacements = () => (dispatch: ThunkDispatch): Promise<*> => {
  dispatch(fetchTravelFundsPagePlacements());

  return dispatch(getTargetParams({}, TRAVEL_FUNDS_ID))
    .then((params) => dispatch(getMboxConfig(TRAVEL_FUNDS_ID, params, [])))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(TRAVEL_FUNDS_ID, [], segments)))
    .then((content) => dispatch(fetchTravelFundsPagePlacementsSuccess(content)))
    .catch((error) => dispatch(fetchTravelFundsPagePlacementsFailed(error)));
};
