import CompanionInformationPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder';

export default class CompanionPassengerPageBuilder {
  constructor() {
    this.response = new CompanionInformationPageBuilder().build();
    this.formData = {
      emailReceiptTo: 'aterris@example.com',
      redressNumber: null,
      knownTravelerNumber: null
    };
  }

  withExtraSeats() {
    this.response.companionDetailsPage.name = 'Companion XS Fang';
    this.response.companionDetailsPage.firstName = 'Companion';
    this.response.companionDetailsPage.middleName = 'XS';
    this.response.companionDetailsPage.lastName = 'Fang';

    return this;
  }

  withMultipleFirstName() {
    this.response.companionDetailsPage.name = 'Randi Lynn middle Fang';
    this.response.companionDetailsPage.firstName = 'Randi Lynn';
    this.response.companionDetailsPage.middleName = 'middle';
    this.response.companionDetailsPage.lastName = 'Fang';

    return this;
  }

  build() {
    return {
      response: this.response,
      formData: this.formData
    };
  }
}
