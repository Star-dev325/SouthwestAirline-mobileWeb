// @flow
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import {
  getReaccomBoundSelections,
  isReaccomScenario as getIsReaccomScenario
} from 'src/airChange/selectors/airChangeSelectPageSelector';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';

const getChangeMktgData = createMktgDataSelector('app.airChange.changeFlightPage.response.mktg_data');
const getReaccomMktgData = createMktgDataSelector('app.airChange.reaccomFlightPage.response.mktg_data');

export const flightChangeSelectedBoundsMktgSelector = createSelector(
  [getChangeMktgData, getReaccomMktgData, getIsReaccomScenario, getReaccomBoundSelections],
  (changeMktgData, reaccomMktgData, isReaccomScenario, reaccomBoundSelections) => {
    const isReaccomCoTerminalEligible = isReaccomScenario && getIsReaccomCoTerminalEligible(reaccomBoundSelections);
    const mktgData = isReaccomCoTerminalEligible ? reaccomMktgData : changeMktgData;

    return isReaccomScenario && !isReaccomCoTerminalEligible
      ? []
      : [
        {
          ...mktgData,
          ...ANALYTICS.SHOPPING_PAGE
        },
        'otter',
        { page: ANALYTICS.SHOPPING_PAGE.page }
      ];
  }
);
