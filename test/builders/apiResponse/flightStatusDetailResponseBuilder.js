const _ = require('lodash');

const DALtoAUSWithArrivalTimeInAnotherDay = {
  departureActualTime: '22:00:00.000',
  arrivalActualTime: '01:00:00.000',
  arrivalGate: null,
  departureGate: null,
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '622',
  destinationAirportCode: 'AUS',
  originationAirportCode: 'DAL',
  departureDate: '2015-02-19',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '622',
  departureScheduledTime: '06:00:00.000',
  arrivalScheduledTime: '06:55:00.000'
};

const DALtoAUSWithArrivalTimeInSameDay = _.merge({}, DALtoAUSWithArrivalTimeInAnotherDay, {
  departureActualTime: '22:00:00.000',
  arrivalActualTime: '23:00:00.000'
});

const twoLegsWithOneSegment =
  [
    {
      departureActualTime: '13:50:00.000',
      arrivalActualTime: '15:10:00.000',
      arrivalGate: null,
      departureGate: null,
      arrivalStatus: 'On Time',
      departureStatus: 'On Time',
      willAdviseArrival: false,
      willAdviseDeparture: false,
      wifiOnBoard: 'false',
      marketingFlightNumber: '3408',
      destinationAirportCode: 'BNA',
      originationAirportCode: 'MDW',
      departureDate: '2015-03-17',
      marketingCarrierCode: null,
      operatingCarrierCode: 'WN',
      operatingFlightNumber: '3408',
      departureScheduledTime: '13:50:00.000',
      arrivalScheduledTime: '15:10:00.000'
    },
    {
      departureActualTime: '15:45:00.000',
      arrivalActualTime: '17:45:00.000',
      arrivalGate: null,
      departureGate: null,
      arrivalStatus: 'On Time',
      departureStatus: 'On Time',
      willAdviseArrival: false,
      willAdviseDeparture: false,
      wifiOnBoard: 'false',
      marketingFlightNumber: '3408',
      destinationAirportCode: 'DAL',
      originationAirportCode: 'BNA',
      departureDate: '2015-03-17',
      marketingCarrierCode: null,
      operatingCarrierCode: 'WN',
      operatingFlightNumber: '3408',
      departureScheduledTime: '15:45:00.000',
      arrivalScheduledTime: '17:45:00.000'
    }
  ];

const twoLegsWithTwoSegments = [
  {
    departureActualTime: '06:00:00.000',
    arrivalActualTime: '06:55:00.000',
    arrivalGate: null,
    departureGate: null,
    arrivalStatus: 'On Time',
    departureStatus: 'On Time',
    willAdviseArrival: false,
    willAdviseDeparture: false,
    wifiOnBoard: 'false',
    marketingFlightNumber: '622',
    destinationAirportCode: 'AUS',
    originationAirportCode: 'DAL',
    departureDate: '2015-02-19',
    marketingCarrierCode: null,
    operatingCarrierCode: 'WN',
    operatingFlightNumber: '622',
    departureScheduledTime: '06:00:00.000',
    arrivalScheduledTime: '06:55:00.000'
  },
  {
    departureActualTime: '06:00:00.000',
    arrivalActualTime: '06:55:00.000',
    arrivalGate: null,
    departureGate: null,
    arrivalStatus: 'On Time',
    departureStatus: 'On Time',
    willAdviseArrival: false,
    willAdviseDeparture: false,
    wifiOnBoard: 'false',
    marketingFlightNumber: '555',
    destinationAirportCode: 'MDW',
    originationAirportCode: 'AUS',
    departureDate: '2015-02-19',
    marketingCarrierCode: null,
    operatingCarrierCode: 'WN',
    operatingFlightNumber: '555',
    departureScheduledTime: '06:00:00.000',
    arrivalScheduledTime: '06:55:00.000'
  }
];

const twoStopsWithOneChangePlane = [{
  departureActualTime: '12:05:00.000',
  arrivalActualTime: '15:35:00.000',
  arrivalGate: 'C44',
  departureGate: '25',
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '4142',
  destinationAirportCode: 'DEN',
  originationAirportCode: 'SFO',
  departureDate: '2017-04-09',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '4142',
  departureScheduledTime: '12:05:00.000',
  arrivalScheduledTime: '15:35:00.000',
  equipmentType: '73W'
}, {
  departureActualTime: '16:10:00.000',
  arrivalActualTime: '19:05:00.000',
  arrivalGate: 'E24',
  departureGate: 'C44',
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '4142',
  destinationAirportCode: 'STL',
  originationAirportCode: 'DEN',
  departureDate: '2017-04-09',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '4142',
  departureScheduledTime: '16:10:00.000',
  arrivalScheduledTime: '19:05:00.000',
  equipmentType: '73W'
}, {
  departureActualTime: '20:45:00.000',
  arrivalActualTime: '00:15:00.000',
  arrivalGate: null,
  departureGate: 'E12',
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '6005',
  destinationAirportCode: 'BOS',
  originationAirportCode: 'STL',
  departureDate: '2017-04-09',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '6005',
  departureScheduledTime: '20:45:00.000',
  arrivalScheduledTime: '00:15:00.000',
  equipmentType: '73W'
}];

const oneStopsWithOneChangePlane = [{
  departureActualTime: '09:35:00.000',
  arrivalActualTime: '15:25:00.000',
  arrivalGate: 'E18',
  departureGate: '27',
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '6073',
  destinationAirportCode: 'STL',
  originationAirportCode: 'SFO',
  departureDate: '2017-04-09',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '6073',
  departureScheduledTime: '09:35:00.000',
  arrivalScheduledTime: '15:25:00.000',
  equipmentType: '73W'
}, {
  departureActualTime: '17:45:00.000',
  arrivalActualTime: '21:15:00.000',
  arrivalGate: null,
  departureGate: 'E16',
  arrivalStatus: 'On Time',
  departureStatus: 'On Time',
  willAdviseArrival: false,
  willAdviseDeparture: false,
  wifiOnBoard: 'false',
  marketingFlightNumber: '4034',
  destinationAirportCode: 'BOS',
  originationAirportCode: 'STL',
  departureDate: '2017-04-09',
  marketingCarrierCode: null,
  operatingCarrierCode: 'WN',
  operatingFlightNumber: '4034',
  departureScheduledTime: '17:45:00.000',
  arrivalScheduledTime: '21:15:00.000',
  equipmentType: '73W'
}];

module.exports = {
  buildSingleSegmentWithArrivalTimeInAnotherDay() {
    return [_.cloneDeep(DALtoAUSWithArrivalTimeInAnotherDay)];
  },
  buildSingleSegmentWithArrivalTimeInSameDay() {
    return [_.cloneDeep(DALtoAUSWithArrivalTimeInSameDay)];
  },
  buildTwoLegsWithOneSegment() {
    return _.cloneDeep(twoLegsWithOneSegment);
  },
  buildTwoLegsWithTwoSegments() {
    return _.cloneDeep(twoLegsWithTwoSegments);
  },
  buildTwoStopsWithOneChangePlane() {
    return _.cloneDeep(twoStopsWithOneChangePlane);
  },
  buildOneStopsWithOneChangePlane() {
    return _.cloneDeep(oneStopsWithOneChangePlane);
  }
};
