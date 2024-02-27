import sinonModule from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import FormRadioField from 'src/shared/form/fields/formRadioField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

describe('FormRadioField', () => {
  let onChangeStub;
  let onSubmitStub;
  let wrapper;
  let store;

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render label ', () => {
      wrapper = createComponent({ label: 'some label' });

      expect(wrapper.find('.form-radio-field--tips')).to.have.text('some label');
    });
  });

  context('click', () => {
    it('should react to click to change value ', () => {
      wrapper = createComponent({ label: 'some label' });

      click(wrapper.find('.form-radio-field--radio'));
      expect(onChangeStub).to.be.calledWith();

      click(wrapper.find('.form-radio-field--radio'));
      expect(onChangeStub).to.be.calledWith();
    });
  });

  function createComponent(props, formOptions) {
    onSubmitStub = sinon.stub();
    onChangeStub = sinon.stub();
    store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={{ name: 'init value' }} onSubmit={onSubmitStub}>
        <FormRadioField name="name" onChange={onChangeStub} {...props} />
      </MockedForm>
    );
  }
});
