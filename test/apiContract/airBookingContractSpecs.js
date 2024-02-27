const _ = require('lodash');
const dayjs = require('dayjs');
const { validate } = require('jsonschema');
const earlyBirdPricesJson = require('test/apiContract/schema/earlyBirdPrices');
const contractTest = require('test/apiContract/contractTestMochaWrappers');
const { API_KEY } = require('config/itest2');

const BASE_URL = 'https://api-mobile-air-booking.dev4.southwest.com/v1/mobile-air-booking';
const DEPARTURE_DATE_FORMAT = 'YYYY-MM-DD';
const DEPARTURE_DATE = dayjs().add(2, 'days').format(DEPARTURE_DATE_FORMAT);

const airBookingApi = {
  get(resource) {
    return chai.request(BASE_URL)
      .get(resource)
      .set('X-API-Key', API_KEY)
      .set('True-Host', 'mobile.southwest.com');
  },

  post(resource) {
    return chai.request(BASE_URL)
      .post(resource)
      .set('X-API-Key', API_KEY)
      .set('True-Host', 'mobile.southwest.com');
  }
};

describe('air booking flow', () => {
  let productId;

  describe('shopping', () => {
    let flightShoppingResponse;

    contractTest.before(() => airBookingApi
      .get('/page/flights/products')
      .query({
        'origination-airport': 'DAL',
        'destination-airport': 'AUS',
        'departure-date': DEPARTURE_DATE,
        'number-adult-passengers': '1',
        'number-senior-passengers': '0',
        currency: 'USD'
      })
      .then((response) => {
        flightShoppingResponse = response.body;
      }));

    it('should return product list', () => {
      expect(flightShoppingResponse.flightShoppingPage).to.be.an('object');
    });

    it('should get valid product id', () => {
      productId = _.get(flightShoppingResponse.flightShoppingPage, 'outboundPage.cards.0.fares.0._meta.productId');
      expect(productId).not.to.be.empty;
    });

    describe('pricing', () => {
      describe('early bird prices for single adult', () => {
        let ebPricesResponse;

        contractTest.before(() => {
          const ebPricesRequestBody = {
            adultPassengers: {
              productIds: [productId],
              passengers: [
                {
                  name: {
                    firstName: 'jie',
                    lastName: 'lu',
                    middleName: 'yang'
                  },
                  passengerReference: '2'
                }
              ]
            },
            currency: 'USD'
          };

          return airBookingApi
            .post('/feature/earlybird/prices')
            .send(ebPricesRequestBody)
            .then((response) => {
              ebPricesResponse = response.body;
            });
        });

        it('should match early bird schema', () => {
          const result = validate(ebPricesResponse, earlyBirdPricesJson);

          expect(result.errors).to.be.empty;
        });
      });
    });
  });
});
