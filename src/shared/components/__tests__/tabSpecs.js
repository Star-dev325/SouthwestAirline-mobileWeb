import React from 'react';
import Tab from 'src/shared/components/tab';
import { mount, shallow } from 'enzyme';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import { Provider } from 'react-redux';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('Tab', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add active class', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Tab active>Item content</Tab>
      </Provider>
    );

    expect(wrapper.find('.active')).to.be.present();
  });

  it('should add disabled class', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Tab disabled>Item content</Tab>
      </Provider>
    );

    expect(wrapper.find('.disabled')).to.be.present();
  });

  it('should call `onSelect` when item is selected', (done) => {
    const handleSelect = (key) => {
      expect(key).to.equal('2');
      done();
    };

    const wrapper = mount(
      <Provider store={store}>
        <Tab eventKey="2" onSelect={handleSelect}>
          <span>Item content</span>
        </Tab>
      </Provider>
    );

    wrapper.find('span').simulate('click');
  });

  it('should not call `onSelect` when item disabled and is selected', () => {
    const handleSelect = () => {
      throw new Error('onSelect should not be called');
    };

    const wrapper = mount(
      <Provider store={store}>
        <Tab disabled onSelect={handleSelect}>
          <span>Item content</span>
        </Tab>
      </Provider>
    );

    wrapper.find('button').simulate('click');
  });

  context('when MWEB_HOMEPAGE_REDESIGN is true', () => {
    it('should render nav--item_homepage-redesign', () => {
      const wrapper = shallow(
        <Tab active MWEB_HOMEPAGE_REDESIGN={true}>
          Item content
        </Tab>
      );

      expect(wrapper.find('.nav--item_homepage-redesign')).toMatchSnapshot();
    });
  });

  context('when MWEB_HOMEPAGE_REDESIGN is false', () => {
    it('should render nav--item', () => {
      const wrapper = shallow(
        <Tab active MWEB_HOMEPAGE_REDESIGN={false}>
          Item content
        </Tab>
      );

      expect(wrapper.find('.nav--item')).toMatchSnapshot();
    });
  });
});
