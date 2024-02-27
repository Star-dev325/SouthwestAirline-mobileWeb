import _ from 'lodash';
import FlightReservationEarlyBirdHelper from 'src/shared/helpers/flightReservationEarlyBirdHelper';

const {
  getAllEligibleEarlyBird,
  getAllProductIds,
  getTotalPriceCents,
  isEligibleForEarlyBirdCheckIn,
  getAllPurchasedEarlyBird
} = FlightReservationEarlyBirdHelper;

describe('flightReservationEarlyBirdHelper', () => {
  context('getAllEligibleEarlyBird', () => {
    it('should return all early bird eligibilities items which status is ELIGIBLE', () => {
      const result = getAllEligibleEarlyBird(earlyBirdEligibleReservation);

      expect(result).to.have.lengthOf(1);
      expect(result[0].earlyBirdProductId).to.be.equal('PRODUCT_ID1');
    });
  });

  context('getAllProductIds', () => {
    it('should return all product id which status is ELIGIBLE', () => {
      const result = getAllProductIds(earlyBirdEligibleReservation);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.be.equal('PRODUCT_ID1');
    });
  });

  context('getTotalPriceCents', () => {
    it('should return sum of eligible early bird price', () => {
      const reservation = _.cloneDeep(earlyBirdEligibleReservation);

      _.set(reservation, 'passengers.0.earlyBirdEligibilities.1.status', 'ELIGIBLE');

      expect(getTotalPriceCents(reservation)).to.be.equal(3000);
    });
  });

  context('isEligibleForEarlyBirdCheckIn', () => {
    it('should return true if passenger has eligible earlybird status', () => {
      expect(isEligibleForEarlyBirdCheckIn(earlyBirdEligibleReservation)).to.be.true;
    });

    it('should return false if all passengers does not have eligible earlybird status', () => {
      const reservation = _.cloneDeep(earlyBirdEligibleReservation);

      _.set(reservation, 'passengers.0.earlyBirdEligibilities.0.status', 'PURCHASED');

      expect(isEligibleForEarlyBirdCheckIn(reservation)).to.be.false;
    });
  });

  context('getAllPurchasedEarlyBird', () => {
    it('should return all early bird purchased items which status is PURCHASED', () => {
      const result = getAllPurchasedEarlyBird(earlyBirdEligibleReservation);

      expect(result).to.have.lengthOf(1);
      expect(result[0].earlyBirdProductId).to.be.equal('PRODUCT_ID3');
    });
  });

  const earlyBirdEligibleReservation = {
    passengers: [
      {
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: 'PRODUCT_ID1',
            status: 'ELIGIBLE',
            priceCents: 1500
          },
          {
            earlyBirdProductId: 'PRODUCT_ID2',
            status: 'BUSINESS_SELECT',
            priceCents: 1500
          },
          {
            earlyBirdProductId: 'PRODUCT_ID3',
            status: 'PURCHASED',
            priceCents: 1500
          }
        ]
      }
    ]
  };
});
