const CreditCardApiRequestBuilder = {
  getPostNewCreditCardRequest() {
    return {
      isPrimary: false,
      creditCardPayment: {
        creditCardType: 'VISA',
        cardNumber: '4111111111111111',
        expiration: '2020-10'
      },
      billingContactInfo: {
        firstName: 'li',
        lastName: 'lei',
        address: {
          addressLine1: 'some place',
          addressLine2: '',
          city: 'DAL',
          stateProvinceRegion: '9090',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US'
        },
        phone: {
          number: '13800138000',
          countryCode: '123'
        }
      }
    };
  },

  getUpdateCreditCardRequest() {
    return {
      cardDescription: 'VISA 1111',
      savedCreditCardId: '1-ENKS4K',
      creditCardPayment: {
        creditCardType: 'VISA',
        expiration: '2020-10'
      },
      billingContactInfo: {
        firstName: 'Ron',
        lastName: 'Hackmann',
        address: {
          addressLine1: 'this is address line one',
          addressLine2: 'this is address line two',
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '54321',
          isoCountryCode: 'US'
        }
      }
    };
  }
};

export default CreditCardApiRequestBuilder;
