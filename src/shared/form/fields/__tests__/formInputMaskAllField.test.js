import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import FormInputMaskAllField from 'src/shared/form/fields/formInputMaskAllField';

import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';

describe('FormInputMaskAllField', () => {
  let onChangeStub;
  let onSubmitStub;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when invalid', () => {
    it('should show error message', () => {
      const { container } = createComponentWithInvalidState();

      expect(container).toMatchSnapshot();
    });

    it('should clear the value when focus', () => {
      const { container } = createComponentWithInvalidState();

      fireEvent.focus(container.querySelector('input'));
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({ name: '' });
    });

    it('should display red error exclamation icon when input field value is invalid', () => {
      const { container } = createComponentWithInvalidState({ showWarningIcon: true });

      expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
    });

    it('should not display red error exclamation icon when input field value is invalid but noErrorIcon is true', () => {
      const { container } = createComponentWithInvalidState({ noErrorIcon: true });

      expect(container.querySelector('.icon_exclamation-circle')).toBeNull();
    });
  });

  describe('icon', () => {
    it('should display blue exclamation icon when input field is empty', () => {
      const { container } = createComponent({ showWarningIcon: true }, undefined, '');

      expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
    });

    it('should not display blue warning exclamation icon when input field is not empty', () => {
      const { container } = createComponent({ showWarningIcon: true, value: '12345' });

      expect(container.querySelector('.icon_exclamation-circle')).toBeNull();
    });

    it('should not display blue warning icon when showWarningIcon is not passed', () => {
      const { container } = createComponent();

      expect(container.querySelector('.icon_exclamation-circle')).toBeNull();
    });

    it('should not have warning icon when input field is valid and showWarningIcon is false', () => {
      const { container } = createComponent({ showWarningIcon: false });

      expect(container.querySelector('.icon_exclamation-circle')).toBeNull();
    });
  });

  describe('masking', () => {
    it('should display masked value when input field is not empty', () => {
      const { container } = createComponent({ value: '1234' });

      expect(container.querySelector('.mask-field')).not.toBeNull();
    });

    it('should display unmasked value when field has focus', () => {
      const { container } = createComponent({ value: '123' });
      const input = container.querySelector('input');

      fireEvent.focus(input);

      expect(input.value).toEqual('123');
    });
  });

  describe('extra props', () => {
    it('should have extra props when extra props are passed into FormInputFieldMaskAll', () => {
      const { container } = createComponent({ type: 'tel' });

      expect(container.querySelector('input').type).toEqual('tel');
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
        <FormInputMaskAllField name="name" value="" maskChar="*" onChange={onChangeStub} {...props} />
      </MockedForm>
    );
  }
});
