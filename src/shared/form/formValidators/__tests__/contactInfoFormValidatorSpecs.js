import contactInfoFormValidator from 'src/shared/form/formValidators/contactInfoFormValidator';

describe('ContactInfoFormValidator', () => {
  context('email', () => {
    it('should not have error message when email is valid', () => {
      const mockedFormData = { email: 'test@wnco.com' };

      const actualResult = contactInfoFormValidator()(mockedFormData);

      expect(actualResult).to.deep.equal({});
    });

    it('should have error message when email is invalid', () => {
      const mockedFormData = { email: 'invalid email format' };

      const actualResult = contactInfoFormValidator()(mockedFormData);

      expect(actualResult.email.msg).to.be.equal('Enter a valid email address.');
    });
  });

  context('phone number', () => {
    it('should not have error message when phone number is valid', () => {
      const mockedFormData = { sms: '111-111-1111' };

      const actualResult = contactInfoFormValidator()(mockedFormData);

      expect(actualResult).to.deep.equal({});
    });

    context('different kind of error type', () => {
      const invalidFormData = [
        { sms: '1111111111' },
        { sms: '111-1111111' },
        { sms: '111111-1111' },
        { sms: '011-111-1111' },
        { sms: 'aaa-bbb-cccc' }
      ];

      invalidFormData.forEach((formData) => {
        it(`should have error message when phone number is ${formData.sms}`, () => {
          const actualResult = contactInfoFormValidator()(formData);

          expect(actualResult.sms.msg).to.be.equal('Enter a valid numeric phone number.');
        });
      });
    });
  });
});
