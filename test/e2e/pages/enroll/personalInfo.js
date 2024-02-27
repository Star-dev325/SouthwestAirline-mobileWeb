const enroll = {
  gender: {
    male: 1,
    female: 2
  },
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[placeholder*="${key}"]`, 10000)
      .click(`select[placeholder*="${key}"] option[value="${value}"]`);
  },
  _dropdownByName(name, value) {
    return this.waitForElementVisible(`select[name="${name}"]`, 10000)
      .click(`select[name="${name}"] option[value="${value}"]`);
  },
  open() {
    return this.api.url(`${this.api.launchUrl}/enroll`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  withFirstName(name) {
    return this.waitForElementVisible('@inputFirstName', 10000)
      ._setValue('@inputFirstName', name);
  },
  withMiddleName(name) {
    return this._setValue('@inputMiddleName', name);
  },
  withLastName(name) {
    return this._setValue('@inputLastName', name);
  },
  withPreferredName(name) {
    return this._setValue('@inputPreferredName', name);
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
  withSuffix(value) {
    return this._dropdownByName('suffix', value);
  },
  withSocialSecurity(value) {
    return this._setValue('@inputSocialSecurity', value);
  },
  withGender(index) {
    return this.clickVisible(`.switch-button .switch-button--item:nth-child(${index})`);
  },
  proceed() {
    return this.clickVisible('@btnSubmit');
  }
};

module.exports = {

  elements: {
    title: 'div.title',
    promoAbout: '.nav-item:nth-child(1) a',
    promoEnroll: '.nav-item:nth-child(2) a',
    promoEarnPoints: '.nav-item:nth-child(3) a',

    inputFirstName: 'input[name=firstName]',
    inputMiddleName: 'input[name=middleName]',
    inputLastName: 'input[name=lastName]',
    inputPreferredName: 'input[name=preferredName]',

    btnSubmit: 'button[type="submit"]'
  },

  commands: [enroll]
};
