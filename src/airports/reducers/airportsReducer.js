import _ from 'lodash';
import { combineReducers } from 'redux';
import AirportsActionTypes from 'src/airports/actions/airportsActionTypes';
import { updateMultiSelectGroupIsSelected } from 'src/airports/helpers/airportsHelpers';

const airportInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case AirportsActionTypes.AIRPORTS__UPDATE_AIRPORT_INFO: {
      return _.cloneDeep(action.airportInfo);
    }
    case AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO: {
      return {};
    }
    default:
      return state;
  }
};

const allAirports = (state = [], action = {}) => {
  switch (action.type) {
    case AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case AirportsActionTypes.AIRPORTS__RESET_AIRPORTS: {
      return [];
    }
    default:
      return state;
  }
};

const recentlySearched = (state = [], action = {}) => {
  switch (action.type) {
    case AirportsActionTypes.AIRPORTS__UPDATE_RECENT_AIRPORT_SEARCH: {
      return _.cloneDeep(action.recentSearches);
    }
    case AirportsActionTypes.AIRPORTS__RESET_RECENT_AIRPORT_SEARCH: {
      return [];
    }
    default:
      return state;
  }
};

const multiSelectGroup = (
  state = { isSelected: false, currentDirection: null, unavailableGroup: null },
  action = {}
) => {
  const { formId } = action;
  let newState = _.cloneDeep(state);

  switch (action.type) {
    case AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP: {
      newState[formId] = action.response;
      newState = updateMultiSelectGroupIsSelected(newState);

      return newState;
    }
    case AirportsActionTypes.AIRPORTS__SAVE_MULTI_SELECT_GROUP: {
      return _.cloneDeep(action.response);
    }
    case AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID: {
      if (!_.isEmpty(newState[formId])) {
        delete newState[formId];
      }
      newState = updateMultiSelectGroupIsSelected(newState);

      return newState;
    }
    case AirportsActionTypes.AIRPORTS__LOAD_MULTI_SELECT_GROUP: {
      return _.cloneDeep(action.response);
    }
    case AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP_CURRENT_DIRECTION: {
      return { ...newState, currentDirection: action.response };
    }
    case AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP: {
      return { isSelected: false, currentDirection: null, unavailableGroup: null };
    }
    case AirportsActionTypes.AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP: {
      return {
        ...newState,
        unavailableGroup: newState.unavailableGroup
          ? [...newState.unavailableGroup, action.response]
          : [action.response]
      };
    }
    case AirportsActionTypes.AIRPORTS__CLEAR_UNAVAILABLE_MULTI_SELECT_GROUP: {
      return { ...newState, unavailableGroup: null };
    }

    default:
      return state;
  }
};

export default combineReducers({
  airportInfo,
  allAirports,
  multiSelectGroup,
  recentlySearched
});
