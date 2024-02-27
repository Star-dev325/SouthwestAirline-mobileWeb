export default class imagePlacementBuilder {
  constructor() {
    this.displayType = 'block-placement';
    this.promoImageBackground = '/content/mkt/images/landing_pages/__tests__/chase-placement.png';
    this.imageForegroundAltText = '';
    this.target = 'https://xldadm01:4700/?app=mWeb';
    this.linkType = 'webview';
    this.viewPortThreshold = 0.5;
    this.shouldObserveViewPort = false;
    this.isChasePrequal = false;
    this.isChaseCombo = false;
    this.isChasePlacement = false;
    this.contentBlockId = '';
  }

  build() {
    const response = {
      displayType: this.displayType,
      promoImageBackground: this.promoImageBackground,
      imageForegroundAltText: this.imageForegroundAltText,
      target: this.target,
      linkType: this.linkType,
      viewPortThreshold: this.viewPortThreshold,
      isChasePrequal: this.isChasePrequal,
      isChaseCombo: this.isChaseCombo,
      isChasePlacement: this.isChasePlacement,
      contentBlockId: this.contentBlockId,
      shouldObserveViewPort: this.shouldObserveViewPort
    };

    return response;
  }
}
