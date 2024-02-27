const _ = require('lodash');

class EarlyBirdInPathPurchaseRequestBuilder {
  constructor() {
    this._validation = {
      firstName: 'RON',
      lastName: 'JANUSZ'
    };
    this.receiptEmail = 'ATERRIS@EXAMPLE.COM';
    this.products = [{
      earlyBirdProductId: 'QVRMfDIwMTYtMTAtMjV8MzY1MHxST058fEpBTlVTWnx8MTUwMA=='
    }];
    this.billingContactInfo = {
      firstName: 'Li',
      lastName: 'Rui',
      address: {
        addressLine1: '626 Main St.',
        addressLine2: '',
        city: 'Brooklyn',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '22921',
        addressType: 'HOME',
        isoCountryCode: 'US'
      },
      phone: {
        number: '2481234567',
        countryCode: 1
      }
    };
    this.creditCard = {
      creditCardType: 'VISA',
      cardNumber: '4012999999999999',
      expiration: '2035-10',
      amountCents: 1500
    };
  }

  withAmountCents(amountCents) {
    _.set(this.creditCard, 'amountCents', amountCents);

    return this;
  }

  build() {
    return {
      _validation: this._validation,
      receiptEmail: this.receiptEmail,
      products: this.products,
      payments: {
        billingContactInfo: this.billingContactInfo,
        creditCard: this.creditCard
      }
    };
  }
}

module.exports = EarlyBirdInPathPurchaseRequestBuilder;
