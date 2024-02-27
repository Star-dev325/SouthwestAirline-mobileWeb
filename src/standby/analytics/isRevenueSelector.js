import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getIsRevenueSelector = (state) => _.get(state, 'app.standby.isRevenue', null);

export const getIsRevenue = createSelector([getIsRevenueSelector], (isRevenue) => isRevenue);
