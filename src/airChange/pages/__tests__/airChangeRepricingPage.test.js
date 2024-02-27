jest.mock('test/unit/helpers/testUtils', () => ({
  mockErrorHeaderContainer: jest.fn()
}));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AirChangeRepricingPage } from 'src/airChange/pages/airChangeRepricingPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import ChangePricingPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/changePricingPageBuilder';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';

describe('Air Change Repricing Page', () => {
  const defaultChangePricingPage = new ChangePricingPageBuilder().withRepricingMessages().build();
  const changeShoppingLink = {
    href: 'http://mobile.com',
    method: 'POST',
    body: {}
  };
  const defaultSelectedBounds = {
    firstbound: true,
    secondbound: false
  };
  const defaultSearchRequest = {
    to: 'AUS',
    from: 'ALB',
    departureAndReturnDate: {
      departureDate: '2018-04-14'
    }
  };
  const defaultBoundSelections = [new BoundSelectionBuilder().build()];

  let defaultProps;
  let goBackStub;
  let pushStub;
  let RepricingConfirmationWrapper;
  let searchForFlightsStub;

  beforeEach(() => {
    mockErrorHeaderContainer();

    pushStub = jest.fn((param) => param);
    goBackStub = jest.fn();
    searchForFlightsStub = jest.fn((options, cb) => cb());

    defaultProps = {
      boundSelections: defaultBoundSelections,
      changePricingPage: defaultChangePricingPage,
      changeShoppingLink,
      goBack: goBackStub,
      push: pushStub,
      searchForFlightsFn: searchForFlightsStub,
      searchRequest: defaultSearchRequest,
      selectedBounds: defaultSelectedBounds
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render correctly', () => {
      RepricingConfirmationWrapper = createComponent();

      expect(RepricingConfirmationWrapper).toMatchSnapshot();
    });

    it('should render correctly in webView', () => {
      RepricingConfirmationWrapper = createComponent({ isWebView: true });

      expect(RepricingConfirmationWrapper).toMatchSnapshot();
    });

    it('should render header', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-header')).not.toBeNull();
    });

    it('should render passenger price correctly', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="passenger-price-passengers--number-and-type"]')).not.toBeNull();
      expect(container.querySelector('[data-qa="total-amount"]').textContent).toEqual('566.58');
    });

    it('should render the priceMessages array as an array of BasicBanners', () => {
      const priceMessages = [
        {
          backgroundColor: 'DEFAULT',
          body: 'We can not add this product to a flight that leaves within 36 hours of purchase',
          header: 'EarlyBird Check-in is not available',
          icon: 'WARNING',
          key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_36_HOURS',
          textColor: 'DEFAULT'
        }
      ];
      const props = {
        ...defaultProps,
        ...{ changePricingPage: { ...defaultChangePricingPage, ...{ priceMessages } } }
      };

      RepricingConfirmationWrapper = createComponent(props);

      expect(RepricingConfirmationWrapper).toMatchSnapshot();
    });
  });

  describe('click continue button', () => {
    it('should transition to air change pricing page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-qa="continueButton"]'));

      expect(pushStub).toHaveBeenCalledWith('/air/change/price.html');
    });

    it('should transition to air change review page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent({ isUpgrade: true });

      fireEvent.click(container.querySelector('[data-qa="continueButton"]'));

      expect(pushStub).toHaveBeenCalledWith('/air/change/reconcile.html');
    });
  });

  describe('click cancel button', () => {
    it('should transition to adult outbound shopping page when change one way for adult', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-qa="cancelButton"]'));
      searchForFlightsStub.mock.calls[0][1]();

      expect(searchForFlightsStub.mock.calls[0][0]).toEqual({
        searchRequest: defaultSearchRequest,
        changeShoppingLink,
        boundSelections: defaultBoundSelections,
        selectedBounds: defaultSelectedBounds
      });
      expect(pushStub).toHaveBeenCalledWith('/air/change/outbound/results');
    });

    it('should transition to adult shopping page when change only inbound of round trip for adult', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const searchRequest = {
        to: 'AUS',
        from: 'ALB',
        departureAndReturnDate: {
          departureDate: '2018-04-14',
          returnDate: '2018-04-15'
        }
      };
      const selectedBounds = {
        firstbound: false,
        secondbound: true
      };

      const { container } = createComponent({
        searchRequest,
        selectedBounds
      });

      fireEvent.click(container.querySelector('[data-qa="cancelButton"]'));
      searchForFlightsStub.mock.calls[0][1]();

      expect(searchForFlightsStub.mock.calls[0][0]).toEqual({
        searchRequest,
        selectedBounds,
        changeShoppingLink,
        boundSelections: defaultBoundSelections
      });
      expect(pushStub).toHaveBeenCalledWith('/air/change/inbound/results');
    });

    it('should goBack to previous page in upgrade flow', () => {
      const { container } = createComponent({ isUpgrade: true });

      fireEvent.click(container.querySelector('[data-qa="cancelButton"]'));

      expect(goBackStub).toHaveBeenCalled();
    });
  });

  const store = createMockStoreWithRouterMiddleware()();
  const createComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <AirChangeRepricingPage {...defaultProps} {...props} />
      </Provider>
    );
});
