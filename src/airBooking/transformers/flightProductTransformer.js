import _ from 'lodash';

export const transformToFlightPricingPageRequest = (selectedProducts, pricingPageRequest, shoppingRequest) => {
  const numberOfAdults = _.get(shoppingRequest, 'numberOfAdults');
  const numberOfLapInfants = _.get(shoppingRequest, 'numberOfLapInfants', 0);
  const productIdForAdults = _.chain(selectedProducts.adult).pick(['outbound', 'inbound']).map('fareProductId').value();

  const request = _.merge({}, pricingPageRequest, {
    body: {
      adultPassengers: {
        numberOfPassengers: numberOfAdults,
        productIds: productIdForAdults
      },
      ...(shoppingRequest.numberOfLapInfants && { 'lapInfantPassengerCount': numberOfLapInfants })
    }
  });

  return request;
};
