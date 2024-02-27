import _ from 'lodash';
import { UPDATE_FEATURE_TOGGLES, UPDATE_FEATURE_TOGGLE } from 'src/shared/featureToggle/featureToggleActionTypes';
import toggles from 'src/shared/featureToggle/featureToggleState';

export const togglesReducer = (state = toggles, action = {}) => {
  switch (action.type) {
    case UPDATE_FEATURE_TOGGLES:
      return _.cloneDeep(action.toggles);
    case UPDATE_FEATURE_TOGGLE:
      return _.assign({}, state, { [action.toggle]: action.isChecked });
    default:
      return state;
  }
};
