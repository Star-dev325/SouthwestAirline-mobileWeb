const safeAsyncAssertion = require('../safeAsyncAssertion');

describe('safeAsyncAssertion', () => {
  context('when assertion throws an error', () => {
    it('should call done with the same error', () => {
      let caughtError;

      const assertionWhichThrowsError = function() {
        throw 'this is an error!';
      };

      const mockDone = function(error) {
        caughtError = error;
      };

      safeAsyncAssertion(assertionWhichThrowsError, mockDone);

      expect(caughtError).to.be.equal('this is an error!');
    });
  });

  context('when assertion does not throw an error', () => {
    it('should call done without an error', () => {
      let caughtError;
      let mockDoneWasCalled = false;

      const mockDone = function(error) {
        mockDoneWasCalled = true;
        caughtError = error;
      };

      safeAsyncAssertion(() => {
      }, mockDone);

      expect(mockDoneWasCalled).to.be.true;
      expect(caughtError).to.not.be.exist;
    });
  });
});
