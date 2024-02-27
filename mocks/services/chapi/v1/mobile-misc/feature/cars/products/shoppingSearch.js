const _ = require('lodash');
const CarShoppingSearchBuilder = require('test/builders/apiResponse/v1/mobile-misc/feature/cars/products/carShoppingSearchBuilder');

function transformDiscounts(discount) {
  const promoCodes = [];

  promoCodes.push({
    vendor: discount[0].vendor[0].toUpperCase(),
    type: discount[0].type[0],
    code: discount[0].code[0],
    promoCodeApplied: true
  });

  if (discount[0].vendor.length > 1) {
    promoCodes.push({
      vendor: discount[0].vendor[1].toUpperCase(),
      type: discount[0].type[1],
      code: discount[0].code[1],
      promoCodeApplied: false
    });
  }

  return promoCodes;
}

module.exports = {
  path: '/chapi/v1/mobile-misc/feature/cars/products',
  method: 'GET',
  cache: false,
  template: (params, query) => {
    const carShoppingSearchBuilder = new CarShoppingSearchBuilder();

    if (query.discount) {
      carShoppingSearchBuilder.withPromoCodes(transformDiscounts(query.discount));
    } else if (_.get(query, 'pickup-location') === 'BWI' && _.get(query, 'return-location') === 'BWI') {
      throw new Error('Some chapi error occurred. Please try again later');
    }

    return carShoppingSearchBuilder.build();
  }
};
