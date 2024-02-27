const adultOneWayByPoints = require('mocks/templates/product/adultOneWayByPoints');
const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({ originationAirport, destinationAirport, departureDate, returnDate }) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: null,
    pointsDisclaimer:
      'Award travel is subject to payment of the government-imposed September 11th Security fee, up to $5.60 one-way, $11.20 roundtrip.',
    outboundPage: adultOneWayByPoints({
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
          departureTime: '07:25',
          arrivalTime: '11:55',
          duration: '3h 30m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '3392/3056',
          startingFromPrice: {
            amount: '11,618',
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
                amount: '11,618',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFJGRixSLEFVUyxEQUwsMjAxNy0xMi0xN1QwNzoyNS0wNjowMCwyMDE3LTEyLTE3VDA4OjIwLTA2OjAwLFdOLFdOLDMzOTIsNzNXfFJGRixSLERBTCxBVEwsMjAxNy0xMi0xN1QwODo1NS0wNjowMCwyMDE3LTEyLTE3VDExOjU1LTA1OjAwLFdOLFdOLDMwNTYsNzNXIiwicXVvdGVkUHJpY2UiOiIxMTYxOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxEQUwsMjAxNy0xMi0xN1QwNzoyNS0wNjowMCwyMDE3LTEyLTE3VDA4OjIwLTA2OjAwLFdOLFdOLDMzOTIsNzNXfFlGRixZLERBTCxBVEwsMjAxNy0xMi0xN1QwODo1NS0wNjowMCwyMDE3LTEyLTE3VDExOjU1LTA1OjAwLFdOLFdOLDMwNTYsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxEQUwsMjAxNy0xMi0xN1QwNzoyNS0wNjowMCwyMDE3LTEyLTE3VDA4OjIwLTA2OjAwLFdOLFdOLDMzOTIsNzNXfEtGRixLLERBTCxBVEwsMjAxNy0xMi0xN1QwODo1NS0wNjowMCwyMDE3LTEyLTE3VDExOjU1LTA1OjAwLFdOLFdOLDMwNTYsNzNXIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:0:2017-12-17',
            durationMinutes: 210,
            numberOfStops: 1,
            startingFromAmount: 11618,
            departureTime: '0725'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '18:05',
          arrivalTime: '23:10',
          duration: '4h 5m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '5219/3012',
          startingFromPrice: {
            amount: '11,618',
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
                amount: '11,618',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFJGRixSLEFVUyxIT1UsMjAxNy0xMi0xN1QxODowNS0wNjowMCwyMDE3LTEyLTE3VDE5OjAwLTA2OjAwLFdOLFdOLDUyMTksNzNXfFJGRixSLEhPVSxBVEwsMjAxNy0xMi0xN1QyMDoxMC0wNjowMCwyMDE3LTEyLTE3VDIzOjEwLTA1OjAwLFdOLFdOLDMwMTIsNzNIIiwicXVvdGVkUHJpY2UiOiIxMTYxOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxIT1UsMjAxNy0xMi0xN1QxODowNS0wNjowMCwyMDE3LTEyLTE3VDE5OjAwLTA2OjAwLFdOLFdOLDUyMTksNzNXfFlGRixZLEhPVSxBVEwsMjAxNy0xMi0xN1QyMDoxMC0wNjowMCwyMDE3LTEyLTE3VDIzOjEwLTA1OjAwLFdOLFdOLDMwMTIsNzNIIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxIT1UsMjAxNy0xMi0xN1QxODowNS0wNjowMCwyMDE3LTEyLTE3VDE5OjAwLTA2OjAwLFdOLFdOLDUyMTksNzNXfEtGRixLLEhPVSxBVEwsMjAxNy0xMi0xN1QyMDoxMC0wNjowMCwyMDE3LTEyLTE3VDIzOjEwLTA1OjAwLFdOLFdOLDMwMTIsNzNIIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:2:2017-12-17',
            durationMinutes: 245,
            numberOfStops: 1,
            startingFromAmount: 11618,
            departureTime: '1805'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '09:55',
          arrivalTime: '15:45',
          duration: '4h 50m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '5732/3073',
          startingFromPrice: {
            amount: '11,618',
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
                amount: '11,618',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFJGRixSLEFVUyxEQUwsMjAxNy0xMi0xN1QwOTo1NS0wNjowMCwyMDE3LTEyLTE3VDEwOjUwLTA2OjAwLFdOLFdOLDU3MzIsNzNXfFJGRixSLERBTCxBVEwsMjAxNy0xMi0xN1QxMjo0NS0wNjowMCwyMDE3LTEyLTE3VDE1OjQ1LTA1OjAwLFdOLFdOLDMwNzMsNzNXIiwicXVvdGVkUHJpY2UiOiIxMTYxOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxEQUwsMjAxNy0xMi0xN1QwOTo1NS0wNjowMCwyMDE3LTEyLTE3VDEwOjUwLTA2OjAwLFdOLFdOLDU3MzIsNzNXfFlGRixZLERBTCxBVEwsMjAxNy0xMi0xN1QxMjo0NS0wNjowMCwyMDE3LTEyLTE3VDE1OjQ1LTA1OjAwLFdOLFdOLDMwNzMsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxEQUwsMjAxNy0xMi0xN1QwOTo1NS0wNjowMCwyMDE3LTEyLTE3VDEwOjUwLTA2OjAwLFdOLFdOLDU3MzIsNzNXfEtGRixLLERBTCxBVEwsMjAxNy0xMi0xN1QxMjo0NS0wNjowMCwyMDE3LTEyLTE3VDE1OjQ1LTA1OjAwLFdOLFdOLDMwNzMsNzNXIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:4:2017-12-17',
            durationMinutes: 290,
            numberOfStops: 1,
            startingFromAmount: 11618,
            departureTime: '0955'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '06:35',
          arrivalTime: '09:40',
          duration: '2h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '167',
          startingFromPrice: {
            amount: '12,008',
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
                amount: '12,008',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFdGRixXLEFVUyxBVEwsMjAxNy0xMi0xN1QwNjozNS0wNjowMCwyMDE3LTEyLTE3VDA5OjQwLTA1OjAwLFdOLFdOLDE2Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjEyMDA4In0=',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxBVEwsMjAxNy0xMi0xN1QwNjozNS0wNjowMCwyMDE3LTEyLTE3VDA5OjQwLTA1OjAwLFdOLFdOLDE2Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjM1MjAwIn0=',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxBVEwsMjAxNy0xMi0xN1QwNjozNS0wNjowMCwyMDE3LTEyLTE3VDA5OjQwLTA1OjAwLFdOLFdOLDE2Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ0NzYwIn0=',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:10:2017-12-17',
            durationMinutes: 125,
            numberOfStops: 0,
            startingFromAmount: 12008,
            departureTime: '0635'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '12:35',
          arrivalTime: '15:40',
          duration: '2h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '4588',
          startingFromPrice: {
            amount: '12,008',
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
                amount: '12,008',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFdGRixXLEFVUyxBVEwsMjAxNy0xMi0xN1QxMjozNS0wNjowMCwyMDE3LTEyLTE3VDE1OjQwLTA1OjAwLFdOLFdOLDQ1ODgsNzNIIiwicXVvdGVkUHJpY2UiOiIxMjAwOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxBVEwsMjAxNy0xMi0xN1QxMjozNS0wNjowMCwyMDE3LTEyLTE3VDE1OjQwLTA1OjAwLFdOLFdOLDQ1ODgsNzNIIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxBVEwsMjAxNy0xMi0xN1QxMjozNS0wNjowMCwyMDE3LTEyLTE3VDE1OjQwLTA1OjAwLFdOLFdOLDQ1ODgsNzNIIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:11:2017-12-17',
            durationMinutes: 125,
            numberOfStops: 0,
            startingFromAmount: 12008,
            departureTime: '1235'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '18:10',
          arrivalTime: '21:15',
          duration: '2h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '4932',
          startingFromPrice: {
            amount: '12,008',
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
                amount: '12,008',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFdGRixXLEFVUyxBVEwsMjAxNy0xMi0xN1QxODoxMC0wNjowMCwyMDE3LTEyLTE3VDIxOjE1LTA1OjAwLFdOLFdOLDQ5MzIsNzNXIiwicXVvdGVkUHJpY2UiOiIxMjAwOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxBVEwsMjAxNy0xMi0xN1QxODoxMC0wNjowMCwyMDE3LTEyLTE3VDIxOjE1LTA1OjAwLFdOLFdOLDQ5MzIsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxBVEwsMjAxNy0xMi0xN1QxODoxMC0wNjowMCwyMDE3LTEyLTE3VDIxOjE1LTA1OjAwLFdOLFdOLDQ5MzIsNzNXIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:12:2017-12-17',
            durationMinutes: 125,
            numberOfStops: 0,
            startingFromAmount: 12008,
            departureTime: '1810'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '12:40',
          arrivalTime: '17:55',
          duration: '4h 15m',
          stopDescription: '1 Stop, DAL',
          stopDescriptionOnSelect: '1 Stop, Change planes DAL',
          shortStopDescription: '1 Stop',
          stopCity: 'DAL',
          flightNumbers: '5222/3477',
          startingFromPrice: {
            amount: '13,300',
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
                amount: '13,300',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFdGRixXLEFVUyxEQUwsMjAxNy0xMi0xN1QxMjo0MC0wNjowMCwyMDE3LTEyLTE3VDEzOjM1LTA2OjAwLFdOLFdOLDUyMjIsNzNXfFdGRixXLERBTCxBVEwsMjAxNy0xMi0xN1QxNDo1NS0wNjowMCwyMDE3LTEyLTE3VDE3OjU1LTA1OjAwLFdOLFdOLDM0NzcsNzNXIiwicXVvdGVkUHJpY2UiOiIxMzMwMCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxEQUwsMjAxNy0xMi0xN1QxMjo0MC0wNjowMCwyMDE3LTEyLTE3VDEzOjM1LTA2OjAwLFdOLFdOLDUyMjIsNzNXfFlGRixZLERBTCxBVEwsMjAxNy0xMi0xN1QxNDo1NS0wNjowMCwyMDE3LTEyLTE3VDE3OjU1LTA1OjAwLFdOLFdOLDM0NzcsNzNXIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxEQUwsMjAxNy0xMi0xN1QxMjo0MC0wNjowMCwyMDE3LTEyLTE3VDEzOjM1LTA2OjAwLFdOLFdOLDUyMjIsNzNXfEtGRixLLERBTCxBVEwsMjAxNy0xMi0xN1QxNDo1NS0wNjowMCwyMDE3LTEyLTE3VDE3OjU1LTA1OjAwLFdOLFdOLDM0NzcsNzNXIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:13:2017-12-17',
            durationMinutes: 255,
            numberOfStops: 1,
            startingFromAmount: 13300,
            departureTime: '1240'
          },
          isNextDayArrival: false
        },
        {
          departureTime: '06:05',
          arrivalTime: '12:20',
          duration: '5h 15m',
          stopDescription: '1 Stop, MCO',
          stopDescriptionOnSelect: '1 Stop, Change planes MCO',
          shortStopDescription: '1 Stop',
          stopCity: 'MCO',
          flightNumbers: '4336/3639',
          startingFromPrice: {
            amount: '15,428',
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
                amount: '15,428',
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
                  'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfEhGRixILEFVUyxNQ08sMjAxNy0xMi0xN1QwNjowNS0wNjowMCwyMDE3LTEyLTE3VDA5OjMwLTA1OjAwLFdOLFdOLDQzMzYsNzNXfEhGRixILE1DTyxBVEwsMjAxNy0xMi0xN1QxMDo1MC0wNTowMCwyMDE3LTEyLTE3VDEyOjIwLTA1OjAwLFdOLFdOLDM2MzksNzNXIiwicXVvdGVkUHJpY2UiOiIxNTQyOCJ9',
                ...fareProductOptions.fare1
              }
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: {
                amount: '35,200',
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
                  'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxNQ08sMjAxNy0xMi0xN1QwNjowNS0wNjowMCwyMDE3LTEyLTE3VDA5OjMwLTA1OjAwLFdOLFdOLDQzMzYsNzNXfFlGRixZLE1DTyxBVEwsMjAxNy0xMi0xN1QxMDo1MC0wNTowMCwyMDE3LTEyLTE3VDEyOjIwLTA1OjAwLFdOLFdOLDM2MzksNzNXIiwicXVvdGVkUHJpY2UiOiIzNTIwMCJ9',
                ...fareProductOptions.fare2
              }
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: {
                amount: '44,760',
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
                  'eyJwcm9kdWN0SWQiOiJCVVNSRUR8RkZQfEtGRixLLEFVUyxNQ08sMjAxNy0xMi0xN1QwNjowNS0wNjowMCwyMDE3LTEyLTE3VDA5OjMwLTA1OjAwLFdOLFdOLDQzMzYsNzNXfEtGRixLLE1DTyxBVEwsMjAxNy0xMi0xN1QxMDo1MC0wNTowMCwyMDE3LTEyLTE3VDEyOjIwLTA1OjAwLFdOLFdOLDM2MzksNzNXIiwicXVvdGVkUHJpY2UiOiI0NDc2MCJ9',
                ...fareProductOptions.fare3
              }
            }
          ],
          _meta: {
            cardId: 'AUS:ATL:14:2017-12-17',
            durationMinutes: 315,
            numberOfStops: 1,
            startingFromAmount: 15428,
            departureTime: '0605'
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
