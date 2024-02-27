import * as restClient from 'src/shared/api/restClient';
import url from 'url';
import _ from 'lodash';
import environment from 'src/shared/api/apiRoutes';
import { removeInitialForwardSlash } from 'src/shared/helpers/urlHelper';
import { transformToUpdateCreditCardApiRequestForChapi } from 'src/shared/transformers/savedCreditCardTransformer';

export const accountNumberLookup = (passengerInfo, isFrequentTraveler = false) => {
  const lookupHref = isFrequentTraveler ? 'v1/mobile-misc/feature/accounts/x-lookup' : 'v1/mobile-misc/feature/accounts/lookup';

  return restClient.ajax({
    url: url.resolve(environment.chapiMisc, lookupHref),
    body: passengerInfo,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json'
  });
};

export const fetchPromotions = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/my-account/promotions'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchSavedCreditCardsById = (creditCardId) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, `v1/mobile-misc/page/air-booking/payment-option/${creditCardId}`),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchPastFlights = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/my-account/past-flights'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchSavedFlights = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/my-account/saved-flights'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const saveContactMethod = (contactInfo) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/contact-method'),
      type: 'PUT',
      body: contactInfo,
      contentType: 'application/json'
    },
    true
  );

export const fetchPaymentOptions = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/air-booking/payment-options'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchNewSavedCreditCards = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/credit-cards'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const deleteCreditCards = (creditCardIds) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/credit-cards'),
      type: 'DELETE',
      query: {
        savedCreditCardId: creditCardIds
      },
      dataType: 'json'
    },
    true
  );

export const makeCreditCardPrimary = (creditCardId) => {
  const data = { savedCreditCardId: creditCardId };

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/credit-cards/primary'),
      type: 'POST',
      dataType: 'json',
      body: data,
      contentType: 'application/json'
    },
    true
  );
};

export const updateCreditCard = (creditCardInfo) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/credit-cards'),
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      body: transformToUpdateCreditCardApiRequestForChapi(creditCardInfo)
    },
    true
  );

export const getSecurityQuestions = () =>
  restClient.ajax({
    url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/accounts/security-questions'),
    type: 'GET',
    dataType: 'json'
  });

export const registerPromotion = (registerPromotionRequestData) => {
  const { href, method, body } = registerPromotionRequestData;
  const urlWithoutInitialForwardSlash = removeInitialForwardSlash(href);

  return restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, urlWithoutInitialForwardSlash),
      type: method,
      body,
      contentType: 'application/json',
      dataType: 'json'
    },
    true
  );
};

export const fetchAccountInfo = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account'),
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json'
    },
    true
  );

export const fetchPromoCodes = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/my-account/promo-codes'),
      type: 'POST',
      dataType: 'json',
      body: {},
      contentType: 'application/json'
    },
    true
  );

export const fetchRapidRewardsInfo = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/my-account/rapid-rewards'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const fetchPromotionDetails = (promotionDetailsRequestInfo) =>
  callAPIWithCustomRequestData(promotionDetailsRequestInfo, environment.chapiMisc);

export const createAccount = (accountsObj) =>
  restClient.ajax({
    url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/accounts/enroll'),
    type: 'POST',
    body: accountsObj,
    contentType: 'application/json',
    dataType: 'json'
  });

export const updateRapidRewards = (emailSubscriptions) =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/feature/my-account/enroll-customer'),
      body: emailSubscriptions,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json'
    },
    true
  );

export const getUpcomingTrips = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.chapiMisc, 'v1/mobile-misc/page/upcoming-trips'),
      type: 'GET',
      dataType: 'json'
    },
    true
  );

export const callAPIWithCustomRequestData = (requestData, environmentData) => {
  const { href, method, body = undefined } = requestData;
  const urlWithoutInitialForwardSlash = removeInitialForwardSlash(href);

  let ajaxRequest = {
    url: url.resolve(environmentData, urlWithoutInitialForwardSlash),
    type: method,
    dataType: 'json'
  };

  if (!_.isUndefined(body)) {
    ajaxRequest = _.merge({}, ajaxRequest, {
      body
    });
  }

  return restClient.ajax(ajaxRequest, true);
};
