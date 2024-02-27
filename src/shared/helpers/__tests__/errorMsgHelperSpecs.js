import _ from 'lodash';
import { getErrorMsgGetter } from 'src/shared/helpers/errorMsgHelper';
import SharedErrorMessages from 'src/shared/constants/errorMessages';

describe('errorMsgHelper', () => {
  let getErrorMsg;

  const customMsgs = {
    TEST: 'TEST'
  };

  beforeEach(() => {
    getErrorMsg = getErrorMsgGetter(customMsgs);
  });

  it('should return custom error properly', () => {
    const error = 'TEST';

    expect(getErrorMsg(error)).to.equal(customMsgs[error]);
  });

  it('should return shared error message when error not found in custom errors', () => {
    const error = 'DEFAULT_API_ERROR';

    expect(getErrorMsg(error)).to.equal(SharedErrorMessages[error]);
  });

  it('should return unknown error when error not found in custom and shared errors', () => {
    const error = _.uniqueId('CAN_NOT_FOUND');

    expect(getErrorMsg(error)).to.equal(SharedErrorMessages['UNKNOWN_ERR']);
  });
});
