import { upgradeIndexPageMktgSelector } from 'src/airUpgrade/analytics/upgradeIndexPageMktgSelector';
import { upgradeSelectBoundsPageMktgSelector } from 'src/airUpgrade/analytics/upgradeSelectBoundsPageMktgSelector';
import upgradeFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';

const { AIR_UPGRADE__FETCH_RESERVATION_SUCCESS, AIR_UPGRADE__UPGRADE_INDEX } = upgradeFareActionTypes;

export const dataLayerSelectorsForAirUpgrade = {
  [AIR_UPGRADE__UPGRADE_INDEX]: upgradeIndexPageMktgSelector,
  [AIR_UPGRADE__FETCH_RESERVATION_SUCCESS]: upgradeSelectBoundsPageMktgSelector
};
