'use strict';

let checkIn, confirmation, contactMethodPage, homePage, login, myAccount, navDraw, tripDetails, upcomingTripList, viewReservation;

module.exports = {
  '@tags': ['flaky'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    myAccount = client.page.myAccount();
    upcomingTripList = client.page.upcomingTripList();
    tripDetails = client.page.tripDetails();
    viewReservation = client.page.viewReservation();
    confirmation = client.page.confirmation();
    contactMethodPage = client.page.contactMethodPage();
    checkIn = client.page.checkIn();
  },

  'Go to view reservation page'() {
    homePage.open();
    navDraw.openMenu().viewReservations();
    viewReservation.assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #');
  },

  'Find flight reservation through confirmation number'() {
    viewReservation.withConfirmationNumber('INTCHC')
      .withFirstName('YANGJIE')
      .withLastName('LU')
      .continue();
  },

  'Verify view trip details page'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .waitForElementVisible('@viewBoardingPositionsButton', 10000);
  },

  'Go to boarding details page'() {
    tripDetails.clickVisible('@viewBoardingPositionsButton');
    confirmation.waitForElementVisible('@editContactLink', 10000);
  },

  'Click and go to edit contact method page'() {
    confirmation.clickVisible('@editContactLink');
    contactMethodPage.waitForElementVisible('@messageInt', 10000);
  },

  'Change contact method'() {
    contactMethodPage
      .withTextMe('1231231231')
      .saveNewContactMethod();
    confirmation.waitForElementVisible('@editContactLink', 10000);
  },

  'Go to edit contact method page'() {
    confirmation.clickVisible('@editContactLink');
    contactMethodPage.waitForElementVisible('@messageInt', 10000);
  },

  'Browser back to boarding details page'(client) {
    client.back();
    confirmation.waitForElementVisible('@editContactLink', 10000);
  },

  'Browser forward to contact method page'(client) {
    client.forward();
    contactMethodPage.waitForElementVisible('@messageInt', 10000);
  },

  'refresh on contact method to checkIn search reservation page'(client) {
    client.refresh();
    checkIn.waitForElementVisible('@confirmationNumber', 10000);
  },

  'Go again to view reservation page'() {
    homePage.open();
    navDraw.openMenu().viewReservations();
    viewReservation.assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #');
  },

  'Find flight reservation'() {
    viewReservation.withConfirmationNumber('INTCHC')
      .withFirstName('YANGJIE')
      .withLastName('LU')
      .continue();
  },

  'Verify day of travel contact method on trip details page'() {
    tripDetails.waitForElementVisibleWithDefaultTimeout('@dayOfTravelContactLink');
  },

  'click link to contact method page'() {
    tripDetails.clickVisible('@dayOfTravelContactLink');
    contactMethodPage.waitForElementVisible('@messageInt', 10000);
  },

  'refresh on contact method to view reservation search reservation page'(client) {
    client.refresh();
    viewReservation.waitForElementVisible('@confirmationNumber', 10000);
  },

  'login'(client) {
    homePage.open();
    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementVisibleWithDefaultTimeout('.home-and-nav');
  },

  'Go to MyAccount home page'() {
    navDraw
      .openMenu()
      .myAccount();
    myAccount
      .waitUpNextdisplay()
      .waitUpcomingTripsDisplay()
      .assert.containsText('@nextUpTripTitle', 'Austin');
  },

  'Clicking on next go to trip details'() {
    myAccount.tapNexUpcomingTrip();
    tripDetails.waitForElementVisibleWithDefaultTimeout('@dayOfTravelContactLink');
  },

  'Go to contact method page'() {
    tripDetails.clickVisible('@dayOfTravelContactLink');
    contactMethodPage.waitForElementVisible('@message', 10000);
  },

  'Browser back to trip details page'(client) {
    client.back();
    tripDetails.waitForElementVisibleWithDefaultTimeout('@dayOfTravelContactLink');
  },

  'Browser forward go to contact method page'(client) {
    client.forward();
    contactMethodPage.waitForElementVisible('@message', 10000);
  },

  'refresh on contact method to Upcoming trips page'(client) {
    client.refresh();
    upcomingTripList
      .waitForElementVisible('@upcomingTripList', 10000)
      .assert.urlContains('/my-account/upcoming-trips');
  },

  after(client) {
    client.end();
  }
};
