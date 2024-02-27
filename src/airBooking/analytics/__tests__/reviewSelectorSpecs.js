import { getReview as resultsSelector } from 'src/airBooking/analytics/reviewSelector';

describe('reviewSelector', () => {
  it('should return false for earlyBirdOptionSelected', () => {
    expect(resultsSelector({})).to.deep.equal({
      earlyBirdBasePriceCents: null,
      earlyBirdBasePriceInbound: null,
      earlyBirdBasePriceOutbound: null,
      earlyBirdEstimatedTotalCents: null,
      earlyBirdOptionSelected: false,
      earlyBirdOptionShown: false,
      purposeOfTravel: undefined
    });
  });

  it('should return true for earlyBirdOptionSelected', () => {
    const state = {
      app: {
        airBooking: {
          earlyBirdSelected: true
        },
        toggles: {
          EARLY_BIRD_AB_TESTING: true
        }
      }
    };

    expect(resultsSelector(state)).to.deep.equal({
      earlyBirdBasePriceCents: null,
      earlyBirdBasePriceInbound: null,
      earlyBirdBasePriceOutbound: null,
      earlyBirdEstimatedTotalCents: null,
      earlyBirdOptionSelected: true,
      earlyBirdOptionShown: false,
      purposeOfTravel: undefined
    });
  });
});
