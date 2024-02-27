import { fireEvent, render } from '@testing-library/react';
import numeral from 'numeral';
import React from 'react';
import Input from 'src/shared/components/input';
import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';
import withField from 'src/shared/form/enhancers/withField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('withField', () => {
  let store;
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
    store = createMockedFormStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const submitForm = (container) => {
    fireEvent.submit(container.querySelector('form'));
  };

  const enterText = (container, text) => {
    fireEvent.change(container.querySelector('input'), { target: { value: text } });
  };

  describe('register and unregister', () => {
    it('submitted form data should only contain the registed fields', () => {
      const { container } = createComponent({ name: 'fieldName' });

      submitForm(container);

      expect(onSubmitStub).toHaveBeenCalledWith({
        fieldName: '100.00'
      });
    });
  });

  describe('format and parse', () => {
    it('should format the value when pass it to inputs', () => {
      const mockFormat = jest.fn().mockReturnValue(100);

      createComponent(
        { name: 'fieldName' },
        { format: mockFormat }
      );

      expect(mockFormat).toHaveBeenCalledWith('100.00');
    });

    it('should parse the value when pass it to form', () => {
      const mockFormat = jest.fn().mockReturnValue(100);
      const mockParse = jest.fn().mockReturnValue(200);
      const { container } = createComponent(
        { name: 'fieldName' },
        {
          format: mockFormat,
          parse: mockParse
        }
      );

      enterText(container, { target: { value: '200' } });
      submitForm(container);

      expect(onSubmitStub).toHaveBeenCalledWith({ fieldName: 200 });
    });
  });

  describe('validation errors', () => {
    it('should render an error message', () => {
      const { container } = createComponent(
        { name: 'fieldName' },
        { parse: (event) => event.target.value }
      );

      enterText(container, 'Some invalid text');
      submitForm(container);

      expect(container).toMatchSnapshot();
    });

    it('should clear error message when update the field value', () => {
      const { container } = createComponent(
        { name: 'fieldName' },
        { parse: (event) => event.target.value }
      );

      enterText(container, 'Some invalid text');
      submitForm(container);
      enterText(container, '100');

      expect(container).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should trigger onChange event when the field component has onChange prop and value changed', () => {
      const onChangeStub = jest.fn();
      const { container } = createComponent(
        {
          name: 'field',
          onChange: onChangeStub
        },
        {
          parse: (event) => numeral(event.target.value).format('0.00')
        }
      );

      enterText(container, '200');

      expect(onChangeStub).toHaveBeenCalledWith('200.00');
    });
  });

  function createComponent(fieldProps = {}, options = {}) {
    const MockedInput = (props) => <Input {...props} />;
    const ConnectedField = withField(options)(MockedInput);

    const isNumber = (value) => typeof numeral(value).value() === 'number';
    const MockedForm = createMockedForm(store, {
      formValidator: () => (formData) =>
        (isNumber(formData.fieldName) ? {} : { fieldName: { type: FIELD_ERROR_MESSAGE, msg: 'Field must be a number' } })
    });

    return render(
      <MockedForm onSubmit={onSubmitStub} initialFormData={{ fieldName: '100.00' }}>
        <ConnectedField {...fieldProps} />
      </MockedForm>
    );
  }
});
