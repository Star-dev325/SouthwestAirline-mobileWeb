module.exports = {
  lowFareCalendarPage: {
    messages: [],
    disclaimerWithLinks:
      'All fares are rounded up to the nearest dollar and include  <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>',
    outboundPage: {
      header: {
        airportInfo: 'AUS - ATL',
        selectedDate: '2020-01-25'
      },
      lowFareCalendarDays: [
        {
          date: '2020-01-15',
          lowestPrice: {
            price: {
              amount: '421.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-16',
          lowestPrice: {
            price: {
              amount: '385.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-17',
          lowestPrice: {
            price: {
              amount: '410.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-18',
          lowestPrice: null
        },
        {
          date: '2020-01-19',
          lowestPrice: {
            price: {
              amount: '430.80',
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
          href: '/v1/mobile-air-booking/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'AUS',
            'destination-airport': 'ATL',
            'departure-date': '2020-01-05'
          }
        },
        nextLowFareCalendarPage: {
          method: 'GET',
          href: '/v1/mobile-air-booking/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'AUS',
            'destination-airport': 'ATL',
            'departure-date': '2020-02-19'
          }
        }
      }
    },
    inboundPage: {
      header: {
        airportInfo: 'ATL - AUS',
        selectedDate: '2020-01-28'
      },
      lowFareCalendarDays: [
        {
          date: '2020-01-17',
          lowestPrice: {
            price: {
              amount: '435.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-18',
          lowestPrice: {
            price: {
              amount: '120.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-19',
          lowestPrice: {
            price: {
              amount: '268.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-20',
          lowestPrice: null
        },
        {
          date: '2020-01-21',
          lowestPrice: {
            price: {
              amount: '230.98',
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
          href: '/v1/mobile-air-booking/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'ATL',
            'destination-airport': 'AUS',
            'departure-date': '2020-01-15'
          }
        },
        nextLowFareCalendarPage: {
          method: 'GET',
          href: '/v1/mobile-air-booking/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'ATL',
            'destination-airport': 'AUS',
            'departure-date': '2020-02-21'
          }
        }
      }
    },
    lowFareCalendarAnalytics: {
      passengercount: '1',
      currencycode: 'REVENUE',
      triptype: 'RT',
      origindestination: 'AUSATL',
      destinationreturn: 'ATLAUS',
      lowestpriceout: '86.98',
      lowestpointsout: 'none',
      lowestpricereturn: '86.98',
      lowestpointsreturn: 'none',
      datesout: '01152020|02072020',
      datesrtn: '01172020|02092020'
    },
    _meta: {
      isInternational: false
    },
    _links: {
      flightShoppingPage: {
        href: '/v1/mobile-air-booking/page/flights/products',
        method: 'GET',
        query: {
          currency: 'USD',
          'origination-airport': 'AUS',
          'destination-airport': 'ATL',
          'number-adult-passengers': '1'
        }
      }
    }
  }
};
