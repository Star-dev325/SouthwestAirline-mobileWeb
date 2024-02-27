import RapidRewardsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/my-accounts/rapidRewardsBuilder';
import { transformToRapidRewardsPageUI } from 'src/myAccount/transformers/pageUITransformer';

describe('pageUITransformer', () => {
  context('transformToRapidRewardsPageUI', () => {
    it('should transform to Page UI View when current encouragement is CLIMBING', () => {
      const rapidRewardsApiResponse = new RapidRewardsBuilder().withClimbing().build();

      expect(transformToRapidRewardsPageUI(rapidRewardsApiResponse)).to.deep.equal({
        fullName: 'Ron Hackmann',
        rapidRewardsNumber: '600597056',
        ptsGroup: {
          label: 'Rapid Rewards Member',
          spendablePoints: '33,476',
          showViewBenefitsLink: false
        },
        tier: {
          showCongratulations: false,
          title: {
            preString: 'Climbing towards',
            status: 'A-List',
            sufString: '.'
          },
          pointsDonutProgressBar: {
            percentageComplete: 40,
            pointsRequired: '35,000',
            pointsEarned: '14,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 60,
            flightsRequired: '25',
            flightsFlown: '15'
          }
        },
        companionPass: {
          showCongratulations: false,
          title: {
            preString: 'Climbing towards',
            status: 'Companion Pass',
            sufString: '.'
          },
          shouldCallToAddOrChangeCompanion: false,
          pointsDonutProgressBar: {
            percentageComplete: 5,
            pointsRequired: '110,000',
            pointsEarned: '5,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 50,
            flightsRequired: '100',
            flightsFlown: '50'
          }
        }
      });
    });

    it('should transform to Page UI View when current encouragement is MAINTAIN', () => {
      const rapidRewardsApiResponse = new RapidRewardsBuilder().withMaintain().build();

      expect(transformToRapidRewardsPageUI(rapidRewardsApiResponse)).to.deep.equal({
        fullName: 'Ron Hackmann',
        rapidRewardsNumber: '600597056',
        ptsGroup: {
          label: 'A-List Preferred',
          spendablePoints: '33,476',
          showViewBenefitsLink: true
        },
        tier: {
          showCongratulations: false,
          title: {
            preString: 'Maintain your',
            status: 'A-List Preferred',
            sufString: ' status.'
          },
          pointsDonutProgressBar: {
            percentageComplete: 21,
            pointsRequired: '70,000',
            pointsEarned: '15,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 30,
            flightsRequired: '50',
            flightsFlown: '15'
          }
        },
        companionPass: {
          showCongratulations: false,
          title: {
            preString: 'Earn your next',
            status: 'Companion Pass',
            sufString: '.'
          },
          shouldCallToAddOrChangeCompanion: true,
          pointsDonutProgressBar: {
            percentageComplete: 5,
            pointsRequired: '110,000',
            pointsEarned: '5,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 50,
            flightsRequired: '100',
            flightsFlown: '50'
          }
        }
      });
    });

    it('should transform to Page UI View when current encouragement is CONGRATULATIONS', () => {
      const rapidRewardsApiResponse = new RapidRewardsBuilder().withCongratulations().build();

      expect(transformToRapidRewardsPageUI(rapidRewardsApiResponse)).to.deep.equal({
        fullName: 'Ron Hackmann',
        rapidRewardsNumber: '600597056',
        ptsGroup: {
          label: 'A-List Preferred',
          spendablePoints: '33,476',
          showViewBenefitsLink: true
        },
        tier: {
          showCongratulations: true,
          title: {
            preString: "You're",
            status: 'A-List Preferred',
            sufString: '.'
          },
          pointsDonutProgressBar: {
            percentageComplete: 100,
            pointsRequired: '70,000',
            pointsEarned: '71,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 50,
            flightsRequired: '100',
            flightsFlown: '50'
          }
        },
        companionPass: {
          showCongratulations: true,
          title: {
            preString: "You've earned your",
            status: 'Companion Pass',
            sufString: '.'
          },
          shouldCallToAddOrChangeCompanion: true,
          pointsDonutProgressBar: {
            percentageComplete: 100,
            pointsRequired: '110,000',
            pointsEarned: '111,000'
          },
          flightsDonutProgressBar: {
            percentageComplete: 50,
            flightsRequired: '100',
            flightsFlown: '50'
          }
        }
      });
    });
  });
});
