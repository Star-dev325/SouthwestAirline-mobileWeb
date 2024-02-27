jest.mock('src/shared/helpers/webViewHelper', () => ({
  debouncedFn: jest.fn((fn) => fn())
}));

import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes.js';
import { PurchaseSummaryPage } from 'src/airBooking/pages/purchaseSummaryPage';
import { RR_VISA_PAYMENT_INFO } from 'src/chase/constants/chaseConstants';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import * as AlternativeFormsOfPaymentHelper from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import * as ApplePayHelper from 'src/shared/helpers/applePayHelper';
import * as UpliftHelper from 'src/shared/helpers/upliftHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import localStorage from 'store2';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import { getMultipleAdultPassengers, getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';
import {
  getApplePayCard,
  getPaymentInfoForUseNewCreditCard,
  getUpliftCard
} from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { getParentOrGuardianFormData } from 'test/builders/model/youngTravelerPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM } from 'src/shared/constants/formIds';

const { EXTERNAL_TARGETS } = SharedConstants;
const { index } = airBookingRoutes;
const travelFunds = [
  {
    expirationDate: '2020-2-20',
    travelFundType: 'SPLIT_PAYMENT',
    displayName: 'Fred Flintstone',
    leisureFund: false,
    fundIdentifier: 'ABC123',
    errorMessage: null,
    appliedAmount: {
      amount: '408.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    remainingAmount: {
      amount: '30.70',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    pointsRemaining: 'Remaining balance 92,315 pts',
    appliedPointsAmount: {
      amount: '14,214',
      currencyCode: 'PTS',
      currencySymbol: 'PTS'
    },
    _links: null
  }
];

describe('Purchase Summary page', () => {
  const { PURCHASE_PAGE_LOAD } = ANALYTICS;
  let addHistoryBackToHomeFnStub;
  let clearFormDataByIdFnStub;
  let fetchEarlybirdPricingStub;
  let fetchSavedCreditCardsFnStub;
  let generatePurchaseSummaryPageFnStub;
  let getChaseApplicationStatusFnStub;
  let getMoneyTotalForAirBookingStub;
  let getNewApplePayCardStub;
  let getNewUpliftCardStub;
  let getSplitPayOptionsListFnStub;
  let gotoPayPalSignInFnStub, resumeDataFnStub, shouldGotoPayPalSignInFnStub, shouldResumeDataFnStub;
  let handleFirmOfferOfCreditFnStub;
  let hasSelectedAlternativeFormOfPaymentStub;
  let initiateAlternativeFormOfPaymentStub;
  let initiateVoidTransactionFnStub;
  let loadPurchasePagePlacementsFnStub;
  let persistAppStateFnStub;
  let purchaseFlightFnStub;
  let pushStub;
  let refreshFundsFnStub;
  let reloadAndSubmitAlternativeFormOfPaymentFnStub;
  let removeFrequentTravelerSelectedByPaxNumberFnStub;
  let resumeAppStateFnStub;
  let resumeSplitPayAfterLoginFnStub;
  let saveShouldCallPlacementFnStub;
  let satelliteTrackStub;
  let saveFormDataFnStub;
  let savePurchaseSummaryFormStub;
  let setChaseBannerShownFnStub;
  let setExternalPaymentAuthorizedSearchStringFnStub;
  let setIsExpressCheckoutFnStub;
  let setPaymentInfoForChaseFnStub;
  let setReLoginCallbackFunctionsFnStub;
  let setShouldRetryInstantCreditsCallFnStub;
  let setWebViewDeepLinkContinueFnStub;
  let shouldResumeAppStateFnStub;
  let showDialogFnStub;
  let showNativeAppLoginFnStub;
  let traceYoungTravelerEditPageFnStub;
  let updateFrequentTravelerSelectionStub;

  beforeEach(() => {
    addHistoryBackToHomeFnStub = jest.fn();
    clearFormDataByIdFnStub = jest.fn();
    fetchEarlybirdPricingStub = jest.fn();
    fetchSavedCreditCardsFnStub = jest.fn();
    generatePurchaseSummaryPageFnStub = jest.fn();
    getChaseApplicationStatusFnStub = jest.fn();
    getMoneyTotalForAirBookingStub = jest.spyOn(AlternativeFormsOfPaymentHelper, 'getMoneyTotalForAirBooking');
    getNewApplePayCardStub = jest.spyOn(ApplePayHelper, 'getNewApplePayCard');
    getNewUpliftCardStub = jest.spyOn(UpliftHelper, 'getNewUpliftCard');
    getSplitPayOptionsListFnStub = jest.fn();
    gotoPayPalSignInFnStub = jest.fn();
    handleFirmOfferOfCreditFnStub = jest.fn();
    hasSelectedAlternativeFormOfPaymentStub = jest.fn();
    initiateAlternativeFormOfPaymentStub = jest.fn();
    initiateVoidTransactionFnStub = jest.fn();
    loadPurchasePagePlacementsFnStub = jest.fn(() => Promise.resolve());
    persistAppStateFnStub = jest.fn();
    purchaseFlightFnStub = jest.fn();
    pushStub = jest.fn();
    saveShouldCallPlacementFnStub = jest.fn();
    refreshFundsFnStub = jest.fn();
    reloadAndSubmitAlternativeFormOfPaymentFnStub = jest.fn();
    removeFrequentTravelerSelectedByPaxNumberFnStub = jest.fn();
    resumeAppStateFnStub = jest.fn();
    resumeDataFnStub = jest.fn();
    resumeSplitPayAfterLoginFnStub = jest.fn();
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    saveFormDataFnStub = jest.fn(() => Promise.resolve());
    savePurchaseSummaryFormStub = jest.fn();
    setChaseBannerShownFnStub = jest.fn();
    setExternalPaymentAuthorizedSearchStringFnStub = jest.fn();
    setIsExpressCheckoutFnStub = jest.fn();
    setPaymentInfoForChaseFnStub = jest.fn();
    setReLoginCallbackFunctionsFnStub = jest.fn();
    setShouldRetryInstantCreditsCallFnStub = jest.fn();
    setWebViewDeepLinkContinueFnStub = jest.fn();
    shouldGotoPayPalSignInFnStub = jest.fn();
    shouldResumeAppStateFnStub = jest.fn();
    shouldResumeDataFnStub = jest.fn();
    showDialogFnStub = jest.fn();
    showNativeAppLoginFnStub = jest.fn();
    traceYoungTravelerEditPageFnStub = jest.fn();
    updateFrequentTravelerSelectionStub = jest.fn();

    jest.spyOn(LocalStorageCache, 'hasPayPalData').mockReturnValue(true);
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('PurchaseSummaryForm snapshot', () => {
      const { container } = createComponent();
      const purchaseSummaryForm = container.querySelector('.purchase-summary-form');

      expect(purchaseSummaryForm).toMatchSnapshot();
    });

    it('should update payment info with Chase Instant card ID when shouldShowChaseInstantCreditCard is true, no paymentInfo is present', () => {
      createComponent({
        paymentInfo: {},
        shouldShowChaseInstantCreditCard: true
      });

      expect(setPaymentInfoForChaseFnStub).toHaveBeenCalledWith(RR_VISA_PAYMENT_INFO);
    });

    describe('hazmat disclaimer for purchase', () => {
      it('should render disclaimer with correct text', () => {
        const { container } = createComponent();

        expect(container.querySelector('.purchase-disclaimer').textContent).toEqual(i18n('PURCHASE_DISCLAIMER'));
      });
    });
  });

  describe('chase application', () => {
    describe('componentDidMount', () => {
      describe('when shouldRetryInstantCreditsCall is true', () => {
        it('should call getChaseApplicationStatusFn', () => {
          createComponent({ shouldRetryInstantCreditsCall: true });

          expect(getChaseApplicationStatusFnStub).toHaveBeenCalled();
        });

        it('should not call generatePurchaseSummaryPageFn', () => {
          createComponent({ shouldRetryInstantCreditsCall: true });

          expect(generatePurchaseSummaryPageFnStub).not.toHaveBeenCalled();
        });
      });

      describe('bounds', () => {
        it('should not call clearFormDataByIdFn when tripSummary is null', () => {
          const props = { PurchaseSummaryPage: { tripSummary: null } };

          createComponent(props);

          expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
        });

        it('should not call clearFormDataByIdFn when tripSummary is an empty object', () => {
          const props = { PurchaseSummaryPage: { tripSummary: {} } };

          createComponent(props);

          expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
        });

        it('should not call clearFormDataByIdFn when bounds is an empty array', () => {
          const props = { PurchaseSummaryPage: { tripSummary: { bounds: [] } } };

          createComponent(props);

          expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
        });
      });

      describe('when shouldRetryInstantCreditsCall is false', () => {
        it('should not call getChaseApplicationStatusFn', () => {
          createComponent();

          expect(getChaseApplicationStatusFnStub).not.toHaveBeenCalled();
        });

        it('should call generatePurchaseSummaryPageFn', () => {
          createComponent();

          expect(generatePurchaseSummaryPageFnStub).toHaveBeenCalledWith({
            flightPricingPageResponse,
            passengerInfos
          });
        });
      });

      describe(`when frequentTravelerId and selectedFrequentTravelerId doesn't match `, () => {
        it('should call removeFrequentTravelerSelectedByPaxNumberFn', () => {
          createComponent();

          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).toHaveBeenCalledWith(0);
        });

        it('should call updateFrequentTravelerSelectionFn', () => {
          const passengerInfos = getPassengerInfos();

          passengerInfos[0].passengerInfo.frequentTravelerId = '1234';
          createComponent({ passengerInfos });

          expect(updateFrequentTravelerSelectionStub).toHaveBeenCalledWith({
            addFrequentTravelerToggle: false,
            frequentTravelerId: '1234',
            frequentTravelerToken: '',
            paxNumber: 0
          });
        });

        it('should call removeFrequentTravelerSelectedByPaxNumberFn', () => {
          const passengerInfos = getPassengerInfos();

          createComponent({ passengerInfos: [passengerInfos[0]] });

          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).toHaveBeenCalledWith(0);
        });

        it('should call updateFrequentTravelerSelectionFn when saveAsFrequentTraveler is true', () => {
          const passengerInfos = getPassengerInfos();

          passengerInfos[0].passengerInfo.saveAsFrequentTraveler = true;
          createComponent({ passengerInfos: [passengerInfos[0]] });

          expect(updateFrequentTravelerSelectionStub).toHaveBeenCalledWith({
            addFrequentTravelerToggle: false,
            frequentTravelerId: '',
            frequentTravelerToken: '',
            paxNumber: 0
          });
        });
      });
    });
  });

  describe('content placements', () => {
    describe('componentDidMount', () => {
      it('should load purchase placements and call analytics', (done) => {
        createComponent();

        waitFor.untilAssertPass(() => {
          expect(loadPurchasePagePlacementsFnStub).toHaveBeenCalled();
          expect(satelliteTrackStub).toHaveBeenCalledWith(PURCHASE_PAGE_LOAD);
        }, done);
      });

      it('should call analytics even if purchase placements fail', (done) => {
        loadPurchasePagePlacementsFnStub.mockReturnValue(Promise.reject());
        createComponent();

        waitFor.untilAssertPass(() => {
          expect(loadPurchasePagePlacementsFnStub).toHaveBeenCalled();
          expect(satelliteTrackStub).toHaveBeenCalledWith(PURCHASE_PAGE_LOAD);
        }, done);
      });
    });

    describe('bottomPromo1', () => {
      let saveChaseInstantCreditReturnUrlStub;

      beforeEach(() => {
        saveChaseInstantCreditReturnUrlStub = jest.spyOn(LocalStorageCache, 'saveChaseInstantCreditReturnUrl');
      });

      const bottomPromo1 = {
        promoImageBackground: 'backgroundImage',
        promoImageForeground: '',
        imageForegroundAltText: 'backgroundImageAltText',
        target: 'target',
        linkType: 'app',
        viewPortThreshold: 0.1,
        isChaseCombo: false,
        isChasePrequal: false,
        isChasePlacement: false,
        shouldObserveViewPort: false,
        contentBlockId: '',
        displayType: MOBILE_HERO
      };

      it('should show placement when bottomPromo1 exists and shouldShowChasePlacement', () => {
        const placements = { bottomPromo1 };
        const { container } = createComponent({ placements, shouldShowChasePlacement: true });

        expect(container.querySelector('.bottom-promo')).toBeInTheDocument();
      });

      it('should not show placement when placements are undefined', () => {
        const placements = undefined;
        const { container } = createComponent({ placements, shouldShowChasePlacement: true });

        expect(container.querySelector('.bottom-promo')).not.toBeInTheDocument();
        expect(handleFirmOfferOfCreditFnStub).not.toHaveBeenCalled();
      });

      it('should not show placement when bottomPromo1 does not exist', () => {
        const placements = {};
        const { container } = createComponent({ placements, shouldShowChasePlacement: true });

        expect(container.querySelector('.bottom-promo')).not.toBeInTheDocument();
        expect(handleFirmOfferOfCreditFnStub).not.toHaveBeenCalled();
      });

      it('should not show placement when shouldShowChasePlacement is false', () => {
        const placements = { bottomPromo1 };
        const { container } = createComponent({ placements, shouldShowChasePlacement: false });

        expect(container.querySelector('.bottom-promo')).not.toBeInTheDocument();
        expect(handleFirmOfferOfCreditFnStub).not.toHaveBeenCalled();
      });

      it('should handle onClick', (done) => {
        const placements = { bottomPromo1 };

        const pathname = 'pathname';
        const history = { location: { pathname } };

        const { container } = createComponent({ placements, shouldShowChasePlacement: true, history });

        fireEvent.click(container.querySelector('.image-placement--background-image'));

        waitFor.untilAssertPass(() => {
          expect(saveChaseInstantCreditReturnUrlStub).toHaveBeenCalledWith(pathname);
          expect(persistAppStateFnStub).toHaveBeenCalledWith(EXTERNAL_TARGETS.CHASE);
        }, done);
      });
    });
  });

  describe('purchase', () => {
    it('should not submit the form if corporate booking and payment options or passenger info results are missing', (done) => {
      const { container } = createComponent({
        isPaymentOptionsAndPassengerInfoFetched: false,
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

      waitFor.untilAssertPass(() => {
        expect(showDialogFnStub).toHaveBeenCalledWith({
          title: i18n('AIR_BOOKING__ERROR__CID_NOT_AVAILABLE')
        });
      }, done);
    });

    describe('paypal', () => {
      it('should trigger redirect to PayPal SignIn when paypal form of payment is used', () => {
        shouldGotoPayPalSignInFnStub.mockReturnValue(true);

        const { moneyTotal } = new PriceTotalBuilder().build().totals;

        getMoneyTotalForAirBookingStub.mockReturnValue(moneyTotal);

        const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };
        const { container } = createComponent({
          paymentInfo
        });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        expect(gotoPayPalSignInFnStub).toHaveBeenCalledWith(
          {
            amount: '233.98',
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

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

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
      });

      describe('authorize successfully from paypal', () => {
        it('should trigger purchaseFlightFn when successfully returning from PayPal site with token when not login', (done) => {
          shouldResumeDataFnStub.mockReturnValue(true);
          resumeDataFnStub.mockReturnValue(
            Promise.resolve({
              isFromPayPalAuthorized: true,
              formData: { paymentInfo },
              payPal: { paypalToken: 'EC-123' }
            })
          );

          const { rerender } = createComponent({
            paymentInfo,
            history: {
              location: {
                pathname: '/air/booking/review/paypal'
              }
            }
          });

          const props = {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          };

          rerender(
            <Provider store={store}>
              <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
            </Provider>
          );

          waitFor.untilAssertPass(() => {
            expect(purchaseFlightFnStub).toHaveBeenCalled();
          }, done);
        });

        it('should trigger purchaseFlightFn when successfully returning from PayPal site with token when re-login success', (done) => {
          shouldResumeDataFnStub.mockReturnValue(true);
          resumeDataFnStub.mockReturnValue(
            Promise.resolve({
              isFromPayPalAuthorized: true,
              formData: { paymentInfo },
              payPal: { paypalToken: 'EC-123' }
            })
          );

          const { rerender } = createComponent({
            isLoggedIn: true,
            paymentInfo,
            history: {
              location: {
                pathname: '/air/booking/review/paypal'
              }
            }
          });
          const props = {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          };

          rerender(
            <Provider store={store}>
              <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
            </Provider>
          );

          waitFor.untilAssertPass(() => {
            expect(purchaseFlightFnStub).toHaveBeenCalled();
          }, done);
        });

        it('should trigger purchaseFlightFn in componentDidUpdate when successfully returning from PayPal site with token from hybrid flow', (done) => {
          shouldResumeDataFnStub.mockReturnValue(false);
          resumeDataFnStub.mockReturnValue(
            Promise.resolve({
              isFromPayPalAuthorized: true,
              formData: { paymentInfo },
              payPal: {
                paypalToken: 'EC-123'
              }
            })
          );

          const { rerender } = createComponent();

          shouldResumeDataFnStub.mockReturnValue(true);

          const props = {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          };

          rerender(
            <Provider store={store}>
              <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
            </Provider>
          );

          waitFor.untilAssertPass(() => {
            expect(purchaseFlightFnStub).toHaveBeenCalled();
          }, done);
        });

        it('should trigger purchaseFlightFn when not  express checkout and successfully returning from PayPal site with token on continue as guest', (done) => {
          const resetAirBookingPurchaseDataFnStub = jest.fn();

          shouldResumeDataFnStub.mockReturnValue(true);
          resumeDataFnStub.mockReturnValue(
            Promise.resolve({
              isFromPayPalAuthorized: true,
              formData: { paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' } },
              payPal: { paypalToken: 'EC-123' }
            })
          );

          const { rerender } = createComponent({
            isLoggedIn: true,
            paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' },
            history: {
              location: {
                pathname: '/air/booking/review/paypal'
              }
            },
            isExpressCheckout: false,
            savedCreditCards: { primaryCard: null, otherCards: [] },
            resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub
          });

          const props = {
            paymentInfo: {
              selectedCardId: 'PAY_PAL_CARD_ID',
              type: 'PAYPAL'
            }
          };

          rerender(
            <Provider store={store}>
              <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
            </Provider>
          );

          waitFor.untilAssertPass(() => {
            expect(purchaseFlightFnStub).toHaveBeenCalled();
          }, done);
        });
      });

      it('should not trigger purchaseFlightFn when canceled from PayPal', (done) => {
        shouldResumeDataFnStub.mockReturnValue(true);
        resumeDataFnStub.mockReturnValue(
          Promise.resolve({
            isFromPayPalAuthorized: false,
            formData: { paymentInfo },
            payPal: {
              paypalToken: 'EC-123'
            }
          })
        );

        createComponent({
          paymentInfo,
          history: {
            location: {
              pathname: '/air/booking/review/paypal'
            }
          }
        });

        waitFor.untilAssertPass(() => {
          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });
    });

    describe('resume app state from external target', () => {
      it('should resume app state from Chase application', (done) => {
        shouldResumeAppStateFnStub.mockReturnValue(true);
        resumeAppStateFnStub.mockReturnValue(Promise.resolve());

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).toHaveBeenCalledWith(EXTERNAL_TARGETS.CHASE);
          expect(resumeAppStateFnStub).toHaveBeenCalled();
          expect(getChaseApplicationStatusFnStub).toHaveBeenCalled();
          expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        }, done);
      });

      it('should not resume app state from Chase application', () => {
        shouldResumeAppStateFnStub.mockReturnValue(false);

        createComponent();

        expect(shouldResumeAppStateFnStub).toHaveBeenCalledWith(EXTERNAL_TARGETS.CHASE);
        expect(resumeAppStateFnStub).not.toHaveBeenCalled();
        expect(getChaseApplicationStatusFnStub).not.toHaveBeenCalled();
      });
    });

    describe('resume app from deep link', () => {
      it('should resume app from deep link and should resume from app state', (done) => {
        shouldResumeAppStateFnStub.mockReturnValue(false);
        resumeAppStateFnStub.mockReturnValue(Promise.resolve());

        const { rerender } = createComponent();
        const props = {
          webViewDeepLinkContinue: true
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).toHaveBeenCalled();
          expect(satelliteTrackStub).toHaveBeenCalled();
          expect(setWebViewDeepLinkContinueFnStub).toHaveBeenCalledWith(false);
        }, done);
      });

      it('should resume app from deep link and should not resume from app state', (done) => {
        shouldResumeAppStateFnStub.mockReturnValueOnce(false);
        shouldResumeAppStateFnStub.mockReturnValueOnce(false);

        const { rerender } = createComponent();

        const props = {
          webViewDeepLinkContinue: true
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).toHaveBeenCalled();
          expect(resumeAppStateFnStub).not.toHaveBeenCalled();
          expect(getChaseApplicationStatusFnStub).not.toHaveBeenCalled();
          expect(satelliteTrackStub).toHaveBeenCalledTimes(2);
          expect(setWebViewDeepLinkContinueFnStub).toHaveBeenCalledWith(false);
        }, done);
      });

      it('should not resume app from deep link', (done) => {
        const { rerender } = createComponent();

        const props = {
          webViewDeepLinkContinue: false
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).toHaveBeenCalled();
          expect(resumeAppStateFnStub).not.toHaveBeenCalled();
          expect(getChaseApplicationStatusFnStub).not.toHaveBeenCalled();
          expect(satelliteTrackStub).toHaveBeenCalled();
          expect(setWebViewDeepLinkContinueFnStub).not.toHaveBeenCalled();
        }, done);
      });
    });

    describe('apple pay', () => {
      let paymentInfo;
      let resetAirBookingPurchaseDataFnStub;

      beforeEach(() => {
        paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };
        saveFormDataFnStub.mockReturnValue(Promise.resolve({ type: 'FAKE-ACTION' }));
        resetAirBookingPurchaseDataFnStub = jest.fn();
      });

      it('should call initiateAlternativeFormOfPayment if hasSelectedAlternativeFormOfPayment returns true and session not expired', (done) => {
        const { moneyTotal } = new PriceTotalBuilder().build().totals;

        getMoneyTotalForAirBookingStub.mockReturnValue(moneyTotal);
        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        const { container } = createComponent({
          paymentInfo
        });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

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
          expect(persistAppStateFnStub).not.toHaveBeenCalled();
          expect(initiateAlternativeFormOfPaymentStub).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);

          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });

      it('should continue as guest when session expired and continue as guest selected', (done) => {
        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);
        const instance = React.createRef();

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        createComponent(
          {
            paymentInfo,
            resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
            ref: instance
          },
          true
        );

        instance.current._continueAsGuest({ paymentInfo: paymentInfo });

        waitFor.untilAssertPass(() => {
          expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
          expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
          expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });

      it('should call initiateVoidTransactionFn when session expired and continue as guest selected', () => {
        const instance = React.createRef();
        const applePayCard = {
          ...getApplePayCard(),
          formData: { contactMethodContent: '' }
        };

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        createComponent(
          {
            applePayCard,
            CEPTOR_VOID_API: true,
            paymentInfo,
            ref: instance,
            resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub
          },
          true
        );

        instance.current._continueAsGuest({ paymentInfo: paymentInfo });

        expect(initiateVoidTransactionFnStub).toHaveBeenCalledWith('ApplePay', null, true, 'user continued as guest');
      });

      it('should not call initiateVoidTransactionFn when session expired and continue as guest selected with selected payment uplift', () => {
        const instance = React.createRef();

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);
        paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };

        createComponent(
          {
            CEPTOR_VOID_API: true,
            paymentInfo,
            resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
            ref: instance
          },
          true
        );

        instance.current._continueAsGuest({ paymentInfo: paymentInfo });

        expect(initiateVoidTransactionFnStub).not.toHaveBeenCalled();
      });

      it('should call _callPurchaseFlightFn if componentDidUpdate has a new apple pay card', () => {
        const { rerender } = createComponent();

        const applePayCard = _.merge(getApplePayCard(), { formData: { contactMethodContent: '' } });

        getNewApplePayCardStub.mockReturnValue(applePayCard);

        const props = {
          applePayCard
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        expect(getNewApplePayCardStub).toHaveBeenCalledWith(null, applePayCard);

        expect(purchaseFlightFnStub).toHaveBeenCalled();
      });
      it('should not call _callPurchaseFlightFn if componentDidUpdate does not have a new apple pay card', () => {
        const { rerender } = createComponent();

        const applePayCard = _.merge(getApplePayCard(), { formData: { contactMethodContent: '' } });

        getNewApplePayCardStub.mockReturnValue(null);

        const props = {
          applePayCard
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        expect(getNewApplePayCardStub).toHaveBeenCalledWith(null, applePayCard);
        expect(purchaseFlightFnStub).not.toHaveBeenCalled();
      });
    });

    describe('uplift', () => {
      beforeEach(() => {
        saveFormDataFnStub.mockReturnValue(Promise.resolve({ type: 'FAKE-ACTION' }));
      });

      it('should call saveFormData persistAppStateFn and initiateAlternativeFormOfPayment if hasSelectedAlternativeFormOfPayment returns true and session not expired', (done) => {
        const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);
        const { container } = createComponent({
          paymentInfo
        });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        waitFor.untilAssertPass(() => {
          expect(saveFormDataFnStub).toHaveBeenCalled();
          expect(initiateAlternativeFormOfPaymentStub).toHaveBeenCalled();
          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });

      it('should call saveFormData persistAppStateFn and initiateAlternativeFormOfPayment when session expired and re-login', (done) => {
        const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        const { container } = createComponent({
          paymentInfo
        });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        waitFor.untilAssertPass(() => {
          expect(saveFormDataFnStub).toHaveBeenCalled();
          expect(initiateAlternativeFormOfPaymentStub).toHaveBeenCalledWith('ApplePay');

          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });

      it('should continue as guest when session expired and continue as guest selected', (done) => {
        const instance = React.createRef();
        const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        const resetAirBookingPurchaseDataFnStub = jest.fn();

        createComponent(
          {
            paymentInfo,
            resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
            ref: instance
          },
          true
        );

        instance.current._continueAsGuest({ paymentInfo: paymentInfo });

        waitFor.untilAssertPass(() => {
          expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
          expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
          expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
          expect(purchaseFlightFnStub).not.toHaveBeenCalled();
        }, done);
      });

      it('should call _callPurchaseFlightFn if componentDidUpdate has a new uplift card', () => {
        const { rerender } = createComponent();

        const upliftCard = _.merge(getUpliftCard(), { formData: { contactMethodContent: '' } });

        getNewUpliftCardStub.mockReturnValue(upliftCard);

        const props = {
          upliftCard
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        expect(getNewUpliftCardStub).toHaveBeenCalledWith(null, upliftCard);
        expect(purchaseFlightFnStub).toHaveBeenCalled();
      });

      it('should not call _callPurchaseFlightFn if componentDidUpdate does not have a new uplift card', () => {
        const { rerender } = createComponent();

        const upliftCard = _.merge(getUpliftCard(), { formData: { contactMethodContent: '' } });

        getNewUpliftCardStub.mockReturnValue(null);

        const props = {
          upliftCard
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        expect(getNewUpliftCardStub).toHaveBeenCalledWith(null, upliftCard);
        expect(purchaseFlightFnStub).not.toHaveBeenCalled();
      });
    });

    describe('logged in', () => {
      it('should call purchase action with logged in parameter when user is logged in', () => {
        const { container } = createComponent({ isLoggedIn: true });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        expect(purchaseFlightFnStub).toHaveBeenCalledWith(expect.anything(), true, false);
      });

      describe('apple pay', () => {
        it('should call purchase when not session expired', () => {
          const { container } = createComponent({
            isLoggedIn: true
          });

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
        });

        it('should call purchase when session expired and re-login', () => {
          const { container } = createComponent({
            isLoggedIn: true
          });

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
        });

        describe('continue as guest', () => {
          let resetAirBookingPurchaseDataFnStub;
          let pushStub;

          beforeEach(() => {
            resetAirBookingPurchaseDataFnStub = jest.fn();
            pushStub = jest.fn();
          });

          describe('dollar booking', () => {
            it('should reset data and go to price page when session expired and using saved credit card', () => {
              const instance = React.createRef();

              createComponent(
                {
                  isLoggedIn: true,
                  selectedCreditCardInfo: {
                    paymentInfo: { selectedCardId: '1-4BGFWY', type: 'UATP' },
                    creditCardPresentInfo: 'Visa (ending in 9012)',
                    hasPrimaryCard: true,
                    requireSecurityCode: false
                  },
                  resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
                  push: pushStub,
                  ref: instance
                },
                true
              );

              instance.current._continueAsGuest({});

              expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
              expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
              expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
              expect(purchaseFlightFnStub).not.toHaveBeenCalled();
            });

            it('should call purchase when session expired and continue as guest using new credit card without saved credit cards', () => {
              const { container } = createComponent({
                isLoggedIn: true,
                paymentInfo: {
                  cardNumber: '4012999999999999'
                }
              });

              fireEvent.click(
                container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase')
              );

              expect(purchaseFlightFnStub).toHaveBeenCalled();
            });

            it('should call purchase when session expired and continue as guest using new credit card with saved credit cards', () => {
              const { container } = createComponent({
                isLoggedIn: true,
                paymentInfo: {
                  cardNumber: '4012999999999999'
                }
              });

              fireEvent.click(
                container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase')
              );

              expect(purchaseFlightFnStub).toHaveBeenCalled();
            });
          });

          it('should reset data and go to price page when session expired with points by new credit card', () => {
            const instance = React.createRef();

            createComponent(
              {
                isLoggedIn: true,
                currencyType: 'PTS',
                resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
                push: pushStub,
                ref: instance
              },
              true
            );

            instance.current._continueAsGuest({});

            expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
            expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
            expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
            expect(purchaseFlightFnStub).not.toHaveBeenCalled();
          });

          it('should trigger purchaseFlightFnStub, When there is form ', () => {
            hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

            const instance = React.createRef();
            const resetAirBookingPurchaseDataFnStub = jest.fn();
            const paymentInfo = { cardNumber: '1234' };

            createComponent(
              {
                paymentInfo,
                resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
                ref: instance
              },
              true
            );

            instance.current._continueAsGuest({ paymentInfo: paymentInfo });

            expect(purchaseFlightFnStub).toHaveBeenCalled();
          });
        });
      });

      describe('warm state express checkout', () => {
        it('should call purchase with isWarmStateExpressCheckout as true', () => {
          const { container } = createComponent(
            {
              isLoggedIn: true,
              isWebView: true
            },
            true
          );

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
          expect(purchaseFlightFnStub).toHaveBeenCalledWith(expect.anything(), true, true);
        });

        it('should call purchase with isWarmStateExpressCheckout as false when is not webview', () => {
          const { container } = createComponent({
            isLoggedIn: true,
            isWebView: false
          });

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
          expect(purchaseFlightFnStub).toHaveBeenCalledWith(expect.anything(), true, false);
        });

        it('should call purchase with isWarmStateExpressCheckout as false when is not express checkout', () => {
          const { container } = createComponent({
            isLoggedIn: true,
            isWebView: true,
            isExpressCheckout: false
          });

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
          expect(purchaseFlightFnStub).toHaveBeenCalledWith(expect.anything(), true, false);
        });

        it('should call purchase with isWarmStateExpressCheckout as false when not in warm state', () => {
          const { container } = createComponent(
            {
              isLoggedIn: true,
              isWebView: true
            },
            false
          );

          fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

          expect(purchaseFlightFnStub).toHaveBeenCalled();
          expect(purchaseFlightFnStub).toHaveBeenCalledWith(expect.anything(), true, true);
        });
      });
    });
  });

  describe('contactMethod', () => {
    it('should trigger pushFn action when user click the contact method button', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.contact-method').querySelector('.nav-item-field'));

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/contact-method');
    });

    it('should trigger pushFn action when user click the contact method button after reLogin callback', () => {
      const { container } = createComponent({
        checkSessionWarm({ reLogin }) {
          reLogin();
        }
      });

      fireEvent.click(container.querySelector('.contact-method').querySelector('.nav-item-field'));

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/contact-method');
    });

    it('should continue as guest on click of the contact method button after asGuest callback', () => {
      const resetAirBookingStub = jest.fn();
      const instance = React.createRef();

      createComponent(
        {
          resetAirBookingPurchaseDataFn: resetAirBookingStub,
          ref: instance
        },
        true
      );

      instance.current._continueAsGuest({});

      expect(setIsExpressCheckoutFnStub).not.toHaveBeenCalledWith();
      expect(resetAirBookingStub).toHaveBeenCalled();
      expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
    });
  });

  describe('contact Travel Info', () => {
    it('should trigger pushFn action when user click the contact travel info button', () => {
      const { container } = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company',
        isSwabiz: true
      });

      fireEvent.click(container.querySelector('.duty-of-care-nav-item').querySelector('.nav-item-field'));

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/contact-info-travel-manager');
    });

    it('should not render the contact travel info when isSwabiz is false', () => {
      const { container } = createComponent();

      expect(container.querySelector('.duty-of-care-nav-item')).not.toBeInTheDocument();
    });
  });

  describe('irnInfo', () => {
    it('should trigger pushFn action when user click the irn info button', () => {
      const irnInfo = {
        irnRequired: true,
        alternateIrnAllowed: false,
        preselectedInternalReferenceNumber: {
          name: 'IRN name',
          description: 'Description'
        },
        companyInternalReferenceNumbers: [
          {
            name: 'sadassad',
            description: 'sdaasddas'
          },
          {
            name: 'sadassad',
            description: 'sdaasddas'
          }
        ],
        travelerInternalReferenceNumbers: [
          {
            name: '253376',
            description: 'Legal Department'
          }
        ]
      };
      const { container } = createComponent({ irnInfo, selectedCompanyName: 'Company name' });

      fireEvent.click(container.querySelector('.internal-reference-number').querySelector('.nav-item-field'));

      expect(pushStub).toHaveBeenCalledWith(airBookingRoutes['internalReferenceNumber']);
    });
  });

  describe('passenger edit', () => {
    it('should transition to passenger edit page', () => {
      const { container } = createComponent();

      fireEvent.click(
        container.querySelector('.passenger-info-summary').querySelector('.passenger-info-summary--item')
      );

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/passenger/0/edit');
    });

    it('should transition to passenger edit page after reLogin callback', () => {
      const { container } = createComponent({
        checkSessionWarm({ reLogin }) {
          reLogin();
        }
      });

      fireEvent.click(
        container.querySelector('.passenger-info-summary').querySelector('.passenger-info-summary--item')
      );

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/passenger/0/edit');
    });

    it('should continue as guest on click of the passenger edit button after asGuest callback', () => {
      const resetAirBookingStub = jest.fn();
      const instance = React.createRef();

      createComponent({
        resetAirBookingPurchaseDataFn: resetAirBookingStub,
        ref: instance
      });

      instance.current._continueAsGuest({});

      expect(setIsExpressCheckoutFnStub).not.toHaveBeenCalled();
      expect(resetAirBookingStub).toHaveBeenCalled();
      expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
    });
  });

  describe('young traveler parent or guardian edit', () => {
    const parentOrGuardianFormDataInfo = { data: getParentOrGuardianFormData() };

    it('should transition to youngTravelerEditPage', () => {
      const { container } = createComponent({ parentOrGuardianFormDataInfo });
      const passengerInfoSummaries = container.querySelectorAll('.passenger-info-summary');
      const parentOrGuardianPassengerInfoSummaryItem = passengerInfoSummaries[1].querySelector(
        '.passenger-info-summary--item'
      );

      fireEvent.click(parentOrGuardianPassengerInfoSummaryItem);

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/young-traveler/edit?clearFormData=false');
    });

    it('should call traceYoungTravelerEditPageFn on parent or guardian info click', () => {
      const { container } = createComponent({ parentOrGuardianFormDataInfo });
      const passengerInfoSummaries = container.querySelectorAll('.passenger-info-summary');
      const parentOrGuardianPassengerInfoSummaryItem = passengerInfoSummaries[1].querySelector(
        '.passenger-info-summary--item'
      );

      fireEvent.click(parentOrGuardianPassengerInfoSummaryItem);

      expect(traceYoungTravelerEditPageFnStub).toHaveBeenCalled();
    });

    it('should render with parent or guardian passenger section', () => {
      const { container } = createComponent({ parentOrGuardianFormDataInfo });

      expect(container).toMatchSnapshot();
    });

    describe('componentDidMount', () => {
      const youngTravelerBirthDate = '2004-12-22';

      it('should call clearFormDataByIdFn when parentOrGuardianFormDataInfo exists and there is no a young traveler passenger', () => {
        createComponent({ parentOrGuardianFormDataInfo });

        expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIR_BOOKING_PARENT_OR_GUARDIAN_FORM);
      });

      it('should call clearFormDataByIdFn when parentOrGuardianFormDataInfo exists and there is a young traveler passenger with an adult', () => {
        const passengerInfos = getMultipleAdultPassengers();

        passengerInfos[0].passengerInfo.dateOfBirth = youngTravelerBirthDate;

        createComponent({ parentOrGuardianFormDataInfo, passengerInfos });

        expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(AIR_BOOKING_PARENT_OR_GUARDIAN_FORM);
      });

      it('should not call clearFormDataByIdFn when parentOrGuardianFormDataInfo exists and there is a young traveler passenger', () => {
        const passengerInfos = getPassengerInfos();

        passengerInfos[0].passengerInfo.dateOfBirth = youngTravelerBirthDate;
        createComponent({ parentOrGuardianFormDataInfo, passengerInfos });

        expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
      });

      it('should not call clearFormDataByIdFn when parentOrGuardianFormDataInfo doest exist', () => {
        createComponent();

        expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
      });

      it('should not call clearFormDataByIdFn when tripSummary is undefined', () => {
        createComponent({ purchaseSummaryPage: { tripSummary: undefined } });

        expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
      });

      it('should not call clearFormDataByIdFn when passengerInfos is undefined', () => {
        createComponent({ passengerInfos: undefined });

        expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
      });
    });
  });

  describe('trip and price detail', () => {
    it('should transition to trip and price detail page', () => {
      const { container } = createComponent();

      fireEvent.click(
        container.querySelector('.passenger-info-summary').querySelector('.passenger-info-summary--item')
      );

      expect(pushStub).toHaveBeenCalledWith('/air/booking/passenger/0/edit');
    });
  });

  describe('payment review', () => {
    it('should transition to payment edit page', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.payment-nav-item-field').querySelector('.nav-item-link'));

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/payment/edit?airportsCode=LAS-OAK');
    });

    it('should transition to payment edit page after reLogin callback', () => {
      const { container } = createComponent({
        checkSessionWarm({ reLogin }) {
          reLogin();
        }
      });

      fireEvent.click(container.querySelector('.payment-nav-item-field').querySelector('.nav-item-link'));

      expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/payment/edit?airportsCode=LAS-OAK');
    });

    it('should continue as guest on click of the payment edit button after asGuest callback', () => {
      const resetAirBookingStub = jest.fn();
      const instance = React.createRef();

      createComponent(
        {
          resetAirBookingPurchaseDataFn: resetAirBookingStub,
          ref: instance
        },
        true
      );

      instance.current._continueAsGuest({});

      expect(setIsExpressCheckoutFnStub).not.toHaveBeenCalled();
      expect(resetAirBookingStub).toHaveBeenCalled();
      expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
      expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
    });
  });

  describe('ApplyTravelFunds', () => {
    it('should send fundsAppliedToken and travelFundsBalanceRemaining null to purchase call if they do not exist', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        fundsAppliedToken: null,
        travelFundsBalanceRemaining: null
      });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

      expect(purchaseFlightFnStub).toHaveBeenCalledWith(
        expect.objectContaining({
          fundsAppliedToken: null,
          travelFundsBalanceRemaining: null
        }),
        true,
        false
      );
    });

    it('should send fundsAppliedToken and travelFundsBalanceRemaining to purchase call if they exist', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        fundsAppliedToken: 'funds-token',
        travelFundsBalanceRemaining: new PriceTotalBuilder().build().totals.moneyTotal
      });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

      expect(purchaseFlightFnStub).toHaveBeenCalledWith(
        expect.objectContaining({
          fundsAppliedToken: 'funds-token',
          travelFundsBalanceRemaining: {
            amount: '233.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }),
        true,
        false
      );
    });

    it('should send updated taxes and fees when split payment is applied', () => {
      const taxesAndFees = [
        {
          code: 'ZP',
          description: 'Segment Fee',
          fee: {
            amount: '4.20',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ];

      const { container } = createComponent({
        isLoggedIn: true,
        fundsAppliedToken: 'funds-token',
        taxesAndFees,
        travelFunds,
        updatedPriceTotal: {
          moneyTotal: {
            amount: '1,558.66',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        }
      });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

      expect(purchaseFlightFnStub).toHaveBeenCalledWith(
        expect.objectContaining({
          fundsAppliedToken: 'funds-token',
          calculateFundsTaxesAndFees: taxesAndFees
        }),
        true,
        false
      );
    });

    it('should go to billing address page when nav item is clicked', () => {
      const { container } = createComponent({
        travelFundsBalanceRemaining: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });

      const billingAddressNavItem = container
        .querySelector('.billing-address-nav-item')
        .querySelector('.nav-item-field');

      expect(billingAddressNavItem).toBeInTheDocument();

      fireEvent.click(billingAddressNavItem);

      expect(satelliteTrackStub).toHaveBeenCalledWith('travel funds billing address');
      expect(pushStub).toHaveBeenCalledWith('/air/booking/billing-address');
    });

    describe('dollars/guest booking', () => {
      it('should render the Apply Travel Funds nav item', () => {
        const { container } = createComponent();
        const applyTravelFundsNavItem = container
          .querySelector('.apply-travel-funds-nav-item')
          .querySelector('.nav-item-field');

        expect(applyTravelFundsNavItem).toBeInTheDocument();
      });

      it('should navigate to apply travel funds page on click of the travel funds nav item', () => {
        const { container } = createComponent();
        const applyTravelFundsNavItem = container
          .querySelector('.apply-travel-funds-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyTravelFundsNavItem);

        expect(satelliteTrackStub).toHaveBeenCalledWith('apply travel funds');
        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/apply-travel-funds?clearFormData=false');
      });

      it('should navigate to apply travel funds page on click the travel funds nav item after reLogin callback', () => {
        const { container } = createComponent({
          checkSessionWarm({ reLogin }) {
            reLogin();
          }
        });
        const applyTravelFundsNavItem = container
          .querySelector('.apply-travel-funds-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyTravelFundsNavItem);

        expect(satelliteTrackStub).toHaveBeenCalledWith('apply travel funds');
        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/apply-travel-funds?clearFormData=false');
      });

      it('should continue as guest on click of the travel funds nav item after asGuest callback', () => {
        const instance = React.createRef();
        const resetAirBookingStub = jest.fn();

        createComponent(
          {
            resetAirBookingPurchaseDataFn: resetAirBookingStub,
            ref: instance
          },
          true
        );

        instance.current._continueAsGuest({});

        expect(setIsExpressCheckoutFnStub).not.toHaveBeenCalled();
        expect(resetAirBookingStub).toHaveBeenCalled();
        expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
      });

      it('should not refresh the calculated travel funds on page load if no fundsAppliedToken exists', () => {
        createComponent();

        expect(refreshFundsFnStub).not.toHaveBeenCalled();
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
                    firstName: 'Andrew',
                    lastName: 'Phillips',
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
          index?.canonicalPath
        );
      });
    });

    describe('points booking', () => {
      it('should check session on load when if a fundsAppliedToken already exists and points booking', () => {
        createComponent({
          isLoggedIn: false,
          fundsAppliedToken: 'funds-token',
          currencyType: 'PTS'
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
                    firstName: 'Andrew',
                    lastName: 'Phillips',
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
          index?.canonicalPath,
          false
        );
      });

      describe('session expired', () => {
        it('should call refresh endpoint when session expired and re-login', () => {
          const instance = React.createRef();

          createComponent({
            isLoggedIn: false,
            fundsAppliedToken: 'funds-token',
            currencyType: 'PTS',
            ref: instance
          });

          instance.current._continueAsGuest({});

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
                      firstName: 'Andrew',
                      lastName: 'Phillips',
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
            index?.canonicalPath,
            false
          );
        });

        it('should not call refresh endpoint when session expired and continue as guest', () => {
          const instance = React.createRef();
          const resetAirBookingStub = jest.fn();

          createComponent({
            isLoggedIn: false,
            fundsAppliedToken: 'funds-token',
            currencyType: 'PTS',
            resetAirBookingPurchaseDataFn: resetAirBookingStub,
            ref: instance
          });

          instance.current._continueAsGuest({});

          expect(refreshFundsFnStub).toHaveBeenCalled();
          expect(resetAirBookingStub).toHaveBeenCalled();
          expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
          expect(pushStub).toHaveBeenCalledWith('/air/booking/price.html');
        });
      });
    });
  });

  describe('ApplyRapidRewards', () => {
    describe('dollars booking', () => {
      const splitPayLink = {
        body: {
          itineraryPricingToken: 'test',
          offerId: 'abc123',
          promoCodeToken: null
        }
      };

      it('should render Apply Rapid Rewards nav item when splitPay is available and mbox is set to show', () => {
        const { container } = createComponent({
          isSplitPayVisible: true,
          splitPayLink,
          totalPointsApplied: {
            pointsApplied: {
              amount: '33,289',
              currencyCode: 'PTS',
              currencySymbol: 'PTS'
            },
            moneyApplied: {
              amount: '426.77',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should not render Apply Rapid Rewards nav item when splitPay is available and mbox is set to hide', () => {
        const { container } = createComponent({
          isSplitPayVisible: false,
          splitPayLink
        });

        expect(container).toMatchSnapshot();
      });

      it('should show updated price total and trip summary after applying split payment', () => {
        const { container } = createComponent({
          isLoggedIn: true,
          isSplitPayVisible: true,
          shouldResumeSplitPayAfterLogin: true,
          splitPayLink,
          travelFunds,
          updatedPriceTotal: {
            moneyTotal: {
              amount: '1,558.66',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pointsTotal: null
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should fetch saved credit cards when user resumes after split pay login', () => {
        createComponent({
          isLoggedIn: true,
          shouldResumeSplitPayAfterLogin: true
        });

        expect(fetchSavedCreditCardsFnStub).toHaveBeenCalled();
      });

      it('should call getSplitPayOptionsListFn and make an analytics call on click of the nav item wher user is logged in', () => {
        const { container } = createComponent({
          isLoggedIn: true,
          isSplitPayVisible: true,
          shouldResumeSplitPayAfterLogin: true,
          splitPayLink
        });

        const applyRapidRewardsNavItem = container
          .querySelector('.apply-rapid-rewards-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyRapidRewardsNavItem);

        expect(getSplitPayOptionsListFnStub).toHaveBeenCalled();
      });

      it('should call showNativeAppLoginFn on click of the nav item when user is in webview', () => {
        const { container } = createComponent({
          isWebView: true,
          isSplitPayVisible: true,
          shouldResumeSplitPayAfterLogin: true,
          splitPayLink
        });

        const applyRapidRewardsNavItem = container
          .querySelector('.apply-rapid-rewards-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyRapidRewardsNavItem);

        expect(showNativeAppLoginFnStub).toHaveBeenCalledWith({ loginType: 'points' });
      });

      it('should push login page on click of the nav item when user is not logged in', () => {
        const { container } = createComponent({
          isSplitPayVisible: true,
          shouldResumeSplitPayAfterLogin: true,
          splitPayLink
        });

        const applyRapidRewardsNavItem = container
          .querySelector('.apply-rapid-rewards-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyRapidRewardsNavItem);

        expect(pushStub).toHaveBeenCalledWith('/login?clk=PURCHASE-CASHPOINTS-LOGIN', null, {
          simpleLogin: true,
          to: '/air/booking/purchase.html'
        });
      });
    });
  });

  describe('when using API gateway cookies', () => {
    beforeEach(() => {
      jest.spyOn(localStorage, 'get').mockReturnValue({ expirationDate: 'token' });
      saveFormDataFnStub.mockReturnValue(Promise.resolve({ type: 'FAKE-ACTION' }));
    });

    describe('should purchase', () => {
      it('with points', () => {
        createComponent({
          isLoggedIn: false,
          fundsAppliedToken: 'funds-token',
          currencyType: 'PTS'
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
                    firstName: 'Andrew',
                    lastName: 'Phillips',
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
          index?.canonicalPath,
          false
        );
        expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      });

      it('with dollar', () => {
        const { container } = createComponent();

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        expect(purchaseFlightFnStub).toHaveBeenCalled();
        expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      });

      it('with PayPal', () => {
        shouldGotoPayPalSignInFnStub.mockReturnValue(true);

        const { moneyTotal } = new PriceTotalBuilder().build().totals;

        getMoneyTotalForAirBookingStub.mockReturnValue(moneyTotal);

        const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID', type: 'PAYPAL' };
        const { container } = createComponent({ paymentInfo });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        expect(gotoPayPalSignInFnStub).toHaveBeenCalledWith(
          {
            amount: '233.98',
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
        expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      });

      it('with PayPal if resumed data', (done) => {
        shouldResumeDataFnStub.mockReturnValue(true);
        resumeDataFnStub.mockReturnValue(
          Promise.resolve({
            isFromPayPalAuthorized: true,
            formData: { paymentInfo },
            payPal: { paypalToken: 'EC-123' }
          })
        );

        const { rerender } = createComponent({
          isLoggedIn: true,
          paymentInfo,
          history: {
            location: {
              pathname: '/air/booking/review/paypal'
            }
          }
        });

        const props = {
          paymentInfo: {
            selectedCardId: 'PAY_PAL_CARD_ID',
            type: 'PAYPAL'
          }
        };

        rerender(
          <Provider store={store}>
            <PurchaseSummaryPage {..._.merge({}, getDefaultProps(), props)} />
          </Provider>
        );

        waitFor.untilAssertPass(() => {
          expect(purchaseFlightFnStub).toHaveBeenCalledWith(
            expect.objectContaining({ payPal: { paypalToken: 'EC-123' } }),
            false,
            false
          );
        }, done);
      });

      it('with ApplePay', (done) => {
        const { moneyTotal } = new PriceTotalBuilder().build().totals;

        getMoneyTotalForAirBookingStub.mockReturnValue(moneyTotal);
        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);

        const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID', type: 'APPLE_PAY' };
        const { container } = createComponent({ paymentInfo });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        waitFor.untilAssertPass(() => {
          expect(initiateAlternativeFormOfPaymentStub).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY);
          expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
        }, done);
      });

      it('with Uplift', (done) => {
        const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID', type: 'UPLIFT' };

        hasSelectedAlternativeFormOfPaymentStub.mockReturnValue(true);
        const { container } = createComponent({ paymentInfo });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        waitFor.untilAssertPass(() => {
          expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
        }, done);
      });

      it('shouldShowChaseInstantCreditCard', () => {
        const { container } = createComponent({ shouldShowChaseInstantCreditCard: true });

        fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

        expect(hasSelectedAlternativeFormOfPaymentStub).toHaveBeenCalled();
      });
    });

    describe('contact travel info', () => {
      it('should trigger pushFn action when user click the contact travel info button with relogin session', () => {
        const { container } = createComponent({
          selectedCompanyName: 'Dunder Mifflin Paper Company',
          isSwabiz: true,
          isLoggedIn: true,
          isExpressCheckout: true
        });

        fireEvent.click(container.querySelector('.duty-of-care-nav-item').querySelector('.nav-item-field'));

        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/contact-info-travel-manager');
      });
    });

    describe('should build BillingAddressFormData', () => {
      it('should trigger _buildBillingAddressFormData, and return travel funds data', () => {
        const instance = React.createRef();
        const travelFundsAddress = {
          addressLine1: '554 Lane',
          addressLine2: '',
          city: 'Austin',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          isoCountryCode: 'US',
          phoneNumber: '215-546-5465',
          phoneCountryCode: 'US'
        };

        createComponent({
          travelFundsAddress: travelFundsAddress,
          ref: instance
        });

        expect(instance.current._buildBillingAddressFormData()).toEqual({
          addressLine1: '554 Lane',
          addressLine2: '',
          city: 'Austin',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          isoCountryCode: 'US',
          phoneNumber: '215-546-5465',
          phoneCountryCode: 'US'
        });
      });

      it('should trigger _buildBillingAddressFormData, and return contactinfo data', () => {
        const instance = React.createRef();
        const contactInfo = {
          address: {
            addressLine1: 'Contact Info Lane',
            addressLine2: '',
            city: 'Dallas',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '12345',
            isoCountryCode: 'US'
          },
          phone: {
            number: '2155465465',
            countryCode: '1'
          }
        };

        createComponent({
          contactInfo: contactInfo,
          ref: instance
        });

        expect(instance.current._buildBillingAddressFormData()).toEqual({
          addressLine1: 'Contact Info Lane',
          addressLine2: '',
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '12345',
          isoCountryCode: 'US',
          phoneNumber: '215-546-5465',
          phoneCountryCode: 'US'
        });
      });
    });

    describe('should navigate', () => {
      it('contact method page', () => {
        const { container } = createComponent({
          isLoggedIn: true,
          currencyType: 'PTS',
          isExpressCheckout: false
        });
        const path = '/air/booking/contact-method';

        fireEvent.click(container.querySelector('.contact-method').querySelector('.nav-item-field'));

        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith(path);
      });

      it('passenger edit page', () => {
        const { container } = createComponent();

        fireEvent.click(
          container.querySelector('.passenger-info-summary').querySelector('.passenger-info-summary--item')
        );

        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/passenger/0/edit');
      });

      it('payment edit page', () => {
        const { container } = createComponent();

        fireEvent.click(container.querySelector('.payment-nav-item-field').querySelector('.nav-item-link'));

        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/payment/edit?airportsCode=LAS-OAK');
      });

      it('travel funds page', () => {
        const { container } = createComponent();
        const applyTravelFundsNavItem = container
          .querySelector('.apply-travel-funds-nav-item')
          .querySelector('.nav-item-field');

        fireEvent.click(applyTravelFundsNavItem);

        expect(setIsExpressCheckoutFnStub).toHaveBeenCalledWith(false);
        expect(pushStub).toHaveBeenCalledWith('/air/booking/apply-travel-funds?clearFormData=false');
      });

      it('go to trip and price page', () => {
        const { container } = createComponent();
        const applyTravelFundsNavItem = container.querySelector('.trip-summary').querySelector('.nav-item-link');

        fireEvent.click(applyTravelFundsNavItem);

        expect(pushStub).toHaveBeenCalledWith('/air/booking/price/detail');
      });
    });

    it('should set continue as guest after resume app state from Chase application or PayPal', (done) => {
      shouldResumeAppStateFnStub.mockReturnValue(true);
      resumeAppStateFnStub.mockReturnValue(Promise.resolve());

      createComponent();

      waitFor.untilAssertPass(() => {
        expect(setReLoginCallbackFunctionsFnStub).toHaveBeenCalled();
      }, done);
    });

    it('should properly call callbacks for continue as guest flow', () => {
      const instance = React.createRef();
      const resetAirBookingStub = jest.fn();

      createComponent({
        isLoggedIn: false,
        fundsAppliedToken: 'funds-token',
        currencyType: 'PTS',
        resetAirBookingPurchaseDataFn: resetAirBookingStub,
        ref: instance
      });
      instance.current._continueAsGuestFn();

      expect(resetAirBookingStub).toHaveBeenCalled();
      expect(addHistoryBackToHomeFnStub).toHaveBeenCalledWith(true);
      expect(pushStub).toHaveBeenCalled();
    });
  });

  describe('when corporate', () => {
    it('should not show company header section if there is no associated company', () => {
      const { container } = createComponent({});

      expect(container.querySelector('.company-name-banner')).not.toBeInTheDocument();
    });

    it('should show company header section if there is an associated company', () => {
      const { container } = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      expect(container.querySelector('.company-name-banner')).toBeInTheDocument();
    });

    it('should call purchase action with selected irn', () => {
      const { container } = createComponent({ isLoggedIn: true, selectedIrn: 'mockIrn' });

      fireEvent.click(container.querySelector('.purchase-content--summary-footer-nav').querySelector('.purchase'));

      expect(purchaseFlightFnStub).toHaveBeenCalledWith(
        expect.objectContaining({ selectedIrn: 'mockIrn' }),
        true,
        false
      );
    });

    it('should display review messages when received reviewMessages with purchase data', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        purchaseSummaryPage: {
          reviewMessages: [
            {
              body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
              header: '',
              icon: 'WARNING',
              key: 'BOOKING_PURCHASE_OVERNIGHT',
              textColor: 'DEFAULT'
            }
          ]
        },
        selectedIrn: 'mockIrn'
      });

      expect(container.querySelector('.review-message')).not.toBeNull();
    });

    it('should not display review messages when received reviewMessages as null with purchase data', () => {
      const { container } = createComponent({
        isLoggedIn: true,
        purchaseSummaryPage: {
          reviewMessages: null
        },
        selectedIrn: 'mockIrn'
      });

      expect(container.querySelector('.review-message')).toBeNull();
    });
  });

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
  const paymentInfo = _.merge({}, getPaymentInfoForUseNewCreditCard());
  const contactMethodInfo = new ContactMethodInfoBuilder().build();
  const passengerInfos = getPassengerInfos();
  const flightPricingPageResponse = new PricesBuilder().build();

  const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build();

  const getDefaultProps = () => ({
    addHistoryBackToHomeFn: addHistoryBackToHomeFnStub,
    applePayCard: null,
    chaseSessionId: 'chaseSessionId',
    clearFormDataByIdFn: clearFormDataByIdFnStub,
    contactInfo: null,
    contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
    contactMethodInfo,
    currencyType: 'USD',
    currentState: { action: 'push', hash: '', key: 'as70fd', pathname: '/air/booking/review', search: '' },
    EARLY_BIRD_AB_TESTING: false,
    earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility,
    earlyBirdSelected: false,
    fetchEarlybirdPricing: fetchEarlybirdPricingStub,
    fetchSavedCreditCardsFn: fetchSavedCreditCardsFnStub,
    flightPricingPageResponse,
    fundsAppliedToken: null,
    generatePurchaseSummaryPageFn: generatePurchaseSummaryPageFnStub,
    getChaseApplicationStatusFn: getChaseApplicationStatusFnStub,
    getSplitPayOptionsListFn: getSplitPayOptionsListFnStub,
    gotoPayPalSignInFn: gotoPayPalSignInFnStub,
    handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnStub,
    hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentStub,
    history: { location: { pathname: '/', search: '' } },
    initiateAlternativeFormOfPaymentFn: initiateAlternativeFormOfPaymentStub,
    initiateVoidTransactionFn: initiateVoidTransactionFnStub,
    isExpressCheckout: true,
    isInternationalBooking: true,
    isLoggedIn: false,
    isPaymentOptionsAndPassengerInfoFetched: true,
    isWebView: false,
    itineraryPricingToken: 'itinerary-token',
    loadPurchasePagePlacementsFn: loadPurchasePagePlacementsFnStub,
    parentOrGuardianFormDataInfo: undefined,
    passengerInfos,
    paymentInfo: {},
    persistAppStateFn: persistAppStateFnStub,
    placements: {},
    prevState: { action: 'push', hash: '', key: '0h085k', pathname: '/air/booking/payment', search: '' },
    priceTotal,
    purchaseFlightFn: purchaseFlightFnStub,
    purchaseSummaryPage: { tripSummary, passengers, priceTotal },
    push: pushStub,
    ref: null,
    refreshFundsFn: refreshFundsFnStub,
    reloadAndSubmitAlternativeFormOfPaymentFn: reloadAndSubmitAlternativeFormOfPaymentFnStub,
    removeFrequentTravelerSelectedByPaxNumberFn: removeFrequentTravelerSelectedByPaxNumberFnStub,
    resetAirBookingPurchaseDataFn: _.noop,
    resumeAppStateFn: resumeAppStateFnStub,
    resumeDataFn: resumeDataFnStub,
    resumeSplitPayAfterLoginFn: resumeSplitPayAfterLoginFnStub,
    saveFormDataFn: saveFormDataFnStub,
    savePurchaseSummaryFormFn: savePurchaseSummaryFormStub,
    saveShouldCallPlacementFn: saveShouldCallPlacementFnStub,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
    selectedCreditCardInfo: {
      paymentInfo,
      creditCardPresentInfo: 'Visa (ending in 9012)',
      hasPrimaryCard: true,
      requireSecurityCode: true
    },
    selectedFrequentTravelers: [
      { addFrequentTravelerToggle: true, paxNumber: 0, frequentTravelerId: '', frequentTravelerToken: '' }
    ],
    selectedIrn: '',
    setChaseBannerShownFn: setChaseBannerShownFnStub,
    setExternalPaymentAuthorizedSearchStringFn: setExternalPaymentAuthorizedSearchStringFnStub,
    setIsExpressCheckoutFn: setIsExpressCheckoutFnStub,
    setPaymentInfoForChaseFn: setPaymentInfoForChaseFnStub,
    setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnStub,
    setShouldRetryInstantCreditsCallFn: setShouldRetryInstantCreditsCallFnStub,
    setWebViewDeepLinkContinueFn: setWebViewDeepLinkContinueFnStub,
    shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnStub,
    shouldResumeAppStateFn: shouldResumeAppStateFnStub,
    shouldResumeDataFn: shouldResumeDataFnStub,
    shouldRetryInstantCreditsCall: false,
    shouldShowChasePlacement: false,
    showDialogFn: showDialogFnStub,
    showEarlyBirdInPath: true,
    showNativeAppLoginFn: showNativeAppLoginFnStub,
    switchEarlyBirdInPathButtonFn: () => {},
    totalPointsApplied: null,
    traceYoungTravelerEditPageFn: traceYoungTravelerEditPageFnStub,
    travelFundsAddress: null,
    updateFrequentTravelerSelectionFn: updateFrequentTravelerSelectionStub,
    upliftAdditionalMessaging: '',
    upliftCard: null,
    webViewDeepLinkContinue: false
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
        <PurchaseSummaryPage {..._.merge({}, defaultProps, props)} ref={props.ref} />
      </Provider>
    );
  };
});
