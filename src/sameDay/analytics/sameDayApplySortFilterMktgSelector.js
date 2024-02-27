// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { getAppliedSortAndFilterData } from 'src/sameDay/selectors/sameDayShoppingSelectors';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data');

export const sameDayApplySortFilterMktgSelector = createSelector(
  [getMktgData, getAppliedSortAndFilterData],
  (mktgData, data) => {
    const {
      confirmed,
      nonStop,
      sortBy,
      standby
    } = data;
  
    const filterValue = (filteredBy, value) => `${filteredBy ? value : 'none'}`;
    
    return [
      {
        ...mktgData,
        ...ANALYTICS.SHOPPING_PAGE,
        sortby: sortBy ? sortBy : 'departureTime',
        filterby: `${filterValue(nonStop, 'nonstop')}|${filterValue(standby, 'available standby')}|${filterValue(confirmed, 'available confirmed')}`
      },
      'otter',
      { page: ANALYTICS.SHOPPING_PAGE.page }
    ];
  }
);
