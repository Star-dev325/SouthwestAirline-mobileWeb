import _ from 'lodash';
import dayjs from 'dayjs';
import pluralize from 'pluralize';
import FlightSummariesTransformer from 'src/shared/transformers/flightSummariesTransformer';

const _isReservationCancelled = (reservationDetails) =>
  _.map(reservationDetails.bounds, 'isCancelled').reduce((acc, isCancelled) => acc || isCancelled, false);

const _transformToReservationDetailsViewModel = (airportGetter, tripResponse) => {
  const reservationDetails = FlightSummariesTransformer.getTripDetail(airportGetter, tripResponse);

  return {
    isCancelled: _isReservationCancelled(reservationDetails),
    flightSummaries: FlightSummariesTransformer.retrieveFlightSummariesFromReservation(reservationDetails)
  };
};

export const retrieveReservationDetails = _.curry(_transformToReservationDetailsViewModel);

const _transformToCurrencyType = (originalCurrency) => ({
  amount: originalCurrency.value,
  currencyCode: originalCurrency.currencyCode,
  currencySymbol: originalCurrency.currencySymbol || '$'
});

const _getCarLocationFromCode = (carLocations, carLocationCode) =>
  _.find(carLocations, {
    airport: {
      code: carLocationCode
    }
  });

export const transformRetrieveCarReservationApiResponse = (apiResponse, carVendorImages, carLocations) => {
  const pickupAirport = _getCarLocationFromCode(carLocations, apiResponse.pickupLocation);
  const dropoffAirport = _getCarLocationFromCode(carLocations, apiResponse.returnLocation);
  const vendorImage = _buildVendorImagePath(apiResponse.vendor, carVendorImages);

  let { cents, freeMileage, per } = apiResponse.mileage;

  if (_.isString(apiResponse.mileage)) {
    cents = 0;
    per = '';
    freeMileage = apiResponse.mileage;
  }

  return {
    manageCarReservationDetails: {
      driver: apiResponse.driver,
      confirmationNumber: apiResponse.confirmationNumber,
      isCancelled: apiResponse.cancelled
    },
    carReservationItinerary: {
      pickUpTime: apiResponse.pickupDatetime,
      dropOffTime: apiResponse.returnDatetime,
      pickUpDate: dayjs(apiResponse.pickupDatetime).format('dddd, MMM D, YYYY'),
      dropOffDate: dayjs(apiResponse.returnDatetime).format('dddd, MMM D, YYYY'),
      pickUpAirport: _buildLocation(pickupAirport),
      dropOffAirport: _buildLocation(dropoffAirport),
      vendorImage
    },
    carReservationDetail: {
      carType: apiResponse.vehicleType,
      baseRate: _transformToCurrencyType(apiResponse.price.total),
      dailyRate: {
        price: _transformToCurrencyType(apiResponse.price.dailyRate),
        perQuantity: pluralize('Day', apiResponse.numberOfDays, true)
      },
      promoCodeApplied: !_.chain(apiResponse).get('appliedDiscounts').isEmpty().value(),
      selectedCarExtras: _buildSelectedCarExtras(apiResponse.extras),
      totalPrice: _transformToCurrencyType(apiResponse.price.totalWithTaxes),
      showTotalPrice: true,
      vendorImage,
      mileage: {
        cents,
        freeMileage,
        per
      },
      rentalDeskLocation: apiResponse.rentalDeskLocation
    }
  };
};

export const transformHotelReservation = (hotelReservation) => {
  const { priceDetails } = hotelReservation;

  return {
    ...hotelReservation,
    priceDetails: {
      ...priceDetails,
      roomCost: priceDetails.totalCents - priceDetails.taxesAndFeesCents - priceDetails.hotelImposedFeesCents
    }
  };
};

const _buildSelectedCarExtras = (extras) => _.map(extras, (extra) => ({ description: extra, type: extra }));

const _buildVendorImagePath = (vendor, carVendorImages) =>
  _.chain(carVendorImages).find({ vendorName: vendor }).get('logoImage').value();

const _buildLocation = ({ airport, city, state }) => ({
  airportCode: airport.code,
  airportName: city,
  cityName: city,
  cityState: state
});
