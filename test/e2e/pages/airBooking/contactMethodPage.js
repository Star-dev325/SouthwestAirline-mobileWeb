const page = {
  clickDeclineNotifications() {
    return this.clickVisible('@declineNotificationsButton');
  },

  withTextMe(value) {
    this.clickVisible('@textMe');

    return this.clickVisible('@phoneNumber')
      .setValueVisible('@phoneNumber', value);
  },

  withEmailMe(value) {
    this.clickVisible('@emailMe');

    return this.clickVisible('@email')
      .setValueVisible('@email', value);
  },

  saveNewContactMethod() {
    return this.clickVisible('@doneButton');
  }
};

module.exports = {
  elements: {
    declineNotificationsButton: '.contact-method--radio-button .radio-input--mark',
    declinedNotifications: '.contact-method--decline-notifications',
    textMe: '.contact-method-options li:first-child',
    emailMe: '.contact-method-options li:nth-child(2)',
    doneButton: '.action-bar--right-buttons button',
    message: '.day-of-travel-message',
    messageInt: '.int-message',
    phoneNumber: 'input[name=phoneNumber]',
    email: 'input[name=email]'
  },

  commands: [page]
};
