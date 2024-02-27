let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let navDraw;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let paymentEdit;
let contactMethodPage;
let airChangeConfirmation;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangePricingSummary = client.page.airChangePricingSummary();
    airChangeReview = client.page.airChangeReview();
    paymentEdit = client.page.paymentEdit();
    contactMethodPage = client.page.contactMethodPage();
    airChangeConfirmation = client.page.airChangeConfirmation();
    navDraw = client.page.navDraw();

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'Go to view reservations from home page'() {
    navDraw.openMenu().viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('PAYPAL')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Select flight to change'() {
    airChangeSelect
      .selectOutboundFlight()
      .selectInboundFlight()
      .submit();
  },

  'Go the shopping page'() {
    airChangeShoppingSearch.submit();
  },

  'Select new flight'() {
    airChangeProductList
      .withChangeFlightFare(4, airChangeProductList.fare.businessSelect)
      .waitForElementNotVisible('.dimmer', 10000)
      .withChangeFlightFare(4, airChangeProductList.fare.businessSelect)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue on pricing page'() {
    airChangePricingSummary
      .continue();
  },

  'Choose PayPal as payment'() {
    airChangeReview.openPaymentEdit();
    paymentEdit.clickPayPalCard();

    airChangeReview
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('[data-qa="review-form--payment-card"]', 'PayPal');
  },

  'Continue to purchase with PayPal'() {
    airChangeReview.clickNewContactMethod();

    contactMethodPage
      .withTextMe('4694323678')
      .saveNewContactMethod();

    airChangeReview.submit();
  },

  'Purchase success with PayPal'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .assert.urlContains('air/change/confirmation')
      .assert.elementPresent('@paypalImage');
  },

  after(client) {
    client.end();
  }
};
