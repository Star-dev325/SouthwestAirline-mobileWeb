module.exports = {
  path: '/api/v1/mobile/flights/statuses/subscriptions',
  method: 'POST',
  cache: false,
  template: {
    scheduledFlightNumber: '61',
    scheduledDate: '2015-02-26',
    originationAirportCode: 'DAL',
    destinationAirportCode: 'HOU',
    mediaType: 'SMS',
    notificationWindowInMinutes: '60',
    marketingCarrierCode: null,
    emailAddress: null,
    phoneAreaCode: '330',
    phoneExchangeNumber: '806',
    phoneLineNumber: '0759'
  }
};
