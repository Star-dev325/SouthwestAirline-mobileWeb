jest.mock('src/shared/analytics/helpers/analyticsEventHelper', () => ({
  ...jest.requireActual('src/shared/helpers/passengerInfoHelper'),
  raiseSatelliteEvent: jest.fn()
}));

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { render } from '@testing-library/react';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { PaymentEdit, continueAsGuestForSessionExpiredFn } from 'src/airBooking/pages/paymentEdit';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import {
  getPaymentInfoForUseNewCreditCard,
  getPaymentInfoForUseSavedCreditCard
} from 'test/builders/model/paymentInfoBuilder';
import * as cardExpirationDateTransformer from 'src/shared/transformers/cardExpirationDateTransformer';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

describe('airBooking payment Edit', () => {
  let savedCreditCards;
  let paymentInfoWithSelectedCreditCard;
  let paymentInfoWithUseNewCreditCard;
  let onMakePrimaryCreditCardMock;
  let raiseSatelliteEventMock;

  const createComponent = (props) => {
    const finalProps = {
      isLoggedIn: true,
      savedCreditCards,
      onMakePrimaryCreditCard: onMakePrimaryCreditCardMock,
      shouldShowChaseInstantCreditCard: false,
      shouldShowApplePay: false,
      shouldShowUplift: false,
      shouldDisableUplift: false,
      editMode: false,
      paymentInfo: paymentInfoWithSelectedCreditCard,
      onClickSavedCreditCard: _.noop,
      onUpdateCreditCard: _.noop,
      onDeleteCreditCards: _.noop,
      onClickEditButton: _.noop,
      onClickCancelButton: _.noop,
      onClickContinueButton: _.noop,
      push: _.noop,
      goBack: _.noop,
      updateFormDataValueFn: _.noop,
      addHistoryBackToHomeFn: _.noop,
      placements: {},
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <PaymentEdit {...finalProps} />
      </Provider>
    );
  };

  beforeEach(() => {
    onMakePrimaryCreditCardMock = jest.fn().mockImplementation({});
    savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    paymentInfoWithSelectedCreditCard = _.merge({}, getPaymentInfoForUseSavedCreditCard());
    paymentInfoWithUseNewCreditCard = _.merge({}, getPaymentInfoForUseNewCreditCard());
    raiseSatelliteEventMock = raiseSatelliteEvent.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('you already have a primary credit card selected', () => {
    it('should fire the analytics satellite event with "BOOK:SWA:Payment Page"', () => {
      createComponent();

      expect(raiseSatelliteEventMock).toHaveBeenCalledWith('BOOK:SWA:Payment Page');
    });

    it('should display credit card icon', () => {
      const { container: paymentEdit } = createComponent();

      expect(paymentEdit.querySelector('.credit-card--image_visa')).toBeInTheDocument();
      expect(paymentEdit.querySelector('.credit-card--image_discover')).toBeInTheDocument();
    });
  });

  describe('continueAsGuestForSessionExpiredFn', () => {
    it('expect everything to be called', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      const pushMock = jest.fn();
      const continueAsGuestActionFnMock = jest.fn();
      const addHistoryBackToHomeFnMock = jest.fn();

      const props = {
        push: pushMock,
        continueAsGuestActionFn: continueAsGuestActionFnMock,
        addHistoryBackToHomeFn: addHistoryBackToHomeFnMock
      };

      continueAsGuestForSessionExpiredFn({ ...props });

      expect(pushMock).toHaveBeenCalledWith('/air/booking/price.html');
      expect(continueAsGuestActionFnMock).toHaveBeenCalled();
      expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
    });
  });

  describe('webview', () => {
    it('should not call `transformExpirationPaymentInfo` when `paymentInfo` is undefined', () => {
      const transformExpirationPaymentInfoSpy = jest.spyOn(
        cardExpirationDateTransformer,
        'transformExpirationPaymentInfo'
      );

      createComponent({ isWebView: false, paymentInfo: undefined });

      expect(transformExpirationPaymentInfoSpy).not.toHaveBeenCalled();
    });

    it('should not call `transformExpirationPaymentInfo` when `isWebView` is false', () => {
      const transformExpirationPaymentInfoSpy = jest.spyOn(
        cardExpirationDateTransformer,
        'transformExpirationPaymentInfo'
      );

      createComponent({ isWebView: false, paymentInfo: paymentInfoWithUseNewCreditCard });

      expect(transformExpirationPaymentInfoSpy).not.toHaveBeenCalled();
    });

    it('should not call `transformExpirationPaymentInfo` when `isWebView` is true but paymentInfo is undefined', () => {
      const transformExpirationPaymentInfoSpy = jest.spyOn(
        cardExpirationDateTransformer,
        'transformExpirationPaymentInfo'
      );

      createComponent({ isWebView: true, paymentInfo: undefined });

      expect(transformExpirationPaymentInfoSpy).not.toHaveBeenCalled();
    });

    it('should call `transformExpirationPaymentInfo` when `isWebView` is true', () => {
      const transformExpirationPaymentInfoSpy = jest.spyOn(
        cardExpirationDateTransformer,
        'transformExpirationPaymentInfo'
      );

      createComponent({ isWebView: true, paymentInfo: paymentInfoWithUseNewCreditCard });

      expect(transformExpirationPaymentInfoSpy).toHaveBeenCalledWith(paymentInfoWithUseNewCreditCard, 'MM/YYYY');
    });
  });
});
