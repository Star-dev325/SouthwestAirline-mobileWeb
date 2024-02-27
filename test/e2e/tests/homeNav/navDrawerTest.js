let navDraw;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Open nav drawer'() {
    navDraw
      .openMenu();
  },

  'Click Chase placement'() {
    navDraw
      .clickChasePlacement();
  },

  'Open nav drawer again'() {
    navDraw
      .openMenu();
  },

  'Verify Chase placement is still visible'() {
    navDraw
      .waitForElementVisible('.image-placement img', 10000);
  },

  after(client) {
    client.end();
  }
};
