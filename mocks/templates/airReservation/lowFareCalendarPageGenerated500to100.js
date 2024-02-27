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
              amount: '500.00',
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
              amount: '400.00',
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
              amount: '300.00',
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
              amount: '200.00',
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
              amount: '100.00',
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
          href: '/v1/mobile-air-booking/page/flights/low-fare-calendar/products',
          query: {
            'origination-airport': 'AUS',
            'destination-airport': 'ATL',
            'departure-date': '2020-02-19'
          }
        }
      }
    },
    lowFareCalendarAnalytics: {
      passengercount: '1',
      currencycode: 'REVENUE',
      triptype: 'OW',
      origindestination: 'AUSATL',
      destinationreturn: null,
      lowestpriceout: '86.98',
      lowestpointsout: 'none',
      lowestpricereturn: 'none',
      lowestpointsreturn: 'none',
      datesout: '01152020|02072020',
      datesrtn: null
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
