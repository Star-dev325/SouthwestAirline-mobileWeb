const flightStatusDetails = {

  waitForStatusDetailsAppear() {
    return this.waitForElementVisible('@gateInfo', 10000);
  }
};

module.exports = {

  elements: {
    gateInfo: '.gate-information',
    dateStr: 'p[class="sub header date"]'
  },

  commands: [flightStatusDetails]

};
