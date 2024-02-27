'use strict';

const shoppingResultsPage = {
  waitUntilFinishedLoading() {
    return this.waitForElementVisible('div[data-qa="car-shopping-result"]', 10000);
  },

  withCarResult(index) {
    const sel = `.car-result:nth-child(${index})`;

    return this.clickVisible(sel);
  }
};

module.exports = {
  elements: {
    loginButton: '.login-button--box'
  },
  commands: [shoppingResultsPage]
};
