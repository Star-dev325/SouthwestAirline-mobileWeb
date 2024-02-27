import HttpRequestError from 'src/shared/errors/httpRequestError';
import i18n from '@swa-ui/locale';

describe('HttpRequestError', () => {
  context('init', () => {
    it('should set props with the value of parameter', () => {
      const message = 'message';
      const requestId = 'id';
      const responseCode = 'code';
      const httpStatusCode = 'httpCode';
      const error = new HttpRequestError(message, requestId, responseCode, httpStatusCode);

      expect(error.message).to.deep.equal(message);
      expect(error.requestId).to.deep.equal(requestId);
      expect(error.code).to.deep.equal(responseCode);
      expect(error.httpStatusCode).to.deep.equal(httpStatusCode);
    });

    it('should set message to NO_CONNECTION message when parameter message is undefined', () => {
      const error = new HttpRequestError(undefined, 'id', 'code', 'httpCode');

      expect(error.message).to.deep.equal(i18n('SHARED__ERROR_MESSAGES__NO_CONNECTION'));
    });
  });
});
