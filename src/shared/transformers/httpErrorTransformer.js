import _ from 'lodash';
import HttpRequestError from 'src/shared/errors/httpRequestError';

export const transformToHttpRequestError = (error) => {
  if (error instanceof Error) {
    return {};
  }

  const responseJSON = _.get(error, 'responseJSON', {});

  const { requestId, code, message, httpStatusCode } = responseJSON;

  const isCustomizedError = !!_.get(error, '$customized');
  const httpError = new HttpRequestError(message, requestId, code, httpStatusCode);

  return isCustomizedError
    ? {
      message: httpError.message,
      requestId,
      code,
      httpStatusCode,
      $customized: true
    }
    : httpError;
};
