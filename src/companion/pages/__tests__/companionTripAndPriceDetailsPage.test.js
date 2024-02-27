import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { CompanionTripAndPriceDetailsPage } from 'src/companion/pages/companionTripAndPriceDetailsPage';
import CompanionFlightPricingPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionFlightPricingPageBuilder';

const { flightPricingPage } = new CompanionFlightPricingPageBuilder().build();

describe('CompanionTripAndPriceDetailsPage', () => {
  const goBack = () => {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('with default props', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    const createComponent = (props = {}) => {
      const defaultProps = {
        flightPricingPage,
        goBack
      };

      const store = configureMockStore()({
        app: {
          errorHeader: {
            hasError: false,
            errorMessage: null
          }
        },
        router: {
          location: {
            search: 'search'
          }
        }
      });

      return render(
        <Provider store={store}>
          <CompanionTripAndPriceDetailsPage {...defaultProps} {...props} />
        </Provider>
      );
    };
  });
});
