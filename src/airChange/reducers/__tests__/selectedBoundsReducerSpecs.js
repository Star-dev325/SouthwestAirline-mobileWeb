import selectedBoundsReducer from 'src/airChange/reducers/selectedBoundsReducer';

describe('selectedBoundsReducer', () => {
  it('should return proper selected bounds', () => {
    const updatedState = selectedBoundsReducer(undefined, {
      selectedBounds: { secondbound: true },
      type: 'AIR_CHANGE__SAVE_SELECTED_BOUNDS'
    });

    expect(updatedState).to.deep.equal({
      secondbound: true
    });
  });

  it('should return default state when action is undefined', () => {
    expect(selectedBoundsReducer().secondbound).to.deep.equal(undefined);
  });
});
