import { combineReducers } from 'redux';
import _ from 'lodash';

import EnrollActionTypes from 'src/enroll/actions/enrollActionTypes';

const { ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS } = EnrollActionTypes;

const securityQuestions = (state = null, action = {}) => {
  switch (action.type) {
    case ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS:
      return _.cloneDeep(_.get(action, 'response'));
    default:
      return state;
  }
};

const enrollReducers = combineReducers({
  securityQuestions
});

const enroll = (state, action) => enrollReducers(state, action);

export default enroll;
