import React from 'react';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { TabBarField } from 'src/shared/form/fields/tabBarField';
import createMockStore from 'test/unit/helpers/configureMockStore';
import { Provider } from 'react-redux';

const mockStore = createMockStore();

describe('TabBarField', () => {
  let analyticsTrackViewTabFnStub, onChangeStub, store, wrapper;

  beforeEach(() => {
    store = mockStore({});
    onChangeStub = jest.fn();
    analyticsTrackViewTabFnStub = jest.fn();
    wrapper = createComponent();
  });

  it('should render two tabs', () => {
    expect(wrapper.find('Tab')).toHaveLength(2);
  });

  it('should have correct props for TabBar', () => {
    expect(wrapper.find('TabBar').props()).toMatchObject({
      activeKey: 'tab two',
      justified: true,
      onSelect: onChangeStub
    });
  });

  it('should trigger onChange when select Tab', () => {
    click(wrapper.find('button').at(0));

    expect(onChangeStub).toHaveBeenCalledWith('tab one');
  });

  function createComponent(props = {}) {
    const defaultProps = {
      tabs: [
        {
          name: 'tab1',
          value: 'tab one'
        },
        {
          name: 'tab2',
          value: 'tab two'
        }
      ],
      name: 'tripType',
      value: 'tab two',
      onChange: onChangeStub,
      analyticsTrackViewTabFn: analyticsTrackViewTabFnStub,
      MWEB_HOMEPAGE_REDESIGN: false,
      clearError: () => {}
    };

    return mount(
      <Provider store={store}>
        <TabBarField {...defaultProps} {...props} />
      </Provider>
    );
  }
});
