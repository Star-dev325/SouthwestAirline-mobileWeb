import { combineReducers } from 'redux';
import airBookingAnalyticsReducers from 'src/shared/analytics/reducers/airBookingAnalyticsReducers';
import specialAssistanceAnalyticsReducers from 'src/shared/analytics/reducers/specialAssistanceAnalyticsReducers';
import travelFundsAnalyticsReducers from 'src/shared/analytics/reducers/travelFundsAnalyticsReducers';
import chaseAnalyticsReducer from 'src/shared/analytics/reducers/chaseAnalyticsReducer';
import mBoxAnalyticsReducer from 'src/shared/analytics/reducers/mBoxAnalyticsReducer';

export default combineReducers({
  AirBookingStore: airBookingAnalyticsReducers,
  SpecialAssistanceStore: specialAssistanceAnalyticsReducers,
  TravelFundsStore: travelFundsAnalyticsReducers,
  ChaseAnalytics: chaseAnalyticsReducer,
  mBoxStore: mBoxAnalyticsReducer
});
