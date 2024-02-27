import SharedErrorMessages from 'src/shared/constants/errorMessages';

export const getErrorMsgGetter = function (customErrorMsgs = {}) {
  return function (key) {
    return customErrorMsgs[key] || SharedErrorMessages[key] || SharedErrorMessages['UNKNOWN_ERR'];
  };
};
