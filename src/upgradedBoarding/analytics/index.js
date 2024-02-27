import { upgradedBoardingPurchaseMktgSelector } from 'src/upgradedBoarding/analytics/upgradedBoardingPurchaseMktgSelector';
import { upgradedBoardingConfirmationMktgSelector } from 'src/upgradedBoarding/analytics/upgradedBoardingConfirmationMktgSelector';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';

const { UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS, UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS } =
  upgradedBoardingActionTypes;

export const dataLayerSelectorsForUpgradedBoarding = {
  [UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS]: upgradedBoardingPurchaseMktgSelector,
  [UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS]: upgradedBoardingConfirmationMktgSelector
};
