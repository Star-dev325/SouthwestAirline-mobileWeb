import createMockStore from 'test/unit/helpers/createMockStore';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';

const { SET_FLOW_STATUS, CLEAR_FLOW_STATUS } = FlowStatusActionTypes;
const mockStore = createMockStore();

describe('FlowStatusActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch set flow status action', () => {
    store.dispatch(FlowStatusActions.setFlowStatus('testFlow', 'testStatus'));

    expect(store.getActions()).to.deep.equal([
      {
        type: SET_FLOW_STATUS,
        flowName: 'testFlow',
        status: 'testStatus'
      }
    ]);
  });

  it('should dispatch clear flow status action', () => {
    store.dispatch(FlowStatusActions.clearFlowStatus('testFlow'));

    expect(store.getActions()).to.deep.equal([
      {
        type: CLEAR_FLOW_STATUS,
        flowName: 'testFlow'
      }
    ]);
  });
});
