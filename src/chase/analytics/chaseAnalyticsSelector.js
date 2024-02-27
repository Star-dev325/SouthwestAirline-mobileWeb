import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';

const getChaseAnalytics = (state) => _.get(state, 'analytics.ChaseAnalytics');

export default createSelector([getChaseAnalytics], (chaseAnalytics) => {
  const {
    offers = DEFAULT_OFFERS,
    chasebannershown = false,
    chaseflowcompleted = false,
    creditStatus = ''
  } = chaseAnalytics || {};

  return {
    ...offers,
    chasebannershown,
    chaseflowcompleted,
    creditStatus
  };
});
