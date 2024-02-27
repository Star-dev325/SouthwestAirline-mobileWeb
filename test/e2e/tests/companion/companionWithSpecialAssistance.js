let companionConfirmation, companionPassenger, companionPrice, companionPurchase, login, navDraw, specialAssistance, tripDetails, viewReservation;

module.exports = {
  before(client) {
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    companionPrice = client.page.companionPrice();
    companionPassenger = client.page.companionPassenger();
    companionPurchase = client.page.companionPurchase();
    companionConfirmation = client.page.companionConfirmation();
    specialAssistance = client.page.specialAssistance();

    client
      .init()
      .verify.title(client.globals.title);
    client.waitForElementNotVisible('.dimmer', 10000);
    login
      .withDefaults('thehack2', 'Test1234')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to view reservation page'() {
    navDraw
      .openMenu()
      .viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('ADDCOM')
      .withFirstName('TEST')
      .withLastName('WANG')
      .continue();
  },

  'Verify trip details page'() {
    tripDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .addCompanion()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion price page'() {
    companionPrice
      .waitForElementVisible('@companionPricing', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion passenger page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .clickSpecialAssistance();
  },

  'Add Special Assistance options'() {
    specialAssistance
      .selectBlind()
      .saveSASelections();
  },

  'Check passenger page and go to purchase page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Enter into passenger edit page'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@passengerInfoSummaryLink', 10000)
      .waitForElementVisible('.companion-personal-form', 10000);

    companionPassenger.checkSpecialAssistanceNavItemMessage('Some options selected');

    client
      .clickVisible('.action-bar--right-buttons', 10000);
  },

  'Click purchase button'() {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('@companionPurchase', 10000)
      .clickVisible('@purchaseButton', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View confirmation page'() {
    companionConfirmation
      .checkSpecialAssistanceConfirmationMessage('Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.');
  },

  after(client) {
    client.end();
  }
};
