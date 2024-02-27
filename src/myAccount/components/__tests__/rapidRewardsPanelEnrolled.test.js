import { render } from '@testing-library/react';
import React from 'react';
import RapidRewardsPanelEnrolled from 'src/myAccount/components/rapidRewardsPanelEnrolled';

describe('RapidRewardsPanelEnrolled', () => {
  const rapidRewardsDetails = {
    redeemablePoints: 33476,
    chaseVisaRrEnrolled: false,
    isEnrolledInRapidRewards: true,
    tierInfo: {
      tier: 'A_LIST_PREFERRED',
      tierAchievedDate: '2014-11-09',
      tierQualifyingPoints: 75000,
      tierQualifyingFlights: 15,
      nextTierTargeted: 'N/A',
      nextTierQualifyingPointsRequired: 0,
      nextTierQualifyingFlightsRequired: 0,
      tierEndDate: '2021-12-31'
    },
    companionPassInfo: {
      companionPassAchieved: true,
      companionQualifyingPoints: 30000,
      companionQualifyingFlights: 70,
      companionDeclared: false,
      companionQualifyingPointsRequired: '125000',
      companionQualifyingFlightsRequired: '100',
      companionPassExpirationDate: '2021-12-31'
    }
  };

  describe('when you have achieved A-List Preferred this year', () => {
    it('should render', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('end of year message', () => {
    it('should render end of year info when endOfYearFlag is true', () => {
      const { container } = createComponent({
        rapidRewardsDetails,
        promotionsAvailable: 0,
        endOfYearInfo: {
          endOfYearFlag: true,
          endOfYearContent: 'when have the end of year message'
        }
      });

      expect(container.querySelector('[data-qa="end-of-year-message"]').textContent).toContain(
        'when have the end of year message'
      );
    });

    it('should not render end of year info when endOfYearFlag is false', () => {
      const { container } = createComponent({
        rapidRewardsDetails,
        promotionsAvailable: 0,
        endOfYearInfo: {
          endOfYearFlag: false,
          endOfYearContent: ''
        }
      });

      expect(container.querySelector('[data-qa="end-of-year-message"]')).toBeNull();
    });
  });

  describe('when hide exclusive promotions is true', () => {
    it('should not show exclusive promotions', () => {
      const { container } = createComponent({
        rapidRewardsDetails,
        promotionsAvailable: 0,
        IsExclusivePromotionsHidden: true
      });

      expect(container.querySelector('[data-qa="exclusive-promotions-item"]')).toBeNull();
    });
  });

  describe('when hide exclusive promotions is false', () => {
    it('should show exclusive promotions', () => {
      const { container } = createComponent({
        rapidRewardsDetails,
        promotionsAvailable: 0,
        IsExclusivePromotionsHidden: false
      });

      expect(container.querySelector('[data-qa="exclusive-promotions-item"]')).not.toBeNull();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      rapidRewardsDetails,
      promotionsAvailable: 0,
      endOfYearInfo: {
        endOfYearFlag: false,
        endOfYearContent: 'when have the end of year message'
      },
      onRapidRewardsPanelClick: () => {},
      onBenefitLinkClick: () => {},
      onExclusivePromptClick: () => {},
      IsExclusivePromotionsHidden: true
    };

    return render(<RapidRewardsPanelEnrolled {...defaultProps} {...props} />);
  };
});
