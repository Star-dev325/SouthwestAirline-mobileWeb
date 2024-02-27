import _ from 'lodash';
import CarVendorsMobile from 'test/builders/apiResponse/v1/content-delivery/query/carVendorsMobile';
import Vendors from 'test/builders/apiResponse/v1/car-reservations/vendors';
import CarStationsMobile from 'test/builders/apiResponse/v1/content-delivery/query/carStationsMobile';
import Locations from 'test/builders/apiResponse/v1/car-reservations/locations';
import {
  transformVendorResponse,
  transformLocationsResponse,
  transformShoppingResponse,
  transformRetrieveCarPricingResponse,
  transformCarReservationRequest
} from 'src/shared/api/transformers/carBookingApiTransformers';
import CarShoppingSearchBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/carShoppingSearchBuilder';
import CarProductBuilder from 'test/builders/apiResponse/carProductBuilder';
import CarPricingBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/product-id/carPricingBuilder';
import CarReserveRequestBuilder from 'test/builders/apiRequest/carReserveRequestBuilder';

describe('carBookingApiTransformers', () => {
  context('car vendor', () => {
    it('should transformer chapi to wapi response', () => {
      const result = transformVendorResponse(new CarVendorsMobile().build());

      const oldBudget = _.find(new Vendors().build().vendors, { name: 'Budget' });
      const newBudget = _.find(result.vendors, { name: 'Budget' });

      expect(newBudget).to.deep.equal(oldBudget);
    });

    it('should change isRapidRewardsPartner field from string to boolean', () => {
      const result = transformVendorResponse(new CarVendorsMobile().build());

      const vendorET = _.find(result.vendors, { vendorId: 'ET' });

      expect(vendorET.isRapidRewardsPartner).to.be.false;
    });
  });

  context('car stations', () => {
    it('should transformer chapi to wapi response', () => {
      const result = transformLocationsResponse(new CarStationsMobile().build());

      expect(result).to.deep.equal(new Locations().build());
    });
  });

  context('car shopping', () => {
    context('response transformer', () => {
      let chapiApiResponse;

      before(() => {
        chapiApiResponse = new CarShoppingSearchBuilder().withCarProducts([
          new CarProductBuilder().withVendor('Avis').withVehicleType('COMPACT').build(),
          new CarProductBuilder().withVendor('Budget').withVehicleType('MIDSIZE').build()
        ]);
      });

      it('should have the same length in carProducts', () => {
        const result = transformShoppingResponse(chapiApiResponse);

        expect(result.carProducts).to.have.lengthOf(2);
      });

      it('should convert value in additionalCharges to wapi style', () => {
        const { carProducts } = transformShoppingResponse(chapiApiResponse);

        _.forEach(carProducts, (carProduct) => {
          expect(carProduct.additionalCharges).to.deep.equal({
            dropOffChargeCents: 0,
            mileage: {
              cents: 0,
              freeMileage: 'Unlimited',
              per: ''
            },
            noShowFeeCents: 0
          });
        });
      });

      it('should convert value in price to wapi style', () => {
        const { carProducts } = transformShoppingResponse(chapiApiResponse);

        _.forEach(carProducts, (carProduct) => {
          expect(carProduct.price).to.deep.equal({
            dailyRateCents: 13295,
            rates: [{ cents: 13295, quantity: 4, per: 'DAY' }],
            totalCents: 28000,
            totalCentsWithTaxes: 39884,
            totalWithCurrencyCode: {
              amount: '280.00',
              currencyCode: 'USD'
            },
            totalWithTaxesAndCurrencyCode: {
              amount: '398.84',
              currencyCode: 'USD'
            },
            dailyRateWithCurrencyCode: {
              amount: '132.95',
              currencyCode: 'USD'
            }
          });
        });
      });
    });
  });

  context('car pricing', () => {
    let chapiPricingResponse;

    beforeEach(() => {
      chapiPricingResponse = new CarPricingBuilder().build();
    });
    context('CHAPI response transformer to WAPI', () => {
      it('should transform price field', () => {
        const { price } = transformRetrieveCarPricingResponse(chapiPricingResponse);

        expect(price).to.deep.equal({
          dailyRateCents: 6428,
          totalCents: 10000,
          totalCentsWithTaxes: 12855,
          rates: [
            {
              cents: 6428,
              quantity: 2,
              per: 'DAY'
            }
          ],
          taxes: [
            {
              type: 'Tax',
              cents: 1169
            },
            {
              type: 'AIRPORT CONCESSION RECOVERY:',
              cents: 1169
            },
            {
              type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:',
              cents: 368
            },
            {
              type: 'ENERGY SURCHARGE:',
              cents: 149
            }
          ],
          taxesWithCurrencyCode: [
            {
              taxWithCurrencyCode: {
                amount: '11.69',
                currencyCode: 'USD'
              },
              type: 'Tax'
            },
            {
              taxWithCurrencyCode: {
                amount: '11.69',
                currencyCode: 'USD'
              },
              type: 'AIRPORT CONCESSION RECOVERY:'
            },
            {
              taxWithCurrencyCode: {
                amount: '3.68',
                currencyCode: 'USD'
              },
              type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:'
            },
            {
              taxWithCurrencyCode: {
                amount: '1.49',
                currencyCode: 'USD'
              },
              type: 'ENERGY SURCHARGE:'
            }
          ],
          totalWithCurrencyCode: {
            amount: '100.00',
            currencyCode: 'USD'
          },
          totalWithTaxesAndCurrencyCode: {
            amount: '128.55',
            currencyCode: 'USD'
          },
          dailyRateWithCurrencyCode: {
            amount: '64.28',
            currencyCode: 'USD'
          }
        });
      });

      it('should transform additionalCharges field', () => {
        const { additionalCharges } = transformRetrieveCarPricingResponse(chapiPricingResponse);

        expect(additionalCharges).to.deep.equal({
          mileage: {
            cents: 0,
            freeMileage: 'Unlimited',
            per: 'Mile'
          },
          dropOffChargeCents: 0,
          noShowFeeCents: 0
        });
      });

      it('should transform drop off date time and drop off location', () => {
        const wapiResponse = transformRetrieveCarPricingResponse(chapiPricingResponse);

        expect(wapiResponse).to.have.property('dropOffDateTime', '2016-12-22T08:00:00.000');
        expect(wapiResponse).to.have.property('dropOffLocation', 'DAL');
      });

      it('should transform vehicleType to readable string', () => {
        const wapiResponse = transformRetrieveCarPricingResponse(chapiPricingResponse);

        expect(wapiResponse).to.have.property('vehicleType', 'Economy');
      });
    });
  });

  context('car reservation', () => {
    let wapiReservationRequest;

    beforeEach(() => {
      wapiReservationRequest = new CarReserveRequestBuilder().build();
    });
    context('WAPI request transformer to CHAPI', () => {
      it('should transform the extras field', () => {
        const { extras } = transformCarReservationRequest(wapiReservationRequest);

        expect(extras).to.deep.equal([
          {
            type: 'SKI_RACK',
            description: 'Ski Rack'
          },
          {
            type: 'CHILD_TODDLER_SEAT',
            description: 'Child Toddler Seat'
          }
        ]);
      });
    });
  });
});
