import { mount } from 'enzyme';
import {
  getTierStatusByTierInfo,
  getTierStatusGroupLabel,
  getCongratulationForTier,
  getCompanionPassStatusGroupLabel,
  getCongratulationForCompanionPass
} from 'src/myAccount/helpers/rapidRewardsHelper';

describe('Rapid Rewards Helper', () => {
  context('getTierStatusByTierInfo', () => {
    let tierInfo;

    beforeEach(() => {
      tierInfo = {};
    });

    context('No Status', () => {
      beforeEach(() => {
        tierInfo.tier = 'NON_ELITE';
      });

      it('Current Tier should be Rapid Rewards Member', () => {
        const status = getTierStatusByTierInfo(tierInfo);

        expect(status.current.label).to.equal('Rapid Rewards Member');
      });

      it('Next tier should be A-List', () => {
        const status = getTierStatusByTierInfo(tierInfo);

        expect(status.next.label).to.equal('A-List');
        expect(status.next.points).to.equal(35000);
        expect(status.next.flights).to.equal(20);
      });

      it(`should show 'Climbing towards A-List.'`, () => {
        const span = mount(getTierStatusGroupLabel(tierInfo));
        const congratulationsSpan = getCongratulationForTier(tierInfo);

        expect(congratulationsSpan).to.be.null;
        expect(span).to.contain.text('Climbing towards A-List.');
      });
    });

    context('When tier status is A-List', () => {
      beforeEach(() => {
        tierInfo.tier = 'A_LIST';
      });

      context('Next Status', () => {
        it('should be A-List when status was earned last year', () => {
          tierInfo.tierQualifyingPoints = 13000;
          tierInfo.tierQualifyingFlights = 1;

          const status = getTierStatusByTierInfo(tierInfo);

          expect(status.next.label).to.equal('A-List');
          expect(status.next.points).to.equal(35000);
          expect(status.next.flights).to.equal(20);
        });

        it('should be A-List Preferred when status was earned this year', () => {
          tierInfo.tierQualifyingPoints = 50000;
          tierInfo.tierQualifyingFlights = 1;

          const status = getTierStatusByTierInfo(tierInfo);

          expect(status.next.label).to.equal('A-List Preferred');
          expect(status.next.points).to.equal(70000);
          expect(status.next.flights).to.equal(40);
        });
      });

      context('and Tier Qualifying Points are < 35,000 and Tier Qualifying Flights are < 25', () => {
        it(`should show 'Maintain your A-List status.'`, () => {
          tierInfo.tierQualifyingPoints = 33000;
          tierInfo.tierQualifyingFlights = 1;

          const span = mount(getTierStatusGroupLabel(tierInfo));
          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.be.null;
          expect(span).to.contain.text('Maintain your A-List status.');
        });
      });

      context('and Tier Qualifying Points are >= 35,000', () => {
        it(`should show 'Climbing towards A-List Preferred.'`, () => {
          tierInfo.tierQualifyingPoints = 35000;
          tierInfo.tierQualifyingFlights = 1;

          const span = mount(getTierStatusGroupLabel(tierInfo));
          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.be.null;
          expect(span).to.contain.text('Climbing towards A-List Preferred.');
        });
      });

      context('and Tier Qualifying Flights are >= 25', () => {
        it(`should show 'Climbing towards A-List Preferred.'`, () => {
          tierInfo.tierQualifyingPoints = 2000;
          tierInfo.tierQualifyingFlights = 25;

          const span = mount(getTierStatusGroupLabel(tierInfo));
          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.be.null;
          expect(span).to.contain.text('Climbing towards A-List Preferred.');
        });
      });
    });

    context('When tier status is A-List Preferred', () => {
      beforeEach(() => {
        tierInfo.tier = 'A_LIST_PREFERRED';
      });

      context('and Tier Qualifying Points >= 70,000', () => {
        it(`should show 'Congratulations! You're A-List Preferred.'`, () => {
          tierInfo.tierQualifyingPoints = 70000;
          tierInfo.tierQualifyingFlights = 1;

          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.not.be.null;

          const span = mount(getTierStatusGroupLabel(tierInfo));

          expect(span).to.contain.text(`You're A-List Preferred`);
        });
      });

      context('and Tier Qualifying Flights >= 50', () => {
        it(`should show 'Congratulations! You're A-List Preferred.'`, () => {
          tierInfo.tierQualifyingPoints = 1000;
          tierInfo.tierQualifyingFlights = 50;

          const span = mount(getTierStatusGroupLabel(tierInfo));
          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.not.be.null;
          expect(span).to.contain.text(`You're`);
        });
      });

      context('and Tier Qualifying Points < 70,000 and Tier Qualifying Flights < 50', () => {
        it(`should show 'Maintain your A-List Preferred Status.'`, () => {
          tierInfo.tierQualifyingPoints = 4000;
          tierInfo.tierQualifyingFlights = 1;

          const span = mount(getTierStatusGroupLabel(tierInfo));
          const congratulationsSpan = getCongratulationForTier(tierInfo);

          expect(congratulationsSpan).to.be.null;
          expect(span).to.contain.text(`Maintain your`);
        });
      });
    });
  });

  context('getCompanionPassStatusGroupLabel', () => {
    let companionPassInfo = {};

    beforeEach(() => {
      companionPassInfo = {
        companionQualifyingPoints: 120000,
        companionQualifyingFlights: 20,
        companionPassAchieved: true
      };
    });

    context('when companionPassAchieved is false', () => {
      beforeEach(() => {
        companionPassInfo.companionPassAchieved = false;
      });

      context(
        'and the Companion Pass Qualifying Points and Companion Pass Qualifying Flights are less than required',
        () => {
          it(`should show 'Climbing towards Companion Pass.' and should not show congratulations span.`, () => {
            companionPassInfo.companionQualifyingPoints = 0;
            const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));
            const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);

            expect(congratulationsSpan).to.be.null;
            expect(span).to.contain.text(`Climbing towards `);
          });
        }
      );

      context('and the Companion Pass Qualifying Points are greater than required', () => {
        it(`should show 'Congratulations! You've earned your Companion Pass.'`, () => {
          const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));
          const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);

          expect(congratulationsSpan).to.not.be.null;
          expect(span).to.contain.text(`You've earned your `);
        });
      });

      context('and the Companion Pass Qualifying Flights are greater than required', () => {
        it(`should show 'Congratulations! You've earned your Companion Pass.'`, () => {
          companionPassInfo.companionQualifyingPoints = 0;
          companionPassInfo.companionQualifyingFlights = 100;
          const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);
          const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));

          expect(congratulationsSpan).to.not.be.null;
          expect(span).to.contain.text(`You've earned your `);
        });
      });
    });

    context('when companionPassAchieved is true', () => {
      context(
        'and the Companion Pass Qualifying Points and Companion Pass Qualifying Flights are less than required',
        () => {
          it(`should show 'Earn your next Companion Pass.' and should not show congratulations span.`, () => {
            companionPassInfo.companionQualifyingPoints = 0;
            const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);
            const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));

            expect(congratulationsSpan).to.be.null;
            expect(span).to.contain.text(`Earn your next `);
          });
        }
      );

      context('and the Companion Pass Qualifying Points are greater than required', () => {
        it(`should show 'Congratulations! You've earned your Companion Pass.'`, () => {
          const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);
          const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));

          expect(congratulationsSpan).to.not.be.null;
          expect(span).to.contain.text(`You've earned your `);
        });
      });

      context('and the Companion Pass Qualifying Flights are greater than required', () => {
        it(`should show 'Congratulations! You've earned your Companion Pass.'`, () => {
          companionPassInfo.companionQualifyingPoints = 0;
          companionPassInfo.companionQualifyingFlights = 100;
          const congratulationsSpan = getCongratulationForCompanionPass(companionPassInfo);
          const span = mount(getCompanionPassStatusGroupLabel(companionPassInfo));

          expect(congratulationsSpan).to.not.be.null;
          expect(span).to.contain.text(`You've earned your `);
        });
      });
    });
  });
});
