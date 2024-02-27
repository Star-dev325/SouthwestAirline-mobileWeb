import i18n from '@swa-ui/locale';
import selectPassengersFormValidator from 'src/shared/form/formValidators/selectPassengersFormValidator';

describe('selectPassengersFormValidator', () => {
  const fieldsError = {
    msg: 'Please correct the highlighted errors.',
    type: 'ERROR_HEADER'
  };
  const hasSelectedPassengerError = {
    type: 'ERROR_HEADER',
    msg: i18n('SHARED__SELECT_PASSENGERS__NO_SELECTION_ERROR_MESSAGE')
  };
  const emailFieldError = {
    msg: i18n('SHARED__ERROR_MESSAGES__INVALID_EMAIL'),
    type: 'FIELD_ERROR_MESSAGE'
  };

  describe('Passenger selection validation', () => {
    it('should return error when no passengers selected', () => {
      const formData = {
        id1: false,
        id2: false,
        receiptEmail: 'test@test.com'
      };
      const mockError = { hasSelectedPassenger: hasSelectedPassengerError };
      const validations = selectPassengersFormValidator()(formData);

      expect(validations).toMatchObject(mockError);
    });

    it('should not return validation errors when a passenger selected', () => {
      const formData = {
        id1: true,
        id2: false,
        receiptEmail: 'test@test.com'
      };
      const validations = selectPassengersFormValidator()(formData);

      expect(validations).toMatchObject({});
    });
  });

  describe('Email field validation', () => {
    it('should return error when email is invalid', () => {
      const formData = {
        id1: true,
        id2: false,
        receiptEmail: 'test#$@'
      };
      const mockError = {
        receiptEmail: emailFieldError,
        hasSomeFieldsNeedToCorrect: fieldsError
      };
      const validations = selectPassengersFormValidator()(formData);

      expect(validations).toMatchObject(mockError);
    });

    it('should return error when email is empty', () => {
      const formData = {
        id1: true,
        id2: false,
        receiptEmail: ''
      };
      const mockError = {
        receiptEmail: { type: 'REQUIRED_ERROR' },
        hasSomeInputedValues: fieldsError
      };

      const validations = selectPassengersFormValidator()(formData);

      expect(validations).toMatchObject(mockError);
    });

    it('should not return validation errors when email is valid', () => {
      const formData = {
        id1: true,
        id2: false,
        receiptEmail: 'test@test.com'
      };
      const validations = selectPassengersFormValidator()(formData);

      expect(validations).toMatchObject({});
    });
  });
});
