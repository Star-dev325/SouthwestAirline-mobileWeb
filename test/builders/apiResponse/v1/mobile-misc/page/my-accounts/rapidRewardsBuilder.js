class RapidRewardsBuilder {
  constructor() {
    this.fullName = 'Ron Hackmann';
    this.rapidRewardsNumber = '600597056';
    this.spendablePoints = '33,476';
    this.tierEncouragement = 'MAINTAIN';
    this.currentTier = 'A_LIST_PREFERRED';
    this.showViewBenefitsLink = true;
    this.nextTier = null;
    this.tierPointsPercentageComplete = 21;
    this.tierPointsRequired = '70,000';
    this.tierPointsEarned = '15,000';
    this.tierFlightsPercentageComplete = 30;
    this.tierFlightsRequired = '50';
    this.tierFlightsFlown = '15';
    this.achieved = true;
    this.companionPointsPercentageComplete = 5;
    this.companionPassEncouragement = 'MAINTAIN';
    this.companionPointsRequired = '110,000';
    this.companionPointsEarned = '5,000';
    this.companionFlightsPercentageComplete = 50;
    this.companionFlightsRequired = '100';
    this.companionFlightsFlown = '50';
  }

  withClimbing() {
    this.tierEncouragement = 'CLIMBING';
    this.currentTier = 'NON_ELITE';
    this.showViewBenefitsLink = false;
    this.nextTier = 'A_LIST';
    this.tierPointsPercentageComplete = 40;
    this.tierPointsRequired = '35,000';
    this.tierPointsEarned = '14,000';
    this.tierFlightsPercentageComplete = 60;
    this.tierFlightsRequired = '25';
    this.tierFlightsFlown = '15';
    this.achieved = false;
    this.companionPassEncouragement = 'CLIMBING';
    this.companionPointsPercentageComplete = 5;
    this.companionPointsRequired = '110,000';
    this.companionPointsEarned = '5,000';
    this.companionFlightsPercentageComplete = 50;
    this.companionFlightsRequired = '100';
    this.companionFlightsFlown = '50';

    return this;
  }

  withMaintain() {
    return this;
  }

  withCongratulations() {
    this.tierEncouragement = 'CONGRATULATIONS';
    this.currentTier = 'A_LIST_PREFERRED';
    this.showViewBenefitsLink = true;
    this.tierPointsPercentageComplete = 100;
    this.tierPointsRequired = '70,000';
    this.tierPointsEarned = '71,000';
    this.tierFlightsPercentageComplete = 50;
    this.tierFlightsRequired = '100';
    this.tierFlightsFlown = '50';
    this.companionPassEncouragement = 'CONGRATULATIONS';
    this.companionPointsPercentageComplete = 100;
    this.companionPointsRequired = '110,000';
    this.companionPointsEarned = '111,000';
    this.companionFlightsPercentageComplete = 50;
    this.companionFlightsRequired = '100';
    this.companionFlightsFlown = '50';

    return this;
  }

  build() {
    return {
      rapidRewardsPage: {
        fullName: this.fullName,
        rapidRewardsNumber: this.rapidRewardsNumber,
        tier: {
          spendablePoints: this.spendablePoints,
          tierEncouragement: this.tierEncouragement,
          showViewBenefitsLink: this.showViewBenefitsLink,
          currentTier: this.currentTier,
          nextTier: this.nextTier,
          pointsDonutProgressBar: {
            percentageComplete: this.tierPointsPercentageComplete,
            pointsRequired: this.tierPointsRequired,
            pointsEarned: this.tierPointsEarned
          },
          flightsDonutProgressBar: {
            percentageComplete: this.tierFlightsPercentageComplete,
            flightsRequired: this.tierFlightsRequired,
            flightsFlown: this.tierFlightsFlown
          }
        },
        companionPass: {
          achieved: this.achieved,
          companionPassEncouragement: this.companionPassEncouragement,
          pointsDonutProgressBar: {
            percentageComplete: this.companionPointsPercentageComplete,
            pointsRequired: this.companionPointsRequired,
            pointsEarned: this.companionPointsEarned
          },
          flightsDonutProgressBar: {
            percentageComplete: this.companionFlightsPercentageComplete,
            flightsRequired: this.companionFlightsRequired,
            flightsFlown: this.companionFlightsFlown
          }
        }
      }
    };
  }
}

module.exports = RapidRewardsBuilder;
