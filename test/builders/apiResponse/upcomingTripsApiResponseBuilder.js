class UpcomingTripsApiResponseBuilder {
  constructor() {
    this.trips = [];
    this.totalTrips = this.trips.length;
  }

  withTrip(trip) {
    this.trips.push(trip);

    return this;
  }

  addFlight() {
    this.trips.push({
      tripId: '0dfa89a2-4051-4134-9ba7-368d3afc282d',
      tripName: '19/05/17 - Austin',
      flights: [{
        passengers: [
          {
            firstName: 'ROBIN',
            lastName: 'HOOD',
            loyaltyAccountNumber: '00000600597056',
            earlyBirdEligibilities: [
              {
                earlyBirdProductId: null,
                status: 'RAPID_REWARDS_A_LIST',
                priceCents: 0,
                originationDestinationId: '201507210545-0500,201507210755-0500|MDW-DAL|WN530'
              }
            ]
          }
        ],
        originDestinations: [
          {
            segments: [
              {
                departureDateTime: '2015-07-21T05:45:00.000-05:00',
                arrivalDateTime: '2015-07-21T07:55:00.000-05:00',
                originationAirportCode: 'MDW',
                destinationAirportCode: 'DAL',
                operatingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '530'
                },
                marketingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '530'
                },
                legs: [
                  {
                    originationAirportCode: 'MDW',
                    destinationAirportCode: 'DAL'
                  }
                ],
                wifiAvailable: null
              }
            ],
            durationMinutes: 0,
            checkinDocumentReason: null,
            checkinDocumentType: null,
            _links: null
          },
          {
            segments: [
              {
                departureDateTime: '2015-08-02T05:45:00.000-05:00',
                arrivalDateTime: '2015-08-02T07:55:00.000-05:00',
                originationAirportCode: 'DAL',
                destinationAirportCode: 'LAX',
                operatingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '530'
                },
                marketingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '530'
                },
                legs: [
                  {
                    originationAirportCode: 'DAL',
                    destinationAirportCode: 'LAX'
                  }
                ],
                wifiAvailable: null
              }
            ],
            durationMinutes: 0,
            checkinDocumentReason: null,
            checkinDocumentType: null,
            _links: null
          },
          {
            segments: [
              {
                departureDateTime: '2015-08-04T18:05:00.000-05:00',
                arrivalDateTime: '2015-08-04T20:25:00.000-07:00',
                originationAirportCode: 'LAX',
                destinationAirportCode: 'MDW',
                operatingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '747'
                },
                marketingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '747'
                },
                legs: [
                  {
                    originationAirportCode: 'LAX',
                    destinationAirportCode: 'MDW'
                  }
                ],
                wifiAvailable: null
              }
            ],
            durationMinutes: 0,
            checkinDocumentReason: null,
            checkinDocumentType: null,
            _links: null
          }
        ],
        recordLocator: 'RVCOMP',
        internationalFlight: false
      }],
      cars: []
    });

    return this;
  }

  addCar() {
    this.trips.push({
      tripId: '72c0891f-b62e-4795-aa22-e080ae47941b',
      tripName: '06/23/17 - Houston',
      flights: [],
      cars: [{
        confirmationNumber: '08172185US0',
        firstName: 'Cannon',
        lastName: 'Biggs',
        pickUpDate: '2017-09-16',
        dropOffDate: '2017-09-19',
        vendor: 'Enterprise',
        vehicleType: 'Mid-size',
        pickupLocation: 'DAL'
      }]
    });

    return this;
  }

  build() {
    return {
      trips: this.trips,
      totalTrips: this.trips.length
    };
  }
}

module.exports = UpcomingTripsApiResponseBuilder;
