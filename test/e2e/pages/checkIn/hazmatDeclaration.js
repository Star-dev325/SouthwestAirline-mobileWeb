const hazmatDeclarationPage = {
  continue() {
    return this.clickVisible('@continueButton');
  },
  clickDisagree() {
    this.clickVisible('@disagreeButton');
  }
};

module.exports = {
  elements: {
    hazmatDeclaration: '.hazmat-declaration-page',
    hazmatInfoLink: 'a[href="/hazardous-materials?clk=chkinhazinfo"]',
    continueButton: 'button.continue',
    disagreeButton: '.hazmat-disagree'
  },

  commands: [hazmatDeclarationPage]
};