const dayjs = require('dayjs');

const SavedCreditCardBuilder = {
  createSavedCreditCard(isPrimary, isExpired) {
    const expirationDate = isExpired ? dayjs().subtract(1, 'year') : dayjs().add(1, 'year');

    return {
      cardDescription: 'Mengqiu card  description',
      creditCardType: 'VISA',
      lastFourDigitsOfCreditCard: '1111',
      isPrimary,
      savedCreditCardId: '1-ENKS4K',
      expirationMonth: expirationDate.get('month') + 1,
      expirationYear: expirationDate.get('year'),
      isExpired,
      cardHolder: {
        firstName: 'Mengqiu',
        lastName: 'PENG'
      },
      billingAddress: {
        addressLine1: 'this is street address',
        addressLine2: 'Atlanta',
        city: 'Atlanta',
        stateProvinceRegion: 'CA',
        zipOrPostalCode: '12345',
        addressType: 'HOME',
        isoCountryCode: 'US',
        companyName: null
      }
    };
  },

  getOneSavedCreditCard() {
    return {
      savedCreditCards: [
        SavedCreditCardBuilder.createSavedCreditCard(true, false)
      ],
      requireSecurityCode: true
    };
  },

  getTwoSavedCreditCards() {
    return {
      savedCreditCards: [
        {
          cardDescription: 'Mengqiu card  description',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1111',
          isPrimary: true,
          savedCreditCardId: '1-ENKS4K',
          expirationMonth: 11,
          expirationYear: 2019,
          cardHolder: {
            firstName: 'Mengqiu',
            lastName: 'PENG'
          },
          billingAddress: {
            addressLine1: 'this is street address',
            addressLine2: 'Atlanta',
            city: 'Atlanta',
            stateProvinceRegion: 'CA',
            zipOrPostalCode: '12345',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        },
        {
          cardDescription: 'hehe card description',
          creditCardType: 'DISCOVER_NETWORK',
          lastFourDigitsOfCreditCard: '6008',
          isPrimary: false,
          savedCreditCardId: '1-ENKS4Q',
          expirationMonth: 9,
          expirationYear: 2019,
          cardHolder: {
            firstName: 'HEHE',
            lastName: 'PENG'
          },
          billingAddress: {
            addressLine1: 'Tian fu street',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'CA',
            zipOrPostalCode: '12345',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        }
      ],
      requireSecurityCode: true
    };
  },

  getChaseInstantCreditCardAndPrimaryCard() {
    return {
      savedCreditCards: [
        {
          cardDescription: 'Mengqiu card  description',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1111',
          isPrimary: true,
          savedCreditCardId: '1-ENKS4K',
          expirationMonth: 11,
          expirationYear: 2019,
          cardHolder: {
            firstName: 'Mengqiu',
            lastName: 'PENG'
          },
          billingAddress: {
            addressLine1: 'this is street address',
            addressLine2: 'Atlanta',
            city: 'Atlanta',
            stateProvinceRegion: 'CA',
            zipOrPostalCode: '12345',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        },
        SavedCreditCardBuilder.getChaseInstantCard()
      ]
    };
  },

  getChaseInstantCard() {
    return {
      cardDescription: 'Rapid Rewards® Visa',
      creditCardType: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
      lastFourDigitsOfCreditCard: '',
      isPrimary: false,
      isInstantCreditRapidRewardsCard: true,
      savedCreditCardId: 'RAPID_REWARDS_VISA_ID',
      expirationMonth: 11,
      expirationYear: 2019,
      cardHolder: {
        firstName: 'Mengqiu',
        lastName: 'PENG'
      },
      billingAddress: {
        addressLine1: 'this is street address',
        addressLine2: 'Atlanta',
        city: 'Atlanta',
        stateProvinceRegion: 'CA',
        zipOrPostalCode: '12345',
        addressType: 'HOME',
        isoCountryCode: 'US',
        companyName: null
      }
    };
  },

  getUpdateCreditCardFormData() {
    return {
      addressLine1: 'this is address line one',
      addressLine2: 'this is address line two',
      city: 'Dallas',
      expiration: '2020-10',
      isoCountryCode: 'US',
      cardDescription: 'VISA 1111',
      creditCardType: 'VISA',
      nameOnCard: 'Ron Hackmann',
      savedCreditCardId: '1-ENKS4K',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '54321',
      intentToStore: false,
      isPrimary: false,
      selectedCardId: ''
    };
  }
};

module.exports = SavedCreditCardBuilder;
