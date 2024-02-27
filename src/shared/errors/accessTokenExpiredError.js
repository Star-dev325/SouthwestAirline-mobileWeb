import ExtendableError from 'src/shared/errors/extendableError';
import i18n from '@swa-ui/locale';

class AccessTokenExpiredError extends ExtendableError {
  constructor(isCorporate) {
    super(i18n('SHARED__ERROR_MESSAGES__USER_SESSION_EXPIRED'));
    this.isCorporate = isCorporate;
  }
}

export default AccessTokenExpiredError;
