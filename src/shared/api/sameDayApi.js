// @flow
import type {
  SameDayCancellation,
  SameDayConfirmationRequest,
  SameDayConfirmationRefundRequest,
  SameDayPricingRequest,
  SameDayShoppingRequest
} from 'src/sameDay/flow-typed/sameDay.types';
import environment from 'src/shared/api/apiRoutes';
import * as restClient from 'src/shared/api/restClient';
import type { SameDayReservation, SameDayFlightDetailsRequest } from 'src/shared/flow-typed/shared.types';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import url from 'url';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

export const retrieveSameDayBoundInformation = (sameDayUpdates: SameDayReservation) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(sameDayUpdates.href)),
    type: 'POST',
    body: {
      passengerSearchToken: sameDayUpdates.body?.passengerSearchToken
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const retrieveSameDayShoppingInformation = (sameDayShoppingInfo: SameDayShoppingRequest, reference: string) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(sameDayShoppingInfo.href)),
    type: 'POST',
    body: {
      sameDayToken: sameDayShoppingInfo.body?.sameDayToken,
      boundReference: reference
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const retrieveSameDayPricingInformation = (sammeDayPricingInfo: SameDayPricingRequest) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(sammeDayPricingInfo.href)),
    type: 'POST',
    body: {
      sameDayToken: sammeDayPricingInfo.body?.sameDayToken,
      boundReference: sammeDayPricingInfo.body?.boundReference,
      productId: sammeDayPricingInfo.body?.productId
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const updateSameDayConfirmation = (isLoggedIn: boolean, sameDayConfirmation: SameDayConfirmationRequest) =>
  restClient.ajax({
    url: url.resolve(
      environment.chapiAirOperations,
      removeInitialForwardSlash(isLoggedIn ? sameDayConfirmation.xhref : sameDayConfirmation.href)
    ),
    type: 'PUT',
    body: {
      changeJourneyConfirmToken: sameDayConfirmation.body?.changeJourneyConfirmToken,
      sameDayToken: sameDayConfirmation.body?.sameDayToken,
      boundReference: sameDayConfirmation.body?.boundReference,
      productId: sameDayConfirmation.body?.productId,
      payment: sameDayConfirmation.body?.payment ?? null,
      recipientEmail: sameDayConfirmation.body?.recipientEmail ?? null,
      refundMethod: sameDayConfirmation.body?.refundMethod ?? null
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const retrieveCancelStandbyListing = (sameDayCancellation: SameDayCancellation) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(sameDayCancellation.href)),
    type: sameDayCancellation.method,
    body: {
      standbyToken: sameDayCancellation?.body?.standbyToken
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const retrieveSameDayFlightDetails = (sameDayFlightDetailsRequest: SameDayFlightDetailsRequest) =>
  restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(sameDayFlightDetailsRequest.href)),
    type: 'POST',
    body: {
      sameDayToken: sameDayFlightDetailsRequest.body?.sameDayToken,
      flightIdentifier: sameDayFlightDetailsRequest.body?.flightIdentifier
    },
    dataType: 'json',
    contentType: 'application/json'
  });

export const updateSameDayConfirmationRefund = (
  { body, href, xhref }: SameDayConfirmationRefundRequest,
  isLoggedIn?: boolean = false,
  formData?: FormData
) => {
  const path = isLoggedIn ? xhref : href;

  const recipientEmail = formData?.recipientEmail
    ? formData?.recipientEmail
    : body?.recipientEmail
      ? body?.recipientEmail
      : null;

  return restClient.ajax({
    url: url.resolve(environment.chapiAirOperations, removeInitialForwardSlash(path)),
    type: 'PUT',
    body: {
      ...body,
      recipientEmail: recipientEmail
    },
    dataType: 'json',
    contentType: 'application/json'
  });
};
