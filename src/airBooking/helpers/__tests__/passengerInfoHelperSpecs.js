import {
  formatDateOfBirthToYearMonthDay,
  formatDateOfBirthToMonthDayYear
} from 'src/airBooking/helpers/passengerInfoHelper';

context('formatDateOfBirthToYearMonthDay', () => {
  it('should return MM/DD/YYYY date in YYYY-MM-DD format', () => {
    const date = '01/02/1965';
    const expectedResult = '1965-01-02';
    const result = formatDateOfBirthToYearMonthDay(date);

    expect(result).to.equal(expectedResult);
  });

  it('should return YYYY-MM-DD date in YYYY-MM-DD format', () => {
    const date = '1965-01-02';
    const expectedResult = '1965-01-02';
    const result = formatDateOfBirthToYearMonthDay(date);

    expect(result).to.equal(expectedResult);
  });
});

context('formatDateOfBirthToMonthDayYear', () => {
  it('should return YYYY-MM-DD date in MM/DD/YYYY format', () => {
    const date = '1965-01-02';
    const expectedResult = '01/02/1965';
    const result = formatDateOfBirthToMonthDayYear(date);

    expect(result).to.equal(expectedResult);
  });

  it('should return MM/DD/YYYY date in MM/DD/YYYY format', () => {
    const date = '01/02/1965';
    const expectedResult = '01/02/1965';
    const result = formatDateOfBirthToMonthDayYear(date);

    expect(result).to.equal(expectedResult);
  });
});
