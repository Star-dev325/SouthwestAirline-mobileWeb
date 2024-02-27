import { getEarlyBirdBanner } from 'src/earlyBird/selectors/earlyBirdCheckInPageSelectors';

describe('earlyBirdCheckInPageSelectors', () => {
  context('getEarlyBirdBanner', () => {
    it('should return empty object when is no banner in state', () => {
      const state = {};

      expect(getEarlyBirdBanner(state)).to.be.eql({});
    });
    it('should return correct banner object', () => {
      const state = {
        app: {
          wcmContent: {
            earlyBirdBanner: {
              product_feature: {
                alt_text: 'EarlyBird',
                image: '/content/mkt/images/product_features/EarlyBird_Hero.jpg',
                product_attributes: [],
                product_description: '',
                product_heading: '',
                product_tagline: '',
                style: 'image'
              }
            }
          }
        }
      };

      expect(getEarlyBirdBanner(state)).to.be.eql({
        image: '/content/mkt/images/product_features/EarlyBird_Hero.jpg',
        alt: 'EarlyBird'
      });
    });
  });
});
