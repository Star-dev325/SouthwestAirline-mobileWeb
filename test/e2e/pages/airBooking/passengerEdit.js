const passengerEdit = {
  clickDone() {
    return this.clickVisible('@doneButton');
  },
  clickSpecialAssistance() {
    return this.clickVisible('@specialAssistanceNavItem');
  },
  checkSpecialAssistanceNavItemMessage(value) {
    this.expect.element('@specialAssistanceNavMessage').text.to.equal(value);

    return this;
  }
};

module.exports = {
  elements: {
    doneButton: '.page-header button.button',
    specialAssistanceNavItem: 'a.special-assistance-item',
    specialAssistanceNavMessage: '.special-assistance-item--option-label'
  },

  commands: [passengerEdit]

};
