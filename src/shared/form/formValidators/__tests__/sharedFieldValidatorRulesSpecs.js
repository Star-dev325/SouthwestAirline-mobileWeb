import i18n from '@swa-ui/locale';
import { baseFieldRules, basePostal } from 'src/shared/form/constants/baseFormFieldRules';
import {
  contactMethodContentFieldRules,
  dateOfBirth,
  dateOfBirthFieldRules,
  dateOfBirthInput,
  getContactInformationRules,
  getPhoneNumberRule,
  getPhoneNumberRuleWithoutRequired
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

describe('sharedFieldValidatorRules', () => {
  describe('contactMethodContentFieldRules', () => {
    it('should return empty array when international booking and declined notifications are true', () => {
      const results = contactMethodContentFieldRules(true, true);

      expect(results).to.deep.equal({ contactMethodContent: [] });
    });

    describe('should return true for isRequired', () => {
      describe('when international booking', () => {
        it('is true and declined notifications is false', () => {
          const results = contactMethodContentFieldRules(true, false);
          const isRequired = true;

          expect(results).to.deep.equal({ contactMethodContent: [{ isRequired }] });
        });

        it('is false and declined notifications is true', () => {
          const results = contactMethodContentFieldRules(false, true);
          const isRequired = true;

          expect(results).to.deep.equal({ contactMethodContent: [{ isRequired }] });
        });

        it('is false and declined notifications is false', () => {
          const results = contactMethodContentFieldRules(false, false);
          const isRequired = true;

          expect(results).to.deep.equal({ contactMethodContent: [{ isRequired }] });
        });
      });
    });
  });

  describe('dateOfBirthFieldRules', () => {
    it('should return dateOfBirthInput rules in webview', () => {
      const results = dateOfBirthFieldRules(true);

      expect(results).to.deep.equal({ dateOfBirth: dateOfBirthInput });
    });

    it('should return dateOfBirth rules when not in webview', () => {
      const results = dateOfBirthFieldRules(false);

      expect(results).to.deep.equal({ dateOfBirth });
    });
  });

  describe('dateOfBirthFieldRules', () => {
    it('should return dateOfBirthInput rules in webview', () => {
      const results = dateOfBirthFieldRules(true, false);

      expect(results).to.deep.equal({ dateOfBirth: dateOfBirthInput });
    });

    it('should return dateOfBirth rules when not in webview', () => {
      const results = dateOfBirthFieldRules(false, false);

      expect(results).to.deep.equal({ dateOfBirth });
    });
  });

  describe('phone number rules', () => {
    it('should return US phone number length & pattern validation errors', () => {
      const result = getPhoneNumberRuleWithoutRequired(true);

      expect(result[0].msg).to.equal(i18n('SHARED__ERROR_MESSAGES__US_PHONE_NUMBER_LENGTH_ERROR'));
      expect(result[1].msg).to.equal(i18n('SHARED__ERROR_MESSAGES__INVALID_PHONE_NUMBER'));
    });
    it('should return international phone number length validation error', () => {
      const result = getPhoneNumberRuleWithoutRequired(false);

      expect(result[0].msg).to.equal(i18n('SHARED__ERROR_MESSAGES__INTERNATIONAL_PHONE_NUMBER_LENGTH_ERROR'));
      expect(result).to.have.length(1);
    });
  });

  describe('contact information rules', () => {
    const getExpectedResult = (isUS) => ({
      ...baseFieldRules,
      stateProvinceRegion: [{ isRequired: true }, ...(isUS ? basePostal.stateProvince : [])],
      zipOrPostalCode: [{ isRequired: true }, ...(isUS ? basePostal.isUSPostal : basePostal.postalCode)],
      phoneNumber: getPhoneNumberRule(isUS)
    });

    it('should return correct contact information rules for US selection', () => {
      const formData = {
        isoCountryCode: 'US',
        phoneCountryCode: 'US'
      };
      const result = getContactInformationRules(formData);

      expect(result).to.deep.equal(getExpectedResult(true));
    });

    it('should return correct stateProvinceRegion and zipOrPostalCode rules for non US selection', () => {
      const formData = {
        isoCountryCode: 'ME',
        phoneCountryCode: 'ME'
      };
      const result = getContactInformationRules(formData);

      expect(result.stateProvinceRegion).to.deep.equal(getExpectedResult(false).stateProvinceRegion);
      expect(result.zipOrPostalCode).to.deep.equal(getExpectedResult(false).zipOrPostalCode);
    });
  });
});
