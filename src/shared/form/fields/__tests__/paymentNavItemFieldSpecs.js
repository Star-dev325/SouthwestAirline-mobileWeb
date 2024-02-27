import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

const sinon = sinonModule.sandbox.create();

describe('paymentNavItemField', () => {
  let onSubmitStub;
  let onNavItemClickStub;
  let wrapper;

  afterEach(() => {
    sinon.restore();
  });

  context('when has value', () => {
    beforeEach(() => {
      wrapper = createComponent(
        {},
        {
          selectedCardId: '1-ENKS5K'
        }
      );
    });

    it('should display the value', () => {
      expect(wrapper.find('[data-qa="review-form--payment-method-nav-item"]')).to.contain.text('Last 4 digits: 9999');
    });

    it(`should display keyboard arrow right icon`, () => {
      wrapper = createComponent(
        {},
        {
          selectedCardId: '1-ENKS5K'
        }
      );

      expect(wrapper.find('.icon_keyboard-arrow-right')).to.exist;
    });
  });

  context('when value is empty', () => {
    it(`should display 'Add credit card'`, () => {
      wrapper = createComponent({}, '');

      expect(wrapper.find('[data-qa="review-form--payment-method-nav-item"]')).to.have.text('Select payment method');
    });

    it(`should display exclammation circle icon`, () => {
      wrapper = createComponent({}, '');

      expect(wrapper.find('.icon_exclamation-circle')).to.exist;
    });
  });

  function createComponent(props = {}, initialValue = {}, formOptions = {}) {
    onSubmitStub = sinon.stub();
    onNavItemClickStub = sinon.stub();
    const defaultProps = {
      navItemFieldClassName: '',
      onNavItemClick: onNavItemClickStub
    };
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={{ navItem: initialValue }} onSubmit={onSubmitStub}>
        <PaymentNavItemField
          name="navItem"
          savedCreditCards={new PaymentSavedCreditCardsBuilder().build()}
          {...defaultProps}
          {...props}
        />
      </MockedForm>
    );
  }
});
