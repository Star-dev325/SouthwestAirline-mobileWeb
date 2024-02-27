import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import dynamicComponent from 'src/shared/helpers/dynamicComponent';

const mockComponentToggleOn = () => <div>toggle on</div>;
const mockComponentToggleOff = () => <div>toggle off</div>;

context('dynamic component', () => {
  it('should render toggle on component when toggle is on', () => {
    const wrapper = createComponent({ toggles: { SomeToggle: true } });

    expect(wrapper).to.have.text('toggle on');
  });

  it('should render toggle off component when toggle is off', () => {
    const wrapper = createComponent();

    expect(wrapper).to.have.text('toggle off');
  });

  function createComponent(toggles) {
    const store = configureMockStore()({ app: _.merge({ toggles: { SomeToggle: false } }, toggles) });
    const DynamicComponent = dynamicComponent(mockComponentToggleOn, mockComponentToggleOff, 'SomeToggle');

    return mount(
      <Provider store={store}>
        <DynamicComponent />
      </Provider>
    );
  }
});
