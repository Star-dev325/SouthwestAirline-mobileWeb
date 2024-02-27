import { updateToggles, updateToggle } from 'src/shared/featureToggle/featureToggleActions';

describe('featureToggleActions', () => {
  it('should create update toggles action', () => {
    const toggles = { ToggleOne: false, ToggleTwo: false };

    const updatedToggles = updateToggles(toggles);

    expect(updatedToggles).to.deep.equal({
      type: 'UPDATE_FEATURE_TOGGLES',
      toggles
    });
  });

  it('should create update toggle action', () => {
    const updatedToggle = updateToggle('ToggleOne', true);

    expect(updatedToggle).to.deep.equal({
      type: 'UPDATE_FEATURE_TOGGLE',
      toggle: 'ToggleOne',
      isChecked: true
    });
  });
});
