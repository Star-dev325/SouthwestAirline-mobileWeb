const savedCreditCards = require('mocks/templates/my-acount/CreditCards/savedCreditCards');

module.exports = {
  path: '/chapi/v1/mobile-misc/feature/my-account/credit-cards',
  method: 'GET',
  cache: false,
  template: savedCreditCards
};
