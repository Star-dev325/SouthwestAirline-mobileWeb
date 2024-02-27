// 'use strict';
// let address, contactMethodPage,
//   flight, navDraw,
//   passenger, payment,
//   purchaseConfirmation, purchaseSummary, summary;
// const dayjs = require('dayjs');

// module.exports = {
//   before(client) {
//     flight = client.page.flight();
//     summary = client.page.summary();
//     navDraw = client.page.navDraw();
//     purchaseConfirmation = client.page.purchaseConfirmation();
//     payment = client.page.payment();
//     address = client.page.address();
//     purchaseSummary = client.page.purchaseSummary();
//     passenger = client.page.passenger();
//     contactMethodPage = client.page.contactMethodPage();
//     client.init();
//   },

//   'Go to air booking from nav drawer'() {
//     navDraw.openMenu().bookAFlight();
//   },

//   'Find flight for single passenger from Dallas to Austin selecting LFC'(client) {
//     flight
//       .fromAirport(client.globals.airport.DallasLoveField)
//       .toAirport(client.globals.airport.Austin)
//       .withCurrency(flight.currency.dollars)
//       .withPassenger(1)
//       .withLowFareCalendar();

//     flight.continue();
//   },

//   'Select low fare days'() {
//     const outboundDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
//     const tooFarOutboundDate = dayjs().add(7, 'day').format('YYYY-MM-DD');
//     const inboundDate = dayjs().add(5, 'days').format('YYYY-MM-DD');

//     flight
//       .clickLowFarePriceBar('outbound', tooFarOutboundDate)
//       .lowFareTooltipIsVisible();
//     flight.clickLowFarePriceBar('outbound', outboundDate);
//     flight.clickLowFarePriceBar('inbound', inboundDate);
//     flight.lowFareContinue();
//   },

//   'Select flight'() {
//     flight.waitForElementNotVisible('.dimmer', 10000);
//     flight
//       .withFlightFare(1, flight.fare.wannaGetAway, true);
//     flight.waitForElementNotVisible('.dimmer', 10000);
//     flight
//       .withFlightFare(1, flight.fare.wannaGetAway, true);
//   },

//   'Check reprice / price summary and continue'() {
//     summary
//       .continue()
//       .continue();
//   },

//   'Enter adult passenger details'() {
//     passenger
//       .withFirstName('Fisher')
//       .withLastName('King')
//       .withMonth(10)
//       .withDay(9)
//       .withYear(1984)
//       .withGender(passenger.gender.female)
//       .withReceiptEmail('test@test.com')
//       .continue();
//   },

//   'Fill payment information'(client) {
//     const ukAdress = client.globals.address.uk;

//     purchaseSummary.clickVisible('[data-qa="review-form--payment-method-nav-item"]');
//     payment.selectUseNewCreditCard();

//     address
//       .waitForElementVisible('@inputAddress1', 10000)
//       .withCountry(address.country.unitedKingdom)
//       .withStreetAddress(ukAdress.street)
//       .withZipCode(ukAdress.postcode)
//       .withCity(ukAdress.city)
//       .withRegion(ukAdress.region)
//       .withPhoneNumber(ukAdress.phoneNumber);

//     payment
//       .withCardNumber('4111111111111111')
//       .withNameOnCard('Test name')
//       .withExpirationDateMonth(10)
//       .withExpirationDateYear(2030)
//       .withSecurityCode('123')
//       .clickDone();
//   },

//   'Fill out contact information'() {
//     purchaseSummary.clickContactMethod();

//     contactMethodPage
//       .withEmailMe('a@gmail.com')
//       .saveNewContactMethod();
//   },

//   'Purchase flight'() {
//     purchaseSummary.purchase();
//   },

//   'On confirmation Page'() {
//     purchaseConfirmation
//       .waitForElementNotVisible('.dimmer', 10000)
//       .verify.urlContains('air/booking/confirmation')
//       .checkBookResultMessage('Your trip is booked!');
//   },

//   after(client) {
//     client.end();
//   }
// };
