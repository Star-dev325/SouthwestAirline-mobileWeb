import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';
import CompanionInformationPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';

const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

describe('contactMethodPageHelper', () => {
  context('hasSavedContactMethod', () => {
    it('should return false when contactMethod is CALL_ME and isInternationalBooking is true', () => {
      const result = contactMethodPageHelper.hasSavedContactMethod('CALL_ME', true);

      expect(result).to.be.false;
    });
    it('should return true when contactMethod is not empty and contactMethod is not CALL_ME or isInternationalBooking is false', () => {
      const result = contactMethodPageHelper.hasSavedContactMethod('TEXT_ME', true);

      expect(result).to.be.true;
    });
    it('should return false when contactMethod is empty', () => {
      const result = contactMethodPageHelper.hasSavedContactMethod('TEXT_ME', true);

      expect(result).to.be.true;
    });
  });

  context('_addHyphenForUSPhoneNumber', () => {
    it('should return phoneNumber with "-" split if countryCode is 1', () => {
      const result = contactMethodPageHelper._addHyphenForUSPhoneNumber('1', '1234567890');

      expect(result).to.be.equal('123-456-7890');
    });
    it('should return phoneNumber if countryCode is not 1', () => {
      const result = contactMethodPageHelper._addHyphenForUSPhoneNumber('2', '1234567890');

      expect(result).to.be.equal('1234567890');
    });
  });

  context('isInternationalBookingHelper', () => {
    it('should return internationalBooking from action', () => {
      const action = {
        response: {
          flightPricingPage: {
            _meta: {
              internationalBooking: false
            }
          }
        }
      };
      const result = contactMethodPageHelper.isInternationalBookingHelper(action);

      expect(result).to.be.equal(false);
    });
  });

  context('prefillPassengerInfoHelper', () => {
    it('should return {} if action contactMethod is empty', () => {
      const isInternationalBooking = false;
      const response = new CompanionInformationPageBuilder().withOutContactMethod().build();

      const result = contactMethodPageHelper.prefillPassengerInfoHelper(
        response.companionDetailsPage,
        isInternationalBooking
      );

      expect(result).to.be.deep.equal({});
    });

    it('should return {} if isInternationalBooking is true and contactMethod is CALL', () => {
      const isInternationalBooking = true;
      const response = new CompanionInformationPageBuilder().build();

      const result = contactMethodPageHelper.prefillPassengerInfoHelper(
        response.companionDetailsPage,
        isInternationalBooking
      );

      expect(result).to.be.deep.equal({});
    });

    it('should return transformed passenger contact info when user booking a international flight and contact method is TEXT', () => {
      const isInternationalBooking = true;
      const response = new CompanionInformationPageBuilder().withTextMe().build();

      const result = contactMethodPageHelper.prefillPassengerInfoHelper(
        response.companionDetailsPage,
        isInternationalBooking
      );

      expect(result).to.be.deep.equal({
        contactMethod: 'TEXT',
        email: null,
        phoneNumber: '123-456-7890',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: false,
        isNotificationsEnabled: true
      });
    });

    it('should return transform correct contact info when user has email and book a domestic flight', () => {
      const isInternationalBooking = false;
      const response = new CompanionInformationPageBuilder().withEmailMe().build();

      const result = contactMethodPageHelper.prefillPassengerInfoHelper(
        response.companionDetailsPage,
        isInternationalBooking
      );

      expect(result).to.be.deep.equal({
        contactMethod: 'EMAIL',
        email: '123@123.com',
        phoneNumber: undefined,
        phoneCountryCode: undefined,
        preferredLanguage: 'EN',
        declineNotifications: false,
        isNotificationsEnabled: true
      });
    });
  });

  describe('convertContactTravelMangerInfo', () => {
    it('should return empty when info passed with declineNotification enabled', () => {
      const result = contactMethodPageHelper.convertContactTravelMangerInfo({ declineNotifications: true });

      expect(result).to.be.deep.equal({});
    });

    it('should return info when contactPhone exist', () => {
      const result = contactMethodPageHelper.convertContactTravelMangerInfo({
        contactMethod: contactMethodKeys.CALL_ME,
        contactPhone: {
          number: '123-456-8978',
          countryCode: '1'
        }
      });

      expect(result).to.be.deep.equal({
        contactMethod: contactMethodKeys.CALL_ME,
        contactPhone: {
          number: '123-456-8978',
          countryCode: '1'
        }
      });
    });

    it('should return info when contactEmail exist', () => {
      const result = contactMethodPageHelper.convertContactTravelMangerInfo({
        contactMethod: contactMethodKeys.EMAIL_ME,
        contactEmail: 'whatever@email.com'
      });

      expect(result).to.be.deep.equal({
        contactMethod: contactMethodKeys.EMAIL_ME,
        contactEmail: 'whatever@email.com'
      });
    });

    it('should return contactPhone when phone number exist', () => {
      const result = contactMethodPageHelper.convertContactTravelMangerInfo({
        contactMethod: contactMethodKeys.CALL_ME,
        phoneNumber: '123-456-8978',
        phoneCountryCode: '1'
      });

      expect(result).to.be.deep.equal({
        contactMethod: contactMethodKeys.CALL_ME,
        contactPhone: {
          number: '123-456-8978',
          countryCode: '1'
        }
      });
    });

    it('should return contactEmail when email exist', () => {
      const result = contactMethodPageHelper.convertContactTravelMangerInfo({
        contactMethod: contactMethodKeys.EMAIL_ME,
        email: 'whatever@email.com'
      });

      expect(result).to.be.deep.equal({
        contactMethod: contactMethodKeys.EMAIL_ME,
        contactEmail: 'whatever@email.com'
      });
    });
  });
});
