'use strict';
const PromotionBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/my-accounts/promotionBuilder');

class UpcomingTripsPromotionsBuilder {
  constructor() {
    this.promotions = [];
  }

  defaultPromotions() {
    return [
      new PromotionBuilder()
        .withId('16berr6')
        .withTitle('Double Points on Limited-Time Fares')
        .withDescription('Double Points on Limited-Time Fares')
        .withUsageDates(
          '2013-12-22T18:00:00.000',
          '2015-10-30T19:00:00.000'
        )
        .build()
      ,

      new PromotionBuilder()
        .withId('17b654x')
        .withTitle('Test Promo')
        .withDescription('for test')
        .withRegister(false, '600597056')
        .build()
      ,

      new PromotionBuilder()
        .withId('171231x')
        .withTitle('Test Promo 2')
        .withDescription('for test 2')
        .withRegister(false, '600597056')
        .build()
    ];
  }

  withPromotion(promotion) {
    this.promotions = [].concat([promotion], this.promotions);

    return this;
  }

  withPromotions(promotions) {
    this.promotions = promotions;

    return this;
  }

  build() {
    this.promotions = this.promotions.length > 0 ? this.promotions : this.defaultPromotions();

    return {
      promotions: this.promotions
    };
  }
}

module.exports = UpcomingTripsPromotionsBuilder;
