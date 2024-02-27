module.exports = function ChaseAndPromoBannerContent() {
  this.success = true;
  this.errors = [];
  this.results = {
    fullChaseAd: {
      modDate: 1497644488423,
      index: 'content-service-placements-idx-dev7-v5',
      id: 'j3g1dysj',
      crDate: 1497643767676,
      lang: 'en',
      type: 'prototype',
      pubDate: 1497644482200,
      expDate: null,
      content: {
        displayType: 'legacy-chase-ad',
        backgroundColor: 'bgpblue',
        topMessageTextValue: 'You\'re pre-qualified!',
        topMessageTextColor: 'white',
        topMessageTextStyle: 'bold',
        topMessageBackgroundColor: 'bggreen',
        primaryTextValue: 'Get $200 statement credit',
        primaryTextColor: 'yellow',
        primaryTextStyle: 'bold, italic',
        secondaryTextValue: 'after first purchase & earn 10,000 bonus points',
        secondaryTextColor: 'yellow',
        secondaryTextStyle: 'italic',
        mathLine1TextValueLeft: 'You pay today',
        mathLine1ColorLeft: 'white',
        mathLine1StyleLeft: '',
        mathLine1ColorRight: 'white',
        mathLine1StyleRight: '',
        mathLine2TextValueLeft: 'Credit on your statement',
        mathLine2ColorLeft: 'yellow',
        mathLine2StyleLeft: '',
        mathLine2ColorRight: 'yellow',
        mathLine2StyleRight: '',
        mathLine3TextValueLeft: 'Total after statement credit',
        mathLine3ColorLeft: 'white',
        mathLine3StyleLeft: 'bold',
        mathLine3ColorRight: 'white',
        mathLine3StyleRight: 'bold',
        statementCredit: '200',
        partnerImage: 'https://creditcards.chase.com/R-Marketplace/1110008/images/cardart/swa_plus_card.png',
        promoImage: 'https://www.southwest.com/assets/images/ads/ad_pricing_chaseEN.png',
        linkType: 'webview',
        target: 'https://xldadm01:4700?app=mWeb',
        buttonText: 'Learn more',
        buttonType: 'button--grey'
      }
    },
    promoTop01: {
      content: {
        displayType: 'mobile_hero',
        linkType: 'app',
        promoImageBackground: 'promoImageBackgroundTop',
        imageForegroundAltText: 'imageForegroundAltTextTop',
        promoImageForeground: 'test',
        target: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: ''
      }
    },
    promoMiddle01: {
      content: {
        displayType: 'block-placement',
        linkType: 'webview',
        promoImageBackground: 'promoImageBackgroundMiddle',
        imageForegroundAltText: 'imageForegroundAltTextMiddle',
        target: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: ''
      }
    },
    promoBottom01: {
      content: {
        displayType: 'mobile_hero',
        linkType: 'browser',
        promoImageBackground: 'promoImageBackgroundBottom1',
        imageForegroundAltText: 'imageForegroundAltTextBottom1',
        promoImageForeground: 'test',
        target: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: ''
      }
    },
    promoBottom02: {
      content: {
        displayType: 'block-placement',
        linkType: 'none',
        promoImageBackground: 'promoImageBackgroundBottom2',
        imageForegroundAltText: 'imageForegroundAltTextBottom2',
        target: '',
        isChasePrequal: false,
        isChaseCombo: false,
        isChasePlacement: false,
        viewPortThreshold: 0.1,
        shouldObserveViewPort: false,
        contentBlockId: ''
      }
    }
  };

  this.withResults = function(results) {
    this.results = results;

    return this;
  };

  this.withContent = function(chaseContent, promoBannerTopContent, promoBannerBottomContent) {
    this.results.fullChaseAd.content = chaseContent;
    this.results.promoTop01.content = promoBannerTopContent;
    this.results.promoBottom01.content = promoBannerBottomContent;

    return this;
  };

  this.withoutContent = function() {
    this.results = { msg: 'No matching content was found.' };

    return this;
  };

  this.getContentOf = function(contentName) {
    return this.results[contentName].content;
  };

  this.build = function() {
    return {
      success: this.success,
      errors: this.errors,
      results: this.results
    };
  };
};
