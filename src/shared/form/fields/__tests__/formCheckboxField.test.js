import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('formCheckboxField', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  it('should render children inside formCheckboxField', () => {
    const props = { children: <p>Hello</p> };

    const { container } = createComponent(props);

    expect(container).toMatchSnapshot();
  });

  it('should make the checkbox be unchecked when no value was passed', () => {
    const { container } = createComponent();

    expect(container.querySelector('.checkbox-button_checked')).toBeNull();
  });

  it('should make the checkbox checked when value is true', () => {
    const { container } = createComponent({ value: true });

    expect(container.querySelector('.checkbox-button_checked')).not.toBeNull();
  });

  it('should be hidden when hidden prop is true', () => {
    const { container } = createComponent({ hidden: true });

    expect(container).toMatchSnapshot();
  });

  it('should trigger onChange when checkbox is clickableChildren and be clicked', () => {
    const { container } = createComponent({ clickableChildren: true });

    fireEvent.click(container.querySelector('.checkbox-button'));

    fireEvent.submit(container.querySelector('form'));

    expect(onSubmitStub).toHaveBeenCalledWith({ formCheckBox: true });
  });

  function createComponent(props = {}, formOptions = {}) {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return render(
      <MockedForm formData={{ formCheckBox: false }} onSubmit={onSubmitStub}>
        <FormCheckboxField name="formCheckBox" {...props} />
      </MockedForm>
    );
  }
});
