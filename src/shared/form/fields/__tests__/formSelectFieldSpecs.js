import sinonModule from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { submitForm, focus } from 'test/unit/helpers/enzymeFormTestUtils';
import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';

const sinon = sinonModule.sandbox.create();

describe('FormSelectField', () => {
  let onChangeStub;
  let onSubmitStub;
  let wrapper;
  let store;

  afterEach(() => {
    sinon.restore();
  });

  context('style', () => {
    it('should have form field container when usingNativeStyle is passed', () => {
      wrapper = createComponent({ usingNativeStyle: true });

      expect(wrapper.find('.form-field--container')).to.exist;
    });

    it('should not have form field container when usingNativeStyle is not passed', () => {
      wrapper = createComponent({ usingNativeStyle: false });

      expect(wrapper.find('.form-field--container')).to.not.exist;
    });
  });

  context('when invalid', () => {
    it('should show error message', () => {
      wrapper = createComponentWithInvalidState();

      expect(wrapper.find('FieldErrorMessage')).to.exist;
    });

    it('should clear the value when focus', () => {
      wrapper = createComponentWithInvalidState();

      focus(wrapper.find('select'));
      submitForm(wrapper);
      expect(onSubmitStub).to.have.been.calledWith({
        name: ''
      });
    });

    it('should display red error exclamation icon when usingNativeStyle is passed and select field value is invalid', () => {
      wrapper = createComponentWithInvalidState({ usingNativeStyle: true });

      expect(wrapper.find('.form-field--icon.icon-right').find('.icon_exclamation-circle')).to.exist;
    });

    it('should not display red error exclamation icon when usingNativeStyle is passed and select field value is valid', () => {
      wrapper = createComponent({ usingNativeStyle: true });

      expect(wrapper.find('.form-field--icon.icon-right').find('.icon_exclamation-circle')).to.not.exist;
    });
  });

  context('icon', () => {
    it('should display icon when usingNativeStyle and iconType is passed', () => {
      wrapper = createComponent({ usingNativeStyle: true, iconType: 'calender' });

      expect(wrapper.find('.form-field--icon').find('.icon')).to.exist;
    });

    it('should not display icon when usingNativeStyle is passed and iconType is not passed', () => {
      wrapper = createComponent({ usingNativeStyle: true });

      expect(wrapper.find('.form-field--icon').find('.icon')).to.not.exist;
    });

    it('should display blue warning exclamation icon when usingNativeStyle and showWarningIcon is passed', () => {
      wrapper = createComponent({ usingNativeStyle: true, showWarningIcon: true });

      expect(wrapper.find('.form-field--icon.icon-right').find('.icon_exclamation-circle.warning')).to.exist;
    });

    it('should not display blue warning exclamation icon when usingNativeStyle is passed and showWarningIcon is not passed', () => {
      wrapper = createComponent({ usingNativeStyle: true });

      expect(wrapper.find('.form-field--icon.icon-right').find('.icon_exclamation-circle.warning')).to.not.exist;
    });
  });

  function createComponentWithInvalidState(props) {
    const validatorStub = sinon.stub();

    validatorStub.onCall(0).returns({ name: { type: FIELD_ERROR_MESSAGE, msg: 'something wrong' } });
    validatorStub.onCall(1).returns({});
    wrapper = createComponent(props, {
      formValidator: () => validatorStub,
      defaultValues: () => ({
        name: ''
      })
    });

    submitForm(wrapper);

    return wrapper;
  }

  function createComponent(props, formOptions) {
    onSubmitStub = sinon.stub();
    onChangeStub = sinon.stub();
    store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);
    const defaultOptions = [
      { label: 'option1', value: '1' },
      { label: 'option2', value: '2' }
    ];

    return mount(
      <MockedForm initialFormData={{ name: 'init value' }} onSubmit={onSubmitStub}>
        <FormSelectField name="name" onChange={onChangeStub} options={defaultOptions} {...props} />
      </MockedForm>
    );
  }
});
