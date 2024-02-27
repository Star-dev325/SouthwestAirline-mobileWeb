import reservationRetrievalFormValidator from 'src/shared/form/formValidators/reservationRetrievalFormValidator';

describe('ReservationRetrievalFormValidator', () => {
  it('should have correct first name error message', () => {
    const result = reservationRetrievalFormValidator()({
      recordLocator: 'XFJLFO',
      firstName: 'pao-',
      lastName: 'lisa'
    });

    expect(result.firstName.msg).to.be.equal(
      'Enter a valid first name under 30 characters with no special characters (spaces allowed).'
    );
  });

  it('should have correct last name error message', () => {
    const result = reservationRetrievalFormValidator()({
      recordLocator: 'XFJLFO',
      firstName: 'pao',
      lastName: 'lisa-'
    });

    expect(result.lastName.msg).to.be.equal(
      'Enter a valid last name between 2 and 30 characters with no special characters (spaces allowed).'
    );
  });

  it('should not have error message when match the rules', () => {
    const result = reservationRetrievalFormValidator()({
      recordLocator: 'XFJLFO',
      firstName: `pa o`,
      lastName: `alis a`
    });

    expect(result).to.be.empty;
  });
});
