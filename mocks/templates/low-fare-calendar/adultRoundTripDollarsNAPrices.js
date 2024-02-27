const adultOneWayDollars = require('mocks/templates/low-fare-calendar/adultOneWayDollars');
const dayjs = require('dayjs');

module.exports = ({ originationAirport, destinationAirport, departureDate, returnDate }) => ({
  lowFareCalendarPage: {
    messages: [],
    disclaimerWithLinks:
      "All fares are rounded up to the nearest dollar and include  <a href='https://mobile.southwest.com/taxes-and-fees' target='_blank'>Gov't taxes &amp; fees.</a>",
    outboundPage: adultOneWayDollars({
      originationAirport,
      destinationAirport,
      departureDate
    }).lowFareCalendarPage.outboundPage,
    inboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: returnDate
      },
      lowFareCalendarDays: [
        {
          date: dayjs().format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '194.98',
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
              amount: '194.98',
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
              amount: '194.98',
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
              amount: '171.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(4, 'days').format('YYYY-MM-DD'),
          lowestPrice: null
        },
        {
          date: dayjs().add(5, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '171.98',
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
              amount: '171.98',
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
              amount: '171.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: dayjs().add(8, 'days').format('YYYY-MM-DD'),
          lowestPric: {
            pric: {
              amoun: '171.98',
              currencyCod: 'USD',
              currencySymbo: '$'
            },
            pricePointsTa: null
          }
        },
        {
          date: dayjs().add(9, 'days').format('YYYY-MM-DD'),
          lowestPrice: {
            price: {
              amount: '171.98',
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
              amount: '171.98',
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
              amount: '171.98',
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
              amount: '171.98',
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
              amount: '171.98',
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
              amount: '111.98',
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
            price: {
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
              amount: '111.98',
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
              amount: '111.98',
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
              amount: '111.98',
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
              amount: '101.98',
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
              amount: '101.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ],
      _links: {
        previousLowFareCalendarPage: null,
        nextLowFareCalendarPage: {
          method: 'GET',
          href: '/v1/mobile-air-shopping/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'AUS',
            'destination-airport': 'DAL',
            'departure-date': '2020-05-01'
          }
        }
      }
    },
    lowFareCalendarAnalytics: {
      passengercount: '1',
      currencycode: 'REVENUE',
      triptype: 'RT',
      origindestination: 'DALAUS',
      destinationreturn: 'AUSDAL',
      lowestpriceout: '101.98',
      lowestpointsout: 'none',
      lowestpricereturn: '101.98',
      lowestpointsreturn: 'none',
      datesout: '03272020|04192020',
      datesrtn: '03272020|04192020'
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
