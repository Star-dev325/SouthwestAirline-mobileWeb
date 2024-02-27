let checkIn, confirmation, destinationAddress, greenCard, navDraw, passportPage, travelDocument, visa;

module.exports = {
  before(client) {
    checkIn = client.page.checkIn();
    passportPage = client.page.passportPage();
    travelDocument = client.page.travelDocument();
    greenCard = client.page.greenCard();
    destinationAddress = client.page.destinationAddress();
    visa = client.page.visa();
    confirmation = client.page.confirmation();
    navDraw = client.page.navDraw();

    client
      .init()
      .assert.title(client.globals.title);
  },
  'go to check in from Nav draw'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@CheckIn');
  },
  'Search for an international reservation'() {
    checkIn
      .withConfirmationNumber('MISAPI')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .saveSnapshot('fill reservation details')
      .continue();
  },
  'See the first passport page'() {
    passportPage
      .waitForElementPresent('@continueButton', 10000)
      .assert.urlContains('/check-in/1/passportPage')
      .saveSnapshot('passport details page');
  },
  'The first passenger Passport page'() {
    passportPage
      .withpassportNumber('666666666')
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
  'See the first travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/1/additional-passport-info');
  },
  'Go to destination address page'() {
    travelDocument
      .withDestinationAddress()
      .saveSnapshot('destination address page');
  },
  'Destination address page'() {
    destinationAddress
      .withCountry('Afghanistan - AF')
      .withSreetAddress('dallas')
      .withCity('dallas')
      .withState('dallas')
      .withZipCode('66666')
      .saveSnapshot('fill destination address page')
      .clickDoneButton();
  },
  'Back to the first travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/1/additional-passport-info');
  },
  'Go to the second passenger page'() {
    travelDocument
      .clickCheckInButton();
  },
  'See the second passport page'() {
    passportPage
      .waitForElementPresent('@passportNumber', 10000)
      .assert.urlContains('/check-in/2/passportPage');
  },
  'The Second passenger Passport page'() {
    passportPage
      .withpassportNumber('666666666')
      .withYear(2023)
      .withDay(23)
      .withPhoneNumber('2345678901')
      .withName('test')
      .choosePassportWasIssuedBy('United States of America - US')
      .chooseNationality('China - CN')
      .chooseResidence('United States of America - US')
      .continue();
  },
  'See the second travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/2/additional-passport-info');
  },
  'Go to green card page'() {
    travelDocument
      .withGreenCard()
      .saveSnapshot('green card page');
  },
  'Green Card Page'() {
    greenCard
      .withType()
      .withNumber('666aaabbb')
      .withCountryIssuedBy('United States of America - US')
      .withYear('2023')
      .saveSnapshot('fill green card Page')
      .clickDoneButton();
  },
  'Back the second travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/2/additional-passport-info');
  },
  'Go to the third passenger page'() {
    travelDocument
      .clickCheckInButton();
  },
  'See the third passport page'() {
    passportPage
      .waitForElementPresent('@continueButton', 10000)
      .assert.urlContains('/check-in/3/passportPage');
  },
  'The third passenger Passport page'() {
    passportPage
      .chooseResidence('China - CN')
      .withPhoneNumber('2345678901')
      .withName('test')
      .continue();
  },
  'See the third travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/3/additional-passport-info');
  },
  'See the visa page'() {
    travelDocument
      .withVisa()
      .saveSnapshot('visa page');
  },
  'Visa page'() {
    visa
      .withVisaNumber('6666666666')
      .withVisaCountry('United States of America - US')
      .withCountryIssuedBy('United States of America - US')
      .withYear('2023')
      .withMonth('10')
      .withDay('10')
      .saveSnapshot('fill visa page')
      .clickDoneButton();
  },
  'Back the third travel document page'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/3/additional-passport-info');
  },
  'Go to second destination address page'() {
    travelDocument
      .withDestinationAddress();
  },
  'second destination address page'() {
    destinationAddress
      .withCountry('Afghanistan - AF')
      .withSreetAddress('dallas')
      .withCity('dallas')
      .withState('dallas')
      .withZipCode('66666')
      .saveSnapshot('fill destination address page')
      .clickDoneButton();
  },
  'Back the third travel document page again'() {
    travelDocument
      .waitForElementPresent('@checkInButton', 10000)
      .assert.urlContains('/check-in/3/additional-passport-info');
  },
  'go to confirmation page'() {
    travelDocument
      .clickCheckInButton()
      .saveSnapshot('confirmation page');
  },
  'Check in confirmation page'() {
    confirmation
      .waitForElementVisibleWithDefaultTimeout('@checkInDocuments')
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .saveSnapshot('checkin confirmation page');
  },
  after(client) {
    client.end();
  }
};
