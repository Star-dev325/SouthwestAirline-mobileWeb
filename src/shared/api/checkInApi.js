// @flow

import url from 'url';
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import { RECORD_LOCATOR } from 'src/shared/constants/requestParameter';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';

import type { CheckInPassengerRequestType } from 'src/checkIn/flow-typed/checkIn.types';
import type { RequestParameters, ViewBoardingPass } from 'src/shared/flow-typed/shared.types';

export const retrieveReservationDetailWithLink = (checkInLink: Link) => {
  const { body, href, method, query  } = checkInLink;

  const request = {
    contentType: 'application/json',
    dataType: 'json',
    type: method,
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(href))
  };

  return method === 'POST'
    ? restClient.ajax({ ...request, body })
    : restClient.ajax({ ...request, query });
};

export const retrieveReservationDetail = (requestParameters: RequestParameters) => {
  const { firstName, lastName, passengerSearchToken } = requestParameters;
  const recordLocator = requestParameters?.recordLocator ?? RECORD_LOCATOR;

  const bodyParameters: RequestParameters = {
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    passengerSearchToken: passengerSearchToken ?? '',
    recordLocator: recordLocator ?? RECORD_LOCATOR
  };

  return restClient.ajax({
    body: bodyParameters,
    dataType: 'json',
    type: 'POST',
    url: url.resolve(environment.chapiAirOperations, `v1/mobile-air-operations/page/check-in/${recordLocator}`)
  });
};

export const checkInPassenger = ({ href, method, body, isLoggedIn = false }: CheckInPassengerRequestType) => {
  const urlWithoutInitialForwardSlash = removeInitialForwardSlash(
    href || '/v1/mobile-air-operations/page/check-in/view-boarding-details'
  );

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirOperations, urlWithoutInitialForwardSlash),
      type: method || 'POST',
      body,
      dataType: 'json',
      contentType: 'application/json'
    },
    isLoggedIn
  );
};

export const retrieveBoardingPass = (requestData: ViewBoardingPass) => {
  const { href, method, body } = requestData;
  const urlWithoutInitialForwardSlash = removeInitialForwardSlash(href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, urlWithoutInitialForwardSlash),
    type: method || 'POST',
    body,
    dataType: 'json',
    contentType: 'application/json'
  });
};

export const addTravelDocuments = (requestParams: *) => {
  const { href, method, body } = requestParams;
  const urlWithoutInitialForwardSlash = removeInitialForwardSlash(
    href || '/v1/mobile-air-operations/feature/check-in/travel-documents'
  );

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, urlWithoutInitialForwardSlash),
    type: method || 'POST',
    contentType: 'application/json',
    body,
    dataType: 'json'
  });
};
