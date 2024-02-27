import { sandbox } from 'sinon';

import { filterAndSortContent } from 'src/shared/helpers/homeContentHelper';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';

const sinon = sandbox.create();

describe('homeContentHelperSpecs', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('filterAndSortContent', () => {
    const response = {
      results: {
        homeBanner02: {
          content: {
            displayType: 'mobile_hero',
            imageForegroundAltText: 'COVID banner 2',
            linkType: 'webview',
            placementData: { contentBlockId: '2323452w3' },
            promoImageBackground: '/content/mkt/images/hero_shots/CovidPlacement2.png',
            promoImageForeground: '',
            target: 'https://www.southwest.com/Coronavirus/?clk=CORONAVIRUS_TA&cbid=4430022'
          }
        },
        homeBanner01: {
          content: {
            displayType: 'mobile_hero',
            imageForegroundAltText: 'COVID banner',
            linkType: 'webview',
            placementData: { contentBlockId: '4633154' },
            promoImageBackground: '/content/mkt/images/hero_shots/CovidPlacement.png',
            promoImageForeground: '',
            target: 'https://www.southwest.com/Coronavirus/?clk=CORONAVIRUS_TA&cbid=4430033'
          }
        },
        homeHero02: {
          content: {
            displayType: 'mobile_hero',
            promoImageForeground: '/content/mkt/images/hero_shots/aHpHero2-chase-40k-overlay-20171006.png',
            imageForegroundAltText: 'Earn 40,000 points. Plus, 3,000 anniversary points. Learn more',
            promoImageBackground: '/content/mkt/images/hero_shots/aHpHero2-chase-40k-bkgnd-20171006.jpg',
            linkType: 'webview',
            target: 'https://creditcards.chase.com/a1/southwest/40KPlus?CELL=637V&clk=MBOFFR_CHASE41171006'
          }
        },
        homeHero01: {
          content: {
            displayType: 'mobile_hero',
            promoImageForeground: '/content/mkt/images/hero_shots/aHpHero1-default-overlay-20171017.png',
            imageForegroundAltText:
              'This sale is kicking off. One-way as low as* $59. Book now. *Restrictions and exclusions apply. Blackout dates apply. 14-day advance purchase required. Seats and days limited. Select markets. Book 10/17-10/26.',
            promoImageBackground: '/content/mkt/images/hero_shots/aHpHero1-default-bkgnd-20171017.jpg',
            linkType: 'webview',
            target:
              'https://mobile.southwest.com/special-offer/promotions_nationwide_sale_171017_offers?clk=MBOFFR_MBS1171017'
          }
        },
        homeHero03: {
          content: {
            displayType: 'mobile_hero',
            promoImageForeground: '/content/mkt/images/hero_shots/app_hero_p3_eb_overlay_170418.png',
            imageForegroundAltText: 'EarlyBird Check-In®',
            promoImageBackground: '/content/mkt/images/hero_shots/app_hero_pos3_bkgnd.jpg',
            linkType: 'app',
            target: 'airearlybird'
          }
        },
        promoBanner02: {
          content: {
            displayType: 'mobile_rr_promo_banner',
            title: 'Start Earning Points',
            description: 'Sign up for a Rapid Rewards® account and earn points on your next flight.',
            promotionImage: '/content/mkt/images/promotions/enroll_icon.png',
            altText: 'Join our Rapid Rewards program',
            linkType: 'webview',
            target: '/enroll?clk=mhpbnr2RRenroll'
          }
        },
        promoBanner01: {
          content: {
            displayType: 'mobile_rr_promo_banner',
            title: 'Flying Southwest',
            description: "Learn about our boarding process, what's available inflight & more.",
            promotionImage: '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
            altText: 'Flying Southwest',
            linkType: 'webview',
            target: '/flying-southwest'
          }
        }
      }
    };

    let toDynamicPlacementStub;

    beforeEach(() => {
      toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement').returns({});
    });

    it('should create an array of homeHero items sorted alphabetically by their original keys', () => {
      const results = filterAndSortContent(response, 'homeHero');

      expect(results).to.have.length(3);

      expect(toDynamicPlacementStub.getCall(0).args[0]).to.deep.equal(response, 'homeHero01');
      expect(toDynamicPlacementStub.getCall(1).args[0]).to.deep.equal(response, 'homeHero02');
      expect(toDynamicPlacementStub.getCall(2).args[0]).to.deep.equal(response, 'homeHero03');
    });

    it('should create an array of homeBanner items sorted alphabetically by their original keys', () => {
      const results = filterAndSortContent(response, 'homeBanner');

      expect(results).to.have.length(2);

      expect(toDynamicPlacementStub.getCall(0).args[0]).to.deep.equal(response, 'homeBanner01');
      expect(toDynamicPlacementStub.getCall(1).args[0]).to.deep.equal(response, 'homeBanner02');
    });

    it('should create an array of promoBanner items sorted alphabetically by their original keys', () => {
      const results = filterAndSortContent(response, 'promoBanner');

      expect(results).to.have.length(2);

      expect(toDynamicPlacementStub.getCall(0).args[0]).to.deep.equal(response, 'promoBanner01');
      expect(toDynamicPlacementStub.getCall(1).args[0]).to.deep.equal(response, 'promoBanner02');
    });

    it('should create an empty array when passed a key that is not present', () => {
      const results = filterAndSortContent(response, 'notInObject');

      expect(results).to.have.length(0);
    });

    it('should create an empty array when wcm response is empty', () => {
      const results = filterAndSortContent(undefined, 'key');

      expect(results).to.deep.equal([]);
    });
  });
});
