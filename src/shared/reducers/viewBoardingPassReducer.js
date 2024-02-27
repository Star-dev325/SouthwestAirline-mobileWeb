import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import _ from 'lodash';

const { SHARED__UPDATE_VIEW_BOARDING_PASS } = SharedActionTypes;

const initialState = {};

export const viewBoardingPass = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHARED__UPDATE_VIEW_BOARDING_PASS:
      return _.cloneDeep(action.payload);
    default:
      return state;
  }
};
