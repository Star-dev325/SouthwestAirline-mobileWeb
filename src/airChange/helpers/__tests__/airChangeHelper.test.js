import { getIsReaccomCoTerminalEligible, hasEnoughPointsForFare } from 'src/airChange/helpers/airChangeHelper';

describe('airChangeHelper', () => {
  const amount = '6500';

  describe('hasEnoughPointsForFare', () => {
    it('should indicate enough points', () => {
      const accountRedeemablePoints = 10000;

      expect(hasEnoughPointsForFare(amount, accountRedeemablePoints)).toBeTruthy();
    });

    it('should indicate enough points if accountRedeemablePoints and required points are equal', () => {
      const accountRedeemablePoints = 6500;

      expect(hasEnoughPointsForFare(amount, accountRedeemablePoints)).toBeTruthy();
    });

    it('should indicate not enough points', () => {
      const accountRedeemablePoints = 500;

      expect(hasEnoughPointsForFare(amount, accountRedeemablePoints)).toBeFalsy();
    });
  });

  describe('getIsReaccomCoTerminalEligible', () => {
    it('should return true when alternateReaccomOriginationAirportCodes exist', () => {
      const boundSelections = [
        {
          alternateReaccomOriginationAirportCodes: ['HOU']
        }
      ];

      expect(getIsReaccomCoTerminalEligible(boundSelections)).toBeTruthy();
    });

    it('should return true when alternateReaccomDestinationAirportCodes exist', () => {
      const boundSelections = [
        {
          alternateReaccomDestinationAirportCodes: ['HOU']
        }
      ];

      expect(getIsReaccomCoTerminalEligible(boundSelections)).toBeTruthy();
    });

    it('should return true when shoppingDates exist', () => {
      const boundSelections = [
        {
          shoppingDates: { test: 'test' }
        }
      ];

      expect(getIsReaccomCoTerminalEligible(boundSelections)).toBeTruthy();
    });

    it('should return true when multiSelectShoppingDates exist', () => {
      const boundSelections = [
        {
          multiSelectShoppingDates: { test: 'test' }
        }
      ];

      expect(getIsReaccomCoTerminalEligible(boundSelections)).toBeTruthy();
    });

    it('should return false when reaccom co-terminal properties do not exist', () => {
      const boundSelections = [
        {
          test: { test: 'test' }
        }
      ];

      expect(getIsReaccomCoTerminalEligible(boundSelections)).toBeFalsy();
    });
  });
});
