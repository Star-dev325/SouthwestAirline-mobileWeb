import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import OpenedMenuListItem from 'src/homeAndNav/components/openedMenuListItem';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

describe('OpenedMenuListItem', () => {
  let onLinkClickMock;
  let onLogoutClickMock;

  beforeEach(() => {
    onLinkClickMock = jest.fn();
    onLogoutClickMock = jest.fn();
  });

  describe('render', () => {
    it('should show menu title', () => {
      const { container } = createComponent({});

      expect(container.querySelector('.menu-list-item--heading-title').textContent).toContain('menuTitle');
    });

    it('should show child list', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.flex-cross-center')).toHaveLength(1);
    });
  });

  describe('menu title', () => {
    it('should trigger onLinkClick when menuItem has link or routeName props', () => {
      const { container } = createComponent({});

      fireEvent.click(container.querySelector('.menu-list-item--heading'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });

    it('should set menu title className to titleClassName', () => {
      const titleClassName = 'title-class-name';

      const { container } = createComponent({
        menuItem: {
          menuTitle: 'menuTitle',
          titleClassName
        }
      });

      expect(container.querySelector(`.${titleClassName}`).textContent).toContain('menuTitle');
    });
  });

  describe('child list', () => {
    it('should render a link when child menu has `href` prop', () => {
      const { container } = createComponent();

      expect(container.querySelector('.flex-cross-center')).not.toBeNull();
    });

    it('should trigger onLinkClick when child menu does not have `href` prop', () => {
      const props = {
        menuItem: {
          childList: [
            {
              query: {
                int: 'GNAVBKCAR'
              },
              routeName: getNormalizedRoute({ routeName: 'index' }),
              title: 'Book a Car'
            }
          ]
        }
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.flex-cross-center'));

      expect(onLinkClickMock).toHaveBeenCalled();
    });

    it('should not trigger onLinkClick when child menu has `href` prop', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.flex-cross-center'));

      expect(onLinkClickMock).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    let menuWithLogout;

    beforeEach(() => {
      menuWithLogout = {
        active: false,
        childList: [],
        className: 'menu-list-item--heading-title-nav-normal-no-children',
        hideForGuest: true,
        hideForUsers: undefined,
        iconType: undefined,
        isAccordion: false,
        isExtrasMenu: true,
        menuTitle: 'Logout',
        routeName: 'logout',
        titleClassName: 'menu-list-item--heading-title-nav-normal-no-children'
      };
    });

    it('should render logout menu when user logged in and logout menu specified', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        menuItem: menuWithLogout
      });

      expect(container.querySelector('.login-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__LOGOUT'));
    });

    it('should call onLinkClick when user clicks Logout menu', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        menuItem: menuWithLogout
      });

      fireEvent.click(container.querySelector('.login-btn'));

      expect(container.querySelector('.login-btn').textContent).toContain(i18n('SHARED__HEADER_BUTTON__LOGOUT'));
      expect(onLogoutClickMock).toHaveBeenCalled();
      expect(onLinkClickMock).not.toHaveBeenCalled();
    });

    it('should not render logout menu when user is not logged in and logout menu specified', () => {
      const { container } = createComponent({
        isLoggedIn: false,
        menuItem: menuWithLogout
      });

      expect(container.querySelector('.login-btn')).toBeNull();
    });

    it('should not render logout menu when user logged in and logout menu not specified', () => {
      const { container } = createComponent({ isLoggedIn: true });

      expect(container.querySelector('.login-btn')).toBeNull();
    });

    it('should not render logout menu when user not logged in and logout menu not specified', () => {
      const { container } = createComponent({ isLoggedIn: false });

      expect(container.querySelector('.login-btn')).toBeNull();
    });
  });

  function createComponent(
    props = {
      menuItem: {
        childList: [
          {
            href: 'tel:1-800-435-9792',
            icon: 'call-us',
            title: 'Call us'
          }
        ]
      }
    }
  ) {
    const defaultProps = {
      className: '',
      isLoggedIn: false,
      menuItem: {
        isAccordion: false,
        menuTitle: 'menuTitle',
        routeName: 'contact'
      },
      onLinkClick: onLinkClickMock,
      onLogoutClick: onLogoutClickMock
    };
    const mergedProps = { ...defaultProps, ...props };

    return render(<OpenedMenuListItem {...mergedProps} />);
  }
});
