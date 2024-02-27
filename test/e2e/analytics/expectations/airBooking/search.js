const dayjs = require('dayjs');

module.exports = {
  tripType: 'roundTrip',
  origin: 'DAL',
  destination: 'AUS',
  departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  returnDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
  adults: 1,
  seniors: 0,
  promoCode: '',
  promoCodeIsValid: false,
  currencyCode: 'Dollars'
};
