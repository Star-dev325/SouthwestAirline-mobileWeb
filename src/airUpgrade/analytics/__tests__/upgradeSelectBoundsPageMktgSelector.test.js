import _ from 'lodash';
import { upgradeSelectBoundsPageMktgSelector } from 'src/airUpgrade/analytics/upgradeSelectBoundsPageMktgSelector';
import { ANALYTICS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('upgradeSelectBoundsPageMktgSelector', () => {
  it('should merge mktg_data properties from CHAPI with hard coded analytics properties', () => {
    const mockMktgDataFromCHAPI = {
      test_mktg_data: 'mock data'
    };
    const mockState = _.set(
      {},
      'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.mktg_data',
      mockMktgDataFromCHAPI
    );
    const satelliteTrack = 'otter';
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE,
        ...mockMktgDataFromCHAPI
      },
      satelliteTrack,
      { page_name: ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE.page_name }
    ];
    const result = upgradeSelectBoundsPageMktgSelector(mockState);

    expect(result).toEqual(expectedResult);
  });
});
