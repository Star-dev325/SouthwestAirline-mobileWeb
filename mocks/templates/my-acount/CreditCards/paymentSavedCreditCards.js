module.exports = {
  paymentSavedCreditCardsPage: {
    primaryCard: {
      savedCreditCardId: '1-ENKS4K',
      type: 'VISA',
      name: 'VISA 9999',
      lastFourDigits: '9999',
      isExpired: false,
      cvvVerified: false,
      _links: {
        view: {
          href: '/v1/mobile-misc/page/air-booking/payment-options/1-ENKS4K',
          method: 'GET'
        }
      }
    },
    otherCards: [
      {
        savedCreditCardId: '1-ENKS5K',
        type: 'VISA',
        name: 'New Card',
        lastFourDigits: '9999',
        isExpired: false,
        cvvVerified: false,
        _links: {
          view: {
            href: '/v1/mobile-misc/page/air-booking/payment-options/1-ENKS5K',
            method: 'GET'
          }
        }
      },
      {
        savedCreditCardId: '1-ENKS6K',
        type: 'VISA',
        name: 'New Card',
        lastFourDigits: '9999',
        isExpired: false,
        cvvVerified: true,
        _links: {
          view: {
            href: '/v1/mobile-misc/page/air-booking/payment-options/1-ENKS6K',
            method: 'GET'
          }
        }
      }
    ]
  }
};
