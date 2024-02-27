let flyingSouthwest;

module.exports = {

  before(client) {
    flyingSouthwest = client.page.flyingSouthwest();
  },

  'Go directly to flying southwest wcm page'(client) {
    client
      .url(`${client.launchUrl}/flying-southwest`);
  },

  'Should see flying southwest page'(client) {
    client
      .waitForElementVisible('.wcm', 10000)
      .saveSnapshot('flying southwest');
  },

  'Transition to at the air page'(client) {
    flyingSouthwest.goToAtTheAir();
    client
      .waitForElementVisible('.wcm', 10000)
      .assert.urlEquals(`${client.launchUrl}/at-the-airport`)
      .saveSnapshot('at the air');
  },

  'Transition to boarding the plane page'(client) {
    client.back();
    flyingSouthwest.goToBoardingThePlane();
    client
      .waitForElementVisible('.wcm', 10000)
      .assert.urlEquals(`${client.launchUrl}/boarding-the-plane`)
      .saveSnapshot('boarding the plane');
  },

  'Transition to in the air page'(client) {
    client.back();
    flyingSouthwest.goToInTheAir();
    client
      .waitForElementVisible('.wcm', 10000)
      .assert.urlEquals(`${client.launchUrl}/in-the-air`)
      .saveSnapshot('in the air');
  },

  'Finish test'(client) {
    client.end();
  }
};
