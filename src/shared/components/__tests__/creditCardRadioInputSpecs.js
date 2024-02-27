import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import sinonModule from 'sinon';
import CreditCardRadioInput from 'src/shared/components/creditCardRadioInput';

const sinon = sinonModule.sandbox.create();

describe('CreditCardRadioInput', () => {
  let wrapper;

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    beforeEach(() => {
      wrapper = createComponent({ selected: true }, <div>sample children</div>);
    });

    it('should display credit card image with given credit card type', () => {
      expect(wrapper.find('CreditCardImage')).to.have.prop('cardType', 'VISA');
    });

    it('should display credit card description when given cardDescription', () => {
      expect(wrapper.find('.credit-card-radio-input--text')).to.contain.text(`yangjie's visa card`);
    });

    it('should display children when there are children', () => {
      expect(wrapper).to.contain.text('sample children');
    });

    it('should display radio button as checked when selected', () => {
      expect(wrapper.find('.credit-card-radio-input input')).to.have.prop('checked', true);
      expect(wrapper.find('.credit-card-radio-input input')).to.have.prop('readOnly', true);
    });
  });

  context('click behaviour', () => {
    it('should call onClick with credit card id when click on the component', () => {
      const onClickStub = sinon.stub();

      wrapper = createComponent({
        onClick: onClickStub
      });

      wrapper.find('.credit-card-radio-input').simulate('click');

      expect(onClickStub).to.be.calledWith('1-ENKS4K');
    });
  });

  const createComponent = (props, children) => {
    const defaultProps = {
      name: `yangjie's visa card`,
      type: 'VISA',
      savedCreditCardId: '1-ENKS4K',
      selected: false,
      className: 'some-class-name',
      onClick: _.noop,
      showRadioButton: true
    };

    return mount(<CreditCardRadioInput {..._.merge(defaultProps, props)}>{children}</CreditCardRadioInput>);
  };
});
