const pricesForSinglePax = require('mocks/templates/earlyBird/pricesForSinglePax');

export default {
  path: '/chapi/v1/mobile-air-booking/feature/earlybird/prices',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(pricesForSinglePax)
};
