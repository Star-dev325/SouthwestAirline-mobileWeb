import ChapiReservationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInReservationBuilder';
import { transformReservationDetailsResponseToBoardingPassInfoForSharing } from 'src/checkIn/transformers/checkInActionsTransformer';

describe('checkInActionsTransformer', () => {
  context('transformReservationDetailsResponseToBoardingPassInfoForSharing', () => {
    it('should transform reservation detail response to boardingPassInfoForSharing correctly', () => {
      const reservation = new ChapiReservationBuilder().build();

      const result = transformReservationDetailsResponseToBoardingPassInfoForSharing(reservation);

      expect(result).to.be.deep.equal({
        destinationDescription: 'New York',
        originAirportCode: 'DAL',
        destinationAirportCode: 'LGA',
        dates: {
          first: '2016-10-20',
          second: null
        }
      });
    });
  });
});
