const specialAssistance = require('mocks/templates/wcm/overlays/special_assistance');

module.exports = {
  path: '/content/generated/data/overlays/special_assistance.json',
  method: 'GET',
  cache: false,
  status(req, res) {
    res.status(200).send(specialAssistance);
  }
};
