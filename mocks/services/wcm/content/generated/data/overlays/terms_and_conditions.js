const termsAndConditions = require('mocks/templates/wcm/overlays/terms_and_conditions');

module.exports = {
  path: '/content/generated/data/overlays/terms_and_conditions.json',
  method: 'GET',
  cache: false,
  status(req, res) {
    res.status(200).send(termsAndConditions);
  }
};
