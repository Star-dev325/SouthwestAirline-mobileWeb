'use strict';

let homePage;
let myAccount;
let upcomingTripList;
let tripDetails;
let login;
let navDraw;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    myAccount = client.page.myAccount();
    tripDetails = client.page.tripDetails();
    upcomingTripList = client.page.upcomingTripList();
    login = client.page.login();
    navDraw = client.page.navDraw();

    homePage.open()
      .assert.title(client.globals.title);

    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementVisibleWithDefaultTimeout('.home-and-nav');
  },

  'Go MyAccount home page then Upcoming Trips'() {
    navDraw
      .openMenu().myAccount();

    myAccount.tapTripsNumber();
  },

  'Upcoming trips Page then Tap Reaccom PNR ERSS1A Details Button'() {
    upcomingTripList
      .waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .tapDetailsButtonForCard(18);
  },

  'Verify flight trip details page'() {
    tripDetails._isVisible();

    tripDetails
      .assert.urlContains('/my-account/upcoming-trip-details/17?recordLocator=ERSS1A')
      .assert.containsText('@pageHeader', 'AUS - BDL')
      .assert.containsText('@tripDetailsCard', 'ERSS1A')
      .assert.containsText('@tripDetailsCard', 'Test Wang')
      .assert.containsText('@tripDetailsCard', '601143885')
      .assert.containsText('@cancelButton', 'Cancel')
      .assert.containsText('@changeButton', 'Change')
      .saveSnapshot('on up reaccom flight detail page');
  },

  after(client) {
    client.end();
  }
};
