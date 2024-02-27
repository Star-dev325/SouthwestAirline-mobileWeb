module.exports = function FlightShoppingSearchBuilder(currencyType) {
  this.currencyType = currencyType || 'Dollars';
  this.trips = [
    generateOutBoundTrips(),
    generateInBoundTrips()
  ];

  this.withTrips = function(isRoundTrip, depatureDate, depatureDate2) {
    if (isRoundTrip) {
      this.trips = [
        generateOutBoundTrips(depatureDate, this.currencyType),
        generateInBoundTrips(depatureDate2, this.currencyType)
      ];
    } else {
      this.trips = [
        generateOutBoundTrips(depatureDate, this.currencyType)
      ];
    }

    return this;
  };

  this.build = function() {
    return {
      trips: this.trips,
      discountApplied: false,
      promoCodeApplied: false,
      promoCode: '',
      warnings: []
    };
  };
};

function generateOutBoundTrips(travelDate, currencyType) {
  const trip = currencyType === 'Dollars' ? outboundTripsWithDollars : outboundTripsWithPoints;

  if (travelDate) {
    trip.travelDate = travelDate;
  }

  return trip;
}

function generateInBoundTrips(travelDate, currencyType) {
  const trip = currencyType === 'Dollars' ? inboundTripsWithDollars : inboundTripsWithPoints;

  if (travelDate) {
    trip.travelDate = travelDate;
  }

  return trip;
}
const outboundTripsWithDollars = {
  travelDate: '2015-06-13',
  originationAirportCode: 'DAL',
  destinationAirportCode: 'ATL',
  airProducts: [
    {
      durationMinutes: 230,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'STL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1266'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1266'
          },
          departureDateTime: '2015-06-13T06:20',
          arrivalDateTime: '2015-06-13T08:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'STL',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1351'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1351'
          },
          departureDateTime: '2015-06-13T08:35',
          arrivalDateTime: '2015-06-13T11:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDYyMCwyMDE1MDYxMzExMTB8REFMLVNUTCxTVEwtQVRMfFdOMTI2NixXTjEzNTF8S3xBRFR8NzNXLDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'INSUFFICIENT_INVENTORY',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDYyMCwyMDE1MDYxMzExMTB8REFMLVNUTCxTVEwtQVRMfFdOMTI2NixXTjEzNTF8WXxBRFR8NzNXLDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'IMPOSSIBLE_ITINERARY',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDYyMCwyMDE1MDYxMzExMTB8REFMLVNUTCxTVEwtQVRMfFdOMTI2NixXTjEzNTF8TnxBRFR8NzNXLDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTEyMDU1MCwyMDE1MDUxMjA4MjV8QU1BLURBTCxEQUwtQVVTfFdONTg0LFdONDc0MnxRfFNSQ3w3MzUsNzNX',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 325,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'MDW',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1898'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1898'
          },
          departureDateTime: '2015-06-13T06:45',
          arrivalDateTime: '2015-06-13T09:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MDW',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2464'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2464'
          },
          departureDateTime: '2015-06-13T10:20',
          arrivalDateTime: '2015-06-13T13:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY0NSwyMDE1MDYxMzEzMTB8REFMLU1EVyxNRFctQVRMfFdOMTg5OCxXTjI0NjR8S3xBRFR8NzNILDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'INSUFFICIENT_INVENTORY',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY0NSwyMDE1MDYxMzEzMTB8REFMLU1EVyxNRFctQVRMfFdOMTg5OCxXTjI0NjR8WXxBRFR8NzNILDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'IMPOSSIBLE_ITINERARY',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY0NSwyMDE1MDYxMzEzMTB8REFMLU1EVyxNRFctQVRMfFdOMTg5OCxXTjI0NjR8V3xBRFR8NzNILDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'IMPOSSIBLE_ITINERARY',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTEyMDk1MCwyMDE1MDUxMjEzMDV8QU1BLURBTCxEQUwtQVVTfFdOODI1LFdONDczMHxRfFNSQ3w3MzUsNzND',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 135,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1465'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1465'
          },
          departureDateTime: '2015-06-13T06:55',
          arrivalDateTime: '2015-06-13T10:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY1NSwyMDE1MDYxMzEwMTB8REFMLUFUTHxXTjE0NjV8S3xBRFR8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY1NSwyMDE1MDYxMzEwMTB8REFMLUFUTHxXTjE0NjV8WXxBRFR8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDY1NSwyMDE1MDYxMzEwMTB8REFMLUFUTHxXTjE0NjV8TnxBRFR8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '2',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLNVCNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 9900,
            discountedTotalFareCents: 9900,
            accrualPoints: 474
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTEyMTQyNSwyMDE1MDUxMjE3MTB8QU1BLURBTCxEQUwtQVVTfFdONDEsV04yMDd8UXxTUkN8NzM1LDczQw==',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 200,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'MSY',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2125'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2125'
          },
          departureDateTime: '2015-06-13T08:40',
          arrivalDateTime: '2015-06-13T10:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'MSY',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1510'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1510'
          },
          departureDateTime: '2015-06-13T10:35',
          arrivalDateTime: '2015-06-13T13:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0MCwyMDE1MDYxMzEzMDB8REFMLU1TWSxNU1ktQVRMfFdOMjEyNSxXTjE1MTB8S3xBRFR8NzM1LDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0MCwyMDE1MDYxMzEzMDB8REFMLU1TWSxNU1ktQVRMfFdOMjEyNSxXTjE1MTB8WXxBRFR8NzM1LDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0MCwyMDE1MDYxMzEzMDB8REFMLU1TWSxNU1ktQVRMfFdOMjEyNSxXTjE1MTB8V3xBRFR8NzM1LDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTEyMTk1NSwyMDE1MDUxMjIzMTV8QU1BLURBTCxEQUwtQVVTfFdONzE2LFdOMzQwfFF8U1JDfDczQyw3M1c=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 290,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'MCI',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4420'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4420'
          },
          departureDateTime: '2015-06-13T08:45',
          arrivalDateTime: '2015-06-13T10:15',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MCI',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1141'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1141'
          },
          departureDateTime: '2015-06-13T11:40',
          arrivalDateTime: '2015-06-13T14:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0NSwyMDE1MDYxMzE0MzV8REFMLU1DSSxNQ0ktQVRMfFdONDQyMCxXTjExNDF8S3xBRFR8NzNXLDczMw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0NSwyMDE1MDYxMzE0MzV8REFMLU1DSSxNQ0ktQVRMfFdONDQyMCxXTjExNDF8WXxBRFR8NzNXLDczMw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDg0NSwyMDE1MDYxMzE0MzV8REFMLU1DSSxNQ0ktQVRMfFdONDQyMCxXTjExNDF8V3xBRFR8NzNXLDczMw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MDUzMCwyMDE1MDUxNTA5MTV8QVVTLURBTCxEQUwtQU1BfFdOMjcwLFdOMzg2fFF8U1JDfDczVyw3MzU=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 250,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4344'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4344'
          },
          departureDateTime: '2015-06-13T09:30',
          arrivalDateTime: '2015-06-13T10:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2632'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2632'
          },
          departureDateTime: '2015-06-13T11:40',
          arrivalDateTime: '2015-06-13T14:40',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDkzMCwyMDE1MDYxMzE0NDB8REFMLUhPVSxIT1UtQVRMfFdONDM0NCxXTjI2MzJ8S3xBRFR8NzM1LDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDkzMCwyMDE1MDYxMzE0NDB8REFMLUhPVSxIT1UtQVRMfFdONDM0NCxXTjI2MzJ8WXxBRFR8NzM1LDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDkzMCwyMDE1MDYxMzE0NDB8REFMLUhPVSxIT1UtQVRMfFdONDM0NCxXTjI2MzJ8U3xBRFR8NzM1LDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MDkzMCwyMDE1MDUxNTEzNDB8QVVTLURBTCxEQUwtQU1BfFdOMTg0LFdOMTh8UXxTUkN8NzM1LDczNQ==',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 130,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1493'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1493'
          },
          departureDateTime: '2015-06-13T11:25',
          arrivalDateTime: '2015-06-13T14:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTEyNSwyMDE1MDYxMzE0MzV8REFMLUFUTHxXTjE0OTN8S3xBRFR8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTEyNSwyMDE1MDYxMzE0MzV8REFMLUFUTHxXTjE0OTN8WXxBRFR8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTEyNSwyMDE1MDYxMzE0MzV8REFMLUFUTHxXTjE0OTN8TXxBRFR8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '5',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLNVPNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 12700,
            discountedTotalFareCents: 12700,
            accrualPoints: 630
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 300,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'MDW',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1297'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1297'
          },
          departureDateTime: '2015-06-13T12:10',
          arrivalDateTime: '2015-06-13T14:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MDW',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4416'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4416'
          },
          departureDateTime: '2015-06-13T15:15',
          arrivalDateTime: '2015-06-13T18:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTIxMCwyMDE1MDYxMzE4MTB8REFMLU1EVyxNRFctQVRMfFdOMTI5NyxXTjQ0MTZ8S3xBRFR8NzNXLDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTIxMCwyMDE1MDYxMzE4MTB8REFMLU1EVyxNRFctQVRMfFdOMTI5NyxXTjQ0MTZ8WXxBRFR8NzNXLDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTIxMCwyMDE1MDYxMzE4MTB8REFMLU1EVyxNRFctQVRMfFdOMTI5NyxXTjQ0MTZ8V3xBRFR8NzNXLDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTkzMCwyMDE1MDUxNTIyMTB8QVVTLUFNQXxXTjQyODB8UXxTUkN8NzM1',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22200,
            discountedTotalFareCents: 22200,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 265,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3818'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3818'
          },
          departureDateTime: '2015-06-13T13:30',
          arrivalDateTime: '2015-06-13T14:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4230'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4230'
          },
          departureDateTime: '2015-06-13T15:50',
          arrivalDateTime: '2015-06-13T18:55',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTMzMCwyMDE1MDYxMzE4NTV8REFMLUhPVSxIT1UtQVRMfFdOMzgxOCxXTjQyMzB8S3xBRFR8NzM1LDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTMzMCwyMDE1MDYxMzE4NTV8REFMLUhPVSxIT1UtQVRMfFdOMzgxOCxXTjQyMzB8WXxBRFR8NzM1LDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTMzMCwyMDE1MDYxMzE4NTV8REFMLUhPVSxIT1UtQVRMfFdOMzgxOCxXTjQyMzB8VU5BVkFJTEFCTEV8VU5BVkFJTEFCTEV8NzM1LDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '0',
          unavailabilityReason: 'INSUFFICIENT_INVENTORY',
          bookingCode: 'UNAVAILABLE',
          paxPricingType: 'UNAVAILABLE',
          currencyPrice: {
            totalFareCents: 0,
            discountedTotalFareCents: 0,
            accrualPoints: 0
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTkzMCwyMDE1MDUxNTIyMTB8QVVTLUFNQXxXTjQyODB8UXxTUkN8NzM1',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22200,
            discountedTotalFareCents: 22200,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 300,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1418'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1418'
          },
          departureDateTime: '2015-06-13T14:30',
          arrivalDateTime: '2015-06-13T15:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2146'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2146'
          },
          departureDateTime: '2015-06-13T17:25',
          arrivalDateTime: '2015-06-13T20:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTQzMCwyMDE1MDYxMzIwMzB8REFMLUhPVSxIT1UtQVRMfFdOMTQxOCxXTjIxNDZ8S3xBRFR8NzNXLDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTQzMCwyMDE1MDYxMzIwMzB8REFMLUhPVSxIT1UtQVRMfFdOMTQxOCxXTjIxNDZ8WXxBRFR8NzNXLDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTQzMCwyMDE1MDYxMzIwMzB8REFMLUhPVSxIT1UtQVRMfFdOMTQxOCxXTjIxNDZ8TnxBRFR8NzNXLDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 250,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'SAT',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1070'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1070'
          },
          departureDateTime: '2015-06-13T15:35',
          arrivalDateTime: '2015-06-13T16:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'SAT',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2303'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2303'
          },
          departureDateTime: '2015-06-13T17:20',
          arrivalDateTime: '2015-06-13T20:45',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTUzNSwyMDE1MDYxMzIwNDV8REFMLVNBVCxTQVQtQVRMfFdOMTA3MCxXTjIzMDN8S3xBRFR8NzM1LDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTUzNSwyMDE1MDYxMzIwNDV8REFMLVNBVCxTQVQtQVRMfFdOMTA3MCxXTjIzMDN8WXxBRFR8NzM1LDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTUzNSwyMDE1MDYxMzIwNDV8REFMLVNBVCxTQVQtQVRMfFdOMTA3MCxXTjIzMDN8U3xBRFR8NzM1LDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 285,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4598'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4598'
          },
          departureDateTime: '2015-06-13T16:00',
          arrivalDateTime: '2015-06-13T17:05',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1389'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1389'
          },
          departureDateTime: '2015-06-13T18:45',
          arrivalDateTime: '2015-06-13T21:45',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYwMCwyMDE1MDYxMzIxNDV8REFMLUhPVSxIT1UtQVRMfFdONDU5OCxXTjEzODl8S3xBRFR8NzM1LDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYwMCwyMDE1MDYxMzIxNDV8REFMLUhPVSxIT1UtQVRMfFdONDU5OCxXTjEzODl8WXxBRFR8NzM1LDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYwMCwyMDE1MDYxMzIxNDV8REFMLUhPVSxIT1UtQVRMfFdONDU5OCxXTjEzODl8TnxBRFR8NzM1LDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 215,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1962'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1962'
          },
          departureDateTime: '2015-06-13T16:10',
          arrivalDateTime: '2015-06-13T20:45',
          numberOfStops: 1,
          stopAirportCodes: [
            'AUS'
          ],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYxMCwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjE5NjJ8S3xBRFR8NzMz',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33400,
            discountedTotalFareCents: 33400,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYxMCwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjE5NjJ8WXxBRFR8NzMz',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31800,
            discountedTotalFareCents: 31800,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTYxMCwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjE5NjJ8TnxBRFR8NzMz',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13050,
            discountedTotalFareCents: 13050,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 130,
      segments: [
        {
          originationAirportCode: 'DAL',
          destinationAirportCode: 'ATL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3357'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3357'
          },
          departureDateTime: '2015-06-13T17:35',
          arrivalDateTime: '2015-06-13T20:45',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTczNSwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjMzNTd8S3xBRFR8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTczNSwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjMzNTd8WXxBRFR8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMTczNSwyMDE1MDYxMzIwNDV8REFMLUFUTHxXTjMzNTd8VHxBRFR8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'T',
          fareBasisCode: 'TLNVWNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 8900,
            discountedTotalFareCents: 8900,
            accrualPoints: 418
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    }
  ]
};
const inboundTripsWithDollars = {
  travelDate: '2015-06-17',
  originationAirportCode: 'ATL',
  destinationAirportCode: 'DAL',
  airProducts: [
    {
      durationMinutes: 130,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '270'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '270'
          },
          departureDateTime: '2015-06-17T05:45',
          arrivalDateTime: '2015-06-17T06:55',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA1NDUsMjAxNTA2MTcwNjU1fEFUTC1EQUx8V04yNzB8S3xBRFR8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA1NDUsMjAxNTA2MTcwNjU1fEFUTC1EQUx8V04yNzB8WXxBRFR8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA1NDUsMjAxNTA2MTcwNjU1fEFUTC1EQUx8V04yNzB8VHxBRFR8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'T',
          fareBasisCode: 'TLNVWNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 8900,
            discountedTotalFareCents: 8900,
            accrualPoints: 418
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 280,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1321'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1321'
          },
          departureDateTime: '2015-06-17T07:20',
          arrivalDateTime: '2015-06-17T08:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '16'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '16'
          },
          departureDateTime: '2015-06-17T10:00',
          arrivalDateTime: '2015-06-17T11:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMTAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xNnxLfEFEVHw3M1csNzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMTAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xNnxZfEFEVHw3M1csNzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMTAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xNnxTfEFEVHw3M1csNzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 220,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1321'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1321'
          },
          departureDateTime: '2015-06-17T07:20',
          arrivalDateTime: '2015-06-17T08:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '12'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '12'
          },
          departureDateTime: '2015-06-17T09:00',
          arrivalDateTime: '2015-06-17T10:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMDAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xMnxLfEFEVHw3M1csNzM1',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMDAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xMnxZfEFEVHw3M1csNzM1',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA3MjAsMjAxNTA2MTcxMDAwfEFUTC1IT1UsSE9VLURBTHxXTjEzMjEsV04xMnxNfEFEVHw3M1csNzM1',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLACPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 18600,
            discountedTotalFareCents: 18600,
            accrualPoints: 912
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 235,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'AUS',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1812'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1812'
          },
          departureDateTime: '2015-06-17T08:30',
          arrivalDateTime: '2015-06-17T09:50',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          departureDateTime: '2015-06-17T10:30',
          arrivalDateTime: '2015-06-17T11:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzAsMjAxNTA2MTcxMTI1fEFUTC1BVVMsQVVTLURBTHxXTjE4MTIsV044NTd8S3xBRFR8NzMzLDczQw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzAsMjAxNTA2MTcxMTI1fEFUTC1BVVMsQVVTLURBTHxXTjE4MTIsV044NTd8WXxBRFR8NzMzLDczQw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzAsMjAxNTA2MTcxMTI1fEFUTC1BVVMsQVVTLURBTHxXTjE4MTIsV044NTd8TnxBRFR8NzMzLDczQw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 220,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'MSY',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2944'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2944'
          },
          departureDateTime: '2015-06-17T08:35',
          arrivalDateTime: '2015-06-17T09:15',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MSY',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1532'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1532'
          },
          departureDateTime: '2015-06-17T09:55',
          arrivalDateTime: '2015-06-17T11:15',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTE1fEFUTC1NU1ksTVNZLURBTHxXTjI5NDQsV04xNTMyfEt8QURUfDczVyw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTE1fEFUTC1NU1ksTVNZLURBTHxXTjI5NDQsV04xNTMyfFl8QURUfDczVyw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTE1fEFUTC1NU1ksTVNZLURBTHxXTjI5NDQsV04xNTMyfE58QURUfDczVyw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 235,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'STL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1440'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1440'
          },
          departureDateTime: '2015-06-17T08:35',
          arrivalDateTime: '2015-06-17T09:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'STL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4656'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4656'
          },
          departureDateTime: '2015-06-17T09:55',
          arrivalDateTime: '2015-06-17T11:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTMwfEFUTC1TVEwsU1RMLURBTHxXTjE0NDAsV040NjU2fEt8QURUfDczVyw3MzM=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTMwfEFUTC1TVEwsU1RMLURBTHxXTjE0NDAsV040NjU2fFl8QURUfDczVyw3MzM=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzA4MzUsMjAxNTA2MTcxMTMwfEFUTC1TVEwsU1RMLURBTHxXTjE0NDAsV040NjU2fE18QURUfDczVyw3MzM=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLACPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 18600,
            discountedTotalFareCents: 18600,
            accrualPoints: 912
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 135,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4439'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4439'
          },
          departureDateTime: '2015-06-17T11:10',
          arrivalDateTime: '2015-06-17T12:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMTAsMjAxNTA2MTcxMjI1fEFUTC1EQUx8V040NDM5fEt8QURUfDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMTAsMjAxNTA2MTcxMjI1fEFUTC1EQUx8V040NDM5fFl8QURUfDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMTAsMjAxNTA2MTcxMjI1fEFUTC1EQUx8V040NDM5fE58QURUfDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLNVCNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 9900,
            discountedTotalFareCents: 9900,
            accrualPoints: 474
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 275,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4127'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4127'
          },
          departureDateTime: '2015-06-17T11:25',
          arrivalDateTime: '2015-06-17T12:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '32'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '32'
          },
          departureDateTime: '2015-06-17T14:00',
          arrivalDateTime: '2015-06-17T15:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMjUsMjAxNTA2MTcxNTAwfEFUTC1IT1UsSE9VLURBTHxXTjQxMjcsV04zMnxLfEFEVHw3M1csNzM1',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMjUsMjAxNTA2MTcxNTAwfEFUTC1IT1UsSE9VLURBTHxXTjQxMjcsV04zMnxZfEFEVHw3M1csNzM1',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzExMjUsMjAxNTA2MTcxNTAwfEFUTC1IT1UsSE9VLURBTHxXTjQxMjcsV04zMnxTfEFEVHw3M1csNzM1',
          fareType: 'Wanna Get Away',
          seatsAvailable: '1',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 215,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'MSY',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '42'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '42'
          },
          departureDateTime: '2015-06-17T13:30',
          arrivalDateTime: '2015-06-17T14:05',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MSY',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '300'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '300'
          },
          departureDateTime: '2015-06-17T14:45',
          arrivalDateTime: '2015-06-17T16:05',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzMzAsMjAxNTA2MTcxNjA1fEFUTC1NU1ksTVNZLURBTHxXTjQyLFdOMzAwfEt8QURUfDczVyw3M1c=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzMzAsMjAxNTA2MTcxNjA1fEFUTC1NU1ksTVNZLURBTHxXTjQyLFdOMzAwfFl8QURUfDczVyw3M1c=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzMzAsMjAxNTA2MTcxNjA1fEFUTC1NU1ksTVNZLURBTHxXTjQyLFdOMzAwfE58QURUfDczVyw3M1c=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLAVPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 13500,
            discountedTotalFareCents: 13500,
            accrualPoints: 627
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 255,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '45'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '45'
          },
          departureDateTime: '2015-06-17T13:40',
          arrivalDateTime: '2015-06-17T16:55',
          numberOfStops: 1,
          stopAirportCodes: [
            'MCI'
          ],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzNDAsMjAxNTA2MTcxNjU1fEFUTC1EQUx8V040NXxLfEFEVHw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33400,
            discountedTotalFareCents: 33400,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzNDAsMjAxNTA2MTcxNjU1fEFUTC1EQUx8V040NXxZfEFEVHw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31800,
            discountedTotalFareCents: 31800,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzEzNDAsMjAxNTA2MTcxNjU1fEFUTC1EQUx8V040NXxTfEFEVHw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 15850,
            discountedTotalFareCents: 15850,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 145,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4275'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '4275'
          },
          departureDateTime: '2015-06-17T15:25',
          arrivalDateTime: '2015-06-17T16:50',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxNjUwfEFUTC1EQUx8V040Mjc1fEt8QURUfDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxNjUwfEFUTC1EQUx8V040Mjc1fFl8QURUfDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxNjUwfEFUTC1EQUx8V040Mjc1fFN8QURUfDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLNVVNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 10800,
            discountedTotalFareCents: 10800,
            accrualPoints: 524
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 280,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'MSY',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3327'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3327'
          },
          departureDateTime: '2015-06-17T15:25',
          arrivalDateTime: '2015-06-17T16:05',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'MSY',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '566'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '566'
          },
          departureDateTime: '2015-06-17T17:45',
          arrivalDateTime: '2015-06-17T19:05',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxOTA1fEFUTC1NU1ksTVNZLURBTHxXTjMzMjcsV041NjZ8S3xBRFR8NzNXLDczVw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxOTA1fEFUTC1NU1ksTVNZLURBTHxXTjMzMjcsV041NjZ8WXxBRFR8NzNXLDczVw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1MjUsMjAxNTA2MTcxOTA1fEFUTC1NU1ksTVNZLURBTHxXTjMzMjcsV041NjZ8U3xBRFR8NzNXLDczVw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '4',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 280,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'TPA',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '741'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '741'
          },
          departureDateTime: '2015-06-17T15:40',
          arrivalDateTime: '2015-06-17T17:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        },
        {
          originationAirportCode: 'TPA',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '817'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '817'
          },
          departureDateTime: '2015-06-17T17:50',
          arrivalDateTime: '2015-06-17T19:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1NDAsMjAxNTA2MTcxOTIwfEFUTC1UUEEsVFBBLURBTHxXTjc0MSxXTjgxN3xLfEFEVHw3M0MsNzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1NDAsMjAxNTA2MTcxOTIwfEFUTC1UUEEsVFBBLURBTHxXTjc0MSxXTjgxN3xZfEFEVHw3M0MsNzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE1NDAsMjAxNTA2MTcxOTIwfEFUTC1UUEEsVFBBLURBTHxXTjc0MSxXTjgxN3xXfEFEVHw3M0MsNzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 265,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '170'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '170'
          },
          departureDateTime: '2015-06-17T17:05',
          arrivalDateTime: '2015-06-17T18:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '56'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '56'
          },
          departureDateTime: '2015-06-17T19:30',
          arrivalDateTime: '2015-06-17T20:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDMwfEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU2fEt8QURUfDczVyw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDMwfEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU2fFl8QURUfDczVyw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDMwfEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU2fFN8QURUfDczVyw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '6',
          unavailabilityReason: 'NONE',
          bookingCode: 'S',
          fareBasisCode: 'SLAUPNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 16300,
            discountedTotalFareCents: 16300,
            accrualPoints: 784
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 290,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '170'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '170'
          },
          departureDateTime: '2015-06-17T17:05',
          arrivalDateTime: '2015-06-17T18:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '58'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '58'
          },
          departureDateTime: '2015-06-17T20:00',
          arrivalDateTime: '2015-06-17T20:55',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDU1fEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU4fEt8QURUfDczVyw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDU1fEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU4fFl8QURUfDczVyw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE3MDUsMjAxNTA2MTcyMDU1fEFUTC1IT1UsSE9VLURBTHxXTjE3MCxXTjU4fE98QURUfDczVyw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'O',
          fareBasisCode: 'OLA7PNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 23800,
            discountedTotalFareCents: 23800,
            accrualPoints: 1202
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 235,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'HOU',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '576'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '576'
          },
          departureDateTime: '2015-06-17T19:00',
          arrivalDateTime: '2015-06-17T20:10',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        },
        {
          originationAirportCode: 'HOU',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '60'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '60'
          },
          departureDateTime: '2015-06-17T21:00',
          arrivalDateTime: '2015-06-17T21:55',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE5MDAsMjAxNTA2MTcyMTU1fEFUTC1IT1UsSE9VLURBTHxXTjU3NixXTjYwfEt8QURUfDczVyw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33850,
            discountedTotalFareCents: 33850,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE5MDAsMjAxNTA2MTcyMTU1fEFUTC1IT1UsSE9VLURBTHxXTjU3NixXTjYwfFl8QURUfDczVyw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 32250,
            discountedTotalFareCents: 32250,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzE5MDAsMjAxNTA2MTcyMTU1fEFUTC1IT1UsSE9VLURBTHxXTjU3NixXTjYwfFd8QURUfDczVyw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'W',
          fareBasisCode: 'WLA0WNRO',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 27700,
            discountedTotalFareCents: 27700,
            accrualPoints: 1420
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    },
    {
      durationMinutes: 140,
      segments: [
        {
          originationAirportCode: 'ATL',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1341'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1341'
          },
          departureDateTime: '2015-06-17T21:05',
          arrivalDateTime: '2015-06-17T22:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzIxMDUsMjAxNTA2MTcyMjI1fEFUTC1EQUx8V04xMzQxfEt8QURUfDczQw==',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 33000,
            discountedTotalFareCents: 33000,
            accrualPoints: 3526
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzIxMDUsMjAxNTA2MTcyMjI1fEFUTC1EQUx8V04xMzQxfFl8QURUfDczQw==',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 31400,
            discountedTotalFareCents: 31400,
            accrualPoints: 2790
          }
        },
        {
          productId: 'QW1lcmljYS9OZXdfWW9ya3wyMDE1MDYxNzIxMDUsMjAxNTA2MTcyMjI1fEFUTC1EQUx8V04xMzQxfE58QURUfDczQw==',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'N',
          fareBasisCode: 'NLNVCNR',
          paxPricingType: 'ADT',
          currencyPrice: {
            totalFareCents: 9900,
            discountedTotalFareCents: 9900,
            accrualPoints: 474
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNTE1MTYwMCwyMDE1MDUxNTE5MzB8QVVTLURBTCxEQUwtQU1BfFdONDg2LFdONTM4fFF8U1JDfDczNSw3M0M=',
          fareType: 'Senior',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Q',
          fareBasisCode: 'QCD',
          paxPricingType: 'SRC',
          currencyPrice: {
            totalFareCents: 22650,
            discountedTotalFareCents: 22650,
            accrualPoints: 1138
          }
        }
      ]
    }
  ]
};

