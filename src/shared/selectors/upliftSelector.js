// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import store2 from 'store2';
import uuidGenerator from 'uuid-js';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { getAmountFromTotal } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getAirportFromCode } from 'src/airports/helpers/airportsHelpers';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  APPLICATION_TYPES,
  INITIAL_AVAILABILITY,
  PAYMENT_METHODS,
  INITIAL_TRIP_INFO,
  PRICE_TYPES,
  DEFAULT_UPLIFT_TIME_TO_TRAVEL_HOURS_LIMIT,
  DEFAULT_UPLIFT_PAX_AGE_LIMIT
} from 'src/shared/constants/alternativeFormsOfPaymentConstants';

import { AIRBOOKING_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';
import { POINTS } from 'src/shared/constants/currencyTypes';

import type { CeptorConfig, AfpAvailability } from 'src/shared/flow-typed/shared.types';

const upliftAvailability = (state) => _.get(state, 'app.uplift.upliftAvailability', INITIAL_AVAILABILITY);
const getSelectedCompanyName = (state) => _.get(state, 'app.account.corporateInfo.selectedCompany.companyName');
const getCurrencyType = (state) => _.get(state, 'app.airBooking.searchRequest.currencyType');
const getUpliftInstallmentPaymentsMboxToggle = (state) =>
  _.get(state, 'app.toggles.USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX', false);
const getAirBookingIsUpliftVisible = (state) => _.get(state, 'app.airBooking.isUpliftVisible', false);

export const getShouldShowUplift = (applicationType: string) =>
  createSelector(
    [
      upliftAvailability,
      getUpliftInstallmentPaymentsMboxToggle,
      getAirBookingIsUpliftVisible,
      getSelectedCompanyName,
      getCurrencyType
    ],
    (
      upliftAfp: AfpAvailability,
      USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX: boolean,
      airBookingIsUpliftVisible: boolean,
      selectedCompanyName?: string,
      currencyType?: string
    ) => {
      const isUpliftVisible = USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX
        ? applicationType === APPLICATION_TYPES.AIR_BOOKING && airBookingIsUpliftVisible
        : true;
      const isPointsBooking = applicationType === APPLICATION_TYPES.AIR_BOOKING && currencyType === POINTS;

      return isUpliftVisible && upliftAfp.shouldDisplay && !isPointsBooking && !selectedCompanyName;
    }
  );

export const getShouldDisableUplift = (state: *, applicationType: string) =>
  createSelector([upliftAvailability], (upliftAfp: AfpAvailability) => {
    const isShortTimeToTravel = getShortTTTForApplication(state, applicationType);
    const upliftPaxAgeLimit = _.get(
      state,
      'app.wcmContent.applicationProperties.UPLIFT_PAX_AGE_LIMIT',
      DEFAULT_UPLIFT_PAX_AGE_LIMIT
    );
    const isFirstPassengerUnderAgeLimit = getFirstPassengerAge(state, applicationType) < upliftPaxAgeLimit;

    return (!upliftAfp.isAvailable && upliftAfp.shouldDisplay) || isShortTimeToTravel || isFirstPassengerUnderAgeLimit;
  });

const getShortTTTForApplication = (state: *, applicationType: string) => {
  const timeToTravelHoursLimit = _.get(
    state,
    'app.wcmContent.applicationProperties.UPLIFT_TIME_TO_TRAVEL_HOURS_LIMIT',
    DEFAULT_UPLIFT_TIME_TO_TRAVEL_HOURS_LIMIT
  );

  return getTimeToTravelForApplication(state, applicationType) < timeToTravelHoursLimit;
};

const getTimeToTravelForApplication = (state: *, applicationType: string) => {
  switch (applicationType) {
    case APPLICATION_TYPES.AIR_BOOKING: {
      const { departureDate, departureTime } = _.get(
        state,
        'app.airBooking.flightPricingPage.response.flightPricingPage.bounds[0]',
        {}
      );
      const dateTimeString = `${departureDate} ${departureTime}`;

      return dayjs(dateTimeString).diff(dayjs(), 'hours');
    }
    default: {
      return;
    }
  }
};

const getFirstPassengerAge = (state: *, applicationType: string) => {
  switch (applicationType) {
    case APPLICATION_TYPES.AIR_BOOKING: {
      const firstPassenger = _.get(state, 'app.airBooking.passengerInfos[0].passengerInfo', {});

      if (!firstPassenger.dateOfBirth) {
        return;
      }

      return dayjs().diff(dayjs(firstPassenger.dateOfBirth), 'years');
    }
    default: {
      return;
    }
  }
};

const getPersistenceIdentifier = () => {
  const id = store2.session.get(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER);

  if (id) {
    return id;
  }

  const { hex } = uuidGenerator.create();

  store2.session.set(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER, hex);

  return hex;
};

export const getUpliftPaymentMethodConfigParams = (
  state: *,
  ceptorConfig: CeptorConfig,
  amount: number,
  applicationType: string
) => {
  const { requestedAFPParams: { paymentMethodConfigParams = [] } = {} } = ceptorConfig || {};

  const upliftPaymentMethodConfigParam = _.find(
    paymentMethodConfigParams,
    (param) => param.paymentMethod === PAYMENT_METHODS.UPLIFT
  );

  return upliftPaymentMethodConfigParam
    ? _.merge({}, upliftPaymentMethodConfigParam, {
      config: {
        checkout: true,
        persistenceIdentifier: getPersistenceIdentifier(),
        shortTTT: getShortTTTForApplication(state, applicationType),
        tripInfo: getUpliftTripInfo(state, applicationType),
        prices: getUpliftPrices(state, amount, applicationType)
      }
    })
    : {};
};

const getUpliftPrices = (state: *, amount: number, applicationType: string) => {
  const { unitPriceAmount = 0 } = getEarlyBirdEligibilityData(state, applicationType);

  return {
    [PRICE_TYPES.UP_EARLY_BIRD_CHECK_IN]: {
      model: 'per_person',
      type: 'addon_option',
      value: unitPriceAmount
    },
    [PRICE_TYPES.UP_TRIP_TOTAL]: {
      model: 'total',
      type: 'total',
      value: amount
    }
  };
};

const getUpliftTripInfo = (state: *, applicationType: string) => {
  switch (applicationType) {
    case APPLICATION_TYPES.AIR_BOOKING: {
      return getAirBookingUpliftTripInfo(state, applicationType);
    }
    default: {
      return INITIAL_TRIP_INFO;
    }
  }
};

const getEarlyBirdEligibilityData = (state: *, applicationType: string) => {
  switch (applicationType) {
    case APPLICATION_TYPES.AIR_BOOKING: {
      const earlyBirdEligibility = _.get(state, 'app.airBooking.earlyBirdEligibility');

      if (earlyBirdEligibility) {
        return {
          unitPriceAmount: getAmountFromTotal(earlyBirdEligibility.unitPrice),
          totalPriceAmount: getAmountFromTotal(earlyBirdEligibility.totalPrice),
          quantity: earlyBirdEligibility.adultProductsCount
        };
      }

      return {};
    }
    default: {
      return {};
    }
  }
};

const getEarlyBirdOrders = (earlyBirdSelected, quantity, totalAmount, earlyBirdUnitPriceAmount) => {
  if (earlyBirdSelected) {
    return [
      {
        name: 'EarlyBird Check-in',
        quantity,
        total_amount: totalAmount,
        unit_price: earlyBirdUnitPriceAmount
      }
    ];
  }

  return [];
};

const getAirBookingUpliftTripInfo = (state: *, applicationType: string) => {
  const passengerInfos = _.get(state, 'app.airBooking.passengerInfos');
  const searchRequest = _.get(state, 'app.airBooking.searchRequest');
  const flightPricingPageResponse = _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage');

  if (!(passengerInfos && searchRequest && flightPricingPageResponse)) {
    return INITIAL_TRIP_INFO;
  }

  const moneyTotal = _.get(flightPricingPageResponse, 'totals.moneyTotal');
  const { bounds = [] } = flightPricingPageResponse;

  const airports = _.get(state, 'app.airports.allAirports', []);

  const earlyBirdSelected = _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false)
    ? _.get(state, 'app.airBooking.earlyBirdSelected', false)
    : _.get(state, `app.formData.${AIRBOOKING_PURCHASE_SUMMARY_FORM}.data.isEarlyBirdInPathRadioButtonChecked`, false);
  const {
    unitPriceAmount = 0,
    totalPriceAmount = 0,
    quantity = 0
  } = getEarlyBirdEligibilityData(state, applicationType);
  const earlyBirdOrders = getEarlyBirdOrders(earlyBirdSelected, quantity, totalPriceAmount, unitPriceAmount);

  return {
    travelers: _.map(passengerInfos, ({ passengerInfo }, index: number) => ({
      id: index,
      first_name: passengerInfo.firstName,
      last_name: passengerInfo.lastName
    })),
    air_reservations: [
      {
        price: getAmountFromTotal(moneyTotal),
        trip_type: searchRequest.tripType && searchRequest.tripType.toLowerCase(),
        origin: searchRequest.origin,
        destination: searchRequest.destination,
        itinerary: _.map(bounds, (bound) => ({
          departure_apc: _.get(bound, 'departureAirport.code'),
          departure_time: formatDate(bound.departureDate),
          departure_city: getAirportCityName(airports, _.get(bound, 'departureAirport.code')),
          arrival_apc: _.get(bound, 'arrivalAirport.code'),
          arrival_time: formatDate(getArrivalDate(bound)),
          arrival_city: getAirportCityName(airports, _.get(bound, 'arrivalAirport.code')),
          carrier_code: 'WN',
          fare_class: _.get(bound, 'fareProductDetails.fareProductId')
        }))
      }
    ],
    order_lines: earlyBirdOrders
  };
};

const formatDate = (dateString) => dateString && dateString.replace(/-/g, '');
const getAirportCityName = (airports, airportCode) => {
  const airport = getAirportFromCode(airports, airportCode);

  return airport.cityName;
};
const getArrivalDate = (bound) => {
  const { isNextDayArrival, departureDate } = bound;

  if (!isNextDayArrival) {
    return departureDate;
  }

  return dayjs(departureDate).add(1, 'd').format('YYYY-MM-DD');
};

export const getUpliftAdditionalMessaging = (offerId: string) =>
  createSelector([upliftAvailability], (upliftAfp: AfpAvailability) => {
    if (!upliftAfp.isAvailable) {
      return;
    }

    const offers = _.get(upliftAfp, 'parameters.offers', {});
    const monthlyPaymentAmountInCents = _.get(offers, `${offerId}.monthlyPaymentAmount`);

    const monthlyPaymentAmount = _.toNumber(monthlyPaymentAmountInCents) / 100 || 0;

    if (monthlyPaymentAmount === 0) {
      return;
    }

    return `Pay Monthly from $${monthlyPaymentAmount.toFixed(2)}/mo`;
  });
