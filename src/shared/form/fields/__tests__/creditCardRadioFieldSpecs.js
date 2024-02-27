import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import CreditCardRadioField from 'src/shared/form/fields/creditCardRadioField';

const sinon = sinonModule.sandbox.create();

describe('CreditCardRadioField', () => {
  let onCheckStub;
  let wrapper;

  afterEach(() => {
    sinon.restore();
  });

  context('edit mode', () => {
    it('should call onCheck when in edit mode and click the credit card', () => {
      wrapper = createComponent({
        editMode: true
      });

      click(wrapper.find('SavedCreditCardRadioInput'));

      expect(onCheckStub).to.have.been.calledWith('someId');
    });

    it('should call onCheck when in edit mode and click the check box', () => {
      wrapper = createComponent({
        editMode: true
      });

      click(wrapper.find('CheckboxButton'));

      expect(onCheckStub).to.have.been.calledWith('someId');
    });

    it('should hide component if hidden prop is provided', () => {
      wrapper = createComponent({
        hidden: true
      });
      expect(wrapper.find('.hide')).to.exist;
    });

    context('disabled', () => {
      beforeEach(() => {
        wrapper = createComponent({
          editMode: true,
          disabled: true
        });
      });

      it('should not display check box', () => {
        expect(wrapper.find('CheckboxButton')).to.not.exist;
      });

      it('should not call onCheck when click the credit card', () => {
        click(wrapper.find('SavedCreditCardRadioInput'));

        expect(onCheckStub).to.have.not.been.called;
      });
    });
  });

  context('non edit mode', () => {
    it('should update selected credit card id when click the credit card', () => {
      wrapper = createComponent();

      click(wrapper.find('SavedCreditCardRadioInput'));

      expect(wrapper.find('CreditCardRadioField')).to.have.prop('value', 'someId');
    });

    context('disabled', () => {
      beforeEach(() => {
        wrapper = createComponent({
          editMode: false,
          disabled: true
        });
      });

      it('should hide radio button', () => {
        expect(wrapper.find('input[type="radio"]')).to.not.exist;
      });

      it('should not update selected credit card id when click the credit card', () => {
        click(wrapper.find('SavedCreditCardRadioInput'));

        expect(wrapper.find('CreditCardRadioField')).to.have.prop('value', '');
      });
    });

    it('should hide radio button if showRadioButton is false', () => {
      wrapper = createComponent({
        editMode: false,
        disabled: false,
        showRadioButton: false
      });
      expect(wrapper.find('input[type="radio"]')).to.not.exist;
    });
  });

  function createComponent(props) {
    onCheckStub = sinon.stub();
    const MockedForm = createMockedForm(createMockedFormStore());
    const creditCard = {
      savedCreditCardId: 'someId',
      type: 'VISA',
      name: 'My Visa Card',
      lastFourDigits: '3945',
      isExpired: false
    };

    return mount(
      <MockedForm initialFormData={{ selectedCardId: '' }} onSubmit={() => {}}>
        <CreditCardRadioField name="selectedCardId" creditCard={creditCard} onCheck={onCheckStub} {...props} />
      </MockedForm>
    );
  }
});
