jest.mock('src/airUpgrade/analytics/upgradeIndexPageMktgSelector');
jest.mock('src/airUpgrade/analytics/upgradeSelectBoundsPageMktgSelector');

import upgradeFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { dataLayerSelectorsForAirUpgrade } from 'src/airUpgrade/analytics/index';
import { ANALYTICS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import * as upgradeIndexPageMktgSelector from 'src/airUpgrade/analytics/upgradeIndexPageMktgSelector';
import * as upgradeSelectBoundsPageMktgSelector from 'src/airUpgrade/analytics/upgradeSelectBoundsPageMktgSelector';

describe('index', () => {
  const expectedUpgradeSelectBoundsPageMktgSelectorData = [
    {
      ...globalMktgState,
      ...ANALYTICS.UPGRADE_FARE_PAGE
    },
    'otter',
    { page_name: ANALYTICS.UPGRADE_FARE_PAGE.page_name }
  ];
  const upgradeSelectBoundsPageResponse = [
    {
      ...globalMktgState,
      ...ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE
    },
    'otter',
    { page_name: ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE.page_name }
  ];

  describe('dataLayerSelectorsForAirUpgrade', () => {
    it('should return the upgradeIndexPageMktgSelector used for the marketing data layer', () => {
      jest
        .spyOn(upgradeIndexPageMktgSelector, 'upgradeIndexPageMktgSelector')
        .mockReturnValue(expectedUpgradeSelectBoundsPageMktgSelectorData);

      expect(dataLayerSelectorsForAirUpgrade[upgradeFareActionTypes.AIR_UPGRADE__UPGRADE_INDEX]()).toEqual(
        expectedUpgradeSelectBoundsPageMktgSelectorData
      );
    });
  });

  it('should return the upgradeSelectBoundsPageMktgSelector used for the marketing data layer', () => {
    jest
      .spyOn(upgradeSelectBoundsPageMktgSelector, 'upgradeSelectBoundsPageMktgSelector')
      .mockReturnValue(upgradeSelectBoundsPageResponse);

    expect(dataLayerSelectorsForAirUpgrade[upgradeFareActionTypes.AIR_UPGRADE__FETCH_RESERVATION_SUCCESS]()).toEqual(
      upgradeSelectBoundsPageResponse
    );
  });
});
