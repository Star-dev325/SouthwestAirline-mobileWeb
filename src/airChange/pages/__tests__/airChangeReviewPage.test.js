jest.mock('src/shared/helpers/loginSessionHelper', () => ({
  shouldUseGatewayCookies: jest.fn().mockReturnValue(true)
}));

import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import downGradeForRoundTripSinglePax from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeRefundable';
import upgradeForRoundTripSinglePaxWithTravelFunds from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgradeWithTravelFunds';
import pointsSinglePaxOneWayUpgradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxUpgrade';
import { createRef } from 'react';
import { AirChangeReviewPage } from 'src/airChange/pages/airChangeReviewPage';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import * as AlternativeFormsOfPaymentHelper from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import * as ApplePayHelper from 'src/shared/helpers/applePayHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import { getApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';
import waitFor from 'test/unit/helpers/waitFor';

describe('Air Change Review Page', () => {
  let changeFlightFnMock;
  let getMoneyTotalForAirChangeMock;
  let getNewApplePayCardMock;
  let getPassengerInfoFnMock;
  let getPaymentOptionsFnMock;
  let gotoPayPalSignInFnMock;
  let hasSelectedAlternativeFormOfPaymentMock;
  let initiateAlternativeFormOfPaymentMock;
  let initiateVoidTransactionFnMock;
  let props;
  let pushMock;
  let refreshFundsFnMock;
  let resumeDataFnMock;
  let satelliteTrackMock;
  let saveFormDataFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let shouldGotoPayPalSignInFnMock;
  let shouldResumeDataFnMock;
  let traceAirChangePaymentTypeFnMock;

  const contactMethodInfo = new ContactMethodInfoBuilder().build();
  const paymentInfo = {
    isoCountryCode: 'US',
    selectedCardId: NEW_CREDIT_CARD_ID
  };
  const reviewMessages = [
    {
      body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on its way to your next destination.",
      header: '',
      icon: 'WARNING',
      key: 'BOOKING_PURCHASE_OVERNIGHT',
      textColor: 'DEFAULT'
    }
  ];

  const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build();
  const windowSatellite = window._satellite;

  beforeEach(() => {
    changeFlightFnMock = jest.fn();
    getMoneyTotalForAirChangeMock = jest.spyOn(AlternativeFormsOfPaymentHelper, 'getMoneyTotalForAirChange');
    getNewApplePayCardMock = jest.spyOn(ApplePayHelper, 'getNewApplePayCard');
    getPassengerInfoFnMock = jest.fn();
    getPaymentOptionsFnMock = jest.fn().mockResolvedValue({});
    gotoPayPalSignInFnMock = jest.fn();
    hasSelectedAlternativeFormOfPaymentMock = jest.fn();
    initiateAlternativeFormOfPaymentMock = jest.fn();
    initiateVoidTransactionFnMock = jest.fn();
    pushMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    shouldResumeDataFnMock = jest.fn();
    refreshFundsFnMock = jest.fn();
    resumeDataFnMock = jest.fn();
    satelliteTrackMock = jest.fn();
    saveFormDataFnMock = jest.fn().mockResolvedValue({ type: 'FAKE-ACTION' });
    shouldGotoPayPalSignInFnMock = jest.fn();
    traceAirChangePaymentTypeFnMock = jest.fn();
    window._satellite = { track: satelliteTrackMock };

    props = {
      applePayCard: null,
      changeFlightFn: changeFlightFnMock,
      changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`,
      contactMethodInfo,
      fundsAppliedToken: null,
      getPassengerInfoFn: getPassengerInfoFnMock,
      getPaymentOptionsFn: getPaymentOptionsFnMock,
      gotoPayPalSignInFn: gotoPayPalSignInFnMock,
      hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentMock,
      initiateAlternativeFormOfPaymentFn: initiateAlternativeFormOfPaymentMock,
      initiateVoidTransactionFn: initiateVoidTransactionFnMock,
      isLoggedIn: false,
      paymentInfo,
      push: pushMock,
      refreshFundsFn: refreshFundsFnMock,
      resumeDataFn: resumeDataFnMock,
      savedCreditCards,
      saveFormDataFn: saveFormDataFnMock,
      searchRequest: {
        departureAndReturnDate: {
          departureDate: '2018-05-11',
          returnDate: '2018-05-13'
        },
        from: 'AUS',
        to: 'DAL'
      },
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnMock,
      shouldResumeDataFn: shouldResumeDataFnMock,
      traceAirChangePaymentTypeFn: traceAirChangePaymentTypeFnMock
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    window._satellite = windowSatellite;
  });

  describe('render', () => {
    it('should return null and not render the page if changePricingPage prop isEmpty', () => {
      const instance = createRef();

      createComponent({ changePricingPage: {}, instance });

      const result = instance.current.render();

      expect(result).toBe(null);
    });
  });

  describe('display', () => {
    it('should pass correct props to child component', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('get paymentOptions', () => {
    const savedCreditCards = { primaryCard: null, otherCards: [] };

    it('should call getPaymentOptionsFn when user logged in and not have savedCreditCards in store', () => {
      createComponent({
        isLoggedIn: true,
        paymentInfo: {},
        savedCreditCards
      });

      expect(getPaymentOptionsFnMock).toHaveBeenCalled();
    });

    it('should call traceAirChangePaymentTypeFn twice when user logged in and not have savedCreditCards in store', async () => {
      createComponent({
        isLoggedIn: true,
        paymentInfo: {},
        savedCreditCards
      });

      await getPaymentOptionsFnMock;

      expect(traceAirChangePaymentTypeFnMock.mock.calls.length).toEqual(2);
    });

    it('should not call getPaymentOptionsFn when user not logged in and not have savedCreditCards in store', () => {
      createComponent({ savedCreditCards });

      expect(getPaymentOptionsFnMock).not.toHaveBeenCalled();
    });

    it('should not call getPaymentOptionsFn when user logged in and have savedCreditCards in store', () => {
      createComponent(AirChangeReviewPage, { isLoggedIn: true });

      expect(getPaymentOptionsFnMock).not.toHaveBeenCalled();
    });
  });

  describe('get passengerInfo', () => {
    it('should call getPassengerInfoFn when user logged in and not have contactMethodInfo in store', () => {
      createComponent({
        isLoggedIn: true,
        contactMethodInfo: {}
      });

      expect(getPassengerInfoFnMock).toHaveBeenCalledWith(false);
    });

    it('should call getPassengerInfoFn with international argument true', () => {
      props.changePricingPage._meta.isInternational = true;

      createComponent({
        ...props,
        isLoggedIn: true,
        contactMethodInfo: {}
      });

      expect(getPassengerInfoFnMock).toHaveBeenCalledWith(true);
    });

    it('should not call getPassengerInfoFn when user not logged in and not have contactMethodInfo in store', () => {
      createComponent(AirChangeReviewPage, { contactMethodInfo: {} });

      expect(getPassengerInfoFnMock).not.toHaveBeenCalled();
    });

    it('should not call getPassengerInfoFn when user logged in and have contactMethodInfo in store', () => {
      createComponent(AirChangeReviewPage, { isLoggedIn: true });

      expect(getPassengerInfoFnMock).not.toHaveBeenCalled();
    });
  });

  describe('click contact method', () => {
    it('should transition to contact method page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent();

      fireEvent.click(container.querySelector('a[name="contactMethodContent"]'));

      expect(pushMock).toHaveBeenCalledWith('/air/change/contact-method');
    });
  });

  describe('click apply travel funds', () => {
    it('should transition to apply travel funds page', () => {
      const { container } = createComponent();

      fireEvent.click(
        container.querySelector('div[data-qa="review-form--apply-travel-funds-nav-item"] a.nav-item-field')
      );

      expect(pushMock).toHaveBeenCalled();
      expect(satelliteTrackMock).toHaveBeenCalledWith('apply travel funds');
    });
  });

  describe('click payment info', () => {
    it('should transition to payment page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.payment-nav-item-field .nav-item-link'));

      expect(pushMock).toHaveBeenCalledWith('/air/change/payment?airportsCode=AUS-DAL');
    });
  });

  describe('make changes', () => {
    const paymentInfo = {
      selectedCardId: '1-ENKDD',
      isoCountryCode: 'US',
      isPrimary: false
    };

    it('should give call changeFlightFn when click change button with funds applied', () => {
      const instance = createRef();
      const mockFormData = {
        ...props.formData,
        emailReceiptTo: 'a@aa.com',
        refundMethod: 'HOLD_FUTURE_USE'
      };

      createComponent({
        changePricingPage: downGradeForRoundTripSinglePax.changePricingPage,
        fundsAppliedToken: 'funds-token',
        instance
      });

      instance.current._onSubmit(mockFormData);

      expect(changeFlightFnMock.mock.calls[0][0]).toEqual(
        {
          contactMethodInfo,
          emailReceiptTo: 'a@aa.com',
          refundMethod: 'HOLD_FUTURE_USE',
          paymentRequired: false,
          moneyTotalFare: undefined,
          payPal: undefined,
          shouldSaveAsPrimaryCard: false,
          fundsAppliedToken: 'funds-token',
          applePayCard: null
        },
        downGradeForRoundTripSinglePax.changePricingPage._links.changeConfirmationPage,
        false
      );
    });

    describe('dollar upgrade', () => {
      it('should give call changeFlightFn when click change button for dollar upGrade', () => {
        const instance = createRef();
        const mockFormData = {
          ...props.formData,
          emailReceiptTo: 'a@aa.com',
          paymentInfo
        };

        createComponent({ paymentInfo, instance });

        instance.current._onSubmit(mockFormData);

        expect(changeFlightFnMock.mock.calls[0][0]).toEqual(
          {
            contactMethodInfo,
            emailReceiptTo: 'a@aa.com',
            paymentInfo,
            shouldSaveAsPrimaryCard: false,
            moneyTotalFare: { amount: '515.78', currencyCode: 'USD', currencySymbol: '$' },
            paymentRequired: true,
            payPal: undefined,
            fundsAppliedToken: null,
            applePayCard: null
          },
          upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage._links.changeConfirmationPage,
          false
        );
      });

      it('should give call changeFlightFn when click change button for dollar upGrade with travel funds', () => {
        const instance = createRef();
        const fundsAppliedToken = '123456789';
        const mockFormData = {
          ...props.formData,
          emailReceiptTo: 'a@aa.com',
          paymentInfo
        };

        createComponent({ fundsAppliedToken, instance, paymentInfo });

        instance.current._onSubmit(mockFormData);

        expect(changeFlightFnMock.mock.calls[0][0]).toEqual(
          {
            contactMethodInfo,
            emailReceiptTo: 'a@aa.com',
            paymentInfo,
            shouldSaveAsPrimaryCard: false,
            moneyTotalFare: { amount: '515.78', currencyCode: 'USD', currencySymbol: '$' },
            paymentRequired: true,
            payPal: undefined,
            fundsAppliedToken,
            applePayCard: null
          },
          upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage._links.changeConfirmationPage,
          false
        );
      });
    });

    it('should give call changeFlightFn when click change button for points booking and tax upGrade', () => {
      const instance = createRef();
      const mockFormData = {
        ...props.formData,
        emailReceiptTo: 'a@aa.com',
        paymentInfo
      };

      createComponent({
        paymentInfo,
        changePricingPage: pointsSinglePaxOneWayUpgradeTaxUpgrade.changePricingPage,
        instance
      });

      instance.current._onSubmit(mockFormData);

      expect(changeFlightFnMock.mock.calls[0][0]).toEqual(
        {
          contactMethodInfo,
          emailReceiptTo: 'a@aa.com',
          paymentInfo,
          shouldSaveAsPrimaryCard: false,
          moneyTotalFare: { amount: '2.80', currencyCode: 'USD', currencySymbol: '$' },
          paymentRequired: true,
          payPal: undefined,
          fundsAppliedToken: null,
          applePayCard: null
        },
        pointsSinglePaxOneWayUpgradeTaxUpgrade.changePricingPage._links.changeConfirmationPage,
        false
      );
    });

    describe('paypal', () => {
      it('should trigger redirect to PayPal SignIn when paypal form of payment is used', () => {
        const instance = createRef();

        createComponent({
          changePricingPage: pointsSinglePaxOneWayUpgradeTaxUpgrade.changePricingPage,
          instance,
          paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' }
        });

        shouldGotoPayPalSignInFnMock.mockReturnValueOnce(true);
        getMoneyTotalForAirChangeMock.mockReturnValueOnce({
          amount: '2.80',
          currencyCode: 'USD',
          currencySymbol: '$'
        });

        instance.current._onSubmit({});

        expect(gotoPayPalSignInFnMock.mock.calls[0][0]).toEqual(
          {
            amount: '2.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          {
            contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`,
            emailReceiptTo: 'testemail@wnco.com',
            paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' }
          }
        );

        expect(changeFlightFnMock).not.toHaveBeenCalled();
      });

      it('should trigger makeChange when returning from PayPal with successfully authorized', (done) => {
        const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };

        shouldResumeDataFnMock.mockReturnValueOnce(true);
        resumeDataFnMock.mockReturnValueOnce(
          Promise.resolve({
            formData: { paymentInfo },
            payPal: {
              paypal: {
                paypalToken: 'EC-123'
              }
            },
            isFromPayPalAuthorized: true
          })
        );

        createComponent({
          paymentInfo,
          history: {
            location: {
              pathname: '/air/change/pricing/review/paypal'
            }
          }
        });

        // TODO: Rewrite this test to avoid needing waitFor
        waitFor.untilAssertPass(() => {
          expect(gotoPayPalSignInFnMock).not.toHaveBeenCalled();
          expect(changeFlightFnMock.mock.calls[0][0].payPal).toEqual({
            paypal: { paypalToken: 'EC-123' }
          });
        }, done);
      });

      it('should not trigger makeChange when returning from PayPal with authorized failed', (done) => {
        const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };

        shouldResumeDataFnMock.mockReturnValueOnce(true);
        resumeDataFnMock.mockReturnValueOnce(
          Promise.resolve({
            formData: { paymentInfo },
            payPal: {
              paypal: {
                paypalToken: 'EC-123'
              }
            },
            isFromPayPalAuthorized: false
          })
        );

        createComponent({
          paymentInfo,
          history: {
            location: {
              pathname: '/air/change/pricing/review/paypal'
            }
          }
        });

        waitFor.untilAssertPass(() => {
          expect(changeFlightFnMock).not.toHaveBeenCalled();
        }, done);
      });
    });
  });

  describe('apple pay', () => {
    it('should call initiateAlternativeFormOfPayment if hasSelectedAlternativeFormOfPayment returns true', (done) => {
      const instance = createRef();
      const moneyTotalMockValues = { amount: '2.80', currencyCode: 'USD', currencySymbol: '$' };
      const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };

      hasSelectedAlternativeFormOfPaymentMock.mockReturnValueOnce(true);
      getMoneyTotalForAirChangeMock.mockReturnValueOnce(moneyTotalMockValues);

      createComponent({ instance, paymentInfo });

      instance.current._onSubmit({
        paymentInfo
      });

      waitFor.untilAssertPass(() => {
        expect(saveFormDataFnMock).toHaveBeenCalledWith({
          paymentInfo: {
            selectedCardId: 'APPLE_PAY_CARD_ID',
            type: 'APPLE_PAY'
          }
        });
        expect(initiateAlternativeFormOfPaymentMock).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);
        expect(changeFlightFnMock).not.toHaveBeenCalled();
      }, done);
    });

    it('should call _changeFlight if componentDidUpdate has a new apple pay card', () => {
      const applePayCard = {
        ...getApplePayCard(),
        formData: { contactMethodContent: '' }
      };
      const instance = createRef();

      createComponent({ instance });

      getNewApplePayCardMock.mockReturnValueOnce(applePayCard);
      instance.current.componentDidUpdate(instance.current.props);

      expect(changeFlightFnMock).toHaveBeenCalled();
    });

    it('should not call _changeFlight if componentDidUpdate does not have a new apple pay card', () => {
      const instance = createRef();

      createComponent({ instance });

      getNewApplePayCardMock.mockReturnValueOnce(null);

      instance.current.componentDidUpdate(instance.current.props);

      expect(changeFlightFnMock).not.toHaveBeenCalled();
    });

    it('should call initiateVoidTransactionFn when session expired and continue as guest selected', () => {
      const instance = createRef();
      const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };
      const applePayCard = {
        ...getApplePayCard(),
        formData: { contactMethodContent: '' }
      };

      hasSelectedAlternativeFormOfPaymentMock.mockReturnValueOnce(true);
      createComponent({
        instance,
        paymentInfo,
        applePayCard: applePayCard,
        CEPTOR_VOID_API: true
      });

      instance.current._continueAsGuest({ paymentInfo: paymentInfo });

      expect(initiateVoidTransactionFnMock).toHaveBeenCalled();
    });

    it('should not call initiateVoidTransactionFn when session expired and continue as guest selected with selected payment uplift', () => {
      const instance = createRef();
      const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };
      const applePayCard = {
        ...getApplePayCard(),
        formData: { contactMethodContent: '' }
      };

      hasSelectedAlternativeFormOfPaymentMock.mockReturnValueOnce(false);

      createComponent({
        instance,
        paymentInfo,
        applePayCard: applePayCard,
        CEPTOR_VOID_API: true
      });

      instance.current._continueAsGuest({ paymentInfo: paymentInfo });

      expect(initiateVoidTransactionFnMock).not.toHaveBeenCalled();
    });

    it('should call setReLoginCallbackFunctionsFn for points booking with continueAsGuest null', () => {
      const instance = createRef();

      createComponent({ instance, paymentInfo, loginType: LOGIN_TYPES.POINTS });
      instance.current._onSubmit({
        paymentInfo
      });
      const { continueAsGuestFn } = setReLoginCallbackFunctionsFnMock.mock.calls[0][0];

      expect(continueAsGuestFn).toBeNull();
    });
  });

  describe('componentDidUpdate', () => {
    it('should resume from PayPal', (done) => {
      const instance = createRef();
      const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };

      shouldResumeDataFnMock.mockReturnValue(true);
      resumeDataFnMock.mockReturnValue(
        Promise.resolve({
          formData: {},
          payPal: {
            paypal: {
              paypalToken: 'EC-123'
            }
          },
          isFromPayPalAuthorized: true
        })
      );

      createComponent({
        history: {
          location: {
            pathname: '/air/change/pricing/review/paypal'
          }
        },
        instance,
        paymentInfo
      });

      instance.current.componentDidUpdate(instance.current.props);

      expect(resumeDataFnMock).toHaveBeenCalled();

      waitFor.untilAssertPass(() => {
        expect(changeFlightFnMock.mock.calls[0][0].payPal).toEqual({ paypal: { paypalToken: 'EC-123' } });
      }, done);
    });
  });

  describe('API GW and cookies', () => {
    it('should call setReLoginCallbackFunctionsFn for dollar booking', () => {
      const instance = createRef();

      createComponent({ instance, paymentInfo });

      instance.current._onSubmit({
        paymentInfo
      });

      expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
    });

    it('should call setReLoginCallbackFunctionsFn for points booking', () => {
      const instance = createRef();

      createComponent({ instance, paymentInfo }, { loginType: LOGIN_TYPES.POINTS });

      instance.current._onSubmit({
        paymentInfo
      });

      const { continueAsGuestFn } = setReLoginCallbackFunctionsFnMock.mock.calls[0][0];

      expect(continueAsGuestFn).not.toBeNull();

      expect(setReLoginCallbackFunctionsFnMock).toHaveBeenCalled();
    });
  });

  describe('Review Message', () => {
    it('should display review messages when received reviewMessages with purchase data', () => {
      const newProps = {
        ...props,
        changePricingPage: {
          ...props.changePricingPage,
          reviewMessages: [...reviewMessages]
        }
      };

      const { container } = createComponent({ ...newProps });

      expect(container.querySelector('.review-message')).not.toBeNull();
    });

    it('should not display review messages when received reviewMessages as null with purchase data', () => {
      const newProps = {
        ...props,
        changePricingPage: {
          ...props.changePricingPage,
          reviewMessages: null
        }
      };

      const { container } = createComponent({ ...newProps });

      expect(container.querySelector('.review-message')).toBeNull();
    });
  });

  const createComponent = (customProps = {}) => {
    const mergedProps = {
      ...props,
      ...customProps
    };

    return integrationRender()({}, AirChangeReviewPage, { ...mergedProps });
  };
});
