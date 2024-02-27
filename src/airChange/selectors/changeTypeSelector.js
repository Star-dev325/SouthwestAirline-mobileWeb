// @flow
import numeral from 'numeral';
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

import type { ChangeType, FareSummary } from 'src/airChange/flow-typed/airChange.types';

const getFareSummary = (state: *) => _.get(state, 'app.airChange.changePricingPage.response.fareSummary');

export const getChangeType = createSelector([getFareSummary], (fareSummary: FareSummary): ChangeType => {
  const originalTripAmount = numeral(_.get(fareSummary, 'originalTripCost.fare.amount')).value();
  const newTripCostAmount = numeral(_.get(fareSummary, 'newTripCost.fare.amount')).value();

  return {
    evenExchange: originalTripAmount === newTripCostAmount,
    upGrade: originalTripAmount < newTripCostAmount,
    downGrade: originalTripAmount > newTripCostAmount
  };
});
