const page = {
  confirmChange() {
    return this.clickVisible('@confirmChange')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    pageTitle: '.page-header .inline-block',
    flightSummaryDeparting: '.flight-summary-departing',
    flightSummaryReturning: '.flight-summary-returning',
    confirmChange: '.button--yellow'
  },

  commands: [page]
};
