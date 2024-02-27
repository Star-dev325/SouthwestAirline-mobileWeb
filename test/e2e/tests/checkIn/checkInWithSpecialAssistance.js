let boardingPass, checkIn, confirmation, hazmatDeclaration, login, navDraw;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    navDraw = client.page.navDraw();
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    login = client.page.login();
    boardingPass = client.page.boardingPass();
    hazmatDeclaration = client.page.hazmatDeclaration();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'go to check in'() {
    navDraw
      .openMenu()
      .checkIn();
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementVisible('.reservation-retrieval-form', 10000);
  },

  'Search for a reservation'() {
    checkIn
      .withConfirmationNumber('SPESHL')
      .withFirstName('SA Passenger')
      .withLastName('Checkinson')
      .continue();
  },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .checkSpecialAssistanceConfirmationMessage('Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.');
  },

  'Go to Mobile Boarding Pass'() {
    checkIn
      .viewBoardingPass();
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Mobile boarding pass page has Special Assistance SSR'() {
    boardingPass
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .assert.containsText('#special-assistance', 'INFT');
  },

  after(client) {
    client.end();
  }
};
