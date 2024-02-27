import { transformPromoBannerContentToPromotion } from 'src/rapidRewards/transformers/promoBannersTransformer';
import PromoBannerPlacementsBuilder from 'test/builders/apiResponse/v1/content-delivery/query/promoBannerPlacementsBuilder';

describe('promoBannersTransformer', () => {
  describe('from content delivery promotion response', () => {
    it('should transform valid promo banners', () => {
      const result = transformPromoBannerContentToPromotion(new PromoBannerPlacementsBuilder().build());

      expect(result).toEqual([
        {
          title: 'About Rapid Rewards',
          image: '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
          description: 'We make it fast and easy to earn reward flights and more!',
          alt: 'About Rapid Rewards',
          target: 'rrabout',
          link_type: 'app'
        },
        {
          title: 'Second Banner',
          image: '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
          description: 'We make it fast and easy to earn reward flights and more!',
          alt: 'About Rapid Rewards',
          target: 'rrabout',
          link_type: 'app'
        }
      ]);
    });
  });
});
