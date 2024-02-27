import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__SAVE_SELECTED_BOUNDS } = AirChangeActionTypes;

export default (state = {}, action = {}) => {
  const { selectedBounds, type } = action;

  switch (type) {
    case AIR_CHANGE__SAVE_SELECTED_BOUNDS:
      return selectedBounds;
    default:
      return state;
  }
};
