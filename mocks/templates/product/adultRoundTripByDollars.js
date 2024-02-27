const adultOneWayByDollars = require('mocks/templates/product/adultOneWayByDollars');
const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({ originationAirport, destinationAirport, departureDate, returnDate }) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: null,
    pointsDisclaimer: null,
    outboundPage: adultOneWayByDollars({
      originationAirport,
      destinationAirport,
      departureDate
    }).flightShoppingPage.outboundPage,
    inboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: returnDate,
        originAirport: originationAirport,
        destinationAirport
      },
      cards: [
        {
          departureTime: '07:30',
          arrivalTime: '10:35',
          duration: '2h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '2148',
          startingFromPrice: {
            amount: '185',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '185',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 948 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFdMTjNXTlIsVyxBVVMsQVRMLDIwMTctMTItMTZUMDc6MzAtMDY6MDAsMjAxNy0xMi0xNlQxMDozNS0wNTowMCxXTixXTiwyMTQ4LDczVyIsInF1b3RlZFByaWNlIjoiMTg0LjA3In0=',
                ...fareProductOptions.fare1,
                isSenior: false
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '394',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLEFUTCwyMDE3LTEyLTE2VDA3OjMwLTA2OjAwLDIwMTctMTItMTZUMTA6MzUtMDU6MDAsV04sV04sMjE0OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM5My4wOCJ9',
                ...fareProductOptions.fare2,
                isSenior: false
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '416',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsQVRMLDIwMTctMTItMTZUMDc6MzAtMDY6MDAsMjAxNy0xMi0xNlQxMDozNS0wNTowMCxXTixXTiwyMTQ4LDczVyIsInF1b3RlZFByaWNlIjoiNDE1LjA4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:0:2017-12-16',
            durationMinutes: 125,
            numberOfStops: 0,
            startingFromAmount: 185,
            departureTime: '0730'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '15:15',
          arrivalTime: '18:20',
          duration: '2h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '4758',
          startingFromPrice: {
            amount: '185',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '185',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 948 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFdMTjNXTlIsVyxBVVMsQVRMLDIwMTctMTItMTZUMTU6MTUtMDY6MDAsMjAxNy0xMi0xNlQxODoyMC0wNTowMCxXTixXTiw0NzU4LDczVyIsInF1b3RlZFByaWNlIjoiMTg0LjA3In0=',
                ...fareProductOptions.fare1,
                isSenior: false
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '394',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLEFUTCwyMDE3LTEyLTE2VDE1OjE1LTA2OjAwLDIwMTctMTItMTZUMTg6MjAtMDU6MDAsV04sV04sNDc1OCw3M1ciLCJxdW90ZWRQcmljZSI6IjM5My4wOCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '416',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsQVRMLDIwMTctMTItMTZUMTU6MTUtMDY6MDAsMjAxNy0xMi0xNlQxODoyMC0wNTowMCxXTixXTiw0NzU4LDczVyIsInF1b3RlZFByaWNlIjoiNDE1LjA4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:1:2017-12-16',
            durationMinutes: 125,
            numberOfStops: 0,
            startingFromAmount: 185,
            departureTime: '1515'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '12:40',
          arrivalTime: '18:40',
          duration: '5h 0m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '5046/2378',
          startingFromPrice: {
            amount: '193',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '193',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 945 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFJMQTNXTlJPLFIsQVVTLERBTCwyMDE3LTEyLTE2VDEyOjQwLTA2OjAwLDIwMTctMTItMTZUMTM6MzUtMDY6MDAsV04sV04sNTA0Niw3M1d8UkxBM1dOUk8sUixEQUwsQVRMLDIwMTctMTItMTZUMTU6NDAtMDY6MDAsMjAxNy0xMi0xNlQxODo0MC0wNTowMCxXTixXTiwyMzc4LDczVyIsInF1b3RlZFByaWNlIjoiMTkyLjE4In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '402',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLERBTCwyMDE3LTEyLTE2VDEyOjQwLTA2OjAwLDIwMTctMTItMTZUMTM6MzUtMDY6MDAsV04sV04sNTA0Niw3M1d8WUwsWSxEQUwsQVRMLDIwMTctMTItMTZUMTU6NDAtMDY6MDAsMjAxNy0xMi0xNlQxODo0MC0wNTowMCxXTixXTiwyMzc4LDczVyIsInF1b3RlZFByaWNlIjoiNDAxLjc4In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '424',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsREFMLDIwMTctMTItMTZUMTI6NDAtMDY6MDAsMjAxNy0xMi0xNlQxMzozNS0wNjowMCxXTixXTiw1MDQ2LDczV3xLWkJQLEssREFMLEFUTCwyMDE3LTEyLTE2VDE1OjQwLTA2OjAwLDIwMTctMTItMTZUMTg6NDAtMDU6MDAsV04sV04sMjM3OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQyMy43OCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:5:2017-12-16',
            durationMinutes: 300,
            numberOfStops: 1,
            startingFromAmount: 193,
            departureTime: '1240'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '09:45',
          arrivalTime: '16:20',
          duration: '5h 35m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '4379/2083',
          startingFromPrice: {
            amount: '193',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '193',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 945 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFJMQTNXTlJPLFIsQVVTLERBTCwyMDE3LTEyLTE2VDA5OjQ1LTA2OjAwLDIwMTctMTItMTZUMTA6NDAtMDY6MDAsV04sV04sNDM3OSw3M1d8UkxBM1dOUk8sUixEQUwsQVRMLDIwMTctMTItMTZUMTM6MjUtMDY6MDAsMjAxNy0xMi0xNlQxNjoyMC0wNTowMCxXTixXTiwyMDgzLDczVyIsInF1b3RlZFByaWNlIjoiMTkyLjE4In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '402',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLERBTCwyMDE3LTEyLTE2VDA5OjQ1LTA2OjAwLDIwMTctMTItMTZUMTA6NDAtMDY6MDAsV04sV04sNDM3OSw3M1d8WUwsWSxEQUwsQVRMLDIwMTctMTItMTZUMTM6MjUtMDY6MDAsMjAxNy0xMi0xNlQxNjoyMC0wNTowMCxXTixXTiwyMDgzLDczVyIsInF1b3RlZFByaWNlIjoiNDAxLjc4In0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '424',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsREFMLDIwMTctMTItMTZUMDk6NDUtMDY6MDAsMjAxNy0xMi0xNlQxMDo0MC0wNjowMCxXTixXTiw0Mzc5LDczV3xLWkJQLEssREFMLEFUTCwyMDE3LTEyLTE2VDEzOjI1LTA2OjAwLDIwMTctMTItMTZUMTY6MjAtMDU6MDAsV04sV04sMjA4Myw3M1ciLCJxdW90ZWRQcmljZSI6IjQyMy43OCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:7:2017-12-16',
            durationMinutes: 335,
            numberOfStops: 1,
            startingFromAmount: 193,
            departureTime: '0945'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '06:40',
          arrivalTime: '12:20',
          duration: '4h 40m',
          stopDescription: '1 Stop',
          stopDescriptionOnSelect: '1 Stop, No plane change',
          shortStopDescription: '1 Stop',
          stopCity: null,
          flightNumbers: '2157',
          startingFromPrice: {
            amount: '207',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: {
                amount: '207',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,051 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFdMQTNXTlJPLFcsQVVTLEFUTCwyMDE3LTEyLTE2VDA2OjQwLTA2OjAwLDIwMTctMTItMTZUMTI6MjAtMDU6MDAsV04sV04sMjE1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjIwNi42OCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '398',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLEFUTCwyMDE3LTEyLTE2VDA2OjQwLTA2OjAwLDIwMTctMTItMTZUMTI6MjAtMDU6MDAsV04sV04sMjE1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjM5Ny4yOCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '420',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsQVRMLDIwMTctMTItMTZUMDY6NDAtMDY6MDAsMjAxNy0xMi0xNlQxMjoyMC0wNTowMCxXTixXTiwyMTU3LDczVyIsInF1b3RlZFByaWNlIjoiNDE5LjI4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:10:2017-12-16',
            durationMinutes: 280,
            numberOfStops: 1,
            startingFromAmount: 207,
            departureTime: '0640'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '09:55',
          arrivalTime: '16:40',
          duration: '5h 45m',
          stopDescription: '1 Stop, FLL',
          stopDescriptionOnSelect: '1 Stop, Change planes FLL',
          shortStopDescription: '1 Stop',
          stopCity: 'FLL',
          flightNumbers: '626/2605',
          startingFromPrice: {
            amount: '212',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          startingFromPricePointTax: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: '3 left',
              price: {
                amount: '212',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,051 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFdMQTNXTlJPLFcsQVVTLEZMTCwyMDE3LTEyLTE2VDA5OjU1LTA2OjAwLDIwMTctMTItMTZUMTM6MzAtMDU6MDAsV04sV04sNjI2LDczV3xXTEEzV05STyxXLEZMTCxBVEwsMjAxNy0xMi0xNlQxNDo0NS0wNTowMCwyMDE3LTEyLTE2VDE2OjQwLTA1OjAwLFdOLFdOLDI2MDUsNzNXIiwicXVvdGVkUHJpY2UiOiIyMTEuMTgifQ==',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '402',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 3,524 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVVTLEZMTCwyMDE3LTEyLTE2VDA5OjU1LTA2OjAwLDIwMTctMTItMTZUMTM6MzAtMDU6MDAsV04sV04sNjI2LDczV3xZTCxZLEZMTCxBVEwsMjAxNy0xMi0xNlQxNDo0NS0wNTowMCwyMDE3LTEyLTE2VDE2OjQwLTA1OjAwLFdOLFdOLDI2MDUsNzNXIiwicXVvdGVkUHJpY2UiOiI0MDEuNzgifQ==',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '424',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 4,474 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVVMsRkxMLDIwMTctMTItMTZUMDk6NTUtMDY6MDAsMjAxNy0xMi0xNlQxMzozMC0wNTowMCxXTixXTiw2MjYsNzNXfEtaQlAsSyxGTEwsQVRMLDIwMTctMTItMTZUMTQ6NDUtMDU6MDAsMjAxNy0xMi0xNlQxNjo0MC0wNTowMCxXTixXTiwyNjA1LDczVyIsInF1b3RlZFByaWNlIjoiNDIzLjc4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:12:2017-12-16',
            durationMinutes: 345,
            numberOfStops: 1,
            startingFromAmount: 212,
            departureTime: '0955'
          },
          isNextDayArrival: false
        }
      ]
    },
    _links: {
      flightPricingPage: {
        href: '/v1/mobile-air-booking/page/flights/prices',
        method: 'POST',
        body: {
          adultPassengers: null,
          currency: 'USD',
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
      purchaseWithPoints: false,
      hasAdult: true,
      isPromoCodeApplied: false
    },
    messages: [],
    showSgaMessage: false
  }
});
