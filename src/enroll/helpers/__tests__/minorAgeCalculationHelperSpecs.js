import { userIsConsideredMinor } from 'src/enroll/helpers/minorAgeCalculationHelper';
import dayjs from 'dayjs';

describe('minorAgeCalculationHelper', () => {
  it('should return true if passed in an age under minor threshold', () => {
    const dateOfBirth = dayjs().subtract(9, 'years').format('YYYY-MM-DD');

    expect(userIsConsideredMinor(dateOfBirth, 10)).to.be.true;
  });

  it('should return false if passed in an age over minor threshold', () => {
    const dateOfBirth = dayjs().subtract(20, 'years').format('YYYY-MM-DD');

    expect(userIsConsideredMinor(dateOfBirth, 10)).to.be.false;
  });

  it('should return false if the user age is at the minor threshold', () => {
    const dateOfBirth = dayjs().subtract(13, 'years').format('YYYY-MM-DD');

    expect(userIsConsideredMinor(dateOfBirth, 13)).to.be.false;
  });
});
