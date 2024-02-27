const sessionExpired = {
  clickSessionExpiredConfirm() {
    return this.clickVisible('@sessionExpiredConfirmButton');
  }
};

module.exports = {
  elements: {
    sessionExpiredConfirmButton: '.popup-buttons--horizontal .button-popup_horizontal.confirm-button',
    sessionExpiredLoginForm: 'form[name="sessionExpiredLogin"]'
  },

  commands: [sessionExpired]
};
