import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { continueAsGuestForSessionExpiredFn, EarlyBirdPayment } from 'src/earlyBird/pages/earlyBirdPayment';
import { getPaymentInfoForUseSavedCreditCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as AppSelector from 'src/shared/selectors/appSelector';

describe('airBooking payment Edit', () => {
  let onMakePrimaryCreditCardMock;
  let paymentInfoWithSelectedCreditCard;
  let savedCreditCards;

  const createComponent = (props) => {
    const finalProps = {
      addHistoryBackToHomeFn: () => {},
      editMode: false,
      goBack: () => {},
      isLoggedIn: true,
      onClickCancelButton: () => {},
      onClickContinueButton: () => {},
      onClickEditButton: () => {},
      onClickSavedCreditCard: () => {},
      onDeleteCreditCards: () => {},
      onMakePrimaryCreditCard: onMakePrimaryCreditCardMock,
      onUpdateCreditCard: () => {},
      paymentInfo: paymentInfoWithSelectedCreditCard,
      push: () => {},
      recordLocator: 'QEF56R',
      savedCreditCards,
      shouldShowChaseInstantCreditCard: false,
      updateFormDataValueFn: () => {},
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <EarlyBirdPayment {...finalProps} />
      </Provider>
    );
  };

  beforeEach(() => {
    onMakePrimaryCreditCardMock = jest.fn();
    paymentInfoWithSelectedCreditCard = { ...getPaymentInfoForUseSavedCreditCard(), saveCreditCard: false };
    savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('you already have a primary credit card selected', () => {
    it('should show airport code as subtitle', () => {
      const { container } = createComponent();

      expect(container.querySelector('.action-bar--sub-title').textContent).toContain('Add EarlyBird');
    });

    it('should display credit card icon', () => {
      const { container } = createComponent();

      expect(container.querySelector('.credit-card--image_visa')).toBeInTheDocument();
      expect(container.querySelector('.credit-card--image_discover')).toBeInTheDocument();
    });
  });

  describe('payment form', () => {
    it('should render payment form support modify country code', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot;
    });

    it('should pass shouldShowChaseInstantCreditCard to paymentForm', () => {
      const { container } = createComponent({ shouldShowChaseInstantCreditCard: true });

      expect(container).toMatchSnapshot;
    });
  });

  describe('continueAsGuestForSessionExpiredFn', () => {
    it('should call push and addHistoryBackToHomeFn', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/NALVRY/payment' };

      const addHistoryBackToHomeFnMock = jest.fn();
      const pushMock = jest.fn();
      const recordLocator = 'ASD123';

      const props = {
        addHistoryBackToHomeFn: addHistoryBackToHomeFnMock,
        push: pushMock,
        recordLocator
      };

      continueAsGuestForSessionExpiredFn({ ...props });

      expect(pushMock).toHaveBeenCalledWith(`/earlybird/checkin/${recordLocator}`);
      expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
    });

    it('should call addHistoryBackToHomeFn and not push', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');

      const addHistoryBackToHomeFnMock = jest.fn();
      const pushMock = jest.fn();

      const props = {
        addHistoryBackToHomeFn: addHistoryBackToHomeFnMock,
        push: pushMock,
        recordLocator: null
      };

      continueAsGuestForSessionExpiredFn({ ...props });

      expect(pushMock).not.toHaveBeenCalled();
      expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
    });
  });
});
