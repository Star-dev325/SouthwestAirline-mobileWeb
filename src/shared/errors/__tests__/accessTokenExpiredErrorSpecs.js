import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import i18n from '@swa-ui/locale';

describe('AccessTokenExpiredError', () => {
  it('should set error message', () => {
    const error = new AccessTokenExpiredError();

    expect(error.message).to.deep.equal(i18n('SHARED__ERROR_MESSAGES__USER_SESSION_EXPIRED'));
  });

  it('should set isCorporate true', () => {
    const error = new AccessTokenExpiredError(true);

    expect(error.isCorporate).to.be.true;
  });

  it('should set isCorporate false', () => {
    const error = new AccessTokenExpiredError(false);

    expect(error.isCorporate).to.be.false;
  });
});
