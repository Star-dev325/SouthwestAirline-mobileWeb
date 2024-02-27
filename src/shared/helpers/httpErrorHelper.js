import _ from 'lodash';
import StatusErrorText from 'src/shared/constants/errStatusText';

const isOfflineError = function (err) {
  const { readyState, status, statusText, responseJSON } = err;

  return readyState === 0 && status === 0 && statusText === StatusErrorText.ERROR && _.isUndefined(responseJSON);
};

export default {
  isOfflineError
};
