import _ from 'lodash';
import { combineReducers } from 'redux';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import upgradedBoardingReducer from 'src/upgradedBoarding/reducers/upgradedBoardingReducer';

const { UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA } = upgradedBoardingActionTypes;

const upgradedBoardingReducers = combineReducers({
  upgradedBoardingPage: upgradedBoardingReducer
});

const resetNestedExceptions = ['upgradedBoardingPagePlacements'];

const resetNestedObjectExceptions = (state) =>
  _.mapValues(state, (value, key) => (_.includes(resetNestedExceptions, key) ? value : undefined));

const resetExceptions = ['upgradedBoardingPage'];

const resetAllStateExcept = (state) =>
  _.mapValues(state, (value, key) =>
    (_.includes(resetExceptions, key) ? resetNestedObjectExceptions(value) : undefined)
  );

const upgradedBoarding = (state, action) => {
  if (action.type === UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA) {
    return upgradedBoardingReducers(resetAllStateExcept(state), action);
  }

  return upgradedBoardingReducers(state, action);
};

export default upgradedBoarding;
