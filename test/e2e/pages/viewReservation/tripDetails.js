const tripDetails = {

  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation/flight`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  manage() {
    return this.clickVisible('@manageButton');
  },
  addCompanion() {
    return this.clickVisible('@addCompanion')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  cancelFlight() {
    return this.clickVisible('@cancelButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  changeFlight() {
    return this.clickVisible('@changeButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  _isVisible() {
    return this.waitForElementVisible('@upcomingTripDetails', 10000);
  },
  clickPassengerName() {
    return this.clickVisible('@passengerName')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  passportIncompleted() {
    return this.waitForElementVisible('@passportIncompleted', 10000);
  },
  passportCompleted() {
    return this.waitForElementVisible('@passportCompleted', 10000);
  }
};

module.exports = {
  elements: {
    manageButton: '[data-qa="boarding-info-manage-button"]',
    callFlySwaToModifyReservation: '[data-qa="passenger-kiosk-message"]',
    addCompanion: '[data-qa="add-companion"]',
    cancelButton: '.manage-button-cancel',
    changeButton: '.manage-button-change',
    yellowButton: '.button--yellow',
    tripDetailsCard: '.trip-details-boarding-info',
    nextTripTitle: '.my-trips-panel--next-trip-title',
    tripsNumber: '.my-trips-number-header',
    manageLinks: '.bottom-link-list',
    upcomingTripDetails: '[data-qa="upcoming-trip-details-page"]',
    tripDetails: '.trip-details-page',
    alertBanner: '.alert-banner--content',
    alertBannerIcon: '.icon_travel-alert',
    tripTypeTab: 'div[data-qa="detached-tab-bar"]',
    pageHeader: '.page-header',
    flightTab: 'div[data-qa="detached-tab-bar-flight"]',
    carTab: 'div[data-qa="detached-tab-bar-car"]',
    viewBoardingPositionsButton: 'button[title="View Boarding Details"]',
    flightDay: '.flight-day',
    paxTypeAndNum: '.passenger-price--number-and-type',
    fareType: '.passenger-price--fare-type',
    windowCheckinMessaging: 'div[data-qa="passenger-kiosk-message"]',
    bottomPopup: '[data-qa="buttons-wrapper"]',
    backdrop: '.backdrop',
    passengerName: 'span[data-qa="userName"]',
    passportIncompleted: 'div[class="bold red"]',
    passportCompleted: 'div[class="bold green"]',
    passengerSection: '.passenger-reservation-info--passenger-name',
    recordLocator: '[data-qa="passenger-record-locator"]',
    dayOfTravelContactLink: '[data-qa="day-of-travel-wrapper"]'
  },

  commands: [tripDetails]
};
