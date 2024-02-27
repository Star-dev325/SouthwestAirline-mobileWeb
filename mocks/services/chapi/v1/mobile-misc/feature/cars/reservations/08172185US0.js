const retrieve = require('mocks/templates/car-reservation/08172185US0/retrieve');
const cancel = require('mocks/templates/car-reservation/08172185US0/cancel');

/**
 * @module Car
 * @desc mock data for CHAPI car reservation
 * @param {ConfirmationNumber} 08172185US0
 * Retrieve and cancel the car reservation
 */

module.exports = [
  {
    path: '/chapi/v1/mobile-misc/feature/cars/reservations/08172185US0',
    method: 'GET',
    cache: false,
    template: retrieve
  },
  {
    path: '/chapi/v1/mobile-misc/feature/cars/reservations/08172185US0',
    method: 'DELETE',
    cache: false,
    template: cancel
  }
];
