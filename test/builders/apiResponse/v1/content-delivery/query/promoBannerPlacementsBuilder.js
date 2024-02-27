class PromoBannerPlacementsBuilder {
  static _promoBanner(displayType, title) {
    return {
      modDate: 1516230204748,
      index: 'content-service-placements-idx-qa1a-v6',
      id: 'ja6ldtto',
      crDate: 1516230204748,
      type: 'prototype',
      lang: 'en',
      pubDate: 1516230198047,
      expDate: null,
      content: {
        displayType,
        title,
        description: 'We make it fast and easy to earn reward flights and more!',
        promotionImage: '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
        altText: 'About Rapid Rewards',
        linkType: 'app',
        target: 'rrabout'
      }
    };
  }
  constructor() {
    this.success = true;
    this.errors = [];
    this.results = {
      promoBanner01: PromoBannerPlacementsBuilder._promoBanner('mobile_rr_promo_banner', 'About Rapid Rewards'),
      promoBanner02: PromoBannerPlacementsBuilder._promoBanner('mobile_rr_promo_banner', 'Second Banner'),
      promoBanner03: PromoBannerPlacementsBuilder._promoBanner('invalid_mobile_rr_promo_banner', 'Not Valid')
    };
  }

  build() {
    return {
      success: this.success,
      errors: this.errors,
      results: this.results
    };
  }
}

export default PromoBannerPlacementsBuilder;