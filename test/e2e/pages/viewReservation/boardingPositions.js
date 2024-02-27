const boardingPositions = {
  continue() {
    return this.clickVisible('@boardingPass')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  viewBoardingPass(segmentIndex = 1, buttonIndex = 1) {
    return this.clickVisible(`div:nth-child(${segmentIndex}) > div.segment-checkin-documents > div:nth-child(${buttonIndex}) > div:nth-child(3) > div > button`, 10000);
  },

  checkSpecialAssistanceConfirmationMessage(value) {
    this.expect.element('@specialAssistanceConfirmation').text.to.equal(value);

    return this;
  }
};

module.exports = {
  elements: {
    successMessage: '.message--text',
    checkInDocuments: '.checkin-documents',
    boardingPass: 'button[title="View Boarding Pass"]',
    viewAllBoardingPasses: '[data-qa="view-all-boarding-passes"]',
    shareButton: '[data-qa="shareLink"]',
    passengerKioskMessage: '[data-qa="passenger-kiosk-message"]',
    specialAssistanceConfirmation: '.special-assistance-message'
  },

  commands: [boardingPositions]
};