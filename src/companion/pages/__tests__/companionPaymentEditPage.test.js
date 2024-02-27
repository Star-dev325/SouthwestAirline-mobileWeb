import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { CompanionPaymentEditPage } from 'src/companion/pages/companionPaymentEditPage';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CompanionPaymentPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render payment form', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render payment form with save credit card for future use field if user logged in', () => {
      const instance = React.createRef();
      const { container } = createComponent({ isUserLoggedIn: true, ref: instance });

      expect(container.querySelector('.payment-form')).not.toBeNull();

      expect(instance.current.props.enableOperationOnCC).toEqual(true);
    });

    it('should render payment form support modify country code', () => {
      const instance = React.createRef();

      createComponent({ supportModifyCountryCode: true, ref: instance });

      expect(instance.current.props.supportModifyCountryCode).toEqual(true);
    });
  });

  it('should go to purchase summary page when user click done button', () => {
    const onClickContinueButtonMock = jest.fn();
    const { container } = createComponent({ onSubmit: onClickContinueButtonMock });

    fireEvent.submit(container.querySelector('form'));

    expect(onClickContinueButtonMock).toHaveBeenCalled();
  });

  it('should pass shouldShowApplePay to paymentForm', () => {
    const instance = React.createRef();

    createComponent({ shouldShowApplePay: true, ref: instance });

    expect(instance.current.props.shouldShowApplePay).toEqual(true);
  });

  const createComponent = (props = {}) => {
    const noop = () => {};
    const defaultProps = {
      isLoggedIn: false,
      editMode: false,
      shouldShowApplePay: false,
      paymentInfo: getPaymentInfoForUseNewCreditCard(),
      savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
      onClickSavedCreditCard: noop,
      onMakePrimaryCreditCard: noop,
      onUpdateCreditCard: noop,
      onDeleteCreditCards: noop,
      onClickContinueButton: noop,
      fetchSavedCreditCards: noop,
      updateFormDataValueFn: noop,
      enableOperationOnCC: true
    };
    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionPaymentEditPage {...finalProps} />
      </Provider>
    );
  };
});
