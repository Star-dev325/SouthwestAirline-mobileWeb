import upgradedFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const { AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS } = upgradedFareActionTypes;

const defaultState = {};
const upgradeFarePagePlacement = (state = defaultState, action = {}) => {
  switch (action.type) {
    case AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS: {
      const promoTop01 = toDynamicPlacement(action.response, 'promoTop01');

      return { promoTop01 };
    }
    default:
      return state;
  }
};

export default upgradeFarePagePlacement;
