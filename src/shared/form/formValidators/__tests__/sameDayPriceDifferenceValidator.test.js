import validator from 'src/shared/form/formValidators/sameDayPriceDifferenceValidator';

describe('sameDayPriceDifferenceValidator', () => {
  describe('recipientEmail', () => {
    it('should validate with valid recipientEmail', () => {
      const formData = {
        recipientEmail: 'Tesla@gmail.com'
      };
      const validatorResult = validator({ showEmailReceiptTo: true })(formData);

      expect(validatorResult).toMatchObject({});
    });

    it('should validate with invalid recipientEmail', () => {
      const formData = {
        recipientEmail: 'Tesla'
      };
      const validatorResult = validator({ showEmailReceiptTo: true })(formData);

      expect(validatorResult).toMatchObject({
        recipientEmail: {
          type: 'FIELD_ERROR_MESSAGE',
          msg: 'SHARED__ERROR_MESSAGES__INVALID_EMAIL'
        },
        hasSomeFieldsNeedToCorrect: {
          type: 'ERROR_HEADER',
          msg: 'Please correct the highlighted errors.'
        }
      });
    });

    it('should invalidate with no recipientEmail', () => {
      const formData = {
        recipientEmail: ''
      };
      const validatorResult = validator({ showEmailReceiptTo: true })(formData);

      expect(validatorResult).toMatchObject({
        recipientEmail: {
          type: 'REQUIRED_ERROR'
        }
      });
    });

    it('should not validate when email field is hidden', () => {
      const formData = {
        recipientEmail: ''
      };
      const validatorResult = validator({ showEmailReceiptTo: false })(formData);

      expect(validatorResult).toMatchObject({});
    });
  });

  describe('render paymentInfo', () => {
    it('should validate the formdata paymentIno', () => {
      const formData = {
        paymentInfo: {
          selectedCardId: '1-23444',
          securityCode: '123'
        }
      };
      const validatorResult = validator({ showEmailReceiptTo: true })(formData);

      expect(validatorResult).toMatchObject({});
    });

    it('should not pass form validation when payment info invalid', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: null
      };
      const validatorResult = validator({ showEmailReceiptTo: true })(formData);

      expect(validatorResult).toMatchObject({
        hasSomeInputedValues: {
          msg: "Please correct the highlighted errors.",
          type: 'ERROR_HEADER'
        },
        paymentInfo: {
          type: 'REQUIRED_ERROR'
        }
      });
    });
  });
});
