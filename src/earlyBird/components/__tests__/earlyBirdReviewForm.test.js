import React from 'react';
import { render } from '@testing-library/react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';
import EarlyBirdReviewForm from 'src/earlyBird/components/earlyBirdReviewForm';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';

describe('earlyBirdReviewForm', () => {
  const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
  const noop = () => {};
  const defaultProps = {
    formId: 'formId',
    push: noop,
    paymentInfo: {
      selectedCardId: 'NEW_CREDIT_CARD_ID',
      cardNumber: '4012999999999999'
    },
    earlyBirdBounds,
    isLoggedIn: false,
    total: { amount: '60.00', currencyCode: 'USD' },
    savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
    onPaymentEditClick: noop,
    onSubmit: noop,
    receiptEmail: 'whatever@email.com'
  };

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render email field if receiptEmail is null', () => {
    const { container } = createComponent({ receiptEmail: null });

    expect(container.querySelector('.form-field--container')).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const store = createMockedFormStore();

    return render(
      <Provider store={store}>
        <EarlyBirdReviewForm {...defaultProps} {...props} />
      </Provider>
    );
  };
});
