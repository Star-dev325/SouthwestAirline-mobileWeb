import { combineReducers } from 'redux';
import earlyBirdDetailPageReducer from 'src/earlyBird/reducers/earlyBirdDetailPageReducers';
import { reviewPage as earlyBirdReviewPageReducers } from 'src/earlyBird/reducers/earlyBirdReviewPageReducers';
import earlyBirdConfirmationReducers from 'src/earlyBird/reducers/earlyBirdConfirmationReducers';
import * as EarlyBirdReducers from 'src/earlyBird/reducers/earlyBirdReducers';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__RESET_FLOW_DATA } = earlyBirdActionTypes;
const earlyBirdReducers = combineReducers({
  detailPage: earlyBirdDetailPageReducer,
  reviewPage: earlyBirdReviewPageReducers,
  confirmationPage: earlyBirdConfirmationReducers,
  ...EarlyBirdReducers
});

const earlyBird = (state, action) => {
  if (action.type === EARLY_BIRD__RESET_FLOW_DATA) {
    return earlyBirdReducers(undefined, action);
  }

  return earlyBirdReducers(state, action);
};

export default earlyBird;
