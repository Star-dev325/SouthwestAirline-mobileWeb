import React from 'react';
import { integrationMount } from 'test/unit/helpers/testUtils';
import WithFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import toggles from 'src/shared/featureToggle/featureToggleState';

describe('WithFeatureToggles', () => {
  const FakeComponent = () => <div />;
  let state;
  let wrapper;

  beforeEach(() => {
    state = { app: { toggles } };
    const WithFeatureTogglesComponent = WithFeatureToggles(FakeComponent);

    wrapper = integrationMount()(state, WithFeatureTogglesComponent, { hello: 'world' });
  });

  it('should pass toggles to component', () => {
    expect(wrapper.find('FakeComponent')).to.have.prop('toggles').equal(toggles);
  });

  it('should pass rest props to component', () => {
    expect(wrapper.find('FakeComponent')).to.have.prop('hello').equal('world');
  });
});
