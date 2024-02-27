class PromoCodesBuilder {
  constructor() {
    this.promoCodesList = [
      {
        promoCode: 'E53QJE8UVM',
        promotion: '20% Off',
        promoType: 'REDEMPTION',
        description: 'This is a promo code',
        termsAndConditions: 'These terms and conditions are mere suggestions.',
        expirationDateString: 'Expiration: 08/28/2022',
        used: false,
        expired: true
      },
      {
        promoCode: 'ABCDEFGHI',
        promotion: '20% Off',
        promoType: 'revenue',
        description: 'This is a promo code',
        termsAndConditions: 'These terms and conditions are mere suggestions.',
        expirationDateString: 'Expiration: 11/01/2022',
        used: false,
        expired: false
      },
      {
        promoCode: 'ABCDEFGHI',
        promotion: '20% Off',
        promoType: 'both',
        description: 'This is a promo code',
        termsAndConditions: 'These terms and conditions are mere suggestions.',
        expirationDateString: 'Expiration: 11/01/2022',
        used: true,
        expired: false
      }
    ];
  }

  build() {
    return this.promoCodesList;
  }
}

module.exports = PromoCodesBuilder;
