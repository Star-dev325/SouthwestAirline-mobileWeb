import { combineReducers } from 'redux';
import lookUpTravelFundsPageReducer from 'src/travelFunds/reducers/lookUpTravelFundsPageReducer';

export const travelFundsReducers = combineReducers({
  lookUpTravelFundsPage: lookUpTravelFundsPageReducer
});

const travelFunds = (state, action) => travelFundsReducers(state, action);

export default travelFunds;
