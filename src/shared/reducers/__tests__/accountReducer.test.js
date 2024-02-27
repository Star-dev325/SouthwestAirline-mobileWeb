import AccountReducer from 'src/shared/reducers/accountReducer';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';

const {
  ACCOUNT__FETCH_USER_INFO_SUCCESS,
  ACCOUNT__GET_SALESFORCE_GUID,
  ACCOUNT__GRANT_CORPORATE_TOKEN_SUCCESS,
  ACCOUNT__GRANT_LEISURE_TOKEN_SUCCESS,
  ACCOUNT__SAVE_ACCOUNT_INFO,
  ACCOUNT__SAVE_ACCOUNT_NUMBER,
  ACCOUNT__SAVE_CORPORATE_INFO,
  ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
  ACCOUNT__SET_IS_LOGGED_IN,
  ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
} = AccountActionTypes;

describe('AccountReducer', () => {
  it('should set the initial state for redux account sub-tree when action type is @@INIT', () => {
    const state = AccountReducer(false, {
      type: '@@INIT'
    });

    expect(state).toEqual({
      accountInfo: null,
      accountNumber: '',
      corporateInfo: null,
      isAccountInfoFetched: false,
      isLoggedIn: false,
      isTokenConverted: false,
      salesforceGuid: '',
      userInfo: null
    });
  });

  it('should set user login state', () => {
    const state = AccountReducer(false, {
      type: ACCOUNT__SET_IS_LOGGED_IN,
      isLoggedIn: true
    });

    expect(state.isLoggedIn).toEqual(true);
  });

  it('should not set user login state if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.isLoggedIn).toEqual(false);
  });

  it('should save user account info', () => {
    const state = AccountReducer(
      {},
      {
        type: ACCOUNT__SAVE_ACCOUNT_INFO,
        accountInfo: {
          username: 'whatever'
        }
      }
    );

    expect(state.accountInfo).toEqual({
      username: 'whatever'
    });
  });

  it('should not save user corporate info if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.accountInfo).toEqual(null);
  });

  it('should save user corporate info', () => {
    const state = AccountReducer(
      {},
      {
        type: ACCOUNT__SAVE_CORPORATE_INFO,
        corporateInfo: {
          activeCompanyIdAssociations: []
        }
      }
    );

    expect(state.corporateInfo).toEqual({
      activeCompanyIdAssociations: []
    });
  });

  it('should not save user corporate info if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.corporateInfo).toEqual(null);
  });

  it('should save user account number when save account number', () => {
    const state = AccountReducer(
      {},
      {
        type: ACCOUNT__SAVE_ACCOUNT_NUMBER,
        accountNumber: 'accountNumber'
      }
    );

    expect(state.accountNumber).toEqual('accountNumber');
  });

  it('should not save user account number if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.accountNumber).toEqual('');
  });

  it('should set is account info fetched state', () => {
    const state = AccountReducer(false, {
      type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED,
      isFetched: true
    });

    expect(state.isAccountInfoFetched).toEqual(true);
  });

  it('should not set is account info fetched if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.isAccountInfoFetched).toEqual(false);
  });

  it('should set is token converted state when leisure token granted', () => {
    const state = AccountReducer(false, {
      type: ACCOUNT__GRANT_LEISURE_TOKEN_SUCCESS
    });

    expect(state.isTokenConverted).toEqual(true);
  });

  it('should set is token converted state when corporate token granted', () => {
    const state = AccountReducer(false, {
      type: ACCOUNT__GRANT_CORPORATE_TOKEN_SUCCESS
    });

    expect(state.isTokenConverted).toEqual(true);
  });

  it('should not set is token converted state if no matching action is provided', () => {
    const state = AccountReducer();

    expect(state.isTokenConverted).toEqual(false);
  });

  describe('userInfo', () => {
    it('should not set user info if no matching action is provided', () => {
      const state = AccountReducer();

      expect(state.userInfo).toBeNull();
    });

    it('should set user info on success', () => {
      const response = { key: 'value' };
      const state = AccountReducer(false, {
        type: ACCOUNT__FETCH_USER_INFO_SUCCESS,
        response
      });

      expect(state.userInfo).toEqual(response);
    });

    it('should set user info recent flight destination', () => {
      const airportName = 'AAA';
      const response = { customers: { UserInformation: { recentFlightDestinationAirport: airportName } } };
      const state = AccountReducer(false, {
        type: ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
        airportName
      });

      expect(state.userInfo).toEqual(response);
    });
  });

  it('should save salesforce GUID', () => {
    const state = AccountReducer(
      {},
      {
        type: ACCOUNT__GET_SALESFORCE_GUID,
        salesforceGuid: 'TEST_GUID'
      }
    );

    expect(state.salesforceGuid).toEqual('TEST_GUID');
  });
});