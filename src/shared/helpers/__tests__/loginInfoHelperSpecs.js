import { isAccessTokenExpired, isUserLoginExpired } from 'src/shared/helpers/loginInfoHelper';
import LoginApiResponseBuilder from 'test/builders/apiResponse/loginApiResponseBuilder';

describe('LoginInfoHelper', () => {
  it('should return true when hotExpirationDateTimeUtc is before now', () => {
    const loginInfo = new LoginApiResponseBuilder().withAccessTokenExpired().build();

    expect(isAccessTokenExpired(loginInfo.accessTokenDetails.hotExpirationDateTimeUtc)).to.be.true;
  });

  it('should return false when hotExpirationDateTimeUtc is after now', () => {
    const loginInfo = new LoginApiResponseBuilder().build();

    expect(isAccessTokenExpired(loginInfo.accessTokenDetails.hotExpirationDateTimeUtc)).to.be.false;
  });

  it('should return true when user login is expired', () => {
    // right now we don't support refresh token, so expired datetime is same as accessToken expired
    const loginInfo = new LoginApiResponseBuilder().withAccessTokenExpired().build();

    expect(isUserLoginExpired(loginInfo.accessTokenDetails.hotExpirationDateTimeUtc)).to.be.true;
  });

  it('should return false when user login is not expired', () => {
    const loginInfo = new LoginApiResponseBuilder().build();

    expect(isAccessTokenExpired(loginInfo.accessTokenDetails.hotExpirationDateTimeUtc)).to.be.false;
  });
});
