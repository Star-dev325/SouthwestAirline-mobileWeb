import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { TRAVEL_FUNDS } from 'src/companion/constants/companionConstants';
import { CompanionPurchaseSummaryPage } from 'src/companion/pages/companionPurchaseSummaryPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import * as AlternativeFormsOfPaymentHelper from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import * as ApplePayHelper from 'src/shared/helpers/applePayHelper';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import CompanionPassengerPageBuilder from 'test/builders/model/companionPassengerPageBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import { getCompanionPassengerInfos } from 'test/builders/model/passengerInfosBuilder';
import { getApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';

describe('Companion Purchase Summary page', () => {
  const { TOKEN_EXPIRED_COMPANION_URL } = TRAVEL_FUNDS;
  let pushStub;
  let goToCompanionConfirmationPageStub;
  let fetchEarlybirdPricingFnStub;
  let savePurchaseSummaryFormFnStub;
  let savePaymentInfoFnStub;
  let gotoPayPalSignInFnStub, resumeDataFnStub, shouldGotoPayPalSignInFnStub, shouldResumeDataFnStub;
  let refreshFundsFnStub;
  let satelliteTrackStub;
  let getMoneyTotalForAirBookingStub;
  let getNewApplePayCardStub;
  let hasSelectedAlternativeFormOfPaymentStub;
  let initiateAlternativeFormOfPaymentStub;
  let saveFormDataFnStub;

  const outbound = new BriefBoundBuilder().build();
  const inbound = new BriefBoundBuilder()
    .withDepartureAirportCode('OAK')
    .withArrivalAirportCode('LAS')
    .withDepartureDate('2017-11-28')
    .withDepartureDayOfWeek('Tuesday')
    .build();
  const tripSummary = {
    bounds: [outbound, inbound],
    passengerCountDescription: '2 Passenger Total',
    currency: {
      amount: '234.30',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  };
  const passengers = [
    {
      name: 'Amber Awesome'
    }
  ];
  const priceTotal = new PriceTotalBuilder().build();
  const contactMethodInfo = new ContactMethodInfoBuilder().build();
  const passengerInfos = getCompanionPassengerInfos();
  const flightPricingPageResponse = new PricesBuilder().build();
  const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();

  beforeEach(() => {
    pushStub = jest.fn();
    goToCompanionConfirmationPageStub = jest.fn();
    fetchEarlybirdPricingFnStub = jest.fn();
    savePurchaseSummaryFormFnStub = jest.fn();
    savePaymentInfoFnStub = jest.fn();
    shouldResumeDataFnStub = jest.fn();
    resumeDataFnStub = jest.fn();
    shouldGotoPayPalSignInFnStub = jest.fn();
    gotoPayPalSignInFnStub = jest.fn();
    refreshFundsFnStub = jest.fn();
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    getMoneyTotalForAirBookingStub = jest.spyOn(AlternativeFormsOfPaymentHelper, 'getMoneyTotalForAirBooking');
    getNewApplePayCardStub = jest.spyOn(ApplePayHelper, 'getNewApplePayCard');
    hasSelectedAlternativeFormOfPaymentStub = jest.fn();
    initiateAlternativeFormOfPaymentStub = jest.fn();
    saveFormDataFnStub = jest.fn().mockResolvedValue(Promise.resolve({ type: 'FAKE-ACTION' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should pass the right format property to PurchaseSummaryForm', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    describe('hazmat disclaimer for purchase', () => {
      it('should render disclaimer with correct text', () => {
        const { container } = createComponent();

        expect(container.querySelector('.purchase-disclaimer').textContent).toEqual(i18n('PURCHASE_DISCLAIMER'));
      });
    });

    it('should auto-purchase when return from PayPal and authorized successfully', (done) => {
      shouldResumeDataFnStub.mockReturnValue(true);
      resumeDataFnStub.mockReturnValue(
        Promise.resolve({
          formData: {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          },
          payPal: {
            paypalToken: 'EC-123'
          },
          isFromPayPalAuthorized: true
        })
      );
      const props = {
        history: {
          location: {
            pathname: '/companion/purchase/paypal'
          }
        }
      };

      createComponent(props);

      waitFor.untilAssertPass(() => {
        expect(goToCompanionConfirmationPageStub).toHaveBeenCalled();
      }, done);
    });

    it('should stay on purchase summary page when return from PayPal and authorized failed', (done) => {
      shouldResumeDataFnStub.mockReturnValue(true);
      resumeDataFnStub.mockReturnValue(
        Promise.resolve({
          formData: {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          },
          payPal: {
            paypalToken: 'EC-123'
          },
          isFromPayPalAuthorized: false
        })
      );
      const props = {
        history: {
          location: {
            pathname: '/companion/purchase/paypal'
          }
        }
      };

      createComponent(props);

      waitFor.untilAssertPass(() => {
        expect(goToCompanionConfirmationPageStub).not.toBeCalled();
      }, done);
    });

    it('should send the correct moneyTotal to PayPal when travel funds were used', () => {
      shouldGotoPayPalSignInFnStub.mockReturnValue(true);

      const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };
      const balanceRemaining = {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      getMoneyTotalForAirBookingStub.mockReturnValue(balanceRemaining);

      const { container } = createComponent({
        paymentInfo,
        travelFundsBalanceRemaining: balanceRemaining,
        fundsAppliedToken: 'funds-token'
      });

      fireEvent.submit(container.querySelector('form'));

      expect(gotoPayPalSignInFnStub).toHaveBeenCalledWith(
        {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        {
          applyTravelFunds: '',
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
          isEarlyBirdInPathRadioButtonChecked: false,
          paymentInfo: {
            selectedCardId: 'PAY_PAL_CARD_ID',
            type: 'PAYPAL'
          },
          purposeOfTravel: ''
        }
      );
      expect(goToCompanionConfirmationPageStub).not.toBeCalled();
    });
  });

  describe('apple pay', () => {
    it('should call initiateAlternativeFormOfPayment if hasSelectedAlternativeFormOfPayment returns true', (done) => {
      hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

      const newMoneyTotal = {
        amount: '125.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      getMoneyTotalForAirBookingStub.mockReturnValue(newMoneyTotal);

      const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };
      const { container } = createComponent({ paymentInfo });

      fireEvent.submit(container.querySelector('form'));

      waitFor.untilAssertPass(() => {
        expect(saveFormDataFnStub).toHaveBeenCalledWith({
          applyTravelFunds: '',
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
          isEarlyBirdInPathRadioButtonChecked: false,
          paymentInfo: {
            selectedCardId: 'APPLE_PAY_CARD_ID',
            type: 'APPLE_PAY'
          },
          purposeOfTravel: ''
        });
        expect(initiateAlternativeFormOfPaymentStub).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);

        expect(goToCompanionConfirmationPageStub).not.toBeCalled();
      }, done);
    });

    it('should call _purchase if componentDidUpdate has a new apple pay card', () => {
      const { rerender } = createComponent();
      const applePayCard = { ...getApplePayCard(), ...{ formData: { contactMethodContent: '' } } };

      getNewApplePayCardStub.mockReturnValue(applePayCard);

      rerender(
        <Provider store={store}>
          <CompanionPurchaseSummaryPage {...getDefaultProps()} {...applePayCard} />
        </Provider>
      );

      expect(getNewApplePayCardStub).toHaveBeenCalled();
      expect(goToCompanionConfirmationPageStub).toHaveBeenCalled();
    });

    it('should not call _callPurchaseFlightFn if componentDidUpdate does not have a new apple pay card', () => {
      const { rerender } = createComponent();
      const applePayCard = { ...getApplePayCard(), ...{ formData: { contactMethodContent: '' } } };

      getNewApplePayCardStub.mockReturnValue(null);

      rerender(
        <Provider store={store}>
          <CompanionPurchaseSummaryPage {...getDefaultProps()} {...applePayCard} />
        </Provider>
      );

      expect(getNewApplePayCardStub).toBeCalled();
      expect(goToCompanionConfirmationPageStub).not.toHaveBeenCalled();
    });
  });

  describe('purchase', () => {
    it('should go to summary confirmation page', () => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(goToCompanionConfirmationPageStub).toBeCalled();

      const actionArgs = goToCompanionConfirmationPageStub.mock.calls[0][0];
      const {
        passengerInfos,
        isSavedAsPrimaryCard,
        earlyBirdEligibility: earlyBirdEligibilityInArgs,
        formId
      } = actionArgs;

      expect(passengerInfos).toEqual(getCompanionPassengerInfos());
      expect(isSavedAsPrimaryCard).toBeFalsy();
      expect(earlyBirdEligibilityInArgs).toEqual(earlyBirdEligibility);
      expect(formId).toEqual('COMPANION_PURCHASE_SUMMARY_FORM');
    });

    describe('paypal', () => {
      it('should trigger redirect to PayPal SignIn when paypal form of payment is used', () => {
        shouldGotoPayPalSignInFnStub.mockReturnValue(true);

        const { container } = createComponent({
          paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' }
        });

        const moneyTotal = {
          amount: '233.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        };

        getMoneyTotalForAirBookingStub.mockReturnValue(moneyTotal);

        fireEvent.submit(container.querySelector('form'));

        expect(gotoPayPalSignInFnStub).toHaveBeenCalledWith(moneyTotal, {
          applyTravelFunds: '',
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
          isEarlyBirdInPathRadioButtonChecked: false,
          purposeOfTravel: '',
          paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' }
        });

        expect(goToCompanionConfirmationPageStub).not.toBeCalled();
      });
    });
  });

  describe('transition', () => {
    const pushStub = jest.fn();

    describe('trip and price', () => {
      it('should go to companion trip and price details page when click trip and price details', () => {
        const { container } = createComponent({
          push: pushStub
        });

        fireEvent.click(container.querySelector('.trip-summary a'));

        expect(pushStub).toHaveBeenCalledWith('/companion/review');
      });
    });

    describe('passenger edit', () => {
      it('should go to companion passenger edit page when click passengerItem', () => {
        const { container } = createComponent({
          push: pushStub
        });

        fireEvent.click(container.querySelector('.passenger-info-summary .passenger-info-summary--item'));

        expect(pushStub).toHaveBeenCalledWith('/companion/passengerEdit');
      });
    });

    describe('contact method', () => {
      it('should to to contact method page when click contactMethod', () => {
        const { container } = createComponent({
          push: pushStub
        });

        fireEvent.click(container.querySelector('a[name="contactMethodContent"]'));

        expect(pushStub).toHaveBeenCalledWith('/companion/contact-method');
      });
    });
  });

  describe('earlyBird', () => {
    it('should get earlybird price when come to CompanionPurchaseSummaryPage', () => {
      createComponent();

      expect(fetchEarlybirdPricingFnStub).toHaveBeenCalled();
    });
  });

  describe('ApplyTravelFunds', () => {
    let applyTravelFundsNavItem;

    beforeEach(() => {
      const { container } = createComponent();

      applyTravelFundsNavItem = container.querySelector('.apply-travel-funds-nav-item .nav-item-field');
    });

    it('should prop false for Funds Applied if no fundsAppliedToken exists', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should send fundsAppliedToken and travelFundsBalanceRemaining null to purchase call if they do not exist', () => {
      const instance = React.createRef();
      const { container } = createComponent({
        isLoggedIn: true,
        fundsAppliedToken: null,
        travelFundsBalanceRemaining: null,
        ref: instance
      });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav .purchase'));

      expect(goToCompanionConfirmationPageStub).toHaveBeenCalled();
    });

    it('should send fundsAppliedToken and travelFundsBalanceRemaining to purchase call if they exist', () => {
      const props = {
        isLoggedIn: true,
        checkSessionExpired({ next }) {
          next();
        },
        fundsAppliedToken: 'funds-token',
        travelFundsBalanceRemaining: new PriceTotalBuilder().build().totals.moneyTotal
      };
      const instance = React.createRef();

      createComponent({ props, ref: instance });

      instance.current._purchase(props);

      expect(goToCompanionConfirmationPageStub).toHaveBeenCalled();
    });

    it('should render the Apply Travel Funds nav item', () => {
      expect(applyTravelFundsNavItem).not.toBeNull();
    });

    it('should navigate to the apply travel funds page when clicking the travel funds nav item', () => {
      fireEvent.click(applyTravelFundsNavItem);
      expect(satelliteTrackStub).toHaveBeenCalledWith('apply travel funds');
      expect(pushStub).toHaveBeenCalledWith('/companion/apply-travel-funds?clearFormData=false');
    });

    it('should not refresh the calculated travel funds on page load if no fundsAppliedToken exists', () => {
      expect(refreshFundsFnStub).not.toBeCalled();
    });

    it('should refresh the calculated travel funds on page load if a fundsAppliedToken already exists', () => {
      createComponent({
        fundsAppliedToken: 'funds-token'
      });
      expect(refreshFundsFnStub).toHaveBeenCalledWith(
        {
          body: {
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '600597056',
                dateOfBirth: '1959-12-22',
                gender: 'M',
                name: {
                  firstName: 'Companion',
                  lastName: 'Wang',
                  middleName: '',
                  suffix: null
                },
                passengerReference: 2,
                passengerType: 'ADULT'
              }
            ]
          },
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'POST'
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );
    });

    it('should go to billing address page and fire satellite event when nav item is clicked', () => {
      const { container } = createComponent({
        travelFundsBalanceRemaining: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });

      const billingAddressNavItem = container.querySelector('.billing-address-nav-item .nav-item-field');

      expect(billingAddressNavItem).not.toBeNull();

      fireEvent.click(billingAddressNavItem);

      expect(satelliteTrackStub).toHaveBeenCalledWith('travel funds billing address');
      expect(pushStub).toHaveBeenCalledWith('/companion/billing-address');
    });
  });

  const getDefaultProps = () => ({
    isLoggedIn: true,
    priceTotal,
    purchaseSummaryPage: {
      tripSummary,
      passengers,
      priceTotal
    },
    formData: null,
    paymentInfo: {},
    contactMethodInfo,
    flightPricingPageResponse,
    passengerInfos,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
    earlyBirdEligibility,
    declineNotifications: false,
    shouldShowEarlyBirdInPath: true,
    push: pushStub,
    history: {
      location: {
        pathname: 'companion/purchase'
      }
    },
    companionAccountNumber: '1234567',
    goToCompanionConfirmationPageFn: goToCompanionConfirmationPageStub,
    fetchEarlybirdPricingFn: fetchEarlybirdPricingFnStub,
    contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
    switchEarlyBirdInPathButtonFn: () => {},
    savePurchaseSummaryFormFn: savePurchaseSummaryFormFnStub,
    accountNumber: '601425985',
    savePaymentInfoFn: savePaymentInfoFnStub,
    companionPassengerPage: new CompanionPassengerPageBuilder().build(),
    shouldResumeDataFn: shouldResumeDataFnStub,
    resumeDataFn: resumeDataFnStub,
    shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnStub,
    gotoPayPalSignInFn: gotoPayPalSignInFnStub,
    refreshFundsFn: refreshFundsFnStub,
    fundsAppliedToken: null,
    itineraryPricingToken: 'itinerary-token',
    hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentStub,
    initiateAlternativeFormOfPaymentFn: initiateAlternativeFormOfPaymentStub,
    saveFormDataFn: saveFormDataFnStub,
    applePayCard: null,
    EARLY_BIRD_AB_TESTING: false
  });

  const state = {
    app: {
      toggles: {
        EARLY_BIRD_AB_TESTING: false
      },
      airBooking: {
        earlyBirdEligibility
      }
    }
  };
  const store = createMockStoreWithRouterMiddleware()(state);

  const createComponent = (props = {}) => {
    const defaultProps = getDefaultProps();

    return render(
      <Provider store={store}>
        <CompanionPurchaseSummaryPage {...defaultProps} {...props} />
      </Provider>
    );
  };
});
