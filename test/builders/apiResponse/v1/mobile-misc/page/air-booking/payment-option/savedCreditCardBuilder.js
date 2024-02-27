const template = {
  updateSavedCreditCardPage: {
    type: 'MASTER_CARD', lastFourDigits: '4444', nameOnCard: 'helen wang', expiryMonth: 2, expiryYear: 2020,
    billingAddress: {
      isoCountryCode: 'AS', addressLine1: 'dsfassd', addressLine2: 'fa', zipOrPostalCode: '23123',
      city: 'dsfa', stateProvinceRegion: 'dsafs', isUSAddress: false
    }, _infoNeededToUpdate: { savedCreditCardId: '1-GZVTFI', cardDescription: 'master 4445' }
  }
};

class SavedCreditCardBuilder {
  constructor() {
    this.info = template;
  }

  build() {
    return this.info;
  }
}

module.exports = SavedCreditCardBuilder;