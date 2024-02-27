import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FormInputWithPlaceholderField from 'src/shared/form/fields/formInputWithPlaceholderField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('FormInputWithPlaceholderField', () => {
  let onChangeStub;
  let onSubmitStub;
  let store;

  describe('render placeholder and input field', () => {
    it('should not render label and render input with placeholder and value as empty when no value is specified', () => {
      const props = {
        name: 'RapidRewardsNumber',
        placeholder: 'Rapid Rewards / Acct#',
        value: ''
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should render label with placeholder and render input with value when a value is specified', () => {
      const props = {
        name: 'RapidRewardsNumber',
        placeholder: 'Rapid Rewards / Acct#',
        value: '123456'
      };
      const { container } = createComponent(props);

      expect(container).toMatchSnapshot();
    });

    it('should call onSubmit with value when field contains a value and clicked', () => {
      const { container } = createComponent();

      fireEvent.focus(container.querySelector('input'));
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({ name: 'init value' });
    });
  });

  function createComponent(props, formOptions) {
    onSubmitStub = jest.fn();
    onChangeStub = jest.fn();
    store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return render(
      <MockedForm initialFormData={{ name: 'init value' }} onSubmit={onSubmitStub}>
        <FormInputWithPlaceholderField name="name" placeholder="some placeholder" onChange={onChangeStub} {...props} />
      </MockedForm>
    );
  }
});
