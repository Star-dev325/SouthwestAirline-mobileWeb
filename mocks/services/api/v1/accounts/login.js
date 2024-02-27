const loginApiJsonBuilder = require('test/builders/apiResponse/loginApiJsonBuilder');

module.exports = {
  path: '/api/v1/accounts/login',
  method: 'POST',
  cache: false,
  template: () => new loginApiJsonBuilder().build()
};
