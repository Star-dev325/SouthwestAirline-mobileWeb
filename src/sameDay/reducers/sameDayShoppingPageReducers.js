import { combineReducers } from 'redux';
import sameDayFlightDetails from 'src/sameDay/reducers/sameDayFlightDetailsReducers';
import sameDayShoppingInformation from 'src/sameDay/reducers/sameDayShoppingReducers';

const sameDayShoppingPageReducers = combineReducers({
  sameDayShoppingInformation,
  sameDayFlightDetails
});
 
export default (state, action) => sameDayShoppingPageReducers(state, action);
