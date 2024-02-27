'use strict';
const Analytics = require('test/e2e/analytics/analytics');

let address, companionConfirmation, companionPassenger, companionPrice, companionPurchase,
  contactMethodPage, homePage, login, navDraw,
  payment,
  purchaseSummary,
  tripDetails, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    companionPrice = client.page.companionPrice();
    companionPassenger = client.page.companionPassenger();
    address = client.page.address();
    payment = client.page.payment();
    companionPurchase = client.page.companionPurchase();
    contactMethodPage = client.page.contactMethodPage();
    companionConfirmation = client.page.companionConfirmation();
    purchaseSummary = client.page.purchaseSummary();

    homePage.open()
      .assert.title(client.globals.title);
    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementNotVisible('.dimmer', 10000);
  },
  'Go to view reservation page from navDraw'() {
    navDraw.openMenu().viewReservations();
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
      .assert.urlContains('/companion/pricing')
      .assert.containsText('@totalInfo', 'TOTAL')
      .assert.containsText('@totalInfo', '11.20')
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify analytics CompanionBookingStore.pricing'(client) {
    Analytics.verifyStore(client, 'CompanionBookingStore/pricing', (companionBookingStore) => {
      companionBookingStore.pricing.should.eql(require('test/e2e/analytics/expectations/companion/pricing.json'));
    });
  },

  'View companion passenger page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .assert.urlContains('/companion/passenger')
      .assert.containsText('@companionPersonalInfo', 'Companion Fang PHD')
      .assert.containsText('@companionPersonalInfo', '2/05/1995')
      .assert.containsText('@companionPersonalInfo', 'F')
      .assert.containsText('@contactMethod', 'Call, (1) 654-987-3215')
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  'View companion payment page'() {
    purchaseSummary.openPaymentEdit();
  },
  'Use new credit card'() {
    payment
      .selectUseNewCreditCard();
  },
  'Input card info'(client) {
    payment
      .withCardNumber('4123456789012345')
      .withNameOnCard('Test name')
      .withExpirationDateMonth(1)
      .withExpirationDateYear(2030)
      .withSecurityCode('123');
    client.assert.value('.grouped:nth-child(1) div:nth-child(2) input', 'XXXXXXXXXXXX2345');
  },

  'Input UK billing address'(client) {
    const data = client.globals.address.uk;

    address
      .withCountry(address.country.unitedKingdom)
      .withStreetAddress(data.street)
      .withZipCode(data.postcode)
      .withCity(data.city)
      .withRegion(data.region)
      .withPhoneNumber(data.phoneNumber)
      .submit()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion purchase page'() {
    companionPurchase
      .waitForElementVisible('@companionPurchase', 10000)
      .assert.elementNotPresent('@securityCodeHeader')
      .assert.urlContains('/companion/purchase')
      .assert.containsText('@tripSummary', 'Mar 2')
      .assert.containsText('@tripSummary', 'Mar 5')
      .assert.containsText('@titleAndPrice', '1 Passenger Total')
      .assert.containsText('@titleAndPrice', '11.20')
      .assert.containsText('@companionPassengerName', 'Companion Fang')
      .assert.containsText('@contactMethod', 'Call, (1) 654-987-3215')
      .assert.containsText('@paymentEditTab', 'Visa\nLast 4 digits:\n2345');
  },

  'Select business as purpose of travel on purchase review page'() {
    companionPurchase
      .clickVisible('@purposeOfTravel')
      .clickVisible('@businessTravel', 10000);
  },
  'Enter into trip and price details page'(client) {
    companionPurchase
      .clickVisible('@tripPriceDetailsLink', 10000);

    client
      .waitForElementVisible('.trip-and-price-details', 10000)
      .assert.urlContains('/companion/review')
      .assert.containsText('.flight-summary-departing', 'Departing')
      .assert.containsText('.flight-summary-departing', 'Fri, Mar 2, 2018')
      .assert.containsText('.flight-summary-returning', 'Returning')
      .assert.containsText('.flight-summary-returning', 'Mon, Mar 5, 2018')
      .assert.containsText('.page-header', 'Trip and Price Details')
      .assert.containsText('.page-header', 'Done')
      .clickVisible('.action-bar--right-buttons', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Business remains selected as purpose of travel after back to purchase review page'() {
    companionPurchase
      .assert.value('@purposeOfTravel', 'BUSINESS');
  },
  'Enter into contact method page'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@contactMethod', 10000);

    client
      .assert.urlContains('/companion/contact-method')
      .assert.containsText('.action-bar--main-title', 'Contact Method')
      .assert.containsText('.contact-method-options li:first-child', 'Text')
      .assert.containsText('.action-bar--right-buttons button', 'Done')
      .assert.containsText('.contact-method-options li:nth-child(2)', 'Call')
      .assert.containsText('.contact-method-options li:nth-child(3)', 'Email');

    contactMethodPage.saveNewContactMethod();
  },
  'Enter into passenger edit page'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@passengerInfoSummaryLink', 10000);

    client
      .waitForElementVisible('.companion-personal-form', 10000)
      .assert.urlContains('/companion/passengerEdit')
      .assert.containsText('.companion-personal-info', 'Companion Fang')
      .assert.containsText('.companion-personal-info', '2/05/1995')
      .assert.containsText('.companion-personal-info', 'F')
      .assert.containsText('.page-header', 'Passenger')
      .assert.containsText('.page-header', '1 of 1')
      .assert.containsText('.page-header', 'Done')
      .clickVisible('.action-bar--right-buttons', 10000);
  },

  'Enter into payment edit page'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@paymentEditTab', 10000);

    client
      .waitForElementVisible('.payment-form', 10000)
      .assert.urlContains('/companion/paymentEdit')
      .assert.containsText('.page-header', 'Payment')
      .assert.containsText('.page-header', 'Done');

    payment.withCardNumber('5555555555554444');

    client
      .clickVisible('.action-bar--right-buttons', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Back to purchase review page add earlybird check in and then click purchase button'() {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('@companionPurchase', 10000)
      .assert.containsText('@paymentEditTab', 'MasterCard\nLast 4 digits:\n4444')
      .assert.elementPresent('@addEarlyBirdCheckIn')
      .assert.containsText('@addEarlyBirdCheckIn', 'ADD EARLYBIRD CHECK-IN')
      .addEarlyBirdInPath()
      .showFareBreakdown()
      .clickVisible('@purchaseButton', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify analytics CompanionBookingStore.review'(client) {
    Analytics.verifyStore(client, 'CompanionBookingStore/review', (companionBookingStore) => {
      companionBookingStore.review.should.eql(require('test/e2e/analytics/expectations/companion/review.json'));
    });
  },

  'View confirmation page and verify EarlyBird Check-In'() {
    companionConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@popUpHeader', 'EarlyBird Check-In® was not added successfully')
      .assert.containsText('@popUpBody', 'Your trip has been booked, but we were unable to add EarlyBird Check-In®.')
      .clickVisible('@popUpButton', 1000)
      .waitForElementVisible('@companionConfirmation', 10000)
      .assert.urlContains('/companion/confirmation')
      .assert.containsText('@pageHeader', 'Confirmation')
      .assert.containsText('@tripBooked', 'Your Companion has been added')
      .assert.containsText('@tripBooked', 'The earlier you check in, the better your seat selection')
      .assert.containsText('@tripBriefInfo', 'Mar 18')
      .assert.containsText('@tripBriefInfo', 'Austin')
      .assert.containsText('@tripBriefInfo', 'Jab Met')
      .assert.containsText('@tripBriefInfo', 'N9GBP5');
  },

  after(client) {
    login.logout();
    client.end();
  }
};
