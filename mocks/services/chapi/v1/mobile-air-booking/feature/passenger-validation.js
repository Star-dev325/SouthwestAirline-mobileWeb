const passengerValidationNoYoungTraveler = require('mocks/templates/passenger-validation/passengerValidationNoYoungTraveler');

export default {
  path: '/chapi/v1/mobile-air-booking/feature/passenger-validation',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(passengerValidationNoYoungTraveler)
};
