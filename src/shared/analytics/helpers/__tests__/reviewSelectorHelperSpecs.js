import { buildReviewAnalyticsData } from 'src/shared/analytics/helpers/reviewSelectorHelper';
import earlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';

describe('reviewSelector', () => {
  const _analyticsDataB1 = {
    'air.fareTypeb1': 'WGA',
    'air.fareProductIdb1': 'WGA',
    'air.fareClassb1': 'W'
  };

  const _analyticsDataB2 = {
    'air.fareTypeb2': 'BUS',
    'air.fareProductIdb2': 'BUS',
    'air.fareClassb2': 'K'
  };

  it('should generate analytics review data for one way trip', () => {
    const { earlyBirdEligibility } = new earlyBirdInPathPricesBuilder().build();
    const _analyticsData = _analyticsDataB1;
    const review = buildReviewAnalyticsData(earlyBirdEligibility, 'PERSONAL', true, _analyticsData);

    expect(review).to.deep.equal({
      earlyBirdBasePriceCents: '15.00',
      earlyBirdEstimatedTotalCents: '15.00',
      earlyBirdOptionSelected: true,
      earlyBirdOptionShown: true,
      purposeOfTravel: 'PERSONAL',
      earlyBirdBasePriceOutbound: '15.00',
      earlyBirdBasePriceInbound: null,
      ..._analyticsData
    });
  });

  it('should generate analytics review data for round trip', () => {
    const { earlyBirdEligibility } = new earlyBirdInPathPricesBuilder().withRoundTripBounds().build();
    const _analyticsData = {
      ..._analyticsDataB1,
      ..._analyticsDataB2
    };
    const review = buildReviewAnalyticsData(earlyBirdEligibility, 'PERSONAL', true, _analyticsData);

    expect(review).to.deep.equal({
      earlyBirdBasePriceCents: '15.00',
      earlyBirdEstimatedTotalCents: '15.00',
      earlyBirdOptionSelected: true,
      earlyBirdOptionShown: true,
      purposeOfTravel: 'PERSONAL',
      earlyBirdBasePriceOutbound: '15.00',
      earlyBirdBasePriceInbound: '25.00',
      ..._analyticsData
    });
  });
});

it('should not add `_analytics` value to object if `_analytics` is undefined', () => {
  const { earlyBirdEligibility } = new earlyBirdInPathPricesBuilder().build();
  const _analyticsData = undefined;
  const review = buildReviewAnalyticsData(earlyBirdEligibility, 'PERSONAL', true, _analyticsData);

  expect(review).to.deep.equal({
    earlyBirdBasePriceCents: '15.00',
    earlyBirdEstimatedTotalCents: '15.00',
    earlyBirdOptionSelected: true,
    earlyBirdOptionShown: true,
    purposeOfTravel: 'PERSONAL',
    earlyBirdBasePriceOutbound: '15.00',
    earlyBirdBasePriceInbound: null
  });
});
