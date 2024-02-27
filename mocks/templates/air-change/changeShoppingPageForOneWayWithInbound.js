const productDefinitions = require('mocks/templates/productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = {
  changeShoppingPage: {
    productDefinitions,
    messages: [],
    showSgaMessage: false,
    currentReservation: {
      outbound: null,
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
      outboundPage: null,
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
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..dzdatc8wboCE2yB8wr7AFA.Qpkuqsf_VDDEUJ3eFsqKKfhFt7k5Qkp43kIC6geiPD-olQzDa1LAG0dXegq722raKpi5foFWigrBXtBlxqYka-lLIP9v0WYpkQ2hBdlzTfFRMGBrjSwsJ03i9_KeYMqVfmXCEOw0ZImsm7Jky3cAY4nDXbhdcq6Y9PfwC_OWCppu_CMK3ILjZjVzUbiFTwSeUIlR251OOaLXbvrhocH8wJ0vq0sTdpaQWRXvwcJ_NVoBh9Ou5hl-T-uWWrrsOgqRBUaMREV_T_hc3HTG4s9YGPLWMZ24p7SuzHDxI7W87TRTxMdB7L6ekT3Ax-n7tQDSk6yHFOCaqKf9Q4_Q12HzRHnsFvuZnFIm78qZIaBXIaQoHYMZHPc4l56jG4SVtRfgjA4BsmQYnCwukNH4mgq_QbtIzG4nBL9YQag0eUadj1wwzrYh6j5f1ElgzSvKl3aP5di8F-ihnUteK-3mcSMXtFCmnBKZbbuz0brWi3RJbrKJRpUHK2tRAi5geQwjSH-224iQsmbNpEHLeITHG12xI7gbpI6qvaGQ_A2H6jHlRp7BPgWlm5whk3jACDJyB0cglH2CrU4dDJWs3P_wGb_JqLe7ZPBpWiOH3yB9UCZeUZZD-Ymqcc4BGo7xNkjeOVxfKnFSf7ouDFw_GSlSjjQ1Et6m7j4iHGEfgYlof7g73-Q0XQ3H52humQxZ10bpU7WiO_vo3Q8HuYe3wSnL2OQ0QZsBGCwWAmPp09Rj-VGmFRahgypuTAKcpepfIl6OdPOsezsq231cqNvhhqPkCreB1pL5OlYmd4CmgDblgLDYaRyGu9wcMRuddp8NI5mM9D0LkQewAdGSCbxdO8RvXzGF8Ol1D6AKEyWGEpSpodFdxkBjr9TdcTtk3C62t31l_q_BGGp0saPfAZYSydiEyt_jy-Szwd3tT9I59afpBFKIIxNoJN7CBbFPdpviYo04UGB48znJRAO01Bmti0kXHgDXJsvs1_5R6rsUmILrFsMKgAiZwbgYNRF3EerwIVocBV6_prCNB6d-u9JSUzi_7Bd7RPlIWC1oC4s623ugBi83E_UR32ecDgp7BQDl7i85AX_kVPFmvDVqyEiLvY-kMLY7VHXF049HbCQ2BJfZBZ03INHlv43YbWoBliHcKKWxQJEnILtujXopfjTyQ91oVmpQbx5BsYlRFzRD7PFzHSuYm8MT5Y80Op9CpLxIrHhypL55GbeXYFro6kc7YfoB-TdDA24mLV4rR_yF78LJiG7UoJ3hfGDBBX8KmG9AxIg0AkWtcT-D_KEJpBxm3q2c0xXvAsZR-Wm2JOhKfrr3HS9SUF18f8wyVIP9QwCr7sv3Eq8bbee3PWOaJUVhCZr8BxMsyYTBsvLtpYFYYbu9bQ19biu_QJzW361nLYiZH9uSebhqO3RJ3KOxN3itOzID4vXv73eow89k3ggo_SH2ZloofYKI6LKryLNG-cg6bVFCagE83wDhToId8UtzyDcpGd7tJGTFDV1Euy7BdTNXSnIs9Pb8z4Ds42YtC1Qbsn-Ny4oBZIWLCS-P6ZU6RsAoTvxrARdAnuH2mgJDLmTpovsjNkrUPfaad0KAEsUUtWqgEIblRQ8tld_r2ijn578HzpRVrsDAj40NseYG8238FXjxARxPt0VO9cASZOedBZjBw50C9srkYbmzJxwJr4fmKG_WC0EweZR7lku7t6nVxGVAeNCSImqYOk-pxN_g_HaTZ63OgY7rJPeh0IZg6cWsbyY96MVvYzR0oaAuH-aODLNi-Cwm8gYbcVAxNmwM4QNXZofXQRFb2pZIa5fVeJteG3PK_cZWSeY6SbZShYtTHk1ao5Ywn1vFMRWdBhmuMQl1gz5rzNxTnvWpZkYCuqTyFpI-0QD_Dj2dyzb0B2RWw0kKsCsk4yIqKcuYUMumuNcnzr_WhU7FsKaDmEa_czU12ea4Jzd2G0VfeCwxK8ciROizFHqDzABNucu3D6XpQNf8MdHzqq48AKFMI1o13yq5vwWPeo4H6U8l3qoCQwkU5vUsECk_WKqJZqt0ewWxC_eajDjcpPaYICMVpM_DYxb4qQwHCe_pcncvAp8XWv41m6MLZodWPGQmLDR01zlpVjOLXxzWUjIv6I2TE3Q_h75jXr6g-erg0kp8F3q3wZlOHZsid4TaojJyJA296i54_H-wNNBMNU_h4aBa4IZiT3B-mLer1CXfFd_I7bL9X9wsSfr08mmd2im8LDoRDm8GtWeepWJZdCBwAlLZgLxrx0XNerZvmEEzRABwaNotwMxG7VJyrdJ8X0TBIpcm20GtrniMt1DJtfZrDamSZTXAq_SqwfkpySuLaoJVb00XCwSEx0cEs8qMsip-mRXSXvRY-V5-nycIQDqgb8-FZq9yqsaBXuB3E8U6LJQr2SWwJRB7yxcQCZPa8tRZkoJ0VeOxiNwvtoXKVLsl61XgbnVp8FVXqWn70g_ZmOWeaR9RyjouNmIOLDx6javzqz3fZ1Ni_89s5pEBh_JKfjogTWH0vKbvmy17YdYNmZG5qpdR4IX-ImRnDGQLXRpY9rr04MfMnbkaHlRzp4zOBkVkbNQE2OvTqQ1p5Dxl1fX3IoPtqfGFGZwMa04dY2cVC5rZ9v0l8t42W4pDY1deM9V4suQazQf3dIpt425EWufkgWcRD5xW8-MWv5YxqfPn3g1dlO5VPT6VbpjM7wQSa-Bsh_EnXZ75LvjAsF8HQvxKhl7eYMmNPuZWXTLsxTAhDoffyWblmZ5MqeRIz0sKPhZDzcxpQb2DM4FNufNTj6vuc510jsW44fZCxJVFA39zlydk0K49-8rMevQqeVG_UO-_aJqA_l9ocsqPL-TZuoFULs1ZP1GZ6pVWBdQBUzlv_ASB-vM_USUzy8DQPJET885F5YK6C9GDYUQuCt6rPbchOJnm2GyvkgMvF0tlTk1wn_NdlNFo9HGrLLEH3LXraGkUprJWlH-c7DjH0htu_2DQCQdtyVDhuXxpF4oRK0FPDewgJDZisHo-_1l6BzUicQGQR-MjvRiZCBL9bI4Po56aCImFSmOGP4fv7v9L7V4Gdla3e3hEq3BMUPSEM9M8Gm2XPmrPK-Sxc-mKNbKCrWYPY6BJZxFI_KMwOSqOc5CL864MgxBfrk_cT1sNUnJpS2Hqj7P33fIyV_QWa1UeRCi2e9mbjhjoH_vhu0W1H0CRcfsloUvKyQFVvxqYFUSaZot3Bx8IaZrDbM61FvtNIBqWLDOY_b7sNMEk3_F46lIaeIcKTQHwPTR4hWsT09iqnToFM9sgje5xDsnegA.-gEw0mMhpR3ddPa6uHiV9A',
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..3yFhT1Z9LD_em0SaCYVS2g.oJDT6-lkP4-62vMmLzuhixKJTyoPrzXXcjsCr9oc688BMIsd6nUIqC1Y_A_9l3A8vhIdNVfc3G2Q2OZMhvPWFshRXmBeKcFruCKmmECj6io_VWgFKge5CAk1QoJHkIaZgKbq0fbPOEm-wEIYy_QMEpTCBh0sur1EKw5TFZ3Foz9hc426BrWjk5YiRQaRRkRE48d1jgkq60T6bDRKKJCYQgHp8wqG3_N1J3iB-Npi6jaHvIDAux0RaYIVjdwY8ZF2PLYtWYXpCjpViqUtraGYH5TfojIJdGrP4V7mgWFicmzrTD00QyxzwBEdQvIwe2iJDSwyOVPAaikxy0ZHbJlpPbi2B8YC2Vi96FDULs0iFHQaHANlrLpXy0xzJwi5J7knPSkyvPFyYHI_ofsk1Nbmzvxp_ZKQt_hgDlfaZ-f3vzRoFfaBQAPAP086abFsvgsP36NdUPJZoGHVioWzY_uFAUWtg3WuHKwlEPc9QD_hodRtplvNMxQZFTXWS95YaqF9TtKXQHFvDIEcpYD7fLHhntceoIz8lnF3JHwBpUupLMqXD725eRSApBHCdP1BXBK6_sflWWwZlhqp5TF61qCUNetgQDSHF4MRERra8T9I0Kn0GDqWN-8iiXlmWay7QrSdtv13qs24oQxX6ca5cQdXTYTiYApaosvfvJ7j0DrMqGXgrXKDE5Usm-IR2vu-moA327ZSfq_tHPJ66B2IjETSI7KXtyeaGn1s6evONtWdfg4ekYGYVBogQbi13XK6erfTalw1P_S3L15D_MTEw4V-Jj9nG00P64-QKTUFglYYRS7DZVHeD5xIet-Vyab4zP3dZHvikOl-O2PFXJEkPnSgU0N5ff-Bv8L4ecqk7OFTlb2dOIfSQIsBP2lvI6hUZqUBqGbGXZ7muL37j3qy_BnyuEqqzJhNEktseKyZ_gHmIqx2pVh96uAch01ifrxTL2PHL1G9EKCm4fQHh1AJTOacVcjOT1udOaxgH0eD3qH7pW_LvLqtKhPUBUimzWhOszgJleu-UZ8pYxjyVMQirtAiWlIBjYZf0BH_Rjv-oPcuY9N3uHhTKAU3xKl0y11gBrs_axcuuKC2nRnGDX0NyURMMuBggQe2z2GiWk4IJD26GrUiIIDweE2DFelXeD_C6LMeQB-3S39Y8exj51MniqQNXkqKGNNsBCZ0G3ut-wM37S9MrMZt8BPIb-4QKCaJ3XITBV2nBtzsCCFpqwFeblZ8_v2E6Q-6skrO8OZPnhFdM5AXWX0AmVbobN9ErSd_v-fpxYqeKNQ5LOQj2Xq6Q-LY1EqmkdNGe5jTjYKIIlCLK_xikMnSLWl15aqlbH9Mj2m9giNXK4khdkGK6RLWIrEWk3TlV_P-rAqxh3ZAnVnxmQ8k1vmGHoY18OicUFiuZHyER8K25mSb_BcQEbCwa_lVbipGr4auQcboDsGK7XMpRyD_F41a2aVvKqb3mJSDDbnNoaaaPRw4p5412FghJ-b5NdNUCPdrXBV4Uqp-W8fkCI1hWDUtCGgjsCbhBVa1yrFgBwNS1yV45JvHREehjGc7OcHodd-oEVj4SfJhpCeQSADXmtgxUinkRBBIccfVFVxb_27sIcTQB9Z-tPNU7Ys0nsnec0HLJNwksFA26FcVJHmd4bYFOW03TvyPJtRSlwWa_8VvYustIhdjmHpvvK1BMVM1uj1wYduFipWll2SRjc62i9f56yTSAM5Uh50PNNjWGCaZ3NkXouxaimFPgSdwg5XTJrEGPtEPC4MqMWUfY_h4Y-O2TKLkCHB20tiVIpgACU7YlajOqU4qUCv6dmfyL1Je4Y3irVCR7zVuBZ-e6Gv9IvOhMVZ-D849SKeJ_xrG5IvKOgj8cG2punoWxYFQa5tHBIFJGxtIhBoYTOg6-3Ha6-O2PvL8DGSYPAb675JCOQbqE2OiscQBYAKJZjEDt5uVJdhD9KS-oV9FVLLhV3LO58EJzkJ_exez20dPwTjPF2uaEIH0cuuC1zd_L4mClhxBp-buCowqJReOV_afo4ndki5lGF1KOQU8sHRl3ITFHs9AtZ7q4gNq7u5pJhDRCq1zPFoLPoPjch5TfG8zgS6oNVnBvv_TCPzwVWW5hldUhp6GaarPsz0ESfKwAEu2BvLykM6t02wrM3CvAUlCqDQWkPwtn64kEvk8fM-FTvzkQzGGLk06lmtgcmZ8U_82sWOP78tqEx5RCvohLbCvIq8xo1puKZso9eDJxSe9EQkLO_Cp44p7Gj_z7Mu5-H4JUVodBaY9C4Y7uGOphCKqnwVk-xBRQgg4tnNyQdWLq2J7tpzWfP-1xRBzOH1z_3itcJmLXH0d-vogWoj9oNJM8Vd5D14rXWOWx05qFU2Hpz9pVkXbjYkEg-1556nsVGgMn2Azql8SH5VVy5J8MmGcE23YTX-tDF1VYF1NcbO-lOV7JK3kJCVcs7Xks0Kv1BGU-B9fta1gwQBXwFFI4Ocru7_4J9toKWIQuyitUkahQ5EjQZvubIKgauENmT-AvsU2-nIC9-A2sEtqa0LkL2e1WW2rmSlmxMDBuH7EJUJvD_cEI4L1qrmHIVIrlJy2uGuqdTLHE-D8jJpeY1vNzxg7uwzFCA4ftC6t-fSsIo-jlnmXpDIWnuvRPkVLkj4sdvSv4s0njZTNOvctTvPwuRQ4CPaP53gnJ_pxSGUaa44i-bwxA5KUhOGSX51Zk6lwbssKTuoAe7aQoibyarAPDcrQMMdb_EZoYjDRWqTB-Nju9og-svqgFsC4D2p-bgSOOLHdvEoOLVriIjw7eJyM4XuekVlGGF425Fyaizpa1wP6cHGiicGZUEy8d_A7StbMfbHpiVOIDhH9bVJ4Pr90kt17dM7CId0-0F3oFLKp9ghW-QWL8k50qa1v2zF7BIE5jnm3Kge6TnPgDohYvAiAn5_eFGDB9Fg6k7f8J8nvbX7fgKyqlUQ6mVafAUlkh8ormnzmtSJKkfa1K_Y-4tPt4UEtX-xw0n9qS8-rKjeZkXIaiI3pXWE4MNJ8xQWpS_4G49rW84J1D2ZmGxHxZAdCaGfFc3KBaZt8nCiXi6NXom90An9vk8lYJTyV6yUKpcuWt0Kob5Ao0cXfO4YUlpKY44_cXuECY7cQfarQ7CsurxoLkeALaMPBeHXv6UjlA46vy_ccfDzcCHWDJggDJUgQsDWKr04sMHz6yS4zLJvN1qXgwAAvGMRrnJ7-xh22fufgTeIHNhAY-t5C9arOfi964rP8ZVorKPl0k4Huyyt4StiVCOnTuMk97LEm2nmo-HfjJtw9jFqREd_oI0TBrziLpvu0B3mxjXrvmBKPuZ_ZzXm2UOk1Ex0M81qF9yzc9HjQwzRBGbe0WwuLcJzmh-m4Mj-ADcvzPmDsoN2I280ITu5IZuFtw_OGU6aM8JBNqIA1chO96ZVXTcz5nSvEhBxd9mZf3h0coT49_VzuNfnOe5SnMCvDaS7eirtpUbziF30K0S7Oog.fGv4zFeXYC2Pqh1-h8TMTA'
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
