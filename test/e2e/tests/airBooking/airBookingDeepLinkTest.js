'use strict';
let flight;
const dayjs = require('dayjs');

const departDayjs = dayjs().add(5, 'day');
const returnDayjs = dayjs().add(10, 'day');

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    flight = client.page.flight();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking via Deep Link'(client) {
    const departDate = departDayjs.format('MM/DD/YYYY');
    const returnDate = returnDayjs.format('MM/DD/YYYY');
    const url = 'http://localhost:9001/air/booking/shopping?numberOfAdults=5&useLowFareCalendar=true&fromCity=DAL' +
      `&toCity=ATL&tripType=RT&departDate=${departDate}&returnDate=${returnDate}&currencyType=PTS`;

    client.url(url);
  },

  'Verify Page Values Are Correct from Url Params'() {
    const departMonthDay = departDayjs.format('M/DD');
    const returnMonthDay = returnDayjs.format('M/DD');

    flight
      .waitForElementPresent('@activeTab', 10000)
      .assert.containsText('@activeTab', 'ROUND TRIP')
      .assert.containsText('@fromAirport', 'DAL')
      .assert.containsText('@toAirport', 'ATL')
      .assert.containsText('@departureDate', departMonthDay)
      .assert.containsText('@returnDate', returnMonthDay)
      .assert.visible('@lowFareCheckBoxIsChecked')
      .assert.visible('@pointsCurrencyIsSelected');
  },

  after(client) {
    client.end();
  }
};
