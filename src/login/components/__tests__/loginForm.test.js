import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import LoginForm from 'src/login/components/loginForm';

describe('LoginForm', () => {
  let onSubmitMock;
  let onValidationFailedMock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
    onValidationFailedMock = jest.fn();
  });

  describe('render', () => {
    it('should render login form', () => {
      const { container } = createComponent();

      expect(container.getElementsByClassName('.login-form')).not.toBeNull();
    });

    describe('shouldRememberUser', () => {
      it('should show shouldRememberUser checkbox when it is NOT simple login', () => {
        const { container } = createComponent();

        expect(container.querySelector('[name="userNameOrAccountNumber"]')).not.toBeNull();
      });

      it('should now show shouldRememberUser checkbox when it is simple login', () => {
        const { container } = createComponent({ isUsingSimpleLogin: true });

        expect(container.querySelector('[name="userNameOrAccountNumber"]')).not.toBeNull();
      });
    });

    it('should now login help link', () => {
      const { queryByText } = createComponent();

      expect(queryByText('LOGIN__LOGIN_HELP')).not.toBeNull();
    });
  });

  describe('when form submit', () => {
    it('should call onSubmit when data is valid', () => {
      const { getByRole } = createComponent({
        initialFormData: {
          userNameOrAccountNumber: 'Yangjie',
          password: 'some password',
          shouldRememberUser: 'true'
        }
      });

      fireEvent.click(getByRole('submit'));

      expect(onSubmitMock).toHaveBeenCalledWith({
        userNameOrAccountNumber: 'Yangjie',
        password: 'some password',
        shouldRememberUser: 'true'
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'LOGIN_FORM',
      onSubmit: onSubmitMock,
      onValidationFailed: onValidationFailedMock,
      userNameOrAccountNumber: '',
      isUsingSimpleLogin: false,
      isUsingSimpleLoginWithPoints: false
    };
    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <LoginForm {...finalProps} />
      </Provider>
    );
  };
});
