const travelInformation = {
  cancel() {
    return this.clickVisible('@cancelButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  save() {
    return this.clickVisible('@saveButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  saveWithRedressNumber(redressNumber) {
    return this.withRedressNumber(redressNumber)
      .clickVisible('@saveButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  withKtnNumber(ktnNumber) {
    return this.setValueVisible('@ktnField', ktnNumber);
  },

  withRedressNumber(redressNumber) {
    return this.setValueVisible('@redressField', redressNumber);
  },

  withPassportNumber(passportNumber) {
    return this.clickVisible('@passportNumberField')
      .setValue('@passportNumberField', passportNumber);
  },

  withEmergencyContactName(name) {
    return this.setValueVisible('@emergencyContactNameField', name);
  },

  withEmergencyContactPhoneNumber(number) {
    return this.setValueVisible('@emergencyContactPhoneNumberField', number);
  },

  pressCancelPopupNoButton() {
    return this.clickVisible('@cancelNoButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  pressCancelPopupYesButton() {
    return this.clickVisible('@cancelYesButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  pressPassportIssuedByCountrySelector() {
    return this.clickVisible('@passportIssuedBySelector')
      .waitForElementVisible('@passportIssuedByCountry', 10000);
  },

  withPassportIssuedByCountryUS() {
    this.pressPassportIssuedByCountrySelector();

    return this.clickVisible('@passportIssuedByCountry')
      .waitForElementVisible('@passportNumberField', 10000);
  },

  pressPassportNationalitySelector() {
    return this.clickVisible('@passportNationalitySelector')
      .waitForElementVisible('@passportIssuedByNationality', 10000);
  },

  withPassportNationalityUS() {
    this.pressPassportNationalitySelector();

    return this.clickVisible('@passportIssuedByNationality')
      .waitForElementVisible('@passportNumberField', 10000);
  },

  withPassportYear(date) {
    return this.clickVisible(`select[placeholder="Year"] option[value="${date}"]`);
  },

  pressPassportResidencySelector() {
    return this.clickVisible('@passportResidencySelector')
      .waitForElementVisible('@passportResidency', 10000);
  },

  withPassportResidencyUS() {
    this.pressPassportResidencySelector();

    return this.clickVisible('@passportResidency')
      .waitForElementVisible('@passportNumberField', 10000);
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
    cancelButton: 'button[type="button"]',
    saveButton: 'button[data-qa="form-submit-button"]',
    passengerNameField: '[data-qa="passenger-name"]',
    rapidRewardsNumberField: '[name="rapidRewardsNumber"]',
    ktnField: 'input[name="knownTravelerNumber"]',
    redressField: 'input[name="redressNumber"]',
    passportNumberField: 'input[placeholder="Passport\\ Number"]',
    passportIssuedBySelector: 'a[name="passportIssuedBy"]',
    passportIssuedByCountry: '.country-list-item-container',
    passportNationalitySelector: 'a[name="nationality"]',
    passportIssuedByNationality: '.country-list-item-container',
    passportResidencySelector: 'a[name="countryOfResidence"]',
    passportResidency: '.country-list-item-container',
    emergencyContactNameField: 'input[name="emergencyContactName"]',
    emergencyContactPhoneNumberField: 'input[name="emergencyContactPhoneNumber"]',
    cancelPopupWarning: '[data-qa="travel-info-page-confirm-lost-info-before-cancel"]',
    cancelNoButton: '.confirm-button',
    cancelYesButton: '.close-button',
    oopsErrorHeader: '.error-header',
    specialAssistanceNavItem: 'a.special-assistance-item',
    specialAssistanceNavMessage: '.special-assistance-item--option-label'
  },

  commands: [travelInformation]
};
