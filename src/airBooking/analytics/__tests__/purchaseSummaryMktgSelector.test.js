import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { purchaseSummaryMktgSelector } from 'src/airBooking/analytics/purchaseSummaryMktgSelector';

describe('purchaseSummaryMktgSelector', () => {
  const mktg_data = {
    eb_bound1_quota: 1,
    eb_bound2_quota: 0
  };

  it('should return an object for mktgData if "app.airBooking.purchaseSummaryPage.earlyBirdEligibility.mktg_data" does not exist', () => {
    const [mktgData] = purchaseSummaryMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return mktgData if "app.airBooking.purchaseSummaryPage.earlyBirdEligibility.mktg_data" exist', () => {
    const [mktgData] = purchaseSummaryMktgSelector({
      app: { airBooking: { purchaseSummaryPage: { earlyBirdEligibility: { mktg_data } } } }
    });

    expect(mktgData).toStrictEqual({ ...mktg_data, ...globalMktgState });
  });
});
