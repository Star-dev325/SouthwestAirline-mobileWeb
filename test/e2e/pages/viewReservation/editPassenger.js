const editPassenger = {
  openEditPassengerPage() {
    return this.clickVisible('@editPassengerIcon')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  saveUpdatedPassengerInfo() {
    return this.clickVisible('@saveButton');
  },
  checkDisabledFields() {
    this.expect.element('@gender').to.not.be.enabled;
    this.expect.element('@dateOfBirth').to.not.be.enabled;
    this.expect.element('@suffix').to.not.be.enabled;

    return this;
  },
  checkMaskedFields() {
    this.assert.value('@gender', 'On File');
    this.getValue('@dateOfBirth', function(dateOfBirth) {
      this.assert.equal(dateOfBirth.value.slice(dateOfBirth.value.length - 4), 'XXXX');
    });

    return this;
  },
  editPassengerNames() {
    this.setValueVisible('@firstName', 'a');
    this.setValueVisible('@middleName', 'b');
    this.setValueVisible('@lastName', 'c');

    return this;
  },

  editPassengerPageUrl: '/view-reservation/trip-details/travel-info-page/2',
  viewReservationDetailsUrl: '/view-reservation/trip-details',
  viewReservationUrl: '/view-reservation'
};

module.exports = {
  elements: {
    cancel: '.action-bar-buttons--item button',
    dateOfBirth: 'input[name=dateOfBirth]',
    editPassengerIcon: '.passenger-reservation-info--passenger-name .icon_pencil',
    firstName: 'input[name=firstName]',
    gender: 'input[name=gender]',
    lastName: 'input[name=lastName]',
    middleName: 'input[name=middleName]',
    pageHeader: '.action-bar--main-title',
    popup: '.popup',
    popupNo: '.popup .confirm-button',
    popupYes: '.popup .close-button',
    saveButton: 'button[data-qa=form-submit-button]',
    suffix: 'input[name=suffix]'
  },

  commands: [editPassenger]
};
