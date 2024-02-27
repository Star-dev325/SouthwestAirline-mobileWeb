import { transformFromPassengerTypeCountAndFareType } from 'src/shared/transformers/passengerFareTypeTransformer';

describe('PassengerFareTypeTransformer', () => {
  context('transformFromPassengerTypeCountAndFareType', () => {
    it('should transform passengerTypeCount into PassengerFareType', () => {
      const passengerTypeCount = {
        adult: 3,
        stuff: 0
      };
      const fareProductDetails = {
        label: 'Wanna Get Away',
        fareRulesUrl: '/fare-rules/wanna-get-away'
      };

      const result = transformFromPassengerTypeCountAndFareType(passengerTypeCount, fareProductDetails);

      expect(result).to.be.deep.equal({
        adult: {
          passengerCount: 3,
          passengerType: 'adult',
          fareLabel: 'Wanna Get Away',
          fareRulesUrl: '/fare-rules/wanna-get-away'
        }
      });
    });
  });
});
