const productDefinitions = require('mocks/templates/productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = {
  changeShoppingPage: {
    productDefinitions,
    messages: [],
    showSgaMessage: false,
    currentReservation: {
      outbound: {
        date: '2020-10-01',
        departsTime: '05:30',
        arrivesTime: '12:10',
        flightTime: '7h 40m',
        stopDescription: '1 Stop, LAS',
        shortStopDescription: '1 Stop',
        stopCity: 'LAS',
        flight: '195/792',
        isNextDayArrival: false
      },
      inbound: {
        date: '2020-10-04',
        departsTime: '06:45',
        arrivesTime: '15:40',
        flightTime: '7h 55m',
        stopDescription: '1 Stop, LAS',
        shortStopDescription: '1 Stop',
        stopCity: 'LAS',
        flight: '5846/553',
        isNextDayArrival: false
      }
    },
    flights: {
      outboundPage: {
        header: {
          airportInfo: 'AUS - BOI',
          selectedDate: '2020-10-01',
          originAirport: 'AUS',
          destinationAirport: 'BOI'
        },
        cards: [
          {
            departureTime: '05:30',
            arrivalTime: '12:10',
            duration: '7h 40m',
            stopDescription: '1 Stop, LAS',
            stopDescriptionOnSelect: '1 Stop, Change planes LAS',
            shortStopDescription: '1 Stop',
            stopCity: 'LAS',
            flightNumbers: '195/792',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsTEFTLDIwMjAtMTAtMDFUMDU6MzAtMDU6MDAsMjAyMC0xMC0wMVQwNjoxNS0wNzowMCxXTixXTiwxOTUsNzNIfFFMQTBXMkgsUSxMQVMsQk9JLDIwMjAtMTAtMDFUMDk6MjAtMDc6MDAsMjAyMC0xMC0wMVQxMjoxMC0wNjowMCxXTixXTiw3OTIsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:9:2020-10-01',
              durationMinutes: 460,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0530'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '06:10',
            arrivalTime: '10:35',
            duration: '5h 25m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '188/1547',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREVOLDIwMjAtMTAtMDFUMDY6MTAtMDU6MDAsMjAyMC0xMC0wMVQwNzoxNS0wNjowMCxXTixXTiwxODgsNzNIfFFMQTBXMkgsUSxERU4sQk9JLDIwMjAtMTAtMDFUMDg6NDAtMDY6MDAsMjAyMC0xMC0wMVQxMDozNS0wNjowMCxXTixXTiwxNTQ3LDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:3:2020-10-01',
              durationMinutes: 325,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0610'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '06:15',
            arrivalTime: '15:35',
            duration: '10h 20m',
            stopDescription: '3 Stops, DAL',
            stopDescriptionOnSelect: '3 Stops, Change planes DAL',
            shortStopDescription: '3 Stops',
            stopCity: 'DAL',
            flightNumbers: '2697/2469',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREFMLDIwMjAtMTAtMDFUMDY6MTUtMDU6MDAsMjAyMC0xMC0wMVQwNzoyMC0wNTowMCxXTixXTiwyNjk3LDczV3xRTEEwVzJILFEsREFMLEJPSSwyMDIwLTEwLTAxVDA4OjE1LTA1OjAwLDIwMjAtMTAtMDFUMTU6MzUtMDY6MDAsV04sV04sMjQ2OSw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:20:2020-10-01',
              durationMinutes: 620,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0615'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:05',
            arrivalTime: '14:15',
            duration: '7h 10m',
            stopDescription: '2 Stops, SAN',
            stopDescriptionOnSelect: '2 Stops, Change planes SAN',
            shortStopDescription: '2 Stops',
            stopCity: 'SAN',
            flightNumbers: '2334/9507',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxBVVMsU0FOLDIwMjAtMTAtMDFUMDg6MDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNzowMCxXTixXTiwyMzM0LDczV3xRTEEwVzJILFksU0FOLEJPSSwyMDIwLTEwLTAxVDEwOjU1LTA3OjAwLDIwMjAtMTAtMDFUMTQ6MTUtMDY6MDAsV04sV04sOTUwNyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:24:2020-10-01',
              durationMinutes: 430,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '0805'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:05',
            arrivalTime: '14:15',
            duration: '7h 10m',
            stopDescription: '2 Stops, SAN',
            stopDescriptionOnSelect: '2 Stops, Change planes SAN',
            shortStopDescription: '2 Stops',
            stopCity: 'SAN',
            flightNumbers: '2334/9576',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxBVVMsU0FOLDIwMjAtMTAtMDFUMDg6MDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNzowMCxXTixXTiwyMzM0LDczV3xRTEEwVzJILFksU0FOLEJPSSwyMDIwLTEwLTAxVDEwOjU1LTA3OjAwLDIwMjAtMTAtMDFUMTQ6MTUtMDY6MDAsV04sV04sOTU3Niw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:25:2020-10-01',
              durationMinutes: 430,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '0805'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:05',
            arrivalTime: '16:20',
            duration: '9h 15m',
            stopDescription: '3 Stops, SAN',
            stopDescriptionOnSelect: '3 Stops, Change planes SAN',
            shortStopDescription: '3 Stops',
            stopCity: 'SAN',
            flightNumbers: '2334/2523',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsU0FOLDIwMjAtMTAtMDFUMDg6MDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNzowMCxXTixXTiwyMzM0LDczV3xRTEEwVzJILFEsU0FOLEJPSSwyMDIwLTEwLTAxVDExOjQwLTA3OjAwLDIwMjAtMTAtMDFUMTY6MjAtMDY6MDAsV04sV04sMjUyMyw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:16:2020-10-01',
              durationMinutes: 555,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0805'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:20',
            arrivalTime: '14:15',
            duration: '5h 55m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '1171/9507',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsU0FOLDIwMjAtMTAtMDFUMDk6MjAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNzowMCxXTixXTiwxMTcxLDczV3xRTEEwVzJILFEsU0FOLEJPSSwyMDIwLTEwLTAxVDEwOjU1LTA3OjAwLDIwMjAtMTAtMDFUMTQ6MTUtMDY6MDAsV04sV04sOTUwNyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:5:2020-10-01',
              durationMinutes: 355,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0920'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:20',
            arrivalTime: '14:15',
            duration: '5h 55m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '1171/9576',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsU0FOLDIwMjAtMTAtMDFUMDk6MjAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNzowMCxXTixXTiwxMTcxLDczV3xRTEEwVzJILFEsU0FOLEJPSSwyMDIwLTEwLTAxVDEwOjU1LTA3OjAwLDIwMjAtMTAtMDFUMTQ6MTUtMDY6MDAsV04sV04sOTU3Niw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:6:2020-10-01',
              durationMinutes: 355,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0920'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:20',
            arrivalTime: '16:20',
            duration: '8h 0m',
            stopDescription: '2 Stops, SAN',
            stopDescriptionOnSelect: '2 Stops, Change planes SAN',
            shortStopDescription: '2 Stops',
            stopCity: 'SAN',
            flightNumbers: '1171/2523',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsU0FOLDIwMjAtMTAtMDFUMDk6MjAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNzowMCxXTixXTiwxMTcxLDczV3xRTEEwVzJILFEsU0FOLEJPSSwyMDIwLTEwLTAxVDExOjQwLTA3OjAwLDIwMjAtMTAtMDFUMTY6MjAtMDY6MDAsV04sV04sMjUyMyw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:11:2020-10-01',
              durationMinutes: 480,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '0920'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:20',
            arrivalTime: '20:35',
            duration: '12h 15m',
            stopDescription: '3 Stops, PHX',
            stopDescriptionOnSelect: '3 Stops, Change planes PHX',
            shortStopDescription: '3 Stops',
            stopCity: 'PHX',
            flightNumbers: '1171/1910',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsUEhYLDIwMjAtMTAtMDFUMDk6MjAtMDU6MDAsMjAyMC0xMC0wMVQxMjowNS0wNzowMCxXTixXTiwxMTcxLDczV3xRTEEwVzJILFEsUEhYLEJPSSwyMDIwLTEwLTAxVDE1OjM1LTA3OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDY6MDAsV04sV04sMTkxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:23:2020-10-01',
              durationMinutes: 735,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0920'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '10:05',
            arrivalTime: '14:45',
            duration: '5h 40m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '235/113',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREVOLDIwMjAtMTAtMDFUMTA6MDUtMDU6MDAsMjAyMC0xMC0wMVQxMToxNS0wNjowMCxXTixXTiwyMzUsNzNXfFFMQTBXMkgsUSxERU4sQk9JLDIwMjAtMTAtMDFUMTI6NTUtMDY6MDAsMjAyMC0xMC0wMVQxNDo0NS0wNjowMCxXTixXTiwxMTMsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:4:2020-10-01',
              durationMinutes: 340,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1005'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '10:55',
            arrivalTime: '17:50',
            duration: '7h 55m',
            stopDescription: '2 Stops, LAS',
            stopDescriptionOnSelect: '2 Stops, Change planes LAS',
            shortStopDescription: '2 Stops',
            stopCity: 'LAS',
            flightNumbers: '585/1439',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsTEFTLDIwMjAtMTAtMDFUMTA6NTUtMDU6MDAsMjAyMC0xMC0wMVQxMzoyNS0wNzowMCxXTixXTiw1ODUsNzNXfFFMQTBXMkgsUSxMQVMsQk9JLDIwMjAtMTAtMDFUMTU6MDAtMDc6MDAsMjAyMC0xMC0wMVQxNzo1MC0wNjowMCxXTixXTiwxNDM5LDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:10:2020-10-01',
              durationMinutes: 475,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1055'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '11:35',
            arrivalTime: '22:05',
            duration: '11h 30m',
            stopDescription: '2 Stops, LAS',
            stopDescriptionOnSelect: '2 Stops, Change planes LAS',
            shortStopDescription: '2 Stops',
            stopCity: 'LAS',
            flightNumbers: '2590/2713',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsTEFTLDIwMjAtMTAtMDFUMTE6MzUtMDU6MDAsMjAyMC0xMC0wMVQxNTozMC0wNzowMCxXTixXTiwyNTkwLDczV3xRTEEwVzJILFEsTEFTLEJPSSwyMDIwLTEwLTAxVDE5OjIwLTA3OjAwLDIwMjAtMTAtMDFUMjI6MDUtMDY6MDAsV04sV04sMjcxMyw3TTgiLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:22:2020-10-01',
              durationMinutes: 690,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1135'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '12:00',
            arrivalTime: '20:35',
            duration: '9h 35m',
            stopDescription: '2 Stops, PHX',
            stopDescriptionOnSelect: '2 Stops, Change planes PHX',
            shortStopDescription: '2 Stops',
            stopCity: 'PHX',
            flightNumbers: '2350/1910',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsUEhYLDIwMjAtMTAtMDFUMTI6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMjoxNS0wNzowMCxXTixXTiwyMzUwLDczV3xRTEEwVzJILFEsUEhYLEJPSSwyMDIwLTEwLTAxVDE1OjM1LTA3OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDY6MDAsV04sV04sMTkxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:17:2020-10-01',
              durationMinutes: 575,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1200'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '12:30',
            arrivalTime: '18:30',
            duration: '7h 0m',
            stopDescription: '2 Stops',
            stopDescriptionOnSelect: '2 Stops, No plane change',
            shortStopDescription: '2 Stops',
            stopCity: null,
            flightNumbers: '2268',
            startingFromPrice: {
              amount: '494',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '-'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '494',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '5',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '-'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsQk9JLDIwMjAtMTAtMDFUMTI6MzAtMDU6MDAsMjAyMC0xMC0wMVQxODozMC0wNjowMCxXTixXTiwyMjY4LDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:0:2020-10-01',
              durationMinutes: 420,
              numberOfStops: 2,
              startingFromAmount: 494,
              departureTime: '1230'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '13:40',
            arrivalTime: '21:35',
            duration: '8h 55m',
            stopDescription: '2 Stops, PHX',
            stopDescriptionOnSelect: '2 Stops, Change planes PHX',
            shortStopDescription: '2 Stops',
            stopCity: 'PHX',
            flightNumbers: '374/256',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsUEhYLDIwMjAtMTAtMDFUMTM6NDAtMDU6MDAsMjAyMC0xMC0wMVQxNjoyNS0wNzowMCxXTixXTiwzNzQsNzNXfFFMQTBXMkgsUSxQSFgsQk9JLDIwMjAtMTAtMDFUMTg6MzAtMDc6MDAsMjAyMC0xMC0wMVQyMTozNS0wNjowMCxXTixXTiwyNTYsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:15:2020-10-01',
              durationMinutes: 535,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1340'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '13:55',
            arrivalTime: '22:35',
            duration: '9h 40m',
            stopDescription: '3 Stops, ABQ',
            stopDescriptionOnSelect: '3 Stops, Change planes ABQ',
            shortStopDescription: '3 Stops',
            stopCity: 'ABQ',
            flightNumbers: '1379/523',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsQUJRLDIwMjAtMTAtMDFUMTM6NTUtMDU6MDAsMjAyMC0xMC0wMVQxNjoyNS0wNjowMCxXTixXTiwxMzc5LDczV3xRTEEwVzJILFEsQUJRLEJPSSwyMDIwLTEwLTAxVDE4OjEwLTA2OjAwLDIwMjAtMTAtMDFUMjI6MzUtMDY6MDAsV04sV04sNTIzLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:18:2020-10-01',
              durationMinutes: 580,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '1355'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '13:55',
            arrivalTime: '23:35',
            duration: '10h 40m',
            stopDescription: '3 Stops, DAL',
            stopDescriptionOnSelect: '3 Stops, Change planes DAL',
            shortStopDescription: '3 Stops',
            stopCity: 'DAL',
            flightNumbers: '1379/2283',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREFMLDIwMjAtMTAtMDFUMTM6NTUtMDU6MDAsMjAyMC0xMC0wMVQxNTowMC0wNTowMCxXTixXTiwxMzc5LDczV3xRTEEwVzJILFEsREFMLEJPSSwyMDIwLTEwLTAxVDE4OjM1LTA1OjAwLDIwMjAtMTAtMDFUMjM6MzUtMDY6MDAsV04sV04sMjI4Myw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:21:2020-10-01',
              durationMinutes: 640,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '1355'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '14:20',
            arrivalTime: '20:35',
            duration: '7h 15m',
            stopDescription: '1 Stop, SJC',
            stopDescriptionOnSelect: '1 Stop, Change planes SJC',
            shortStopDescription: '1 Stop',
            stopCity: 'SJC',
            flightNumbers: '2130/1910',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsU0pDLDIwMjAtMTAtMDFUMTQ6MjAtMDU6MDAsMjAyMC0xMC0wMVQxNjowMC0wNzowMCxXTixXTiwyMTMwLDczV3xRTEEwVzJILFEsU0pDLEJPSSwyMDIwLTEwLTAxVDE4OjA1LTA3OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDY6MDAsV04sV04sMTkxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:8:2020-10-01',
              durationMinutes: 435,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1420'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '14:25',
            arrivalTime: '22:05',
            duration: '8h 40m',
            stopDescription: '2 Stops, LAS',
            stopDescriptionOnSelect: '2 Stops, Change planes LAS',
            shortStopDescription: '2 Stops',
            stopCity: 'LAS',
            flightNumbers: '2637/2713',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsTEFTLDIwMjAtMTAtMDFUMTQ6MjUtMDU6MDAsMjAyMC0xMC0wMVQxODowMC0wNzowMCxXTixXTiwyNjM3LDczV3xRTEEwVzJILFEsTEFTLEJPSSwyMDIwLTEwLTAxVDE5OjIwLTA3OjAwLDIwMjAtMTAtMDFUMjI6MDUtMDY6MDAsV04sV04sMjcxMyw3TTgiLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:13:2020-10-01',
              durationMinutes: 520,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1425'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '14:45',
            arrivalTime: '22:35',
            duration: '8h 50m',
            stopDescription: '2 Stops, OAK',
            stopDescriptionOnSelect: '2 Stops, Change planes OAK',
            shortStopDescription: '2 Stops',
            stopCity: 'OAK',
            flightNumbers: '633/523',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsT0FLLDIwMjAtMTAtMDFUMTQ6NDUtMDU6MDAsMjAyMC0xMC0wMVQxOTowNS0wNzowMCxXTixXTiw2MzMsNzNXfFFMQTBXMkgsUSxPQUssQk9JLDIwMjAtMTAtMDFUMjA6MTAtMDc6MDAsMjAyMC0xMC0wMVQyMjozNS0wNjowMCxXTixXTiw1MjMsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:14:2020-10-01',
              durationMinutes: 530,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1445'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '14:55',
            arrivalTime: '23:35',
            duration: '9h 40m',
            stopDescription: '2 Stops, DEN',
            stopDescriptionOnSelect: '2 Stops, Change planes DEN',
            shortStopDescription: '2 Stops',
            stopCity: 'DEN',
            flightNumbers: '1420/2283',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREVOLDIwMjAtMTAtMDFUMTQ6NTUtMDU6MDAsMjAyMC0xMC0wMVQxOTo0NS0wNjowMCxXTixXTiwxNDIwLDczV3xRTEEwVzJILFEsREVOLEJPSSwyMDIwLTEwLTAxVDIxOjQ1LTA2OjAwLDIwMjAtMTAtMDFUMjM6MzUtMDY6MDAsV04sV04sMjI4Myw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:19:2020-10-01',
              durationMinutes: 580,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1455'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '16:35',
            arrivalTime: '23:35',
            duration: '8h 0m',
            stopDescription: '3 Stops, DAL',
            stopDescriptionOnSelect: '3 Stops, Change planes DAL',
            shortStopDescription: '3 Stops',
            stopCity: 'DAL',
            flightNumbers: '420/2283',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREFMLDIwMjAtMTAtMDFUMTY6MzUtMDU6MDAsMjAyMC0xMC0wMVQxNzozNS0wNTowMCxXTixXTiw0MjAsNzNXfFFMQTBXMkgsUSxEQUwsQk9JLDIwMjAtMTAtMDFUMTg6MzUtMDU6MDAsMjAyMC0xMC0wMVQyMzozNS0wNjowMCxXTixXTiwyMjgzLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:12:2020-10-01',
              durationMinutes: 480,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '1635'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '16:40',
            arrivalTime: '21:35',
            duration: '5h 55m',
            stopDescription: '1 Stop, PHX',
            stopDescriptionOnSelect: '1 Stop, Change planes PHX',
            shortStopDescription: '1 Stop',
            stopCity: 'PHX',
            flightNumbers: '19/256',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsUEhYLDIwMjAtMTAtMDFUMTY6NDAtMDU6MDAsMjAyMC0xMC0wMVQxNzoxMC0wNzowMCxXTixXTiwxOSw3M1d8UUxBMFcySCxRLFBIWCxCT0ksMjAyMC0xMC0wMVQxODozMC0wNzowMCwyMDIwLTEwLTAxVDIxOjM1LTA2OjAwLFdOLFdOLDI1Niw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:7:2020-10-01',
              durationMinutes: 355,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1640'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '17:55',
            arrivalTime: '22:05',
            duration: '5h 10m',
            stopDescription: '1 Stop, LAS',
            stopDescriptionOnSelect: '1 Stop, Change planes LAS',
            shortStopDescription: '1 Stop',
            stopCity: 'LAS',
            flightNumbers: '2426/2713',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsTEFTLDIwMjAtMTAtMDFUMTc6NTUtMDU6MDAsMjAyMC0xMC0wMVQxODo0MC0wNzowMCxXTixXTiwyNDI2LDczV3xRTEEwVzJILFEsTEFTLEJPSSwyMDIwLTEwLTAxVDE5OjIwLTA3OjAwLDIwMjAtMTAtMDFUMjI6MDUtMDY6MDAsV04sV04sMjcxMyw3TTgiLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:2:2020-10-01',
              durationMinutes: 310,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1755'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '20:00',
            arrivalTime: '23:35',
            duration: '4h 35m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '2628/2283',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxBVVMsREVOLDIwMjAtMTAtMDFUMjA6MDAtMDU6MDAsMjAyMC0xMC0wMVQyMToxMC0wNjowMCxXTixXTiwyNjI4LDczV3xRTEEwVzJILFEsREVOLEJPSSwyMDIwLTEwLTAxVDIxOjQ1LTA2OjAwLDIwMjAtMTAtMDFUMjM6MzUtMDY6MDAsV04sV04sMjI4Myw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:BOI:1:2020-10-01',
              durationMinutes: 275,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '2000'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          }
        ]
      },
      inboundPage: {
        header: {
          airportInfo: 'BOI - AUS',
          selectedDate: '2020-10-04',
          originAirport: 'BOI',
          destinationAirport: 'AUS'
        },
        cards: [
          {
            departureTime: '06:45',
            arrivalTime: '15:40',
            duration: '7h 55m',
            stopDescription: '1 Stop, LAS',
            stopDescriptionOnSelect: '1 Stop, Change planes LAS',
            shortStopDescription: '1 Stop',
            stopCity: 'LAS',
            flightNumbers: '5846/553',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTEFTLDIwMjAtMTAtMDRUMDY6NDUtMDY6MDAsMjAyMC0xMC0wNFQwNzoyNS0wNzowMCxXTixXTiw1ODQ2LDdNOHxRTEEwVzJILFEsTEFTLEFVUywyMDIwLTEwLTA0VDExOjAwLTA3OjAwLDIwMjAtMTAtMDRUMTU6NDAtMDU6MDAsV04sV04sNTUzLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:18:2020-10-04',
              durationMinutes: 475,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0645'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:45',
            arrivalTime: '15:50',
            duration: '8h 5m',
            stopDescription: '2 Stops, LAS',
            stopDescriptionOnSelect: '2 Stops, Change planes LAS',
            shortStopDescription: '2 Stops',
            stopCity: 'LAS',
            flightNumbers: '5846/5597',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTEFTLDIwMjAtMTAtMDRUMDY6NDUtMDY6MDAsMjAyMC0xMC0wNFQwNzoyNS0wNzowMCxXTixXTiw1ODQ2LDdNOHxRTEEwVzJILFEsTEFTLEFVUywyMDIwLTEwLTA0VDA5OjEwLTA3OjAwLDIwMjAtMTAtMDRUMTU6NTAtMDU6MDAsV04sV04sNTU5Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:7:2020-10-04',
              durationMinutes: 485,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '0645'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:45',
            arrivalTime: '18:55',
            duration: '11h 10m',
            stopDescription: '2 Stops, MSY',
            stopDescriptionOnSelect: '2 Stops, Change planes MSY',
            shortStopDescription: '2 Stops',
            stopCity: 'MSY',
            flightNumbers: '5846/3426',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTVNZLDIwMjAtMTAtMDRUMDY6NDUtMDY6MDAsMjAyMC0xMC0wNFQxMzo0MC0wNTowMCxXTixXTiw1ODQ2LDdNOHxRTEEwVzJILFEsTVNZLEFVUywyMDIwLTEwLTA0VDE3OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTg6NTUtMDU6MDAsV04sV04sMzQyNiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:9:2020-10-04',
              durationMinutes: 670,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '0645'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:45',
            arrivalTime: '21:10',
            duration: '13h 25m',
            stopDescription: '3 Stops, ATL',
            stopDescriptionOnSelect: '3 Stops, Change planes ATL',
            shortStopDescription: '3 Stops',
            stopCity: 'ATL',
            flightNumbers: '5846/3519',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksQVRMLDIwMjAtMTAtMDRUMDY6NDUtMDY6MDAsMjAyMC0xMC0wNFQxNjo1MC0wNDowMCxXTixXTiw1ODQ2LDdNOHxRTEEwVzJILFEsQVRMLEFVUywyMDIwLTEwLTA0VDE5OjUwLTA0OjAwLDIwMjAtMTAtMDRUMjE6MTAtMDU6MDAsV04sV04sMzUxOSw3TTgiLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:10:2020-10-04',
              durationMinutes: 805,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0645'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:45',
            arrivalTime: '21:15',
            duration: '13h 30m',
            stopDescription: '3 Stops, MSY',
            stopDescriptionOnSelect: '3 Stops, Change planes MSY',
            shortStopDescription: '3 Stops',
            stopCity: 'MSY',
            flightNumbers: '5846/3827',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTVNZLDIwMjAtMTAtMDRUMDY6NDUtMDY6MDAsMjAyMC0xMC0wNFQxMzo0MC0wNTowMCxXTixXTiw1ODQ2LDdNOHxRTEEwVzJILFEsTVNZLEFVUywyMDIwLTEwLTA0VDE3OjA1LTA1OjAwLDIwMjAtMTAtMDRUMjE6MTUtMDU6MDAsV04sV04sMzgyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:11:2020-10-04',
              durationMinutes: 810,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0645'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:50',
            arrivalTime: '12:55',
            duration: '5h 5m',
            stopDescription: '1 Stop, PHX',
            stopDescriptionOnSelect: '1 Stop, Change planes PHX',
            shortStopDescription: '1 Stop',
            stopCity: 'PHX',
            flightNumbers: '3082/5853',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksUEhYLDIwMjAtMTAtMDRUMDY6NTAtMDY6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNzowMCxXTixXTiwzMDgyLDczV3xRTEEwVzJILFEsUEhYLEFVUywyMDIwLTEwLTA0VDA4OjQwLTA3OjAwLDIwMjAtMTAtMDRUMTI6NTUtMDU6MDAsV04sV04sNTg1Myw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:1:2020-10-04',
              durationMinutes: 305,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0650'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '07:50',
            arrivalTime: '13:35',
            duration: '4h 45m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '1159/5903',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksREVOLDIwMjAtMTAtMDRUMDc6NTAtMDY6MDAsMjAyMC0xMC0wNFQwOTozNS0wNjowMCxXTixXTiwxMTU5LDczV3xRTEEwVzJILFEsREVOLEFVUywyMDIwLTEwLTA0VDEwOjMwLTA2OjAwLDIwMjAtMTAtMDRUMTM6MzUtMDU6MDAsV04sV04sNTkwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:0:2020-10-04',
              durationMinutes: 285,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0750'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '07:50',
            arrivalTime: '15:25',
            duration: '6h 35m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '1159/3203',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksREVOLDIwMjAtMTAtMDRUMDc6NTAtMDY6MDAsMjAyMC0xMC0wNFQwOTozNS0wNjowMCxXTixXTiwxMTU5LDczV3xRTEEwVzJILFEsREVOLEFVUywyMDIwLTEwLTA0VDEyOjIwLTA2OjAwLDIwMjAtMTAtMDRUMTU6MjUtMDU6MDAsV04sV04sMzIwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:5:2020-10-04',
              durationMinutes: 395,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '0750'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '07:50',
            arrivalTime: '00:05',
            duration: '15h 15m',
            stopDescription: '3 Stops, RDU',
            stopDescriptionOnSelect: '3 Stops, Change planes RDU',
            shortStopDescription: '3 Stops',
            stopCity: 'RDU',
            flightNumbers: '1159/4158',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksUkRVLDIwMjAtMTAtMDRUMDc6NTAtMDY6MDAsMjAyMC0xMC0wNFQxNTo0NS0wNDowMCxXTixXTiwxMTU5LDczV3xRTEEwVzJILFEsUkRVLEFVUywyMDIwLTEwLTA0VDE3OjUwLTA0OjAwLDIwMjAtMTAtMDVUMDA6MDUtMDU6MDAsV04sV04sNDE1OCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:12:2020-10-04',
              durationMinutes: 915,
              numberOfStops: 3,
              startingFromAmount: 498,
              departureTime: '0750'
            },
            isNextDayArrival: true,
            hasLowestFare: true
          },
          {
            departureTime: '10:45',
            arrivalTime: '18:50',
            duration: '7h 5m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '9508/3332',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxCT0ksU0FOLDIwMjAtMTAtMDRUMTA6NDUtMDY6MDAsMjAyMC0xMC0wNFQxMTo1NS0wNzowMCxXTixXTiw5NTA4LDczV3xRTEEwVzJILFksU0FOLEFVUywyMDIwLTEwLTA0VDE0OjAwLTA3OjAwLDIwMjAtMTAtMDRUMTg6NTAtMDU6MDAsV04sV04sMzMzMiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:15:2020-10-04',
              durationMinutes: 425,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1045'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '10:45',
            arrivalTime: '18:50',
            duration: '7h 5m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '9573/3332',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxCT0ksU0FOLDIwMjAtMTAtMDRUMTA6NDUtMDY6MDAsMjAyMC0xMC0wNFQxMTo1NS0wNzowMCxXTixXTiw5NTczLDczV3xRTEEwVzJILFksU0FOLEFVUywyMDIwLTEwLTA0VDE0OjAwLTA3OjAwLDIwMjAtMTAtMDRUMTg6NTAtMDU6MDAsV04sV04sMzMzMiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:16:2020-10-04',
              durationMinutes: 425,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1045'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '11:00',
            arrivalTime: '18:50',
            duration: '6h 50m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '9509/3332',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxCT0ksU0FOLDIwMjAtMTAtMDRUMTE6MDAtMDY6MDAsMjAyMC0xMC0wNFQxMjoxMC0wNzowMCxXTixXTiw5NTA5LDczV3xRTEEwVzJILFksU0FOLEFVUywyMDIwLTEwLTA0VDE0OjAwLTA3OjAwLDIwMjAtMTAtMDRUMTg6NTAtMDU6MDAsV04sV04sMzMzMiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:14:2020-10-04',
              durationMinutes: 410,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1100'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '12:00',
            arrivalTime: '18:50',
            duration: '5h 50m',
            stopDescription: '1 Stop, SAN',
            stopDescriptionOnSelect: '1 Stop, Change planes SAN',
            shortStopDescription: '1 Stop',
            stopCity: 'SAN',
            flightNumbers: '9511/3332',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxCT0ksU0FOLDIwMjAtMTAtMDRUMTI6MDAtMDY6MDAsMjAyMC0xMC0wNFQxMzoxMC0wNzowMCxXTixXTiw5NTExLDczV3xRTEEwVzJILFksU0FOLEFVUywyMDIwLTEwLTA0VDE0OjAwLTA3OjAwLDIwMjAtMTAtMDRUMTg6NTAtMDU6MDAsV04sV04sMzMzMiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:13:2020-10-04',
              durationMinutes: 350,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1200'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '12:00',
            arrivalTime: '22:20',
            duration: '9h 20m',
            stopDescription: '2 Stops, MSY',
            stopDescriptionOnSelect: '2 Stops, Change planes MSY',
            shortStopDescription: '2 Stops',
            stopCity: 'MSY',
            flightNumbers: '9511/3357',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsWSxCT0ksTVNZLDIwMjAtMTAtMDRUMTI6MDAtMDY6MDAsMjAyMC0xMC0wNFQxOToyNS0wNTowMCxXTixXTiw5NTExLDczV3xRTEEwVzJILFksTVNZLEFVUywyMDIwLTEwLTA0VDIwOjU1LTA1OjAwLDIwMjAtMTAtMDRUMjI6MjAtMDU6MDAsV04sV04sMzM1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:17:2020-10-04',
              durationMinutes: 560,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1200'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '12:50',
            arrivalTime: '19:15',
            duration: '5h 25m',
            stopDescription: '1 Stop, LAS',
            stopDescriptionOnSelect: '1 Stop, Change planes LAS',
            shortStopDescription: '1 Stop',
            stopCity: 'LAS',
            flightNumbers: '3206/5471',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTEFTLDIwMjAtMTAtMDRUMTI6NTAtMDY6MDAsMjAyMC0xMC0wNFQxMzozMC0wNzowMCxXTixXTiwzMjA2LDczV3xRTEEwVzJILFEsTEFTLEFVUywyMDIwLTEwLTA0VDE0OjMwLTA3OjAwLDIwMjAtMTAtMDRUMTk6MTUtMDU6MDAsV04sV04sNTQ3MSw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:2:2020-10-04',
              durationMinutes: 325,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1250'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '14:35',
            arrivalTime: '21:20',
            duration: '5h 45m',
            stopDescription: '1 Stop, DEN',
            stopDescriptionOnSelect: '1 Stop, Change planes DEN',
            shortStopDescription: '1 Stop',
            stopCity: 'DEN',
            flightNumbers: '3231/4303',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksREVOLDIwMjAtMTAtMDRUMTQ6MzUtMDY6MDAsMjAyMC0xMC0wNFQxNjoyMC0wNjowMCxXTixXTiwzMjMxLDczV3xRTEEwVzJILFEsREVOLEFVUywyMDIwLTEwLTA0VDE4OjA1LTA2OjAwLDIwMjAtMTAtMDRUMjE6MjAtMDU6MDAsV04sV04sNDMwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:4:2020-10-04',
              durationMinutes: 345,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1435'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '15:30',
            arrivalTime: '23:55',
            duration: '7h 25m',
            stopDescription: '2 Stops, LAS',
            stopDescriptionOnSelect: '2 Stops, Change planes LAS',
            shortStopDescription: '2 Stops',
            stopCity: 'LAS',
            flightNumbers: '5315/4173',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTEFTLDIwMjAtMTAtMDRUMTU6MzAtMDY6MDAsMjAyMC0xMC0wNFQxNjoxNS0wNzowMCxXTixXTiw1MzE1LDczV3xRTEEwVzJILFEsTEFTLEFVUywyMDIwLTEwLTA0VDE4OjEwLTA3OjAwLDIwMjAtMTAtMDRUMjM6NTUtMDU6MDAsV04sV04sNDE3Myw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:6:2020-10-04',
              durationMinutes: 445,
              numberOfStops: 2,
              startingFromAmount: 498,
              departureTime: '1530'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '15:30',
            arrivalTime: '00:50',
            duration: '8h 20m',
            stopDescription: '1 Stop, LAS',
            stopDescriptionOnSelect: '1 Stop, Change planes LAS',
            shortStopDescription: '1 Stop',
            stopCity: 'LAS',
            flightNumbers: '5315/3498',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksTEFTLDIwMjAtMTAtMDRUMTU6MzAtMDY6MDAsMjAyMC0xMC0wNFQxNjoxNS0wNzowMCxXTixXTiw1MzE1LDczV3xRTEEwVzJILFEsTEFTLEFVUywyMDIwLTEwLTA0VDIwOjE1LTA3OjAwLDIwMjAtMTAtMDVUMDA6NTAtMDU6MDAsV04sV04sMzQ5OCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:8:2020-10-04',
              durationMinutes: 500,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1530'
            },
            isNextDayArrival: true,
            hasLowestFare: true
          },
          {
            departureTime: '17:25',
            arrivalTime: '00:05',
            duration: '5h 40m',
            stopDescription: '1 Stop, PHX',
            stopDescriptionOnSelect: '1 Stop, Change planes PHX',
            shortStopDescription: '1 Stop',
            stopCity: 'PHX',
            flightNumbers: '3159/4158',
            startingFromPrice: {
              amount: '498',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: 'Available',
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '498',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                earnPoints: 'Earn 2,901 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMQTBXMkgsUSxCT0ksUEhYLDIwMjAtMTAtMDRUMTc6MjUtMDY6MDAsMjAyMC0xMC0wNFQxODozMC0wNzowMCxXTixXTiwzMTU5LDczV3xRTEEwVzJILFEsUEhYLEFVUywyMDIwLTEwLTA0VDE5OjU1LTA3OjAwLDIwMjAtMTAtMDVUMDA6MDUtMDU6MDAsV04sV04sNDE1OCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              }
            ],
            _meta: {
              cardId: 'BOI:AUS:3:2020-10-04',
              durationMinutes: 340,
              numberOfStops: 1,
              startingFromAmount: 498,
              departureTime: '1725'
            },
            isNextDayArrival: true,
            hasLowestFare: true
          }
        ]
      }
    },
    promoCodeNotice: null,
    checkedInNotice: null,
    disclaimerWithLinks:
      'All fares are rounded up to the nearest dollar and include  <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>',
    _links: {
      fareDetails: {
        href: '/fare-details',
        labelText: 'Fare Details'
      },
      changePricingPage: {
        href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
        method: 'POST',
        body: {
          boundReference: [
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4GicWHgTJt49OQxCH6pCtQ.sZse_4E5S2O6bncU5jrYSXBeRvr0VplswFbDYkc0tPmEcgkyK_QOudDkl4NrlbtwjaelPiU8bj2IuqtXz9mC-CT8fKL392FOlT9T8kg9J5y7wVWCIhRTwgPRhRYTgx4mLtQ2iZYo5H-UflE27W-CenpY5ioM_kbG777vv3mUO8UVF-dBN0gPOng0x18LJRmL_xqXlBGTMLHLNSg4sN1aTUxuYXCK6wlC0l6R4aHS7AAa13L55JWUJP1UQ6IwhlLH4_RagYf9tgJ2-XE4OMD2y9jooqgJp57l8LRVYWxKhdbftYuSC3kP8DgFVcV6SY0sUNZcummNj28V6rNu3vqbuVYPgOI7P5QOYxxu64MLGTRQvcsRA0LReq6EblVGfySj9b3z5X_SqODDEi32BcZhNYxxBw2etoiJ86gwiJjIp9JLdLmhJjlNuMkXyBunb9MUj6VXqCbv8cCZCVe7b1xslzYpxvDf9c-7QsU9RJugUdUN0kuhCdTVOni5vkCmyccbmoa9H1VeVP_dSPCucOq9ba31v4myMgol9rG8U1y7JOsLKxpO853wq0_n2Q5hlxoJViPJTYM438J03B1zwcFRnL2Lr_4qNL5reuRtXVRNCVZpkvRJSeN__wER_saftHJSFT_uTEELD46ev8C01ghK3whw6k_1ROLmfi1tluH_NWGM6LX1-bTaJ97jHM9CXyUbcdLqPm24Rs2hudqNcnWaKvu9S9OkueqlgPh-sbAR8G-eSssHVT5fOL_10_8rHThoAVG7j1C9DGowTc0nG8eulvHjcUqbD3Zsq7E5KjH-UP55TNWSBz6ec1Ea6ApVR9MT5iBH0cvlCAl5-Tj1UP-eLghrAJbtRGgnWudInpnNrblioh6FBnhjuhOG5TYpTAGoyauflz4nrPtJidhr16Pv8rxO9jqNrV6_PYDJNJR3Zp45mIHy7YVrRrnHDRQUN7eag_D6Tk3kKDvSuQ0pVkt058D5FlAEwIw2QN5LmaN0M7ESbNiZYcC9rrR8ezwiZKjmoFbsG4JDf8ClPkNIgOip3wahZNgJQ9awqhn9GPjfAxjPyQxUBLS-kgJ4cmfoPveF1Y6Ye9nXCA6Qdrp6c1Og32z1O9CeuwPizanDjtOLm02F3pe-kAswY1DnR_S7Fo2QS_CJJwhlx8QK579cVwCyEcvwpteqIDebzNGUOGi_61C8W8iqV0dZV_n08HXebg1YBEJZTGujjG7PE2nBvpd1YZ5Uwq_-GsVvKKSNNJNeNC9hFkE4OQ5ONLHvfJoTehPzUQovVtXQtk0SQh2h_wNMo2Za7RdZrbXmW0XWJEHWpHAetTYxP_yCBwZ5mqhyDtLdpsdRt0hxqGnDM50fifMtoCRA_5mQxfAaKkgg5aiFsD7z9i2_gUqeWse4oBpHK7G905v_vaMjJAY_Ma0CjsMz1qiWuIQ1RHmynWF3Rr_RPlRUnDclwZPQzd0w06x_7maj_qrPdGPeMp2brURZevNCcfwq48rLEXCmVy-Y7Aeakp4QpFFp2MluYhYDY0h7aNr2hDuZ4Av3ZCudKSdrQwjpZjw4_XzbZ4SF9wx3OKg3M066wjfY8xR0Oqv1gSVyQNjlXrayM-yyTlGRhf7LDaJ8e5FngWMCwt1JqQYD6md9wcJ_I2SluJpxFQPMhwAX3TxzvMFrPNEwkHUEGkorYtxioP-iRnoBbcI_zES-ar_0BPMJ6NBlxUw8k38Nfx1mpqWj3OLL62xLD0TfKEX3mIBn5U2mEcu-0UvGflxL19EaHnedStr7daDDtHtjsgUehXxT_cYKOTES_b4k4CGXfCdR03ppjg5cm4WyhIeRxmtqobqJx8h0-ASH09gIJjpOBOftyNNeXq0Daql0pZQWM2uXKRzb0NJ1toybQiNQj1yjDb9FTjL-7t_Sgk2iPutje1ISrCh_Vb2p_o4u1bb5pKHa3Lv1WhhVnnzIwAtT9nIbPSlxAhmo5UgSJNqz5QGe59MUfXuvWGqq5JRPamxwpaIDMYFbe-dAkvlNDQOCaB7RUtUyJ95-a0KTP7dkVJMbVDRVvixW4lgbIFrHckqNAxtvc93pYZCMhADFpbKiPgktqFpPjaRDmVD8Ol6HU7l_IXiYmX83-BKUlLI11jUbkQb2eWvxyJbwTKg3AiR0C3_KNAJyIAdg2lm619g410WobjgRxuLkSHNcCyf-lHUZWk8eqre9idFOffVKjgmXv5tmLJ3Vr7dZ1TrhvkmWpAXyLw7mpYmsleSHD2Hy7EHV--cSzp2F6NBGwmSulsJCONfP3SXH8Wf9S1yxPvbD3cXHHyX0xvNASOeBoH0FiyhljT2y1VqffHyyGdtruq8kn_HZVG8qdDYe9hIaWJ7xd18uzjrvlF4yIvAZMdZJv_RJHlj1wD4czBObaTyIUdSXcCWtWC0Hsr97b6AeduPJ4sxCo5qdYjiUbMUl_GPkDqCN3qWHI6a60hV72AXdW7ZVCOf1mocefMUTHvjj1pJobnlhUH4wmgxAZ9RxpI_3m21XjMpDwn_hyATDcMeAYY7Z6lRQnq4JQLpwqOLYOU0w8BJVbEdeUkrsGfnDdhrbduYPlqjZ8VFTeJFfGR-CXiTJUpyEuw3Ttqnpte3uksfxRhKFRzuXvI3I1dvP-KMQTUHTiRVJnucjhce2cp8LFA8MhrD4Fc8n2l6t1fp03lYpOrWaVhDxF032Ud6tb8U68iQk4VQcm2wEk17Xu8AiFgwErSkU3b8U6T2zNhbdli1ZXEi3OEoQ44_-Rkwa1JG2oCnZcj5xEpZWfF9cuHwvndcZze98cK_ZrKJwHQsTYxqhfsNgyMnM0SuKSt6dDH_1muGhyWF_ctB3_LvLL9g6LQvXkdN6sp2EXtpe8ZYlqmtd05QQ31JjfWgrJn0WmPtjffQG21ZhNKabFMtFQFZlT1QBrEfGCWRgS_Ac48vOy3dwIs16PByKhyOs3WqIEZ81SsiaDclTIUruZhmIfkCvVwbs85HQyOk0VQVD3TxNwUclV7pcpQ_on7lO1C4F60DDjHnWVMUESScT7vemZd1Jgkwga_wF8N1IpeBoPQCXovCcSyYwcQsj0yOYfVYE_9AGNOt-ZwErwm62NI5B36Su90Pto6mJt-aFh0xu32iRZkgpjFS3Ca_zdXG-pVkyIYlGaNtbTU-bgqXTiT5t-iRyxajh6PrPYCWTxfV6UGcnuL_TvpLtmv6TJDEk4NID7PR5KLii3WBcjo9CU4yiHQp9QQDLKd54km3Eaxv7-Ok9yVUpshKA8Lw7PP0NPt_l9D9n7lxWLB45WD9yGoLCTxpM_jOfQmJSxEeeGJRACb8hqHEwmG9fGlFQ8yjvd7xzbKEVlIJf4aYg9dyBJAwfEnI6IsQ66YRWX-Mt_HsgZgVis9HcZzdYdsQrM1eXMSVr24ayGse1wQR74DY5p8z1czyCJwE0Ld3F4CJ8I59ivvZvWideE7iosTF1CbZN-rYHumbwdLrvgnekJA-hT3JPU7ccF-2Zi4pa4iGvM2WS6UnSJYqwjWBQUrQ2CSBsI5CIoV4HrSXQ6fp-OZT2MH7gqzwbbsBOa8FCnWGOEcZK8s_J8ka4VWicZzs3dnW3xmzXaUHS5sJqChpqL0KjTh7GrlH85izpMqYTj89jan6r2wXxOT8KCxMb-bphZVRJ33xtJteb9mOQPEsmld2g-e4RScfGNKVA0frebbzp60By4Fsvb37rpbJkUkPw9-lYKLY27g-cxXH2sDyi8yff-VxuWcT_tP_bGofzZYjg5VBAbbYbyXqwAryWXnRfMY0l7QBijfQOVGeOzk3wDgcGRHVkY41IuXWeYyMZEr9U8lFNan9lp6LBXGFpsctATFOqG6lpaYUVUS8sjhT28U3xHpatZHUYBmYa-O5kCX_B70y5l0joPB8mypwB9NXMEICg6fxrEhLgHYRm4o-LMwUWQzBXQpnnCvbc4tgJZeh1OCT-GI89G5gciUhRvEHarV5KF2VGuQY12nmiz98voq4dA7Ggvzct5vnOFQIY7wsaTJaKm-v8gKNXSrbVrzn-v2SXtA66oS4cPKJEEV7PP4RGv0JS01V5pt_9TO_N6uw4tsorJbkOXyOJj-UvfmggMLPOuc45bkypTc6Ykv7QmX_-w5qHMtwoC2enRfkBRG1HORsx6BGsMS3qZ4Eyzt07.yn6L1ETHG7obtRLBaGgiOQ',
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1NNb2beyN5ZvXbiBRwvp4w.mukZ8p1WpV8HxpvSnw2pKP3zBcNR5HT36pzQJ7cnWzi2el45yZAUbknpM9dRPDdPA_6pcAXKipKM15B-6l2hhdIR8722SYEPZRvo5znI5YfxQ_89JGInJgGpGvbaNbAr8K1p9cd6q-RaN-d3Z447cXaHxo9OB1a4XRq0cWgShXmYTB1jFCepqHKXretcGCCEv97c9uAq-Rl7R4B7id8gUjwEw2-BBuhnPh3N09vhu8KngOe1L80W4KGRZu-hzhl8if7mvP6Qu6iyuEE2Pba14Yz-XYvYtPaGDySokbaSWyry6TU_zyUxXjFgOb4o4lZ9Cijn6j-TRDP6-rzpXPulKRIOMa3DafCJlE33SoLgrPQ1s6ExqdCuktWLsX1XdGmOhhbLVsEye4Hk4le3QDoqH42lm55PE5Qb9F_185WHGz3i5SsP4wI5CB6-dHAhRvzZh2NAMsolKukragHCneNWPlI38SnEcjXM3CDH8qUXw0HGfZLvkAfoIRFZDU_8yO0yoEYCmdSa4hAbf41YJ26YB2P0kcL9bU89lMdduQRHIQncDyDeofzwi4C8BrP6GI2IqoKeJPttSYXOrlYgdqIa5FsXn2u6YD_UQmJTQPbAxQQbTuqbjOZUrPGr6yh5Lpl1pTLDh2LM9o71pM_RtCs_xabmwUFe8l2EqRPvS7kqHcKR5ymmtZnq22IXduNDMmpmkrJvrkGZPogLBhWkfSPb-yZ2WORQHSwsUIuebelIWG6IzS4oPHHNaeEj1U1fhs425fcawObcKsYHMqofwXuwdjciPnuF8kMSma_sTK2phu9ldHXe5ixjnX4k1gTUYKvrgZf6iLvx-q6K8YXcR4FYcfCeDWSPDcCbDkUtgaeZ6xWZRuRo7TcP9DNCQ6qwXAGC6N3z6AHNjIBWEpFa0otHqNOWYUZphJcgwarGWodwuAuWRtW7aSZ0mVxbCYWQUhHOTkFoIpgQjq09wjMz3iu3NknPD9WIyx3FvlkUL13luJKAilIqSQn2tv5uKiepOgMXxNarULDuG-9nWDxZgRe-ojcksZ6-sAqPLYKpO30DCR-IUiM34o9PB0r2v9YwTRoXuwsF_dL_o-uYcdETpHtmvKz75xnym7gD1M41NyJkYoKGqdOjkfboU116TveJLdGBwCH68iVhD35XR0C_SJR4qCarc7nDXInm0bF60NzXx12FrFK-2V4IzlOT6Zn7Y7LopK4rJXc7uwfJmQwRm1s9UdS8iDtP2bzpo8qxYZrznw40O-N52duaREBCO0iHQzoC2a8rbI37ICPtijrxf7Lk-3h0AggiSL0VK7Sceog_mX4vb1uaPY8KHc6VFsEqL9yBlyDnFImJlQ1DLLwPGjB7AXyzT9KtsgRMWOH9XwsX-XzkDg2AbECa7jByNPQS0ETBxa0w1JX5VTucO-oYVGZSnY2d75hjAsBJLm8m5XoxllqPEX4ePE4HfgpNFzhllYTttRBAoLw4RNBH3GFKyTYbDqQbDO-zoEK0xZqCAWqaSjtw-FgYIhxUVvJxrdwyJyLS4Om5G10bubKdJaGhBDuILQNGUH8Xgcazm061XGz_40r0rCFVLYTaQLr23e1WLFYA1mDXot4kdmlSK__PKnvu7oLX4kNedUpRVnjdPJSZSZqqMfB__A6EnCpkW4PxaFaLfKdfbt4vTFk6QV85WTl57grIZ6qYEIJZyDEEpCHLkalnLB6IIIjtQuBMK168P7V_2Wken8Keap-BxEM5bjzXg99PSOfdfq1Ehlqb71wIQzYQcA0Cu8rnu1EO-wtjNWxA8FsRo9lVZH7hfwSweRvxjbR293hgOx1F6If5ip819iC6ryYtjOBF5Hc3BLy5WXPRjpAf-DREEzUUcKb7kO7qUjzWp7n_aKnCscMBj5bmWUgUsT9ng50nAJqRp6prVobgy5MWY9cDabOQUUwd-Ev8VTcDuAnPiHSajdgJavIjvKSUQaqax8adsKaiONoFzX7pnHUQjeLstSzc1lb9Ko7FnbxO63DvtISAwOzg5PVA5nlpWcEr3C1HHy88xEcgiI10OEEApLQjYHWKMxIlBzoCDZmpkcU2xeLHEvWov1ks4d_TPJZe2vPWgkqjptXJrlJV1Hd0mP7jsvKAcY26k-RSQe4PBnEZAQoFRg2F9ekDYFKerdZpf3FgRdLRMy4Tq65qEJGSXhZ1IRvf-m_-8pKIG0woA2C9lg5pHR_OYiObHuHQGvwehG8IWM9OBW3pLYMuDovHVJrXY68LmuKHvmY83RGq2XMB4V-NGSCZZrryiyyElgbT8rYcdJ0RT0Eb6Q36n5qlnRyOg4CVX2hQ46FfdY21ia1UAZkFtO-U1fQJ23juyyQtfsMDNIhFoWd_UddNyiEsOl9n6BNwjemV8ytdQWDXKjC3hRzYPgWOcpw1tlb8fCsthNR_1sIvCNxupH9PNNk8KIERw5Hu3LOGkJvz5R3l8fQybgG4EArMigK_riAZLSYKEGq6PNEycod6m-OjUqjR381zZY5K9fWpr9SvRSDzX7jFMjyZEdoulWCkmbMOI0eSs4a8S8aT8MVXEZBPLJMLx0UOfLoiY3Bab8pMOtnaPAmZyNMEBOghRIM6goVfJkZVQDvpZ9dbCv1kOABuNe18LSUKczdthA1X7QysbtDlEEHooDaIAPcAl7gL0c29Pp8RbUIfSZlxfD_w_59_m_Yz2ZoalFN9HFBrvgbS2R_MaoZbwfarG4mcqNmUAlhzpLKHawyRTNxMXXD0IIKKe1J9uN_k1A0bHxXf-kt8dbMMNSThUxJzhd7D6kz_lBxKhQ9iQXzzg7hq6_rnS8ohGEM9Dxlp0EgHJ0o3qdVAex5_Z59beAryvS-2SfRgZA6q1E8t7ovu0FyNY_ivkwGHdEFeaW5moUAP_ui8mszutkpZxN-64c1nWJ-QwmlywSliGyJ2MR7555BpH8ufYfuLoWi0_iejRzYbPsiUDRgoEhOu7ZPkPa00tItHYWjHeNCGPUkDIL8L5lfuyD3-ndxq6_c75avT6Dpc6uBMoK0batoG3po_kIWowTR5fCuncGkklAKcJekPnVcR3jbR9VztiQjpASdp6L6JrOhd_s8RtSS6RHqbcL9rx0V14iUjnOxmi8CR9rsMyYHPBnQIOwhnDx1T0Hhxy2Y3iu8gTbCoFMPDJZojOkbJ80tP2eyoygx7fM6jzFJZuzAQHXZvUNGfUi1UDJa4gpwawRG-KRGeFxl275wInIlrGAbSytZKtN3WilewBi5yiAQj3BqAoQCWhz785SHNl-jeSfIivIWk67MnKYUSDWZtcb1PkEEB9El2LtU6rY0JiIDH3CPXeGW-UCAFeaaxaKSNFXsmcS-fnEjIyHjQtJjVessAbCKxTTc2UOM84h50tHbkh98N16JwfYyAzORfgLZu58Ok7dhrEi8BQcHytBL1QE4xF11WZkBKoPMjVBR2YT2g-CsTvBd1PsFLmqtMr4HmBy26CswTAUbustBv4K7wNy28lDi4bcT3FmfyTuvW8_mGWfaZk0tUB2xR44BgshZUMoe8Gaipi_EbrgMutAw6Jtx1iQ1BWijPLRRPBsKcorkQMZIVsN3GlINq5iTBQaWCBnsr098svCMNv3uzj2kdu7j5ISWLVIY389M--k87voK1SBb_cJbVz8zvko2vI3c-eRl-Kgfjr8JFsIfaFjygc3wnE4yLBDqtrnTenVHdImEPJL2X8OESMwSlCQi1CDsA2ue_RvEI4UpqlYLgH69t5L7qqAvYywnqIUN4sLz3Wn4-FzdtjBFC57hMXTetFmMz4nJoyYHsg8goPhxX02U6DtsteQfYurcLgEZPYoUIIbzohz4urvyugtdEQdv7CyNViKqAiWM4wtPWAWIWFDJlGEqDrbi59naerhXbMukWvOO3OWDJQODYy6mq-ieMW7JEDsAupLZJ8kc_LclNqd4P4g9HGAnBjDbIdksRGp7V9c3wju3kOByhx7ELz1x_o-RqQL5YOvrgkKQJYbAhUY5SYxALgw7MANGWejuBN9cWURgE4m3c6YZbK9RZ4xdY3WnJX5eFlRNyMVW_AzegFA74Sm0KWiSYvLriANxbGBTmo_oOruGWBLnawUrWAt_6B446l9oP5g5q7oaYehdKAsQmTwlKQ3PidjjrS0DQqWnVLC3iPyOwxbvw.aXxfLCvWZ_r9DL-J8YZkOQ'
          ]
        }
      }
    },
    _meta: {
      purchaseWithPoints: false,
      isPromoCodeApplied: false,
      isCheckedIn: false
    }
  }
};
