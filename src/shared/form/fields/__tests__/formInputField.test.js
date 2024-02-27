import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';
import FormInputField from 'src/shared/form/fields/formInputField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('FormInputField', () => {
  let onChangeStub;
  let onSubmitStub;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('style', () => {
    it('should have form field container when usingNativeStyle is passed', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      expect(container.querySelector('.form-field--container')).not.toBeNull();
    });

    it('should not have form field container when usingNativeStyle is not passed', () => {
      const { container } = createComponent({ usingNativeStyle: false });

      expect(container.querySelector('.form-field--container')).toBeNull();
    });
  });

  describe('when invalid', () => {
    it('should show error message', () => {
      const { container } = createComponentWithInvalidState();

      expect(container.querySelector('.field--error-msg')).not.toBeNull();
    });

    it('should clear the value when focus', () => {
      const { container } = createComponentWithInvalidState();

      fireEvent.focus(container.querySelector('input'));
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({ name: '' });
    });

    it('should display red error exclamation icon when input field value is invalid', () => {
      const { container } = createComponentWithInvalidState({ showWarningIcon: true });

      expect(container).toMatchSnapshot();
    });

    it('should not display red error exclamation icon when input field value is invalid but noErrorIcon is true', () => {
      const { container } = createComponentWithInvalidState({ noErrorIcon: true });

      expect(container).toMatchSnapshot();
    });

    it('should display red error exclamation icon when usingNativeStyle is passed and input field value is invalid', () => {
      const { container } = createComponentWithInvalidState({ usingNativeStyle: true });

      expect(container.querySelector('.form-field--icon.icon-right .icon_exclamation-circle')).not.toBeNull();
    });

    it('should not display red error exclamation icon when usingNativeStyle is passed and input field value is valid', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      expect(container.querySelector('.form-field--icon.icon-right .icon_exclamation-circle')).toBeNull();
    });
  });

  describe('icon', () => {
    it('should display blue exclamation icon when input field is empty', () => {
      const { container } = createComponent({ showWarningIcon: true }, undefined, '');

      expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
    });

    it('should not display blue warning exclamation icon when input field is not empty', () => {
      const { container } = createComponent({ showWarningIcon: true });

      expect(container.querySelector('.icon_exclamantion-circle')).toBeNull();
    });

    it('should not display blue warning icon when showWarningIcon is not passed', () => {
      const { container } = createComponent(undefined, undefined, '');

      expect(container.querySelector('.icon_exclamantion-circle')).toBeNull();
    });

    it('should display blue warning exclamation icon when usingNativeStyle and showWarningIcon is passed', () => {
      const { container } = createComponent({ usingNativeStyle: true, showWarningIcon: true }, undefined, '');

      expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
    });

    it('should not display blue warning exclamation icon when usingNativeStyle is passed and showWarningIcon is not passed', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      expect(container.querySelector('.icon_exclamantion-circle')).toBeNull();
    });
  });

  describe('description', () => {
    it('should have description when usingNativeStyle and description is passed', () => {
      const { container } = createComponent({ usingNativeStyle: true, description: 'description' });

      expect(container.querySelector('.form-field--description')).not.toBeNull();
    });

    it('should not have description when usingNativeStyle is passed and description is not passed', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      expect(container.querySelector('.form-field--description')).toBeNull();
    });
  });

  describe('componentWillUnmount', () => {
    it('should not clear error when shouldClearErrorOnUnmount is false', () => {
      const clearErrorStub = jest.fn();
      const { unmount } = createComponentWithInvalidState({
        shouldClearErrorOnUnmount: false,
        clearError: clearErrorStub
      });

      unmount();

      expect(clearErrorStub).not.toHaveBeenCalled();
    });

    it('should clear error when shouldClearErrorOnUnmount is true', () => {
      const clearErrorStub = jest.fn();
      const { unmount } = createComponentWithInvalidState({
        shouldClearErrorOnUnmount: true,
        clearError: clearErrorStub
      });

      unmount();

      expect(clearErrorStub).toHaveBeenCalled();
    });
  });

  function createComponentWithInvalidState(props) {
    const validatorStub = jest
      .fn()
      .mockReturnValueOnce({ name: { type: FIELD_ERROR_MESSAGE, msg: 'something wrong' } })
      .mockReturnValueOnce({});
    const { container, unmount } = createComponent(props, {
      formValidator: () => validatorStub,
      defaultValues: () => ({
        name: ''
      })
    });

    fireEvent.submit(container.querySelector('form'));

    return { container, unmount };
  }

  function createComponent(props, formOptions, initialValue = 'init value') {
    onSubmitStub = jest.fn();
    onChangeStub = jest.fn();
    store = createMockedFormStore();

    const MockedForm = createMockedForm(store, formOptions);

    return render(
      <MockedForm initialFormData={{ name: initialValue }} onSubmit={onSubmitStub}>
        <FormInputField name="name" onChange={onChangeStub} {...props} />
      </MockedForm>
    );
  }
});
