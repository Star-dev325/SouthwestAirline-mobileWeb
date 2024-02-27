import { RAPID_REWARDS_PAGE } from 'src/myAccount/constants/myAccountConstants';

const {
  LABEL_MAP,
  STATUS_MAP,
  COMPANIONPASS_PRESTRING_MAP,
  TIER_PRESTRING_MAP,
  CLIMBING,
  MAINTAIN,
  CONGRATULATIONS,
  COMPANIONPASS,
  STATUS_WITH_DOT,
  DOT
} = RAPID_REWARDS_PAGE;

const _getTierStatus = (currentTier, nextTier, tierEncouragement) =>
  (tierEncouragement === CLIMBING ? STATUS_MAP[nextTier] : STATUS_MAP[currentTier]);

const _getPtsGroup = (tier) => {
  const { currentTier, spendablePoints, showViewBenefitsLink } = tier;

  return {
    label: LABEL_MAP[currentTier],
    spendablePoints,
    showViewBenefitsLink
  };
};

const _getTier = (tier) => {
  const { currentTier, nextTier, tierEncouragement } = tier;
  const tierPointsDonutProgressBar = tier.pointsDonutProgressBar;
  // TODO: change flightDonutProgressBar to flightsDonutProgressBar after api story MOB-5879
  const tierFlightsDonutProgressBar = tier.flightsDonutProgressBar;

  return {
    showCongratulations: tierEncouragement === CONGRATULATIONS,
    title: {
      preString: TIER_PRESTRING_MAP[tierEncouragement],
      status: _getTierStatus(currentTier, nextTier, tierEncouragement),
      sufString: tierEncouragement === MAINTAIN ? STATUS_WITH_DOT : DOT
    },
    pointsDonutProgressBar: {
      ...tierPointsDonutProgressBar
    },
    flightsDonutProgressBar: {
      ...tierFlightsDonutProgressBar
    }
  };
};

export const transformToRapidRewardsPageUI = (response) => {
  const { fullName, rapidRewardsNumber, tier, companionPass } = response.rapidRewardsPage;
  const { achieved, companionPassEncouragement } = companionPass;
  const companionPassPointsDonutProgressBar = companionPass.pointsDonutProgressBar;
  const companionPassFlightsDonutProgressBar = companionPass.flightsDonutProgressBar;

  return {
    fullName,
    rapidRewardsNumber,
    ptsGroup: _getPtsGroup(tier),
    tier: _getTier(tier),
    companionPass: {
      showCongratulations: companionPassEncouragement === CONGRATULATIONS,
      title: {
        preString: COMPANIONPASS_PRESTRING_MAP[companionPassEncouragement],
        status: COMPANIONPASS,
        sufString: DOT
      },
      shouldCallToAddOrChangeCompanion: achieved,
      pointsDonutProgressBar: {
        ...companionPassPointsDonutProgressBar
      },
      flightsDonutProgressBar: {
        ...companionPassFlightsDonutProgressBar
      }
    }
  };
};
