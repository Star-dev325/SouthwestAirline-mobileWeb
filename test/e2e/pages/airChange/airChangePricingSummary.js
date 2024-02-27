const page = {
  continue() {
    return this.clickVisible('@continuePricing')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    flightSummaryDeparting: '.flight-summary-departing',
    flightSummaryReturning: '.flight-summary-returning',
    tripCostsTable: '.trip-costs-table',
    differenceTotalMessage: '.difference-total--message',
    differenceTotalCurrency: '.difference-total--currency',
    refundSummaryNeverChangeMessage: '[data-qa="change-refund-summary--never-change"]',
    continuePricing: '.button--yellow'
  },

  sections: {
    priceTotalSummaryFare: {
      selector: '.air-change-price-total--fare-summary',
      elements: {
        priceLineTitle: '.price-line--title'
      }
    }
  },

  commands: [page]
};
