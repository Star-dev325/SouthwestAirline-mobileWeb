const carDetails = {

  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation/car-details`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  manage() {
    return this.clickVisible('@manageButton');
  },

  cancelCar() {
    return this.clickVisible('@cancelCar')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  confirmCancelCar() {
    return this.clickVisible('@confirmCancelButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }

};

module.exports = {
  elements: {
    manageButton: '[data-qa="manageCarReservationButton"]',
    cancelCar: '.bottom-link-list a:nth-child(2)',
    confirmCancelButton: 'a[data-qa="confirm-cancel-button"]',
    doNotCancelButton: 'a[data-qa="do-not-cancel-button"]',
    pageHeader: '.page-header',

    carImg: 'img.car-vendor-logo',
    pickupTime: 'div[data-qa="pickupTime"]',
    pickupLocation: 'div[data-qa="pickupLocation"]',
    driverName: 'span[data-qa="driverName"]',
    carConfirmCode: 'span[data-qa="confirmationNumber"]',
    addAnotherCarLink: 'a[data-qa="add-another-car"]',
    cancelLinkOnCarTab: 'button.cancel-button',

    cancelPopupTitle: 'div[data-qa="car-cancel-confirmation"] h3.popup-title',
    confirmCancelButtion: 'a[data-qa="confirm-cancel-button"]',
    closeButton: 'button[data-qa="close"]'
  },

  commands: [carDetails]
};
