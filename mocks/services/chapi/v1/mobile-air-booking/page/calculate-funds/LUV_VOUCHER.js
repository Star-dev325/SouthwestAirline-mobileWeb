const voucherCalculateSuccess = require('mocks/templates/travelFunds/voucherCalculateSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/calculate-funds/LUV_VOUCHER',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(voucherCalculateSuccess)
};
