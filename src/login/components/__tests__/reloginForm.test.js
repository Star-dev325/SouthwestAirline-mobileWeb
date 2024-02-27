import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ReloginFormComponent from 'src/login/components/reloginForm';

describe('ReloginForm', () => {
  let onSubmitMock;
  let continueAsGuestMock;
  let onValidationFailedMock;

  beforeEach(() => {
    onSubmitMock = jest.fn((value) => value);
    onValidationFailedMock = jest.fn();
    continueAsGuestMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render relogin form', () => {
      const { container } = createComponent();

      expect(container.querySelector('[name="sessionExpiredLogin"]')).toMatchSnapshot();
    });

    it('should not render continue as guest if callback function is empty', () => {
      const { container } = createComponent({ continueAsGuest: null });

      expect(container.querySelector('[name="sessionExpiredLogin"]')).toMatchSnapshot();
    });

    describe('when isAccountNumberEditable is true', () => {
      it('should render userNameOrAccountNumber FormInputField', () => {
        const { container } = createComponent({ isAccountNumberEditable: true }, true);

        expect(container.querySelector('[name="sessionExpiredLogin"]')).toMatchSnapshot();
      });
    });

    describe('when isReLoginPointsBooking is true', () => {
      it('should render userNameOrAccountNumber FormInputField', () => {
        const { container } = createComponent({ isReLoginPointsBooking: true }, true);

        expect(container.querySelector('.relogin-form--prompt-point-message')).toMatchSnapshot();
      });
    });
  });

  describe('when submit form', () => {
    it('should call submit when validate success', () => {
      const { container } = createComponent();

      fireEvent.change(container.querySelector('input[name="password"]'), { target: { value: 'Psd123456' } });
      fireEvent.click(container.querySelector('#login-btn'));

      expect(onSubmitMock).toHaveBeenCalledWith({
        password: 'Psd123456'
      });
    });

    it('should not call submit when validate failed', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('#login-btn'));

      expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it('should call continue as guest when click continue as guest link', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.continue-as-guest'));

      expect(continueAsGuestMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'RELOGIN_FORM',
      onSubmit: onSubmitMock,
      continueAsGuest: continueAsGuestMock,
      onValidationFailed: onValidationFailedMock,
      accountNumber: '601400143',
      isAccountNumberEditable: false
    };
    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <ReloginFormComponent {...finalProps} />
      </Provider>
    );
  };
});
