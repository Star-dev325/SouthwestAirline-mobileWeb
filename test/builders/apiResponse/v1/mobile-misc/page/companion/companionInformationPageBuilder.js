class CompanionInformationPageBuilder {
  constructor() {
    this.response = {
      companionDetailsPage: {
        name: 'Companion Fang',
        firstName: 'Companion',
        middleName: '',
        lastName: 'Fang',
        dateOfBirth: '1995-02-05',
        gender: 'F',
        suffix: null,
        contactMethod: 'CALL_ME',
        contactPhone: {
          countryCode: '1',
          number: '6549873215'
        },
        contactEmail: null,
        emailReceiptTo: 'aterris@example.com',
        redressNumber: null,
        knownTravelerNumber: null
      }
    };
  }

  withInternationalCallMe() {
    this.response.companionDetailsPage.contactMethod = 'CALL_ME';
    this.response.companionDetailsPage.contactPhone = {
      countryCode: '2',
      number: '6549873215'
    };
    this.response.companionDetailsPage.contactEmail = null;

    return this;
  }

  withOutContactMethod() {
    this.response.companionDetailsPage.contactMethod = null;
    this.response.companionDetailsPage.contactPhone = null;
    this.response.companionDetailsPage.contactEmail = null;

    return this;
  }

  withTextMe() {
    this.response.companionDetailsPage.contactMethod = 'TEXT_ME';
    this.response.companionDetailsPage.contactPhone = {
      number: '1234567890',
      countryCode: '1'
    };
    this.response.companionDetailsPage.contactEmail = null;

    return this;
  }

  withEmailMe() {
    this.response.companionDetailsPage.contactMethod = 'EMAIL_ME';
    this.response.companionDetailsPage.contactPhone = null;
    this.response.companionDetailsPage.contactEmail = '123@123.com';

    return this;
  }

  withSuffix(suffix) {
    this.response.companionDetailsPage.suffix = suffix;

    return this;
  }

  build() {
    return this.response;
  }
}

module.exports = CompanionInformationPageBuilder;
