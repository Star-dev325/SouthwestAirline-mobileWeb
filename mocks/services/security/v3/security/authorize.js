const OauthBuilder = require('test/builders/apiResponse/security/v3/security/authorize');
const accountMappings = require('mocks/services/account-mapping');
const _ = require('lodash');

module.exports = {
  path: '/security/v3/security/authorize',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    const accountKey = _.findKey(accountMappings, (account) => _.get(account, 'accountNumber') === body.username);
    const account = accountKey ? accountMappings[accountKey] : accountMappings.default;

    return new OauthBuilder().withIdToken(account.idToken).withAccessToken(account.accessToken).build();
  }
};
