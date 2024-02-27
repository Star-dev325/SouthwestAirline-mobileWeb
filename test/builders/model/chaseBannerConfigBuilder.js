export default class chaseBannerConfigBuilder {
  constructor() {
    this.displayType = 'legacy-chase-ad';
    this.buttonText = 'Learn more';
    this.topMessageTextValue = 'You\'re pre-qualified!';
    this.mathLine1TextValueLeft = 'You pay today';
    this.mathLine2TextValueLeft = 'Credit on your statement';
    this.mathLine3TextValueLeft = 'Total after statement credit';
    this.partnerImage = '/partnerImage.png';
    this.primaryTextValue = 'Get $200 statement credit';
    this.secondaryTextValue = 'after first purchase & earn 10,000 bonus points';
    this.statementCredit = 200;
    this.styles = {
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
      secondaryTextStyle: 'italic',
      adType: 'math'
    };
    this.target = 'https://xldadm01:4700/?app=mWeb';
    this.linkType = 'webview';
    this.viewPortThreshold = 0.5;
    this.shouldObserveViewPort = false;
    this.isChasePrequal = false;
    this.isChaseCombo = false;
    this.isChasePlacement = false;
    this.contentBlockId = '';
    this.isLoggedIn = false;
  }

  withAdTypeImage() {
    this.styles.adType = 'image';

    return this;
  }

  build() {
    const response = {
      displayType: this.displayType,
      buttonText: this.buttonText,
      topMessageTextValue: this.topMessageTextValue,
      mathLine1TextValueLeft: this.mathLine1TextValueLeft,
      mathLine2TextValueLeft: this.mathLine2TextValueLeft,
      mathLine3TextValueLeft: this.mathLine3TextValueLeft,
      partnerImage: this.partnerImage,
      primaryTextValue: this.primaryTextValue,
      secondaryTextValue: this.secondaryTextValue,
      statementCredit: this.statementCredit,
      styles: this.styles,
      target: this.target,
      linkType: this.linkType,
      viewPortThreshold: this.viewPortThreshold,
      isChasePrequal: this.isChasePrequal,
      isChaseCombo: this.isChaseCombo,
      isChasePlacement: this.isChasePlacement,
      contentBlockId: this.contentBlockId,
      shouldObserveViewPort: this.shouldObserveViewPort,
      isLoggedIn: this.isLoggedIn
    };

    return response;
  }
}
