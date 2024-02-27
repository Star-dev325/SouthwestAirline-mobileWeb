import { fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { EarlyBirdReviewPage } from 'src/earlyBird/pages/earlyBirdReviewPage';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import * as ApplePayHelper from 'src/shared/helpers/applePayHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as AppSelector from 'src/shared/selectors/appSelector';
import localStorage from 'store2';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';
import { getApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';

describe('earlyBirdReviewPage', () => {
  const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
  let addHistoryBackToHomeFnMock;
  let getNewApplePayCardMock;
  let hasSelectedAlternativeFormOfPaymentMock;
  let initiateAlternativeFormOfPaymentMock;
  let initiateVoidTransactionFnMock;
  let props;
  let purchaseFnMock;
  let pushMock;
  let resetPaymentInfoFnMock;
  let resumeDataFnMock;
  let saveFormDataFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let shouldGotoPayPalSignInFnMock;
  let shouldResumeDataFnMock;
  let traceEarlybirdPaymentTypeFnMock;

  beforeEach(() => {
    addHistoryBackToHomeFnMock = jest.fn();
    getNewApplePayCardMock = jest.spyOn(ApplePayHelper, 'getNewApplePayCard');
    hasSelectedAlternativeFormOfPaymentMock = jest.fn().mockReturnValue(true);
    initiateAlternativeFormOfPaymentMock = jest.fn();
    initiateVoidTransactionFnMock = jest.fn();
    purchaseFnMock = jest.fn();
    pushMock = jest.fn();
    resetPaymentInfoFnMock = jest.fn();
    resumeDataFnMock = jest.fn();
    saveFormDataFnMock = jest.fn().mockResolvedValue({ type: 'FAKE-ACTION' });
    setReLoginCallbackFunctionsFnMock = jest.fn();
    shouldGotoPayPalSignInFnMock = jest.fn();
    shouldResumeDataFnMock = jest.fn();
    traceEarlybirdPaymentTypeFnMock = jest.fn();

    props = {
      addHistoryBackToHomeFn: addHistoryBackToHomeFnMock,
      applePayCard: null,
      getPaymentOptionsFn: jest.fn(),
      gotoPayPalSignInFn: shouldGotoPayPalSignInFnMock,
      hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentMock,
      history: {
        location: {
          pathname: '/earlybird/checkin/PNR123/review'
        }
      },
      initiateAlternativeFormOfPaymentFn: initiateAlternativeFormOfPaymentMock,
      isLoggedIn: false,
      onPaymentEditClick: () => {},
      params: {
        pnr: 'ABC123'
      },
      paymentInfo: {
        cardNumber: '4012999999999999',
        intentToStore: false,
        isPrimary: false,
        selectedCardId: 'NEW_CREDIT_CARD_ID'
      },
      purchaseFn: purchaseFnMock,
      push: pushMock,
      resetPaymentInfoFn: resetPaymentInfoFnMock,
      resumeDataFn: resumeDataFnMock,
      reviewPage: {
        dates: { first: '2018-05-03' },
        destinationDescription: 'destinationDescription',
        earlyBirdAnalytics: null,
        earlyBirdBounds,
        firstName: 'David',
        lastName: 'Liu',
        moneyTotalFare: { amount: '60.00', currencyCode: 'USD' },
        productIds: ['productIds00', 'productIds01'],
        receiptEmail: 'arris@163.com',
        recordLocator: 'XHKJ98',
        _links: {
          earlyBirdConfirmationPage: {
            href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
            method: 'POST'
          }
        }
      },
      savedCreditCards: { primaryCard: null, otherCards: [] },
      saveFormDataFn: saveFormDataFnMock,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnMock,
      shouldResumeDataFn: shouldResumeDataFnMock,
      traceEarlybirdPaymentTypeFn: traceEarlybirdPaymentTypeFnMock
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render expected components', () => {
    const { container } = createComponent(EarlyBirdReviewPage, { props });

    expect(container).toMatchSnapshot();
  });

  it('should call traceEarlybirdPaymentTypeFn to store payment type to analytics store', () => {
    createComponent(EarlyBirdReviewPage, { props });

    expect(traceEarlybirdPaymentTypeFnMock).toHaveBeenCalledTimes(1);
  });

  describe('click payment info item', () => {
    it('should transition to payment page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/XHKJ98/review' };

      const instance = React.createRef();
      
      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          ref: instance
        }
      });

      instance.current.onPaymentEditClick();
      expect(pushMock).toHaveBeenCalledWith('/earlybird/checkin/XHKJ98/payment');
    });

    it('should transition to payment page on normalized route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/purchase.html' };

      const instance = React.createRef();
      
      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          ref: instance
        }
      });

      instance.current.onPaymentEditClick();
      expect(pushMock).toHaveBeenCalledWith('/earlybird/payment.html');
    });
  });

  describe('click payment edit button', () => {
    it('should transition to payment page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/XHKJ98/review' };

      const { container } = createComponent(EarlyBirdReviewPage, { props });

      fireEvent.click(container.querySelector('.nav-item-link'));

      expect(pushMock).toHaveBeenCalledWith('/earlybird/checkin/XHKJ98/payment');
    });
  });

  describe('authorize success return from paypal', () => {
    it('should call purchase when not session expired', (done) => {
      shouldResumeDataFnMock.mockReturnValueOnce(true);
      const paymentInfo = {
        intentToStore: false,
        isPrimary: false,
        selectedCardId: 'PAY_PAL_CARD_ID',
        type: 'PAYPAL'
      };

      resumeDataFnMock.mockResolvedValueOnce({
        formData: { paymentInfo },
        isFromPayPalAuthorized: true,
        payPal: {
          paypalToken: 'EC-123'
        }
      });

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          history: {
            ...props.history,
            location: {
              ...props.history.location,
              pathname: '/earlybird/checkin/PNR123/review/paypal'
            }
          },
          isLoggedIn: false,
          paymentInfo
        }
      });

      waitFor.untilAssertPass(() => {
        expect(shouldGotoPayPalSignInFnMock).not.toHaveBeenCalled();
        expect(purchaseFnMock.mock.calls[0][0].payPal).toEqual({ paypalToken: 'EC-123' });
      }, done);
    });

    it('should call purchase when session expired and relogin', (done) => {
      shouldResumeDataFnMock.mockReturnValueOnce(true);
      const paymentInfo = {
        selectedCardId: 'PAY_PAL_CARD_ID',
        type: 'PAYPAL',
        intentToStore: false,
        isPrimary: false
      };

      resumeDataFnMock.mockResolvedValueOnce({
        formData: { paymentInfo },
        isFromPayPalAuthorized: true,
        payPal: {
          paypalToken: 'EC-123'
        }
      });

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          history: {
            ...props.history,
            location: {
              ...props.history.location,
              pathname: '/earlybird/checkin/PNR123/review/paypal'
            }
          },
          isLoggedIn: false,
          paymentInfo
        }
      });

      waitFor.untilAssertPass(() => {
        expect(shouldGotoPayPalSignInFnMock).not.toHaveBeenCalled();
        expect(purchaseFnMock.mock.calls[0][0].payPal).toEqual({ paypalToken: 'EC-123' });
      }, done);
    });

    it('should not call purchase when session expired and continue as guest', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/XHKJ98/review' };

      const instance = React.createRef();

      shouldResumeDataFnMock = jest.fn().mockReturnValueOnce(true);

      const paymentInfo = {
        intentToStore: false,
        isPrimary: false,
        selectedCardId: 'PAY_PAL_CARD_ID',
        type: 'PAYPAL'
      };

      resumeDataFnMock = jest.fn().mockResolvedValueOnce({
        formData: { paymentInfo },
        isFromPayPalAuthorized: true,
        payPal: {
          paypalToken: 'EC-123'
        }
      });

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          history: {
            ...props.history,
            location: {
              ...props.history.location,
              pathname: '/earlybird/checkin/PNR123/review/paypal'
            }
          },
          isLoggedIn: false,
          paymentInfo,
          ref: instance
        }
      });

      instance.current._continueAsGuest({ paymentInfo });

      waitFor.untilAssertPass(() => {
        expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
        expect(pushMock).toHaveBeenCalledWith('/earlybird/checkin/XHKJ98');
      }, done);
    });
  });

  describe('click purchase', () => {
    it('should call purchaseFn when click purchase with no session expired', () => {
      hasSelectedAlternativeFormOfPaymentMock.mockReturnValue(false);
      const { container } = createComponent(EarlyBirdReviewPage, { props });

      fireEvent.submit(container.querySelector('form'));
      const {
        productIds,
        moneyTotalFare,
        _links: { earlyBirdConfirmationPage }
      } = props.reviewPage;

      expect(purchaseFnMock).toHaveBeenCalledWith({
        earlyBirdConfirmationPageLink: earlyBirdConfirmationPage,
        earlyBirdPurchaseInfo: {
          productIds,
          moneyTotalFare
        },
        formData: {
          paymentInfo: props.paymentInfo
        },
        isLoggedIn: false
      });
    });

    it('should call purchaseFn with isLoggedIn false when click purchase when session expired and continue as guest when use new credit card', () => {
      const instance = React.createRef();
      const paymentInfo = { intentToStore: false, isPrimary: false, selectedCardId: 'NEW_CREDIT_CARD_ID' };

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          isLoggedIn: true,
          paymentInfo,
          ref: instance
        }
      });

      instance.current._continueAsGuest({ paymentInfo });

      const {
        productIds,
        moneyTotalFare,
        _links: { earlyBirdConfirmationPage }
      } = props.reviewPage;

      expect(purchaseFnMock).toHaveBeenCalledWith({
        earlyBirdConfirmationPageLink: earlyBirdConfirmationPage,
        earlyBirdPurchaseInfo: {
          moneyTotalFare,
          productIds
        },
        formData: {
          paymentInfo: { intentToStore: false, isPrimary: false, selectedCardId: NEW_CREDIT_CARD_ID }
        },
        isLoggedIn: false
      });
    });

    it('should call purchaseFn with isLoggedIn false when click purchase when session expired and continue as guest when use saved credit card', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
      BrowserObject.location = { pathname: '/earlybird/checkin/XHKJ98/review' };
      
      const instance = React.createRef();

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          isLoggedIn: false,
          paymentInfo: { selectedCardId: '1-KNKJ' },
          ref: instance
        }
      });

      instance.current._continueAsGuest({ selectedCardId: '1-KNKJ' });

      expect(purchaseFnMock).not.toHaveBeenCalled();
      expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
      expect(pushMock).toHaveBeenCalledWith('/earlybird/checkin/XHKJ98');
    });

    describe('paypal', () => {
      it('should trigger redirect to PayPal SignIn when logged in user pays with paypal and click purchase', () => {
        shouldGotoPayPalSignInFnMock.mockReturnValueOnce(true);

        const { container } = createComponent(EarlyBirdReviewPage, {
          props: {
            ...props,
            isLoggedIn: true,
            paymentInfo: {
              intentToStore: false,
              isPrimary: false,
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          }
        });

        fireEvent.submit(container.querySelector('form'));

        expect(shouldGotoPayPalSignInFnMock).toHaveBeenCalledWith(
          {
            amount: '60.00',
            currencyCode: 'USD'
          },
          {
            paymentInfo: {
              intentToStore: false,
              isPrimary: false,
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          }
        );

        expect(purchaseFnMock).not.toHaveBeenCalled();
      });

      it('should not go to early bird checkin detail page when logged in user pays with paypal, session expires and continues as guest', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
        BrowserObject.location = { pathname: '/earlybird/purchase.html' };

        const instance = React.createRef();

        shouldGotoPayPalSignInFnMock = jest.fn().mockReturnValueOnce(true);

        const paymentInfo = {
          intentToStore: false,
          isPrimary: false,
          selectedCardId: 'PAY_PAL_CARD_ID',
          type: 'PAYPAL'
        };

        createComponent(EarlyBirdReviewPage, {
          props: {
            ...props,
            isLoggedIn: false,
            paymentInfo,
            ref: instance
          }
        });

        instance.current._continueAsGuest(paymentInfo);

        expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
        expect(pushMock).toHaveBeenCalledWith('/earlybird/select.html');
      });

      it('should go to early bird checkin new detail page route when logged in user pays with paypal, session expires and continues as guest', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('earlybird');
        BrowserObject.location = { pathname: '/earlybird/checkin/NALVRY/review' };

        const instance = React.createRef();

        shouldGotoPayPalSignInFnMock = jest.fn().mockReturnValueOnce(true);

        const paymentInfo = {
          intentToStore: false,
          isPrimary: false,
          selectedCardId: 'PAY_PAL_CARD_ID',
          type: 'PAYPAL'
        };

        createComponent(EarlyBirdReviewPage, {
          props: {
            ...props,
            isLoggedIn: false,
            paymentInfo,
            ref: instance
          }
        });

        instance.current._continueAsGuest(paymentInfo);

        expect(addHistoryBackToHomeFnMock).toHaveBeenCalledWith(true);
        expect(pushMock).toHaveBeenCalledWith('/earlybird/checkin/XHKJ98');
      });

      it('should trigger redirect to PayPal SignIn when user pays with paypal and click purchase when session expired and relogin', () => {
        shouldGotoPayPalSignInFnMock.mockReturnValueOnce(true);

        const paymentInfo = {
          intentToStore: false,
          isPrimary: false,
          selectedCardId: 'PAY_PAL_CARD_ID',
          type: 'PAYPAL'
        };

        const { container } = createComponent(EarlyBirdReviewPage, {
          props: {
            ...props,
            isLoggedIn: false,
            paymentInfo
          }
        });

        fireEvent.submit(container.querySelector('form'));

        expect(shouldGotoPayPalSignInFnMock).toHaveBeenCalledWith(
          {
            amount: '60.00',
            currencyCode: 'USD'
          },
          {
            paymentInfo: {
              intentToStore: false,
              isPrimary: false,
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          }
        );
        expect(purchaseFnMock).not.toHaveBeenCalled();
      });
    });

    describe('when using api gateway cookies', () => {
      it('should call appropriate actions', () => {
        jest.spyOn(localStorage, 'get').mockReturnValueOnce({ expirationDate: 'token' });

        const { container } = createComponent(EarlyBirdReviewPage, { props });

        fireEvent.submit(container.querySelector('form'));

        expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
      });
    });

    it('should stay on early bird review page when user canceled PayPal', (done) => {
      shouldResumeDataFnMock = jest.fn().mockReturnValueOnce(true);
      const paymentInfo = {
        selectedCardId: 'PAY_PAL_CARD_ID',
        type: 'PAYPAL',
        intentToStore: false,
        isPrimary: false
      };

      resumeDataFnMock = jest.fn().mockResolvedValueOnce({
        formData: { paymentInfo },
        isFromPayPalAuthorized: false,
        payPal: {
          paypalToken: 'EC-123'
        }
      });

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          history: {
            ...props.history,
            location: {
              ...props.history.location,
              pathname: '/earlybird/checkin/PNR123/review/paypal-canceled'
            }
          },
          isLoggedIn: false,
          paymentInfo
        }
      });

      waitFor.untilAssertPass(() => {
        expect(purchaseFnMock).not.toHaveBeenCalled();
      }, done);
    });
  });

  describe('apple pay', () => {
    let paymentInfo;
    const applePayCard = {
      ...getApplePayCard(),
      formData: { contactMethodContent: '' }
    };

    beforeEach(() => {
      paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };
    });

    it('should call initiateAlternativeFormOfPayment if hasSelectedAlternativeFormOfPayment returns true', (done) => {
      hasSelectedAlternativeFormOfPaymentMock = jest.fn().mockReturnValueOnce(true);

      const { container } = createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          paymentInfo
        }
      });

      fireEvent.submit(container.querySelector('form'));

      waitFor.untilAssertPass(() => {
        expect(saveFormDataFnMock).toHaveBeenCalledWith({ paymentInfo });
        expect(initiateAlternativeFormOfPaymentMock).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);

        expect(purchaseFnMock).not.toHaveBeenCalled();
      }, done);
    });

    it('should call _purchase if componentDidUpdate has a new apple pay card', () => {
      const { rerender } = createComponent(EarlyBirdReviewPage, {
        props: { ...props }
      });

      getNewApplePayCardMock.mockReturnValueOnce(applePayCard);

      const mergedProps = { ...props, applePayCard };

      rerender(
        <Provider store={createMockedFormStore()}>
          <EarlyBirdReviewPage {...mergedProps} />
        </Provider>
      );

      expect(getNewApplePayCardMock).toHaveBeenCalledWith(null, applePayCard);
      expect(purchaseFnMock).toHaveBeenCalled();
    });

    it('should not call _purchase if componentDidUpdate does not have a new apple pay card', () => {
      const { rerender } = createComponent(EarlyBirdReviewPage, {
        props: { ...props }
      });

      getNewApplePayCardMock.mockReturnValueOnce(null);

      const mergedProps = { ...props, applePayCard };

      rerender(
        <Provider store={createMockedFormStore()}>
          <EarlyBirdReviewPage {...mergedProps} />
        </Provider>
      );

      expect(getNewApplePayCardMock).toHaveBeenCalledWith(null, applePayCard);
      expect(purchaseFnMock).not.toHaveBeenCalled();
    });

    it('should call initiateVoidTransactionFn when session expired and continue as guest selected', () => {
      const instance = React.createRef();

      hasSelectedAlternativeFormOfPaymentMock = jest.fn().mockReturnValueOnce(false);

      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          applePayCard,
          CEPTOR_VOID_API: true,
          initiateVoidTransactionFn: initiateVoidTransactionFnMock,
          isLoggedIn: false,
          paymentInfo,
          ref: instance
        }
      });

      instance.current._continueAsGuest({ paymentInfo });

      expect(initiateVoidTransactionFnMock).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
      expect(purchaseFnMock).not.toHaveBeenCalled();
    });

    it('should not call initiateVoidTransactionFn when session expired and continue as guest selected with other than apple pay', () => {
      const instance = React.createRef();

      paymentInfo = { selectedCardId: 'FAKE_CARD_ID', type: 'FAKE' };
      createComponent(EarlyBirdReviewPage, {
        props: {
          ...props,
          CEPTOR_VOID_API: true,
          initiateVoidTransactionFn: initiateVoidTransactionFnMock,
          isLoggedIn: false,
          paymentInfo,
          ref: instance
        }
      });

      instance.current._continueAsGuest({ paymentInfo });

      expect(initiateVoidTransactionFnMock).not.toHaveBeenCalled();
      expect(purchaseFnMock).not.toHaveBeenCalled();
    });
  });
});
