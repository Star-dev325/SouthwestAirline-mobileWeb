const dayjs = require('dayjs');

module.exports = ({ originationAirport, destinationAirport, departureDate }) => ({
  lowFareCalendarPage: {
    messages: [],
    disclaimerWithLinks:
      "All fares are rounded up to the nearest dollar and include  <a href='https://mobile.southwest.com/taxes-and-fees' target='_blank'>Gov't taxes &amp; fees.</a>",
    outboundPage: {
      header: {
        airportInfo: `${originationAirport} - ${destinationAirport}`,
        selectedDate: departureDate
      },
      lowFareCalendarDays: [
        {
          date: dayjs().format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(2, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(3, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(4, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(5, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(6, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(7, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(8, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(9, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(10, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(11, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(12, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(13, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(14, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(15, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(16, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(17, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            pric: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(18, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(19, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(20, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(21, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(22, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(23, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '111.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ],
      _links: {
        previousLowFareCalendarPage: {
          method: 'GET',
          href: '/v1/mobile-air-shopping/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'DAL',
            'destination-airport': 'AUS',
            'departure-date': '2020-04-06'
          }
        },
        nextLowFareCalendarPage: {
          method: 'GET',
          href: '/v1/mobile-air-shopping/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'DAL',
            'destination-airport': 'AUS',
            'departure-date': '2020-05-22'
          }
        }
      }
    },
    lowFareCalendarAnalytics: {
      passengercount: '1',
      currencycode: 'REVENUE',
      triptype: 'OW',
      origindestination: 'DALAUS',
      destinationreturn: 'none',
      lowestpriceout: '101.98',
      lowestpointsout: 'none',
      lowestpricereturn: 'none',
      lowestpointsreturn: 'none',
      datesout: '04172020|05102020',
      datesrtn: 'none'
    },
    _meta: {
      isInternational: false
    },
    _links: {
      flightShoppingPage: {
        href: '/v1/mobile-air-shopping/page/flights/products',
        method: 'GET',
        query: {
          currency: 'USD',
          'origination-airport': 'DAL',
          'destination-airport': 'AUS',
          'number-adult-passengers': '1'
        }
      }
    }
  }
});
