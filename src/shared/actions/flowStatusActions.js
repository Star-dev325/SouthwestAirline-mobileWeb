import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';

const FlowStatusActions = {
  setFlowStatus(flowName, status) {
    return {
      type: FlowStatusActionTypes.SET_FLOW_STATUS,
      flowName,
      status
    };
  },

  clearFlowStatus(flowName) {
    return {
      type: FlowStatusActionTypes.CLEAR_FLOW_STATUS,
      flowName
    };
  }
};

export default FlowStatusActions;
