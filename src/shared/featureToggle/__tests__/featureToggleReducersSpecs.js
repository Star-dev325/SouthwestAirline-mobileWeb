import { togglesReducer } from 'src/shared/featureToggle/featureToggleReducers';

describe('togglesReducer', () => {
  const state = {
    ToggleOne: false,
    ToggleTwo: false
  };

  it('should replace toggles when action type is UPDATE_FEATURE_TOGGLES', () => {
    const givenToggles = { ToggleOne: true };

    const updatedToggles = togglesReducer(state, { type: 'UPDATE_FEATURE_TOGGLES', toggles: givenToggles });

    expect(updatedToggles).to.deep.equal(givenToggles);
  });

  it('should update toggle when action type is UPDATE_FEATURE_TOGGLE', () => {
    const updateToggles = togglesReducer(state, {
      type: 'UPDATE_FEATURE_TOGGLE',
      toggle: 'ToggleOne',
      isChecked: true
    });

    expect(updateToggles).to.deep.equal({
      ToggleOne: true,
      ToggleTwo: false
    });
  });
});
