import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import ChaseAndPromoBannerContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import { BLOCK_PLACEMENT, LEGACY_CHASE_AD } from 'src/wcm/constants/wcmConstants';

describe('WcmTransformer', () => {
  context('toDynamicPlacement', () => {
    const key = 'key';

    context('when Block Placement', () => {
      it('should return transformed values', () => {
        const content = {
          displayType: BLOCK_PLACEMENT,
          placement: {
            backgroundImage: 'backgroundImage',
            backgroundImageAltText: 'backgroundImageAltText',
            blocks: [],
            contentBlockId: '',
            target: 'https://southwest.com',
            linkType: 'linkType'
          },
          placementData: {
            viewPort: '50%',
            isChasePrequal: true,
            isChaseCombo: true,
            isChasePlacement: true
          }
        };

        const response = { results: { [key]: { content } } };

        const result = WcmTransformer.toDynamicPlacement(response, key);

        expect(result).to.deep.equal({
          displayType: BLOCK_PLACEMENT,
          promoImageBackground: 'backgroundImage',
          imageForegroundAltText: 'backgroundImageAltText',
          blocks: [],
          contentBlockId: '',
          target: 'https://southwest.com',
          linkType: 'linkType',
          isChaseCombo: true,
          isChasePrequal: true,
          isChasePlacement: true,
          viewPortThreshold: 0.5,
          shouldObserveViewPort: true
        });
      });

      it('should return default values', () => {
        const content = {
          displayType: BLOCK_PLACEMENT
        };

        const response = { results: { [key]: { content } } };

        const result = WcmTransformer.toDynamicPlacement(response, key);

        expect(result).to.deep.equal({
          displayType: BLOCK_PLACEMENT,
          promoImageBackground: undefined,
          imageForegroundAltText: '',
          blocks: [],
          contentBlockId: '',
          target: undefined,
          linkType: WcmLinkTypes.NONE,
          isChaseCombo: false,
          isChasePrequal: false,
          isChasePlacement: false,
          viewPortThreshold: 0.5,
          shouldObserveViewPort: false
        });
      });
    });

    context('when Legacy Chase Ad', () => {
      const chaseBannerResponse = new ChaseAndPromoBannerContent();

      it('should return undefined if chaseBannerContent is null', () => {
        const transformedChaseBannerContent = WcmTransformer.toDynamicPlacement(null, 'fullChaseAd');

        expect(transformedChaseBannerContent).to.deep.equal(undefined);
      });

      it('should return transformed content if chaseBannerContent is not null', () => {
        const expectedResult = {
          buttonText: 'Learn more',
          topMessageTextValue: "You're pre-qualified!",
          mathLine1TextValueLeft: 'You pay today',
          mathLine2TextValueLeft: 'Credit on your statement',
          mathLine3TextValueLeft: 'Total after statement credit',
          partnerImage: 'https://creditcards.chase.com/R-Marketplace/1110008/images/cardart/swa_plus_card.png',
          primaryTextValue: 'Get $200 statement credit',
          secondaryTextValue: 'after first purchase & earn 10,000 bonus points',
          statementCredit: 200,
          styles: {
            backgroundColor: 'bgpblue',
            buttonType: 'button--grey',
            topMessageTextColor: 'white',
            topMessageTextStyle: 'bold',
            topMessageBackgroundColor: 'bggreen',
            mathLine1ColorLeft: 'white',
            mathLine1ColorRight: 'white',
            mathLine1StyleLeft: '',
            mathLine1StyleRight: '',
            mathLine2ColorLeft: 'yellow',
            mathLine2ColorRight: 'yellow',
            mathLine2StyleLeft: '',
            mathLine2StyleRight: '',
            mathLine3ColorLeft: 'white',
            mathLine3ColorRight: 'white',
            mathLine3StyleLeft: 'bold',
            mathLine3StyleRight: 'bold',
            primaryTextColor: 'yellow',
            primaryTextStyle: 'bold, italic',
            secondaryTextColor: 'yellow',
            secondaryTextStyle: 'italic'
          },
          displayType: LEGACY_CHASE_AD,
          contentBlockId: '',
          shouldObserveViewPort: false,
          viewPortThreshold: 0.5,
          isChasePrequal: false,
          isChaseCombo: false,
          isChasePlacement: false,
          target: 'https://xldadm01:4700?app=mWeb',
          linkType: 'webview'
        };
        const transformedChaseBannerContent = WcmTransformer.toDynamicPlacement(chaseBannerResponse, 'fullChaseAd');

        expect(transformedChaseBannerContent).to.deep.equal(expectedResult);
      });

      it('should handle errors/undefined values', () => {
        const errorChaseBannerResponse = new ChaseAndPromoBannerContent();

        errorChaseBannerResponse.results.fullChaseAd.content = {
          displayType: LEGACY_CHASE_AD
        };

        const expectedResult = {
          displayType: LEGACY_CHASE_AD,
          statementCredit: 0,
          partnerImage: '',
          target: undefined,
          linkType: undefined,
          buttonText: undefined,
          topMessageTextValue: undefined,
          primaryTextValue: undefined,
          secondaryTextValue: undefined,
          mathLine1TextValueLeft: undefined,
          mathLine2TextValueLeft: undefined,
          mathLine3TextValueLeft: undefined,
          styles: {},
          contentBlockId: '',
          shouldObserveViewPort: false,
          viewPortThreshold: 0.5,
          isChasePrequal: false,
          isChaseCombo: false,
          isChasePlacement: false
        };
        const transformedChaseBannerContent = WcmTransformer.toDynamicPlacement(
          errorChaseBannerResponse,
          'fullChaseAd'
        );

        expect(transformedChaseBannerContent).to.deep.equal(expectedResult);
      });
    });

    context('when default placement', () => {
      it('should return transformed values', () => {
        const content = {
          displayType: 'displayType',
          backgroundImage: 'backgroundImage',
          backgroundImageAltText: 'backgroundImageAltText',
          blocks: [],
          target: 'https://southwest.com',
          linkType: 'linkType',
          placementData: {
            viewPort: '50%',
            isChasePrequal: true,
            isChaseCombo: true
          }
        };

        const response = { results: { [key]: { content } } };

        const result = WcmTransformer.toDynamicPlacement(response, key);

        expect(result).to.deep.equal({
          displayType: 'displayType',
          backgroundImage: 'backgroundImage',
          backgroundImageAltText: 'backgroundImageAltText',
          blocks: [],
          target: 'https://southwest.com',
          linkType: 'linkType',
          placementData: {
            viewPort: '50%',
            isChasePrequal: true,
            isChaseCombo: true
          },
          contentBlockId: '',
          isChaseCombo: true,
          isChasePrequal: true,
          isChasePlacement: false,
          viewPortThreshold: 0.5,
          shouldObserveViewPort: true
        });
      });

      it('should return default values', () => {
        const response = { results: { [key]: { content: {} } } };

        const result = WcmTransformer.toDynamicPlacement(response, key);

        expect(result).to.deep.equal({
          displayType: '',
          contentBlockId: '',
          isChaseCombo: false,
          isChasePrequal: false,
          isChasePlacement: false,
          viewPortThreshold: 0.5,
          shouldObserveViewPort: false
        });
      });
    });

    it('should return undefined when content is missing', () => {
      const response = { results: { [key]: { content: undefined } } };

      const result = WcmTransformer.toDynamicPlacement(response, key);

      expect(result).to.equal(undefined);
    });

    it('should return undefined when key does not match', () => {
      const response = { results: { [key]: { content: undefined } } };

      const result = WcmTransformer.toDynamicPlacement(response, 'invalid-key');

      expect(result).to.equal(undefined);
    });
  });

  context('toContentBlockIds', () => {
    it('should return empty string when the response is null', () => {
      const response = null;

      const result = WcmTransformer.toContentBlockIds(response);

      expect(result).to.equal('');
    });

    it('should return empty string when results is empty', () => {
      const response = { results: {} };

      const result = WcmTransformer.toContentBlockIds(response);

      expect(result).to.equal('');
    });

    it('should return empty string when content when content block ids are null', () => {
      const content1 = { contentBlockId: null };
      const content2 = { contentBlockId: null };
      const content3 = { contentBlockId: null };

      const response = { results: { content1, content2, content3 } };

      const result = WcmTransformer.toContentBlockIds(response);

      expect(result).to.equal('');
    });

    it('should return empty string when content block ids are not returned', () => {
      const content1 = null;
      const content2 = {};
      const content3 = { contentBlockId: null };

      const response = { results: { content1, content2, content3 } };

      const result = WcmTransformer.toContentBlockIds(response);

      expect(result).to.equal('');
    });

    it('should return concatenated content block ids', () => {
      const content1 = { contentBlockId: '1' };
      const content2 = { contentBlockId: '2' };
      const content3 = { contentBlockId: '3' };

      const response = { results: { content1, content2, content3 } };

      const result = WcmTransformer.toContentBlockIds(response);

      expect(result).to.equal('1:2:3');
    });
  });

  context('toContentBlockIdsFromMenuList', () => {
    it('should return empty string when the response is null', () => {
      const menuList = null;

      const result = WcmTransformer.toContentBlockIdsFromMenuList(menuList);

      expect(result).to.equal('');
    });

    it('should return empty string when no promos', () => {
      const menuList = [{ isPromo: false }, { isPromo: false }, { isPromo: false }];

      const result = WcmTransformer.toContentBlockIdsFromMenuList(menuList);

      expect(result).to.equal('');
    });

    it('should return empty string when promos when content block ids are null', () => {
      const content1 = { isPromo: true, contentBlockId: null };
      const content2 = { isPromo: true, contentBlockId: null };
      const content3 = { isPromo: true, contentBlockId: null };

      const menuList = [content1, content2, content3];

      const result = WcmTransformer.toContentBlockIdsFromMenuList(menuList);

      expect(result).to.equal('');
    });

    it('should return empty string when content block ids are not returned', () => {
      const content1 = null;
      const content2 = {};
      const content3 = { isPromo: true, contentBlockId: null };

      const menuList = [content1, content2, content3];

      const result = WcmTransformer.toContentBlockIdsFromMenuList(menuList);

      expect(result).to.equal('');
    });

    it('should return concatenated content block ids', () => {
      const content1 = { isPromo: true, contentBlockId: '1' };
      const content2 = { isPromo: true, contentBlockId: '2' };
      const content3 = { isPromo: true, contentBlockId: '3' };

      const menuList = [content1, content2, content3];

      const result = WcmTransformer.toContentBlockIdsFromMenuList(menuList);

      expect(result).to.equal('1:2:3');
    });
  });
});
