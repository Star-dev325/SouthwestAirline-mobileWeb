import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import SameDayPriceDifferenceForm from 'src/sameDay/components/sameDayPriceDifferenceForm';
import SameDayPricingResponseBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';

const onSubmitMock = jest.fn();

describe('sameDayPriceDifferenceForm', () => {
  it('should render price difference form component', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      { 
        amountDue: sameDayPricingPage.fareSummary.amountDue, 
        isPaymentRequired: true, 
        savedCreditCards 
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render price difference form  without payment method section', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      { 
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        savedCreditCards 
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render price difference form  when isPaymentRequired flag is true', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isPaymentRequired: true,
        savedCreditCards
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should not render price difference form  when isPaymentRequired value is false', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isPaymentRequired: false,
        savedCreditCards
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render price difference form with No primary card attached to the user profile', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      { amountDue: sameDayPricingPage.fareSummary.amountDue,
        isPaymentRequired: true, 
        savedCreditCards 
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render price difference form with primary card with required security code to the user profile', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(true)
      .withPrimaryCardNotCvvVerified()
      .build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isCVVRequired: true,
        isPaymentRequired: true,
        savedCreditCards
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should render price difference form with CCV verified false for primary card attached to the user profile', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(false)
      .withPrimaryCardNotCvvVerified()
      .build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isCVVRequired: false,
        isPaymentRequired: true,
        savedCreditCards: savedCreditCards
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  it('should contain onSubmit in props', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(false)
      .withPrimaryCardNotCvvVerified()
      .build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isCVVRequired: false,
        isPaymentRequired: true,
        savedCreditCards: savedCreditCards,
        onSubmit: onSubmitMock
      },
      {}
    );
    const SameDayConfirmationButton = container.querySelector('.continue');

    fireEvent.submit(SameDayConfirmationButton);

    waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it('should hide email input field when showEmailReceiptTo is false', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const { sameDayPricingPage } = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent(
      {
        amountDue: sameDayPricingPage.fareSummary.amountDue,
        isPaymentRequired: true,
        savedCreditCards,
        showEmailReceiptTo: false
      },
      {}
    );

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      initialFormData: {},
      location: {},
      match: { params: '' },
      onPaymentEditClick: () => {},
      onSubmitHandler: onSubmitMock,
      showEmailReceiptTo: true
    };
    const defaultState = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <SameDayPriceDifferenceForm {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
