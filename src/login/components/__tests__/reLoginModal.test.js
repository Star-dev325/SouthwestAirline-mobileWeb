import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { ReLoginModal } from 'src/login/components/reLoginModal';
import * as HistoryHelper from 'src/shared/helpers/historyHelper';
import waitFor from 'test/unit/helpers/waitFor';
import * as OAuthApi from 'src/shared/api/oAuthApi';
import { RELOGIN_FORM } from 'src/shared/constants/formIds';
import i18n from '@swa-ui/locale';

describe('reLoginModal', () => {
  const mockPasswordWithSpecialCharacter = '123456%';
  const formData = { password: mockPasswordWithSpecialCharacter };
  const encodedFormData = { password: encodeURIComponent(mockPasswordWithSpecialCharacter) };
  const reLoginModalData = {
    reLoginLocation: '/',
    isActive: true,
    retryFunctions: [],
    reLoginModalOptions: {
      hasCancelButton: false,
      shouldRedirectToHomePage: false,
      isAccountNumberEditable: false
    },
    shouldRedirectToHomePage: true,
    reLoginCallbackFunctions: {}
  };
  let updateFormFieldDataValueFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let cleanUpEndOfSessionFnMock;
  let continueAsGuestFnMock;
  let postLoginCallbackFnMock;
  let cleanupReLoginModalFnMock;
  let loginFnMock;
  let pushMock;
  let setRetryFunctionsFnMock;
  let clearPasswordMock;
  let retryFailedCallsMock;
  let removeForbidUserClickBrowserBackMock;
  let hideReLoginFnMock;

  beforeEach(() => {
    updateFormFieldDataValueFnMock = jest.fn();
    removeForbidUserClickBrowserBackMock = jest.spyOn(HistoryHelper, 'removeForbidUserClickBrowserBack');
    pushMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    cleanupReLoginModalFnMock = jest.fn();
    cleanUpEndOfSessionFnMock = jest.fn();
    continueAsGuestFnMock = jest.fn();
    postLoginCallbackFnMock = jest.fn();
    loginFnMock = jest.fn().mockResolvedValue({});
    setRetryFunctionsFnMock = jest.fn();
    retryFailedCallsMock = jest.fn();
    clearPasswordMock = jest.fn();
    hideReLoginFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when render', () => {
    it('should render login form', () => {
      expect(createComponent({})).toMatchSnapshot();
    });

    it('should render null if reLoginModal object is null', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          isActive: false
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });

    it('should render if reLoginCallbackFunctions object is null', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          reLoginCallbackFunctions: null
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });

    it('should render cancel button if allowed', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          reLoginModalOptions: {
            hasCancelButton: true
          }
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });

    it('should not render cancel button', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          reLoginModalOptions: {
            hasCancelButton: false
          }
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });

    it('should render continue as guest if its allowed', () => {
      expect(createComponent({})).toMatchSnapshot();
    });

    it('should not render continue as guest if current location is not matched with stored location', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          reLoginLocation: 'different/url'
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });

    it('should not render continue as guest if continue as guest call back function is null', () => {
      const props = {
        reLoginModal: {
          ...reLoginModalData,
          reLoginCallbackFunctions: {
            continueAsGuestFn: null
          }
        }
      };

      expect(createComponent(props)).toMatchSnapshot();
    });
  });

  describe('when cancel', () => {
    it('should call appropriate functions when user hits cancel button', () => {
      const { getByText } = createComponent({
        reLoginModal: {
          ...reLoginModalData,
          reLoginModalOptions: {
            hasCancelButton: true
          }
        }
      });

      fireEvent.click(getByText(i18n('LOGIN__LOGIN_PAGE__CANCEL_BUTTON')));

      expect(cleanupReLoginModalFnMock).toHaveBeenCalled();
      expect(removeForbidUserClickBrowserBackMock).toHaveBeenCalled();
    });
  });

  describe('when continue as guest', () => {
    it('should call continue as guest if available', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      instance.current._continueAsGuest();

      expect(continueAsGuestFnMock).toHaveBeenCalledWith(true);
      expect(removeForbidUserClickBrowserBackMock).toHaveBeenCalled();
    });
  });

  describe('when submit the form', () => {
    describe('when isAccountNumberEditable is true', () => {
      it('should use the userNameOrAccountNumber', () => {
        const wrapper = createComponent(
          {
            reLoginModal: {
              reLoginModalOptions: {
                isAccountNumberEditable: true
              }
            }
          },
          true
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('should call login action with correct params', () => {
        const instance = React.createRef();

        createComponent({
          reLoginModal: {
            reLoginModalOptions: {
              isAccountNumberEditable: true
            }
          },
          ref: instance
        });
        const formDataWithUserNameOrAccountNumber = {
          ...formData,
          userNameOrAccountNumber: 'userNameOrAccountNumber'
        };

        instance.current._onSubmit(formDataWithUserNameOrAccountNumber);

        expect(cleanUpEndOfSessionFnMock).toHaveBeenCalled();
        expect(loginFnMock).toHaveBeenCalledWith({
          userNameOrAccountNumber: 'userNameOrAccountNumber',
          password: encodedFormData.password
        });
      });
    });

    it('should prefill the accountNumber from UserStore', () => {
      const wrapper = createComponent({});

      expect(wrapper).toMatchSnapshot();
    });

    it('should call login action with correct params', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      instance.current._onSubmit(formData);

      expect(cleanUpEndOfSessionFnMock).toHaveBeenCalled();
      expect(loginFnMock).toHaveBeenCalledWith({
        userNameOrAccountNumber: 'accountNumber',
        password: encodedFormData.password
      });
    });

    it('should clean failed password when login failed (_handlePromiseCatch)', (done) => {
      const instance = React.createRef();

      jest.spyOn(OAuthApi, 'login').mockRejectedValue(new Error('error'));
      createComponent({
        password: '123456',
        loginFn: jest.fn().mockRejectedValue({ error: 'error' }),
        ref: instance
      });

      instance.current._onSubmit(formData);
      instance.current._clearPassword = clearPasswordMock;

      expect(instance.current.state.isFetching).toBe(true);
      waitFor.untilAssertPass(() => {
        expect(clearPasswordMock).toHaveBeenCalled();
        expect(instance.current.state.isFetching).toBe(false);
        expect(instance.current.state.hasLoginError).toBe(false);
        expect(setReLoginCallbackFunctionsFnMock).not.toHaveBeenCalled();
      }, done);
    });

    it('should call updateFormFieldDataValueFnMock if it clears password function', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      instance.current._clearPassword();

      expect(updateFormFieldDataValueFnMock).toHaveBeenCalledWith(RELOGIN_FORM, 'password', '');
    });

    it('should not throw exception if reLoginCallbackFunctions is empty', () => {
      const instance = React.createRef();

      createComponent({
        reLoginModal: reLoginModalData,
        ref: instance
      });

      instance.current._onSubmit(formData);

      expect(loginFnMock).toHaveBeenCalled();
    });

    it('should clear callback functions if reLogin locations are not matched', () => {
      const instance = React.createRef();

      createComponent({
        reLoginModal: reLoginModalData,
        ref: instance
      });

      instance.current._onSubmit(formData);

      expect(loginFnMock).toHaveBeenCalled();
    });

    it('should handlePromiseFinally', () => {
      const instance = React.createRef();

      createComponent({ password: '123456', ref: instance });

      instance.current._handlePromiseFinally();

      expect(instance.current.state.hasLoginError).toBe(false);
      expect(instance.current.state.isFetching).toBe(false);
    });

    it('should cleanup callback functions if no login error', () => {
      const instance = React.createRef();

      createComponent({ password: '123456', ref: instance });

      instance.current.state.hasLoginError = false;
      instance.current._handlePromiseFinally();

      expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalledWith({});
      expect(instance.current.state.hasLoginError).toBe(false);
      expect(instance.current.state.isFetching).toBe(false);
    });
  });

  describe('when successful reLogin', () => {
    it('should retry failed calls then call post login actions and hide reLogin modal if exists and clear password', (done) => {
      const instance = React.createRef();

      createComponent({
        password: '123456',
        ref: instance
      });

      instance.current._clearPassword = clearPasswordMock;
      instance.current._retryFailedCalls = retryFailedCallsMock;
      instance.current._onSubmit(formData);

      waitFor.untilAssertPass(() => {
        expect(loginFnMock).toHaveBeenCalled();
        expect(retryFailedCallsMock).toHaveBeenCalled();
        expect(hideReLoginFnMock).toHaveBeenCalled();
        expect(clearPasswordMock).toHaveBeenCalled();
        expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
        expect(removeForbidUserClickBrowserBackMock).toHaveBeenCalled();
      }, done);
    });
  });

  const getDefaultProps = () => ({
    updateFormFieldDataValueFn: updateFormFieldDataValueFnMock,
    setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
    cleanUpEndOfSessionFn: cleanUpEndOfSessionFnMock,
    cleanupReLoginModalFn: cleanupReLoginModalFnMock,
    accountNumber: 'accountNumber',
    loginFn: loginFnMock,
    push: pushMock,
    reLoginModal: {
      reLoginLocation: '/',
      isActive: true,
      retryFunctions: [],
      reLoginModalOptions: {
        hasCancelButton: false,
        shouldRedirectToHomePage: false,
        isAccountNumberEditable: false
      },
      shouldRedirectToHomePage: true,
      reLoginCallbackFunctions: {
        continueAsGuestFn: continueAsGuestFnMock,
        postLoginCallbackFn: postLoginCallbackFnMock
      }
    },
    setRetryFunctionsFn: setRetryFunctionsFnMock,
    hideReLoginFn: hideReLoginFnMock
  });

  const createComponent = (props = {}) => {
    const defaultProps = getDefaultProps();
    const finalProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={createMockedFormStore()}>
          <ReLoginModal {...finalProps} />
        </Provider>
      </div>
    );
  };
});
