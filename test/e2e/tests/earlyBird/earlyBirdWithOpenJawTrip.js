'use strict';

let address, detail, earlyBirdCheckIn, earlyBirdConfirmation, navDraw, payment, review;

module.exports = {
  before(client) {
    earlyBirdCheckIn = client.page.earlyBirdCheckIn();
    detail = client.page.detail();
    review = client.page.review();
    payment = client.page.payment();
    address = client.page.address();
    earlyBirdConfirmation = client.page.earlyBirdConfirmation();
    navDraw = client.page.navDraw();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'go to early bird from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },
  'On earlyBird checkIn page'() {
    earlyBirdCheckIn.waitForElementVisible('@earlyBirdCheckInBanner', 1000)
      .assert.containsText('@pageHeader', 'EarlyBird Check-In')
      .assert.containsText('@loginButton', 'Log in')
      .assert.containsText('@retrieveReservation', 'Retrieve reservation')
      .expect.element('@loginButton').text.to.not.contain('Enroll');
  },

  'Search for a reservation'() {
    earlyBirdCheckIn
      .withConfirmationNumber('KUO3NN')
      .withFirstName('T')
      .withLastName('Liu')
      .continue();
  },

  'Verify details page'() {
    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .assert.containsText('@continueButton', 'Continue')
      .assert.containsText('@pageHeader', 'Add EarlyBird Check-In')
      .assert.containsText('@loginButton', 'Log in')
      .assert.containsText('@earlyBirdReviewPricingBanner', 'EarlyBird Check-In®')
      .assert.containsText('@dateDuration', 'Oct 24 - 26')
      .assert.containsText('@destinationCity', 'Dallas (Love Field)')
      .assert.containsText('@totalPrice', '45.00')
      .expect.element('@loginButton').text.to.not.contain('Enroll');
  },

  'Back to previous page and continue'(client) {
    client.back();
    earlyBirdCheckIn
      .waitForElementVisible('@earlyBirdCheckInBanner', 1000)
      .continue();
    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .assert.containsText('@totalPrice', '45.00');
  },

  'Back to previous page and forward'(client) {
    client.back();
    client.forward();
    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .assert.containsText('@totalPrice', '45.00');
  },

  'Go to review page'() {
    detail
      .continue();
  },

  'Verify review page'() {
    review
      .assert.containsText('@purchaseSubTitle', 'Purchase')
      .assert.containsText('@totalPrice', '45.00')
      .assert.containsText('@purchaseButton', 'Purchase')
      .waitForElementPresent('@termsAndConditionsLink', 10000)
      .waitForElementPresent('@privacyPolicyLink', 10000)
      .waitForElementPresent('@contractOfCarriageLink', 10000);
  },

  'Go to pricing page'() {
    review
      .goPaymentPage();
  },

  'Fill payment info'(client) {
    payment.selectUseNewCreditCard();
    const data = client.globals.address.us;

    payment
      .withCardNumber('4444331850431111')
      .withNameOnCard('Test name')
      .withExpirationDateMonth(1)
      .withExpirationDateYear(2030)
      .withSecurityCode('123');

    address
      .withStreetAddress(data.street)
      .withZipCode(data.zipcode)
      .withCity(data.city)
      .withState(data.state)
      .withPhoneNumber(data.phoneNumber)
      .submit();
  },

  'Verify filled purchase info'() {
    review
      .waitForElementPresent('@purchaseButton', 10000)
      .assert.containsText('@creditCardShortMsg', 'Visa\nLast 4 digits:\n1111');
  },

  'Purchase for earlybird'() {
    review.purchase();
  },

  'Verified confirmation page'(client) {
    earlyBirdConfirmation
      .waitForElementPresent('@iconCheck', 10000)
      .assert.urlEquals(`${client.launch_url}/earlybird/checkin/KUO3NN/confirmation`)
      .assert.containsText('@confirmationText', 'EarlyBird Check-In® added for the following flights and passengers.')
      .assert.containsText('@confirmationNumber', 'KUO3NN')
      .assert.containsText('@departDate', 'Wed, Oct 24, 2018')
      .assert.containsText('@totalPrice', '45.00')
      .waitForElementPresent('@visaImage', 10000)
      .assert.containsText('@visaName', 'VISA')
      .assert.containsText('@visaLast4Digits', '9999')
      .assert.containsText('@cardHolder', 'Li Rui')
      .assert.containsText('@amountApplied', '45.00')
      .assert.containsText('@billingAddress', '677 Main St\nBrooklyn, NY US 53605')
      .waitForElementPresent('@homeLink', 10000)
      .waitForElementPresent('@contactUsLink', 10000)
      .waitForElementPresent('@checkinAndRefundInformationLink', 10000)
      .waitForElementPresent('@conditionOfContractLink', 10000);
  },

  'Go back to home'(client) {
    client.back();
    client.assert.urlEquals(`${client.launch_url}/`);
  },

  after(client) {
    client.end();
  }
};
