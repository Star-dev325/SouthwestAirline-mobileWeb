import chaseAnalyticsSelector from 'src/chase/analytics/chaseAnalyticsSelector';
import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';

describe('chaseSelector', () => {
  it('should return composed state', () => {
    const offerIdentifier = 'offerIdentifier';
    const acquisitionSourceCodes = 'acquisitionSourceCodes';
    const highValueIndicator = 'false';
    const chasebannershown = true;
    const chaseflowcompleted = true;
    const creditStatus = '';

    const state = {
      analytics: {
        ChaseAnalytics: {
          offers: { offerIdentifier, highValueIndicator, acquisitionSourceCodes },
          chasebannershown,
          chaseflowcompleted,
          creditStatus
        }
      }
    };

    const result = chaseAnalyticsSelector(state);

    expect(result).to.deep.equal({
      offerIdentifier,
      acquisitionSourceCodes,
      chasebannershown,
      chaseflowcompleted,
      creditStatus,
      highValueIndicator
    });
  });

  it('should return composed state with default values', () => {
    const state = { analytics: { ChaseAnalytics: undefined } };

    const result = chaseAnalyticsSelector(state);

    expect(result).to.deep.equal({
      offerIdentifier: DEFAULT_OFFERS.offerIdentifier,
      acquisitionSourceCodes: DEFAULT_OFFERS.acquisitionSourceCodes,
      highValueIndicator: DEFAULT_OFFERS.highValueIndicator,
      chasebannershown: false,
      chaseflowcompleted: false,
      creditStatus: ''
    });
  });
});
