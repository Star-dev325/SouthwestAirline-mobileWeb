const page = {
  country: {
    unitedKingdom: 222,
    unitedStatesAmerica: 1
  },
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[name*="${key}"]`, 10000)
      .clickVisible(`select[name*="${key}"] option[value="${value}"]`);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  openCountryCodeSelector() {
    return this.clickVisible('@isoCountryCode')
      .waitForElementPresent('@searchableList', 10000);
  },
  withCountry(index) {
    return this.openCountryCodeSelector().clickVisible(`.searchable-list-code--item:nth-child(${index})`);
  },
  withStreetAddress(value) {
    return this._setValue('@inputAddress1', value);
  },
  withZipCode(value) {
    return this._setValue('@inputZipCode', value);
  },
  withCity(value) {
    return this._setValue('@inputCity', value);
  },
  withState(value) {
    return this.waitForElementVisible('select[placeholder*="State"]', 10000)
      .clickVisible(`select[placeholder*="State"] option[value="${value}"]`);
  },
  withRegion(value) {
    return this._setValue('@inputRegion', value);
  },
  withPhoneNumber(value) {
    return this._setValue('@inputPhoneNumber', value);
  },
  continue() {
    return this.clickVisible('@buttonContinue');
  },
  submit() {
    return this.clickVisible('@doneButton');
  }
};

module.exports = {

  elements: {
    isoCountryCode: 'div.country-code-nav-item-field',
    inputAddress1: 'input[name=addressLine1]',
    inputAddress2: 'input[name=addressLine2]',
    inputZipCode: 'input[name=zipOrPostalCode]',
    inputCity: 'input[name=city]',
    inputRegion: 'input[name=stateProvinceRegion]',
    inputPhoneNumber: 'input[name=phoneNumber]',
    buttonContinue: 'button.continue',
    doneButton: 'button[type=submit]',
    searchableList: 'div.searchable-list'
  },

  commands: [page]
};
