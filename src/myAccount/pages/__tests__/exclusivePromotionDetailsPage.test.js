import i18n from '@swa-ui/locale';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { ExclusivePromotionDetailsPage } from 'src/myAccount/pages/exclusivePromotionDetailsPage';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('ExclusivePromotionDetailsPage', () => {
  let hideDialogFnMock;
  let pushMock;
  let registerUserExclusivePromotionFnMock;
  let showDialogFnMock;

  beforeEach(() => {
    hideDialogFnMock = jest.fn();
    pushMock = jest.fn();
    registerUserExclusivePromotionFnMock = jest.fn().mockResolvedValue('');
    showDialogFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on mount', () => {
    it('if user is not logged in it push to login with a return pointed at promos list page', () => {
      createPageComponent({ isLoggedIn: false });

      expect(pushMock).toHaveBeenCalledWith('/login', null, { to: '/my-account/my-rapid-rewards/promotions' });
    });

    it('should play error popup if no WCM promo matches API response', () => {
      createPageComponent();

      expect(showDialogFnMock).toHaveBeenCalled();
      expect(showDialogFnMock.mock.calls[0][0]).toMatchObject({
        active: true,
        message: i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR_LATER'),
        name: 'promotion-id-can-not-match-wcm'
      });
    });

    it('should render appropriate components if WCM and API IDs match', () => {
      const { container } = createPageComponent({
        promotionSections: [
          {
            content: 'First content block with information',
            name: 'First Header'
          },
          {
            content: 'Second content block with information',
            name: 'Second Header'
          }
        ]
      });

      expect(container).toMatchSnapshot();
    });

    it('should render register button if isRegistered is false', () => {
      const { container } = createPageComponent({ isRegistered: false });

      expect(container.querySelector('.button--fluid')).not.toBeNull();
      expect(container.querySelector('.registered-mark')).toBeNull();
    });

    it('should render register icon if isRegistered is true', () => {
      const { container } = createPageComponent({ isRegistered: true });

      expect(container.querySelector('.button--fluid')).toBeNull();
      expect(container.querySelector('.registered-mark')).not.toBeNull();
    });
  });

  describe('on click', () => {
    it('register button should register promotion then change UI to show RegisteredMark', async () => {
      const mockProps = {
        hideDialogFn: hideDialogFnMock,
        isLoggedIn: true,
        isRegistered: false,
        promotionSections: [
          {
            content: 'First content block with information',
            name: 'First Header'
          },
          {
            content: 'Second content block with information',
            name: 'Second Header'
          }
        ],
        push: pushMock,
        registerLink: {
          body: {
            promotionId: '1-23456'
          },
          href: '/v1/mobile-misc/feature/my-account/register-promotion',
          method: 'POST'
        },
        registerUserExclusivePromotionFn: registerUserExclusivePromotionFnMock,
        showDialogFn: showDialogFnMock
      };
      const state = {};
      const { container, rerender } = createComponent(ExclusivePromotionDetailsPage, { state, props: mockProps });
      const store = createMockStoreWithRouterMiddleware()({});

      expect(container.querySelector('.button--fluid')).not.toBeNull();
      expect(container.querySelector('.registered-mark')).toBeNull();

      fireEvent.click(container.querySelector('.button--fluid'));

      expect(registerUserExclusivePromotionFnMock).toBeCalledWith({
        href: '/v1/mobile-misc/feature/my-account/register-promotion',
        method: 'POST',
        body: {
          promotionId: '1-23456'
        }
      });

      await registerUserExclusivePromotionFnMock;

      rerender(
        <Provider store={store}>
          <ExclusivePromotionDetailsPage {...mockProps} />
        </Provider>
      );

      expect(screen.getByText('MY_ACCOUNT__REGISTERED_MARK__REGISTERED')).not.toBeNull();
    });

    it('back button should push user to exclusive promos list', () => {
      const { container } = createPageComponent({
        promotionSections: [
          {
            content: 'First content block with information',
            name: 'First Header'
          },
          {
            content: 'Second content block with information',
            name: 'Second Header'
          }
        ]
      });

      fireEvent.click(container.querySelector('.goback-link'));

      expect(pushMock).toBeCalledWith('/my-account/my-rapid-rewards/promotions');
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      hideDialogFn: hideDialogFnMock,
      isLoggedIn: true,
      isRegistered: false,
      promotionSections: [],
      push: pushMock,
      registerLink: {
        body: {
          promotionId: '1-23456'
        },
        href: '/v1/mobile-misc/feature/my-account/register-promotion',
        method: 'POST'
      },
      registerUserExclusivePromotionFn: registerUserExclusivePromotionFnMock,
      showDialogFn: showDialogFnMock
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(ExclusivePromotionDetailsPage, { state, props: mergedProps });
  };
});
