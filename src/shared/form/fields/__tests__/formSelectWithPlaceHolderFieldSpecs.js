import React from 'react';
import { mount } from 'enzyme';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import FormSelectWithPlaceHolderField from 'src/shared/form/fields/formSelectWithPlaceHolderField';

describe('FormSelectWithPlaceHolderField', () => {
  const selectOptions = [
    {
      label: 'label1',
      value: 'value1'
    },
    {
      label: 'label2',
      value: 'value2'
    }
  ];

  it('should only display placeholder after select the empty value', () => {
    const formSelectPlaceholderField = createComponent();

    expect(getPlaceHolder(formSelectPlaceholderField)).to.have.text('placeholder');
    expect(getFieldLabel(formSelectPlaceholderField)).to.have.text('');
  });

  it('should display another label when option selected', () => {
    const formSelectPlaceholderField = createComponent({ type: 'value2' });

    expect(getPlaceHolder(formSelectPlaceholderField)).to.have.text('placeholder');
    expect(getFieldLabel(formSelectPlaceholderField)).to.have.text('label2');
  });

  function createComponent(initialFormData = {}) {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store);

    return mount(
      <MockedForm initialFormData={initialFormData} onSubmit={() => {}}>
        <FormSelectWithPlaceHolderField name={'type'} options={selectOptions} placeholder={'placeholder'} />
      </MockedForm>
    );
  }

  function getPlaceHolder(formSelectPlaceholderField) {
    return formSelectPlaceholderField.find('.form-select-placeholder-field--wrapper-label').find('label').first();
  }

  function getFieldLabel(formSelectPlaceholderField) {
    return formSelectPlaceholderField.find('.form-select-placeholder-field--wrapper-label').find('label').last();
  }
});
