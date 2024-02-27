const page = {
  gender: {
    male: 1,
    female: 2
  },
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[placeholder*="${key}"]`, 10000)
      .clickVisible(`select[placeholder*="${key}"] option[value="${value}"]`);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  login() {
    return this.clickVisible('@loginBanner');
  },
  withFirstName(name) {
    return this._setValue('@inputFirstName', name);
  },
  withMiddleName(name) {
    return this._setValue('@inputMiddleName', name);
  },
  withLastName(name) {
    return this._setValue('@inputLastName', name);
  },
  withDay(value) {
    return this._dropdown('Day', value);
  },
  withMonth(value) {
    return this._dropdown('Month', value);
  },
  withYear(value) {
    return this._dropdown('Year', value);
  },
  withGender(index) {
    return this.clickVisible(`.switch-button .switch-button--item:nth-child(${index})`);
  },
  withContactMethod(key, value) {
    this._dropdown('Select', key);

    if (key === 'EMAIL') return this.setValueVisible('input[name=contactEmail]', value);

    return this.setValueVisible('input[name=number]', value);
  },
  clickNewContactMethod() {
    return this.clickVisible('@newContactMethod');
  },
  withReceiptEmail(email) {
    return this.setValueVisible('input[name=emailReceiptTo]', email);
  },
  withRapidRewardsNumber(number = '601487292') {
    return this._setValue('@rapidRewardsNumber', number);
  },
  withShareItineraryEmail(email) {
    this.clickVisible('div[data-qa="share-itinerary-email"]');

    return this.setValueVisible('input[name=shareItineraryEmail]', email);
  },
  continue() {
    return this.clickVisible('@buttonContinue');
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
    inputFirstName: 'input[name=firstName]',
    inputMiddleName: 'input[name=middleName]',
    inputLastName: 'input[name=lastName]',
    nameDisplay: '.passenger-info-summary--passenger-name',
    buttonContinue: 'button.continue',
    chosenGender: '.switch-button .switch-button--item.active',
    contactMethodType: 'select[name=contactMethod]',
    birthYear: 'select[placeholder=Year]',
    birthMonth: 'select[placeholder=Month]',
    birthDay: 'select[placeholder=Day]',
    loginBanner: 'div[data-qa="loginBanner"]',
    rapidRewardsNumber: 'input[name=rapidRewardsNumber]',
    newContactMethod: '.contact-method',
    newContactMethodContent: '.contact-method .nav-item-field-value',
    itineraryEmail: 'input[name=shareItineraryEmail]',
    specialAssistanceNavItem: 'a.special-assistance-item',
    specialAssistanceNavMessage: '.special-assistance-item--option-label'
  },

  commands: [page]
};
