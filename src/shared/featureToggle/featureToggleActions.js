import { UPDATE_FEATURE_TOGGLES, UPDATE_FEATURE_TOGGLE } from 'src/shared/featureToggle/featureToggleActionTypes';

export const updateToggles = (toggles) => ({
  type: UPDATE_FEATURE_TOGGLES,
  toggles
});

export const updateToggle = (toggle, isChecked) => ({
  type: UPDATE_FEATURE_TOGGLE,
  toggle,
  isChecked
});
