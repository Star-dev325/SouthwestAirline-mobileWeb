const adultOneWayDollars = require('mocks/templates/low-fare-calendar/adultOneWayDollars');
const adultOneWayPoints = require('mocks/templates/low-fare-calendar/adultOneWayPoints');
const adultRoundTripDollars = require('mocks/templates/low-fare-calendar/adultRoundTripDollars');
const adultRoundTripPoints = require('mocks/templates/low-fare-calendar/adultRoundTripPoints');
const roundTripNAFlights = require('mocks/templates/low-fare-calendar/adultRoundTripDollarsNAPrices');

module.exports = {
  path: '/chapi/v1/mobile-air-shopping/page/flights/low-fare-calendar/products',
  method: 'GET',
  cache: false,
  template: (params, query) => {
    const originationAirport = query['origination-airport'];
    const destinationAirport = query['destination-airport'];
    const departureDate = query['departure-date'];
    const returnDate = query['return-date'];
    const currencyType = query['currency'];
    const productsInfo = {
      originationAirport,
      destinationAirport,
      departureDate,
      returnDate
    };
    const isDollarBooking = currencyType === 'USD';
    const isPointsBooking = currencyType === 'PTS';
    const isOneWayTrip = !returnDate;

    if (isOneWayTrip) {
      if (isDollarBooking) return adultOneWayDollars(productsInfo);

      if (isPointsBooking) return adultOneWayPoints(productsInfo);
    }

    if (originationAirport === 'TUL') return roundTripNAFlights(productsInfo);

    if (isDollarBooking) return adultRoundTripDollars(productsInfo);

    if (isPointsBooking) return adultRoundTripPoints(productsInfo);
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
