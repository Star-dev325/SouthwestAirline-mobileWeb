import _ from 'lodash';

import upgradedFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { flattenUpgradeBounds, updateSelectedPricingData } from 'src/airUpgrade/helpers/airUpgradeSelectBoundsHelper';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';

const { AIR_UPGRADE__FETCH_RESERVATION_SUCCESS, AIR_UPGRADE__CHANGE_SELECTED_BOUND, AIR_UPGRADE__SAVE_UPGRADE_TYPE } =
  upgradedFareActionTypes;

const defaultState = {
  viewUpgradeReservationPage: {}
};

export const upgradeFareResponse = (state = defaultState, action = {}) => {
  switch (action.type) {
    case AIR_UPGRADE__FETCH_RESERVATION_SUCCESS: {
      const viewUpgradeReservationPage = _.cloneDeep(action.response.viewUpgradeReservationPage);

      const { boundSelectionDataList, upgradeablePricingDataList: pricingDataList } = flattenUpgradeBounds(
        _.cloneDeep(viewUpgradeReservationPage.upgradeBounds)
      );

      _.unset(viewUpgradeReservationPage, 'upgradeBounds');
      _.set(viewUpgradeReservationPage, 'boundSelectionDataList', boundSelectionDataList);
      _.set(viewUpgradeReservationPage, 'pricingDataList', pricingDataList);

      return { viewUpgradeReservationPage };
    }

    case AIR_UPGRADE__CHANGE_SELECTED_BOUND: {
      const pricingDataList = updateSelectedPricingData(
        _.cloneDeep(state.viewUpgradeReservationPage.pricingDataList),
        action.boundData
      );

      return _.merge({}, state, { viewUpgradeReservationPage: { pricingDataList } });
    }

    case AIR_UPGRADE__SAVE_UPGRADE_TYPE: {
      return _.values(AIR_UPGRADE_FARE_OPTIONS).includes(action.upgradeType)
        ? _.merge({}, state, { upgradeType: action.upgradeType })
        : _.merge({}, state, { upgradeType: AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS });
    }

    default:
      return state;
  }
};

export default upgradeFareResponse;
