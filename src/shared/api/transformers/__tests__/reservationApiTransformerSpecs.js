import CarReservationBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/reservations/confirmation-number/carReservationBuilder';
import { transformToRetrieveCarReservationResponse } from 'src/shared/api/transformers/reservationApiTransformer';

describe('reservationApiTransformer', () => {
  context('transformToRetrieveCarReservationResponse', () => {
    let responseAfterTransformer;

    before(() => {
      const carChapiReservationResponse = new CarReservationBuilder().build();

      responseAfterTransformer = transformToRetrieveCarReservationResponse(carChapiReservationResponse);
    });

    it('driver info should keep the same', () => {
      expect(responseAfterTransformer.driver.firstName).to.equal('Ron');
      expect(responseAfterTransformer.driver.lastName).to.equal('Zhen');
      expect(responseAfterTransformer.driver.accountNumber).to.be.undefined;
    });

    it('should have dropOffDateime', () => {
      expect(responseAfterTransformer.dropoffDatetime).to.equal('2016-11-23T11:30');
    });

    it('should have dropOffLocation', () => {
      expect(responseAfterTransformer.dropoffLocation).to.equal('DAL');
    });

    it('should have price', () => {
      expect(responseAfterTransformer.price).to.deep.equal({
        dailyRate: {
          currencyCode: 'USD',
          value: '80.65'
        },
        total: {
          value: '128.00',
          currencyCode: 'USD'
        },
        totalWithTaxes: {
          value: '161.30',
          currencyCode: 'USD'
        },
        dailyRateCents: 8065,
        totalCents: 12800,
        totalCentsWithTaxes: 16130
      });
    });

    it('should have taxCents', () => {
      expect(responseAfterTransformer.taxCents).to.equal(3330);
    });

    context('should have correct mileage message', () => {
      it('should have Unlimited', () => {
        expect(responseAfterTransformer.mileage).to.deep.equal({
          cents: 32,
          freeMileage: '300',
          per: 'Mile'
        });
      });

      it('should have Unlimited', () => {
        const carChapiReservationResponseForUnlimited = new CarReservationBuilder().withUnlimitedMileage().build();

        responseAfterTransformer = transformToRetrieveCarReservationResponse(carChapiReservationResponseForUnlimited);
        expect(responseAfterTransformer.mileage).to.equal('Unlimited');
      });
    });

    it('other fields should keep the same', () => {
      expect(responseAfterTransformer.confirmationNumber).to.equal('1005304455COUNT');
      expect(responseAfterTransformer.vendor).to.equal('Alamo');
      expect(responseAfterTransformer.vehicleType).to.equal('Mid-size');
      expect(responseAfterTransformer.pickupDatetime).to.equal('2016-11-21T11:30');
      expect(responseAfterTransformer.pickupLocation).to.equal('DAL');
      expect(responseAfterTransformer.numberOfDays).to.equal(2);
      expect(responseAfterTransformer.extras).to.deep.equal([]);
      expect(responseAfterTransformer.rentalDeskLocation).to.deep.equal(
        'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.'
      );
      expect(responseAfterTransformer.cancelled).to.be.false;
      expect(responseAfterTransformer.name).to.equal('5DR LIFTBACK OR SIMILAR');
    });
  });
});
