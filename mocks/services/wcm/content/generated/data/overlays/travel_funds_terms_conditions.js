const travelFundsTermsConditions = require('mocks/templates/wcm/overlays/travel_funds_terms_conditions');

module.exports = {
  path: '/content/generated/data/overlays/travel_funds_terms_conditions.json',
  method: 'GET',
  cache: false,
  status(req, res) {
    res.status(200).send(travelFundsTermsConditions);
  }
};
