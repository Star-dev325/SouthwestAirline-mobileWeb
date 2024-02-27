import { combineReducers } from 'redux';
import StandbyActionTypes from 'src/standby/actions/standbyActionTypes';
import cancelStandbyListConfirmationPageReducers from 'src/standby/reducers/cancelStandbyListConfirmationPageReducers';
import standbyPageReducer from 'src/standby/reducers/standbyPageReducer';

const { STANDBY__SAVE_IS_REVENUE } = StandbyActionTypes;

const isRevenue = (state = null, action = {}) => {
  switch (action.type) {
    case STANDBY__SAVE_IS_REVENUE: {
      return action.isRevenue;
    }
    default:
      return state;
  }
};

export const standbyReducers = combineReducers({
  cancelStandbyListConfirmationPage: cancelStandbyListConfirmationPageReducers,
  isRevenue,
  standbyPage: standbyPageReducer
});

const standby = (state, action) => standbyReducers(state, action);

export default standby;
