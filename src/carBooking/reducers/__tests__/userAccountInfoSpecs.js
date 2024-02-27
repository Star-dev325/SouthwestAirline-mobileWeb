import { userInfo as userAccountInfoReducer } from 'src/carBooking/reducers/userAccountInfo';

describe('userAccountInfoReducer', () => {
  it('should populate default values for driverInfo and contactInfo node when INIT action is triggered', () => {
    const result = userAccountInfoReducer(undefined, {
      type: 'INIT'
    });

    expect(result).to.deep.equal({
      driverInfo: null,
      contactInfo: null
    });
  });

  it('should populate default values for driverInfo node when CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO action is triggered', () => {
    const result = userAccountInfoReducer(undefined, {
      type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO',
      driverInfo: 'driverInfo'
    });

    expect(result).to.deep.equal({
      driverInfo: 'driverInfo',
      contactInfo: null
    });
  });

  it('should return default state when action is undefined', () => {
    expect(userAccountInfoReducer()).to.deep.equal({
      driverInfo: null,
      contactInfo: null
    });
  });

  it('should populate default values for contactInfo node when CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO action is triggered', () => {
    const result = userAccountInfoReducer(undefined, {
      type: 'CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO',
      contactInfo: 'contactInfo'
    });

    expect(result).to.deep.equal({
      driverInfo: null,
      contactInfo: 'contactInfo'
    });
  });
});
