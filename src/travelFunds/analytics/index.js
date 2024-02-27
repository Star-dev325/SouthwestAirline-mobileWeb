import { travelFundsValidationMktgSelector } from 'src/travelFunds/analytics/travelFundsValidationMktgSelector';
import { travelFundsConfirmationMktgSelector } from 'src/travelFunds/analytics/travelFundsConfirmationMktgSelector';
import { viewTravelFundMktgSelector } from 'src/travelFunds/analytics/viewTravelFundMktgSelector';
import { viewUnusedTravelFundsMktgSelector } from 'src/travelFunds/analytics/viewUnusedTravelFundsMktgSelector';
import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';

const {
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS
} = travelFundActionTypes;

export const dataLayerSelectorsForTravelFunds = {
  [TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS]: travelFundsValidationMktgSelector,
  [TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS]: travelFundsConfirmationMktgSelector,
  [TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS]: viewTravelFundMktgSelector,
  [TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS]: viewUnusedTravelFundsMktgSelector
};
