import { transformToCarReservation } from 'src/carBooking/transformers/carReservationTransformer';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('carReservationTransformer', () => {
  let apiResponse;

  beforeEach(() => {
    apiResponse = require('src/carBooking/transformers/__tests__/carPricingResponseMock').default;
  });

  context('transformToCarReservation', () => {
    const searchRequest = {
      pickUpAirport: {
        airport: { code: 'DAL', airportName: 'Dallas (Love Field)' },
        city: 'Dallas (Love Field)',
        state: 'TX'
      },

      dropOffAirport: {
        airport: { code: 'DAL', airportName: 'Dallas (Love Field)' },
        city: 'Dallas (Love Field)',
        state: 'TX'
      }
    };

    it('should transformer api response to carReservation', () => {
      const selectedCarResult = {
        imageUrl: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
        incentiveText: 'Earn up to 600 points'
      };
      const selectedCarExtrasTypes = ['SKI_RACK'];

      const carReservation = new CarReservationBuilder().build();

      expect(
        transformToCarReservation(apiResponse, selectedCarResult, searchRequest, selectedCarExtrasTypes)
      ).to.deep.equal(carReservation);
    });

    context('daily rate', () => {
      context('per quantity', () => {
        it('should use the number of days from api response', () => {
          apiResponse.numberOfDays = 4;

          const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

          expect(transformedCarReservation.carReservationDetail.dailyRate.perQuantity).to.equal('4 Days');
        });

        it('should say day for perQuantity if the number of days is 1', () => {
          apiResponse.numberOfDays = 1;

          const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

          expect(transformedCarReservation.carReservationDetail.dailyRate.perQuantity).to.equal('1 Day');
        });
      });

      context('cents', () => {
        it('should use the cents from the daily rate when it is present in the rates object', () => {
          apiResponse.price.rates = [
            {
              cents: 55540,
              per: 'MONTH'
            },
            {
              cents: 2240,
              per: 'DAY'
            }
          ];

          const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

          expect(transformedCarReservation.carReservationDetail.dailyRate.cents).to.equal(2240);
        });

        it('should use the daily cents from the price object when daily rate cents is not present in the rates object', () => {
          apiResponse.price.dailyRateCents = 5500;
          apiResponse.price.rates = [
            {
              cents: 55540,
              per: 'MONTH'
            }
          ];

          const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

          expect(transformedCarReservation.carReservationDetail.dailyRate.cents).to.equal(5500);
        });
      });
    });

    it('should produce the correct pickupDate', () => {
      apiResponse.pickupDateTime = '2016-03-08T11:00:00.000';

      const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

      expect(transformedCarReservation.carReservationItinerary.pickUpDate).to.equal('Tuesday, Mar 8, 2016');
    });

    it('should produce the correct dropOffDate', () => {
      apiResponse.dropOffDateTime = '2016-03-12T11:00:00.000';

      const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

      expect(transformedCarReservation.carReservationItinerary.dropOffDate).to.equal('Saturday, Mar 12, 2016');
    });

    it('should return Standard SUV when the carType is sport utility', () => {
      apiResponse.vehicleType = 'Sports Utility';

      const transformedCarReservation = transformToCarReservation(apiResponse, {}, searchRequest);

      expect(transformedCarReservation.carReservationDetail.carType).to.equal('Standard SUV');
    });
  });
});
