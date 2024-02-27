const voucherLookUpResponse = require('mocks/templates/travelFunds/voucherLookUpSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(voucherLookUpResponse)
};
