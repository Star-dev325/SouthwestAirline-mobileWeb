import React from 'react';
import { mount } from 'enzyme';
import StandbyLink from 'src/shared/components/standbyLink';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();

describe('StandbyLink', () => {
  it('should use enhanced standby list label text if available', () => {
    const mockLabelText = 'enhanced label text';
    const wrapper = mount(<StandbyLink
      enhancedStandbyList={{ labelText: mockLabelText }}
      isNonRevPnr={false}
      onClickStandbyList={sandbox.stub()}
      viewStandbyList={{}}
    />);

    expect(wrapper.find('.standby-card--link').find('a')).to.have.text(mockLabelText);
  });

  it('should use the default text if enhanced standby list label is not available', () => {
    const wrapper = mount(<StandbyLink
      enhancedStandbyList={{}}
      isNonRevPnr={false}
      onClickStandbyList={sandbox.stub()}
      viewStandbyList={{}}
    />);

    expect(wrapper.find('.standby-card--link').find('a')).to.have.text('View standby list');
  });

  describe('onClickStandbyList', () => {
    it('should call onClickStandbyList once we click the standby link', () => {
      const onClickStandbyListStub = sandbox.stub();
      const wrapper = mount(<StandbyLink
        enhancedStandbyList={{}}
        isNonRevPnr={false}
        onClickStandbyList={onClickStandbyListStub}
        viewStandbyList={{}}
      />);

      wrapper.find('.standby-card--link').find('a').simulate('click');

      expect(onClickStandbyListStub).to.have.been.calledWith({
        isNonRevPnr: false,
        link: {},
        enhancedLink: {}
      });
    });
  });
});
