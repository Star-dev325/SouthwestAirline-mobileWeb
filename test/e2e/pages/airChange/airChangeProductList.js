const airChangeProductList = {
  fare: {
    wannaGetAway: 1,
    anytime: 3,
    businessSelect: 4
  },
  withChangeFlightFare(index, fare) {
    const flightSelector = `div.flight-shopping-page--products-container > .flight-shopping-page--product-card:nth-of-type(${index})`;
    const fareProductSelector = `div[data-qa="flight-products"] .flight-product-section:nth-child(${fare})`;

    return this.clickVisible(flightSelector).clickVisible(fareProductSelector);
  },
  withReaccomFlightProduct(index) {
    return this.clickVisible(`div.flight-shopping-page--products-container > .flight-shopping-page--product-card:nth-of-type(${index})`);
  }
};

module.exports = {
  elements: {
    seniorPassengerBanner: '.step-banner-container--title',
    currentReservationInfo: '.current-reservation-info',
    calendarWarningIcon: '[data-qa="calendar-strip--warning-icon"]',
    businessSelectBanner: '[data-qa="business-select-banner"]',
    selectionTitle: '.selection-title__code',
    popupCancelButton: '[data-qa="air-change-delete-boarding-pass"] .confirm-button',
    checkInAgainPopup: '.popup-title',
    okPopupButton: '.confirm-button'
  },

  commands: [airChangeProductList]
};
