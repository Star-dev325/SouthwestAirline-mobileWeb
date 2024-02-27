'use strict';

const form = {
  currency: {
    points: 2,
    dollars: 1
  },

  _setValue(el, value) {
    return this.waitForElementVisible(el, 10000)
      .setValue('@Username', value);
  },
  _setPassenger(type, max) {
    if (max && max > 1) {
      for (let i = 1; i < max; i++) this.clickVisible(type);
    }

    return this;
  },
  open(urlAndSearch) {
    urlAndSearch = urlAndSearch || '/air/booking/shopping' || '/air/booking/index.html';

    return this.api.url(this.api.launchUrl + urlAndSearch)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  withPassenger(max) {
    if (max < 0) this._setPassenger('@removePassenger', Math.abs(max));

    return this;
  },
  openFromAirportSelector() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@fromAirport')
      .waitForElementPresent('@airportList', 10000);
  },
  openToAirportSelector() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@toAirport')
      .waitForElementPresent('@airportList', 10000);
  },
  fromAirport(name) {
    return this.openFromAirportSelector().selectAirport(name);
  },
  toAirport(name) {
    return this.openToAirportSelector().selectAirport(name);
  },
  withCalendarDate() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@calendarInput');
  },
  withCurrency(index) {
    return this.clickVisible(`.switch-button--item:nth-child(${index})`);
  },
  withPromoCode(value) {
    return this._setValue(value);
  },
  continue() {
    return this.clickVisible('button[type="submit"]')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  flightType(type) {
    const index = (type === 'oneway') ? 2 : 1;

    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible(`.nav li:nth-child(${index})`);
  },
  airportCancel() {
    return this.clickVisible('.cancel.button');
  },
  flightRecent() {
    return this.clickVisible('.page-title a');
  },
  nextDate() {
    return this.clickVisible('@nextDate');
  },
  previousDate() {
    return this.clickVisible('@previousDate');
  },
  clickRecentToPrefill() {
    this.clickVisible('@recentButton')
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('.icon_airplane:first-of-type');
  },
  withLowFareCalendar() {
    this.clickVisible('@lowFareCheckBox');
  },
  clickLowFarePriceBar(bound, date) {
    return this.clickVisible(`.low-fare-${bound} div[data-date="${date}"] .calendar-day--fare-price`);
  },
  lowFareContinue() {
    this.clickVisible('@lowFareContinue');
  },
  lowFareTooltipIsVisible() {
    return this.waitForElementPresent('@lowFareTooltip', 1000);
  }
};

const list = {
  fare: {
    wannaGetAway: 1,
    anytime: 2,
    businessSelect: 3,
    senior: 4
  },
  withFlightFare(index, fare) {
    const flightSelector = `div.flight-shopping-page--products-container > .flight-shopping-page--product-card:nth-of-type(${index + 2})`;
    const fareProductSelector = `div[data-qa="flight-products"] .flight-product-section:nth-child(${fare})`;

    this.api.pause(500);

    return this.clickVisible(flightSelector)
      .clickVisible(fareProductSelector);
  }
};

module.exports = {
  elements: {
    fromAirport: 'div[data-qa="from"] .form-field--container',
    toAirport: 'div[data-qa="to"] .form-field--container',
    calendarInput: 'div[data-qa="depart-and-return-dates"]',
    removePassenger: '.passenger-amount-field--action .icon_minus',
    airportList: '.airport-list',
    calendar: '.calendar',
    calendarDone: '.done-area',
    bookFlightForm: '.book-flight-form',
    airBookingCalendar: '.attach-full',
    activeTab: '.nav--item.active',
    nextDate: '.calendar-strip--content li:nth-child(3)',
    previousDate: '.calendar-strip--content li:nth-child(1)',
    calendarStrip: '.calendar-strip',
    activeDate: '.calendar-strip--item_active',
    recentButton: '.page-header--right-button',
    grayFormCalendarField: '.form-calendar-field.gray4',
    lowFareCheckBox: '.checkbox-button--mark',
    lowFareCheckBoxIsChecked: 'span.checkbox-button--mark.checkbox-button_checked',
    lowFareDepartureDate: 'div[data-date="2020-04-19"] .calendar-day--fare-price',
    lowFareContinue: '.continue.button',
    lowFareTooltip: '.toast-dialog.visible',
    lowFarePointerDepartureDate: '.low-fare-outbound .label-container--content',
    lowFarePointerReturnDate: 'div.low-fare-inbound .label-container--content',
    lowFareSelectedDepartureDate: 'div.low-fare-calendar-page--selections .outbound .value',
    lowFareSelectedReturnDate: 'div.low-fare-calendar-page--selections .inbound .value',
    departureDate: 'div.form-calendar-field--departure-date .bold',
    returnDate: 'div.form-calendar-field--return-date .bold',
    pointsCurrencyIsSelected: 'span.switch-button--item.active.money-or-points--points',
    passengerCount: 'div.passenger-amount-field--passenger-number'
  },
  commands: [form, list]
};
