const page = {
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[name*="${key}"]`, 10000)
      .clickVisible(`select[name*="${key}"] option[value="${value}"]`);
  },
  withStreetAddress(value) {
    return this.setValueVisible('@inputAddress1', value);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  withZipCode(value) {
    return this._setValue('@inputPostcode', value);
  },
  withCity(value) {
    return this._setValue('@inputCity', value);
  },
  withRegion(value) {
    return this._setValue('@inputRegion', value);
  },
  withPhoneNumber(value) {
    return this._setValue('@inputPhoneNumber', value);
  },
  withEmail(value) {
    return this._setValue('@inputEmail', value)
      ._setValue('@inputConfirmedEmail', value);
  },
  proceed() {
    return this
      .clickVisible('@buttonSubmit')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {

  elements: {
    title: 'div.title',
    inputAddress1: 'input[name=addressLine1]',
    inputAddress2: 'input[name=addressLine2]',
    inputPostcode: 'input[name=zipOrPostalCode]',
    inputCity: 'input[name=city]',
    inputRegion: 'input[name=stateProvinceRegion]',
    inputPhoneNumber: 'input[name=phoneNumber]',
    inputEmail: 'input[name=email]',
    inputConfirmedEmail: 'input[name=confirmedEmail]',
    buttonSubmit: 'button[type="submit"]'
  },

  commands: [page]
};
