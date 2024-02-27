import { combineReducers } from 'redux';

import * as ViewReservationReducers from 'src/viewReservation/reducers/viewReservationReducers';
import travelInformationPage from 'src/viewReservation/reducers/travelInformationPageReducers';

const viewReservationReducers = combineReducers({
  ...ViewReservationReducers,
  travelInformationPage
});

const viewReservation = (state, action) => viewReservationReducers(state, action);

export default viewReservation;
