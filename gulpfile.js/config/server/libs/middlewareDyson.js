const middlewareProxy = require('./middlewareProxy');

module.exports = function (config) {
  return [
    middlewareProxy('/api/v1', `http://localhost:${config.port}/api/v1`, {}),
    middlewareProxy('/security/v3', `http://localhost:${config.port}/security/v3`, {}),
    middlewareProxy('/security/v4', `http://localhost:${config.port}/security/v4`, {}),
    middlewareProxy('/api/chase', `http://localhost:${config.port}/api/chase`, {}),
    middlewareProxy('/chapi/v1', `http://localhost:${config.port}/chapi/v1`, {}),
    middlewareProxy(
      '/content/generated/data/offers/saleOfferSummary.json',
      `http://localhost:${config.port}/content/generated/data/offers/saleOfferSummary.json`,
      {}
    ),
    middlewareProxy(
      '/content/generated/data/overlays/terms_and_conditions.json',
      `http://localhost:${config.port}/content/generated/data/overlays/terms_and_conditions.json`,
      {}
    ),
    middlewareProxy(
      '/content/app/properties/applicationProperties.json',
      `http://localhost:${config.port}/content/app/properties/applicationProperties.json`,
      {}
    ),
    middlewareProxy('/v1/content-delivery/query', `http://localhost:${config.port}/v1/content-delivery/query`, {}),
    middlewareProxy('/adobeAnalyticsMock.js', `http://localhost:${config.port}/adobeAnalyticsMock.js`, {}),
    middlewareProxy('/swa-ui/bootstrap', `http://localhost:${config.port}/swa-ui/bootstrap`, {})
  ];
};
