const page = {

  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  withUsername(value) {
    return this._setValue('@username', value);
  },
  withPassword(value) {
    return this._setValue('@password', value);
  },
  withConfirmpassword(value) {
    return this._setValue('@confirmpassword', value);
  },
  withsecurityQuestion1() {
    return this.clickVisible('@securityQuestion1');
  },
  selectFirstOfQuestionList1() {
    return this.clickVisible('@firstOfQuestionList1');
  },
  withsecurityAnswer1(value) {
    return this._setValue('@securityAnswer1', value);
  },

  withsecurityQuestion2() {
    return this.clickVisible('@securityQuestion2');
  },
  selectFirstOfQuestionList2() {
    return this.clickVisible('@firstOfQuestionList2');
  },

  withsecurityAnswer2(value) {
    return this._setValue('@securityAnswer2', value);
  },
  tapAcceptRegulations() {
    return this.clickVisible('@acceptRegulations');
  },
  tapCreateAccount() {
    return this.clickVisible('@createAccount')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    title: 'div.title',
    username: 'input[name="userName"]',
    password: 'input[name="password"]',
    confirmpassword: 'input[name="confirmedPassword"]',

    securityQuestion1: 'a[name="question1"]',
    firstOfQuestionList1: '.question-list-item-container:nth-child(1)',
    securityAnswer1: 'input[name="answer1"]',
    securityQuestion2: 'a[name="question2"]',
    firstOfQuestionList2: '.question-list-item-container:nth-child(1)',
    securityAnswer2: 'input[name="answer2"]',

    acceptRegulations: '.checkbox-button--mark',
    createAccount: 'button[type="submit"]'
  },

  commands: [page]
};
