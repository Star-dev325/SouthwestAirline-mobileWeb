import _ from 'lodash';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import { STATUS } from 'src/shared/constants/flowConstants';

export const initialFlowStatus = {
  checkIn: STATUS.INITIAL
};

export default function flowStatusReducer(state = initialFlowStatus, action = {}) {
  switch (action.type) {
    case FlowStatusActionTypes.SET_FLOW_STATUS: {
      return _.merge({}, state, { [action.flowName]: action.status });
    }
    case FlowStatusActionTypes.CLEAR_FLOW_STATUS: {
      return initialFlowStatus;
    }
    default:
      return state;
  }
}
