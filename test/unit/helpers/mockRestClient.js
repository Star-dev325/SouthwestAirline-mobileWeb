const q = require('q');
const { param } = require('src/shared/helpers/urlHelper');

module.exports = {
  ajax(options, authentication, timeout, channelId, deferFn, shouldUseGatewayCookies) {
    if (authentication) {
      options.authentication = authentication;
    }

    if (timeout) {
      options.timeout = timeout;
    }

    if (channelId) {
      options.channelId = channelId;
    }

    if (deferFn) {
      options.deferFn = deferFn;
    }

    if (shouldUseGatewayCookies) {
      options.shouldUseGatewayCookies = shouldUseGatewayCookies;
    }

    return q(options);
  },
  param(data) {
    return param(data);
  }
};
