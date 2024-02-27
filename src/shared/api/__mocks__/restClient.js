const { param: urlHelperParam } = require('src/shared/helpers/urlHelper');

export const ajax = (options, authentication, timeout, channelId, deferFn, shouldUseGatewayCookies) => {
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

  return Promise.resolve(options);
};

export const param = (data) => urlHelperParam(data);
