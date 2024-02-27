const savedCreditCards = require('test/builders/apiResponse/v1/accounts/x-account-number/600597056/creditCardsBuilder');

module.exports = {
  path: '/api/v1/accounts/x-account-number/600597056/credit-cards',
  method: 'GET',
  cache: false,
  template: () => savedCreditCards
};
