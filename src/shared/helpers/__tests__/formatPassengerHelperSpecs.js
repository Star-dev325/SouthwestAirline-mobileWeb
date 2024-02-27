import { parsePassengers } from 'src/shared/helpers/formatPassengerHelper';

describe('formatPassengerHelper', () => {
  let passengers;

  context('parsePassengers', () => {
    beforeEach(() => {
      passengers = [
        {
          displayName: 'Boss Wang',
          accountNumber: '181757111'
        }
      ];
    });

    it('should merge the second passengers into previous one and has a COS flag when the second passenger is for Extra Seat', () => {
      passengers.push({
        displayName: 'Extra Seat'
      });

      const parsedPassengers = parsePassengers(passengers);

      expect(parsedPassengers).to.have.lengthOf(1);
      expect(parsedPassengers[0].hasExtraSeat).to.be.true;
    });

    it('should not merge the second passengers into previous one and has no COS flag when the second passenger is not for Extra Seat', () => {
      passengers.push({
        displayName: 'Steven Jackie'
      });

      const parsedPassengers = parsePassengers(passengers);

      expect(parsedPassengers).to.have.lengthOf(2);
      expect(parsedPassengers[0].hasExtraSeat).to.be.undefined;
    });
  });
});
