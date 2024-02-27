// @flow
import _ from 'lodash';
import { combineReducers } from 'redux';
import dayjs from 'dayjs';
import wcmConfig from 'src/wcm/constants/wcmConfig';
import wcmActionsTypes from 'src/wcm/actions/wcmActionsTypes';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';

const reducers = _.mapValues(wcmConfig, (config) => (state = null, action = {}) => {
  if (action.type === `${config.actionType}_SUCCESS`) {
    return action.response;
  }

  return state;
});

const homeNavMenu = (state = null, action = {}) => {
  switch (action.type) {
    case wcmActionsTypes.WCM__FETCH_HOME_NAV_MENU_SUCCESS: {
      const NAV_DRAWER_REFRESH_MIN = 60;

      return {
        ...action.response,
        expirationDate: dayjs().add(NAV_DRAWER_REFRESH_MIN, 'minutes').format(DAYJS_TIMESTAMP_FORMAT)
      };
    }
    case wcmActionsTypes.WCM__EXPIRE_HOME_NAV_MENU: {
      return { ...state, expirationDate: dayjs().format(DAYJS_TIMESTAMP_FORMAT) };
    }
    default: {
      return state;
    }
  }
};

const fareDetails = (state = {}, action = {}) => {
  switch (action.type) {
    case wcmActionsTypes.WCM__FETCH_FARE_DETAILS_SUCCESS: {
      return { ...action.response };
    }
    default: {
      return state;
    }
  }
};

const footer = (state = null, action = {}) => {
  switch (action.type) {
    case wcmActionsTypes.WCM__FETCH_FOOTER_SUCCESS: {
      return { ...action.response };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  ...reducers,
  homeNavMenu,
  footer,
  fareDetails
});
