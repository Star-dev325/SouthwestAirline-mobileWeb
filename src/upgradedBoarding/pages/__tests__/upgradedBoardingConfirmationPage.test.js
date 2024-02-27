import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { UpgradedBoardingConfirmationPage } from 'src/upgradedBoarding/pages/upgradedBoardingConfirmationPage';
import upgradedBoardingConfirmationPageBuilder from 'test/builders/model/upgradedBoardingConfirmationPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('Upgraded Boarding Confirmation Page', () => {
  const upgradedBoardingConfirmationPageResponse = new upgradedBoardingConfirmationPageBuilder().build();
  let transitToBoardingPositionFnStub;
  let getUpgradedBoardingReservationFnStub;
  let exitWebViewFnStub;

  beforeEach(() => {
    transitToBoardingPositionFnStub = jest.fn();
    getUpgradedBoardingReservationFnStub = jest.fn(transitToBoardingPositionFnStub, 'then').mockResolvedValue('');
    exitWebViewFnStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('should render', () => {
    it('UpgradedBoardingConfirmationPage', () => {
      const { container } = createComponent({}, true);

      expect(container).toMatchSnapshot();
    });

    it('without Boarding details button when viewBoardingDetails value is falsy', () => {
      const { container } = createComponent(
        {
          upgradedBoardingConfirmationPageResponse: {
            ...upgradedBoardingConfirmationPageResponse,
            _links: {
              ...upgradedBoardingConfirmationPageResponse._links,
              viewBoardingDetails: undefined
            }
          }
        },
        true
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Done button functionality', () => {
    it('should push to homepage route', () => {
      const pushStub = jest.fn();
      const { container } = createComponent({ push: pushStub });
  
      fireEvent.click(container.querySelector('.button'));

      expect(pushStub).toHaveBeenCalledWith('/');
    });

    it('should call exitWebViewFn when in webview', () => {
      const { container } = createComponent({ isWebView: true, exitWebViewFn: exitWebViewFnStub });
 
      fireEvent.click(container.querySelector('.button'));

      expect(exitWebViewFnStub).toHaveBeenCalled();
    });
  });

  describe('Boarding details button', () => {
    it('should navigate to boarding passes page', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.ub-confirmation--boarding-details-button .button'));

      expect(getUpgradedBoardingReservationFnStub).toHaveBeenCalled();
    });

    it('should call exitWebViewFn when in webview', () => {
      const { container } = createComponent({ isWebView: true, exitWebViewFn: exitWebViewFnStub });

      fireEvent.click(container.querySelector('.ub-confirmation--boarding-details-button .button'));

      expect(exitWebViewFnStub).toHaveBeenCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      isWebView: false,
      transitToBoardingPositionFn: transitToBoardingPositionFnStub,
      getUpgradedBoardingReservationFn: getUpgradedBoardingReservationFnStub,
      upgradedBoardingConfirmationPageResponse,
      exitWebViewFn: () => {},
      push: () => {}
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <UpgradedBoardingConfirmationPage {...combinedProps} />
      </Provider>
    );
  };
});
