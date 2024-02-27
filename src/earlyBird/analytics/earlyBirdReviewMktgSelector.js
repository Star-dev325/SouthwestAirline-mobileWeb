// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const earlyBirdReviewMktgSelector = createSelector(
  createMktgDataSelector('app.earlyBird.reviewPage.mktg_data'),
  (mktgData) => [mktgData]
);
