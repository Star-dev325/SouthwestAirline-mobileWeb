'use strict';
let map, navDraw;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    map = client.page.map();
    client
      .init();
  },

  'Go to where we fly and detect the presence of the list and not the map'() {
    navDraw.openMenu().flySouthwest().whereWeFly();
    map.waitForElementVisible('@AirportList', 10000);
  },

  after(client) {
    client.end();
  }
};
