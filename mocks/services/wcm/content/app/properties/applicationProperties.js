const {
  getMockServerDomain,
  getApplePayMockServerPort,
  getPayPalMockServerPort
} = require('mocks/helpers/mockServerHelper');

const applicationPropertiesTemplate = require('mocks/templates/wcm/properties/applicationProperties');

module.exports = {
  path: '/content/app/properties/applicationProperties.json',
  method: 'GET',
  cache: false,
  template: () =>
    applicationPropertiesTemplate({
      mockServerDomain: getMockServerDomain(),
      payPalMockServerPort: getPayPalMockServerPort(),
      applePayMockServerPort: getApplePayMockServerPort()
    })
};
