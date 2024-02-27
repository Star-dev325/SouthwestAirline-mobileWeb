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
          date: '2020-02-27',
          lowestPrice: {
            price: {
              amount: '1000',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-26',
          lowestPrice: {
            price: {
              amount: '900',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-25',
          lowestPrice: {
            price: {
              amount: '950',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-24',
          lowestPrice: {
            price: {
              amount: '800',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-23',
          lowestPrice: {
            price: {
              amount: '850',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-22',
          lowestPrice: {
            price: {
              amount: '700',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-21',
          lowestPrice: {
            price: {
              amount: '750',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-20',
          lowestPrice: {
            price: {
              amount: '600',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-19',
          lowestPrice: {
            price: {
              amount: '650',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-18',
          lowestPrice: {
            price: {
              amount: '500',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-17',
          lowestPrice: {
            price: {
              amount: '550',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-16',
          lowestPrice: {
            price: {
              amount: '400',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-15',
          lowestPrice: {
            price: {
              amount: '450',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-14',
          lowestPrice: {
            price: {
              amount: '300',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-13',
          lowestPrice: {
            price: {
              amount: '350',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-12',
          lowestPrice: {
            price: {
              amount: '200',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-11',
          lowestPrice: {
            price: {
              amount: '250',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-10',
          lowestPrice: {
            price: {
              amount: '150',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-09',
          lowestPrice: {
            price: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-02-08',
          lowestPrice: {
            price: {
              amount: '50',
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
