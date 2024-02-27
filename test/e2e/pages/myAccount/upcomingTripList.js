const page = {
  tapFirstOfUpcomingTripList() {
    return this.clickVisible('@firstOfUpcomingTripList');
  },
  tapUpcomingTripCardDetailsButton() {
    return this.clickVisible('@details');
  },
  tapNextUpcomingCarTrip() {
    return this.clickVisible('.trip-card .icon_car');
  },
  waitForTripListDisplay() {
    return this.waitForElementVisible('@upcomingTripList', 10000);
  },
  tapDetailsButtonForCard(index) {
    return this.clickVisible(`.trip-card:nth-of-type(${index}) .detailed-trip-card--detail-button`);
  }
};

module.exports = {

  elements: {
    upcomingTripList: '.my-trips-number-header',
    firstOfUpcomingTripList: '.trip-card:nth-of-type(1)',
    customContainer: '.custom-container',
    pageHeader: '.page-header',
    logoutLink: '.login-btn',
    checkInButton: '.trip-card:nth-of-type(3) .button--yellow',
    internationalTripCheckInButton: '.trip-card:nth-of-type(22) .button--yellow',
    viewBoardingPassesMultiPax: '.trip-card:nth-of-type(19) button[title="Boarding Passes"]',
    viewBoardingPass: '.trip-card:nth-of-type(4) button[title="Boarding Pass"]',
    details: '.trip-card:nth-of-type(5) .detailed-trip-card--detail-button'
  },

  commands: [page]

};
