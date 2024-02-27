// @flow
import React from 'react';
import numeral from 'numeral';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';
import PtsGroup from 'src/myAccount/components/ptsGroup';
import TierStatusGroup from 'src/myAccount/components/tierStatusGroup';
import Icon from 'src/shared/components/icon';
import {
  getTierStatusGroupLabel,
  shouldShowCongratulationForTier,
  getTierStatusByTierInfo
} from 'src/myAccount/helpers/rapidRewardsHelper';
import i18n from '@swa-ui/locale';
import { changeDateFormat } from 'src/shared/helpers/dateHelper';

import type { RapidRewardsDetailsType, RapidRewardsTierInfoType } from 'src/shared/flow-typed/shared.types';

type Props = {
  rapidRewardsDetails: ?RapidRewardsDetailsType,
  promotionsAvailable: number,
  endOfYearInfo: {
    endOfYearFlag: boolean,
    endOfYearContent: string
  },
  onRapidRewardsPanelClick: () => void,
  onBenefitLinkClick: () => void,
  onExclusivePromptClick: () => void,
  IsExclusivePromotionsHidden: boolean
};

const RapidRewardsPanelEnrolled = (props: Props) => {
  const _getCongratulationMessage = (rapidRewardsTierInfo: RapidRewardsTierInfoType) => (
    <div>
      <div className="mb3">
        <Icon type="check" className="green" />
        <span className="bold not-italic">{i18n('MY_ACCOUNT__CONGRATULATIONS')}</span>
      </div>
      {getTierStatusGroupLabel(rapidRewardsTierInfo)}
    </div>
  );

  const {
    rapidRewardsDetails,
    promotionsAvailable,
    endOfYearInfo,
    onRapidRewardsPanelClick,
    onBenefitLinkClick,
    onExclusivePromptClick,
    IsExclusivePromotionsHidden
  } = props;

  if (!rapidRewardsDetails) return null;

  const { tierInfo } = rapidRewardsDetails;
  const { tierEndDate } = tierInfo;
  const { companionPassExpirationDate } = rapidRewardsDetails.companionPassInfo;
  const { companionPassAchieved } = rapidRewardsDetails.companionPassInfo;
  const tierEndDateFormatted = changeDateFormat(tierEndDate, 'YYYY-MM-DD', 'MM/DD/YY');
  const companionPassExpirationDateFormatted = changeDateFormat(companionPassExpirationDate, 'YYYY-MM-DD', 'MM/DD/YY');
  const tierStatus = getTierStatusByTierInfo(tierInfo);
  const showEndOfYear = endOfYearInfo && endOfYearInfo.endOfYearFlag;
  const spendablePoints = numeral(Number(rapidRewardsDetails.redeemablePoints)).format('0,0');

  return (
    <MyAccountPanel heading="Rapid Rewards" notEnrolled={false}>
      <Segments>
        {showEndOfYear ? (
          <div className="px5 py4" data-qa="end-of-year-message">
            {endOfYearInfo.endOfYearContent}
          </div>
        ) : (
          <Segment verticalFill data-qa="my-account-panel--rapid-rewards-dashboard">
            <Segments>
              <Segments className="pts-group">
                <Segment horizontalFill>
                  <PtsGroup
                    label={tierStatus.current.label}
                    spendablePoints={spendablePoints}
                    onBenefitsClick={onBenefitLinkClick}
                    expirationDate={tierEndDateFormatted}
                  />
                </Segment>
                {companionPassAchieved && companionPassExpirationDateFormatted && (
                  <Segment className="segment-border-top" horizontalFill>
                    <PtsGroup
                      label={i18n('MY_ACCOUNT__COMPANION_PASS')}
                      expirationDate={companionPassExpirationDateFormatted}
                    />
                  </Segment>
                )}
              </Segments>
              <Segment className="segment-border-top" horizontalFill>
                <MyAccountNavItem onClick={onRapidRewardsPanelClick}>
                  <TierStatusGroup
                    type="tier"
                    label={
                      shouldShowCongratulationForTier(tierInfo)
                        ? _getCongratulationMessage(tierInfo)
                        : getTierStatusGroupLabel(tierInfo)
                    }
                    pts={{
                      current: tierInfo.tierQualifyingPoints,
                      total: tierStatus.next.points
                    }}
                    flights={{
                      current: tierInfo.tierQualifyingFlights,
                      total: tierStatus.next.flights
                    }}
                  />
                  <small className="gray4">
                    {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TIER_STATUS_FOOTNOTE')}
                  </small>
                  <br />
                  <small className="ml2 gray4">
                    {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__TIER_STATUS_RESET')}
                  </small>
                </MyAccountNavItem>
              </Segment>
            </Segments>
          </Segment>
        )}
        {!IsExclusivePromotionsHidden && (
          <Segment verticalFill>
            <MyAccountNavItem data-qa="exclusive-promotions-item" onClick={onExclusivePromptClick}>
              <b>{promotionsAvailable}</b> {i18n('MY_ACCOUNT__RAPID_REWARDS_PANEL_ENROLLED__EXCLUSIVE_PROMOTIONS')}
            </MyAccountNavItem>
          </Segment>
        )}
      </Segments>
    </MyAccountPanel>
  );
};

export default RapidRewardsPanelEnrolled;
