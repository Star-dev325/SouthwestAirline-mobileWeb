module.exports = {
  path: '/chapi/v1/mobile-air-operations/feature/flights/statuses/subscriptions',
  method: 'POST',
  cache: false,
  template: () => ({
    flightNumber: '196',
    howToContact: 'test@test.com'
  })
};
