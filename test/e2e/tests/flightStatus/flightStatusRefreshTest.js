module.exports = {
  '@tags': ['backForwardRefresh'],
  'Go directly to flight status list url'(client) {
    client
      .url(`${client.launchUrl}/flight-status/DAL/AUS/2015-04-01`);
  },

  'Should see the list of flights'(client) {
    client
      .waitForElementVisible('.flight-card', 10000)
      .saveSnapshot('list of flights');
  },

  'Go directly to flight detail page'(client) {
    client
      .url(`${client.launchUrl}/flight-details?from=DAL&to=HOU&date=2015-02-16&flightNumber=1`);
  },

  'Should see flight detail page'(client) {
    client
      .waitForElementVisible('.leg-details', 10000);
  },

  'Refresh flight detail page'(client) {
    client.refresh(() => {
      client
        .waitForElementPresent('.leg-details', 10000)
        .assert.urlEquals(`${client.launchUrl}/flight-details?from=DAL&to=HOU&date=2015-02-16&flightNumber=1`);
    });
  },

  'Finish test'(client) {
    client.end();
  }
};
