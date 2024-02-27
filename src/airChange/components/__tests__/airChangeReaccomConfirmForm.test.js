import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AirChangeReaccomConfirmForm from 'src/airChange/components/airChangeReaccomConfirmForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('AirChangeReaccomConfirmForm', () => {
  describe('render', () => {
    it('should have confirm button', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should show email receipt field when needsEmailAddress is true', () => {
      const { container } = createComponent({ needsEmailAddress: true });

      expect(container).toMatchSnapshot();
    });
  });

  describe('submit', () => {
    it('should not call onSubmit if email is invalid', () => {
      const onSubmitMock = jest.fn();
      const { container } = createComponent(
        { needsEmailAddress: true, onSubmit: onSubmitMock },
        {
          fulfillmentEmail: 'test'
        }
      );
      const form = container.querySelector('form');

      fireEvent.submit(form);

      expect(onSubmitMock).not.toBeCalled();
    });

    it('should call onSubmit if email is valid', () => {
      const onSubmitMock = jest.fn();
      const { container } = createComponent(
        { needsEmailAddress: true, onSubmit: onSubmitMock },
        {
          fulfillmentEmail: 'test@mail.com'
        }
      );
      const form = container.querySelector('form');

      fireEvent.submit(form);

      expect(onSubmitMock).toBeCalled();
    });
  });

  const createComponent = (props = {}, initialFormData = {}) => {
    const defaultProps = {};
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <AirChangeReaccomConfirmForm initialFormData={initialFormData} {...mergedProps} />
      </Provider>
    );
  };
});
