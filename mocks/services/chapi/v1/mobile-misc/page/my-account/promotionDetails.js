const PromotionDetailsBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/my-accounts/promotionDetailsBuilder');

module.exports = {
  path: '/chapi/v1/mobile-misc/page/my-account/promotion-details/:promotionId',
  method: 'GET',
  cache: false,
  template: (params) => {
    const { promotionId } = params;

    if (promotionId === 'REGISTEREDID' || promotionId === 'REGISTERED') {
      return new PromotionDetailsBuilder().withPromotionId(promotionId).withIsRegistered(true).build();
    } else {
      return new PromotionDetailsBuilder().withPromotionId(promotionId).withIsRegistered(false).build();
    }
  }
};
