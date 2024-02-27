import { isPassengerCheckedEarlyBird } from 'src/shared/form/formValidators/earlyBirdDetailFormValidator';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';

describe('earlyBirdDetailFormValidator', () => {
  it('should has the correct type and error message', () => {
    expect(isPassengerCheckedEarlyBird[0].type).to.be.equal(ERROR_HEADER);
    expect(isPassengerCheckedEarlyBird[0].msg).to.be.equal(
      i18n('SHARED__ERROR_MESSAGES__NO_PASSENGER_CHECKED_ERROR_MESSAGE')
    );
  });

  it('should return true when at least 1 passenger has selected EB', () => {
    const formData = new EarlyBirdDetailFormDataBuilder().withOneWay().build();

    expect(isPassengerCheckedEarlyBird[0].validator(formData)).to.be.true;
  });

  it('should return false when no passenger has selected EB', () => {
    const formData = new EarlyBirdDetailFormDataBuilder().withNoEBSelected().build();

    expect(isPassengerCheckedEarlyBird[0].validator(formData)).to.be.false;
  });
});
