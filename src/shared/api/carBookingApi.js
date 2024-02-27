import url from 'url';
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import {
  transformVendorResponse,
  transformLocationsResponse,
  transformShoppingResponse,
  transformRetrieveCarPricingResponse,
  transformCarReservationRequest
} from 'src/shared/api/transformers/carBookingApiTransformers';
import transformSearchRequestToCarShoppingApi from 'src/carBooking/transformers/searchFormTransformer';

const chapiResourceGroup = 'v1/mobile-misc/feature/cars';

export const retrieveCarVendors = () =>
  restClient
    .ajax({
      url: url.resolve(environment.content, 'v1/content-delivery/query/car-vendors'),
      type: 'GET',
      query: { channel: 'mobile' },
      contentType: 'application/json',
      dataType: 'json'
    })
    .then(transformVendorResponse);

export const retrieveLocations = () =>
  restClient
    .ajax({
      url: url.resolve(environment.content, 'v1/content-delivery/query/car-stations'),
      type: 'GET',
      query: { channel: 'mobile' },
      contentType: 'application/json',
      dataType: 'json'
    })
    .then(transformLocationsResponse);

export const shopping = (request) => {
  const chapiParams = transformSearchRequestToCarShoppingApi(request);

  return restClient
    .ajax({
      url: url.resolve(environment.chapiMisc, `${chapiResourceGroup}/products`),
      type: 'GET',
      query: chapiParams,
      contentType: 'application/json',
      dataType: 'json'
    })
    .then(transformShoppingResponse);
};

export const retrieveCarPricing = (productId, queryParameters) =>
  restClient
    .ajax({
      url: url.resolve(environment.chapiMisc, `${chapiResourceGroup}/product-id/${productId}`),
      type: 'GET',
      query: queryParameters,
      contentType: 'application/vnd.swacorp.com.car-reservations.products-v1.0+json',
      dataType: 'json'
    })
    .then(transformRetrieveCarPricingResponse);

export const reserveCar = (request, isLoggedIn) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, `${chapiResourceGroup}/reservations`),
      type: 'POST',
      body: transformCarReservationRequest(request),
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
