const _ = require('lodash');
const adultOneWayByDollars = require('mocks/templates/product/adultOneWayByDollars');
const adultOneWayByPoints = require('mocks/templates/product/adultOneWayByPoints');
const adultRoundTripByDollars = require('mocks/templates/product/adultRoundTripByDollars');
const adultRoundTripByPoints = require('mocks/templates/product/adultRoundTripByPoints');

const responseMap = {
  oneWay_BOI2BOSPass1_USD: require('mocks/templates/product/boi2bosPass1_oneWay'),
  oneWay_BOI2BOSPass8_USD: require('mocks/templates/product/boi2bosPass8_oneWay'),
  oneWay_DAL2HOUPass1_PTS: require('mocks/templates/product/dal2houPointsPass1_oneWay'),
  roundTrip_DAL2HOUPass1_USD: require('mocks/templates/product/dal2houPass1_roundTrip'),
  roundTrip_DAL2HOUPass8_USD: require('mocks/templates/product/dal2houPass8_roundTrip'),
  roundTrip_DAL2HOUPass1_PTS: require('mocks/templates/product/dal2houPointsPass1_roundTrip')
};

module.exports = {
  path: '/chapi/v1/mobile-air-shopping/page/flights/products',
  method: 'GET',
  cache: false,
  template: (params, query) => {
    const originationAirport = query['origination-airport'];
    const destinationAirport = query['destination-airport'];
    const departureDate = query['departure-date'];
    const returnDate = query['return-date'];
    const currencyType = query['currency'];
    const promoCode = query['promo-code'];
    const passengerNumber = query['number-adult-passengers'];
    const isPromoCodeApplied = _.lowerCase(promoCode) === 'swapromo';

    const isDomestic = originationAirport === 'MEM' && destinationAirport === 'BNA';
    const productId = isDomestic ? 'DOMESTIC_PRODUCT' : undefined;

    const productsInfo = {
      originationAirport,
      destinationAirport,
      departureDate,
      returnDate,
      isPromoCodeApplied,
      promoCode,
      productId
    };

    const isDollarBooking = currencyType === 'USD';
    const isPointsBooking = currencyType === 'PTS';
    const isOneWayTrip = !returnDate;
    const tripType = isOneWayTrip ? 'oneWay' : 'roundTrip';

    const responseKey = `${tripType}_${originationAirport}2${destinationAirport}Pass${passengerNumber}_${currencyType}`;
    const repsonseOverride = responseMap[responseKey];

    if (repsonseOverride) {
      return _.isFunction(repsonseOverride) ? repsonseOverride(productsInfo) : repsonseOverride;
    }

    if (isOneWayTrip) {
      if (isDollarBooking) return adultOneWayByDollars(productsInfo);

      if (isPointsBooking) return adultOneWayByPoints(productsInfo);
    } else {
      if (isDollarBooking) return adultRoundTripByDollars(productsInfo);

      if (isPointsBooking) return adultRoundTripByPoints(productsInfo);
    }
  },

  status(req, res) {
    if (req.query['origination-airport'] === 'SEA') {
      return res.status(400).send({
        code: 500599101,
        message: 'Sorry! We were unable to process your request at this time. Please try again.',
        httpStatusCode: 'INTERNAL_SERVER_ERROR',
        requestId: 'ROM1pshhRh69x6_on66rtQ-API'
      });
    }
  }
};
