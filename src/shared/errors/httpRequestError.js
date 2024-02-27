import ExtendableError from 'src/shared/errors/extendableError';
import BrowserObject from 'src/shared/helpers/browserObject';
import i18n from '@swa-ui/locale';

const { window } = BrowserObject;

class HttpRequestError extends ExtendableError {
  constructor(message, requestId, code, httpStatusCode) {
    const defaultAPIErrorMessage = () =>
      (window.navigator.onLine
        ? i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR')
        : i18n('SHARED__ERROR_MESSAGES__NO_CONNECTION'));

    message = message || defaultAPIErrorMessage();
    super(message);

    this.requestId = requestId;
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }
}
export default HttpRequestError;
