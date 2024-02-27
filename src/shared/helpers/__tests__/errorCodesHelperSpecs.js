import { containsApiErrorCodes, isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { SESSION_TIMEOUT_ERRORS } from 'src/shared/constants/errorCodes';

describe('errorCodesHelper', () => {
  let errorResponse;

  beforeEach(() => {
    errorResponse = {
      responseJSON: {
        code: 123,
        message: 'someError'
      }
    };
  });
  context('checkErrorCode', () => {
    it('should return true if errorCode matches a plain code', () => {
      errorResponse.responseJSON.code = 1;
      expect(containsApiErrorCodes(errorResponse, 1)).to.be.true;
    });

    it("should return false if errorCode doesn't match a plain code", () => {
      errorResponse.responseJSON.code = 4;
      expect(containsApiErrorCodes(errorResponse, 1)).to.be.false;
    });

    it('should return true if errorCode matches an array of codes', () => {
      errorResponse.responseJSON.code = 2;
      expect(containsApiErrorCodes(errorResponse, [1, 2, 3])).to.be.true;
    });

    it("should return true if errorCode doesn't match any of the codes in array", () => {
      errorResponse.responseJSON.code = 4;
      expect(containsApiErrorCodes(errorResponse, [1, 2, 3])).to.be.false;
    });

    it('should return false if errorCode map does not exist', () => {
      expect(containsApiErrorCodes(errorResponse, null)).to.be.false;
    });

    it('should return false if errorCode does not exist', () => {
      errorResponse.responseJSON.code = null;
      expect(containsApiErrorCodes(errorResponse, 1)).to.be.false;
    });

    it('should return true if one of the errorCodes matches an array of codes', () => {
      errorResponse.responseJSON.code = 2;
      expect(containsApiErrorCodes(errorResponse, [1, 2, 3], [4, 5, 6])).to.be.true;
    });

    it('should return true if one of the errorCodes matches a plain code', () => {
      errorResponse.responseJSON.code = 2;
      expect(containsApiErrorCodes(errorResponse, [4, 5, 6], 2)).to.be.true;
    });

    it('should return true if one of the errorCodes matches with session time out error', () => {
      errorResponse.responseJSON.code = SESSION_TIMEOUT_ERRORS[1];

      expect(isSessionTimeoutError(errorResponse, SESSION_TIMEOUT_ERRORS)).to.be.true;
    });
  });
});
