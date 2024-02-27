// @flow
import environment from 'src/shared/api/apiRoutes';
import * as restClient from 'src/shared/api/restClient';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import { filterPassengerInformationByPassengerType } from 'src/shared/helpers/passengerInfoHelper';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import { buildReservationGroups } from 'src/shared/transformers/flightPurchaseRequestTransformer';
import url from 'url';

import type {
  EarlybirdInPathRequest,
  PassengerValidationRequestType
} from 'src/airBooking/flow-typed/airBooking.types';
import type { SplitPayCalcFundsRequestType } from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type {
  CalcFundsRequestType,
  RefreshFundsRequestType,
  RemoveFundRequestType
} from 'src/airBooking/flow-typed/calcFunds.types';
import type { PassengerInfos } from 'src/shared/flow-typed/shared.types';

export const findFlightProducts = (requestObject: Link) =>
  restClient.ajax({
    url: url.resolve(
      environment.chapiAirShopping,
      requestObject.href || 'v1/mobile-air-shopping/page/flights/products'
    ),
    type: requestObject.method,
    query: requestObject.query,
    dataType: 'json'
  });

export const retrieveEarlyBirdInPathInfo = (earlybirdInPathRequest: EarlybirdInPathRequest) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, 'v1/mobile-air-booking/feature/earlybird/prices'),
    type: earlybirdInPathRequest.method,
    body: earlybirdInPathRequest.body,
    contentType: 'application/json',
    dataType: 'json'
  });

export const getProductPrices = (requestObject: Link) => {
  const path = removeInitialForwardSlash(requestObject.href);

  return restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, path),
    type: requestObject.method,
    body: requestObject.body,
    contentType: 'application/json',
    dataType: 'json'
  });
};

export const purchaseFlight = (requestObject: Link, isLoggedIn: boolean, isExpressPurchaseRequest: boolean = false) => {
  const purchasePath = isLoggedIn ? requestObject.xhref : requestObject.href;
  const expressPurchasePath = requestObject.xphref;
  const path = isExpressPurchaseRequest ? expressPurchasePath : purchasePath;

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(path)),
      type: requestObject.method,
      body: requestObject.body,
      contentType: 'application/json',
      dataType: 'json'
    },
    isLoggedIn
  );
};

export const fetchPassengerInfo = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, `v1/mobile-misc/page/air-booking/passenger-information`),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchSplitPayOptionsList = (splitPayOptionsListRequest: Link) => {
  const { body, href, method } = splitPayOptionsListRequest;

  return restClient.ajax(
    {
      url: url.resolve(
        environment.chapiAirBooking,
        removeInitialForwardSlash(href) || 'v1/mobile-air-booking/feature/split-pay-options-secure'
      ),
      body,
      contentType: 'application/json',
      dataType: 'json',
      type: method
    },
    true
  );
};

export const getLastBookableDate = () =>
  restClient.ajax({
    url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/last-bookable-date'),
    type: 'GET',
    dataType: 'json'
  });

export const fetchShoppingDetails = () =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirBooking, 'v1/mobile-air-booking/feature/shopping-details'),
    type: 'GET',
    dataType: 'json'
  });

export const calculateFunds = (
  request: CalcFundsRequestType | RemoveFundRequestType | RefreshFundsRequestType | SplitPayCalcFundsRequestType,
  isLoggedIn: boolean
) => {
  if (isLoggedIn) {
    return restClient.ajax(
      {
        url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
        type: request.method,
        body: request.body,
        contentType: 'application/json',
        dataType: 'json'
      },
      isLoggedIn
    );
  } else {
    return restClient.ajax({
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(request.href)),
      type: request.method,
      body: request.body,
      contentType: 'application/json',
      dataType: 'json'
    });
  }
};

export const getLowFareCalendar = (request: Link) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirShopping, 'v1/mobile-air-shopping/page/flights/low-fare-calendar/products'),
    type: request.method,
    query: request.query,
    dataType: 'json'
  });

export const findMultiSelectGroup = (multiSelectSearchRequest: Link) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirShopping, 'v1/mobile-air-shopping/page/flights/multiple-airports'),
    type: multiSelectSearchRequest.method,
    body: multiSelectSearchRequest.body,
    contentType: 'application/json',
    dataType: 'json'
  });

export const passengerValidationCall = (
  passengerInfos: PassengerInfos,
  passengerValidationRequest: PassengerValidationRequestType
) => {
  const { body, href, method } = passengerValidationRequest;
  const { ADULT, LAPCHILD } = PassengerTypes;
  const adultPassengers = filterPassengerInformationByPassengerType(passengerInfos, ADULT);
  const lapChildren = filterPassengerInformationByPassengerType(passengerInfos, LAPCHILD);
  const reservationGroups = buildReservationGroups(adultPassengers, lapChildren);

  return restClient.ajax(
    {
      body: {
        passengers: reservationGroups?.[0]?.passengers,
        productIds: body?.adultPassengers?.productIds
      },
      contentType: 'application/json',
      dataType: 'json',
      type: method,
      url: url.resolve(environment.chapiAirBooking, removeInitialForwardSlash(href))
    },
    false
  );
};
