import React from 'react';
import { mount } from 'enzyme';
import Message from 'src/shared/components/message';

describe('Message', () => {
  let wrapper;

  it('should pass type check prop to icon when status is success', () => {
    wrapper = createComponent();

    expect(wrapper.find('Icon')).to.have.prop('type', 'check');
  });

  it('should pass error prop to icon when status is error', () => {
    wrapper = createComponent({ status: 'error' });

    expect(wrapper.find('Icon')).to.have.prop('type', 'exclamation');
  });

  it('should pass ic-info prop to icon when status is information', () => {
    wrapper = createComponent({ status: 'information' });

    expect(wrapper.find('Icon')).to.have.prop('type', 'ic-info');
  });

  const createComponent = (props, children) => {
    const defaultProps = {
      status: 'success',
      ...props
    };

    return mount(<Message {...defaultProps}>{children}</Message>);
  };
});
