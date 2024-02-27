const _ = require('lodash');
const dayjs = require('dayjs');
const contractTest = require('test/apiContract/contractTestMochaWrappers');

const DATE_TIME_SHORT_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const DATE_TIME_LONG_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}$/;
const ANY_DIGIT = /\d.\d/;
const API_REQUEST_DATE_FORMAT = 'YYYY-MM-DD';
const API_REQUEST_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const PICK_UP_DATE = dayjs().hours(11).minutes(30).add(2, 'days');

describe('car booking flow', () => {
  describe('shopping', () => {
    let carShoppingResponse;

    contractTest.before(() => carChapi
      .get('/cars/products')
      .query({
        'pickup-location': 'DAL',
        'return-location': 'DAL',
        'pickup-datetime': PICK_UP_DATE.format(API_REQUEST_DATE_TIME_FORMAT),
        'return-datetime': dayjs().hours(11).minutes(30).add(20, 'days').format(API_REQUEST_DATE_TIME_FORMAT),
        'vendor[]': 'ALAMO'
      })
      .then((response) => {
        const responseData = response.body;

        expect(responseData.carProducts).to.not.be.empty;
        carShoppingResponse = responseData;
      }));

    it('all products should have product id, vendor, vehicle type and price', () => {
      expect(carShoppingResponse).to.have.property('carProducts').and.be.an('array');

      _.forEach(carShoppingResponse.carProducts, (carProduct) => {
        expect(carProduct).to.have.property('vendor').and.not.be.empty;
        expect(carProduct).to.have.property('vehicleType').and.not.be.empty;
        expect(carProduct).to.have.property('productId').and.not.be.empty;
        expect(carProduct).to.have.deep.property('price.dailyRate.value').and.match(ANY_DIGIT).and.not.be.empty;
      });
    });

    describe('get car pricing', () => {
      let carPricingResponse, productId;

      contractTest.before(() => {
        ({ productId } = carShoppingResponse.carProducts[0]);

        return carChapi
          .get(`/cars/product-id/${productId}`)
          .then((response) => {
            carPricingResponse = response.body;
          });
      });

      it('should contain car name, vehicle type, vendor, number of days, location of pickup and dropoff, and dates for pickup and dropoff', () => {
        expect(carPricingResponse).to.be.an('object');
        expect(carPricingResponse.name).to.be.a('string').and.not.be.empty;
        expect(carPricingResponse.vehicleType).to.be.a('string').and.not.be.empty;
        expect(carPricingResponse.vendor).to.be.a('string').and.not.be.empty;
        expect(carPricingResponse.numberOfDays).to.be.a('number').and.not.be.empty;
        expect(carPricingResponse.pickupLocation).to.be.a('string').and.to.have.lengthOf(3);
        expect(carPricingResponse.returnLocation).to.be.a('string').and.to.have.lengthOf(3);

        expect(carPricingResponse.pickupDateTime).to.match(DATE_TIME_LONG_REGEX);
        expect(dayjs(carPricingResponse.pickpDateTime).isValid()).to.be.true;

        expect(carPricingResponse.returnDateTime).to.match(DATE_TIME_LONG_REGEX);
        expect(dayjs(carPricingResponse.returnDateTime).isValid()).to.be.true;
      });

      it('should contain rentalDeskLocation', () => {
        expect(carPricingResponse.rentalDeskLocation).to.be.a('string').and.to.not.be.empty;
      });

      it('should contain correct pricing information', () => {
        expect(carPricingResponse.price).to.be.an('object');

        expect(carPricingResponse.price.dailyRate.value).to.be.a('string').and.to.match(ANY_DIGIT);
        expect(carPricingResponse.price.total.value).to.be.a('string').and.to.match(ANY_DIGIT);
        expect(carPricingResponse.price.totalWithTaxes.value).to.be.a('string').and.to.match(ANY_DIGIT);

        let totalTax = 0;

        _.forEach(carPricingResponse.price.taxes, (tax) => {
          expect(tax.type).to.be.a('string').and.not.be.empty;
          expect(tax.amount.value).to.be.a('string').and.to.match(ANY_DIGIT);
          totalTax += parseFloat(tax.amount.value);
        });

        expect(computeTotalWithTaxesByAddingTotalAndTotalTax(totalTax, carPricingResponse)).to.equal(parseFloat(carPricingResponse.price.totalWithTaxes.value));
        expect(computeDailyRateBasedOnTotalPriceAndNumberOfDays(carPricingResponse)).to.equal(parseFloat(carPricingResponse.price.dailyRate.value));
      });

      it('should contain terms and conditions', () => {
        expect(carPricingResponse.termsAndConditions).to.be.an('array').and.not.be.empty;
      });

      it('should contain extras', () => {
        expect(carPricingResponse.extras).to.be.an('array');

        _.forEach(carPricingResponse.extras, (carExtra) => {
          expect(carExtra).to.have.property('type').and.not.be.empty;
          expect(carExtra).to.have.property('description').and.not.be.empty;
        });
      });

      describe('purchase car reservation', () => {
        let carPurchaseRequestBody, carPurchaseResponse;

        contractTest.before(() => {
          carPurchaseRequestBody = carPurchaseBody(carPricingResponse);

          return carChapi
            .post('/cars/reservations')
            .send(carPurchaseRequestBody)
            .then((response) => {
              carPurchaseResponse = response.body;
            });
        });

        it('should have a confirmation number', () => {
          expect(carPurchaseResponse).to.have.property('confirmationNumber').and.be.a('string');
        });

        function carPurchaseBody(carPricingResponse) {
          const productId = _.get(carPricingResponse, 'productId');
          const firstExtra = _.get(carPricingResponse, 'extras.0.type');
          const extras = firstExtra ? [{ type: firstExtra }] : [];

          return {
            driver: {
              firstName: 'shirli',
              lastName: 'hin',
              accountNumber: '',
              flightNumber: null,
              phone: {
                number: '7744548532',
                countryCode: 1
              }
            },
            extras,
            product: {
              productId
            },
            receiptEmail: 'test@test.com',
            purposeOfTravel: 'BUSINESS'
          };
        }

        describe('retrieve car reservation', () => {
          let retrieveReservationResponse;

          contractTest.before(() => carChapi
            .get(`/cars/reservations/${carPurchaseResponse.confirmationNumber}`)
            .query({
              'first-name': 'shirli',
              'last-name': 'hin',
              'pickup-date': PICK_UP_DATE.format(API_REQUEST_DATE_FORMAT)
            })
            .then((response) => {
              retrieveReservationResponse = response.body;
            }));

          it('should have a confirmation number', () => {
            expect(retrieveReservationResponse).to.have.property('confirmationNumber').and.be.a('string');
          });

          it('should have drivers name', () => {
            expect(retrieveReservationResponse).to.deep.have.property('driver.firstName').and.be.a('string');
            expect(retrieveReservationResponse).to.deep.have.property('driver.lastName').and.be.a('string');
          });

          it('should have vendor', () => {
            expect(retrieveReservationResponse).to.have.property('vendor').and.be.a('string');
          });

          it('should have car name', () => {
            expect(retrieveReservationResponse).to.have.property('name').and.be.a('string');
          });

          it('should have vehicleType', () => {
            expect(retrieveReservationResponse).to.have.property('vehicleType').and.be.a('string');
          });

          it('should have pickup and return location', () => {
            expect(retrieveReservationResponse).to.have.property('pickupDatetime').and.be.a('string').and.match(DATE_TIME_SHORT_REGEX);
            expect(retrieveReservationResponse).to.have.property('returnDatetime').and.be.a('string').and.match(DATE_TIME_SHORT_REGEX);
            expect(retrieveReservationResponse).to.have.property('pickupLocation').and.be.a('string').and.have.lengthOf(3);
            expect(retrieveReservationResponse).to.have.property('returnLocation').and.be.a('string').and.have.lengthOf(3);
          });

          it('should have number of days', () => {
            expect(retrieveReservationResponse).to.have.property('numberOfDays').and.be.a('number');
          });

          it('should have extras', () => {
            expect(retrieveReservationResponse).to.have.property('extras').and.be.an('array');

            if (!_.isEmpty(carPurchaseRequestBody.extras)) {
              expect(retrieveReservationResponse).to.have.property('extras').and.have.lengthOf(carPurchaseRequestBody.extras.length);
              expect(retrieveReservationResponse).to.have.deep.property('extras.0').and.be.a('string');
            }
          });

          it('should have rentalDeskLocation', () => {
            expect(retrieveReservationResponse).to.have.property('rentalDeskLocation').and.be.a('string');
          });

          it('should have false cancelled flag', () => {
            expect(retrieveReservationResponse).to.have.property('cancelled').and.be.false;
          });

          it('should have correct pricing information', () => {
            expect(retrieveReservationResponse).to.have.deep.property('price.dailyRate.value').and.be.a('string').and.match(ANY_DIGIT);
            expect(retrieveReservationResponse).to.have.deep.property('price.total.value').and.be.a('string').and.match(ANY_DIGIT);
            expect(retrieveReservationResponse).to.have.deep.property('price.totalWithTaxes.value').and.be.a('string').and.match(ANY_DIGIT);
            expect(retrieveReservationResponse).to.have.deep.property('tax.value').and.be.a('string').and.match(ANY_DIGIT);
            expect(retrieveReservationResponse).to.have.deep.property('mileage.amount.currencyCode').and.be.a('string').and.equal('USD');
            expect(retrieveReservationResponse).to.have.deep.property('mileage.amount.value').and.be.a('string').and.not.be.empty;
            expect(retrieveReservationResponse).to.have.deep.property('mileage.freeMileage');
            expect(retrieveReservationResponse).to.have.deep.property('mileage.per');
          });

          describe('cancel a reservation', () => {
            let cancelReservationResponse;

            contractTest.before(() => carChapi
              .delete(`/cars/reservations/${carPurchaseResponse.confirmationNumber}`)
              .query({
                'first-name': 'shirli',
                'last-name': 'hin',
                'pickup-date': PICK_UP_DATE.format(API_REQUEST_DATE_FORMAT)
              })
              .then((response) => {
                cancelReservationResponse = response.body;
              }));

            it('should have a cancel status', () => {
              expect(cancelReservationResponse).to.have.property('cancelStatus', 'CANCELLED');
            });

            describe('retrieve cancelled car reservation', () => {
              let cancelledCarReservationResponse;

              contractTest.before(() => carChapi
                .get(`/cars/reservations/${carPurchaseResponse.confirmationNumber}`)
                .query({
                  'first-name': 'shirli',
                  'last-name': 'hin',
                  'pickup-date': PICK_UP_DATE.format(API_REQUEST_DATE_FORMAT)
                })
                .then((response) => {
                  cancelledCarReservationResponse = response.body;
                }));

              it('should have a true cancelled flag', () => {
                expect(cancelledCarReservationResponse).to.have.property('cancelled').and.be.true;
              });
            });
          });
        });
      });
    });
  });
});

function computeDailyRateBasedOnTotalPriceAndNumberOfDays(carPricingResponse) {
  const pricePerDay = parseFloat(carPricingResponse.price.total.value) / carPricingResponse.numberOfDays;

  return Math.ceil(pricePerDay * 100) / 100;
}

function computeTotalWithTaxesByAddingTotalAndTotalTax(totalTax, carPricingResponse) {
  return totalTax + parseFloat(carPricingResponse.price.total.value);
}

const baseChapiUrl = 'https://api-mobile-misc.dev4.southwest.com/v1/mobile-misc/feature';
const apiKey = 'l7xxbfc2e646cc724d3ab0fe30857157cec0';

const carChapi = {
  get(resource) {
    return chai.request(baseChapiUrl)
      .get(resource)
      .set('X-API-Key', apiKey);
  },

  post(resource) {
    return chai.request(baseChapiUrl)
      .post(resource)
      .set('X-API-Key', apiKey);
  },

  delete(resource) {
    return chai.request(baseChapiUrl)
      .delete(resource)
      .set('X-API-Key', apiKey);
  }
};
