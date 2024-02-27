import PassengerFormatter from 'src/shared/helpers/passengerFormatter';

describe('passengerNameFormatter', () => {
  it('should capitalize every field we want to pick', () => {
    const result = PassengerFormatter.formatPassengerName(
      {
        firstName: 'FIRST',
        middleName: 'middle',
        lastName: 'lasT'
      },
      ['firstName', 'middleName', 'lastName']
    );

    expect(result).to.equal('First Middle Last');
  });

  it('should skip the empty value', () => {
    const result = PassengerFormatter.formatPassengerName(
      {
        firstName: 'FIRST',
        middleName: '',
        lastName: 'lasT'
      },
      ['firstName', 'middleName', 'lastName']
    );

    expect(result).to.equal('First Last');
  });

  it('should skip the undefined', () => {
    const result = PassengerFormatter.formatPassengerName(
      {
        firstName: 'FIRST',
        middleName: undefined,
        lastName: 'lasT'
      },
      ['firstName', 'middleName', 'lastName']
    );

    expect(result).to.equal('First Last');
  });
});
