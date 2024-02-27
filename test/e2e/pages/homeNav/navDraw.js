'use strict';

const disableAnimation = require('test/e2e/helpers/disableAnimation');

const accordion = {
  accordionClick(section, option) {
    if (option === '@viewReservation') {
      let index = 2;

      if (section === '@Flight') index = 2;
      else if (section === '@Car') index = 3;
      else if (section === '@Hotel') index = 4;

      option = `.accordion:nth-child(${index}) li[data-link=/view-reservation]`;
    }

    if (section !== '@Flight') {
      this.waitForElementVisible(section, 10000)
        .click(section);
    }

    return this.waitForElementVisible(option, 10000)
      .click(option)
      .waitForElementNotVisible('.dimmer', 10000)
      .api.pause(200);
  },

  openMenu() {
    const self = this;

    disableAnimation(self.api, ['.drawer', '.accordion--body'], () => {
      self.waitForElementNotVisible('.dimmer', 10000).click('@Menu');
    });

    self.api.pause(1000);

    return self;
  },

  toggleBoxClick(toggleBox) {
    return this.clickVisible(`[data-link="${toggleBox}"]`);
  }
};

const profile = {
  myAccount() {
    return this.clickVisible('@MyAccount');
  },
  specialOffer() {
    return this.clickVisible('@SpecialOffer');
  },
  rapidRewards() {
    return this.clickVisible('@RapidRewards')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  customerService() {
    return this.clickVisible('@CustomerService');
  },
  flySouthwest() {
    return this.clickVisible('@FlySouthwest');
  },
  viewReservations() {
    return this.clickVisible('@viewReservations');
  },
  changeToggles() {
    return this.clickVisible('@changeToggles');
  },
  bookAFlight() {
    return this.clickVisible('@BookFlight');
  },
  earlyBirdCheckIn() {
    return this.clickVisible('@EarlyBirdCheckIn');
  },
  whereWeFly() {
    return this.clickVisible('@WhereWeFly');
  },
  checkIn() {
    return this.clickVisible('@CheckIn');
  },
  clickChasePlacement() {
    return this.clickVisible('@chasePlacement');
  }
};

module.exports = {

  elements: {
    Menu: '.icon_hamburger',
    Flight: '.icon_flight',
    Car: '.icon_car',
    Hotel: '.icon_hotel',
    BookFlight: 'li[data-link="/air/booking/shopping?cleanFlow=true"]',
    CheckIn: 'li[data-link="/check-in"]',
    FlightStatus: 'li[data-link="/flight-status?cleanFlow=true"]',
    EarlyBirdCheckIn: 'li[data-link="/earlybird/checkin"]',
    MyAccount: '[data-qa="nav-drawer-view-account"]',
    SpecialOffer: 'li[data-link="/special-offer?cleanFlow=true"]',
    RapidRewards: 'li[data-link="/rapid-rewards?cleanFlow=true"]',
    viewReservations: 'li[data-link="/view-reservation?tab=FLIGHT&cleanFlow=true&clearFormData=false"]',
    changeToggles: '[data-qa="feature-toggles"]',
    FlySouthwest: '.menu-list .menu-list--border-bottom:nth-of-type(6)',
    WhereWeFly: 'li[data-link="/where-we-fly?cleanFlow=true"]',
    LookUpTravelFunds: 'li[data-link="/travel-funds/look-up?clearFormData=false&cleanFlow=true"]',
    BookCar: 'li[data-link="/car/booking?cleanFlow=true"]',
    chasePlacement: '.image-placement img'
  },

  commands: [accordion, profile]
};
