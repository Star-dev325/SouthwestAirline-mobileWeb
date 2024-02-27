const giftCardCalculateSuccess = require('mocks/templates/travelFunds/giftCardCalculateSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(giftCardCalculateSuccess)
};