const outboundTripsWithPoints = {
  travelDate: '2015-06-10',
  originationAirportCode: 'AUS',
  destinationAirportCode: 'DAL',
  airProducts: [
    {
      durationMinutes: 60,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1017'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1017'
          },
          departureDateTime: '2015-06-10T06:30',
          arrivalDateTime: '2015-06-10T07:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8S3xGRlB8NzM1',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8WXxGRlB8NzM1',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8TXxGRlB8NzM1',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5000,
            discountedRedemptionPoints: 5000
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3937'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3937'
          },
          departureDateTime: '2015-06-10T08:20',
          arrivalDateTime: '2015-06-10T09:15',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 4000,
            discountedRedemptionPoints: 4000
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '285'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '285'
          },
          departureDateTime: '2015-06-10T09:25',
          arrivalDateTime: '2015-06-10T10:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxLfEZGUHw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxZfEZGUHw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxNfEZGUHw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          departureDateTime: '2015-06-10T10:30',
          arrivalDateTime: '2015-06-10T11:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xLfEZGUHw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xZfEZGUHw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xNfEZGUHw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '238'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '238'
          },
          departureDateTime: '2015-06-10T12:30',
          arrivalDateTime: '2015-06-10T13:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxLfEZGUHw3M1c=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxZfEZGUHw3M1c=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxNfEZGUHw3M1c=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2950'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2950'
          },
          departureDateTime: '2015-06-10T14:05',
          arrivalDateTime: '2015-06-10T15:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 60,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '801'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '801'
          },
          departureDateTime: '2015-06-10T15:35',
          arrivalDateTime: '2015-06-10T16:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxLfEZGUHw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxZfEZGUHw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxNfEZGUHw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '5',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '657'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '657'
          },
          departureDateTime: '2015-06-10T17:25',
          arrivalDateTime: '2015-06-10T18:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xLfEZGUHw3M1c=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xZfEZGUHw3M1c=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xNfEZGUHw3M1c=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '3',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2263'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2263'
          },
          departureDateTime: '2015-06-10T18:40',
          arrivalDateTime: '2015-06-10T19:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '187'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '187'
          },
          departureDateTime: '2015-06-10T19:40',
          arrivalDateTime: '2015-06-10T20:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xLfEZGUHw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xZfEZGUHw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xNfEZGUHw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 123,
            discountedRedemptionPoints: 123
          }
        }
      ]
    }
  ]
};
const inboundTripsWithPoints = {
  travelDate: '2015-06-10',
  originationAirportCode: 'AUS',
  destinationAirportCode: 'DAL',
  airProducts: [
    {
      durationMinutes: 60,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1017'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1017'
          },
          departureDateTime: '2015-06-10T06:30',
          arrivalDateTime: '2015-06-10T07:30',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8S3xGRlB8NzM1',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8WXxGRlB8NzM1',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDYzMCwyMDE1MDYxMDA3MzB8QVVTLURBTHxXTjEwMTd8TXxGRlB8NzM1',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5000,
            discountedRedemptionPoints: 5000
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3937'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '3937'
          },
          departureDateTime: '2015-06-10T08:20',
          arrivalDateTime: '2015-06-10T09:15',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDgyMCwyMDE1MDYxMDA5MTV8QVVTLURBTHxXTjM5Mzd8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 4000,
            discountedRedemptionPoints: 4000
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '285'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '285'
          },
          departureDateTime: '2015-06-10T09:25',
          arrivalDateTime: '2015-06-10T10:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxLfEZGUHw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxZfEZGUHw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMDkyNSwyMDE1MDYxMDEwMjB8QVVTLURBTHxXTjI4NXxNfEZGUHw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '857'
          },
          departureDateTime: '2015-06-10T10:30',
          arrivalDateTime: '2015-06-10T11:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xLfEZGUHw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xZfEZGUHw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTAzMCwyMDE1MDYxMDExMjV8QVVTLURBTHxXTjg1N3xNfEZGUHw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '238'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '238'
          },
          departureDateTime: '2015-06-10T12:30',
          arrivalDateTime: '2015-06-10T13:25',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxLfEZGUHw3M1c=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxZfEZGUHw3M1c=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTIzMCwyMDE1MDYxMDEzMjV8QVVTLURBTHxXTjIzOHxNfEZGUHw3M1c=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2950'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2950'
          },
          departureDateTime: '2015-06-10T14:05',
          arrivalDateTime: '2015-06-10T15:00',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTQwNSwyMDE1MDYxMDE1MDB8QVVTLURBTHxXTjI5NTB8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 60,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '801'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '801'
          },
          departureDateTime: '2015-06-10T15:35',
          arrivalDateTime: '2015-06-10T16:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxLfEZGUHw3M0M=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxZfEZGUHw3M0M=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTUzNSwyMDE1MDYxMDE2MzV8QVVTLURBTHxXTjgwMXxNfEZGUHw3M0M=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '5',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '657'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '657'
          },
          departureDateTime: '2015-06-10T17:25',
          arrivalDateTime: '2015-06-10T18:20',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xLfEZGUHw3M1c=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xZfEZGUHw3M1c=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTcyNSwyMDE1MDYxMDE4MjB8QVVTLURBTHxXTjY1N3xNfEZGUHw3M1c=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '3',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2263'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2263'
          },
          departureDateTime: '2015-06-10T18:40',
          arrivalDateTime: '2015-06-10T19:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: true
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8S3xGRlB8NzNX',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8WXxGRlB8NzNX',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTg0MCwyMDE1MDYxMDE5MzV8QVVTLURBTHxXTjIyNjN8TXxGRlB8NzNX',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 5529,
            discountedRedemptionPoints: 5529
          }
        }
      ]
    },
    {
      durationMinutes: 55,
      segments: [
        {
          originationAirportCode: 'AUS',
          destinationAirportCode: 'DAL',
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '187'
          },
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '187'
          },
          departureDateTime: '2015-06-10T19:40',
          arrivalDateTime: '2015-06-10T20:35',
          numberOfStops: 0,
          stopAirportCodes: [],
          wifiAvailable: false
        }
      ],
      fareProducts: [
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xLfEZGUHw3MzU=',
          fareType: 'Business Select',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'K',
          fareBasisCode: 'KZBP',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 21310,
            discountedRedemptionPoints: 21310
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xZfEZGUHw3MzU=',
          fareType: 'Anytime',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'Y',
          fareBasisCode: 'YL',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 16270,
            discountedRedemptionPoints: 16270
          }
        },
        {
          productId: 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEwMTk0MCwyMDE1MDYxMDIwMzV8QVVTLURBTHxXTjE4N3xNfEZGUHw3MzU=',
          fareType: 'Wanna Get Away',
          seatsAvailable: '8',
          unavailabilityReason: 'NONE',
          bookingCode: 'M',
          fareBasisCode: 'MLN0WNR',
          paxPricingType: 'FFP',
          pointsPrice: {
            redemptionPoints: 123,
            discountedRedemptionPoints: 123
          }
        }
      ]
    }
  ]
};
