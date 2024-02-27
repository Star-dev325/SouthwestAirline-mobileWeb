const productDefinitions = require('../productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({ originationAirport, destinationAirport, departureDate }) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: null,
    pointsDisclaimer:
      'Award travel is subject to payment of the government-imposed September 11th Security fee, up to $5.60 one-way, $11.20 roundtrip.',
    outboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: departureDate,
        originAirport: originationAirport,
        destinationAirport
      },
      cards: [
        {
          departureTime: '12:30',
          arrivalTime: '15:15',
          duration: '3h 45m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '5557/510',
          startingFromPrice: {
            amount: '15,425',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,425',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFUTCxIT1UsMjAxNy0xMi0xM1QxMjozMC0wNTowMCwyMDE3LTEyLTEzVDEzOjUwLTA2OjAwLFdOLFdOLDU1NTcsNzNXfEhGRixILEhPVSxBVVMsMjAxNy0xMi0xM1QxNDoyNS0wNjowMCwyMDE3LTEyLTEzVDE1OjE1LTA2OjAwLFdOLFdOLDUxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjE1NDI1In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxIT1UsMjAxNy0xMi0xM1QxMjozMC0wNTowMCwyMDE3LTEyLTEzVDEzOjUwLTA2OjAwLFdOLFdOLDU1NTcsNzNXfFlGRixZLEhPVSxBVVMsMjAxNy0xMi0xM1QxNDoyNS0wNjowMCwyMDE3LTEyLTEzVDE1OjE1LTA2OjAwLFdOLFdOLDUxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjM1MjM1In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxIT1UsMjAxNy0xMi0xM1QxMjozMC0wNTowMCwyMDE3LTEyLTEzVDEzOjUwLTA2OjAwLFdOLFdOLDU1NTcsNzNXfEtGRixLLEhPVSxBVVMsMjAxNy0xMi0xM1QxNDoyNS0wNjowMCwyMDE3LTEyLTEzVDE1OjE1LTA2OjAwLFdOLFdOLDUxMCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ0NzM5In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:0:2017-12-13',
            durationMinutes: 225,
            numberOfStops: 1,
            startingFromAmount: 15425,
            departureTime: '1230'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '06:15',
          arrivalTime: '09:15',
          duration: '4h 0m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '151/1680',
          startingFromPrice: {
            amount: '15,425',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,425',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFUTCxEQUwsMjAxNy0xMi0xM1QwNjoxNS0wNTowMCwyMDE3LTEyLTEzVDA3OjM1LTA2OjAwLFdOLFdOLDE1MSw3M1d8SEZGLEgsREFMLEFVUywyMDE3LTEyLTEzVDA4OjE1LTA2OjAwLDIwMTctMTItMTNUMDk6MTUtMDY6MDAsV04sV04sMTY4MCw3M0MiLCJxdW90ZWRQcmljZSI6IjE1NDI1In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxEQUwsMjAxNy0xMi0xM1QwNjoxNS0wNTowMCwyMDE3LTEyLTEzVDA3OjM1LTA2OjAwLFdOLFdOLDE1MSw3M1d8WUZGLFksREFMLEFVUywyMDE3LTEyLTEzVDA4OjE1LTA2OjAwLDIwMTctMTItMTNUMDk6MTUtMDY6MDAsV04sV04sMTY4MCw3M0MiLCJxdW90ZWRQcmljZSI6IjM1MjM1In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxEQUwsMjAxNy0xMi0xM1QwNjoxNS0wNTowMCwyMDE3LTEyLTEzVDA3OjM1LTA2OjAwLFdOLFdOLDE1MSw3M1d8S0ZGLEssREFMLEFVUywyMDE3LTEyLTEzVDA4OjE1LTA2OjAwLDIwMTctMTItMTNUMDk6MTUtMDY6MDAsV04sV04sMTY4MCw3M0MiLCJxdW90ZWRQcmljZSI6IjQ0NzM5In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:1:2017-12-13',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 15425,
            departureTime: '0615'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '20:10',
          arrivalTime: '23:15',
          duration: '4h 5m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '324/1551',
          startingFromPrice: {
            amount: '15,425',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,425',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFUTCxIT1UsMjAxNy0xMi0xM1QyMDoxMC0wNTowMCwyMDE3LTEyLTEzVDIxOjMwLTA2OjAwLFdOLFdOLDMyNCw3M0h8SEZGLEgsSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjE1NDI1In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxIT1UsMjAxNy0xMi0xM1QyMDoxMC0wNTowMCwyMDE3LTEyLTEzVDIxOjMwLTA2OjAwLFdOLFdOLDMyNCw3M0h8WUZGLFksSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjM1MjM1In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxIT1UsMjAxNy0xMi0xM1QyMDoxMC0wNTowMCwyMDE3LTEyLTEzVDIxOjMwLTA2OjAwLFdOLFdOLDMyNCw3M0h8S0ZGLEssSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ0NzM5In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:4:2017-12-13',
            durationMinutes: 245,
            numberOfStops: 1,
            startingFromAmount: 15425,
            departureTime: '2010'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '13:30',
          arrivalTime: '16:40',
          duration: '4h 10m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '195/344',
          startingFromPrice: {
            amount: '15,425',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,425',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFUTCxNU1ksMjAxNy0xMi0xM1QxMzozMC0wNTowMCwyMDE3LTEyLTEzVDE0OjAwLTA2OjAwLFdOLFdOLDE5NSw3M1d8SEZGLEgsTVNZLEFVUywyMDE3LTEyLTEzVDE1OjEwLTA2OjAwLDIwMTctMTItMTNUMTY6NDAtMDY6MDAsV04sV04sMzQ0LDczSCIsInF1b3RlZFByaWNlIjoiMTU0MjUifQ==',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxNU1ksMjAxNy0xMi0xM1QxMzozMC0wNTowMCwyMDE3LTEyLTEzVDE0OjAwLTA2OjAwLFdOLFdOLDE5NSw3M1d8WUZGLFksTVNZLEFVUywyMDE3LTEyLTEzVDE1OjEwLTA2OjAwLDIwMTctMTItMTNUMTY6NDAtMDY6MDAsV04sV04sMzQ0LDczSCIsInF1b3RlZFByaWNlIjoiMzUyMzUifQ==',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxNU1ksMjAxNy0xMi0xM1QxMzozMC0wNTowMCwyMDE3LTEyLTEzVDE0OjAwLTA2OjAwLFdOLFdOLDE5NSw3M1d8S0ZGLEssTVNZLEFVUywyMDE3LTEyLTEzVDE1OjEwLTA2OjAwLDIwMTctMTItMTNUMTY6NDAtMDY6MDAsV04sV04sMzQ0LDczSCIsInF1b3RlZFByaWNlIjoiNDQ3MzkifQ==',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:5:2017-12-13',
            durationMinutes: 250,
            numberOfStops: 1,
            startingFromAmount: 15425,
            departureTime: '1330'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '19:20',
          arrivalTime: '23:15',
          duration: '4h 55m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '805/1551',
          startingFromPrice: {
            amount: '15,425',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,425',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFUTCxIT1UsMjAxNy0xMi0xM1QxOToyMC0wNTowMCwyMDE3LTEyLTEzVDIwOjQwLTA2OjAwLFdOLFdOLDgwNSw3M0h8SEZGLEgsSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjE1NDI1In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxIT1UsMjAxNy0xMi0xM1QxOToyMC0wNTowMCwyMDE3LTEyLTEzVDIwOjQwLTA2OjAwLFdOLFdOLDgwNSw3M0h8WUZGLFksSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjM1MjM1In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxIT1UsMjAxNy0xMi0xM1QxOToyMC0wNTowMCwyMDE3LTEyLTEzVDIwOjQwLTA2OjAwLFdOLFdOLDgwNSw3M0h8S0ZGLEssSE9VLEFVUywyMDE3LTEyLTEzVDIyOjIwLTA2OjAwLDIwMTctMTItMTNUMjM6MTUtMDY6MDAsV04sV04sMTU1MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ0NzM5In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:9:2017-12-13',
            durationMinutes: 295,
            numberOfStops: 1,
            startingFromAmount: 15425,
            departureTime: '1920'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '08:35',
          arrivalTime: '10:15',
          duration: '2h 40m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '773',
          startingFromPrice: {
            amount: '15,875',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: {
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '15,875',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFFGRixRLEFUTCxBVVMsMjAxNy0xMi0xM1QwODozNS0wNTowMCwyMDE3LTEyLTEzVDEwOjE1LTA2OjAwLFdOLFdOLDc3Myw3M1ciLCJxdW90ZWRQcmljZSI6IjE1ODc1In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,235',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFUTCxBVVMsMjAxNy0xMi0xM1QwODozNS0wNTowMCwyMDE3LTEyLTEzVDEwOjE1LTA2OjAwLFdOLFdOLDc3Myw3M1ciLCJxdW90ZWRQcmljZSI6IjM1MjM1In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,739',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              discountedPrice: null,
              pricePointTax: {
                amount: '34.06',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFUTCxBVVMsMjAxNy0xMi0xM1QwODozNS0wNTowMCwyMDE3LTEyLTEzVDEwOjE1LTA2OjAwLFdOLFdOLDc3Myw3M1ciLCJxdW90ZWRQcmljZSI6IjQ0NzM5In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:13:2017-12-13',
            durationMinutes: 160,
            numberOfStops: 0,
            startingFromAmount: 15875,
            departureTime: '0835'
          },
          isNextDayArrival: false
        }
      ]
    },
    inboundPage: null,
    _links: {
      flightPricingPage: {
        href: '/v1/mobile-air-booking/page/flights/prices',
        method: 'POST',
        body: {
          adultPassengers: null,
          currency: 'PTS',
          promoCodeToken: null,
          chaseSessionId: null
        }
      },
      fareDetails: {
        href: '/fare-details',
        labelText: 'Compare fare benefits',
        method: 'GET'
      }
    },
    _meta: {
      purchaseWithPoints: true,
      hasAdult: true,
      isPromoCodeApplied: false
    },
    messages: [],
    showSgaMessage: false
  }
});
