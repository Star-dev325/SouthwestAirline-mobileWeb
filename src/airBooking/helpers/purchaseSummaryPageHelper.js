// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import type { FlightPricingPageResponse, TripSummaryType } from 'src/airBooking/flow-typed/airBooking.types';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import optionsHelper from 'src/shared/helpers/optionsHelper';

const { LAPCHILD } = PassengerTypes;

import type {
  CurrencySuit,
  DutyOfCare,
  EarlyBirdPricing,
  Passenger,
  PassengerInfos,
  TotalsType
} from 'src/shared/flow-typed/shared.types';
import { _addHyphenForUSPhoneNumber } from 'src/shared/helpers/contactMethodPageHelper';

type BriefPassengerInfoType = {
  name: string,
  rapidRewardsNumber?: string
};

const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

export const generateTripSummary = (flightPricingPageResponse: FlightPricingPageResponse): TripSummaryType => {
  const lapChildEnabled = _.get(flightPricingPageResponse, 'flightPricingPage.totals.infantFare');
  const bounds = _.chain(flightPricingPageResponse)
    .get('flightPricingPage.bounds')
    .map((bound) => ({
      arrivalAirportCode: bound.arrivalAirport.code,
      arrivalTime: bound.arrivalTime,
      departureAirportCode: bound.departureAirport.code,
      departureDate: bound.departureDate,
      departureDayOfWeek: dayjs(bound.departureDate).format('dddd'),
      departureTime: bound.departureTime,
      stops: bound.stops
    }))
    .value();

  const outboundData = _.get(flightPricingPageResponse, 'flightPricingPage.bounds[0].passengers', [
    {
      count: 0,
      type: i18n('SHARED__PURCHASE_SUMMARY_FORM__DEFAULT_PASSENGER_TYPE')
    }
  ]);
  const defaultCurrency = {
    amount: '0.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  };

  const pointsTotal = _.get(flightPricingPageResponse, 'flightPricingPage.totals.pointsTotal');
  const adultFareMoneyTotal = _.get(
    flightPricingPageResponse,
    'flightPricingPage.totals.adultFare.paxTypeTotal.moneyTotal',
    defaultCurrency
  );
  const infantFareMoneyTotal = _.get(
    flightPricingPageResponse,
    'flightPricingPage.totals.infantFare.paxTypeTotal.moneyTotal',
    defaultCurrency
  );
  const currency = pointsTotal || adultFareMoneyTotal;
  const defaultLapChildCurrency = pointsTotal || infantFareMoneyTotal;

  return {
    bounds,
    currency,
    ...(lapChildEnabled && { defaultLapChildCurrency }),
    passengerCountDescription: `${outboundData[0].count} ${outboundData[0].type} ${i18n(
      'SHARED__PURCHASE_SUMMARY_FORM__TOTAL'
    )}`,
    ...(lapChildEnabled && {
      lapChildCountDescription: `${outboundData[1].count} ${outboundData[1].type} ${i18n(
        'SHARED__PURCHASE_SUMMARY_FORM__TOTAL'
      )}`
    })
  };
};

export const generatePassengers = (
  passengerInfos: Array<{ passengerInfo: Passenger }>
): Array<BriefPassengerInfoType> =>
  _.map(passengerInfos, (passenger) => {
    const briefInfo: BriefPassengerInfoType = {
      name: `${passenger.passengerInfo.firstName} ${passenger.passengerInfo.lastName}`
    };

    if (passenger.passengerInfo.rapidRewardsNumber) {
      briefInfo.rapidRewardsNumber = passenger.passengerInfo.rapidRewardsNumber;
    }

    return briefInfo;
  });

export const generatePriceTotal = (flightPricingPageResponse: FlightPricingPageResponse): { totals: TotalsType } => {
  const totals = _.get(flightPricingPageResponse, 'flightPricingPage.totals');

  return {
    totals
  };
};

export const getReviewMessages = (flightPricingPageResponse: FlightPricingPageResponse) =>
  flightPricingPageResponse?.flightPricingPage?.reviewMessages || null;

const transformPassengersForEarlybirdRequest = (productIds: string[], passengerInfos: PassengerInfos) => ({
  productIds,
  passengers: _.map(passengerInfos, ({ passengerInfo, passengerReference }) => {
    const result = {
      name: _.pick(passengerInfo, ['firstName', 'lastName', 'middleName']),
      passengerReference,
      gender: passengerInfo.gender,
      dateOfBirth: passengerInfo.dateOfBirth
    };

    if (!_.isEmpty(passengerInfo.rapidRewardsNumber)) {
      _.merge(result, { accountNumber: passengerInfo.rapidRewardsNumber });
    }

    if (!_.isEmpty(passengerInfo.frequentTravelerId)) {
      _.merge(result, { frequentTravelerId: passengerInfo.frequentTravelerId });
    }

    if (!_.isEmpty(passengerInfo.frequentTravelerToken)) {
      _.merge(result, { frequentTravelerToken: passengerInfo.frequentTravelerToken });
    }

    return result;
  })
});

export const transformToEarlybirdInPathRequest = (
  earlyBirdPricing: EarlyBirdPricing,
  passengerInfos: PassengerInfos,
  currencyType: CurrencySuit,
  earlyBirdPricingToken?: string
) => {
  const earlybirdInPathRequest = {
    body: {
      currency: currencyType,
      ..._.omitIfEmpty({ earlyBirdPricingToken })
    },
    method: earlyBirdPricing.method,
    href: earlyBirdPricing.href
  };

  _.each({ adultPassengers: 'adult' }, (paxType, paxKey) => {
    const passengers = _.filter(passengerInfos, { type: paxType });
    const productIds = _.get(earlyBirdPricing, `body.${paxKey}.productIds`);

    if (!_.isEmpty(passengers) && !_.isEmpty(productIds)) {
      _.merge(earlybirdInPathRequest.body, {
        [paxKey]: transformPassengersForEarlybirdRequest(productIds, passengers)
      });
    }
  });

  return earlybirdInPathRequest;
};

export const getContactInfoTravelManagerText = ({ contactMethod, contactPhone, contactEmail }: DutyOfCare) => {
  if (contactMethod === contactMethodKeys.CALL_ME && contactPhone) {
    return `(${contactPhone.countryCode}) ${_addHyphenForUSPhoneNumber(
      contactPhone?.countryCode,
      contactPhone?.number
    )}`;
  } else if (contactMethod === contactMethodKeys.EMAIL_ME) {
    return contactEmail;
  }

  return '';
};

export const otherPassengerReference = (passengerType: string, passengerReference: number, associatedAdult?: string) =>
  (passengerType === LAPCHILD && associatedAdult === '' ? passengerReference - 1 : parseInt(associatedAdult));

const adultStartAge = 18;
const youngTravelerMaxAge = 17;
const youngTravelerStartAge = 12;

export const isValidYoungTravelerBirthDate = (birthDate: string, departureDate: string) =>
  dayjs(departureDate, MEDIUM_DATE_FORMAT).diff(dayjs(birthDate, [MEDIUM_DATE_FORMAT]), 'years') >= youngTravelerStartAge &&
  dayjs(departureDate, MEDIUM_DATE_FORMAT).diff(dayjs(birthDate, [MEDIUM_DATE_FORMAT]), 'years') <= youngTravelerMaxAge;

export const isValidAdultBirthDate = (birthDate: string, departureDate: string) =>
  dayjs(departureDate, MEDIUM_DATE_FORMAT).diff(dayjs(birthDate, [MEDIUM_DATE_FORMAT]), 'years') >= adultStartAge;
