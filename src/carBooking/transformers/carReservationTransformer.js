import dayjs from 'dayjs';
import pluralize from 'pluralize';
import _ from 'lodash';
import { PRICING } from 'src/carBooking/constants/carBookingMessages';

export const transformToCarReservation = (apiResponse, selectedCarResult, searchRequest, selectedCarExtras) => {
  const {
    pickupDateTime,
    dropOffDateTime,
    vehicleType,
    numberOfDays,
    price: {
      totalCents,
      totalCentsWithTaxes,
      dailyRateCents,
      rates,
      taxes,
      dailyRateWithCurrencyCode,
      taxesWithCurrencyCode,
      totalWithCurrencyCode,
      totalWithTaxesAndCurrencyCode
    },
    additionalCharges,
    rentalDeskLocation
  } = apiResponse;

  const { pickUpAirport, dropOffAirport } = searchRequest;
  const pickUpDate = _formatDate(pickupDateTime);
  const dropOffDate = _formatDate(dropOffDateTime);
  const { imageUrl, incentiveText, promoCodeApplied } = selectedCarResult;

  return {
    carReservationItinerary: {
      pickUpAirport: _transformToLocationDetail(pickUpAirport),
      dropOffAirport: _transformToLocationDetail(dropOffAirport),
      pickUpTime: pickupDateTime,
      dropOffTime: dropOffDateTime,
      pickUpDate,
      dropOffDate
    },
    carReservationDetail: {
      carType: vehicleType === 'Sports Utility' ? 'Standard SUV' : vehicleType, // todo: need to delete the condition if API return correct response
      promoCodeApplied: promoCodeApplied || false,
      selectedCarExtras: mapSelectedCarExtras(apiResponse.extras, selectedCarExtras),
      dailyRate: _formatDailyRate(rates, numberOfDays, dailyRateCents),
      baseRate: totalCents,
      totalPrice: totalCentsWithTaxes,
      taxes,
      vendorImage: imageUrl,
      mileage: additionalCharges ? additionalCharges.mileage : '',
      rrIncentiveText: incentiveText,
      rentalDeskLocation,
      dailyRateWithCurrencyCode,
      taxesWithCurrencyCode,
      totalWithCurrencyCode,
      totalWithTaxesAndCurrencyCode
    }
  };
};

export const mapSelectedCarExtras = (carExtras, selectedCarExtrasTypes) => {
  const selectedCarExtras = [];

  _.forEach(carExtras, (value) => {
    if (_.indexOf(selectedCarExtrasTypes, value.type) !== -1) {
      selectedCarExtras.push(value);
    }
  });

  return selectedCarExtras;
};

const _formatDate = (dateTime) => dayjs(dateTime).format('dddd, MMM D, YYYY');

const _formatDailyRate = (rates, numberOfDays, dailyRateCents) => {
  const unitForDaysFromApi = PRICING.DAY.toUpperCase();
  const ratesPerDay = _.find(rates, { per: unitForDaysFromApi });
  const cents = _.get(ratesPerDay, 'cents', dailyRateCents);
  const formattedPer = pluralize(PRICING.DAY, numberOfDays);
  const perQuantity = `${numberOfDays} ${formattedPer}`;

  return { perQuantity, cents };
};

const _transformToLocationDetail = (locationDetail) => {
  const {
    airport: { code },
    city,
    state
  } = locationDetail;

  return {
    airportCode: code,
    airportName: city,
    cityName: city,
    cityState: state
  };
};
