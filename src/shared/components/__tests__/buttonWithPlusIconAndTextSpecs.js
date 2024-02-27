import _ from 'lodash';
import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

import ButtonWithPlusIconAndText from '../buttonWithPlusIconAndText';

context('ButtonWithPlusIconAndText', () => {
  let onButtonClick;

  beforeEach(() => {
    onButtonClick = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render using the button and icon components, with text', () => {
      const wrapper = createComponent();
      const Button = wrapper.find('Button');
      const Icon = wrapper.find('Icon');

      expect(Button).to.exist;
      expect(Button.length).to.equal(1);
      expect(Button.first()).to.have.props({
        className: 'button-with-plus-icon-and-text',
        color: 'grey',
        fluid: true,
        onClick: onButtonClick,
        size: 'large',
        type: 'button'
      });

      expect(Icon).to.exist;
      expect(Icon.length).to.equal(1);
      expect(Icon.first()).to.have.props({
        className: 'button-with-plus-icon-and-text--icon'
      });
      expect(Icon.first()).to.have.text('+');

      expect(wrapper.find('.button-with-plus-icon-and-text--text')).to.have.text('BUTTON_TEXT');
    });
  });

  context('disabled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createComponent({ disabled: true });
    });

    it('should render the button with the disabled attribute as true', () => {
      expect(wrapper.find('Button')).to.have.prop('disabled', true);
    });

    it('should not call the onClick method', () => {
      click(wrapper);

      expect(onButtonClick).to.have.not.been.called;
    });
  });

  context('click', () => {
    it('should call the onClick property provided when clicked', () => {
      const wrapper = createComponent();

      click(wrapper);

      expect(onButtonClick).to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      disabled: false,
      onClick: onButtonClick
    };
    const finalProps = _.merge({}, defaultProps, props);

    return mount(<ButtonWithPlusIconAndText {...finalProps}>BUTTON_TEXT</ButtonWithPlusIconAndText>);
  };
});
