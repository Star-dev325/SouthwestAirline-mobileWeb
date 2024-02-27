let navDraw, tripDetails, viewReservation, viewReservationPassportPage;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    navDraw = client.page.navDraw();
    viewReservationPassportPage = client.page.viewReservationPassportPage();
    client
      .init()
      .assert.title(client.globals.title);
    navDraw
      .openMenu()
      .viewReservations();
  },
  'Find flight reservation through confirmation number'() {
    viewReservation.withConfirmationNumber('INTEMT')
      .withFirstName('Fang')
      .withLastName('Fang')
      .continue();
  },
  'Verify view trip details page and passport status'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.urlContains('/view-reservation/trip-details')
      .passportIncompleted()
      .saveSnapshot('view reservation details page');
  },
  'Go to passport page'() {
    tripDetails
      .clickPassengerName();
  },
  'See passport page'() {
    viewReservationPassportPage
      .waitForElementPresent('@saveButton', 10000)
      .assert.urlContains('/view-reservation/trip-details/travel-info-page/')
      .saveSnapshot('passport details page');
  },
  'Fill the Passport page'() {
    viewReservationPassportPage
      .withpassportNumber('6666abcd')
      .withYear(2023)
      .withDay(23)
      .withPhoneNumber('2345678901')
      .withName('test')
      .choosePassportWasIssuedBy('United States of America - US')
      .chooseNationality('Italy - IT')
      .chooseResidence('China - CN')
      .saveSnapshot('fill passport details page')
      .continue();
  },
  'Verify back to view trips details page and passport status'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.urlContains('/view-reservation/trip-details')
      .passportCompleted()
      .saveSnapshot('back to view reservation details page');
  },
  after(client) {
    client.end();
  }
};
