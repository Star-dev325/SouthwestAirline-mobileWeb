import { combineReducers } from 'redux';

import { changeFlightPage } from 'src/airChange/reducers/changeFlightPageReducers';
import selectedBounds from 'src/airChange/reducers/selectedBoundsReducer';
import selectFarePage from 'src/airChange/reducers/selectFarePageReducers';
import changeShoppingPage from 'src/airChange/reducers/changeShoppingPageReducers';
import changePricingPage from 'src/airChange/reducers/changeSummaryPageReducers';
import changeConfirmationPage from 'src/airChange/reducers/changeConfirmationPageReducers';
import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import * as AirChangeReducers from 'src/airChange/reducers/airChangeReducers';
import reaccomFlightPage from 'src/airChange/reducers/reaccomFlightPageReducers';
import reaccomShoppingPage from 'src/airChange/reducers/reaccomShoppingPageReducers';
import { reaccomConfirmationPage } from 'src/airChange/reducers/reaccomConfirmationPageReducers';
import { applyTravelFunds } from 'src/shared/reducers/applyTravelFundsReducers';

const { AIR_CHANGE__RESET_FLOW_DATA } = AirChangeActionTypes;

const airChangeReducers = combineReducers({
  changeFlightPage,
  selectedBounds,
  selectFarePage,
  changeShoppingPage,
  changePricingPage,
  changeConfirmationPage,
  ...AirChangeReducers,
  reaccomFlightPage,
  reaccomShoppingPage,
  reaccomConfirmationPage,
  applyTravelFundsPage: applyTravelFunds
});

const airChange = (state, action) => {
  if (action.type === AIR_CHANGE__RESET_FLOW_DATA) {
    return airChangeReducers(undefined, action);
  }

  return airChangeReducers(state, action);
};

export default airChange;
