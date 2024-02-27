import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getConfirmationResponse = (state) => _.get(state, 'app.companion.companionConfirmationPage');

export const getConfirmation = createSelector([getConfirmationResponse], (confirmationResponse) => {
  const earlyBirdTotalCost = _.get(confirmationResponse, 'totals.adultFare.earlyBirdPrice.total.amount', null);
  const failedEarlyBird = _.get(confirmationResponse, 'failedEarlyBird');
  const pnr = _.get(confirmationResponse, 'pnrs[0].recordLocator');

  const isEarlyBirdSucceeded = _.isEmpty(failedEarlyBird);

  const isEarlyBirdSelected = !isEarlyBirdSucceeded || !_.isEmpty(earlyBirdTotalCost);

  return {
    reservationGroups: [
      {
        pnr,
        passengerType: 'COMPANION',
        earlyBirdSucceeded: isEarlyBirdSelected ? isEarlyBirdSucceeded : null,
        earlyBirdTotalCostCents: isEarlyBirdSelected ? earlyBirdTotalCost : null
      }
    ]
  };
});
