// @flow
import dayjs from 'dayjs';
import productDefinitions from 'mocks/templates/productDefinitions';

import type {
  FlightShoppingMultiSelectPageResponse,
  FlightShoppingMultiSelectPageResponseType
} from 'src/airBooking/flow-typed/airBooking.types';

class MultiSelectGroupBuilder {
  multipleAirportsData: FlightShoppingMultiSelectPageResponse = {
    disclaimerWithLinks: '',
    outboundPage: {
      header: {
        selectedDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        originAirport: 'Chicago',
        destinationAirport: 'Boston'
      },
      bounds: [
        {
          originAirport: 'MDW',
          destinationAirport: 'BOS',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'MDW',
                'destination-airport': 'BOS',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'MDW',
          destinationAirport: 'BDL',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'MDW',
                'destination-airport': 'BDL',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'MDW',
          destinationAirport: 'MHT',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'MDW',
                'destination-airport': 'MHT',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'MDW',
          destinationAirport: 'PVD',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'MDW',
                'destination-airport': 'PVD',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'ORD',
          destinationAirport: 'BOS',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'ORD',
                'destination-airport': 'BOS',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'ORD',
          destinationAirport: 'BDL',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'ORD',
                'destination-airport': 'BDL',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'ORD',
          destinationAirport: 'MHT',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'ORD',
                'destination-airport': 'MHT',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        },
        {
          originAirport: 'ORD',
          destinationAirport: 'PVD',
          _links: {
            shopping: {
              href: '/v1/mobile-air-shopping/page/flights/products',
              method: 'GET',
              body: {
                currency: 'USD',
                'origination-airport': 'ORD',
                'destination-airport': 'PVD',
                'departure-date': '2022-09-19',
                'return-date': '2022-09-22',
                'number-adult-passengers': '1'
              }
            }
          }
        }
      ]
    },
    showSgaMessage: false,
    productDefinitions
  };

  build(): FlightShoppingMultiSelectPageResponseType {
    return {
      multipleAirportsData: {
        response: this.multipleAirportsData
      }
    };
  }
}

export default MultiSelectGroupBuilder;
