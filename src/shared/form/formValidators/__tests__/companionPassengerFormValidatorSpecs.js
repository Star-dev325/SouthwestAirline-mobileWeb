import companionPassengerFormValidator from 'src/shared/form/formValidators/companionPassengerFormValidator';
import GenderTypes from 'src/shared/form/constants/genderTypes';

describe('companionPassengerFormValidator', () => {
  let props;

  beforeEach(() => {
    props = {
      declineNotifications: true,
      isInternationalBooking: true,
      companionInfo: {
        dateOfBirth: '1990-01-01',
        gender: 'F',
        name: {
          firstName: 'Helen',
          lastName: 'Wang'
        }
      }
    };
  });

  it('should return gender is invalid when gender is empty', () => {
    props.companionInfo.gender = '';
    const formData = { gender: '' };
    const validatorResult = companionPassengerFormValidator(props)(formData);

    expect(validatorResult).to.have.any.keys('gender');
  });

  it('should return gender is invalid when gender is UNAVAILABLE', () => {
    props.companionInfo.gender = GenderTypes.UNAVAILABLE;
    const formData = { gender: '' };
    const validatorResult = companionPassengerFormValidator(props)(formData);

    expect(validatorResult).to.have.any.keys('gender');
  });

  it('should return dateOfBirth is invalid when dateOfBirth is empty', () => {
    props.companionInfo.dateOfBirth = '';
    const formData = { dateOfBirth: '' };
    const validatorResult = companionPassengerFormValidator(props)(formData);

    expect(validatorResult).to.have.any.keys('dateOfBirth');
  });

  it('should return empty invalid object when companion has gender and DateOfBirth', () => {
    const validatorResult = companionPassengerFormValidator(props)({});

    expect(validatorResult).to.be.empty;
  });
});
