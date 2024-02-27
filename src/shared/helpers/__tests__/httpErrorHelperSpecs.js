import httpErrorHelper from 'src/shared/helpers/httpErrorHelper';

describe('httpErrorHelper', () => {
  context('isOfflineError', () => {
    const offlineErrObject = { readyState: 0, status: 0, statusText: 'error', responseJSON: undefined };

    it('should return true when parse a offline error object', () => {
      expect(httpErrorHelper.isOfflineError(offlineErrObject)).to.be.true;
    });
  });
});
