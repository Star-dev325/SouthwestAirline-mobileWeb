import { fireEvent, render } from '@testing-library/react';
import i18n from '@swa-ui/locale';
import React from 'react';
import { GlobalHeader } from 'src/shared/components/globalHeader';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { untilAssertPass } from 'test/unit/helpers/waitFor';

describe('GlobalHeader', () => {
  let onLoginClickStub;
  let onLogoutClickStub;
  let clickEditButtonFnStub;
  let clickCancelButtonFnStub;
  let onLogoClickStub;
  let toggleDrawerFnStub;
  let refreshHomeNavMenuFnStub;

  beforeEach(() => {
    clickEditButtonFnStub = jest.fn();
    clickCancelButtonFnStub = jest.fn();
    onLoginClickStub = jest.fn();
    onLogoutClickStub = jest.fn();
    onLogoClickStub = jest.fn();
    refreshHomeNavMenuFnStub = jest.fn(WcmActions, 'refreshHomeNavMenuFn').mockRejectedValue({});
    toggleDrawerFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should display with Log in / Enroll button when initialize', () => {
      const { container } = createComponent();

      expect(container.querySelector('.header--row')).not.toBeNull();
      expect(container.querySelector('.icon_hamburger')).not.toBeNull();
      expect(container.querySelector('img')).not.toBeNull();
      expect(container.querySelector('.right-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__LOGIN_LONG'));
    });

    it('should display with Log in button ', () => {
      const { container } = createComponent({ buttonState: 'LOGIN_SHOW_SHORT_TEXT' });

      expect(container.querySelector('.right-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__LOGIN_SHORT'));
    });

    it('should display with Log out button', () => {
      const { container } = createComponent({ isLoggedIn: true });

      expect(container.querySelector('.right-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__LOGOUT'));
    });

    it('should display with edit button', () => {
      const { container } = createComponent({ buttonState: 'EDIT_SHOW_EDIT_TEXT' });

      expect(container.querySelector('.right-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__EDIT'));
    });

    it('should display with cancel button', () => {
      const { container } = createComponent({ buttonState: 'EDIT_SHOW_CANCEL_TEXT' });

      expect(container.querySelector('.right-btn').textContent).toEqual(i18n('SHARED__HEADER_BUTTON__CANCEL'));
    });

    it('should not display in web view', () => {
      const { container } = createComponent({ isWebView: true });

      expect(container.querySelector('div')).toBeNull();
    });
  });

  describe('click', () => {
    it('should call onLogoClick when click GlobalHeaderLogo', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.home-link'));

      expect(onLogoClickStub).toBeCalled();
    });

    describe('toggleDrawer', () => {
      describe('when isDrawerOpen is false', () => {
        it('should open the drawer when click hamburger icon and resolved refresh response', (done) => {
          const { container } = createComponent();

          fireEvent.click(container.querySelector('.icon_hamburger'));

          untilAssertPass(() => {
            expect(toggleDrawerFnStub).toBeCalled();
            expect(refreshHomeNavMenuFnStub).toBeCalled();
          }, done);
        });

        it('should open the drawer when click hamburger icon and failed refresh response', (done) => {
          refreshHomeNavMenuFnStub.mockResolvedValue(Promise.reject());

          const { container } = createComponent();

          fireEvent.click(container.querySelector('.icon_hamburger'));

          untilAssertPass(() => {
            expect(toggleDrawerFnStub).toBeCalled();
            expect(refreshHomeNavMenuFnStub).toBeCalled();
          }, done);
        });
      });

      describe('when isDrawerOpen is true', () => {
        it('should open the drawer when click hamburger icon', () => {
          const { container } = createComponent({ isDrawerOpen: true });

          fireEvent.click(container.querySelector('.icon_hamburger'));

          expect(toggleDrawerFnStub).toBeCalled();
        });
      });
    });

    it('should call onLoginClick when click Login button', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.login-btn'));

      expect(onLoginClickStub).toBeCalled();
    });

    it('should call onLogoutClick when click Logout button', () => {
      const { container } = createComponent({ isLoggedIn: true });

      fireEvent.click(container.querySelector('.login-btn'));

      expect(onLogoutClickStub).toBeCalled();
    });

    it('should call clickEditButton when click edit button', () => {
      const { container } = createComponent({ buttonState: 'EDIT_SHOW_EDIT_TEXT' });

      fireEvent.click(container.querySelector('.edit-btn'));

      expect(clickEditButtonFnStub).toBeCalled();
    });

    it('should call clickCancelButton when click cancel button', () => {
      const { container } = createComponent({ buttonState: 'EDIT_SHOW_CANCEL_TEXT' });

      fireEvent.click(container.querySelector('.edit-btn'));

      expect(clickCancelButtonFnStub).toBeCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      isLoggedIn: false,
      buttonState: 'LOGIN_SHOW_LONG_TEXT',
      showGlobalHeader: true,
      isWebView: false,
      isDrawerOpen: false,
      onLoginClick: onLoginClickStub,
      onLogoutClick: onLogoutClickStub,
      clickEditButtonFn: clickEditButtonFnStub,
      clickCancelButtonFn: clickCancelButtonFnStub,
      onLogoClick: onLogoClickStub,
      toggleDrawerFn: toggleDrawerFnStub,
      refreshHomeNavMenuFn: refreshHomeNavMenuFnStub
    };

    const finalProps = { ...defaultProps, ...props };

    return render(<GlobalHeader {...finalProps} />);
  };
});
