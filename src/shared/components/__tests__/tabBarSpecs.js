import React from 'react';
import TabBar from 'src/shared/components/tabBar';
import Tab from 'src/shared/components/tab';
import { mount, shallow } from 'enzyme';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import { Provider } from 'react-redux';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('TabBar', () => {
  let store;
  let analyticsTrackViewTabFnStub;

  beforeEach(() => {
    store = mockStore({});
    analyticsTrackViewTabFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set the correct item active', () => {
    const instance = shallow(
      <TabBar activeKey={1} analyticsTrackViewTabFn={analyticsTrackViewTabFnStub}>
        <Tab eventKey={1}>Pill 1 content</Tab>
        <Tab eventKey={2}>Pill 2 content</Tab>
      </TabBar>
    );

    const items = instance.find(Tab);

    expect(items.at(0)).to.have.prop('active', true);
    expect(items.at(1)).to.have.prop('active', false);
  });

  describe('analytics', () => {
    it('should track the initially active tab', () => {
      shallow(
        <TabBar activeKey={'first'} onSelect={() => {}} analyticsTrackViewTabFn={analyticsTrackViewTabFnStub}>
          <Tab eventKey={1}>Tab 1 content</Tab>
          <Tab eventKey={2}>
            <span>Tab 2 content</span>
          </Tab>
        </TabBar>
      );

      expect(analyticsTrackViewTabFnStub).to.have.been.called;
    });

    it('should track when a tab becomes active', () => {
      const instance = shallow(
        <TabBar activeKey={1} onSelect={() => {}} analyticsTrackViewTabFn={analyticsTrackViewTabFnStub}>
          <Tab eventKey={1}>Tab 1 content</Tab>
          <Tab eventKey={2}>
            <span>Tab 2 content</span>
          </Tab>
        </TabBar>
      );

      instance.setProps({ activeKey: 'first' });
      instance.instance().UNSAFE_componentWillUpdate({ activeKey: 'second' });

      expect(analyticsTrackViewTabFnStub).to.have.been.called;
    });
  });

  it('should adds variation class', () => {
    const instance = shallow(
      <TabBar justified activeKey={1} analyticsTrackViewTabFn={analyticsTrackViewTabFnStub}>
        <Tab eventKey={1}>Tab 1 content</Tab>
        <Tab eventKey={2}>Tab 2 content</Tab>
      </TabBar>
    );

    expect(instance.find('.nav--justified')).to.be.present();
  });

  it('should call on select when item is selected', (done) => {
    const handleSelect = (key) => {
      expect(key).to.be.equal(2);
      done();
    };

    const instance = mount(
      <Provider store={store}>
        <TabBar activeKey={1} onSelect={handleSelect} analyticsTrackViewTabFn={analyticsTrackViewTabFnStub}>
          <Tab eventKey={1}>Tab 1 content</Tab>
          <Tab eventKey={2}>
            <span>Tab 2 content</span>
          </Tab>
        </TabBar>
      </Provider>
    );

    instance.find('button').at(1).simulate('click');
  });
});
