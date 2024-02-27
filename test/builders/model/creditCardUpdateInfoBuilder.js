export default class CreditCardUpdateInfoBuilder {
  constructor() {
    this.type = 'VISA';
    this.lastFourDigits = '9999';
    this.nameOnCard = 'Li Rui';
    this.expiryMonth = 5;
    this.expiryYear = 2021;
    this.billingAddress = {
      isoCountryCode: 'US',
      addressLine1: '956 Main St',
      addressLine2: '',
      zipOrPostalCode: '37693',
      city: 'Brooklyn',
      stateProvinceRegion: 'NY',
      isUSAddress: true
    };
    this._infoNeededToUpdate = { savedCreditCardId: '1-J2PASC', cardDescription: 'VISA 9999' };
  }

  build() {
    return {
      type: this.type,
      lastFourDigits: this.lastFourDigits,
      nameOnCard: this.nameOnCard,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      billingAddress: this.billingAddress,
      _infoNeededToUpdate: this._infoNeededToUpdate
    };
  }
}
