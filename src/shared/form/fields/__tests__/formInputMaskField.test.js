import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FormInputMaskField from 'src/shared/form/fields/formInputMaskField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';

describe('FormInputMaskField', () => {
  let onFocusStub;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when initialize', () => {
    it('should render the mask element', () => {
      const { container } = createComponent();

      expect(container.querySelector('.mask-field')).not.toBeNull();
    });

    it('should render the mask element when value is null', () => {
      const props = {
        value: null,
        ...getMaskProps({ rule: '*', repeat: 4 })
      };
      const { container } = createComponent(null, props);

      expect(container.querySelector('.mask-field')).not.toBeNull();
    });
  });

  describe('when on focus', () => {
    it('should render the input element', () => {
      const { container } = createComponent();

      fireEvent.focus(container.querySelector('.mask-field input'));

      expect(container.querySelector('.mask-field')).toBeNull();
    });

    it('should clear value of input', () => {
      const { container } = createComponent('123456');

      fireEvent.focus(container.querySelector('.mask-field input'));

      expect(container.querySelector('input').value).toEqual('');
    });

    it('should invoke its focus callback', () => {
      const { container } = createComponent('123456');

      fireEvent.focus(container.querySelector('.mask-field input'));

      expect(onFocusStub).toHaveBeenCalled();
    });
  });

  describe('when on blur', () => {
    it('should display text with mask', () => {
      const { container } = createComponent('123456');
      const input = container.querySelector('.mask-field input');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '123456' } });
      fireEvent.blur(input);

      expect(input.value).toEqual('XX3456');
    });

    it('should display empty string when given text less than four characters', () => {
      const { container } = createComponent('123456');
      const input = container.querySelector('.mask-field input');

      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(input.value).toEqual('');
    });

    it('should display text with five masks when only given last four passport number', () => {
      const { container } = createComponent('1234');
      const input = container.querySelector('.mask-field input');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '1234' } });
      fireEvent.blur(input);

      expect(input.value).toEqual('XXXXX1234');
    });
  });

  function createComponent(initValue = '', props, formOptions) {
    const onChangeStub = jest.fn();
    const onSubmitStub = jest.fn();
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    onFocusStub = jest.fn();

    return render(
      <MockedForm formData={{ creditCard: initValue }} onSubmit={onSubmitStub}>
        <FormInputMaskField name="creditCard" onChange={onChangeStub} onFocus={onFocusStub} {...props} />
      </MockedForm>
    );
  }
});
