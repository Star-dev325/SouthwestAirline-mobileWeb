import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import { transformToRetrieveCarReservationResponse } from 'src/shared/api/transformers/reservationApiTransformer';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

const carCHAPIMiscResourceGroup = 'v1/mobile-misc/feature';

export const retrieveCarReservation = ({ firstName, lastName, pickupDate, confirmationNumber= 'CARRECLOCAT', searchToken }) => {
  let queryParameters = {
    'first-name': firstName,
    'last-name': lastName,
    'pickup-date': pickupDate
  };

  if (searchToken) {
    queryParameters = { 'car-search-token': searchToken };
  }

  return restClient
    .ajax({
      url: url.resolve(
        environment.chapiMisc,
        `${carCHAPIMiscResourceGroup}/cars/reservations/${confirmationNumber}`
      ),
      type: 'GET',
      query: queryParameters,
      dataType: 'json'
    })
    .then(transformToRetrieveCarReservationResponse);
};

export const retrieveReservation = (
  { firstName, hasEditedName, lastName, passengerSearchToken, recordLocator },
  isLoggedIn = false
) => {
  const bodyParameters = { firstName, lastName, recordLocator };

  if (hasEditedName) {
    bodyParameters.hasEditedName = hasEditedName;
  }

  if (passengerSearchToken) {
    bodyParameters.passengerSearchToken = passengerSearchToken;
  }

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, `v1/mobile-air-booking/page/view-reservation/${recordLocator}`),
      type: 'POST',
      body: bodyParameters,
      dataType: 'json'
    },
    isLoggedIn
  );
};

export const retrieveDayOfTravelContactInformation = (request) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
    type: request.method,
    query: request.query,
    contentType: 'application/json',
    dataType: 'json'
  });

export const updateDayOfTravelContactInformation = (request) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
    type: request.method,
    body: request.body,
    contentType: 'application/json',
    dataType: 'json'
  });

export const retrieveReservationChangeable = (requestObject) => {
  const { body, href, method, query } = requestObject;

  const request = {
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(href)),
    type: method,
    contentType: 'application/json',
    dataType: 'json'
  };

  return method === 'POST' 
    ? restClient.ajax({ ...request, body })
    : restClient.ajax({ ...request, query });
};

export const retrieveSplitPnrReservation = (requestObject) => {
  const { method, body, href } = requestObject;
  const path = removeInitialForwardSlash(href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, path),
    type: method,
    contentType: 'application/json',
    dataType: 'json',
    body
  });
};

export const retrieveTravelInformation = (editPNRPassengerLink) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(editPNRPassengerLink.href)),
    type: editPNRPassengerLink.method,
    query: editPNRPassengerLink.query,
    dataType: 'json'
  });

export const updateTravelInformation = (editPNRPassengerUpdateLink) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(editPNRPassengerUpdateLink.href)),
    type: editPNRPassengerUpdateLink.method,
    body: {
      editPNRPassengerUpdate: editPNRPassengerUpdateLink.body
    },
    contentType: 'application/json'
  });

export const retrieveContactTracing = (link) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(link.href)),
    type: link.method,
    query: link.query,
    dataType: 'json'
  });

export const updateContactTracing = (link, passenger) => {
  const body = {
    ...link.contactTracingUpdateBody,
    passengers: [passenger]
  };

  return restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(link.href)),
    type: link.method,
    query: link.query,
    body,
    contentType: 'application/json'
  });
};
