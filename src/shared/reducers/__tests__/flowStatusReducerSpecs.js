import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import FlowStatusReducer, { initialFlowStatus } from 'src/shared/reducers/flowStatusReducer';
import { STATUS } from 'src/shared/constants/flowConstants';

describe('flowStatusReducer', () => {
  it('should init status', () => {
    const state = FlowStatusReducer(undefined, {});

    expect(state).to.deep.equal(initialFlowStatus);
  });

  it('should set the status when action trigger', () => {
    const state = FlowStatusReducer(undefined, {
      type: FlowStatusActionTypes.SET_FLOW_STATUS,
      flowName: 'airBooking',
      status: STATUS.IN_PROGRESS
    });

    expect(state).to.deep.equal({
      airBooking: STATUS.IN_PROGRESS,
      checkIn: STATUS.INITIAL
    });
  });

  it('should reset status to undefined when clear action trigger', () => {
    const state = FlowStatusReducer('in_progress', {
      type: FlowStatusActionTypes.CLEAR_FLOW_STATUS
    });

    expect(state).to.deep.equal(initialFlowStatus);
  });

  it('should return default state when action is undefined', () => {
    expect(FlowStatusReducer()).to.deep.equal(initialFlowStatus);
  });
});
