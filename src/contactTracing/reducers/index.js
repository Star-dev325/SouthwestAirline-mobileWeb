import { combineReducers } from 'redux';
import contactTracingReducer from 'src/contactTracing/reducers/contactTracingReducer';

const reducers = combineReducers({
  detailPage: contactTracingReducer
});

const contactTracing = (state, action) => reducers(state, action);

export default contactTracing;
