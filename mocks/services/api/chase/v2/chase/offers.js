const chaseOffers = require('mocks/templates/chase/offers');

module.exports = {
  path: '/api/chase/v2/chase/offers',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(chaseOffers)
};
