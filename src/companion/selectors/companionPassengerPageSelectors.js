import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getCompanionInformationResponse = (state) => _.get(state, 'app.companion.companionPassengerPage.response');

export const getCompanionInfo = createSelector([getCompanionInformationResponse], (response) =>
  _.pick(response.companionDetailsPage, ['name', 'gender', 'dateOfBirth', 'suffix'])
);
