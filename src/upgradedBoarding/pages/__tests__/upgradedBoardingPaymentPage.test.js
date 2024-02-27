import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { UpgradedBoardingPaymentPage } from 'src/upgradedBoarding/pages/upgradedBoardingPaymentPage';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('UpgradedBoardingPaymentPage', () => {
  describe('render', () => {
    it('should render correctly', () => {
      const { container } = createComponent({});
      
      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      isLoggedIn: false,
      paymentInfo: {},
      savedCreditCards: {
        primaryCard: null,
        otherCards: []
      },
      userAddressInfo: null,
      updateFormDataValueFn: _.noop,
      onClickContinueButton: _.noop,
      shouldShowApplePay: false
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <UpgradedBoardingPaymentPage {...combinedProps} />
      </Provider>
    );
  };
});
