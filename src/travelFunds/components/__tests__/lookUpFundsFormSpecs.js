import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import sinonModule from 'sinon';

import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import LookUpFundsForm from 'src/travelFunds/components/lookUpFundsForm';

const sinon = sinonModule.sandbox.create();

describe('FundTypeSelector', () => {
  let onSubmitStub, wrapper;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
    wrapper = createComponent();
  });

  context('render', () => {
    it('should render input fields for each of the items in the formFields array', () => {
      expect(wrapper.find('input[name="fakeName"]')).to.exist;
      expect(wrapper.find('input[name="anotherFakeName"]')).to.exist;
    });

    it('should render a submit button with text from buttonText prop', () => {
      expect(wrapper.find('Button')).to.have.text('FAKE BUTTON');
    });

    it('should render special note if there is one', () => {
      wrapper = createComponent({ specialNote: 'Special note' });
      expect(wrapper.find('.look-up-funds-form--special-note')).to.exist;
      expect(wrapper.find('.look-up-funds-form--special-note')).to.have.text('Special note');
    });
  });

  context('submit', () => {
    it('should fire onSubmit prop when form is submitted', () => {
      submitForm(wrapper.find('Form'));

      expect(onSubmitStub).to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'FAKE_FORM_ID',
      formFields: [
        { fieldName: 'fakeName', placeholder: 'FAKE FIELD', type: 'number' },
        { fieldName: 'anotherFakeName', placeholder: 'ANOTHER FAKE FIELD', type: 'number' }
      ],
      buttonText: 'FAKE BUTTON',
      onSubmit: onSubmitStub,
      specialNote: null
    };

    return mount(
      <Provider store={createMockedFormStore()}>
        <LookUpFundsForm {...defaultProps} {...props} />
      </Provider>
    );
  };
});
