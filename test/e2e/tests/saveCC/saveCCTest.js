/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-118083 */
// const creditCardsService = require('test/e2e/helpers/creditCardsService');

// let login;
// let navDraw;
// let airBooking;
// let summary;
// let address;
// let payment;
// let purchaseSummary;
// let purchaseConfirmation;
// let contactMethodPage;

// module.exports = {
//   '@tags': ['flaky'],
//   before(client) {
//     login = client.page.login();
//     navDraw = client.page.navDraw();
//     airBooking = client.page.flight();
//     summary = client.page.summary();
//     payment = client.page.payment();
//     purchaseSummary = client.page.purchaseSummary();
//     contactMethodPage = client.page.contactMethodPage();
//     purchaseConfirmation = client.page.purchaseConfirmation();
//     address = client.page.address();

//     client
//       .init()
//       .verify.title(client.globals.title);
//   },

//   'Go to air booking from nav drawer'() {
//     navDraw.openMenu().bookAFlight();
//   },

//   'Login user and reset saved credit card'(client, done) {
//     login.withDefaults('thehack2', 'Test1234');
//     creditCardsService.resetUserCreditCards(client.globals.DYSON_PORT).then(done, done);
//   },

// 'save new credit card when do air booking'(client) {
//   airBooking
//     .fromAirport(client.globals.airport.DallasLoveField)
//     .toAirport(client.globals.airport.Austin)
//     .continue()
//     .withFlightFare(1, airBooking.fare.wannaGetAway)
//     .withFlightFare(2, airBooking.fare.wannaGetAway)
//     .waitForElementNotVisible('.dimmer', 10000);

//   summary.continue();

//   purchaseSummary
//     .continueForAuthenticatedPurchase()
//     .clickContactMethod();

//   contactMethodPage
//     .withEmailMe('yzeng@gmail.com')
//     .saveNewContactMethod();

//   purchaseSummary
//     .openPaymentEdit();

//   payment
//     .selectUseNewCreditCard()
//     .withCardNumber('4111111111111234')
//     .withNameOnCard('Test name')
//     .withExpirationDateMonth(10)
//     .withExpirationDateYear(2030)
//     .withSecurityCode('123');

//   const data = client.globals.address.uk;

//   address
//     .withCountry(address.country.unitedKingdom)
//     .withStreetAddress(data.street)
//     .withZipCode(data.postcode)
//     .withCity(data.city)
//     .withRegion(data.region)
//     .withPhoneNumber(data.phoneNumber);

//   payment
//     .selectSaveCreditCard();
//   payment.saveSnapshot('use new credit card and save it')
//     .clickDone();
//   purchaseSummary
//     .waitForElementNotVisible('.dimmer', 10000)
//     .purchase();
//   purchaseConfirmation
//     .waitForElementNotVisible('.dimmer', 10000)
//     .checkBookResultMessage('Your trip is booked!');
// },

//   after(client) {
//     client.end();
//   }
// };
