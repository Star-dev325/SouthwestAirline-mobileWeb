jest.mock('src/shared/components/countdownTimer', () => ({ text, time, onCountdownFinishCallback }) => 
  <>
    <button onClick={onCountdownFinishCallback}>mockCountDownTimer</button>
    <p>{text}</p>
    <p>{time}</p>
  </>
);

import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import * as ApplePayHelper from 'src/shared/helpers/applePayHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as CreditCardHelper from 'src/shared/helpers/creditCardHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { UpgradedBoardingPurchasePage as UpgradedBoardingPurchasePageInstance } from 'src/upgradedBoarding/pages/upgradedBoardingPurchasePage';
import localStorage from 'store2';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import { getApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('Upgraded Boarding Purchase Page', () => {
  const defaultBuilderProps = new UpgradedBoardingPurchaseFormBuilder().build();
  let cancelUpgradedBoardingReservationFnStub;
  let exitWebViewStub;
  let getIsApplePayCardValidStub;
  let getSavedCreditCardsFnStub;
  let goBackStub;
  let gotoPayPalSignInFnStub;
  let handleCancelUpgradedBoardingFnStub;
  let hasSelectedAlternativeFormOfPaymentFnStub;
  let hideDialogFnStub;
  let initiateAlternativeFormOfPaymentFnStub;
  let loadPurchasePagePlacementsFnStub;
  let needToSaveForPrimaryStub;
  let purchaseUpgradedBoardingFnStub;
  let pushStub;
  let resetCountdownTimeStampFnStub;
  let resetUpgradedBoardingDataFnStub;
  let resumeDataFnStub;
  let saveCountdownTimeStampFnStub;
  let saveFormDataFnStub;
  let saveMoneyTotalFnStub;
  let setReLoginCallbackFunctionsFnStub;
  let setStateStub;
  let shouldGotoPayPalSignInFnStub;
  let shouldResumeDataFnStub;
  let showDialogFnStub;
  let useStateStub;
  let clock;

  beforeEach(() => {
    cancelUpgradedBoardingReservationFnStub = jest.fn();
    exitWebViewStub = jest.fn();
    clock = jest.useFakeTimers();
    getIsApplePayCardValidStub = jest.spyOn(ApplePayHelper, 'getIsApplePayCardValid');
    getSavedCreditCardsFnStub = jest.fn();
    goBackStub = jest.fn();
    gotoPayPalSignInFnStub = jest.fn();
    handleCancelUpgradedBoardingFnStub = jest.fn();
    hasSelectedAlternativeFormOfPaymentFnStub = jest.fn();
    hideDialogFnStub = jest.fn().mockResolvedValue();
    initiateAlternativeFormOfPaymentFnStub = jest.fn();
    loadPurchasePagePlacementsFnStub = jest.fn();
    needToSaveForPrimaryStub = jest.spyOn(CreditCardHelper, 'needToSaveForPrimary').mockReturnValue(false);
    purchaseUpgradedBoardingFnStub = jest.fn();
    pushStub = jest.fn();
    resetCountdownTimeStampFnStub = jest.fn();
    resetUpgradedBoardingDataFnStub = jest.fn();
    resumeDataFnStub = jest.fn();
    saveCountdownTimeStampFnStub = jest.fn();
    saveFormDataFnStub = jest.fn().mockReturnValue(Promise.resolve({ type: 'FAKE-ACTION' }));
    saveMoneyTotalFnStub = jest.fn();
    setReLoginCallbackFunctionsFnStub = jest.fn();
    setStateStub = jest.fn();
    shouldGotoPayPalSignInFnStub = jest.fn();
    shouldResumeDataFnStub = jest.fn();
    showDialogFnStub = jest.fn().mockResolvedValue();
    useStateStub = jest.spyOn(React, 'useState').mockReturnValue([{}, setStateStub]);
    jest.spyOn(AnalyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    jest.resetAllMocks();
    clock.resetAllMocks();
  });

  describe('should render', () => {
    it('UpgradedBoardingPurchasePage', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage single pax', () => {
      const { container } = createComponent(
        {
          ...new UpgradedBoardingPurchaseFormBuilder().withSinglePaxSingleSegment()
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage single pax multi segment', () => {
      const { container } = createComponent(
        {
          ...new UpgradedBoardingPurchaseFormBuilder().withSinglePaxMultiSegment()
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage multi pax single segment', () => {
      const { container } = createComponent(
        {
          ...new UpgradedBoardingPurchaseFormBuilder().withMultiPaxSingleSegment()
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage should render with placement', () => {
      const imagePlacement = new ImagePlacementBuilder().build();

      const { container } = createComponent(
        {
          purchasePagePlacements: { promoTop01: imagePlacement }
        }
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('mount', () => {
    it('should call loadPurchasePagePlacementsFn on mount', () => {
      createComponent({});

      expect(loadPurchasePagePlacementsFnStub).toHaveBeenCalledTimes(1);
    });

    it('should not call resumeDataFn when shouldResumeData is false', () => {
      shouldResumeDataFnStub.mockReturnValue(false);
      createComponent({});

      expect(resumeDataFnStub).not.toHaveBeenCalledTimes(1);
    });

    it('should call resumeDataFn and purchaseUpgradedBoardingFn when shouldResumeData is true and isFromPayPalAuthorized is true', () => {
      const formData = {
        receiptEmail: 'test@wnco.com',
        paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID', isPrimary: false }
      };
      const payPalData = {
        paypalToken: 'EC-123'
      };

      shouldResumeDataFnStub.mockReturnValue(true);
      resumeDataFnStub.mockResolvedValue({
        isFromPayPalAuthorized: true,
        formData,
        payPal: payPalData
      });
      useStateStub.mockReturnValue([
        {
          isFromPayPalAuthorized: true,
          formData,
          payPal: payPalData
        },
        setStateStub
      ]);

      createComponent({});

      (async () => {
        await expect(resumeDataFnStub).toHaveBeenCalledTimes(1);
        expect(purchaseUpgradedBoardingFnStub).toHaveBeenCalledWith({
          upgradedBoardingConfirmationPageLink: _.get(
            defaultBuilderProps,
            'upgradedBoardingPurchasePage._links.upgradedBoardingConfirmationPage'
          ),
          formData,
          moneyTotal: { amount: '160.00', currencyCode: 'USD', currencySymbol: '$' },
          payPal: payPalData
        });
      })();
    });

    it('should not call purchaseUpgradedBoardingFn when shouldResumeData is true and isFromPayPalAuthorized is false', () => {
      shouldResumeDataFnStub.mockReturnValue(true);
      resumeDataFnStub.mockReturnValue(
        Promise.resolve({
          isFromPayPalAuthorized: false,
          formData: { receiptEmail: 'test@wnco.com', paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' } },
          payPal: {
            paypalToken: 'EC-123'
          }
        })
      );

      createComponent({});

      (async () => {
        await expect(resumeDataFnStub).toHaveBeenCalled();
        expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
      })();
    });
  });

  describe('count down timer functionality', () => {
    it('UpgradedBoardingPurchasePage should render with countDown timer ', () => {
      const { container } = createComponent(
        {
          upgradedBoardingPurchasePage: {
            ...defaultBuilderProps.upgradedBoardingPurchasePage,
            upgradedBoardingExpiredSeconds: 10
          }
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage should render with upgradedBoardingCountdownTimeStamp', () => {
      const { container } = createComponent(
        {
          upgradedBoardingPurchasePage: {
            ...defaultBuilderProps.upgradedBoardingPurchasePage,
            upgradedBoardingExpiredSeconds: 300
          },
          upgradedBoardingCountdownTimeStamp: "2023-01-08T03:01:18.325Z"
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage should render with upgradedBoardingExpiredSeconds equals to zero', () => {
      const { container } = createComponent(
        {
          upgradedBoardingPurchasePage: {
            ...defaultBuilderProps.upgradedBoardingPurchasePage,
            upgradedBoardingExpiredSeconds: 0
          },
          upgradedBoardingCountdownTimeStamp: "2023-01-08T03:01:18.325Z"
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage should not render CountdownTimer when upgradedBoardingExpiredSeconds is undefined', () => {
      const { container } = createComponent(
        {
          upgradedBoardingPurchasePage: {
            ...defaultBuilderProps.upgradedBoardingPurchasePage,
            upgradedBoardingExpiredSeconds: undefined
          }
        }
      );

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchasePage should render with showDialog on countdown callback', async () => {
      const { getByText } = createComponent({
        upgradedBoardingPurchasePage: {
          ...defaultBuilderProps.upgradedBoardingPurchasePage,
          upgradedBoardingExpiredSeconds: 5
        }
      }
      );

      fireEvent.click(getByText('mockCountDownTimer'));

      await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();
      
      expect(resetUpgradedBoardingDataFnStub).toHaveBeenCalled();
      expect(showDialogFnStub).toHaveBeenCalled();
      expect(hideDialogFnStub).toHaveBeenCalled();
      expect(cancelUpgradedBoardingReservationFnStub).toHaveBeenCalled();
    });

    it('UpgradedBoardingPurchasePage should call raiseSatelliteEvent on countdown callback', () => {
      const { getByText } = createComponent(
        {
          upgradedBoardingPurchasePage: {
            ...defaultBuilderProps.upgradedBoardingPurchasePage,
            upgradedBoardingExpiredSeconds: 5
          }
        }
      );

      fireEvent.click(getByText('mockCountDownTimer'));
     
      expect(AnalyticsEventHelper.raiseSatelliteEvent).toBeCalledWith('squid', { page_description: "modal:UB timer alert" });
    });
  });

  describe('applePayCard effect', () => {
    it('should call purchaseUpgradedBoardingFn when apple pay card data is present and valid', () => {
      const applePayCard = getApplePayCard();

      getIsApplePayCardValidStub.mockReturnValue(true);
      createComponent({ applePayCard }, false, UpgradedBoardingPurchasePageInstance);

      expect(getIsApplePayCardValidStub).toHaveBeenCalled();
      expect(needToSaveForPrimaryStub).toHaveBeenCalled();
      expect(purchaseUpgradedBoardingFnStub).toHaveBeenCalledWith(
        {
          upgradedBoardingConfirmationPageLink: _.get(
            defaultBuilderProps,
            'upgradedBoardingPurchasePage._links.upgradedBoardingConfirmationPage'
          ),
          formData: { receiptEmail: 'test@wnco.com', paymentInfo: { isPrimary: false } },
          moneyTotal: { amount: '160.00', currencyCode: 'USD', currencySymbol: '$' },
          applePayCard
        },
        false
      );
    });

    it('should not call purchaseUpgradedBoardingFn when apple pay card data is not valid', () => {
      getIsApplePayCardValidStub.mockReturnValue(false);
      const applePayCard = getApplePayCard();

      createComponent({ applePayCard });

      expect(getIsApplePayCardValidStub).toHaveBeenCalled();
      expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
    });

    it('should not call purchaseUpgradedBoardingFn when apple pay card data is null', () => {
      getIsApplePayCardValidStub.mockReturnValue(false);
      createComponent({ applePayCard: null });

      expect(getIsApplePayCardValidStub).toHaveBeenCalled();
      expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
    });
  });

  describe('should handle payment edit click', () => {
    it('should call push with correct route', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding' };
      const { container } = createComponent(
        {
          ...new UpgradedBoardingPurchaseFormBuilder().withSinglePaxSingleSegment(),
          push: pushStub
        },
        false
      );

      fireEvent.click(container.querySelector('.credit-card-radio-input'));
 
      expect(pushStub).toHaveBeenCalledWith('/upgraded-boarding/payment');
    });
  });

  describe('cancel functionality', () => {
    it('should call cancelUpgradedBoardingReservationFn action and push homepage route', async () => {
      const formProps = new UpgradedBoardingPurchaseFormBuilder().withSinglePaxSingleSegment();
      const { getByText } = createComponent(
        {
          ...formProps,
          push: pushStub,
          cancelUpgradedBoardingReservationFn: cancelUpgradedBoardingReservationFnStub
        },
        false
      );

      fireEvent.click(getByText('mockCountDownTimer'));

      await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();
      
      const linkObject = _.get(formProps, 'upgradedBoardingPurchasePage._links.upgradedBoardingCancel');

      expect(cancelUpgradedBoardingReservationFnStub).toHaveBeenCalledWith(linkObject);
      expect(pushStub).toHaveBeenCalledWith('/');
    });

    describe('when in webview', () => {
      it('should call cancelUpgradedBoardingReservationFn action and call exitWebViewFn', async () => {
        const formProps = new UpgradedBoardingPurchaseFormBuilder().withSinglePaxSingleSegment();
        const { getByText } = createComponent(
          {
            ...formProps,
            push: pushStub,
            cancelUpgradedBoardingReservationFn: cancelUpgradedBoardingReservationFnStub,
            exitWebViewFn: exitWebViewStub,
            isWebView: true
          }
        );

        fireEvent.click(getByText('mockCountDownTimer'));

        await showDialogFnStub.mock.calls[0][0].buttons[0].onClick();

        const linkObject = _.get(formProps, 'upgradedBoardingPurchasePage._links.upgradedBoardingCancel');

        expect(cancelUpgradedBoardingReservationFnStub).toHaveBeenCalledWith(linkObject);
        expect(exitWebViewStub).toHaveBeenCalled();
      });
    });
  });

  describe('handleCancelUpgradedBoarding', () => {
    it('should call handlCancelUpgradedBoarding action, when component Un mount', () => {
      const { unmount } = createComponent({
        push: pushStub,
        handleCancelUpgradedBoardingFn: handleCancelUpgradedBoardingFnStub,
        exitWebViewFn: exitWebViewStub,
        isWebView: true
      });

      unmount();

      expect(handleCancelUpgradedBoardingFnStub).toHaveBeenCalled();
    });
  });

  describe('click Purchase button', () => {
    it('should invoke purchaseUpgradedBoardingFn when session expired', async () => {
      const { container } = createComponent({
        purchaseUpgradedBoardingFn: purchaseUpgradedBoardingFnStub,
        receiptEmail: 'test@wnco.com'
      });

      fireEvent.submit(container.querySelector('form'));

      expect(needToSaveForPrimaryStub).toHaveBeenCalled();
      expect(purchaseUpgradedBoardingFnStub).toHaveBeenCalled();
    });

    it('should invoke purchaseUpgradedBoardingFn when session not expired', () => {
      const { container } = createComponent({
        purchaseUpgradedBoardingFn: purchaseUpgradedBoardingFnStub,
        receiptEmail: 'test@wnco.com'
      });

      fireEvent.submit(container.querySelector('form'));

      expect(needToSaveForPrimaryStub).toHaveBeenCalled();
      expect(purchaseUpgradedBoardingFnStub).toHaveBeenCalled();
    });

    describe('paypal', () => {
      it('should call gotoPayPalSignInFn when shouldGotoPayPalSignIn is true', () => {
        shouldGotoPayPalSignInFnStub.mockReturnValue(true);
        const { container } = createComponent({
          receiptEmail: 'test@wnco.com',
          paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' }
        });

        fireEvent.submit(container.querySelector('form'));

        expect(gotoPayPalSignInFnStub).toHaveBeenCalledWith(
          { amount: '160.00', currencyCode: 'USD', currencySymbol: '$' },
          {
            '0123456789': true,
            abcdefghi: true,
            jklmnopqr: true,
            receiptEmail: 'test@wnco.com',
            paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' },
            stuvqwxyz: true
          }
        );
        expect(needToSaveForPrimaryStub).toHaveBeenCalled();
        expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
      });

      it('should call gotoPayPalSignInFn when shouldGotoPayPalSignIn is true', () => {
        shouldGotoPayPalSignInFnStub.mockReturnValue(true);
        const { container } = createComponent({
          receiptEmail: 'test@wnco.com',
          paymentInfo: { selectedCardId: 'APPLE_PAY_CARD_ID' }
        });

        fireEvent.submit(container.querySelector('form'));

        expect(gotoPayPalSignInFnStub).toHaveBeenCalled();
        expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
      });
    });

    describe('When data is undefined or null', () => {
      it('should test if upgradedBoardingPurchasePage is undefined', () => {
        const { container } = createComponent({ upgradedBoardingPurchasePage: undefined });

        expect(container).toMatchSnapshot();
      });
      it('should test if upgradedBoardingSegment is null', () => {
        const { container } = createComponent({
          upgradedBoardingPurchasePage: { upgradedBoardingSegment: null }
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('apple pay', () => {
      it('should call saveFormDataFn and initiateAlternativeFormOfPaymentFn when hasSelectedApplePay is true', async () => {
        hasSelectedAlternativeFormOfPaymentFnStub.mockReturnValue(true);
        const { container } = createComponent({
          receiptEmail: 'test@wnco.com',
          paymentInfo: { selectedCardId: 'APPLE_PAY_CARD_ID' }
        });

        await fireEvent.submit(container.querySelector('form'));

        expect(saveFormDataFnStub).toHaveBeenCalled();
        expect(initiateAlternativeFormOfPaymentFnStub).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);
        expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
      });

      it('should call gotoPayPalSignInFn when shouldGotoPayPalSignIn is true', async () => {
        hasSelectedAlternativeFormOfPaymentFnStub.mockReturnValue(true);
        const { container } = createComponent({
          receiptEmail: 'test@wnco.com'
        });

        await fireEvent.submit(container.querySelector('form'));

        expect(saveFormDataFnStub).toHaveBeenCalled();
        expect(initiateAlternativeFormOfPaymentFnStub).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);
        expect(purchaseUpgradedBoardingFnStub).not.toHaveBeenCalled();
      });
    });

    describe('when using api gateway cookies', () => {
      it('should call appropriate actions', () => {
        jest.spyOn(localStorage, 'get').mockReturnValue({ expirationDate: 'token' });

        const { container } = createComponent({ receiptEmail: 'test@wnco.com' });

        fireEvent.submit(container.querySelector('form'));

        expect(purchaseUpgradedBoardingFnStub).toHaveBeenCalled();
        expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      });
    });
  });

  describe('get payment options', () => {
    describe('when no savedCreditCards in store', () => {
      const savedCreditCards = { primaryCard: null, otherCards: [] };

      it('should call getSavedCreditCardsFn when user logged in', () => {
        createComponent({
          isLoggedIn: true,
          savedCreditCards
        });

        expect(getSavedCreditCardsFnStub).toHaveBeenCalled();
      });

      it('should not call getSavedCreditCardsFn when user not logged in', () => {
        createComponent({
          isLoggedIn: false,
          savedCreditCards
        });

        expect(getSavedCreditCardsFnStub).not.toHaveBeenCalled();
      });
    });

    describe('when savedCreditCards in store', () => {
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build();

      it('should not call getSavedCreditCardsFn when user not logged in', () => {
        createComponent({
          isLoggedIn: false,
          savedCreditCards
        });

        expect(getSavedCreditCardsFnStub).not.toHaveBeenCalled();
      });

      it('should not call getSavedCreditCardsFn when user logged in', () => {
        createComponent({
          isLoggedIn: true,
          savedCreditCards
        });

        expect(getSavedCreditCardsFnStub).not.toHaveBeenCalled();
      });
    });
  });

  const createComponent = (props, Component) => {
    const defaultProps = {
      ...defaultBuilderProps,
      cancelUpgradedBoardingReservationFn: cancelUpgradedBoardingReservationFnStub,
      getSavedCreditCardsFn: getSavedCreditCardsFnStub,
      goBack: goBackStub,
      gotoPayPalSignInFn: gotoPayPalSignInFnStub,
      handleCancelUpgradedBoardingFn: handleCancelUpgradedBoardingFnStub,
      hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentFnStub,
      hideDialogFn: hideDialogFnStub,
      initiateAlternativeFormOfPaymentFn: initiateAlternativeFormOfPaymentFnStub,
      isLoggedIn: false,
      loadPurchasePagePlacementsFn: loadPurchasePagePlacementsFnStub,
      purchaseUpgradedBoardingFn: purchaseUpgradedBoardingFnStub,
      receiptEmail: '',
      resetCountdownTimeStampFn: resetCountdownTimeStampFnStub,
      resetUpgradedBoardingDataFn: resetUpgradedBoardingDataFnStub,
      resumeDataFn: resumeDataFnStub,
      saveCountdownTimeStampFn: saveCountdownTimeStampFnStub,
      saveFormDataFn: saveFormDataFnStub,
      saveMoneyTotalFn: saveMoneyTotalFnStub,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnStub,
      shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnStub,
      shouldResumeDataFn: shouldResumeDataFnStub,
      showDialogFn: showDialogFnStub,
      UPGRADED_BOARDING_BY_SEGMENT: false
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };
    const store = createMockStoreWithRouterMiddleware()();
    const WrappedComponent = Component ? Component : UpgradedBoardingPurchasePageInstance;

    return  render(
      <Provider store={store}>
        <WrappedComponent {...combinedProps} />
      </Provider>
    );
  };
});
