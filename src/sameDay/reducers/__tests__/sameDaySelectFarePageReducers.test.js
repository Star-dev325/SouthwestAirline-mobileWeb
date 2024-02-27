import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDaySelectFarePage from 'src/sameDay/reducers/sameDaySelectFarePageReducers';

const {  SAME_DAY__SAVE_CHANGE_FLOW, SAME_DAY__SAVE_SELECTED_FLIGHT } = SameDayActionTypes;
const sameDaySaveChangeFlow = {
  type: SAME_DAY__SAVE_CHANGE_FLOW,
  isChangeFlow: true
};
const sameDaySaveSelectedFlightAction = {
  type: SAME_DAY__SAVE_SELECTED_FLIGHT,
  selectedFlight: { val: 'response' }
};

describe('sameDaySelectFarePageReducer', () => {
  it('when state is undefined with action type as SAME_DAY__SAVE_SELECTED_FLIGHT should return response', () => {
    expect(sameDaySelectFarePage(undefined, sameDaySaveSelectedFlightAction)).toEqual(
      sameDaySaveSelectedFlightAction.selectedFlight
    );
  });
  it('when state is undefined and with action type as SAME_DAY__SAVE_CHANGE_FLOW should return response', () => {
    expect(sameDaySelectFarePage(undefined, sameDaySaveChangeFlow)).toEqual(
      { "isChangeFlow": true  }
    );
  });

  it('when state is empty and with action type as SAME_DAY__SAVE_CHANGE_FLOW should return response', () => {
    expect(sameDaySelectFarePage({}, sameDaySaveChangeFlow)).toEqual(
      { "isChangeFlow": true }
    );
  });
  it('when state is empty and with action type as SAME_DAY__SAVE_SELECTED_FLIGHT should return response', () => {
    expect(sameDaySelectFarePage({}, sameDaySaveSelectedFlightAction)).toEqual(
      sameDaySaveSelectedFlightAction.selectedFlight
    );
  });

  it('when action is undefined should return false', () => {
    expect(sameDaySelectFarePage({}, undefined)).toEqual({});
  });

  it('when state and action are undefined should return an empty object', () => {
    expect(sameDaySelectFarePage(undefined, undefined)).toEqual({});
  });

  it('when action type does not match one of the defined types should return false', () => {
    expect(sameDaySelectFarePage(undefined, { type: 'test' })).toEqual({});
  });
});
