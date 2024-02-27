const dayjs = require('dayjs');
const FlightStatusBuilder = require('test/builders/model/flightStatusBuilder');

function FlightSegmentBuilder() {
  const FlightSegment = require('src/shared/viewModels/flightSegment').default;

  this.flightNumber = '15';
  this.aircraftInfo = {
    aircraftType: 'Boeing 777'
  };
  this.departureAirport = 'DAL';
  this.arrivalAirport = 'MDW';
  this.wifiAvailable = false;
  this.departureDateTime = dayjs().format();
  this.departureDate = dayjs().format('YYYY-MM-DD');
  this.arrivalDateTime = dayjs().format();
  this.departureTime = dayjs().format('HH:mm');
  this.arrivalTime = dayjs().format('HH:mm');
  this.isInternational = false;
  this.isCheckInEligible = false;
  this.hasCheckedIn = false;
  this.stopAirports = [];
  this.flightStatus = new FlightStatusBuilder().build();
  this.isEBEligible = false;
  this.isNonRevPnr = false;
  this.departureAirportDisplayName = 'Chicago (Midway)';
  this.arrivalAirportDisplayName = 'Dallas (Love Field)';
  this.destinationDescription = 'Dallas';
  this.checkInIneligibilityReason = null;
  this.informationalMessagingType = 'POSITIVE';
  this.informationalMessaging = 'Check in begins 24 hours before departure.';
  this.greyBoxMessage = null;

  this.withEBEligible = (isEBEligible) => {
    this.isEBEligible = isEBEligible;

    return this;
  };

  this.withFlightNumber = function(flightNumber) {
    this.flightNumber = flightNumber;

    return this;
  };

  this.withInformationalMessagingAndType = function(informationalMessaging, informationalMessagingType) {
    this.informationalMessagingType = informationalMessagingType;
    this.informationalMessaging = informationalMessaging;

    return this;
  };

  this.withArrivalDateTime = function(dateTime) {
    this.arrivalDateTime = dateTime.format();

    return this;
  };

  this.withDepartureDateTime = function(dateTime) {
    this.departureDateTime = dateTime.format();

    return this;
  };

  this.withStopAirports = function(stopAirports) {
    this.stopAirports = stopAirports;

    return this;
  };

  this.withWifiAvailable = function(wifiAvailable) {
    this.wifiAvailable = wifiAvailable;

    return this;
  };

  this.withHasCheckedIn = function(hasCheckedIn) {
    this.hasCheckedIn = hasCheckedIn;

    return this;
  };

  this.withFlightStatus = function(flightStatus) {
    this.flightStatus = flightStatus;

    return this;
  };

  this.withInternationalFlight = function() {
    this.isInternational = true;

    return this;
  };

  this.withCheckInEligible = function() {
    this.isCheckInEligible = true;

    return this;
  };

  this.withCheckInIneligibilityReason = function(checkInIneligibilityReason) {
    this.checkInIneligibilityReason = checkInIneligibilityReason;

    return this;
  };

  this.withStandbyFlight = function() {
    this.standbyFlight = {
      arrivalAirportCode: 'AUS',
      arrivalTime: '09:55',
      departureTime: '09:00',
      flightNumber: '726',
      hasWifi: true,
      aircraftInfo: {
        aircraftType: 'Boeing 777'
      },
      viewStandbyList: {
        href: '/v1/mobile-air-operations/page/standby',
        method: 'GET',
        query: {
          'arrival-time': '09:55',
          'carrier-code': 'WN',
          'departure-date': '2017-10-12',
          'departure-time': '09:00',
          'destination-airport': 'AUS',
          'first-name': 'ITEST',
          'flight-number': '726',
          'has-wifi': true,
          'last-name': 'WANG',
          'origin-airport': 'DAL',
          'record-locator': 'STMXQ6'
        }
      }
    };

    return this;
  };

  this.withNonRevenue = function(isNonRevenue) {
    this.isNonRevPnr = isNonRevenue;

    return this;
  };

  this.withDepartureTime = function(departureTime) {
    this.departureTime = departureTime;

    return this;
  };

  this.withArrivalTime = function(arrivalTime) {
    this.arrivalTime = arrivalTime;

    return this;
  };

  this.withDepartureAirportDisplayName = function(departureAirportDisplayName) {
    this.departureAirportDisplayName = departureAirportDisplayName;

    return this;
  };

  this.withArrivalAirportDisplayName = function(arrivalAirportDisplayName) {
    this.arrivalAirportDisplayName = arrivalAirportDisplayName;

    return this;
  };

  this.withBoardingPosition = (group, position) => {
    this.boardingGroup = group;
    this.boardingPosition = position;

    return this;
  };

  this.withGreyBoxMessage = () => {
    this.greyBoxMessage = {
      key: 'GREY_BOX_MOCK_MESSAGE',
      header: 'This is a mocked grey box header.',
      body: 'Mock grey box message.'
    };

    return this;
  };

  this.build = function() {
    const flightSegment = new FlightSegment({
      departureAirport: this.departureAirport,
      arrivalAirport: this.arrivalAirport,
      operatingCarrierInfo: { flightNumber: this.flightNumber },
      wifiAvailable: this.wifiAvailable,
      aircraftInfo: this.aircraftInfo,
      departureDateTime: this.departureDateTime,
      departureDate: this.departureDate,
      arrivalDateTime: this.arrivalDateTime,
      stopAirports: this.stopAirports,
      flightStatus: this.flightStatus
    });

    flightSegment.hasCheckedIn = this.hasCheckedIn;
    flightSegment.isCheckedIn = this.hasCheckedIn;
    flightSegment.isCheckInEligible = this.isCheckInEligible;
    flightSegment.isInternational = this.isInternational;
    flightSegment.checkInIneligibilityReason = this.checkInIneligibilityReason;
    flightSegment.standbyFlight = this.standbyFlight;
    flightSegment.isNonRevPnr = this.isNonRevPnr;
    flightSegment.departureTime = this.departureTime;
    flightSegment.arrivalTime = this.arrivalTime;
    flightSegment.boardingGroup = this.boardingGroup;
    flightSegment.boardingPosition = this.boardingPosition;
    flightSegment.departureAirportDisplayName = this.departureAirportDisplayName;
    flightSegment.arrivalAirportDisplayName = this.arrivalAirportDisplayName;
    flightSegment.destinationDescription = this.destinationDescription;
    flightSegment.isEBEligible = this.isEBEligible;
    flightSegment.informationalMessagingType = this.informationalMessagingType;
    flightSegment.informationalMessaging = this.informationalMessaging;
    flightSegment.greyBoxMessage = this.greyBoxMessage;

    return flightSegment;
  };
}

module.exports = FlightSegmentBuilder;
