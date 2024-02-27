module.exports = {
  paymentMethod: 'ApplePay',
  provider: 'CPD',
  code: '200',
  statusMessage: 'OK',
  providerResponse: {
    code: '2000',
    statusMessage: 'Payment authorized'
  },
  paymentData: {
    cardNumber: '165405019420910',
    expiryMonth: '02',
    expiryYear: '2021',
    lastFourDigits: 'Visa 1234',
    billingInfo: {
      addressLines: ['1 Infinite Loop'],
      administrativeArea: 'CA',
      country: 'United States',
      countryCode: 'us',
      familyName: 'account',
      givenName: 'tester',
      locality: 'Cupertino',
      postalCode: '95014'
    }
  }
};
