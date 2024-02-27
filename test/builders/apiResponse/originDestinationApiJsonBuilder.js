module.exports = function OriginDestinationApiJsonBuilder() {
  this.checkinDocumentType = 'boardingPass';

  this.checkInLink = {
    href: '/reservations/record-locator/FBCYV3/boarding-passes',
    method: 'POST'
  };

  this.segments = [
    {
      segmentId: '201503190600-0500,201503190920-0600|DAL-DEN|WN1628',
      departureDateTime: '2015-04-07T06:15:00.000-05:00',
      arrivalDateTime: '2015-04-07T07:05:00.000-05:00',
      originationAirportCode: 'AUS',
      destinationAirportCode: 'HOU',
      operatingCarrierInfo: {
        carrierCode: 'WN',
        flightNumber: '3167'
      },
      marketingCarrierInfo: {
        carrierCode: 'WN',
        flightNumber: '3167'
      },
      legs: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'HOU'
        }
      ],
      wifiAvailable: false
    }
  ];

  this.fareType = 'Anytime';

  this.withFareType = function(fareType) {
    this.fareType = fareType;

    return this;
  };

  this.withSegments = function(segments) {
    this.segments = segments;

    return this;
  };

  this.withoutCheckinEligibility = function() {
    this.checkInLink = null;

    return this;
  };

  this.withCheckinDocumentType = function(type) {
    this.checkinDocumentType = type;

    return this;
  };

  this.build = function() {
    return {
      segments: this.segments,
      durationMinutes: 245,
      checkinDocumentReason: 'withinCheckinTimeWindow',
      checkinDocumentType: this.checkinDocumentType,
      fareType: this.fareType,
      _links: {
        checkin: this.checkInLink
      }
    };
  };
};
