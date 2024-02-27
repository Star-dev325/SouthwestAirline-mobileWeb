const firmOfferConfirmation = require('mocks/templates/chase/firm-offer-confirmation');

module.exports = {
  path: '/api/chase/v2/chase/firm-offer-confirmation',
  method: 'PUT',
  cache: false,
  render: (req, res) => res.json(firmOfferConfirmation)
};
