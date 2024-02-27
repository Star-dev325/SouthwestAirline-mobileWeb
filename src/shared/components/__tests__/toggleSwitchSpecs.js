import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';

import ToggleSwitch from 'src/shared/components/toggleSwitch';

const sinon = sandbox.create();

describe('ToggleSwitch', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should render a Button', () => {
    const wrapper = mount(<ToggleSwitch />);

    expect(wrapper.find('Button')).to.exist;
  });

  it('should render with correct class', () => {
    const wrapper = mount(<ToggleSwitch />);

    expect(wrapper).to.have.className('toggle-switch');
  });

  it('should render with correct class when toggled on', () => {
    const wrapper = mount(<ToggleSwitch checked />);

    expect(wrapper).to.have.className('toggle-switch_checked');
    expect(wrapper.find('.toggle-switch--slider')).to.have.className('toggle-switch--slider_checked');
  });

  it('should render correctly when disabled props is true', () => {
    const wrapper = mount(<ToggleSwitch disabled />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should apply className prop', () => {
    const wrapper = mount(<ToggleSwitch className="custom-class" />);

    expect(wrapper).to.have.className('custom-class');
  });

  it('should apply sliderClassName prop', () => {
    const wrapper = mount(<ToggleSwitch sliderClassName="custom-class" />);

    expect(wrapper.find('.toggle-switch--slider')).to.have.className('custom-class');
  });

  it('should call onChange with correct checked value', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = mount(<ToggleSwitch onChange={onChangeSpy} />);

    wrapper.simulate('click');
    expect(onChangeSpy).to.have.been.calledWith(true);

    wrapper.setProps({ checked: true });
    wrapper.simulate('click');
    expect(onChangeSpy).to.have.been.calledWith(false);
  });

  it('should call onTransitionEnd', () => {
    const onTransitionEndSpy = sinon.spy();
    const wrapper = mount(<ToggleSwitch onTransitionEnd={onTransitionEndSpy} />);

    wrapper.find('.toggle-switch--slider').simulate('transitionEnd', { propertyName: 'transform' });
    expect(onTransitionEndSpy).to.have.been.called;
  });
});
