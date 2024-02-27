import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import LoginButton from 'src/shared/components/loginButton';

const sinon = sandbox.create();

describe('LoginButton', () => {
  let loginButton;

  afterEach(() => {
    sinon.restore();
  });

  context('when user is logged in', () => {
    let onLogoutClickStub;

    beforeEach(() => {
      onLogoutClickStub = sinon.stub();
      loginButton = renderLoginButton({ isLoggedIn: true, onLogoutClick: onLogoutClickStub });
    });

    it('should display log out', () => {
      expect(loginButton).contains.text('Log out');
    });

    it('should trigger onLogoutClick callback when user click the button', () => {
      click(loginButton);

      expect(onLogoutClickStub).have.been.called;
    });
  });

  context('when user is logged out', () => {
    let onLoginClickStub;

    beforeEach(() => {
      onLoginClickStub = sinon.stub();
      loginButton = renderLoginButton({
        isLoggedIn: false,
        onLoginClick: onLoginClickStub,
        transitionToSimpleLoginForm: true
      });
    });

    it("should display 'Log in'", () => {
      expect(loginButton).contains.text('Log in');
    });

    it('should trigger onLoginClick callback when user click the button', () => {
      click(loginButton);

      expect(onLoginClickStub).have.been.calledWith({ transitionToSimpleLoginForm: true });
    });
  });

  const renderLoginButton = (props) => mount(<LoginButton {...props} />);
});
