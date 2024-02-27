import _ from 'lodash';
import EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__SAVE_REVIEW_PAGE_DATA } = EarlyBirdActions;

export const reviewPage = (state = {}, action = {}) => {
  switch (action.type) {
    case EARLY_BIRD__SAVE_REVIEW_PAGE_DATA: {
      return _.cloneDeep(action.reviewPage);
    }
    default:
      return state;
  }
};
