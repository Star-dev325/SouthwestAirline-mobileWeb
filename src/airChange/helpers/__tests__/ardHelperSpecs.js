import ARDHelper from 'src/airChange/helpers/ardHelper';

describe('ARDHelper', () => {
  let errorResponse;

  beforeEach(() => {
    errorResponse = {
      responseJSON: {
        code: 403500291
      }
    };
  });
  context('isARD', () => {
    it('should return true if the error code is ARD error code', () => {
      expect(ARDHelper.isARD(errorResponse)).to.be.true;
    });
  });
  context('transformARDError', () => {
    it('should add title and message property in error response', () => {
      const customError = ARDHelper.transformARDError(errorResponse);

      expect(customError).to.have.nested.property('responseJSON.title', 'Under Construction');
      expect(customError).to.have.nested.property(
        'responseJSON.message',
        "Our Reservation System is undergoing some changes and we can't book this particular itinerary through the mobile app until the dust settles. To complete the booking visit Southwest.com."
      );
    });
  });
});
