'use strict';

class PromotionDetailsBuilder {
  constructor() {
    this.isRegistered = true;
    this.register = null;
    this.promotionId = '1-ESSOJI';
  }

  withPromotionId(promotionId) {
    this.promotionId = promotionId;

    return this;
  }

  withIsRegistered(isRegistered) {
    this.isRegistered = isRegistered;
    this.register = isRegistered ? null : {
      href: '/v1/mobile-misc/feature/my-account/register-promotion',
      method: 'POST',
      body: {
        promotionId: this.promotionId
      }
    };

    return this;
  }

  build() {
    return {
      promotionDetailsPage: {
        isRegistered: this.isRegistered,
        _links: {
          register: this.register
        },
        promotionId: this.promotionId
      }
    };
  }
}

module.exports = PromotionDetailsBuilder;
