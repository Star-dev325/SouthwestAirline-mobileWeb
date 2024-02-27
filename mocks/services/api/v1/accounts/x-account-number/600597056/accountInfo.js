const AccountInfoApiResponseBuilder = require('test/builders/apiResponse/accountInfoApiResponseBuilder');

module.exports = {
  path: '/api/v1/accounts/x-account-number/:accountNumber',
  method: 'GET',
  cache: false,
  template: () => new AccountInfoApiResponseBuilder().build()
};
