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
        departsTime: '06:00',
        arrivesTime: '07:05',
        flightTime: '1h 5m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        flight: '2691',
        isNextDayArrival: false
      },
      inbound: {
        date: '2020-10-04',
        departsTime: '07:00',
        arrivesTime: '09:35',
        flightTime: '2h 35m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopCity: 'HOU',
        flight: '2954/2708',
        isNextDayArrival: false
      }
    },
    flights: {
      outboundPage: {
        header: {
          airportInfo: 'DAL - AUS',
          selectedDate: '2020-10-01',
          originAirport: 'DAL',
          destinationAirport: 'AUS'
        },
        cards: [
          {
            departureTime: '06:00',
            arrivalTime: '07:05',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '2691',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzowNS0wNTowMCxXTixXTiwyNjkxLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzowNS0wNTowMCxXTixXTiwyNjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzAwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzowNS0wNTowMCxXTixXTiwyNjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzI4LjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:9:2020-10-01',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '0600'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '06:00',
            arrivalTime: '09:25',
            duration: '3h 25m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '1628/235',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoxMC0wNTowMCxXTixXTiwxNjI4LDczV3xWTEEwVjJILFYsSE9VLEFVUywyMDIwLTEwLTAxVDA4OjMwLTA1OjAwLDIwMjAtMTAtMDFUMDk6MjUtMDU6MDAsV04sV04sMjM1LDczVyIsInF1b3RlZFByaWNlIjoiNC41MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoxMC0wNTowMCxXTixXTiwxNjI4LDczV3xZTDZZLFksSE9VLEFVUywyMDIwLTEwLTAxVDA4OjMwLTA1OjAwLDIwMjAtMTAtMDFUMDk6MjUtMDU6MDAsV04sV04sMjM1LDczVyIsInF1b3RlZFByaWNlIjoiMzI5LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoxMC0wNTowMCxXTixXTiwxNjI4LDczV3xLUDhLLEssSE9VLEFVUywyMDIwLTEwLTAxVDA4OjMwLTA1OjAwLDIwMjAtMTAtMDFUMDk6MjUtMDU6MDAsV04sV04sMjM1LDczVyIsInF1b3RlZFByaWNlIjoiMzU3LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:15:2020-10-01',
              durationMinutes: 205,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0600'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '06:00',
            arrivalTime: '10:05',
            duration: '4h 5m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            shortStopDescription: '1 Stop',
            stopCity: 'MSY',
            flightNumbers: '165/2451',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoyNS0wNTowMCxXTixXTiwxNjUsNzNXfFZMQTBWMkgsVixNU1ksQVVTLDIwMjAtMTAtMDFUMDg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNTowMCxXTixXTiwyNDUxLDczVyIsInF1b3RlZFByaWNlIjoiNC41MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoyNS0wNTowMCxXTixXTiwxNjUsNzNXfFlMNlksWSxNU1ksQVVTLDIwMjAtMTAtMDFUMDg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNTowMCxXTixXTiwyNDUxLDczVyIsInF1b3RlZFByaWNlIjoiMzI5LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTAtMDFUMDY6MDAtMDU6MDAsMjAyMC0xMC0wMVQwNzoyNS0wNTowMCxXTixXTiwxNjUsNzNXfEtQOEssSyxNU1ksQVVTLDIwMjAtMTAtMDFUMDg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMDowNS0wNTowMCxXTixXTiwyNDUxLDczVyIsInF1b3RlZFByaWNlIjoiMzU3LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:21:2020-10-01',
              durationMinutes: 245,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0600'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '07:20',
            arrivalTime: '08:20',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '506',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMDc6MjAtMDU6MDAsMjAyMC0xMC0wMVQwODoyMC0wNTowMCxXTixXTiw1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMDc6MjAtMDU6MDAsMjAyMC0xMC0wMVQwODoyMC0wNTowMCxXTixXTiw1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMDAuMDAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMDc6MjAtMDU6MDAsMjAyMC0xMC0wMVQwODoyMC0wNTowMCxXTixXTiw1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjguMDAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:1:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '0720'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '07:30',
            arrivalTime: '11:50',
            duration: '4h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '3/2268',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMDc6MzAtMDU6MDAsMjAyMC0xMC0wMVQwODo0MC0wNTowMCxXTixXTiwzLDczV3xWTEEwVjJILFYsSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMDc6MzAtMDU6MDAsMjAyMC0xMC0wMVQwODo0MC0wNTowMCxXTixXTiwzLDczV3xZTDZZLFksSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyOS41MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMDc6MzAtMDU6MDAsMjAyMC0xMC0wMVQwODo0MC0wNTowMCxXTixXTiwzLDczV3xLUDhLLEssSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1Ny41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:22:2020-10-01',
              durationMinutes: 260,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0730'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:00',
            arrivalTime: '11:50',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '5/2268',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MDAtMDU6MDAsMjAyMC0xMC0wMVQwOToxMC0wNTowMCxXTixXTiw1LDczSHxWTEEwVjJILFYsSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MDAtMDU6MDAsMjAyMC0xMC0wMVQwOToxMC0wNTowMCxXTixXTiw1LDczSHxZTDZZLFksSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyOS41MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MDAtMDU6MDAsMjAyMC0xMC0wMVQwOToxMC0wNTowMCxXTixXTiw1LDczSHxLUDhLLEssSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1Ny41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:16:2020-10-01',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0800'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:30',
            arrivalTime: '11:50',
            duration: '3h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '7/2268',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MzAtMDU6MDAsMjAyMC0xMC0wMVQwOTo0MC0wNTowMCxXTixXTiw3LDczV3xWTEEwVjJILFYsSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MzAtMDU6MDAsMjAyMC0xMC0wMVQwOTo0MC0wNTowMCxXTixXTiw3LDczV3xZTDZZLFksSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyOS41MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMDg6MzAtMDU6MDAsMjAyMC0xMC0wMVQwOTo0MC0wNTowMCxXTixXTiw3LDczV3xLUDhLLEssSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1Ny41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:12:2020-10-01',
              durationMinutes: 200,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0830'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:00',
            arrivalTime: '11:50',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '9/2268',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMDk6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiw5LDczSHxWTEEwVjJILFYsSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMDk6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiw5LDczSHxZTDZZLFksSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyOS41MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMDk6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiw5LDczSHxLUDhLLEssSE9VLEFVUywyMDIwLTEwLTAxVDEwOjUwLTA1OjAwLDIwMjAtMTAtMDFUMTE6NTAtMDU6MDAsV04sV04sMjI2OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1Ny41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:10:2020-10-01',
              durationMinutes: 170,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0900'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '09:15',
            arrivalTime: '10:15',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '2192',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiwyMTkyLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiwyMTkyLDczVyIsInF1b3RlZFByaWNlIjoiMzAwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQxMDoxNS0wNTowMCxXTixXTiwyMTkyLDczVyIsInF1b3RlZFByaWNlIjoiMzI4LjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:2:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '0915'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '09:15',
            arrivalTime: '13:05',
            duration: '3h 50m',
            stopDescription: '1 Stop, ELP',
            stopDescriptionOnSelect: '1 Stop, Change planes ELP',
            shortStopDescription: '1 Stop',
            stopCity: 'ELP',
            flightNumbers: '373/374',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsRUxQLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQwOTo1NS0wNjowMCxXTixXTiwzNzMsNzNXfFZMQTBWMkgsVixFTFAsQVVTLDIwMjAtMTAtMDFUMTA6MzUtMDY6MDAsMjAyMC0xMC0wMVQxMzowNS0wNTowMCxXTixXTiwzNzQsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsRUxQLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQwOTo1NS0wNjowMCxXTixXTiwzNzMsNzNXfFlMNlksWSxFTFAsQVVTLDIwMjAtMTAtMDFUMTA6MzUtMDY6MDAsMjAyMC0xMC0wMVQxMzowNS0wNTowMCxXTixXTiwzNzQsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsRUxQLDIwMjAtMTAtMDFUMDk6MTUtMDU6MDAsMjAyMC0xMC0wMVQwOTo1NS0wNjowMCxXTixXTiwzNzMsNzNXfEtQOEssSyxFTFAsQVVTLDIwMjAtMTAtMDFUMTA6MzUtMDY6MDAsMjAyMC0xMC0wMVQxMzowNS0wNTowMCxXTixXTiwzNzQsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:17:2020-10-01',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0915'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '10:30',
            arrivalTime: '11:30',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '508',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTA6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMTozMC0wNTowMCxXTixXTiw1MDgsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTA6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMTozMC0wNTowMCxXTixXTiw1MDgsNzNXIiwicXVvdGVkUHJpY2UiOiIzMDAuMDAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTA6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMTozMC0wNTowMCxXTixXTiw1MDgsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjguMDAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:3:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1030'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '10:35',
            arrivalTime: '14:55',
            duration: '4h 20m',
            stopDescription: '1 Stop, ABQ',
            stopDescriptionOnSelect: '1 Stop, Change planes ABQ',
            shortStopDescription: '1 Stop',
            stopCity: 'ABQ',
            flightNumbers: '2588/794',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsQUJRLDIwMjAtMTAtMDFUMTA6MzUtMDU6MDAsMjAyMC0xMC0wMVQxMToyNS0wNjowMCxXTixXTiwyNTg4LDczV3xWTEEwVjJILFYsQUJRLEFVUywyMDIwLTEwLTAxVDEyOjEwLTA2OjAwLDIwMjAtMTAtMDFUMTQ6NTUtMDU6MDAsV04sV04sNzk0LDczVyIsInF1b3RlZFByaWNlIjoiNC41MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsQUJRLDIwMjAtMTAtMDFUMTA6MzUtMDU6MDAsMjAyMC0xMC0wMVQxMToyNS0wNjowMCxXTixXTiwyNTg4LDczV3xZTDZZLFksQUJRLEFVUywyMDIwLTEwLTAxVDEyOjEwLTA2OjAwLDIwMjAtMTAtMDFUMTQ6NTUtMDU6MDAsV04sV04sNzk0LDczVyIsInF1b3RlZFByaWNlIjoiMzI5LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsQUJRLDIwMjAtMTAtMDFUMTA6MzUtMDU6MDAsMjAyMC0xMC0wMVQxMToyNS0wNjowMCxXTixXTiwyNTg4LDczV3xLUDhLLEssQUJRLEFVUywyMDIwLTEwLTAxVDEyOjEwLTA2OjAwLDIwMjAtMTAtMDFUMTQ6NTUtMDU6MDAsV04sV04sNzk0LDczVyIsInF1b3RlZFByaWNlIjoiMzU3LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:23:2020-10-01',
              durationMinutes: 260,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1035'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '11:00',
            arrivalTime: '15:20',
            duration: '4h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '17/1407',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMjoxMC0wNTowMCxXTixXTiwxNyw3M0h8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMjoxMC0wNTowMCxXTixXTiwxNyw3M0h8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMjoxMC0wNTowMCxXTixXTiwxNyw3M0h8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:24:2020-10-01',
              durationMinutes: 260,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1100'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '11:30',
            arrivalTime: '15:20',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '19/1407',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMjo0NS0wNTowMCxXTixXTiwxOSw3M1d8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMjo0NS0wNTowMCxXTixXTiwxOSw3M1d8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTE6MzAtMDU6MDAsMjAyMC0xMC0wMVQxMjo0NS0wNTowMCxXTixXTiwxOSw3M1d8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:18:2020-10-01',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1130'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '12:00',
            arrivalTime: '15:20',
            duration: '3h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '21/1407',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTI6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMzoxNS0wNTowMCxXTixXTiwyMSw3M1d8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTI6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMzoxNS0wNTowMCxXTixXTiwyMSw3M1d8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTI6MDAtMDU6MDAsMjAyMC0xMC0wMVQxMzoxNS0wNTowMCxXTixXTiwyMSw3M1d8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQxNDoyNS0wNTowMCwyMDIwLTEwLTAxVDE1OjIwLTA1OjAwLFdOLFdOLDE0MDcsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:13:2020-10-01',
              durationMinutes: 200,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1200'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '12:45',
            arrivalTime: '13:45',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '2130',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTI6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMzo0NS0wNTowMCxXTixXTiwyMTMwLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTI6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMzo0NS0wNTowMCxXTixXTiwyMTMwLDczVyIsInF1b3RlZFByaWNlIjoiMzAwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTI6NDUtMDU6MDAsMjAyMC0xMC0wMVQxMzo0NS0wNTowMCxXTixXTiwyMTMwLDczVyIsInF1b3RlZFByaWNlIjoiMzI4LjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:4:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1245'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '14:50',
            arrivalTime: '15:55',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '2322',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTQ6NTAtMDU6MDAsMjAyMC0xMC0wMVQxNTo1NS0wNTowMCxXTixXTiwyMzIyLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTQ6NTAtMDU6MDAsMjAyMC0xMC0wMVQxNTo1NS0wNTowMCxXTixXTiwyMzIyLDczVyIsInF1b3RlZFByaWNlIjoiMzAwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTQ6NTAtMDU6MDAsMjAyMC0xMC0wMVQxNTo1NS0wNTowMCxXTixXTiwyMzIyLDczVyIsInF1b3RlZFByaWNlIjoiMzI4LjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:7:2020-10-01',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1450'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '16:15',
            arrivalTime: '20:35',
            duration: '4h 20m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            shortStopDescription: '1 Stop',
            stopCity: 'MSY',
            flightNumbers: '2270/453',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTAtMDFUMTY6MTUtMDU6MDAsMjAyMC0xMC0wMVQxNzo0MC0wNTowMCxXTixXTiwyMjcwLDczV3xWTEEwVjJILFYsTVNZLEFVUywyMDIwLTEwLTAxVDE5OjE1LTA1OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDU6MDAsV04sV04sNDUzLDczVyIsInF1b3RlZFByaWNlIjoiNC41MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTAtMDFUMTY6MTUtMDU6MDAsMjAyMC0xMC0wMVQxNzo0MC0wNTowMCxXTixXTiwyMjcwLDczV3xZTDZZLFksTVNZLEFVUywyMDIwLTEwLTAxVDE5OjE1LTA1OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDU6MDAsV04sV04sNDUzLDczVyIsInF1b3RlZFByaWNlIjoiMzI5LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTAtMDFUMTY6MTUtMDU6MDAsMjAyMC0xMC0wMVQxNzo0MC0wNTowMCxXTixXTiwyMjcwLDczV3xLUDhLLEssTVNZLEFVUywyMDIwLTEwLTAxVDE5OjE1LTA1OjAwLDIwMjAtMTAtMDFUMjA6MzUtMDU6MDAsV04sV04sNDUzLDczVyIsInF1b3RlZFByaWNlIjoiMzU3LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:25:2020-10-01',
              durationMinutes: 260,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1615'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '16:25',
            arrivalTime: '17:30',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '34',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTY6MjUtMDU6MDAsMjAyMC0xMC0wMVQxNzozMC0wNTowMCxXTixXTiwzNCw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTY6MjUtMDU6MDAsMjAyMC0xMC0wMVQxNzozMC0wNTowMCxXTixXTiwzNCw3M0giLCJxdW90ZWRQcmljZSI6IjMwMC4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTY6MjUtMDU6MDAsMjAyMC0xMC0wMVQxNzozMC0wNTowMCxXTixXTiwzNCw3M0giLCJxdW90ZWRQcmljZSI6IjMyOC4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:8:2020-10-01',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1625'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '16:30',
            arrivalTime: '20:20',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '41/2538',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTY6MzAtMDU6MDAsMjAyMC0xMC0wMVQxNzo0NS0wNTowMCxXTixXTiw0MSw3M0h8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTY6MzAtMDU6MDAsMjAyMC0xMC0wMVQxNzo0NS0wNTowMCxXTixXTiw0MSw3M0h8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTY6MzAtMDU6MDAsMjAyMC0xMC0wMVQxNzo0NS0wNTowMCxXTixXTiw0MSw3M0h8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:19:2020-10-01',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1630'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '17:30',
            arrivalTime: '20:20',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '45/2538',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTc6MzAtMDU6MDAsMjAyMC0xMC0wMVQxODo0NS0wNTowMCxXTixXTiw0NSw3M1d8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTc6MzAtMDU6MDAsMjAyMC0xMC0wMVQxODo0NS0wNTowMCxXTixXTiw0NSw3M1d8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTc6MzAtMDU6MDAsMjAyMC0xMC0wMVQxODo0NS0wNTowMCxXTixXTiw0NSw3M1d8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQxOToyNS0wNTowMCwyMDIwLTEwLTAxVDIwOjIwLTA1OjAwLFdOLFdOLDI1MzgsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:11:2020-10-01',
              durationMinutes: 170,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1730'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '18:30',
            arrivalTime: '22:20',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '49/1506',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTg6MzAtMDU6MDAsMjAyMC0xMC0wMVQxOTo0MC0wNTowMCxXTixXTiw0OSw3M1d8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTg6MzAtMDU6MDAsMjAyMC0xMC0wMVQxOTo0MC0wNTowMCxXTixXTiw0OSw3M1d8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTg6MzAtMDU6MDAsMjAyMC0xMC0wMVQxOTo0MC0wNTowMCxXTixXTiw0OSw3M1d8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:20:2020-10-01',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1830'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '18:45',
            arrivalTime: '19:45',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '2157',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxOTo0NS0wNTowMCxXTixXTiwyMTU3LDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxOTo0NS0wNTowMCxXTixXTiwyMTU3LDczVyIsInF1b3RlZFByaWNlIjoiMzAwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTg6NDUtMDU6MDAsMjAyMC0xMC0wMVQxOTo0NS0wNTowMCxXTixXTiwyMTU3LDczVyIsInF1b3RlZFByaWNlIjoiMzI4LjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:5:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1845'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '19:00',
            arrivalTime: '22:20',
            duration: '3h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '51/1506',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '5',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: {
                  amount: '315',
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
                  sign: '+'
                },
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsSE9VLDIwMjAtMTAtMDFUMTk6MDAtMDU6MDAsMjAyMC0xMC0wMVQyMDoxMC0wNTowMCxXTixXTiw1MSw3M1d8VkxBMFYySCxWLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI0LjUwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '330',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsSE9VLDIwMjAtMTAtMDFUMTk6MDAtMDU6MDAsMjAyMC0xMC0wMVQyMDoxMC0wNTowMCxXTixXTiw1MSw3M1d8WUw2WSxZLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjkuNTAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '358',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsSE9VLDIwMjAtMTAtMDFUMTk6MDAtMDU6MDAsMjAyMC0xMC0wMVQyMDoxMC0wNTowMCxXTixXTiw1MSw3M1d8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMC0wMVQyMToyNS0wNTowMCwyMDIwLTEwLTAxVDIyOjIwLTA1OjAwLFdOLFdOLDE1MDYsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTcuNTAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:14:2020-10-01',
              durationMinutes: 200,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1900'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '19:50',
            arrivalTime: '20:45',
            duration: '0h 55m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '814',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMTk6NTAtMDU6MDAsMjAyMC0xMC0wMVQyMDo0NS0wNTowMCxXTixXTiw4MTQsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMTk6NTAtMDU6MDAsMjAyMC0xMC0wMVQyMDo0NS0wNTowMCxXTixXTiw4MTQsNzNXIiwicXVvdGVkUHJpY2UiOiIzMDAuMDAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMTk6NTAtMDU6MDAsMjAyMC0xMC0wMVQyMDo0NS0wNTowMCxXTixXTiw4MTQsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjguMDAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:0:2020-10-01',
              durationMinutes: 55,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1950'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '22:05',
            arrivalTime: '23:05',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '376',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsQVVTLDIwMjAtMTAtMDFUMjI6MDUtMDU6MDAsMjAyMC0xMC0wMVQyMzowNS0wNTowMCxXTixXTiwzNzYsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '300',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsQVVTLDIwMjAtMTAtMDFUMjI6MDUtMDU6MDAsMjAyMC0xMC0wMVQyMzowNS0wNTowMCxXTixXTiwzNzYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMDAuMDAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '328',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsQVVTLDIwMjAtMTAtMDFUMjI6MDUtMDU6MDAsMjAyMC0xMC0wMVQyMzowNS0wNTowMCxXTixXTiwzNzYsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjguMDAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'DAL:AUS:6:2020-10-01',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '2205'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          }
        ]
      },
      inboundPage: {
        header: {
          airportInfo: 'AUS - DAL',
          selectedDate: '2020-10-04',
          originAirport: 'AUS',
          destinationAirport: 'DAL'
        },
        cards: [
          {
            departureTime: '07:00',
            arrivalTime: '09:35',
            duration: '2h 35m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2954/2708',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDA4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMDk6MzUtMDU6MDAsV04sV04sMjcwOCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDA4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMDk6MzUtMDU6MDAsV04sV04sMjcwOCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDA4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMDk6MzUtMDU6MDAsV04sV04sMjcwOCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:8:2020-10-04',
              durationMinutes: 155,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0700'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '07:00',
            arrivalTime: '10:35',
            duration: '3h 35m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2954/2719',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDA5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTA6MzUtMDU6MDAsV04sV04sMjcxOSw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDA5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTA6MzUtMDU6MDAsV04sV04sMjcxOSw3M0giLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDA5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTA6MzUtMDU6MDAsV04sV04sMjcxOSw3M0giLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:15:2020-10-04',
              durationMinutes: 215,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0700'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '07:00',
            arrivalTime: '11:35',
            duration: '4h 35m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2954/2726',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDEwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMTE6MzUtMDU6MDAsV04sV04sMjcyNiw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDEwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMTE6MzUtMDU6MDAsV04sV04sMjcyNiw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDc6MDAtMDU6MDAsMjAyMC0xMC0wNFQwNzo1NS0wNTowMCxXTixXTiwyOTU0LDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDEwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMTE6MzUtMDU6MDAsV04sV04sMjcyNiw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:20:2020-10-04',
              durationMinutes: 275,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0700'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '07:05',
            arrivalTime: '08:10',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '5416',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMDc6MDUtMDU6MDAsMjAyMC0xMC0wNFQwODoxMC0wNTowMCxXTixXTiw1NDE2LDczSCIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMDc6MDUtMDU6MDAsMjAyMC0xMC0wNFQwODoxMC0wNTowMCxXTixXTiw1NDE2LDczSCIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMDc6MDUtMDU6MDAsMjAyMC0xMC0wNFQwODoxMC0wNTowMCxXTixXTiw1NDE2LDczSCIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:5:2020-10-04',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '0705'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '08:35',
            arrivalTime: '09:35',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '3328',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTozNS0wNTowMCxXTixXTiwzMzI4LDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTozNS0wNTowMCxXTixXTiwzMzI4LDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTozNS0wNTowMCxXTixXTiwzMzI4LDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:0:2020-10-04',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '0835'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '08:35',
            arrivalTime: '13:10',
            duration: '4h 35m',
            stopDescription: '1 Stop, ELP',
            stopDescriptionOnSelect: '1 Stop, Change planes ELP',
            shortStopDescription: '1 Stop',
            stopCity: 'ELP',
            flightNumbers: '4332/3754',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsRUxQLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTowNS0wNjowMCxXTixXTiw0MzMyLDczV3xWTEEwVjJILFYsRUxQLERBTCwyMDIwLTEwLTA0VDEwOjI1LTA2OjAwLDIwMjAtMTAtMDRUMTM6MTAtMDU6MDAsV04sV04sMzc1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsRUxQLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTowNS0wNjowMCxXTixXTiw0MzMyLDczV3xZTDZZLFksRUxQLERBTCwyMDIwLTEwLTA0VDEwOjI1LTA2OjAwLDIwMjAtMTAtMDRUMTM6MTAtMDU6MDAsV04sV04sMzc1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsRUxQLDIwMjAtMTAtMDRUMDg6MzUtMDU6MDAsMjAyMC0xMC0wNFQwOTowNS0wNjowMCxXTixXTiw0MzMyLDczV3xLUDhLLEssRUxQLERBTCwyMDIwLTEwLTA0VDEwOjI1LTA2OjAwLDIwMjAtMTAtMDRUMTM6MTAtMDU6MDAsV04sV04sMzc1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:21:2020-10-04',
              durationMinutes: 275,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0835'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:45',
            arrivalTime: '11:35',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '667/2726',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfFZMQTBWMkgsVixIT1UsREFMLDIwMjAtMTAtMDRUMTA6MzAtMDU6MDAsMjAyMC0xMC0wNFQxMTozNS0wNTowMCxXTixXTiwyNzI2LDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfFlMNlksWSxIT1UsREFMLDIwMjAtMTAtMDRUMTA6MzAtMDU6MDAsMjAyMC0xMC0wNFQxMTozNS0wNTowMCxXTixXTiwyNzI2LDczVyIsInF1b3RlZFByaWNlIjoiMzI1LjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfEtQOEssSyxIT1UsREFMLDIwMjAtMTAtMDRUMTA6MzAtMDU6MDAsMjAyMC0xMC0wNFQxMTozNS0wNTowMCxXTixXTiwyNzI2LDczVyIsInF1b3RlZFByaWNlIjoiMzUzLjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:9:2020-10-04',
              durationMinutes: 170,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0845'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:45',
            arrivalTime: '13:05',
            duration: '4h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '667/2742',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfFZMQTBWMkgsVixIT1UsREFMLDIwMjAtMTAtMDRUMTI6MDAtMDU6MDAsMjAyMC0xMC0wNFQxMzowNS0wNTowMCxXTixXTiwyNzQyLDczVyIsInF1b3RlZFByaWNlIjoiMC4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfFlMNlksWSxIT1UsREFMLDIwMjAtMTAtMDRUMTI6MDAtMDU6MDAsMjAyMC0xMC0wNFQxMzowNS0wNTowMCxXTixXTiwyNzQyLDczVyIsInF1b3RlZFByaWNlIjoiMzI1LjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfEtQOEssSyxIT1UsREFMLDIwMjAtMTAtMDRUMTI6MDAtMDU6MDAsMjAyMC0xMC0wNFQxMzowNS0wNTowMCxXTixXTiwyNzQyLDczVyIsInF1b3RlZFByaWNlIjoiMzUzLjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:18:2020-10-04',
              durationMinutes: 260,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '0845'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '08:45',
            arrivalTime: '13:35',
            duration: '4h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '667/9691',
            startingFromPrice: {
              amount: '640',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '325',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: null,
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                earnPoints: null,
                reasonIfUnavailable: 'Unavailable',
                _meta: {
                  productId: null,
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfFlMNlksWSxIT1UsREFMLDIwMjAtMTAtMDRUMTM6MDAtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzI1LjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMDg6NDUtMDU6MDAsMjAyMC0xMC0wNFQwOTo0NS0wNTowMCxXTixXTiw2NjcsNzNXfEtQOEssSyxIT1UsREFMLDIwMjAtMTAtMDRUMTM6MDAtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzUzLjAwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:24:2020-10-04',
              durationMinutes: 290,
              numberOfStops: 1,
              startingFromAmount: 640,
              departureTime: '0845'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '11:45',
            arrivalTime: '12:45',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '4502',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMTE6NDUtMDU6MDAsMjAyMC0xMC0wNFQxMjo0NS0wNTowMCxXTixXTiw0NTAyLDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMTE6NDUtMDU6MDAsMjAyMC0xMC0wNFQxMjo0NS0wNTowMCxXTixXTiw0NTAyLDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMTE6NDUtMDU6MDAsMjAyMC0xMC0wNFQxMjo0NS0wNTowMCxXTixXTiw0NTAyLDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:1:2020-10-04',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1145'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '12:35',
            arrivalTime: '15:40',
            duration: '3h 5m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '4720/2756',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDE0OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTU6NDAtMDU6MDAsV04sV04sMjc1Niw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE0OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTU6NDAtMDU6MDAsV04sV04sMjc1Niw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE0OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTU6NDAtMDU6MDAsV04sV04sMjc1Niw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:12:2020-10-04',
              durationMinutes: 185,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1235'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '12:35',
            arrivalTime: '16:40',
            duration: '4h 5m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '4720/2765',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDE1OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTY6NDAtMDU6MDAsV04sV04sMjc2NSw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE1OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTY6NDAtMDU6MDAsV04sV04sMjc2NSw3M0giLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTI6MzUtMDU6MDAsMjAyMC0xMC0wNFQxMzozNS0wNTowMCxXTixXTiw0NzIwLDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE1OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTY6NDAtMDU6MDAsV04sV04sMjc2NSw3M0giLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:17:2020-10-04',
              durationMinutes: 245,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1235'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '13:30',
            arrivalTime: '14:30',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '5853',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMTM6MzAtMDU6MDAsMjAyMC0xMC0wNFQxNDozMC0wNTowMCxXTixXTiw1ODUzLDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMTM6MzAtMDU6MDAsMjAyMC0xMC0wNFQxNDozMC0wNTowMCxXTixXTiw1ODUzLDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMTM6MzAtMDU6MDAsMjAyMC0xMC0wNFQxNDozMC0wNTowMCxXTixXTiw1ODUzLDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:2:2020-10-04',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1330'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '15:10',
            arrivalTime: '18:40',
            duration: '3h 30m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '4610/2786',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDE3OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTg6NDAtMDU6MDAsV04sV04sMjc4Niw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE3OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTg6NDAtMDU6MDAsV04sV04sMjc4Niw3M0giLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE3OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTg6NDAtMDU6MDAsV04sV04sMjc4Niw3M0giLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:14:2020-10-04',
              durationMinutes: 210,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1510'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '15:10',
            arrivalTime: '19:35',
            duration: '4h 25m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '4610/2790',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDE4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTk6MzUtMDU6MDAsV04sV04sMjc5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTk6MzUtMDU6MDAsV04sV04sMjc5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE4OjMwLTA1OjAwLDIwMjAtMTAtMDRUMTk6MzUtMDU6MDAsV04sV04sMjc5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:19:2020-10-04',
              durationMinutes: 265,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1510'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '15:10',
            arrivalTime: '20:05',
            duration: '4h 55m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '4610/9572',
            startingFromPrice: {
              amount: '640',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '325',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: null,
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                earnPoints: null,
                reasonIfUnavailable: 'Unavailable',
                _meta: {
                  productId: null,
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE5OjAwLTA1OjAwLDIwMjAtMTAtMDRUMjA6MDUtMDU6MDAsV04sV04sOTU3Miw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTU6MTAtMDU6MDAsMjAyMC0xMC0wNFQxNjoxMC0wNTowMCxXTixXTiw0NjEwLDczV3xLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE5OjAwLTA1OjAwLDIwMjAtMTAtMDRUMjA6MDUtMDU6MDAsV04sV04sOTU3Miw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:25:2020-10-04',
              durationMinutes: 295,
              numberOfStops: 1,
              startingFromAmount: 640,
              departureTime: '1510'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '16:00',
            arrivalTime: '17:05',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '3203',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMTY6MDAtMDU6MDAsMjAyMC0xMC0wNFQxNzowNS0wNTowMCxXTixXTiwzMjAzLDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMTY6MDAtMDU6MDAsMjAyMC0xMC0wNFQxNzowNS0wNTowMCxXTixXTiwzMjAzLDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMTY6MDAtMDU6MDAsMjAyMC0xMC0wNFQxNzowNS0wNTowMCxXTixXTiwzMjAzLDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:6:2020-10-04',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1600'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '16:25',
            arrivalTime: '21:10',
            duration: '4h 45m',
            stopDescription: '1 Stop, ABQ',
            stopDescriptionOnSelect: '1 Stop, Change planes ABQ',
            shortStopDescription: '1 Stop',
            stopCity: 'ABQ',
            flightNumbers: '5597/5328',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsQUJRLDIwMjAtMTAtMDRUMTY6MjUtMDU6MDAsMjAyMC0xMC0wNFQxNzoxNS0wNjowMCxXTixXTiw1NTk3LDczV3xWTEEwVjJILFYsQUJRLERBTCwyMDIwLTEwLTA0VDE4OjI1LTA2OjAwLDIwMjAtMTAtMDRUMjE6MTAtMDU6MDAsV04sV04sNTMyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsQUJRLDIwMjAtMTAtMDRUMTY6MjUtMDU6MDAsMjAyMC0xMC0wNFQxNzoxNS0wNjowMCxXTixXTiw1NTk3LDczV3xZTDZZLFksQUJRLERBTCwyMDIwLTEwLTA0VDE4OjI1LTA2OjAwLDIwMjAtMTAtMDRUMjE6MTAtMDU6MDAsV04sV04sNTMyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsQUJRLDIwMjAtMTAtMDRUMTY6MjUtMDU6MDAsMjAyMC0xMC0wNFQxNzoxNS0wNjowMCxXTixXTiw1NTk3LDczV3xLUDhLLEssQUJRLERBTCwyMDIwLTEwLTA0VDE4OjI1LTA2OjAwLDIwMjAtMTAtMDRUMjE6MTAtMDU6MDAsV04sV04sNTMyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:23:2020-10-04',
              durationMinutes: 285,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1625'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '17:45',
            arrivalTime: '18:50',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '3117',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo1MC0wNTowMCxXTixXTiwzMTE3LDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo1MC0wNTowMCxXTixXTiwzMTE3LDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo1MC0wNTowMCxXTixXTiwzMTE3LDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:7:2020-10-04',
              durationMinutes: 65,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '1745'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '17:45',
            arrivalTime: '20:35',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2997/2795',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDE5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMjA6MzUtMDU6MDAsV04sV04sMjc5NSw3M0giLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDE5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMjA6MzUtMDU6MDAsV04sV04sMjc5NSw3M0giLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDE5OjMwLTA1OjAwLDIwMjAtMTAtMDRUMjA6MzUtMDU6MDAsV04sV04sMjc5NSw3M0giLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:10:2020-10-04',
              durationMinutes: 170,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1745'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '17:45',
            arrivalTime: '20:45',
            duration: '3h 0m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2997/9689',
            startingFromPrice: {
              amount: '640',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
            reasonIfUnavailable: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            startingFromPriceDifference: {
              amount: '325',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                fareDescription: 'Wanna Get Away',
                limitedSeats: null,
                price: null,
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                earnPoints: null,
                reasonIfUnavailable: 'Unavailable',
                _meta: {
                  productId: null,
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDIwOjAwLTA1OjAwLDIwMjAtMTAtMDRUMjA6NDUtMDU6MDAsV04sV04sOTY4OSw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDIwOjAwLTA1OjAwLDIwMjAtMTAtMDRUMjA6NDUtMDU6MDAsV04sV04sOTY4OSw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:11:2020-10-04',
              durationMinutes: 180,
              numberOfStops: 1,
              startingFromAmount: 640,
              departureTime: '1745'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '17:45',
            arrivalTime: '21:35',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '2997/54',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDIwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjE6MzUtMDU6MDAsV04sV04sNTQsNzNXIiwicXVvdGVkUHJpY2UiOiIwLjAwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDIwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjE6MzUtMDU6MDAsV04sV04sNTQsNzNXIiwicXVvdGVkUHJpY2UiOiIzMjUuMDAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMTc6NDUtMDU6MDAsMjAyMC0xMC0wNFQxODo0NS0wNTowMCxXTixXTiwyOTk3LDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDIwOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjE6MzUtMDU6MDAsV04sV04sNTQsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTMuMDAiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:16:2020-10-04',
              durationMinutes: 230,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1745'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '18:10',
            arrivalTime: '22:50',
            duration: '4h 40m',
            stopDescription: '1 Stop, MCI',
            stopDescriptionOnSelect: '1 Stop, Change planes MCI',
            shortStopDescription: '1 Stop',
            stopCity: 'MCI',
            flightNumbers: '2926/4490',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsTUNJLDIwMjAtMTAtMDRUMTg6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMDowMC0wNTowMCxXTixXTiwyOTI2LDczV3xWTEEwVjJILFYsTUNJLERBTCwyMDIwLTEwLTA0VDIxOjI1LTA1OjAwLDIwMjAtMTAtMDRUMjI6NTAtMDU6MDAsV04sV04sNDQ5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsTUNJLDIwMjAtMTAtMDRUMTg6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMDowMC0wNTowMCxXTixXTiwyOTI2LDczV3xZTDZZLFksTUNJLERBTCwyMDIwLTEwLTA0VDIxOjI1LTA1OjAwLDIwMjAtMTAtMDRUMjI6NTAtMDU6MDAsV04sV04sNDQ5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsTUNJLDIwMjAtMTAtMDRUMTg6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMDowMC0wNTowMCxXTixXTiwyOTI2LDczV3xLUDhLLEssTUNJLERBTCwyMDIwLTEwLTA0VDIxOjI1LTA1OjAwLDIwMjAtMTAtMDRUMjI6NTAtMDU6MDAsV04sV04sNDQ5MCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:22:2020-10-04',
              durationMinutes: 280,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '1810'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '20:05',
            arrivalTime: '23:30',
            duration: '3h 25m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            shortStopDescription: '1 Stop',
            stopCity: 'HOU',
            flightNumbers: '5471/3807',
            startingFromPrice: {
              amount: '315',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '315',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixBVVMsSE9VLDIwMjAtMTAtMDRUMjA6MDUtMDU6MDAsMjAyMC0xMC0wNFQyMTowMC0wNTowMCxXTixXTiw1NDcxLDczSHxWTEEwVjJILFYsSE9VLERBTCwyMDIwLTEwLTA0VDIyOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjM6MzAtMDU6MDAsV04sV04sMzgwNyw3M1ciLCJxdW90ZWRQcmljZSI6IjAuMDAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '640',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '325',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,250 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxBVVMsSE9VLDIwMjAtMTAtMDRUMjA6MDUtMDU6MDAsMjAyMC0xMC0wNFQyMTowMC0wNTowMCxXTixXTiw1NDcxLDczSHxZTDZZLFksSE9VLERBTCwyMDIwLTEwLTA0VDIyOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjM6MzAtMDU6MDAsV04sV04sMzgwNyw3M1ciLCJxdW90ZWRQcmljZSI6IjMyNS4wMCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '668',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '353',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,836 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxBVVMsSE9VLDIwMjAtMTAtMDRUMjA6MDUtMDU6MDAsMjAyMC0xMC0wNFQyMTowMC0wNTowMCxXTixXTiw1NDcxLDczSHxLUDhLLEssSE9VLERBTCwyMDIwLTEwLTA0VDIyOjMwLTA1OjAwLDIwMjAtMTAtMDRUMjM6MzAtMDU6MDAsV04sV04sMzgwNyw3M1ciLCJxdW90ZWRQcmljZSI6IjM1My4wMCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:13:2020-10-04',
              durationMinutes: 205,
              numberOfStops: 1,
              startingFromAmount: 315,
              departureTime: '2005'
            },
            isNextDayArrival: false,
            hasLowestFare: false
          },
          {
            departureTime: '20:10',
            arrivalTime: '21:10',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '3321',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMjA6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMToxMC0wNTowMCxXTixXTiwzMzIxLDczSCIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMjA6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMToxMC0wNTowMCxXTixXTiwzMzIxLDczSCIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMjA6MTAtMDU6MDAsMjAyMC0xMC0wNFQyMToxMC0wNTowMCxXTixXTiwzMzIxLDczSCIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:3:2020-10-04',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '2010'
            },
            isNextDayArrival: false,
            hasLowestFare: true
          },
          {
            departureTime: '21:55',
            arrivalTime: '22:55',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '4303',
            startingFromPrice: {
              amount: '311',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            startingFromPricePointTax: null,
            dynamicWaiver: null,
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
                  amount: '311',
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
                earnPoints: 'Earn 1,800 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixBVVMsREFMLDIwMjAtMTAtMDRUMjE6NTUtMDU6MDAsMjAyMC0xMC0wNFQyMjo1NS0wNTowMCxXTixXTiw0MzAzLDczVyIsInF1b3RlZFByaWNlIjoiLTQuNTAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                  ...fareProductOptions.fare1
                },
                hasLowestFare: true
              },
              {
                fareDescription: 'Anytime',
                limitedSeats: null,
                price: {
                  amount: '611',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '296',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 6,000 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNkwsWSxBVVMsREFMLDIwMjAtMTAtMDRUMjE6NTUtMDU6MDAsMjAyMC0xMC0wNFQyMjo1NS0wNTowMCxXTixXTiw0MzAzLDczVyIsInF1b3RlZFByaWNlIjoiMjk1LjUwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare2
                },
                hasLowestFare: false
              },
              {
                fareDescription: 'Business Select',
                limitedSeats: null,
                price: {
                  amount: '639',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                discountedPrice: null,
                pricePointTax: null,
                discountedPricePointTax: null,
                priceDifference: {
                  amount: '324',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                earnPoints: 'Earn 7,536 pts',
                reasonIfUnavailable: null,
                _meta: {
                  productId:
                    'eyJwcm9kdWN0SWQiOiJCVVN8QURUfExQOEwsTCxBVVMsREFMLDIwMjAtMTAtMDRUMjE6NTUtMDU6MDAsMjAyMC0xMC0wNFQyMjo1NS0wNTowMCxXTixXTiw0MzAzLDczVyIsInF1b3RlZFByaWNlIjoiMzIzLjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                  ...fareProductOptions.fare3
                },
                hasLowestFare: false
              }
            ],
            _meta: {
              cardId: 'AUS:DAL:4:2020-10-04',
              durationMinutes: 60,
              numberOfStops: 0,
              startingFromAmount: 311,
              departureTime: '2155'
            },
            isNextDayArrival: false,
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
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..WzVo518yJ4sYEgPhP17xhA.D0uMRCgyn1zdZD0Vl-OypV6UceaMAxTA0MSg9IFMwyv0SPb5WtwoMiMGu81LveroqUgtm81JbgdjuQ8TF7Ix4UIpnVqD45yGfxfU3zn3fmxxSGGpq9CLK8fgVhnwnmlYQCdfXePzMuO0wixTmMa-zXCfIaS6Jpwf2H0n9s5axD43Lt1xjJmZP_VJK1r61qxG2VYLRoHHfZt5rGlbThYvgxLExvBN0hg9MLy7uaV2zwfLzUGbaV2VzF6PAsFAR-jlPJKTlk5OuMXua31hKomQ2AQBMZ57bw12hy2UiVDbPj2RcHCsSnubdnQNcUgnPdSdtEYIU6AfFtv-1gcS461Gghq15X4QDrWuX0h0o3WFUpyOGEk5uT6DLMgBapTdlQ-6Zr5oVeDeGlGgXquVaPs7aaU1vyJiOd6QBvym471gG2Xl41Kck2mU78IxIUoZY3sKKO25AgQDqZybujehSPoEs_8D1bvUVGHUTCyo9r0wACTmylZzNXdeAzK-LxJpxn9VUiYJDiy6bgREpwRO7xjHf14iHQbEA6ZAsVYpLZyG2T-cH6lrarWPZOY3nKFYemCK0jm0CETb1Mj1Ck8bGyjasOHCBL4NxXHWmqlVhqwGrYtqJt2H2kwXKIWDcpkJIsKR1anLwlVZ6pIMz7c8S5aadpuuxi9O8iKrBF3gh7WmsgSg7GHuPJv1CqWMz8lLpYmkdVqVuMUa6umaroKTwUfmvmgl7leOb1J9elHSxLuuNfXaWm5LNsjQ_dJggSGtHza0hLbNH6BXEilV-SM7e7qTpXiKI30rckGtzOvMF1lHcakVJQ1DJKFq3zkTkVZU-oUJkeS_nSryXS4Ig0UshYdfAHKMfdn2WyKmLwJTACqkQxEVG7t7-PrMRT6eAg__Bps47m6FJAx4QUKiNnExHbYlRGKbTNipBN4QSWvNv-Zb-Oq-iK_UJkaBonmFPpKKFDSQHFCqZtKJM75cDd2gO3X99t3OQfUWKNrcJ_HAhNKdbu2aSnQCjRWoHQ98OmXbhozSsEgNNEBSOmG8O1hecouU1VROdDtQVE1fnYCdX_35iEqsKhAfjhag-bMOWaUGNw2E5ahHoN54Slg0_z1T-7Thxig6NxG-e4mHQEpXFET8CloKjf6-EIDKdNOSPjJANi-p1MaPmPwNVSNpq9cdRz_6hmmOTyOq74vDkCpvtxlJDjAbLubQJ1n4jb_bAs24UTvpbtXCf1IojmN5Rq6SJMhx31FHk77Ps-EdewuHhIAX8uHS25oTh3jzSv3fxANX0_PhbKXWW7HdoEPPvMaA6v9gbKjU1TLPvUUFdl49FwB-lTARSdJEZkg5Dj61T2NO_3nz5IQ4NEiaOOyPcioryjOmtSfIjmf2XjO05YkDnyKzLqcbDVxRDuzNXE0yEiOG59WVsTmvOiWrtjJbPQ7_aE2B5tSueXMiCxuhUkSAyl0EOIb6LPJjcc9VlprfKC0R16PsRimTgf60hY7wcWiqIk2J_s4Ig6vM8OlvRdapHydV6l36qRCk1cg0FYdvQ25KHskhlFheA6HkKhgY1tuJmIL0N6AhpQcFaEmxG64Vw7c79Ym4q8jehLxc-3haEZI_DElk9XAE3elPh69Zzb9sYBoUjTauvRMNQ-OQF55L7d9XVEN4pvWjkS6M5nwDsjkVBW6-POHrUKy6OnREHGHwCCu-KTD1hU-JtRrD7cCRxSWjk7MxmsFY5n0WgU8kdILdzpLnw-ZQRpVvh_1WFlsvA8FNTR5RJAXhAOnBeaejvkJUB-gG4JhMDgG_WLLp9XKGwsjt648mE7Acn70i032CWbEEPFva7mlB6zNIelK0JXFSn_0BVH3dXl7yVqyAYU9F9g9wld9lRzG50eVylW5evbfNTz01k_Yij7P3-xc2TmlR7Wi2Lrlq6As0HJDjtzdI9ZPBcyKXal_33Shtgi9zpFWrBJQ_9dNN6qaNm9QgG8GFzI81s3UHHnA5rDjLzkhOGCcrPf3k-gxqzH4v51p0M9mI4CNUbZNRp9PoXsiV1OE33qtZsJGr-YnySx8T8dnkKojYxJUUBMgdrDTtrhl3JHtgt3712IAK25FL6Bx0rh0pZLV5naOplkSNopwvE-Uxtw0lazlc-Am7_JQkkhBvRGKAjljBR1hehgacGGmJPdSuAd5sJpW4021LcptMFscI3kye8ERNDfGV4JUzV2xpddZa9IzY1MufffHZ9IKmWCLbxzXcnjdFjDc--_uri7ecUol7l1BJwwS_pbXiZAv1hiNnFHV70Rv2u5703zX7oz4w3pq3soRQOqSKJn_eUKLd_n5FdQzLyjeYMiuWr-Za7ku254CXJ4TpLwrQ1YMF44ASnzTrHeBhwImc5MIr2i0SApBmYJUQfkQpRQYm8e98dtKiSsTWuQ-SKZPnJ_CLlqy6bH6JETXdSCTJD3Wbu7uzyo71pqYo7Y_8J1r-VdtBg8Qk9OVfCAwXITj9EQbu6tCoCwPUa2wVdYHQbAA-sVNAbMAo1VO_hwNWEl1_OLq8R_96RiKow5PAadqjt7U5MRnR7yr5XyVqGU4-2EBkWqKWM-CR45_kSl_Yn5WmL3ST1vUNdjDTLto5AXfyB0QoNPfaFb7pEEeJHgZGr7sNHI9F5jhMjK5xtXeFfX4PFaZy8Xuew0nSRf4cIHNvFGUNgmUl25a3Jh3Ub9PQL6oj9fXTaRZmO1jsbDLbc9StMB4TmZQ-0nn3_E4ZWiWxDHQU_dXGtsknIOARvXQM4yopHvX8vV0dR8-LPaPuuihnKSFEwKr72ue4z0YPKllvD4NlQEJ5ErVXAbucPn8z2-qai24u8NOGsHhHu_g_Gru49ym2To2JLlqyjgrUZ1iEGYjKFXaziFNcfNywe9nduN0mD_DvAjktWf4j_LgpbCF18tlJEYNC8aClsIH63RZl5ryAB9ZOHZZzFNnTv-jbw6pT0_emo5lgM8OeyqoOM1mPzMnD8CDHJTrsg8tS2juIIm7-sgxfI1-EB0bPUbnY3NSVhcwC0Lz6SixoiumYcmF122PSjx6YlblG2BObyzEE-ua92bezAON-q4BP9PZHa3r6y2FNNP34RckEFjitmsuFIQ4AQ0nNEjjBlY0jvE3vBLGWMncn7HNo0K4vVSwKHdmYipQ8bctiiI0G9Oa-xkxudm_YBo1YlEW9lYSzm-Lf6_h56zd68p9gUsdKG4l6D0VwHv0-WS-UMLJZnCUJSxzo8aM3THhCTB1lNtpMCPvnG0-aQ5NV9NmhcvU8BHd3Dyf9NCwmWCqyuAxnF5UvmNNwkajjsuPT6w.2dzQ8-8OXHlLIfsEnsvhkw',
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..g5ZiwELjzv1cI1DaTVgzBw.TPe8WWdc7eQopDqUHAnKij3cBJJ3-nfdwcjNCT_ShH0rV-qq6WjnEBEIr1j3FIXy3ryuZUS5wHrTdkO772LDoaFK0CP4sHZiGadRo6zhJImKrlwpMszRyQWVJMJxRcFo_WTpuyFTWTU27ccxfiq2wxsz1hQh3GxYgR-rdCvChcGnmm4aYxVTntxb1-_x5Vy3Qn0JwGIyc2aXezNriCkNjOdazfq_r5AIPeQ-gbNo2NGkIIIL13Puo6ShqpS1wmP63Yyl9M2rYa347QGCXqed0KT-HUh6-daoAFlxIJ-OykWSLTTniGYpDhxfyGabUVs8evRsx5K6OaWhU_LF9LZzo9bT3Fo3Ra8jzNgwrnhv2a4JI1Wuu6Osbw8LeA1MTWPfk3poIGhonhqNiFHohqosMIszmPYIcocabJXOOd_aftxu6uEhT2nB0QdhXw9dE-pRmUVdQnlXEpPxUxMvm5a8SGxT55EnKB8Zit8gYODBlycdQxKExlnDx4xxQykR4WGe34PqLeWJ2CSs5nT90hVTisp-yyiqMg3goRpJPMO3vbFIRJkXw4GT5noYilRfpojTvvOe8JHWyXwtZxMckvt-V3JfP20mal0UwiBKcqgJs-pk58SlH0tsPMyu_O570AnWQ-ox3uU3uV2iWXGerozb-8ciIlcg8H4N6j3KbTOMhdBASmiEndmHdwv7oAGBeXjo4qbrWQxH6-bg-E08UPp2ufMObVAHUkinoMp7ZLL3RinsloUXQrDJmTq9-RhgfBVleHGzk9l6-wUPWziwHCsLA08jCnnRgBihbsRDSMCd_FKUS12b6cG4l5XG2dS82ml3E6YbqWQ_tfWN3i_diphuHRIupmGrfRsdeR-QWA1-EzYYlLkd_KARrZtIj_rbm9frsJscq3o9PemS8HQ-KT3kbOyWWkr2UEtxAigkNKpmPqpPB3056JX8zG-1YXVghJ8AO9OCft6RbbXhD9rtnh3LncAuVDcG6RVwOrcaLzgJqV0oxXo2JyBQ8ss4-_57ibCqSVlC3qLRfcTEQboF2zEcd_GVj3hbkwXCrvQRk8hsa1H-Q4ljjurdrZRiHhjfLWLABEi2k_-ufmllx9mepxJ2dEF8f-Uxv5180AWI53U4Xj4mrT0vsOoq2ejH5_HNjKlnc8NnWOfVF5i4Zd9pSYoFHnEvnPiOuCNwbGUxGKUiKTPlBDuHASUoObT5t95anUNzrXXXt-ygndOKXt4SLp2lEQmD6yiz-4hSVW16fhg4nTVMC75-1atDSKxlvjgpgtUdpGFX-n6BDapQ6_E1gwoQmuvK12tuTXrgv_cNYPcbzKqP3DxNqDZzWRJuCWHBt6Y8jGRNf9YAj60spqAJwIj8nannAszpsFS0iiWPmwvsrsU9gocIpVOgkyaG5ThVxID7JbNYYq2dJV0ccpKGmj-QE1LXyxnmQWxdo2hxEfvKxBMKO7etur2OlwbBTWFHUawc1E4R0TtFLGeIlY8G8q8Ih9SSSs5DKt8WWSURds-wDIxiJ2k3_96aHlboMaYRFlSxoUW-Ci_b7yGABlg7RcIljFr-UCmThWINnMogyKsnWumarzqDNMc5xb4ZeG-wnJkJJSw70mjI3RulWdUFdZnoi1HpWiK-HfwpONvrwugqHRHtXZRnu_mcJUx5G9wt_FBSlP2MKYXPVtbaCWrqgKoJLDsKjpyRme220Y-BDjWFGWaQgOJFIFU7lnq9Kw1JCCPO3VtFFkMtW-ytUkoIIR0n2yOszy6QPFRsa_b_u_csE1m0EaKH2iduazTRKFKutx8LBl6wyTCEebbukZ8TPURLo8zCA-xZ5p2S9a13X9EQ7Gr96pVRUaI-ojjAbHrcOq20Ml7KzevxeMQ2mz32b6hqIdGix2AIzoYK0o6UuiLLkaisEsMJ5SntmnZfKoicHHVSWOMP6jwHdzah-ISpDWfqldf2b61t82My6_2GjIfjd5b5FhXo0E8sSKBV7QAl1LZfxCSFUP79rdxrSOpqRFcWqZ3HhepEaw_jaOH7GtEU-qI3FDBgFjSaoGRoExVlmMNlLmpASXRfZ-GrBPPbCGrNsIT-ex3wPFYnMUnkTdg8smpti9YKTI8-cD-DgBgU4LG-kDWRKTmMJRK7vwNf31nH2fsvqWCVCYeqGbwyarhGUYuiV2VDQAAR014mu77ky5xfJcXydIpmMVgmhGsE5Ayyn7cGzc0WRK4ED8Voq53dqLqSrxnXlx4m4A1pgV9Vj8mJJNLy43gf6vSfpI9-LdM_CiOzpOcvxovgrBGktlYiiIYazIkvSSvneC9451Ue2jyjRBl3noeQUBsQqdkNFD3uhJFC8f5FyKKH0HmBh_KsM8-Zcwku3-fjSmRszolaOVuplp0COM0pQ8-o_sqwNpMqgKUzUd-iBA-YzZmjPXruDxwKRbmBMUbnnVKGYsKmqQYtWZkurNMMvMumsPzydA5UMGSWvUK3tJLUCLrfUCIWDa9iKWYmOog-XvtkETefT5ixys57Y0K9b4epf9dhl2vC76PVpTXHueUKiP7S2XWQicIf5F1JkiKP37OmeUKBfY3s1vUYnaH5v5CZaRDu19hBX8mRG4AATPcvZDtpSa-JVQRZTxCzHY7_sZR4Z50P5rm-eZAkq8jAaOkyjW0EgPJGmh4Pew6DE4gnTL_TSmmrYUPUwC3qSfuXIEKvURTp-ySEWDgsv8zpKCzZLXpFVHbMiv5XCK72lvmgXrcEJcyYR3B_H6fyLRbaQ71287Wvc52cBtkcfBz-ogV4HWzo_z15iGicoI8bkl7pc_VR4Yr3Enhhk0XH-ZDkV8o7nMkKFL6BLhoviyyoJeyMCvWZrcg3Gh6RANzxQj6kjpAGoukdS5Az0jirx4LLeOvDnyCtAK36zmnUvA8ZYY6ItSad5GQcBz4zdeivXbR5VZktexo9apDHqSmeiJCISkiDNv9vOTs-nfEqGafwK5dwJV_SB1u2UmSvIwZInY6BlSjo5S-YNXcLYf00LsxPZ93-GuWJPcefygdqIHfQoZOBR-Of_0tg5b-D-W8DIYQlmyE_dG_Dye33SO30vR78RjUb3At48865wwC3qSH0kQP493VZYH2tC3-dscnjDEtWaFJM5k8ROMW3o7uY47Wz0-VaaGyk56bxX0HGoj5vJJJV6aEDI223tFCZsXbHztWHuhWtpKQLaUxWK83oVES1rTkl5blWyhCVgGLF3mwWBZK_pi7iy3wwWA4QYKq0s141UM1TBMhynPtUJ5pJJSA8PwdD6FC6PMCMweOGOKQvgvpJHiu7LfWwz6IISCiito0RJKrEPbPl-pxX4O81IsWHDWe-uEC55dl7ysd0_OnmrPZixS0EfhtUoYrFl_mBVY33oWWbnaRPnlqdtMbKiz3DUDAqojVVN71kpbSZRl2-dgoGuyHe7e1SxenXJml6uR3_KG6sG6L4spRbYhE3I76ze6wO3TT4i1hZWEH_VNuZb5M7zgfPqc5Nag.6tI2ZrVXDlITlE7pq70YmA'
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
