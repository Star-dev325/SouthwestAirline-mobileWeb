import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { AirChangePaymentPage } from 'src/airChange/pages/airChangePaymentPage';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('AirChangePaymentPage', () => {
  const onClickContinueButton = () => {};
  const paymentInfo = { ...getPaymentInfoForUseNewCreditCard() };
  const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

  describe('render', () => {
    it('should render paymentForm', () => {
      const instance = React.createRef();
      const { container } = createPageComponent({ ref: instance });

      expect(container).toMatchSnapshot();
    });

    it('should render payment form with save credit card for future use field if user logged in', () => {
      const instance = React.createRef();
      const { container } = createPageComponent({ isUserLoggedIn: true, ref: instance });

      expect(container.querySelector('.payment-form')).not.toBeNull();
      expect(instance.current.props.enableOperationOnCC).toEqual(true);
    });
  });

  const createPageComponent = (props) => {
    const noop = () => {};
    const defaultProps = {
      editMode: false,
      enableOperationOnCC: true,
      isLoggedIn: false,
      onClickContinueButton,
      onDeleteCreditCards: noop,
      onMakePrimaryCreditCard: noop,
      onUpdateCreditCard: noop,
      paymentInfo,
      query: 'airportsCode=ABC-DEF',
      savedCreditCards,
      updateFormDataValueFn: noop
    };
    const finalProps = { ...defaultProps, ...props };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <AirChangePaymentPage {...finalProps} />
      </Provider>
    );
  };
});
