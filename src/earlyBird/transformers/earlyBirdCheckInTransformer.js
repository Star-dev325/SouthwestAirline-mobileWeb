import _ from 'lodash';
import EarlyBirdStatus from 'src/shared/constants/earlyBirdStatus';
import i18n from '@swa-ui/locale';

export const getEarlyBirdCheckInFailed = (errorResponse) => {
  if (errorResponse instanceof Error) {
    return {
      responseJSON: {
        message: errorResponse.message
      }
    };
  }

  if (!errorResponse.responseJSON) {
    return {};
  }

  let { responseJSON } = errorResponse;
  const message = responseJSON.code && responseJSON.message ? responseJSON.message : getMsgByCode(responseJSON.code);

  responseJSON = _.merge(responseJSON, { message });

  return _.merge(errorResponse, { responseJSON });
};

const getMsgByCode = (code) => {
  switch (code) {
    case 404599104:
      return i18n('EARLY_BIRD_INVALID_RESERVATION_INFO');
    case 400599140:
      return i18n('EARLY_BIRD_FLIGHT_IN_PROGRESS');
    case 400500107:
      return i18n('EARLY_BIRD_FLIGHT_IN_PAST');
    case 400500276:
      return i18n('EARLY_BIRD_INTERNATIONAL');
    default:
      return i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR');
  }
};

export const getViewEarlyBirdReservationLink = (pnr) => {
  const { firstName, lastName, recordLocator } = pnr;

  return {
    href: `/v1/mobile-air-booking/page/early-bird/${recordLocator}`,
    query: {
      'first-name': firstName,
      'last-name': lastName
    },
    method: 'GET'
  };
};

export const isFlightEligibleForCheckIn = (reservationResponse) => {
  const { passengers } = reservationResponse;

  return isEligible(_.map(passengers, 'earlyBirdEligibilities'));
};

export const isFlightAlreadyPurchased = (reservationResponse) => {
  const { passengers } = reservationResponse;

  return isAlreadyPurchased(_.map(passengers, 'earlyBirdEligibilities'));
};

const isEligible = (earlyBirdEligibilitiesArray) =>
  _(earlyBirdEligibilitiesArray).flattenDeep().some(['status', EarlyBirdStatus.ELIGIBLE]);

const isAlreadyPurchased = (earlyBirdEligibilitiesArray) =>
  _(earlyBirdEligibilitiesArray).flattenDeep().every(['status', EarlyBirdStatus.PURCHASED]);

export const getBanner = (WCMResponse) => {
  const { product_feature } = WCMResponse;

  return {
    image: product_feature.image,
    alt: product_feature.alt_text
  };
};
