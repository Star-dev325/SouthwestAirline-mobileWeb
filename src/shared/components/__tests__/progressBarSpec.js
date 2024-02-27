import React from 'react';
import { mount } from 'enzyme';
import ProgressBar from 'src/shared/components/progressBar';

describe('ProgressBar', () => {
  it('should have class name `progress`', () => {
    const wrapper = createComponent();

    expect(wrapper.find('div').first().hasClass('progress')).to.be.true;
  });

  it('should display value', () => {
    const wrapper = createComponent();
    const element = wrapper.find('.progress-bar');

    expect(element.props().style).to.have.property('width', '50%');
  });

  it('should display a dynamic value', () => {
    const wrapper = createComponent({ min: 10, max: 60 });
    const element = wrapper.find('.progress-bar');

    expect(element.props().style).to.have.property('width', '80%');
  });

  it('should display message for screen readers', () => {
    const wrapper = createComponent({ label: 'progress bar', srOnly: true });

    expect(wrapper.find('.sr-only').props().className).to.equal('sr-only');
    expect(wrapper.find('.progress-bar').text()).to.equal('progress bar');
  });

  const createComponent = (props = {}) => mount(<ProgressBar now={50} {...props} />);
});
