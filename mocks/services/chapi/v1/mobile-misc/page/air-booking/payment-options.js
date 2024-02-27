const accountMappings = require('mocks/services/account-mapping');
const _ = require('lodash');

module.exports = {
  path: '/chapi/v1/mobile-misc/page/air-booking/payment-options',
  method: 'GET',
  cache: false,
  template: (param, query, body, cookies, headers) => {
    const account =
      _.filter(accountMappings, (account) =>
        _.isMatch(account, {
          idToken: headers['x-api-idtoken']
        })
      )[0] || accountMappings.default;

    return account.paymentOptions;
  }
};
