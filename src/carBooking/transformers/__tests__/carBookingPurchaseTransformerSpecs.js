import {
  transformToDriverInfo,
  transformToContactInfo
} from 'src/carBooking/transformers/carBookingPurchaseTransformer';

describe('CarBookingPurchaseTransformer', () => {
  context('transformToDriverInfo', () => {
    it('should transform the fetch account info api response to driverInfo', () => {
      const apiResponse = {
        customerInfo: {
          name: {
            firstName: 'amber',
            lastName: 'awesome',
            middleName: 'tom'
          },
          accountNumber: '10000',
          birthDate: '1992-01-01',
          gender: 'male'
        },
        rapidRewardsDetails: {
          isEnrolledInRapidRewards: true
        }
      };

      expect(transformToDriverInfo(apiResponse)).to.deep.equal({
        firstName: 'Amber',
        lastName: 'Awesome',
        middleName: 'Tom',
        birthDate: '1992-01-01',
        gender: 'male',
        accountNumber: '10000'
      });
    });

    it('should remain the accountNumber even for a NRR account', () => {
      const apiResponse = {
        customerInfo: {
          name: {
            firstName: 'amber',
            lastName: 'awesome',
            middleName: 'tom'
          },
          accountNumber: '10000',
          birthDate: '1992-01-01',
          gender: 'male'
        },
        rapidRewardsDetails: {
          isEnrolledInRapidRewards: false
        }
      };

      expect(transformToDriverInfo(apiResponse)).to.deep.equal({
        firstName: 'Amber',
        lastName: 'Awesome',
        middleName: 'Tom',
        birthDate: '1992-01-01',
        gender: 'male',
        accountNumber: '10000'
      });
    });
  });

  context('transformToContactInfo', () => {
    it('should get formatted phoneNumber when isoCountryCode is US', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('US', '1234567890', '1');

      expect(transformToContactInfo(apiResponse)).to.deep.equal({
        confirmationEmail: 'test@test.com',
        purposeOfTravel: 'Personal',
        phoneNumber: '123-456-7890',
        isoCountryCode: 'US',
        receiptEmail: 'test@test.com',
        addressLine1: 'address 1',
        addressLine2: 'address 2',
        stateProvinceRegion: 'state',
        zipOrPostalCode: '61000',
        city: 'Chicago',
        driverCountryCode: '1',
        driverIsoCountryCode: 'US',
        driverPhoneNumber: '123-456-7890'
      });
    });

    it('should get unformatted phoneNumber when isoCountryCode is not US', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('ZW', '123123312', '263');

      expect(transformToContactInfo(apiResponse)).to.deep.equal({
        confirmationEmail: 'test@test.com',
        purposeOfTravel: 'Personal',
        phoneNumber: '123123312',
        isoCountryCode: 'ZW',
        receiptEmail: 'test@test.com',
        addressLine1: 'address 1',
        addressLine2: 'address 2',
        stateProvinceRegion: 'state',
        zipOrPostalCode: '61000',
        city: 'Chicago',
        driverCountryCode: '263',
        driverIsoCountryCode: 'ZW',
        driverPhoneNumber: '123123312'
      });
    });

    it('should provide driver phone number, driver country code and driver iso country code', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('NOT APPLICABLE', '123456789', '389');

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.driverIsoCountryCode).to.equal('MK');
      expect(transformedResult.driverCountryCode).to.equal('389');
      expect(transformedResult.driverPhoneNumber).to.equal('123456789');
    });

    it('should set country code to US if it is undefined', () => {
      const apiResponse = buildApiResponseWithISOCountryCode(undefined);

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.isoCountryCode).to.equal('US');
    });

    it('should set driver country code and iso country code to US if it is undefined', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('', '', undefined);

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.driverIsoCountryCode).to.equal('US');
      expect(transformedResult.driverCountryCode).to.equal('1');
    });

    it('should set driver country code and iso country code to US if it is empty', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('', '', '');

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.driverIsoCountryCode).to.equal('US');
      expect(transformedResult.driverCountryCode).to.equal('1');
    });

    it('should format driver phone number if it is US', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('', '3214332211', '1');

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.driverPhoneNumber).to.equal('321-433-2211');
    });

    it('should not format driver phone number if it is not US', () => {
      const apiResponse = buildApiResponseWithISOCountryCode('', '3213123213', '398');

      const transformedResult = transformToContactInfo(apiResponse);

      expect(transformedResult.driverPhoneNumber).to.equal('3213123213');
    });
  });

  function buildApiResponseWithISOCountryCode(isoCountryCode, number = '1234567890', countryCode = '1') {
    return {
      contactInfo: {
        emailAddress: 'test@test.com',
        purposeOfTravel: 'Personal',
        phone: {
          countryCode,
          number,
          phoneType: 'Home'
        },
        address: {
          isoCountryCode,
          addressLine1: 'address 1',
          addressLine2: 'address 2',
          stateProvinceRegion: 'state',
          zipOrPostalCode: '61000',
          city: 'Chicago'
        }
      },
      customerInfo: {
        name: {
          firstName: 'Amber',
          lastName: 'Awesome'
        },
        accountNumber: '10000'
      }
    };
  }
});
