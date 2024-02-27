import React from 'react';
import { mount } from 'enzyme';
import RadioInput from 'src/shared/components/radioInput';

describe('RadioInput', () => {
  it('should have class name `radio-input`', () => {
    const wrapper = createComponent();

    expect(wrapper.find('div').first().hasClass('radio-input')).to.be.true;
  });

  it('should be active when clicked', () => {
    const wrapper = createComponent();

    expect(wrapper.find('.switch-button--item').first()).to.not.have.className('active');
    wrapper.find('.switch-button--item').first().simulate('click');
    wrapper.update();
    expect(wrapper.find('.switch-button--item').first()).to.have.className('active');
  });

  it('should show the radio input mark when backgroundColorSelection is false', () => {
    const wrapper = createComponent({ backgroundColorSelection: false });

    expect(wrapper.find('.radio-input--mark')).to.exist;
  });

  it('should hide the radio input mark when backgroundColorSelection is true', () => {
    const wrapper = createComponent({ backgroundColorSelection: true });

    expect(wrapper.find('.radio-input--mark')).to.not.exist;
  });

  it('should add primary blue color prop when backgroundColorSelection and active is true', () => {
    const wrapper = createComponent({ backgroundColorSelection: true });

    wrapper.find('.switch-button--item').first().simulate('click');

    expect(wrapper.find('Button').at(0)).to.have.props({
      color: 'primary-blue'
    });
    expect(wrapper.find('Button').at(1)).to.have.props({
      color: 'white'
    });
  });

  const createComponent = (props = {}) => {
    const options = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ];

    return mount(<RadioInput options={options} {...props} />);
  };
});
