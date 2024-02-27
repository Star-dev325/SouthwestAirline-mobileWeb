const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({
  originationAirport,
  destinationAirport,
  departureDate,
  isPromoCodeApplied,
  promoCode,
  productId
}) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: isPromoCodeApplied ? `Promo code ${promoCode.toUpperCase()} applied!` : null,
    pointsDisclaimer: null,
    outboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: departureDate,
        originAirport: originationAirport,
        destinationAirport
      },
      cards: [
        {
          departureTime: '13:00',
          arrivalTime: '14:30',
          duration: '2h 30m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1887',
          startingFromPrice: {
            amount: '234',
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
                amount: '234',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,222 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTNUMTM6MDAtMDU6MDAsMjAxNy0xMi0xM1QxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0=',
                ...fareProductOptions.fare1
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLEFVUywyMDE3LTEyLTEzVDEzOjAwLTA1OjAwLDIwMTctMTItMTNUMTQ6MzAtMDY6MDAsV04sV04sMTg4Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjM5My4wOCJ9',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsQVVTLDIwMTctMTItMTNUMTM6MDAtMDU6MDAsMjAxNy0xMi0xM1QxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiNDE1LjA4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:0:2017-12-13',
            durationMinutes: 150,
            numberOfStops: 0,
            startingFromAmount: 234,
            departureTime: '1300'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '20:20',
          arrivalTime: '21:55',
          duration: '2h 35m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '408',
          startingFromPrice: {
            amount: '234',
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
                amount: '234',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,222 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTNUMjA6MjAtMDU6MDAsMjAxNy0xMi0xM1QyMTo1NS0wNjowMCxXTixXTiw0MDgsNzNXIiwicXVvdGVkUHJpY2UiOiIyMzMuMDgifQ==',
                ...fareProductOptions.fare1
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLEFVUywyMDE3LTEyLTEzVDIwOjIwLTA1OjAwLDIwMTctMTItMTNUMjE6NTUtMDY6MDAsV04sV04sNDA4LDczVyIsInF1b3RlZFByaWNlIjoiMzkzLjA4In0=',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsQVVTLDIwMTctMTItMTNUMjA6MjAtMDU6MDAsMjAxNy0xMi0xM1QyMTo1NS0wNjowMCxXTixXTiw0MDgsNzNXIiwicXVvdGVkUHJpY2UiOiI0MTUuMDgifQ==',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:1:2017-12-13',
            durationMinutes: 155,
            numberOfStops: 0,
            startingFromAmount: 234,
            departureTime: '2020'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '15:25',
          arrivalTime: '19:15',
          duration: '4h 50m',
          stopDescription: '1 Stop',
          stopDescriptionOnSelect: '1 Stop, No plane change',
          shortStopDescription: '1 Stop',
          stopCity: null,
          flightNumbers: '212',
          startingFromPrice: {
            amount: '237',
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
                amount: '237',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,218 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsQVRMLEFVUywyMDE3LTEyLTEzVDE1OjI1LTA1OjAwLDIwMTctMTItMTNUMTk6MTUtMDY6MDAsV04sV04sMjEyLDczVyIsInF1b3RlZFByaWNlIjoiMjM2LjY4In0=',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLEFVUywyMDE3LTEyLTEzVDE1OjI1LTA1OjAwLDIwMTctMTItMTNUMTk6MTUtMDY6MDAsV04sV04sMjEyLDczVyIsInF1b3RlZFByaWNlIjoiMzk3LjI4In0=',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsQVVTLDIwMTctMTItMTNUMTU6MjUtMDU6MDAsMjAxNy0xMi0xM1QxOToxNS0wNjowMCxXTixXTiwyMTIsNzNXIiwicXVvdGVkUHJpY2UiOiI0MTkuMjgifQ==',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:3:2017-12-13',
            durationMinutes: 290,
            numberOfStops: 1,
            startingFromAmount: 237,
            departureTime: '1525'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '06:35',
          arrivalTime: '09:40',
          duration: '4h 5m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '1913/4258',
          startingFromPrice: {
            amount: '242',
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
                amount: '242',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,218 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsQVRMLEhPVSwyMDE3LTEyLTEzVDA2OjM1LTA1OjAwLDIwMTctMTItMTNUMDc6NTAtMDY6MDAsV04sV04sMTkxMyw3M1d8SExBMFdOUk8sSCxIT1UsQVVTLDIwMTctMTItMTNUMDg6NDUtMDY6MDAsMjAxNy0xMi0xM1QwOTo0MC0wNjowMCxXTixXTiw0MjU4LDczVyIsInF1b3RlZFByaWNlIjoiMjQxLjE4In0=',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLEhPVSwyMDE3LTEyLTEzVDA2OjM1LTA1OjAwLDIwMTctMTItMTNUMDc6NTAtMDY6MDAsV04sV04sMTkxMyw3M1d8WUwsWSxIT1UsQVVTLDIwMTctMTItMTNUMDg6NDUtMDY6MDAsMjAxNy0xMi0xM1QwOTo0MC0wNjowMCxXTixXTiw0MjU4LDczVyIsInF1b3RlZFByaWNlIjoiNDAxLjc4In0=',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsSE9VLDIwMTctMTItMTNUMDY6MzUtMDU6MDAsMjAxNy0xMi0xM1QwNzo1MC0wNjowMCxXTixXTiwxOTEzLDczV3xLWkJQLEssSE9VLEFVUywyMDE3LTEyLTEzVDA4OjQ1LTA2OjAwLDIwMTctMTItMTNUMDk6NDAtMDY6MDAsV04sV04sNDI1OCw3M1ciLCJxdW90ZWRQcmljZSI6IjQyMy43OCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:7:2017-12-13',
            durationMinutes: 245,
            numberOfStops: 1,
            startingFromAmount: 242,
            departureTime: '0635'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '12:05',
          arrivalTime: '15:50',
          duration: '4h 45m',
          stopDescription: '1 Stop, STL',
          stopDescriptionOnSelect: '1 Stop, Change planes STL',
          shortStopDescription: '1 Stop',
          stopCity: 'STL',
          flightNumbers: '176/1602',
          startingFromPrice: {
            amount: '242',
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
                amount: '242',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,218 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsQVRMLFNUTCwyMDE3LTEyLTEzVDEyOjA1LTA1OjAwLDIwMTctMTItMTNUMTI6NTAtMDY6MDAsV04sV04sMTc2LDczV3xITEEwV05STyxILFNUTCxBVVMsMjAxNy0xMi0xM1QxMzo0MC0wNjowMCwyMDE3LTEyLTEzVDE1OjUwLTA2OjAwLFdOLFdOLDE2MDIsNzNXIiwicXVvdGVkUHJpY2UiOiIyNDEuMTgifQ==',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLFNUTCwyMDE3LTEyLTEzVDEyOjA1LTA1OjAwLDIwMTctMTItMTNUMTI6NTAtMDY6MDAsV04sV04sMTc2LDczV3xZTCxZLFNUTCxBVVMsMjAxNy0xMi0xM1QxMzo0MC0wNjowMCwyMDE3LTEyLTEzVDE1OjUwLTA2OjAwLFdOLFdOLDE2MDIsNzNXIiwicXVvdGVkUHJpY2UiOiI0MDEuNzgifQ==',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsU1RMLDIwMTctMTItMTNUMTI6MDUtMDU6MDAsMjAxNy0xMi0xM1QxMjo1MC0wNjowMCxXTixXTiwxNzYsNzNXfEtaQlAsSyxTVEwsQVVTLDIwMTctMTItMTNUMTM6NDAtMDY6MDAsMjAxNy0xMi0xM1QxNTo1MC0wNjowMCxXTixXTiwxNjAyLDczVyIsInF1b3RlZFByaWNlIjoiNDIzLjc4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:11:2017-12-13',
            durationMinutes: 285,
            numberOfStops: 1,
            startingFromAmount: 242,
            departureTime: '1205'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '13:25',
          arrivalTime: '17:20',
          duration: '4h 55m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '166/1493',
          startingFromPrice: {
            amount: '242',
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
                amount: '242',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,218 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsQVRMLERBTCwyMDE3LTEyLTEzVDEzOjI1LTA1OjAwLDIwMTctMTItMTNUMTQ6NDAtMDY6MDAsV04sV04sMTY2LDczV3xITEEwV05STyxILERBTCxBVVMsMjAxNy0xMi0xM1QxNjoyMC0wNjowMCwyMDE3LTEyLTEzVDE3OjIwLTA2OjAwLFdOLFdOLDE0OTMsNzNXIiwicXVvdGVkUHJpY2UiOiIyNDEuMTgifQ==',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQVRMLERBTCwyMDE3LTEyLTEzVDEzOjI1LTA1OjAwLDIwMTctMTItMTNUMTQ6NDAtMDY6MDAsV04sV04sMTY2LDczV3xZTCxZLERBTCxBVVMsMjAxNy0xMi0xM1QxNjoyMC0wNjowMCwyMDE3LTEyLTEzVDE3OjIwLTA2OjAwLFdOLFdOLDE0OTMsNzNXIiwicXVvdGVkUHJpY2UiOiI0MDEuNzgifQ==',
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
                  productId ||
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsREFMLDIwMTctMTItMTNUMTM6MjUtMDU6MDAsMjAxNy0xMi0xM1QxNDo0MC0wNjowMCxXTixXTiwxNjYsNzNXfEtaQlAsSyxEQUwsQVVTLDIwMTctMTItMTNUMTY6MjAtMDY6MDAsMjAxNy0xMi0xM1QxNzoyMC0wNjowMCxXTixXTiwxNDkzLDczVyIsInF1b3RlZFByaWNlIjoiNDIzLjc4In0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'ATL:AUS:12:2017-12-13',
            durationMinutes: 295,
            numberOfStops: 1,
            startingFromAmount: 242,
            departureTime: '1325'
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
          currency: 'USD',
          promoCodeToken: isPromoCodeApplied
            ? 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..gkBDFwzZnORs9x6Qw6lGuA.C0P6gkZrJ3b5u3Zg0-78mRUB2AVJ1gfozWD46Oby8BTxhnxWzyTI9X_gQwIvbNnTPXmrD1RdLNKt1C1MkuyWyhbYJ8z-nSIGaDg1Kcy2-ESFORiMVLJK7AKuFdZ-9SSCAMWS_YmB3ThiaVN6NO5BsjVLMSX8EaZ5lShxzvd4ueSwsjCw2jPIQS22J8rMMQgALM0kWNflYD8o0QFw2pCjoLSKW33Jm9aFyr27WEemj06vsjaDQ1DzKCeKNthqgDterrELzro8jbBxLPPTdVjcJENo_8NH8HWhFcB_sJXIyk6G5WwnNqvkQKeRgU6pfe6S--6U2fnkFv8jGRZscyEG5zEs_RGhRDC0CwKLcK0p9eeM--X9J_EzCCzU8iJk9HD9pPUz88KCRfJOnBinOoEwtw.C55EIQYCqKXt-Hvt_bg3ug'
            : null,
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
      isPromoCodeApplied
    },
    messages: [],
    showSgaMessage: false
  }
});
