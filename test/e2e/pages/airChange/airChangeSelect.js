const airChangeSelect = {
  selectOutboundFlight() {
    return this.clickVisible('@outbound');
  },

  selectInboundFlight() {
    return this.clickVisible('@inbound');
  },

  submit() {
    return this.clickVisible('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    from: '[data-qa="from"]',
    to: '[data-qa="to"]',
    outbound: '[data-qa="air-change-flight-selection-departure"]',
    inbound: '[data-qa="air-change-flight-selection-return"]',
    outboundStation: '.airport-selector--formatted-airport',
    outboundCityState: '.airport-selector--airport-description',
    flightChangeIntro: '.flight-change',
    continueButton: 'button[type=submit]',
    dynamicWaiverMessage: '[data-qa="dynamic-waiver-summary"]',
    dynamicWaiverFirstBoundsMessage: '[data-qa="dynamic-waiver-stations"]',
    dynamicWaiverSecondBoundsMessage: '[data-qa="dynamic-waiver-stations"]:nth-child(2)',
    alertIconFirstBound: '[name="firstbound"] .icon_travel-alert',
    alertIconSecondBound: '[name="secondbound"] .icon_travel-alert',
    openJawDialogTitle: '.popup-title'
  },

  commands: [airChangeSelect]
};
