import i18n from '@swa-ui/locale';
import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { enrollOldRoutes, enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import { LoginPage } from 'src/login/pages/loginPage';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import RouterStore from 'src/shared/stores/routerStore';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import waitFor from 'test/unit/helpers/waitFor';

let loginAndGetAccountInfoFnMock;
let retrieveRapidRewardsInfoFnMock;
let loginFnMock;
let goBackMock;
let pushMock;
let replaceMock;
let updateFormFieldDataValueFnMock;
const testLoginData = {
  userNameOrAccountNumber: 'SomeUser1234',
  password: 'whatever22%',
  shouldRememberUser: false
};
const encodedTestLoginData = {
  userNameOrAccountNumber: 'SomeUser1234',
  password: encodeURIComponent('whatever22%'),
  shouldRememberUser: false
};

describe('Login Index', () => {
  beforeEach(() => {
    loginAndGetAccountInfoFnMock = jest.fn().mockResolvedValue({});
    retrieveRapidRewardsInfoFnMock = jest.fn().mockResolvedValue({});
    loginFnMock = jest.fn().mockResolvedValue({});
    goBackMock = jest.fn();
    pushMock = jest.fn();
    replaceMock = jest.fn();
    updateFormFieldDataValueFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('valid credentials', () => {
    beforeEach(() => {
      const basicAccountInfo = {
        customerInfo: {
          accountNumber: '610293923'
        }
      };

      AccountInfoHelper.rememberBasicAccountInfo(basicAccountInfo);
    });

    describe('when component is mounted', () => {
      it('should call retrieveRapidRewardsInfoFn', (done) => {
        const instance = React.createRef();

        createComponent({ ref: instance });

        waitFor.untilAssertPass(() => {
          expect(retrieveRapidRewardsInfoFnMock).toHaveBeenCalledTimes(1);
        }, done);
      });
    });

    describe('when came to log in from another page', () => {
      it('should go to the target page', (done) => {
        const instance = React.createRef();
        const props = {
          query: {
            to: '/check-in'
          }
        };

        createComponent({ ...props, ref: instance });

        instance.current._onSubmit(testLoginData);
        waitFor.untilAssertPass(() => {
          expect(loginFnMock).toHaveBeenCalledWith(encodedTestLoginData);
          expect(replaceMock).toHaveBeenCalledWith('/check-in');
        }, done);
      });
    });

    describe('when came to log in from blank', () => {
      it('should go to blank', (done) => {
        const instance = React.createRef();
        const props = {
          query: {
            to: '/'
          }
        };

        createComponent({ ...props, ref: instance });

        jest.spyOn(RouterStore, 'getPrevPath').mockReturnValue('/');
        instance.current._onSubmit(testLoginData);

        waitFor.untilAssertPass(() => {
          expect(loginFnMock).toHaveBeenCalledWith(encodedTestLoginData);
          expect(pushMock).toHaveBeenCalledWith('/');
        }, done);
      });
    });

    describe('and this is the first page we have visited', () => {
      it('should transition to the homepage', (done) => {
        const instance = React.createRef();

        createComponent({ ref: instance });

        jest.spyOn(RouterStore, 'getPrevPath').mockReturnValue('/');
        instance.current._onSubmit(testLoginData);

        waitFor.untilAssertPass(() => {
          expect(loginFnMock).toHaveBeenCalledWith(encodedTestLoginData);
          expect(pushMock).toHaveBeenCalledWith('/');
        }, done);
      });

      it('should encode a default empty password on submit', () => {
        const instance = React.createRef();
        const originalEncode = global.encodeURIComponent;

        createComponent({ ref: instance });

        global.encodeURIComponent = jest.fn();

        instance.current._onSubmit({ username: 'test' });

        expect(global.encodeURIComponent).toHaveBeenCalledWith('');

        global.encodeURIComponent = originalEncode;
      });
    });
  });

  describe('click enroll button', () => {
    it('should transition to the non-normalized enroll URL if the ENABLE_URL_NORMALIZATION toggle is false', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('button[name="enrollButton"]'));

      expect(pushMock).toHaveBeenCalledWith(enrollOldRoutes.index);
    });

    it('should transition to the normalized enroll URL if the ENABLE_URL_NORMALIZATION toggle is true', () => {
      const { container } = createComponent({ ENABLE_URL_NORMALIZATION: true });

      fireEvent.click(container.querySelector('button[name="enrollButton"]'));

      expect(pushMock).toHaveBeenCalledWith(enrollRoutes.index);
    });
  });

  describe('using simple login', () => {
    it('should not show rapid rewards or enroll button', () => {
      const { container } = createComponent({ isUsingSimpleLogin: true, isUsingSimpleLoginWithPoints: false });

      expect(container.querySelector('[data-qa="is-hidden-if-simple-login"]')).toBeFalsy;
      expect(container.querySelector('[data-qa="login-prompt"]')).toBeFalsy;
    });
  });

  describe('using simple login with points', () => {
    it('should show simple login with points message', () => {
      const { container } = createComponent({ isUsingSimpleLoginWithPoints: true });
      const loginText = i18n('LOGIN__USING_SIMPLE_LOGIN_WITH_POINTS');

      expect(container.querySelector('[data-qa="is-hidden-if-simple-login"]')).not.toBeNull();
      expect(screen.getByText(loginText)).not.toBeNull();
    });
  });

  describe('transferFunds', () => {
    it('should show header and prompt message', () => {
      createComponent({ isTransferFundsLogin: true });
      const loginPagePromptText = i18n('TRAVEL_FUNDS_LOGIN_PROMPT');
      const pageHeaderText = i18n('TRAVEL_FUNDS_LOGIN_TITLE');

      expect(screen.getByText(loginPagePromptText)).not.toBeNull();
      expect(screen.getByText(pageHeaderText)).not.toBeNull();
    });
  });

  const createComponent = (pageProps = {}) => {
    const defaultPageProps = {
      ENABLE_URL_NORMALIZATION: false,
      goBack: goBackMock,
      isTransferFundsLogin: false,
      isUsingSimpleLogin: false,
      isUsingSimpleLoginWithPoints: false,
      loginAndGetAccountInfoFn: loginAndGetAccountInfoFnMock,
      loginFn: loginFnMock,
      push: pushMock,
      query: {},
      replace: replaceMock,
      retrieveRapidRewardsInfoFn: retrieveRapidRewardsInfoFnMock,
      shouldRememberUser: false,
      updateFormFieldDataValueFn: updateFormFieldDataValueFnMock
    };

    const state = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };

    const finalProps = { ...defaultPageProps, ...pageProps };

    return render(
      <div>
        <Provider store={createMockedFormStore(state)}>
          <LoginPage {...finalProps} />
        </Provider>
      </div>
    );
  };
});
