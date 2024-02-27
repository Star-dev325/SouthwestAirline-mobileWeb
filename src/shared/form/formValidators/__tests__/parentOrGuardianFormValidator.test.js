import i18n from '@swa-ui/locale';
import parentOrGuardianFormValidator from 'src/shared/form/formValidators/parentOrGuardianFormValidator';
import { getParentOrGuardianFormData } from 'test/builders/model/youngTravelerPageBuilder';

describe('parentOrGuardianFormValidator', () => {
  const fieldErrorMessage = 'FIELD_ERROR_MESSAGE';
  const formData = getParentOrGuardianFormData();
  const hasSomeFieldsNeedToCorrect = {
    msg: 'Please correct the highlighted errors.',
    type: 'ERROR_HEADER'
  };

  it('should pass form validation when formData correct', () => {
    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({});
  });

  it('should fail validation when firstName is incorrect', () => {
    formData.firstName = 'Joe1$';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      firstName: {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID'),
        type: fieldErrorMessage
      },
      hasSomeFieldsNeedToCorrect
    });
  });

  it('should fail validation when lastName is incorrect', () => {
    formData.lastName = 'Doe1$';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      hasSomeFieldsNeedToCorrect,
      lastName: {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_VALID'),
        type: fieldErrorMessage
      }
    });
  });

  it('should fail validation when relationship is incorrect', () => {
    formData.relationship = 'Fathe1$r';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      hasSomeFieldsNeedToCorrect,
      relationship: {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_RELATIONSHIP_VALID'),
        type: fieldErrorMessage
      }
    });
  });

  it('should fail validation when addressLine1 is incorrect', () => {
    formData.addressLine1 = '123 ^ M@in';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      addressLine1: {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1'),
        type: fieldErrorMessage
      },
      hasSomeFieldsNeedToCorrect
    });
  });

  it('should fail validation when zipOrPostalCode is incorrect', () => {
    formData.zipOrPostalCode = '123';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      hasSomeFieldsNeedToCorrect,
      zipOrPostalCode: {
        msg: i18n('SHARED__ERROR_MESSAGES__ZIP_FOR_US'),
        type: fieldErrorMessage
      }
    });
  });

  it('should fail validation when city is incorrect', () => {
    formData.city = 'Bro@klyn';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      city: {
        msg: i18n('SHARED__ERROR_MESSAGES__CITY'),
        type: fieldErrorMessage
      },
      hasSomeFieldsNeedToCorrect
    });
  });

  it('should fail validation when stateProvinceRegion is incorrect', () => {
    formData.stateProvinceRegion = 'N&Y';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      hasSomeFieldsNeedToCorrect,
      stateProvinceRegion: {
        msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION'),
        type: fieldErrorMessage
      }
    });
  });

  it('should fail validation when phoneNumber is incorrect', () => {
    formData.phoneNumber = '123-45';

    const validations = parentOrGuardianFormValidator()(formData);

    expect(validations).toMatchObject({
      hasSomeFieldsNeedToCorrect,
      phoneNumber: {
        msg: i18n('SHARED__ERROR_MESSAGES__US_PHONE_NUMBER_LENGTH_ERROR'),
        type: fieldErrorMessage
      }
    });
  });
});
