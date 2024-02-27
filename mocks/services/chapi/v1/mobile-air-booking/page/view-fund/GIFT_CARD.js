const giftCardLookUpResponse = require('mocks/templates/travelFunds/giftCardLookUpSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(giftCardLookUpResponse)
};
