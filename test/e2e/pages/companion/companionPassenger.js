const page = {
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
    companionPersonalForm: '.companion-personal-form',
    companionPersonalInfo: '.companion-personal-info',
    selectContactMethod: 'select[name=contactMethod]',
    continue: '.continue',
    contactMethod: '[data-qa="nav-item-field-value"]',
    specialAssistanceNavItem: 'a.special-assistance-item',
    specialAssistanceNavMessage: '.special-assistance-item--option-label'
  },

  commands: [page]
};
