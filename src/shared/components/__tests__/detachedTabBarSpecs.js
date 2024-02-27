import React from 'react';
import sinonModule from 'sinon';
import { shallow } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import DetachedTabBar from 'src/shared/components/detachedTabBar';

const sinon = sinonModule.sandbox.create();

describe('DetachedTabBar', () => {
  const tabs = ['TAB1', 'TAB2'];

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    let wrapper;
    let onTabClickStub;

    beforeEach(() => {
      onTabClickStub = sinon.stub();
      wrapper = shallow(
        <DetachedTabBar tabs={tabs} active={0} onTabClick={onTabClickStub} analyticsTrackViewTabFn={() => {}} />
      );
    });

    it('should render two tab items', () => {
      expect(wrapper.find('.tab-bar-item')).to.have.length(2);
    });

    it('should call onTabClick when click tab item', () => {
      click(wrapper.find('.tab-bar-item').last());

      expect(onTabClickStub).to.have.been.calledWith(1);
    });
  });

  context('analytics', () => {
    let analyticsTrackViewTabFn;

    beforeEach(() => {
      analyticsTrackViewTabFn = sinon.stub();
    });

    it('should track the initially active tab', () => {
      shallow(
        <DetachedTabBar
          tabs={tabs}
          active={0}
          onTabClick={() => {}}
          analyticsTrackViewTabFn={analyticsTrackViewTabFn}
        />
      );

      expect(analyticsTrackViewTabFn).to.have.been.calledWith('TAB1');
    });

    it('should track when a tab becomes active', () => {
      const DetachedTabBarWrapper = shallow(
        <DetachedTabBar
          tabs={tabs}
          active={0}
          onTabClick={() => {}}
          analyticsTrackViewTabFn={analyticsTrackViewTabFn}
        />
      );

      DetachedTabBarWrapper.instance().UNSAFE_componentWillUpdate({ active: 1 });

      expect(analyticsTrackViewTabFn).to.have.been.calledWith('TAB2');
    });
  });
});
