const CarReservationBuilder = require('test/builders/apiResponse/carReservationBuilder');

module.exports = new CarReservationBuilder()
  .withExtras(['Toddler Seat (20 to 40 lbs.)', 'Booster Seat (40 to 80 lbs.)'])
  .build();
