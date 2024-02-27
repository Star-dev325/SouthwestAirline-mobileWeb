import { combineReducers } from 'redux';
import airUpgradeReducer from 'src/airUpgrade/reducers/airUpgradeReducer';
import upgradeSelectBoundsPage from 'src/airUpgrade/reducers/upgradeSelectBoundsReducer';
import upgradeFarePagePlacement from 'src/airUpgrade/reducers/upgradeFarePagePlacement';

export default combineReducers({
  airUpgradeReducer,
  upgradeSelectBoundsPage,
  upgradeFarePagePlacement
});
