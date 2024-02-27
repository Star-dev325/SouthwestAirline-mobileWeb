import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { VendorTermsAndConditionsPage } from 'src/carBooking/pages/vendorTermsAndConditionsPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('VendorTermsAndConditionsPage', () => {
  let retrieveVendorTermsAndConditionsFn;

  const noop =  jest.fn();

  beforeEach(() => {
    retrieveVendorTermsAndConditionsFn = noop;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render when productId is specified as a url query parameter', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render PageHeader', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.page-header')).not.toBeNull();
    });

    it('should render terms and conditions', () => {
      const { container } = createPageComponent({
        termsAndConditions: ['Terms and conditions one', 'Terms and conditions two']
      });

      expect(container.querySelector('.terms-and-conditions')).not.toBeNull();
      expect(screen.getByText('Terms and conditions one')).toBeInTheDocument();
      expect(screen.getByText('Terms and conditions two')).toBeInTheDocument();
    });

    it('should render empty page when termsAndConditions is empty', () => {
      const { container } = createPageComponent({ termsAndConditions: [] });

      expect(container.querySelector('.page-header')).not.toBeNull();
      expect(container.querySelector('.terms-and-conditions')).toBeNull();
    });

    it('should call retrieveVendorTermsAndConditions action when page loads', () => {
      createPageComponent();
      
      expect(retrieveVendorTermsAndConditionsFn).toHaveBeenCalledWith('product-D1');
    });
  });
  const createPageComponent = (extraProps = {}) => {
    const state = {};
    const defaultProps = {
      query: {
        productId: 'product-D1'
      },
      termsAndConditions: [],
      retrieveVendorTermsAndConditionsFn
    };
    const mergedProps = { ...defaultProps, ...extraProps };

    return render((
      <Provider store={createMockedFormStore(state)}>
        <Router>
          <VendorTermsAndConditionsPage {...mergedProps} />
        </Router>
      </Provider>
    ));
  };
});
