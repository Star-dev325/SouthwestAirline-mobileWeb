class PassportAndEmergencyContactInformationPage {
  constructor() {
    this.emergencyContact = {
      name: 'Helen Wang',
      contactPhone: {
        countryCode: 'US',
        number: '1234567890'
      }
    };

    this.passportInformation = {
      lastFourPassportNumber: '3ABC',
      passportIssuedBy: 'AF',
      nationality: 'AF',
      passportExpirationDate: '2022-03-08',
      countryOfResidence: 'AL'
    };
  }

  withoutEmergencyContact() {
    this.emergencyContact = null;

    return this;
  }

  withoutPassportInformation() {
    this.passportInformation = null;

    return this;
  }

  build() {
    return {
      passportAndEmergencyContactInformationPage: {
        passengerName: 'HELEN WANG',
        doNotWishToProvideAnEmergencyContact: false,
        emergencyContact: this.emergencyContact,
        passportInformation: this.passportInformation,
        _infoNeededToUpdate: { passengerReference: '2' }
      }
    };
  }
}

module.exports = PassportAndEmergencyContactInformationPage;
