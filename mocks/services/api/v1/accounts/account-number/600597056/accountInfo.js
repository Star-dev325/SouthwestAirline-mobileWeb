const AccountInfoApiResponseBuilder = require('test/builders/apiResponse/accountInfoApiResponseBuilder');

module.exports = {
  path: '/api/v1/accounts/account-number/600597056',
  method: 'GET',
  cache: false,
  template: () => new AccountInfoApiResponseBuilder().build()
};
