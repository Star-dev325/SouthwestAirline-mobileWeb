const AccountInfoApiResponseBuilder = require('test/builders/apiResponse/accountInfoApiResponseBuilder');

module.exports = {
  path: '/chapi/v1/mobile-misc/feature/my-account',
  method: 'get',
  cache: false,
  template: new AccountInfoApiResponseBuilder().build()
};
