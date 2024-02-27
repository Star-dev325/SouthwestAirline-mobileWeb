const flightStatusResults = {

  waitForFlightSearchResultsPage() {
    return this.waitForElementPresent('@statusList', 10000);
  },
  selectFlightInResultList() {
    return this.clickVisible('@firstFlightCard');
  }

};

module.exports = {

  elements: {
    firstFlightCard: '.flight-card:first-of-type',
    statusList: '[data-qa="search flight results page"]',
    flightNumber: '.flight-number--info',
    pageTitle: 'span.page-title'

  },

  commands: [flightStatusResults]

};
