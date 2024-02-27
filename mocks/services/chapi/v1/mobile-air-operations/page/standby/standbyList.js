const success = require('mocks/templates/standby/success');
const missingQueryParameter = require('mocks/templates/standby/missingQueryParameter');
const outOfLocationRange = require('mocks/templates/standby/outOfLocationRange');
const invalidPNR = require('mocks/templates/standby/invalidPNR');

const standbyMapping = {
  STMXQ6: success,
  GOOONE: missingQueryParameter,
  ORANGE: outOfLocationRange,
  XXXXXX: invalidPNR
};

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/standby',
  method: 'GET',
  cache: false,
  status: (req, res) => {
    const recordLocator = req.query['record-locator'];
    const responseData = standbyMapping[recordLocator];

    switch (recordLocator) {
      case 'STMXQ6':
        return res.status(200).send(responseData);
      case 'GOOONE':
      case 'XXXXXX':
      case 'ORANGE':
        return res.status(400).send(responseData);
      default:
        return res.status(404).send();
    }
  }
};
