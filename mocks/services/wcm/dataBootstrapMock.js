const {
  getMockServerDomain,
  getApplePayMockServerPort,
  getPayPalMockServerPort
} = require('mocks/helpers/mockServerHelper');
const dataJsTemplate = require('mocks/templates/wcm/data');

module.exports = {
  path: '/swa-ui/bootstrap/mobile-web/1/data.js',
  cache: false,
  method: 'GET',
  render: (req, res) => {
    const data = dataJsTemplate({
      mockServerDomain: getMockServerDomain(),
      applePayMockServerPort: getApplePayMockServerPort(),
      payPalMockServerPort: getPayPalMockServerPort()
    });

    res.append('Content-Type', 'application/javascript');
    res.send(data);
  }
};
