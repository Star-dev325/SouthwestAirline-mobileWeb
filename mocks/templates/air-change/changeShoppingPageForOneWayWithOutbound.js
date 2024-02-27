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
      inbound: null
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
      inboundPage: null
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
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..LM9ztMYJxqL1lcUmSjqJTw.b5xSVykbpyCdmTdDjTZOuWbYXMwRstcGc2eJ_3xtoDRXPouHNgv-PGvPlqJY2Rhg7DY9kCpizpBb1oifZSamyFAiNyQSsI0bH8lPgAMVx_ajiSGPNQVUmTCdL9v4WK5TbJ2394rACEjsP7kkBUUR_vrO761qEgBVvMoCRbHanFpzydoH5fYn3uoL_XBUhyBN6Ny6DhepEqwkm1fHgHVI15xaHHFleE7mdCDtq-rpOB76QkJjwgf9JWxS5OZfUPXMRoVsSo9qO0hUYXOix1PTToGzoKUKOTMDANJJEBWsSXI0yYSEimY9pcPtb3BcTaI-IGb5ftRZ3Zs4O200C-8CT1peKkgFIyBKj32rYIfhptG_HkCaGTA4UFv4dgCmJ4PgBZ4Nw83ucdS38U_6Hq6hNK9yvD975fOv4ll40grp1YKuOVMwkz6roBvLqC920T6DMoA5OwqsIyicWm9CP_mdhqgHZ0Xm6OBBDW7YDgWxj9BgkjQuAXCn05VxgrmhuFdowWM4gR8496W9ZnKmxOj7NjM-owy1P2dCz80B-FHAwTvVPUK7jRoTIVmL6JDR2jZJjuaCC24kcf5OSjbjjRazAHCDKeTPLPmUpkoByvZRCG9Vl8N4oH1ntUCT6BZxttHqZOxo01nw1QElIGUn-qORXCifnJkyNCb9EO-PRvbtnTE8fez4GAgXSHr2X3NOH-A--p7VqI20kpHp3tTUtJAHExuOykYA07k4bq86W4F3ubrK8qw5xaeUgbnVtwewR-9IMZP01yU6zBtupJ4AMkFHiwIHet1JUh6f7TB7jBB715An-9tKmvN-DDFasrzqP08paBAw5i42_RAOoy9s8nUaAkuk0r2tQEfM0CY5mDU03DoN8ZJF_9421mRoG9vL0i2grSoj6P68h_M030GQkgRKWxSXjmkwOqEDkxj6vpyOUBHHxzNaTMtNse-hwRFp8PHqB64OxNvr7wxOiShaeg40GcETSgTjY_8CjZ9C4AkOvWmJIf256HXYeNyM3e4SuKrz3yMXmzU5kOZ9zSyDB8Hx8wxgz8pQgQX5d9QEznOt4f1lRu9v6L9q2Bk1DGO0kZHdeJ5wHRFhspCmcXFL_ZHE_put6Y_6eOQvmqO12mHSMeTqgsXpdwFoB0uwW4M4Kug_v67pCS_BOCn2XWl_h3gtiNmsTOJVvyp0K_DxbXVpLjfHGi-UQmZXn1UHyO7NxeEREo9gHxiB5Ys5QGH3ScNjAqI4DPEMHVxSng-LfWfskV_bxtxWwGQW--FcCX8donAOMdk-RG2Qc3CwbV-uL8e27_NTXgkHdhTp4ztjEoIr8WYMPcpaK8QIg5HisEqKPAOJgiwCyU1DvEPHccKLREHzoTMmIhhVJjoeQJXUSsw9QehTXqEZtiuIFX7oMVoxXY2iXiEzVWFPWvPVTwh9UqGMTvEHuTiffSBl7_UpfHmGEyNHRFNMJ5-IBODr0Ejb36Xsw_ZstDMnWLysNFwPTc9bCaDdVwVu1-uRRCie_E0CAKQuHFjrLZix3Mxoh0BKXXrFRo-ifg0PRNyTJiksc6EfpDt4IQ3my5HkAFsdLu2znWAtvkOAegJGDOgAvlXWU-vF8hOhmWbcJcnvnS-7QxOgmfid2D1Kc_kWlESvoYbFT4ZToJwNmMovUFwI1GeRPnMHBTIN-gExTNE793K03GTLfvIdilZnQKsSX_mS6aePIehXudZvemGodfSGYnBKxPYUrRCql2hCL5pkNyhFGZRVCExwBhVQbTf8RDA9atH0CINNG2NESRjbe5om3ef5Gj6v7IQpCFYIaVbA9vRdBod_cKLWZY7g5nSatTh5-LhwgJ-j007cm0fYfLX3hoRsE-7-YarCB0GlMTAYZqY8qxv-GV7_cQnClTRxlmXio0l6SIyQ1EBpXenmC4qWZsIVu3ACvRtkHsVnW-WsT7T9zPg4JTnIDhnSVPs-0ygh7b_5swVWqOUukMfK2y_BGTRbCUDhHZqbzFWB_CXzE2BwXxEsX0TAuNetyuvcdc4FhkomOgXZWgaQZaHeW5Xpy7n8ASgC1FAJCRS6h_baQRSBNrCfPxgV4Hk5GPOma9PIfXhgplP4_hyEWQp-F4gCWwIwcYHHDS08yKzS0PCE0XRFTw71QG3Jh9lOFGsJJUL7XTtiM-uioJeM3tLIdqWCmL44lmpxNYGY-0tcYUgNYy4awSL-GLarPX3aU2yrM7EdU59YmqmqHa0vsoqbRr98E1jovGp53QsCFvJKMrAgvjT5baNcrm25ls8_lWeYJm6UCvaYEeWJLcfgyDsaRoXS7lEm-pJRIQFrjWciGYeaBNDgrX3XbzLUXq8gX-C2qs_qrxnIMIl3g7DWWzqO1Gi9MkV583dCWufmsHObJszSOc0w3GE5u3l4Q3gpD7xx0Cv4OR54V5LfAEh8hC4JAlXJ7CCkJdivPYux9JSz8wT0wtltNNlKXG3gNLJEWyOSGTpECj81kmZX5RLgoUlBke7Ct6GGxBZZtCrk68N7H4blg4emNMYmPi-4z7up-anTSOxG6lSy_sAnG-iEYB3j26DHUzbsIWKni_CmhVX9vFLXxLTq3douBuXQDIJpf94swAUjL1_8pPC0t7ueRx3JUEVdOZe_eIdZN62J8m-rFqom4WvNuCO5UiWOmqFdSMVNOWHwx7MjQJ-G5BqWSHhXAEYHZvnVHxuEWRPo1ph58_BB76NoQGdSDkm6vgKDbKtQ2pGy9EsSddnwZlkGrOG4WKoEKTmxOxrrItcdz4Lk8EVnVvo-rgsIg4NN8uOf3WcpYk_wKH_QwWwWoZZDjc6qgLKnu086gl5T5TzzOAj8AguF3H-n42pFfqFCcuguQC2lYqzLMbppbtbswYsj-eTA56V4s5iIqn7Cu6P1WWFD5IIMNDA-kYenDAC5Wn19ky0P4LiuCIUGqpjO89PACMo3WjXCI9SMys53iwEVbizdbU4IeYVZEdqCJfKSW-uSTdqU32DTSDrwGnFXpMBiMq6gfqOJ7V2GnPgyp2hwQAfIVcw52hrvFpAKct6H0K3kT_Rdfy-9F_ZfM3hDIfVJcC7WGz_i5eb47-8gT7udVw_UZ3LeAo9DoWZdp4hmX0-1L8WNWE_XHCHBhSwJ-Bci_V6wkQmXZmdYH-IimeedWCSvFPs6Gf1ED-UtypVUzX-JOUtAUJCuXUj_kv9gRUPoxgylW8vjvG6JMTnKpDXOE9JSHzhsjp6fN6Sob3nnlq__R4IJU03qj8s7KVVRmu-DgF4pT-8d3OoQScLslKUhHsYzY-bHGAe2otKN9w.7aUxeZLUKQDfuXV9SFo8zw',
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..j_zoL1wHa7VdKuTta6FeXQ.gsN3L7iCP3ff71gyikDEEZXwu44cxuvfVNh4xlQ433FAeStHBZ3W6qEsGARoRe1vatuOKGd75t0CpbLbK8resY2LHtWhaOYcL9kv-8zdBJ83Itv77b6iS5029WFsiYcnl6iP4yOV82TuyFaNMoXNi97bOxHtC1cG0mW9cWLJQK4rmmACEdFNCGX-Q8HahTN8GBK3yRv-6YXG_1NyqvTm_IE54Gkly2AG5acx5IHZ1ivgABDKqIulqYYm8fPnO2VY0eQwA2FXhgyOwQ0rJlNTRhIBlbBkKdS7Xd18EA55nDdPiTY-AmitnyKRrNJWKHVTTGXLFtJsxkZeLfOWuVJK6HM9vIkfUdX1gGNwrc7hgGPLthlY5wcvhc5UAQYf-idRUAfQu5wqsm0XFmQkRRu9vI-gZvBufJdl_YVxboP2r7YEnPQrEv-9OzLMVJ2thkLlmISNIXVqOFIMMrGa3aYf4BBR5XoUDo5ORwLJj1eE_Q_4ZT0bCt4CslSGMqX0dSiFW9ffgOYr_1B4cgLbHt3C0ldn8gsveYyKViUQMCpZRT3Q0Iff0edeKhQuzNGkzEpUNXQO6BVE5Iv-gfs9ASA41zGuMeSarsHrI7jEM2eH6acqDjLsK0kw5SkOHQp_StfnZkbWzPm0Ji2kdQ9INf-CWuWYxvTZzjNpwTeDylDQnzM-aorUFCRsDN_W1N-N21ETOMcGwYkxnqn5uoF7jnL2hOqO7DPVhYhHiuAKO27wwfSMCcHvLLwinMiZjv3h0sQNBzCCmHHfAoye6Gcfwm4TC7nwREl71OeXDBZ0c4SlgXR4BIS1jrDHeMuXBUqMMaFPpS3btUIgNB9q5S7bnSQr4tSkt7W_MsnHZbMyu82E9U3ez6N8116MOowc5t0wA3FU332j--jsYH-X9k9QCNv57Pxohn0G6lDQWzswMmHJgX7gK-ijhKAkAKZGxA6hnXpT-6uzijZDbL-mt8We5t6-d7chpRIAyADkbU4hj9EJcaIz96bg47DJLUnVjzAcJopCbR268n7YE9UNmy0qekvfqfTkVZ9MV8dAM7VYrmSuUdoyTKZBPKkkGcEBGMw8aorSXUDW7jpL_-_xeYNQa7IjkyBcopXTEO0Emsm1dPQJ4ofA4fy6HXoeEIcxp770Yprr2BoqHEF0X0M4aH-DtZ73dp1OgeQtjWekcV2_9u5A_Xg_3cTAq0fAdRSnv-KpvyKdp8O2bixYKDDCE4hdSi54jbLsqfItx4Vptha7n2TNvI31D3q5Jhb89QP4_QQsUOKF8-U6DMpWoGtSlWRJpS4mrxpZGYoUqW9722MVf-_XPo5SmOhgRw7NQMdGb5yE6PFT5ojjPtXb1jS6ZffD0pvlOKEACHcHQgTNQlz9WICSzgo2VU9dfX7yccxrU6GGs9Qm3snk7qTaFxNJSMX6rBQBPUKtmPx3RaOX95RHa2LDXF3NTVCjaY7KuGHEstx5rGUPtlT1gPjVDYVBIdm8YxZBiJYF-Qkzjm9kqwV9oD6bckMZqvQ4rzzjl5s8X0DIJcxlCzNPFRyjXoHhBRu4KE33ICiSE2dR4B1PCJkFVU3SxqwrwP81uA7xOGHE_6ZhZDtYnjzFi9JBfzIDZDcl90a3UxLOGVfkfXlmODZnyJl0dKCoiai8SFh7P3TGKG6bnMlzlj0VBvVe9Pq5oPFE6IzCHml-XzGLXjr399OwQbaHgxgsWXX3f5B8Cb6GAeyHKLVpnFhGzXDvq1smqXlklJhrbUIU9CgxQEMVON_sLCyxjHMBtJnzswYrSYUo366DgH8XfEO1zQxtUFD44E4xNIL2pcxAR24WSGRvi2O6m6zd7-B5F2QljEycuSnSgCZVhtztsRoK8tLhscO8XOj4pJBujTQdM_m_mjqbbqy46EhDzjNXXm3HezRCq1ciIxaQ_PRXB1GulLMfW867k3WhlbpbkDNuoKfSC8q_kyt-QYVFtNgaZq8gMIN9bmcoSn2ItQgiRcPoUxSpatjubZANuHFeE1Aw6m-RqgUdRJpnZxPfylDRU_tVZkIMYKWh39OSGx8QQVCeQkD9nn_Ey0OwrlLf5sLR7NeWA8eFNTS4FYdHHBH8jRcvc7fzOMn-59vXX8AR49pJ_XodiICdAQsrTXr8D63xnV-AnF3FjxrRnTTzKnqfmG12UGMCqGhH5MQDkqbnhpCvExfvpBOSjoKmz24HB_e8oIzsjwTRM9mZRVVOIvJgVxw85-pyU5ZxMpOoMxg7qB_VXrflIp34XqqaCUaAvCSauLzuqTD3xXnpwV_ASumWwqW2yeA3zmJ6_nbFlnPeHkjib-Qo73iYVtf8EYT6-L6bQ5gUL3INGVuZzm2YUjFmVL-6_bMKFq2gSMMLtgfrBY0wHMepOnLsBhiQbxTu0L7Hsw2v0apKTYIDbNGAFRuwShm-9CWBU_H6rUCVisn_6JV1u-gK5OT6xDV0HJTqoxbMbEWF3FcWt9oaWpOgV_3VK6aYurfvHo56TwEeWHSu9gMxiMIfbRTMjD0vckjV2GznaLRIomCw2gJwSlde12vuqspyyGzcSMyqgVQUQP7fqNrhdiTjc5ex6PCbowBA8ra9ZQU2u0lsPl1qCXf_ewq-cDjs_zTcHNnB73WraxGQz3nuDWcV2xJ9YK2wh45qmo6xuOzbQYaLQc7myiMgrpB8tvlzd3YEXleSMNEU6JIud_BcMFkUN0dHOXy0NYsGXdHcW0c55v_kext40gVnY0Vi1b4zUl3cxgXRy8O4HL85cuaHkfKpJUK2pIkkrkIOSLM0CPcPGyQELIXLN8tbYOM1I4iEj2zFv4NDb7dpjP2ziJTAq972IExHBhUzir2KdRBw_kozDloZ6ISpy8FCovVn1F2vFHs79sItv4RmyFCAJwYzztRQcha_6QxrqMFW8_A71HQLm1edp6VQUIuOB2-tE1FJ5v8qiqouwQemyVZPVfiIG0LUKxH4vJADlfHDbx5KCvJ1jSnNqperMzRzQsrVP2nw53teR3-a9la3nLvTs19pp7K4JcPKt-z3HWHhVvb7m-wLRFKx9dyF6u3XU773PHk9UpQLIyPTYclb14svpCGtJezhYNsJfOX3viWBJNs3ZolpnMvNtYVxhXzo7gCDGW_hybYL35xBAuW41ypTlyzYxJosb6KSDATyO8MVWvlA0FA6mr8nfBiHHPtwSIxbCbWRyFirPEQOwXEAN7ziJUdp7edh_-Vyc1cxTT2lEjOQcSRHBo3JKRtwPk0ldXrYP2xgqhH9nVYDFeSU3rFDejC6attgBJ5MlK9UjU9vn2-D6_EQnmscbYtRQJztlWg9WbFNGkbv6BL884HjoYK4AHwbeDjqKi__vXzb1PkRadoDP7DJLMFKPogGxH7vo6FlK7JTbH3qxC0FCJJAL5Bx0AbQC8XIKvu9o7V-Y6ZyqzBXEBrzphP-yTmNTdNhUZ53TiD6bRfNpJyjNMLOZkFTKvosAS96dv8MHA4YDsefBA.LLL-KdoGWLapuIxwocvWgg'
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
