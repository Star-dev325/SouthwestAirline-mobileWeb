import {
  generateContactNavigatorLabel,
  omitUselessContactInfoFields,
  getContactMethodMessage,
  isContactMethodMissing
} from 'src/shared/helpers/contactMethodHelper';
import i18n from '@swa-ui/locale';

describe('ContactMethodHelper', () => {
  context('generateContactNavigatorLabel', () => {
    it('should return undefined if contact method is empty', () => {
      const contactMethodInfo = {};
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.be.undefined;
    });

    it('should return correct email content', () => {
      const contactMethodInfo = { contactMethod: 'EMAIL', email: 'a@gmail.com' };
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.equal('Email, a@gmail.com');
    });

    it('should return correct call content for US phone number', () => {
      const contactMethodInfo = { contactMethod: 'CALL', phoneCountryCode: '1', phoneNumber: '223-456-7890' };
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.equal('Call, (1) 223-456-7890');
    });

    it('should return correct text content for US phone number', () => {
      const contactMethodInfo = { contactMethod: 'TEXT', phoneCountryCode: '1', phoneNumber: '223-456-7890' };
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.be.equal('Text, (1) 223-456-7890');
    });

    it('should return correct text content for international phone number', () => {
      const contactMethodInfo = { contactMethod: 'TEXT', phoneCountryCode: '399', phoneNumber: '1233211234567' };
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.equal('Text, (399) 1233211234567');
    });

    it('should return undefined when user decline the notifications', () => {
      const contactMethodInfo = {
        contactMethod: '',
        phoneCountryCode: '',
        phoneNumber: '',
        declineNotifications: true
      };
      const result = generateContactNavigatorLabel(contactMethodInfo);

      expect(result).to.be.undefined;
    });
  });

  context('getContactMethodMessage', () => {
    it('should return true when give `TEXT` contact method', () => {
      expect(getContactMethodMessage('TEXT')).to.equal(i18n('SHARED__CONTACT_METHOD_HELPER__TEXT'));
    });

    it('should return false when give `EMAIL` contact method', () => {
      expect(getContactMethodMessage('EMAIL')).to.equal(i18n('SHARED__CONTACT_METHOD_HELPER__EMAIL'));
    });

    it('should return false when give `CALL` contact method', () => {
      expect(getContactMethodMessage('CALL')).to.equal(i18n('SHARED__CONTACT_METHOD_HELPER__CALL'));
    });
  });

  context('omitUselessContactInfoFields', () => {
    let originalContactMethodInfo;

    beforeEach(() => {
      originalContactMethodInfo = {
        email: 'a@gmail.com',
        phoneCountryCode: '1',
        phoneNumber: '222-222-22222',
        declineNotifications: false,
        preferredLanguage: 'EN',
        saveContactMethod: true
      };
    });

    it('should omit mail info when contact method is CALL', () => {
      originalContactMethodInfo.contactMethod = 'CALL';

      expect(omitUselessContactInfoFields(originalContactMethodInfo)).to.deep.equal({
        contactMethod: 'CALL',
        phoneCountryCode: '1',
        phoneNumber: '222-222-22222',
        declineNotifications: false,
        preferredLanguage: 'EN',
        saveContactMethod: true
      });
    });

    it('should omit phone info when contact method is EMAIL', () => {
      originalContactMethodInfo.contactMethod = 'EMAIL';

      expect(omitUselessContactInfoFields(originalContactMethodInfo)).to.deep.equal({
        contactMethod: 'EMAIL',
        email: 'a@gmail.com',
        declineNotifications: false,
        preferredLanguage: 'EN',
        saveContactMethod: true
      });
    });

    it('should only provide declineNotifications when declineNotifications is true', () => {
      originalContactMethodInfo.declineNotifications = true;

      expect(omitUselessContactInfoFields(originalContactMethodInfo)).to.deep.equal({
        declineNotifications: true,
        isNotificationsEnabled: false
      });
    });
  });

  context('isContactMethodMissing', () => {
    it('should return true if contactMethod missing', () => {
      expect(isContactMethodMissing(null, '', '', '')).to.be.true;
    });

    it('should return true if contactMethod is Email but email missing', () => {
      expect(isContactMethodMissing('EMAIL', '', '', '')).to.be.true;
    });

    it('should return true if contactMethod is TEXT but countryCode missing', () => {
      expect(isContactMethodMissing('TEXT', '', '214-555-1212', '')).to.be.true;
    });

    it('should return true if contactMethod is CALL but number missing', () => {
      expect(isContactMethodMissing('CALL', '', '', '1')).to.be.true;
    });

    it('should return false if contactMethod is not missing', () => {
      expect(isContactMethodMissing('TEXT', '', '214-555-1212', '2')).to.be.false;
    });
  });
});
