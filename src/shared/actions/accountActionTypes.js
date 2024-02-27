import { actionCreator } from 'src/shared/redux/actionCreator';

const { createApiActions, createTypes } = actionCreator('account');

const types = {
  sync: [
    'SAVE_ACCOUNT_INFO',
    'SAVE_ACCOUNT_NUMBER',
    'SAVE_CORPORATE_INFO',
    'SAVE_RECENT_FLIGHT_DESTINATION',    
    'SET_IS_LOGGED_IN',
    'SET_IS_LOGOUT_PENDING',
    'UPDATE_ACCOUNT_INFO_FETCHED'
  ],
  async: [
    'FETCH_ACCOUNT_INFO',
    'FETCH_SALESFORCE_GUID',
    'FETCH_USER_INFO',
    'GET_SALESFORCE_GUID',
    'GRANT_CORPORATE_TOKEN',
    'GRANT_LEISURE_TOKEN',
    'LOGIN_USER',
    'LOGOUT_USER'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);