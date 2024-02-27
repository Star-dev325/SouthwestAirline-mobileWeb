const Analytics = require('test/e2e/analytics/analytics');

let flight, login, navDraw, passenger, passengerEdit, purchaseConfirmation, purchaseSummary, specialAssistance, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    purchaseSummary = client.page.purchaseSummary();
    login = client.page.login();
    purchaseConfirmation = client.page.purchaseConfirmation();
    specialAssistance = client.page.specialAssistance();
    passengerEdit = client.page.passengerEdit();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Find one-way flight from Austin to Atlanta'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Check reprice / price summary and continue'() {
    summary
      .continue()
      .continue();
  },

  'Enter passenger details'() {
    passenger
      .waitForElementVisible('@loginBanner', 10000)
      .clickVisible('@loginBanner');
  },

  'Login with Account'(client) {
    login
      .waitForElementPresent('@loginPage', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();
  },

  'Go back to passenger page and select Special Assistance'(client) {
    client.back();
    passenger.clickSpecialAssistance();
  },

  'Verify analytics SpecialAssistanceStore.selectionMade'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(false);
    });
  },

  'Add Special Assistance options'() {
    specialAssistance
      .selectBlind()
      .saveSASelections();

    passenger
      .waitForElementVisible('form.passenger-personal-info-form', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .clickSpecialAssistance();
  },

  'Analytics selectionMade should be true now'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(true);
    });
  },

  'Remove all Special Assistance options'() {
    specialAssistance
      .selectBlind()
      .saveSASelections();

    passenger
      .waitForElementVisible('form.passenger-personal-info-form', 10000)
      .checkSpecialAssistanceNavItemMessage('(Optional)')
      .clickSpecialAssistance();
  },

  'Replace the removed Special Assistance options'(client) {
    specialAssistance
      .selectBlind()
      .selectPeanutAllergy()
      .selectWheelchairAssistanceToGate()
      .selectSpillableBatteryWheelchair()
      .selectBatteryNumber(2)
      .saveBatterySelection()
      .saveSASelections();

    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(true);
    });

    passenger
      .waitForElementVisible('form.passenger-personal-info-form', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .continue();
  },

  'Analytics selectionMade should be false again after leaving passenger page'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(false);
    });
  },

  'Change Special Assistance selection from purchaseSummary passenger edit'() {
    purchaseSummary.openPassengerEdit();
    passengerEdit.clickSpecialAssistance();

    specialAssistance
      .selectBlind()
      .selectNonSpillableBatteryWheelchair()
      .selectBatteryNumber(2)
      .saveBatterySelection()
      .saveSASelections();

    passengerEdit.clickDone();
  },

  'Purchase flight'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .purchase();
  },

  'On confirmation Page'() {
    purchaseConfirmation
      .verify.urlContains('air/booking/confirmation')
      .checkBookResultMessage('Your trip is booked!')
      .checkSpecialAssistanceConfirmationMessage('Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.');
  },

  after(client) {
    client.end();
  }
};
