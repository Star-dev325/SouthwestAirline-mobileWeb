module.exports = function EarlyBirdReservationApiJsonBuilder() {
  const outboundId = '201601150620-0600,201601150720-0600|AUS-DAL|WN1439';
  const inboundId = '201601202220-0600,201601202315-0600|DAL-AUS|WN2407';

  const _getOutbound = function() {
    return {
      segments: [
        {
          departureDateTime: '2016-01-15T06:20:00.000-06:00',
          arrivalDateTime: '2016-01-15T07:20:00.000-06:00',
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1439'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1439'
          },
          legs: [
            {
              originationAirportCode: 'AUS',
              destinationAirportCode: 'DAL'
            }
          ],
          wifiAvailable: null
        }
      ],
      durationMinutes: 60,
      originationDestinationId: outboundId,
      checkinDocumentReason: null,
      checkinDocumentType: null,
      fareType: 'Wanna Get Away',
      _links: {
        deleteBoardingPass: null
      }
    };
  };

  const _getInbound = function() {
    return {
      segments: [
        {
          departureDateTime: '2016-01-20T22:20:00.000-06:00',
          arrivalDateTime: '2016-01-20T23:15:00.000-06:00',
          originationAirportCode: 'DAL',
          destinationAirportCode: 'AUS',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2407'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2407'
          },
          legs: [
            {
              originationAirportCode: 'DAL',
              destinationAirportCode: 'AUS'
            }
          ],
          wifiAvailable: null
        }
      ],
      durationMinutes: 55,
      originationDestinationId: inboundId,
      checkinDocumentReason: null,
      checkinDocumentType: null,
      fareType: 'Wanna Get Away',
      _links: {
        deleteBoardingPass: null
      }
    };
  };

  const _getInboundWithConnectingRoundTripFlight = function() {
    return {
      segments: [
        {
          departureDateTime: '2016-01-15T09:20:00.000-06:00',
          arrivalDateTime: '2016-01-15T11:20:00.000-06:00',
          originationAirportCode: 'DAL',
          destinationAirportCode: 'ATL',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1439'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1439'
          },
          legs: [
            {
              originationAirportCode: 'DAL',
              destinationAirportCode: 'ATL'
            }
          ],
          wifiAvailable: null
        },
        {
          departureDateTime: '2016-01-20T22:20:00.000-06:00',
          arrivalDateTime: '2016-01-20T23:15:00.000-06:00',
          originationAirportCode: 'ATL',
          destinationAirportCode: 'AUS',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2407'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2407'
          },
          legs: [
            {
              originationAirportCode: 'ATL',
              destinationAirportCode: 'AUS'
            }
          ],
          wifiAvailable: null
        }
      ],
      durationMinutes: 60,
      originationDestinationId: outboundId,
      checkinDocumentReason: null,
      checkinDocumentType: null,
      fareType: 'Wanna Get Away',
      _links: {
        deleteBoardingPass: null
      }
    };
  };

  const _getEarlyBirdEligibility = function(status, originDestinationId) {
    return {
      earlyBirdProductId: status === 'ELIGIBLE' ? 'QVVTfDIwMTYtMDEtMTV8MTQzOXxJVkVSU09OfHxMSXx8MTI1MA==' : null,
      status,
      priceCents: status === 'ELIGIBLE' ? 1250 : 0,
      originationDestinationId: originDestinationId
    };
  };

  const _getPassenger = function(passengerInfo, type = 'oneWay') {
    const { firstName, lastName, outboundStatus, inboundStatus } = passengerInfo;
    const passenger = {
      secureFlightName: {
        firstName,
        lastName,
        middleName: '',
        suffix: ''
      },
      birthDate: '2014-01-01',
      gender: 'M',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
      earlyBirdEligibilities: []
    };

    passenger.earlyBirdEligibilities.push(_getEarlyBirdEligibility(outboundStatus, outboundId));

    if (type === 'roundTrip') {
      passenger.earlyBirdEligibilities.push(_getEarlyBirdEligibility(inboundStatus, inboundId));
    }

    if (type === 'threeOnds') {
      passenger.earlyBirdEligibilities.push(_getEarlyBirdEligibility(inboundStatus, inboundId));
      passenger.earlyBirdEligibilities.push(_getEarlyBirdEligibility(outboundStatus, outboundId));
    }

    return passenger;
  };

  const generateOriginDestinations = function(type = 'oneWay') {
    const originDestinations = [];

    originDestinations.push(_getOutbound());

    if (type === 'roundTrip') {
      originDestinations.push(_getInbound());
    }

    if (type === 'threeOnds') {
      originDestinations.push(_getInbound());
      originDestinations.push(_getOutbound());
    }

    if (type === 'openJaw') {
      originDestinations.push(_getOutbound());
    }

    if (type === 'roundTripConnectingFlight') {
      originDestinations.push(_getInboundWithConnectingRoundTripFlight());
    }

    return originDestinations;
  };

  const generatePassengers = function(passengerInfos, type = 'oneWay') {
    const passengers = [];

    passengerInfos.forEach((passengerInfo) => {
      passengers.push(_getPassenger(passengerInfo, type));
    });

    return passengers;
  };

  this.recordLocator = 'HN2L3R';
  this.originationDestinations = generateOriginDestinations('roundTrip');
  this.passengers = generatePassengers([
    { firstName: 'IVERSON', lastName: 'LI', outboundStatus: 'ELIGIBLE', inboundStatus: 'ELIGIBLE' },
    { firstName: 'RUOLIN', lastName: 'LUO', outboundStatus: 'ELIGIBLE', inboundStatus: 'ELIGIBLE' }
  ], 'roundTrip');

  this.withThreeOriginDestionations = function() {
    this.originationDestinations = generateOriginDestinations('threeOnds');
    this.passengers = generatePassengers([
      { firstName: 'RUOLIN', lastName: 'LUO', outboundStatus: 'ELIGIBLE', inboundStatus: 'ELIGIBLE' }
    ], 'threeOnds');

    return this;
  };

  this.withOneWayOriginationDestination = function() {
    this.originationDestinations = generateOriginDestinations('oneWay');
    this.passengers = generatePassengers([
      { firstName: 'IVERSON', lastName: 'LI', outboundStatus: 'ELIGIBLE', inboundStatus: 'ELIGIBLE' },
      { firstName: 'RUOLIN', lastName: 'LUO', outboundStatus: 'ELIGIBLE', inboundStatus: 'ELIGIBLE' }
    ], 'oneWay');

    return this;
  };

  this.withOpenJawOriginationDestinations = function() {
    this.originationDestinations = generateOriginDestinations('openJaw');

    return this;
  };

  this.withRoundTripConnectingFlightOriginationDestinations = function() {
    this.originationDestinations = generateOriginDestinations('roundTripConnectingFlight');

    return this;
  };

  this.withPassengers = function(passengers) {
    this.passengers = generatePassengers(passengers, 'roundTrip');

    return this;
  };

  this.build = function() {
    return {
      recordLocator: this.recordLocator,
      passengers: this.passengers,
      itinerary: {
        originationDestinations: this.originationDestinations
      },
      receiptEmail: 'A@BC.COM',
      currencyType: 'Dollars',
      international: false,
      warnings: [],
      unaccompaniedMinor: false
    };
  };
};
