import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('formDatePickerField', () => {
  let onSubmitStub;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when user select ', () => {
    it('should trigger onChange and update value on fieldModel properly', () => {
      const { container } = createComponent({
        fields: ['year', 'month']
      });

      fireEvent.change(container.querySelector('.date-selection-year select'), {
        preventDefault: jest.fn(),
        target: {
          value: '2010'
        }
      });
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        expireDate: '2010-10'
      });
    });
  });

  function createComponent(props) {
    onSubmitStub = jest.fn();
    const MockedForm = createMockedForm(createMockedFormStore());

    return render(
      <MockedForm initialFormData={{ expireDate: '2011-10' }} onSubmit={onSubmitStub}>
        <FormDatePickerField name="expireDate" {...props} />
      </MockedForm>
    );
  }
});
