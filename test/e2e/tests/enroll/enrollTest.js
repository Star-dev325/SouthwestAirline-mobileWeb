/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-115907 */
'use strict';

let address, contactInfo, enrollConfirmation, homePage, login, personalInfo, securityInfo;

module.exports = {
  '@tags': ['flaky'],
  before(client) {
    homePage = client.page.homePage();
    personalInfo = client.page.personalInfo();
    contactInfo = client.page.contactInfo();
    securityInfo = client.page.securityInfo();
    address = client.page.address();
    enrollConfirmation = client.page.enrollConfirmation();
    login = client.page.login();

    homePage.open()
      .verify.title(client.globals.title);
  },

  'go to enroll from homepage'() {
    login
      .clickVisible('@LoginLink')
      .clickVisible('@enrollButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Enter personal info'() {
    personalInfo
      .waitForElementPresent('@inputFirstName', 10000)
      .assert.containsText('@title', 'Personal Info')
      .withFirstName('Cannon')
      .withMiddleName('Boom')
      .withLastName('Biggs')
      .withPreferredName('Biggs')
      .withSuffix('MD')
      .withMonth(10)
      .withDay(12)
      .withYear(1987)
      .withGender(personalInfo.gender.male)
      .assert.containsText('@btnSubmit', 'Continue')
      .saveSnapshot('personal details')
      .proceed();
  },

  'Enter contact info'(client) {
    const data = client.globals.address.uk;

    contactInfo
      .waitForElementPresent('@inputAddress1', 10000)
      .assert.containsText('@title', 'Contact Info');

    address
      .withCountry(address.country.unitedKingdom)
      .withStreetAddress(data.street)
      .withZipCode('1111') // Needs dev fix
      .withCity(data.city)
      .withRegion(data.region)
      .withPhoneNumber(data.phoneNumber);

    contactInfo
      .withEmail('test@test.com')
      .assert.containsText('@buttonSubmit', 'Continue')
      .saveSnapshot('contact info')
      .proceed();
  },

  /* TODO: fix this flaky test (MOB-115907) */

  // 'Enter security info'(client) {
  //   securityInfo
  //     .waitForElementPresent('@username', 10000)
  //     .assert.containsText('@title', 'Security Info')
  //     .withUsername('Hanxian')
  //     .withPassword('Test1234')
  //     .withConfirmpassword('Test1234')
  //     .withsecurityQuestion1()
  //     .selectFirstOfQuestionList1()
  //     .withsecurityAnswer1('abcdefgh')
  //     .withsecurityQuestion2()
  //     .selectFirstOfQuestionList2()
  //     .withsecurityAnswer2('sdfdfadf')
  //     .assert.containsText('@createAccount', 'Create account')
  //     .saveSnapshot('security info');
  //   client.pause(1000);
  //   securityInfo
  //     .tapAcceptRegulations();
  //   client.pause(1000);
  //   client.saveSnapshot('security info');
  //   securityInfo
  //     .tapCreateAccount();
  // },

  // 'Verify enroll confirmation'() {
  //   enrollConfirmation
  //     .waitForElementPresent('@iconCheck', 10000)
  //     .assert.containsText('@confirmationText', 'Welcome, Cannon!')
  //     .assert.containsText('@congratulationText', 'Congratulations on becoming a Member of Rapid Rewards® ! You’re now part of the program that makes it quick and easy to redeem points for reward travel. Log in to your account to view your account information, book upcoming trips, and more.')
  //     .waitForElementPresent('@confirmationLogo', 10000)
  //     .assert.containsText('@confirmationTm', 'Rapid Rewards')
  //     .assert.containsText('@username', 'Cannon Biggs')
  //     .assert.containsText('@rapidRewardsNumber', '600597056')
  //     .waitForElementPresent('@gotoLogin', 10000)
  //     .saveSnapshot('confirmation page');
  // },

  after(client) {
    client.end();
  }
};
