module.exports = {
  path: '/v1/content-delivery/query/application-toggles',
  method: 'GET',
  cache: false,
  template: () => ({
    success: true,
    errors: [],
    results: {
      sourceId: 'ty06eXQBJdp255RrGxkz',
      modDate: 1599761685273,
      applicationToggles: {
        enable: ['IsExclusivePromotionsHidden', 'CHASE_PREQUAL']
      },
      dataVersion: '1.0.0'
    }
  })
};
