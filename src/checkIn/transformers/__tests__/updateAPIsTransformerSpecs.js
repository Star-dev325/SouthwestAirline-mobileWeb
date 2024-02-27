import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';

const {
  transformLinksToTravelDocuments,
  transformToPassportInfoRequest,
  transformToAdditionalInfoRequest,
  transformPrefillAPISDataToCheckInAPISFormData,
  toPhoneFormData,
  toPhoneUpdateRequest,
  transformDestinationFormData
} = UpdateAPIsTransformers;

describe('updateAPIsTransformer', () => {
  let mockRequestData;

  beforeEach(() => {
    mockRequestData = {
      href: 'https://url.com',
      method: 'POST',
      body: {
        recordLocator: 'ABD234',
        travelerIdentifier: 'travelerId01'
      }
    };
  });

  context('transformLinksToTravelDocuments', () => {
    it('should transform links to travelDocuments correctly ', () => {
      const missingPassport = {
        href: 'url',
        method: 'POST',
        body: {
          firstName: 'Haha',
          lastName: 'Wang',
          fullName: 'Haha Wang CEO'
        },
        meta: { missingDocuments: ['NATIONALITY'] }
      };
      const links = { travelDocuments: [missingPassport] };
      const missingTravelDocuments = transformLinksToTravelDocuments(links);

      expect(missingTravelDocuments).to.deep.equal([
        {
          requestData: {
            href: 'url',
            method: 'POST',
            body: {
              firstName: 'Haha',
              lastName: 'Wang',
              fullName: 'Haha Wang CEO'
            }
          },
          destinationConfig: undefined,
          missingDocuments: ['NATIONALITY'],
          travelerName: 'Haha Wang CEO'
        }
      ]);
    });

    it('should transform links to travelDocuments correctly with destinationConfig', () => {
      const missingPassport = {
        href: 'url',
        method: 'POST',
        body: {
          firstName: 'Haha',
          lastName: 'Wang',
          fullName: 'Haha Wang CEO'
        },
        meta: {
          missingDocuments: ['NATIONALITY'],
          destinationConfig: { title: 'Travel Destination' }
        }
      };
      const links = { travelDocuments: [missingPassport] };
      const missingTravelDocuments = transformLinksToTravelDocuments(links);

      expect(missingTravelDocuments).to.deep.equal([
        {
          requestData: {
            href: 'url',
            method: 'POST',
            body: {
              firstName: 'Haha',
              lastName: 'Wang',
              fullName: 'Haha Wang CEO'
            }
          },
          destinationConfig: {
            title: 'Travel Destination'
          },
          missingDocuments: ['NATIONALITY'],
          travelerName: 'Haha Wang CEO'
        }
      ]);
    });

    it('should return empty array when check in view reservation response is undefined', () => {
      const missingTravelDocuments = transformLinksToTravelDocuments(undefined);

      expect(missingTravelDocuments).to.deep.equal([]);
    });

    it('should return empty array when travelDocuments is null', () => {
      const links = { travelDocuments: null };
      const missingTravelDocuments = transformLinksToTravelDocuments(links);

      expect(missingTravelDocuments).to.deep.equal([]);
    });
  });

  context('transformToPassportInfoRequest', () => {
    let mockFormData;
    const mockCheckInSessionToken = 'checkInSessionToken';
    const mockSuppressEmergencyContact = false;

    beforeEach(() => {
      mockFormData = {
        countryOfResidence: 'AG',
        emergencyContactCountryCode: 'US',
        emergencyContactCountryDialingCode: '1',
        emergencyContactName: 'test',
        emergencyContactPhoneNumber: '111-111-1111',
        emergencyContactSaveForAllPassengers: 'true',
        doNotWishToProvideAnEmergencyContact: 'true',
        nationality: 'AO',
        passportExpirationDate: '2023-06-23',
        passportIssuedBy: 'AS',
        passportNumber: '33333333333333'
      };
    });

    it('should transform form data to request parameter correctly when mockSuppressEmergencyContact is true', () => {
      mockFormData.doNotWishToProvideAnEmergencyContact = 'true';
      const mockSuppressEmergencyContact = true;

      expect(
        transformToPassportInfoRequest(
          mockRequestData,
          mockFormData,
          mockCheckInSessionToken,
          mockSuppressEmergencyContact
        )
      ).toMatchSnapshot();
    });

    it('should transform form data to request parameter correctly when doNotWishToProvideAnEmergencyContact is true', () => {
      mockFormData.doNotWishToProvideAnEmergencyContact = 'true';
      expect(
        transformToPassportInfoRequest(
          mockRequestData,
          mockFormData,
          mockCheckInSessionToken,
          mockSuppressEmergencyContact
        )
      ).to.deep.equal({
        href: 'https://url.com',
        method: 'POST',
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'ABD234',
            travelerIdentifier: 'travelerId01',
            nationality: {
              passportInformation: {
                passportNumber: '33333333333333',
                passportIssuedBy: 'AS',
                nationality: 'AO',
                passportExpirationDate: '2023-06-23',
                countryOfResidence: 'AG'
              }
            },
            emergencyContact: {
              doNotWishToProvideAnEmergencyContact: 'true',
              emergencyContactInformation: null
            },
            checkInSessionToken: 'checkInSessionToken'
          }
        }
      });
    });

    it('should transform form data to request parameter correctly', () => {
      mockFormData.doNotWishToProvideAnEmergencyContact = 'false';

      expect(
        transformToPassportInfoRequest(
          mockRequestData,
          mockFormData,
          mockCheckInSessionToken,
          mockSuppressEmergencyContact
        )
      ).to.deep.equal({
        href: 'https://url.com',
        method: 'POST',
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'ABD234',
            travelerIdentifier: 'travelerId01',
            nationality: {
              passportInformation: {
                passportNumber: '33333333333333',
                passportIssuedBy: 'AS',
                nationality: 'AO',
                passportExpirationDate: '2023-06-23',
                countryOfResidence: 'AG'
              }
            },
            emergencyContact: {
              doNotWishToProvideAnEmergencyContact: 'false',
              emergencyContactInformation: {
                name: 'test',
                contactPhone: {
                  countryCode: 'US',
                  number: '111-111-1111'
                }
              }
            },
            checkInSessionToken: 'checkInSessionToken'
          }
        }
      });
    });
  });

  context('transformToAdditionalInfoRequest', () => {
    it('should transform permanentResidentCard form data to request parameter correctly', () => {
      const permanentResidentCard = {
        expiration: '2018-12-18',
        issuedBy: 'CN',
        number: '123-321-456-654',
        type: 'type'
      };
      const mockFormData = { permanentResidentCard };

      expect(transformToAdditionalInfoRequest(mockRequestData, mockFormData, 'token')).to.deep.equal({
        href: 'https://url.com',
        method: 'POST',
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'ABD234',
            checkInSessionToken: 'token',
            travelerIdentifier: 'travelerId01',
            permanentResidentCard: {
              expiration: '2018-12-18',
              issuedBy: 'CN',
              number: '123321456654',
              type: 'type'
            }
          }
        }
      });
    });

    it('should return visa data when visa data exists', () => {
      const visa = {
        issuedBy: 'DZ',
        expiration: '2017-09-25',
        country: 'AL',
        number: '123122132132232'
      };
      const mockFormData = { visa };

      expect(transformToAdditionalInfoRequest(mockRequestData, mockFormData, 'token')).to.deep.equal({
        href: 'https://url.com',
        method: 'POST',
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'ABD234',
            travelerIdentifier: 'travelerId01',
            checkInSessionToken: 'token',
            visa: {
              issuedBy: 'DZ',
              expiration: '2017-09-25',
              country: 'AL',
              number: '123122132132232'
            }
          }
        }
      });
    });

    it('should transform destination form data to request parameter correctly', () => {
      const destination = {
        addressLine: 'gaoxin',
        city: 'cd',
        isoCountryCode: 'CN',
        stateProvinceRegion: 'SC',
        zipOrPostalCode: '123'
      };
      const mockFormData = { destination };

      expect(transformToAdditionalInfoRequest(mockRequestData, mockFormData, 'token')).to.deep.equal({
        href: 'https://url.com',
        method: 'POST',
        body: {
          travelDocumentsUpdate: {
            recordLocator: 'ABD234',
            travelerIdentifier: 'travelerId01',
            checkInSessionToken: 'token',
            destination: {
              streetAddress: 'gaoxin',
              city: 'cd',
              country: 'CN',
              stateProvinceRegion: 'SC',
              zipOrPostalCode: '123'
            }
          }
        }
      });
    });
  });

  context('transformPrefillDataToFormData', () => {
    let givenPassengerPrefillData;

    beforeEach(() => {
      givenPassengerPrefillData = {
        travelerIdentifier: 'TRAVELERID2',
        firstName: 'Ron',
        lastName: 'Hackman',
        passport: null,
        emergencyContact: null
      };
    });

    it('should transform passport prefill data into passport form data', () => {
      const givenPassport = {
        lastFourPassportNumber: '1234',
        passportIssuedBy: 'US',
        nationality: 'US',
        passportExpirationDate: '2035-11-10',
        countryOfResidence: 'US'
      };

      givenPassengerPrefillData.passport = givenPassport;

      const result = transformPrefillAPISDataToCheckInAPISFormData([givenPassengerPrefillData]);

      expect(result[givenPassengerPrefillData.travelerIdentifier].passportPageFormData).to.be.deep.equal({
        passportNumber: givenPassport.lastFourPassportNumber,
        passportIssuedBy: givenPassport.passportIssuedBy,
        nationality: givenPassport.nationality,
        passportExpirationDate: givenPassport.passportExpirationDate,
        countryOfResidence: givenPassport.countryOfResidence,
        doNotWishToProvideAnEmergencyContact: undefined,
        emergencyContactName: undefined,
        emergencyContactCountryCode: undefined,
        emergencyContactCountryDialingCode: undefined,
        emergencyContactPhoneNumber: undefined
      });
    });

    it('should transform emergency contact prefill data into passport form data', () => {
      const givenEmergencyContact = {
        doNotWishToProvideAnEmergencyContact: false,
        name: 'Amber Awesome',
        contactPhone: {
          countryCode: 'AF',
          number: '259985555512'
        }
      };

      givenPassengerPrefillData.emergencyContact = givenEmergencyContact;

      const result = transformPrefillAPISDataToCheckInAPISFormData([givenPassengerPrefillData]);

      expect(result[givenPassengerPrefillData.travelerIdentifier].passportPageFormData).to.be.deep.equal({
        passportNumber: undefined,
        passportIssuedBy: undefined,
        nationality: undefined,
        passportExpirationDate: undefined,
        countryOfResidence: undefined,
        doNotWishToProvideAnEmergencyContact: givenEmergencyContact.doNotWishToProvideAnEmergencyContact,
        emergencyContactName: givenEmergencyContact.name,
        emergencyContactCountryCode: givenEmergencyContact.contactPhone.countryCode,
        emergencyContactCountryDialingCode: 93,
        emergencyContactPhoneNumber: givenEmergencyContact.contactPhone.number
      });
    });

    it('should transform contact tracing prefill data into form data', () => {
      givenPassengerPrefillData.destination = {
        streetAddress: '123 Fake St',
        zipOrPostalCode: '96854',
        city: 'BROOKLYN',
        stateProvinceRegion: 'AL',
        country: 'US',
        contactPhone1: {
          countryCode: '1',
          number: '3215551234'
        },
        contactEmail: 'john.doe@wnco.com'
      };

      const result = transformPrefillAPISDataToCheckInAPISFormData([givenPassengerPrefillData]);
      const formData = result[givenPassengerPrefillData.travelerIdentifier].additionalPassportPageFormData.destination;

      expect(formData).to.be.deep.equal({
        addressLine: '123 Fake St',
        city: 'BROOKLYN',
        contactEmail: 'john.doe@wnco.com',
        contactPhone1CountryCode: '1',
        contactPhone1Number: '321-555-1234',
        contactPhone2CountryCode: '1',
        contactPhone2Number: '',
        isoCountryCode: 'US',
        stateProvinceRegion: 'AL',
        zipOrPostalCode: '96854'
      });
    });
  });

  context('toPhoneFormData', () => {
    it('should transform USA phone numbers', () => {
      const destination = {
        contactPhone1: {
          number: '3115552310',
          country: '1'
        },
        contactPhone2: {
          number: '3115552222'
        }
      };

      expect(toPhoneFormData(destination, 'contactPhone1')).to.deep.equal({
        contactPhone1CountryCode: '1',
        contactPhone1Number: '311-555-2310'
      });
      expect(toPhoneFormData(destination, 'contactPhone2')).to.deep.equal({
        contactPhone2CountryCode: '1',
        contactPhone2Number: '311-555-2222'
      });
    });

    it('should transform international phone number', () => {
      const destination = {
        contactPhone1: {
          number: '3115552310',
          country: '42'
        }
      };

      expect(toPhoneFormData(destination, 'contactPhone1')).to.deep.equal({
        contactPhone1CountryCode: '1',
        contactPhone1Number: '311-555-2310'
      });
    });
  });

  context('toPhoneUpdateRequest', () => {
    it('should transform USA phone numbers', () => {
      const formData = {
        contactPhone1Number: '311-555-2310',
        contactPhone1CountryCode: '1',
        contactPhone2Number: '3115552222__',
        contactPhone2CountryCode: ''
      };

      expect(toPhoneUpdateRequest(formData, 'contactPhone1')).to.deep.equal({
        countryCode: '1',
        number: '3115552310'
      });
      expect(toPhoneUpdateRequest(formData, 'contactPhone2')).to.deep.equal({
        countryCode: '1',
        number: '3115552222'
      });
    });

    it('should return null when number is not provided', () => {
      const formData = {
        contactPhone1CountryCode: '1'
      };

      expect(toPhoneUpdateRequest(formData, 'contactPhone1')).to.equal(null);
      expect(toPhoneUpdateRequest(formData, 'contactPhone2')).to.equal(null);
    });
  });

  context('transformDestinationFormData', () => {
    it('should destination with contact-tracing', () => {
      const formData = {
        contactEmail: 'example@wncom.com',
        contactPhone1Number: '3115552310',
        contactPhone1CountryCode: '1',
        contactPhone2Number: '3115552222',
        contactPhone2CountryCode: '1',
        addressLine: '123 Fake Street',
        city: 'Beverly Hills',
        isoCountryCode: 'US',
        stateProvinceRegion: 'CA',
        zipOrPostalCode: '90210'
      };

      expect(transformDestinationFormData(formData, 'contactPhone1')).to.deep.equal({
        contactEmail: 'example@wncom.com',
        city: 'Beverly Hills',
        contactPhone1: {
          countryCode: '1',
          number: '3115552310'
        },
        contactPhone2: {
          countryCode: '1',
          number: '3115552222'
        },
        country: 'US',
        stateProvinceRegion: 'CA',
        streetAddress: '123 Fake Street',
        zipOrPostalCode: '90210'
      });
    });
  });
});
