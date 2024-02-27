const { QUERY_PARAMS } = require('src/shared/constants/webViewConstants');

const { API_KEY, CHANNEL, DEVICE_TYPE, WEB_VIEW } = QUERY_PARAMS;

const blank = {
  open() {
    return this.api.url(`${this.api.launchUrl}/blank`)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  openInWebView(channelValue, deviceTypeValue, apiKeyValue) {
    return this.api.url(`${this.api.launchUrl}/blank?${WEB_VIEW}=true&${CHANNEL}=${channelValue}&${DEVICE_TYPE}=${deviceTypeValue}&${API_KEY}=${apiKeyValue}`);
  }
};

module.exports = {
  elements: {
    dialogButton: '.popup-buttons'
  },

  commands: [blank]
};
