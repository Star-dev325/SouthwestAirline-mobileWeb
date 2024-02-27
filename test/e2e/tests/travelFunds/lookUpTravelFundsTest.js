const Analytics = require('test/e2e/analytics/analytics');

let navDraw, travelFunds;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    travelFunds = client.page.travelFunds();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to LookUpTravelFunds from nav drawer'(client) {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@LookUpTravelFunds');

    Analytics.verifyPageView(client, 'travel-funds-look-up');

    client.assert.urlContains(`${client.launchUrl}/travel-funds/look-up?clearFormData=false&cleanFlow=true&clk=GNAVTRVLFUNDS`);
  },

  'See empty travel funds form'() {
    travelFunds
      .assert.containsText('@inputConfirmationNumber', '')
      .assert.containsText('@inputPassengerFirstName', '')
      .assert.containsText('@inputPassengerLastName', '')
      .assert.elementNotPresent('.fund-results-list');
  },

  'Fill out travel funds form'() {
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Ben')
      .withPassengerLastName('Lacy');
  },

  'Click LUV Voucher tab and fill out form'() {
    travelFunds
      .selectLuvVoucherTab()
      .withVoucherNumber('1234567890123456')
      .withSecurityCode('1234');
  },

  'Click Gift Card tab and fill out form'() {
    travelFunds
      .selectGiftCardTab()
      .withCardNumber('6543210987654321')
      .withSecurityCode('4321');
  },

  'Check other tabs to see that form data persisted'() {
    travelFunds
      .selectTravelFundsTab()
      .assert.value('@inputConfirmationNumber', 'ABC123')
      .assert.value('@inputPassengerFirstName', 'Ben')
      .assert.value('@inputPassengerLastName', 'Lacy')
      .selectLuvVoucherTab()
      .assert.value('@inputVoucherNumber', '1234567890123456')
      .assert.value('@inputSecurityCode', '1234')
      .selectGiftCardTab()
      .assert.value('@inputCardNumber', '6543210987654321')
      .assert.value('@inputSecurityCode', '4321');
  },

  'Submit Gift Card form, verify result is present, and that current tab has not changed'() {
    travelFunds
      .lookUpFund()
      .waitForElementVisible('.fund-results-list--item', 10000)
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.travel-fund--image_gift-card')
      .assert.elementNotPresent('.travel-fund--image_rtf')
      .assert.elementNotPresent('.travel-fund--image_luv-voucher')
      .assert.elementPresent('div.active[data-qa="gift-card-selector"]');
  },

  'Verify analytics TravelFundsStore for gift card'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('gift-card');
    });
  },

  'Check that all form input data has been cleared'() {
    travelFunds
      .assert.value('@inputCardNumber', '')
      .assert.value('@inputSecurityCode', '')
      .selectLuvVoucherTab()
      .assert.value('@inputVoucherNumber', '')
      .assert.value('@inputSecurityCode', '')
      .selectTravelFundsTab()
      .assert.value('@inputConfirmationNumber', '')
      .assert.value('@inputPassengerFirstName', '')
      .assert.value('@inputPassengerLastName', '');
  },

  'Fill out travel funds form, submit, and verify result'() {
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Ben')
      .withPassengerLastName('Lacy')
      .lookUpFund()
      .waitForElementVisible('.fund-results-list--item:nth-child(2)', 10000)
      .assert.elementNotPresent('.travel-fund--image_gift-card')
      .assert.elementPresent('.travel-fund--image_rtf-leisure')
      .assert.elementNotPresent('.travel-fund--image_luv-voucher')
      .assert.elementPresent('div.active[data-qa="travel-funds-selector"]');
  },

  'Verify analytics TravelFundsStore for travel fund'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('travel-funds');
    });
  },

  'Fill out LUV Voucher form, submit, and verify result'() {
    travelFunds
      .selectLuvVoucherTab()
      .withVoucherNumber('1234567890123456')
      .withSecurityCode('1234')
      .lookUpFund()
      .waitForElementVisible('.fund-results-list--item:nth-child(2)', 10000)
      .assert.elementNotPresent('.travel-fund--image_gift-card')
      .assert.elementNotPresent('.travel-fund--image_rtf')
      .assert.elementPresent('.travel-fund--image_luv-voucher')
      .assert.elementPresent('div.active[data-qa="luv-voucher-selector"]');
  },

  'Verify analytics TravelFundsStore for luv voucher'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('luv-voucher');
    });
  },

  'Verify that only 1 result is listed'(client) {
    client.elements('css selector', '.fund-results-list--item', (result) => {
      client.assert.equal(result.value.length, 1);
    });
  },

  'Back forward and see that look up results remain and previously selected tab is still selected'(client) {
    travelFunds.selectLuvVoucherTab();
    client
      .back()
      .waitForElementNotPresent('.fund-results-list', 10000)
      .forward()
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('div.active[data-qa="luv-voucher-selector"]')
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 1);
      });
  },

  after(client) {
    client.end();
  }
};
