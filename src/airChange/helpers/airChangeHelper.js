// @flow
import { toNumberFromFormattedString } from 'src/shared/helpers/currencyValueHelper';

import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';

export const hasEnoughPointsForFare = (amount: string, accountRedeemablePoints: number) => {
  const totalPointsCost = toNumberFromFormattedString(amount);

  return accountRedeemablePoints >= totalPointsCost;
};

export const getIsReaccomCoTerminalEligible = (reaccomBoundSelections: Array<BoundSelection>) =>
  !!reaccomBoundSelections.find(
    (bound) =>
      bound.alternateReaccomOriginationAirportCodes ||
      bound.alternateReaccomDestinationAirportCodes ||
      bound.shoppingDates ||
      bound.multiSelectShoppingDates
  );
