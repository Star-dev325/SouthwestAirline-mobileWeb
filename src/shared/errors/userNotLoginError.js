import ExtendableError from 'src/shared/errors/extendableError';
import i18n from '@swa-ui/locale';

class UserNotLoginError extends ExtendableError {
  constructor(message) {
    message = message || i18n('SHARED__ERROR_MESSAGES__USER_SESSION_EXPIRED');

    super(message);
  }
}

export default UserNotLoginError;
