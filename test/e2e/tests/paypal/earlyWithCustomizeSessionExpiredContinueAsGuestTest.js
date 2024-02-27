let detail, earlyBirdCheckIn, earlyBirdConfirmation, homePage, login, navDraw, paymentEdit, review;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    earlyBirdCheckIn = client.page.earlyBirdCheckIn();
    detail = client.page.detail();
    review = client.page.review();
    paymentEdit = client.page.shared.paymentEdit();
    navDraw = client.page.navDraw();
    login = client.page.login();
    earlyBirdConfirmation = client.page.earlyBirdConfirmation();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'Login user to do authenticated purchase'(client) {
    homePage.goToLogin();

    login
      .waitForElementPresent('@subTitle', 10000)
      .waitForElementPresent('@rememberMeBox', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'go to early bird from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },

  'Search for a reservation'() {
    earlyBirdCheckIn
      .withConfirmationNumber('NALVRY')
      .withFirstName('I')
      .withLastName('Li')
      .continue();
  },

  'Go to purchase review page'() {
    detail
      .continue();
  },

  'Choose PayPal to purchase'() {
    review.goPaymentPage();

    paymentEdit.clickPayPalCard();
  },

  'Purchase with PayPal'() {
    review
      .waitForElementPresent('@yourTripTitle', 10000)
      .purchase();
  },

  'Purchase success'(client) {
    earlyBirdConfirmation
      .waitForElementPresent('@iconCheck', 10000)
      .assert.urlEquals(`${client.launch_url}/earlybird/checkin/ABC123/confirmation`)
      .assert.elementPresent('@paypalImage');
  },

  'go to early bird from nav drawer again'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },

  'Re-search for a reservation '() {
    earlyBirdCheckIn
      .withConfirmationNumber('NALVRY')
      .withFirstName('I')
      .withLastName('Li')
      .continue();
  },

  'Then go to purchase review page'() {
    detail
      .continue();
  },

  'And choose PayPal to purchase'() {
    review.goPaymentPage();

    paymentEdit.clickPayPalCard();
  },

  'purchase with PayPal when login session timeout'(client) {
    review
      .waitForElementPresent('@yourTripTitle', 10000)
      .purchase();

    earlyBirdConfirmation
      .waitForElementPresent('@iconCheck', 10000)
      .assert.urlEquals(`${client.launch_url}/earlybird/checkin/ABC123/confirmation`)
      .assert.elementPresent('@paypalImage');
  },

  after(client) {
    client.end();
  }
};
