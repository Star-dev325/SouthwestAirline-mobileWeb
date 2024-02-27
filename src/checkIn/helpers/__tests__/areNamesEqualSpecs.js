import areNamesEqual from 'src/checkIn/helpers/areNamesEqual';

describe('areNamesEqual comparator', () => {
  it(`should know when two names are equal`, () => {
    expect(
      areNamesEqual(
        { firstName: 'ron', middleName: '', lastName: null, suffix: 'II' },
        { firstName: 'ron', middleName: '', lastName: null, suffix: 'II' }
      )
    ).to.be.true;
  });

  it(`should know that empty strings and nulls are considered equal`, () => {
    expect(
      areNamesEqual(
        { firstName: 'ron', middleName: '', lastName: null, suffix: 'II' },
        { firstName: 'ron', middleName: null, lastName: '', suffix: 'II' }
      )
    ).to.be.true;
  });

  it(`should know when two names are not equal`, () => {
    expect(
      areNamesEqual(
        { firstName: 'ron', middleName: '', lastName: null, suffix: 'II' },
        { firstName: 'cannon', middleName: '', lastName: null, suffix: 'MD' }
      )
    ).to.be.false;
  });

  it(`should know that suffix in firstName are considered equal`, () => {
    expect(
      areNamesEqual(
        { firstName: 'ron II', middleName: '', lastName: null, suffix: '' },
        { firstName: 'ron', middleName: '', lastName: null, suffix: 'II' }
      )
    ).to.be.true;
  });
});
