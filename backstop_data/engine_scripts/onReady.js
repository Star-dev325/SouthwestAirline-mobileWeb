module.exports = (engine, scenario, vp) => {
  engine.evaluate(() => {
    // Your web-app is now loaded. Edit here to simulate user interactions or other state changes in the browser window context.
  });
  console.log('onReady.js has run for: ', vp.label);
};
