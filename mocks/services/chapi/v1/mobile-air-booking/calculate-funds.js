const refreshFundsResponse = require('mocks/templates/travelFunds/refreshFundsResponse');
const removeFundResponse = require('mocks/templates/travelFunds/removeFundResponse');

export default [
  {
    path: '/chapi/v1/mobile-air-booking/page/calculate-funds',
    method: 'POST',
    cache: false,
    render: (req, res) => res.json(refreshFundsResponse)
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/calculate-funds',
    method: 'PUT',
    cache: false,
    render: (req, res) => res.json(removeFundResponse)
  }
];
