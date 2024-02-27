import { upgradeIndexPageMktgSelector } from 'src/airUpgrade/analytics/upgradeIndexPageMktgSelector';
import { ANALYTICS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('upgradeIndexPageMktgSelector', () => {
  it('should merge mktg_data properties from CHAPI with hard coded analytics properties', () => {
    const satelliteTrack = 'otter';
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.UPGRADE_FARE_PAGE
      },
      satelliteTrack,
      { page_name: 'air-upgrade-index' }
    ];

    const result = upgradeIndexPageMktgSelector();

    expect(result).toEqual(expectedResult);
  });
});
