import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { SAME_DAY__SAVE_SELECTED_FLIGHT, SAME_DAY__SAVE_CHANGE_FLOW } = SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__SAVE_CHANGE_FLOW: {
      return {
        ...state,
        isChangeFlow: action.isChangeFlow
      };
    }
    case SAME_DAY__SAVE_SELECTED_FLIGHT: {
      return action.selectedFlight;
    }
    default: {
      return state;
    }
  }
};
