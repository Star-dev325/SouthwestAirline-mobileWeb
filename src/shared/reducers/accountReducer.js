import { combineReducers } from 'redux';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';
import { cloneDeep } from 'src/shared/helpers/jsUtils';

const {
  ACCOUNT__FETCH_USER_INFO_SUCCESS,
  ACCOUNT__GET_SALESFORCE_GUID,
  ACCOUNT__GRANT_CORPORATE_TOKEN_SUCCESS,
  ACCOUNT__GRANT_LEISURE_TOKEN_SUCCESS,
  ACCOUNT__SAVE_ACCOUNT_INFO,
  ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
  ACCOUNT__SAVE_ACCOUNT_NUMBER,
  ACCOUNT__SAVE_CORPORATE_INFO,
  ACCOUNT__SET_IS_LOGGED_IN,
  ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
} = AccountActionTypes;

const accountInfo = (state = null, action = {}) => {
  switch (action.type) {
    case ACCOUNT__SAVE_ACCOUNT_INFO:
      return cloneDeep(action.accountInfo);
    default:
      return state;
  }
};

const accountNumber = (state = '', action = {}) => {
  switch (action.type) {
    case ACCOUNT__SAVE_ACCOUNT_NUMBER:
      return action.accountNumber;
    default:
      return state;
  }
};

const corporateInfo = (state = null, action = {}) => {
  switch (action.type) {
    case ACCOUNT__SAVE_CORPORATE_INFO:
      return cloneDeep(action.corporateInfo);
    default:
      return state;
  }
};

const isAccountInfoFetched = (state = false, action = {}) => {
  switch (action.type) {
    case ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED:
      return action.isFetched;
    default:
      return state;
  }
};

const isLoggedIn = (state = false, action = {}) => {
  switch (action.type) {
    case ACCOUNT__SET_IS_LOGGED_IN:
      return action.isLoggedIn;
    default:
      return state;
  }
};

const isTokenConverted = (state = false, action = {}) => {
  switch (action.type) {
    case ACCOUNT__GRANT_LEISURE_TOKEN_SUCCESS:
    case ACCOUNT__GRANT_CORPORATE_TOKEN_SUCCESS:
      return true;
    default:
      return state;
  }
};

const salesforceGuid = (state = '', action = {}) => {
  switch (action.type) {
    case ACCOUNT__GET_SALESFORCE_GUID:
      return action.salesforceGuid;
    default:
      return state;
  }
};

const userInfo = (state = null, action = {}) => {
  switch (action.type) {
    case ACCOUNT__FETCH_USER_INFO_SUCCESS:
      return { ...state, ...action.response };
    case ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION:
      return { ...state, ...{
        customers: { UserInformation: { recentFlightDestinationAirport: action.airportName } }
      } };
    default:
      return state;
  }
};

export default combineReducers({
  accountInfo,
  accountNumber,
  corporateInfo,
  isAccountInfoFetched,
  isLoggedIn,
  isTokenConverted,
  salesforceGuid,
  userInfo
});