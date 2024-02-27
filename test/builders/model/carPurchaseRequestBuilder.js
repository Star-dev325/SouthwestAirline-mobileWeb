function CarPurchaseRequestBuilder() {
  this.buildResponse = function() {
    return {
      confirmationNumber: '04372326US0'
    };
  };

  this.buildRequest = function() {
    return {
      accountNumber: '',
      city: 'Dallas',
      confirmationEmail: 'test@test.com',
      expiration: '2017-04',
      firstName: 'HX',
      isoCountryCode: 'US',
      lastName: 'LIN',
      middleName: '',
      phoneNumber: '222-222-2222',
      purposeOfTravel: '',
      lastFourDigitsOfCreditCard: '1111',
      creditCardType: 'VISA'
    };
  };

  this.buildPurchaseInfo = function() {
    return {
      currencyType: 'total',
      confirmationNumber: '04372326US0',
      driver: {
        firstName: 'HX',
        lastName: 'LIN'
      }
    };
  };
}

module.exports = CarPurchaseRequestBuilder;
