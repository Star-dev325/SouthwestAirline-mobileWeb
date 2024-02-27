import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import lowFareCalendarPageRoundTripResponse from 'mocks/templates/airReservation/lowFareCalendarPageRoundTrip';
import Q from 'q';
import sinonModule from 'sinon';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes';
import * as PaymentPageSelectors from 'src/airBooking/selectors/paymentPageSelectors';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import { RR_VISA_PAYMENT_INFO } from 'src/chase/constants/chaseConstants';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import ContactMethodActionTypes from 'src/shared/actions/contactMethodActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import * as DialogActions from 'src/shared/actions/dialogActions';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import * as LoggingApi from 'src/shared/api/loggingApi';
import * as OAuthApi from 'src/shared/api/oAuthApi';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import {
  ERROR_CID_NOT_AVAILABLE,
  ERROR_GHOST_CARD_EXPIRED,
  ERROR_INTERNAL_REFERENCE_NUMBER_REQUIRED,
  ERROR_PROMO_TOKEN_CHANGED_FROM_SHOPPING_TO_PURCHASE,
  ERROR_PROMO_TOKEN_EXPIRED_ON_PURCHASE,
  ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
  ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
  ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
  ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID
} from 'src/shared/constants/errorCodes';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM } from 'src/shared/constants/formIds';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as errorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import * as loginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import * as ChaseSelector from 'src/shared/selectors/chaseSelector';
import * as AlternativeFormsOfPaymentTransformer from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import * as flightProductSearchRequestTransformers from 'src/shared/transformers/flightProductSearchRequestTransformer';
import * as FlightPurchaseRequestTransformer from 'src/shared/transformers/flightPurchaseRequestTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import {
  AIR_BOOKING_INDEX_PAGE_ID,
  CASH_POINTS_INDEX_PAGE_ID,
  CONFIRMATION_PAGE_ID,
  PRICING_PAGE_ID,
  PURCHASE_PAGE_ID,
  SELECT_INBOUND_PAGE_ID,
  SELECT_OUTBOUND_FARE_PAGE_ID,
  SELECT_OUTBOUND_PAGE_ID
} from 'src/wcm/constants/wcmConstants';
import storeModule from 'store2';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import HawaiiNoRoutesPopupErrorBuilder from 'test/builders/apiResponse/v1/content-delivery/query/hawaiiNoRoutesPopupErrorBuilder';
import MultiSelectGroupBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/multiSelectGroupBuilder.js';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import AirBookingApplyRapidRewardsPageApiJsonBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageApiJsonBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';
import PurchaseFlightParamsBuilder from 'test/builders/model/purchaseFlightParamsBuilder';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import { getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import waitFor, { untilAssertPass } from 'test/unit/helpers/waitFor';
import {
  cloneDeep,
  flowRight,
  get,
  isEmpty 
} from 'src/shared/helpers/jsUtils'

const {
  CONFIRMATION_PLACEMENT_MBOX_ID,
  EARLY_BIRD_PRICE_VISIBILITY_MBOX_ID,
  EARLY_BIRD_PURCHASE_VISIBILITY_MBOX_ID,
  PRICE_PROMO_MIDDLE1_MBOX_ID,
  PRICING_CHASE_MBOX_ID,
  PURCHASE_PAGE_MBOX_ID,
  PURCHASE_PAYMENT_METHOD_MBOX_ID
} = AdobeTargetConstants;
const { window, location } = BrowserObject;

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

window?.navigator?.vibrate = noop;

describe('AirBookingActions', () => {
  const getMboxConfig = sinon.stub(AdobeTargetActions, 'getMboxConfig');

  let mockAudienceWcmAppContext, mockChaseWcmAppContext;
  let searchRequest;
  let store;
  let passengerBasicInfo;

  beforeEach(() => {
    mockAudienceWcmAppContext = ['aud-acq'];
    mockChaseWcmAppContext = ['aud-acq_eb-false_intl-false'];
    searchRequest = new SearchForFlightsRequestBuilder().build();
    store = mockStore({
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().build()
          }
        },
        airports: {
          allAirports: [
            ...getMultiSelectGroup()['Boston Area Airports'],
            ...getMultiSelectGroup()['Chicago Area Airports']
          ]
        }
      }
    });
    passengerBasicInfo = {
      firstName: 'wang',
      middleName: 'dev',
      lastName: 'yaqing',
      rapidRewardsNumber: '12321312'
    };
    location.href = 'http://example.com/air/booking/';
  });

  afterEach(() => {
    sinon.restore();
  });

  context('corporate booking', () => {
    it('should update corporate booking switch info', () => {
      const switchData = { switchInfo: {} };

      store.dispatch(AirBookingActions.updateCorporateBookingSwitchInfo(switchData));
      const actions = store.getActions();

      expect(actions[0]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
        corporateBookingSwitchInfo: switchData
      });
    });

    it('should update selectedIrn', () => {
      const updatedIrn = 'IrnName';

      store.dispatch(AirBookingActions.updateSelectedIrn(updatedIrn));
      const actions = store.getActions();

      expect(actions[0]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN,
        selectedIrn: { name: updatedIrn, manuallyEntered: false }
      });
    });

    it('should update selectedIrn when manually entered', () => {
      const updatedIrn = 'IrnName';

      store.dispatch(AirBookingActions.updateSelectedIrn(updatedIrn, true));
      const actions = store.getActions();

      expect(actions[0]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN,
        selectedIrn: { name: updatedIrn, manuallyEntered: true }
      });
    });

    it('should save EarlyBirdSwitchState', () => {
      store.dispatch(AirBookingActions.saveEarlyBirdSelected(true));
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
          earlyBirdSelected: true
        }
      ]);
    });

    it('should save EarlyBirdSwitchState if undefined passed', () => {
      store.dispatch(AirBookingActions.saveEarlyBirdSelected());
      const actions = store.getActions();

      expect(actions[0]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
        earlyBirdSelected: false
      });
    });

    it('should not return ghost cards if it has empty value', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: [],
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          }
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };
      const expectedAction = {
        paymentInfo: {
          selectedCardId: 'primaryCardId'
        },
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
      };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        const actions = store.getActions();

        expect(actions[4]).to.deep.equal(expectedAction);
      });
    });

    it('should not return exception if ghost cards object is null', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: null,
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          }
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };
      const expectedAction = {
        paymentInfo: {
          selectedCardId: 'primaryCardId'
        },
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
      };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        const actions = store.getActions();

        expect(actions[4]).to.deep.equal(expectedAction);
      });
    });

    it('should return first ghost card ID if there is only 1 value for ghost cards', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'OTHERS',
              name: 'First Ghost Card',
              isExpired: false
            }
          ],
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          }
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };
      const expectedAction = {
        paymentInfo: {
          selectedCardId: 'First Ghost Card',
          selectedGhostCardId: 'First Ghost Card'
        },
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
      };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        const actions = store.getActions();

        expect(actions[4]).to.deep.equal(expectedAction);
      });
    });

    it('should return primary card if there multiple value for ghost cards', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'OTHERS',
              name: 'First Ghost Card',
              isExpired: false
            },
            {
              savedCreditCardId: 'Second Ghost Card',
              type: 'OTHERS',
              name: 'Second Ghost Card',
              isExpired: false
            }
          ],
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          },
          ghostCardRequired: false
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };
      const expectedAction = {
        paymentInfo: {
          selectedCardId: 'primaryCardId'
        },
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
      };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        const actions = store.getActions();

        expect(actions[4]).to.deep.equal(expectedAction);
      });
    });

    it('should set the express checkout to false if default credit card is ghost card', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            }
          ],
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          },
          ghostCardRequired: false
        }
      };
      const expectedAction = {
        type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT,
        isExpressCheckout: false
      };
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'M'
      };

      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'fakeURL', 1))
        .then(() => {
          const actions = store.getActions();

          expect(actions[6]).to.deep.equal(expectedAction);
        });
    });

    it('should set the express checkout to false if ghost card is required', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            },
            {
              savedCreditCardId: 'Second Ghost Card',
              type: 'GHOST_CARD',
              name: 'Second Ghost Card',
              isExpired: false
            }
          ],
          primaryCard: {
            savedCreditCardId: 'primaryCardId'
          },
          ghostCardRequired: true
        }
      };
      const expectedAction = {
        type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT,
        isExpressCheckout: false
      };
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'M'
      };

      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'fakeURL', 1))
        .then(() => {
          const actions = store.getActions();

          expect(actions[4]).to.deep.equal(expectedAction);
        });
    });

    it('should create actions when fetch user credit cards and passengers success', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          primaryCard: {
            savedCreditCardId: 'someCardID'
          },
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            },
            {
              savedCreditCardId: 'Second Ghost Card',
              type: 'GHOST_CARD',
              name: 'Second Ghost Card',
              isExpired: false
            }
          ],
          ghostCardRequired: false
        }
      };

      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'M'
      };

      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedActions = [
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO
        },
        {
          isFetching: false,
          passengerDetailsPageResponse,
          paymentSavedCreditCardsPage: {
            primaryCard: { savedCreditCardId: 'someCardID' },
            ghostCards: [
              {
                savedCreditCardId: 'First Ghost Card',
                type: 'GHOST_CARD',
                name: 'First Ghost Card',
                isExpired: false
              },
              {
                savedCreditCardId: 'Second Ghost Card',
                type: 'GHOST_CARD',
                name: 'Second Ghost Card',
                isExpired: false
              }
            ],
            ghostCardRequired: false
          },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
          passengerDetailsPage,
          isInternationalBooking: false
        },
        {
          paymentInfo: {
            selectedCardId: 'someCardID'
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
          url: 'fakeURL'
        },
        {
          paymentInfo: {
            selectedCardId: 'someCardID'
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
        },
        {
          isExpressCheckout: true,
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT
        },
        {
          payload: {
            args: ['/air/booking/purchase.html'],
            method: 'replace'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          isEligibleForExpressCheckout: false,
          type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT
        }
      ];

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'fakeURL', 1))
        .then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
    });

    context('when ghost card required', () => {
      it('should not dispatch if there are multiple value for ghost cards and ghost card is required (selectedCardId = undefined)', () => {
        const creditCardsResponse = {
          paymentSavedCreditCardsPage: {
            ghostCards: [
              {
                savedCreditCardId: 'First Ghost Card',
                type: 'GHOST_CARD',
                name: 'First Ghost Card',
                isExpired: false
              },
              {
                savedCreditCardId: 'Second Ghost Card',
                type: 'GHOST_CARD',
                name: 'Second Ghost Card',
                isExpired: false
              }
            ],
            primaryCard: {
              savedCreditCardId: 'primaryCardId'
            },
            ghostCardRequired: true
          }
        };
        const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };
        const expectedAction = undefined;

        sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
        sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

        return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
          const actions = store.getActions();

          expect(actions[4]).to.deep.equal(expectedAction);
        });
      });
    });

    context('purchase flight', () => {
      let purchaseFlightParams;

      beforeEach(() => {
        purchaseFlightParams = new PurchaseFlightParamsBuilder().build();
        sinon.stub(FlightBookingApi, 'purchaseFlight');
      });

      context('when submitting IRN', () => {
        it('should updated selected IRN', () => {
          FlightBookingApi.purchaseFlight.returns(
            Q({ flightConfirmationPage: { internalReferenceNumber: '123456789' } })
          );

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[3]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN,
              selectedIrn: { name: '123456789', manuallyEntered: false }
            });
          });
        });

        it('should not updated selected IRN if the value is undefined', () => {
          FlightBookingApi.purchaseFlight.returns(Q({ flightConfirmationPage: {} }));

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[3]).to.deep.equal({
              isFetching: false,
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
              response: {
                flightConfirmationPage: {}
              }
            });
          });
        });
      });
    });
  });

  context('updateFlightSearchRequestAndSyncToFormData', () => {
    it('should create action to update flight search request', () => {
      const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
      const expectedActions = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
          formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
          url: '/',
          fieldValues: {
            departureAndReturnDate: {
              departureDate,
              returnDate,
              isDateChanged: true
            },
            numberOfAdults,
            ...rest
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
          passengerCount: {
            lapChildCount: numberOfLapInfants,
            adultCount: numberOfAdults,
            valueUpdated: true
          }
        }
      ];

      store.dispatch(AirBookingActions.updateFlightSearchRequestAndSyncToFormData(searchRequest));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should create action to update flight search request with provided isDateChanged value and avoid clearing form data', () => {
      const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
      const expectedActions = [
        {
          payload: {
            args: ['/air/booking?clearFormData=false'],
            method: 'replace'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
          formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
          url: '/',
          fieldValues: {
            departureAndReturnDate: {
              departureDate,
              returnDate,
              isDateChanged: false
            },
            numberOfAdults,
            ...rest
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
          passengerCount: {
            lapChildCount: numberOfLapInfants,
            adultCount: numberOfAdults,
            valueUpdated: true
          }
        }
      ];

      store.dispatch(AirBookingActions.updateFlightSearchRequestAndSyncToFormData(searchRequest, false));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should create action to update flight search request and avoid dispatching saveSearchRequest when shouldSaveSearchRequest is false', () => {
      store.dispatch(AirBookingActions.updateFlightSearchRequestAndSyncToFormData(searchRequest, true, false));

      const actions = store.getActions();

      actions.forEach((action) =>
        expect(action.type).to.not.equal(AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST)
      );
    });
  });

  context('getRecentSearchForLocalStorage', () => {
    it('should create action when fetch recent search from local storage success', () => {
      const searches = [new SearchForFlightsRequestBuilder().build()];

      sinon.stub(storeModule, 'get').returns(searches);

      const expectedActions = [
        { type: AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE },
        { type: AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE_SUCCESS, searches }
      ];

      store.dispatch(AirBookingActions.getRecentSearchForLocalStorage());
      expect(store.getActions()).be.deep.equal(expectedActions);
    });
  });

  context('selectedFlight', () => {
    beforeEach(() => {
      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    });
    afterEach(() => {
      sinon.restore();
    });

    it('should fire the analytics satellite event with select fare page message on selecting the departing flight', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'outbound', paxType: 'adult' }
        },
        currentDirection: 'outbound'
      };

      store.dispatch(AirBookingActions.selectFare(selectedFlight));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('select fare page');
    });

    it('should fire the analytics satellite event with select mobile fare page message on selecting the returning flight', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'inbound', paxType: 'adult' }
        }
      };

      store.dispatch(AirBookingActions.selectFare(selectedFlight));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('select mobile fare page');
    });

    it('should fire the analytics satellite event with oubtbound page for multiselect on selecting the departing flight', () => {
      const selectedFlight = {
        currentDirection: 'outbound',
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'outbound', paxType: 'adult' }
        },
        isMultiSelectGroup: true
      };

      store.dispatch(AirBookingActions.selectFare(selectedFlight));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('otter', {
        page: 'air-booking-select-multi-outbound-fare'
      });
    });

    it('should fire the analytics satellite event with inbound page for multiselect on selecting the returning flight', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'inbound', paxType: 'adult' }
        },
        isMultiSelectGroup: true
      };

      store.dispatch(AirBookingActions.selectFare(selectedFlight));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('otter', {
        page: 'air-booking-select-multi-inbound-fare'
      });
    });

    it('should save selected flight and then go to the select-depart page', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'outbound', paxType: 'adult' }
        }
      };

      const expectedActions = [
        {
          selectedFlight,
          type: 'AIR_BOOKING__SAVE_SELECTED_FLIGHT'
        },
        {
          payload: {
            args: ['/air/booking/select-fare-depart.html'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(AirBookingActions.selectFare(selectedFlight));

      const action = store.getActions();

      expect(action).to.deep.equal(expectedActions);
    });
  });

  context('searchForFlights', () => {
    let response;
    const nextPagePath = '/air/booking/adult/outbound/results';

    beforeEach(() => {
      response = new ProductsBuilder().build();
      sinon.stub(FlightBookingApi, 'findFlightProducts').returns(Q(response));
    });

    context('fetch flight shopping page failed', () => {
      it('should create FETCH_FLIGHT_SHOPPING_PAGE_FAILED when fetching flight shopping page failed', () => {
        const errorHandler = noop;

        FlightBookingApi.findFlightProducts.returns(
          Q.reject({
            errorHandler,
            responseJSON: {
              code: 400521200
            }
          })
        );

        return store
          .dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath, errorHandler }))
          .then(() => {
            const actions = store.getActions();

            expect(actions[1]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
              request: searchRequest,
              isFetching: true
            });
            expect(actions[4]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
              passengerCount: {
                adultCount: searchRequest.numberOfAdults,
                lapChildCount: searchRequest.numberOfLapInfants,
                valueUpdated: true
              }
            });
            expect(actions[5]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_FAILED,
              error: {
                errorHandler,
                responseJSON: {
                  code: 400521200
                }
              },
              isFetching: false
            });
            expect(actions.length).to.be.equal(6);
          });
      });

      it('should dispatch customized error dialog when no-routes-error for non-Hawaii included flight', () => {
        FlightBookingApi.findFlightProducts.returns(
          Q.reject({
            responseJSON: {
              code: 400521204,
              message: 'message'
            }
          })
        );
        const errorHandler = sinon.stub();

        return store
          .dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath, errorHandler }))
          .then(() => {
            const actions = store.getActions();

            expect(actions[1]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
              request: searchRequest,
              isFetching: true
            });
            expect(actions[4]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
              passengerCount: {
                adultCount: searchRequest.numberOfAdults,
                lapChildCount: searchRequest.numberOfLapInfants,
                valueUpdated: true
              }
            });
            expect(actions[5]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_FAILED,
              error: {
                responseJSON: {
                  code: 400521204,
                  message: 'message'
                },
                $customized: true,
                errorHandler
              },
              isFetching: false
            });
            expect(actions[6]).to.contain({
              type: DialogActionTypes.TOGGLE_DIALOG,
              isShowDialog: true
            });
          });
      });

      it('should close dialog and call error handler when ok clicked on error dialog when no-routes-error for non-Hawaii included flight', () => {
        FlightBookingApi.findFlightProducts.returns(
          Q.reject({
            responseJSON: {
              code: 400521204,
              message: 'message'
            }
          })
        );

        const errorHandler = sinon.stub();

        return store
          .dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath, errorHandler }))
          .then(() => {
            const actions = store.getActions();
            const onCloseFunction = actions[6].options.onClose;

            store.clearActions();

            return onCloseFunction().then(() => {
              expect(store.getActions()[0]).to.deep.include({
                type: 'TOGGLE_DIALOG',
                isShowDialog: false
              });
              expect(errorHandler).to.have.been.called;
            });
          });
      });

      it('should close dialog and call error handler when learn more clicked on error dialog when no-routes-error for non-Hawaii included flight', () => {
        FlightBookingApi.findFlightProducts.returns(
          Q.reject({
            responseJSON: {
              code: 400521204,
              message: 'message'
            }
          })
        );

        const errorHandler = sinon.stub();

        return store
          .dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath, errorHandler }))
          .then(() => {
            const actions = store.getActions();
            const onClickFunction = actions[6].options.verticalLinks.links[0].onClick;

            store.clearActions();

            return onClickFunction().then(() => {
              expect(store.getActions()[0]).to.deep.include({
                type: 'TOGGLE_DIALOG',
                isShowDialog: false
              });
              expect(errorHandler).to.have.been.called;
            });
          });
      });

      context('when no-routes-error received for a route that includes Hawaii', () => {
        let showDialogStub;
        let getContentStub;
        const error = {
          responseJSON: {
            code: 400310589,
            message: 'message',
            requestId: 'mkddk90:mweb',
            httpStatusCode: '3008333'
          }
        };

        beforeEach(() => {
          FlightBookingApi.findFlightProducts.returns(Q.reject(error));
          showDialogStub = sinon.stub(DialogActions, 'showDialog');
          getContentStub = sinon.stub(ContentDeliveryApi, 'getContent');
        });

        it('should dispatch customized dialog using content from ContentDeliveryApi', () => {
          getContentStub.returns(Q(new HawaiiNoRoutesPopupErrorBuilder().build()));

          return store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
            const actions = store.getActions();

            expect(actions[1]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
              request: searchRequest,
              isFetching: true
            });
            expect(actions[4]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
              passengerCount: {
                adultCount: searchRequest.numberOfAdults,
                lapChildCount: searchRequest.numberOfLapInfants,
                valueUpdated: true
              }
            });
            expect(actions[5]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_FAILED,
              error: {
                responseJSON: {
                  code: 400310589,
                  message: 'message',
                  requestId: 'mkddk90:mweb',
                  httpStatusCode: '3008333'
                },
                $customized: true
              },
              isFetching: false
            });
            expect(getContentStub).to.have.been.calledOnce;
            expect(showDialogStub.args[0][0]).to.contain({
              title: 'Test: Trying to get to Hawaii?'
            });
            expect(showDialogStub.args[0][0].error).to.equal(error);
          });
        });

        it('should dispatch normal error dialog when call to ContentDeliveryApi fails', async () => {
          getContentStub.returns(Q.reject({ error: 'WCM Content Service error' }));

          await store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
            const actions = store.getActions();

            expect(actions[1]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
              request: searchRequest,
              isFetching: true
            });
            expect(actions[4]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
              passengerCount: {
                adultCount: searchRequest.numberOfAdults,
                lapChildCount: searchRequest.numberOfLapInfants,
                valueUpdated: true
              }
            });
            expect(actions[5]).to.deep.equal({
              type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_FAILED,
              error: {
                responseJSON: {
                  code: 400310589,
                  message: 'message',
                  requestId: 'mkddk90:mweb',
                  httpStatusCode: '3008333'
                },
                $customized: true
              },
              isFetching: false
            });
          });

          expect(ContentDeliveryApi.getContent).to.have.been.calledOnce;
          expect(DialogActions.showDialog.args[0][0]).to.contain({
            title: i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE'),
            message: i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE')
          });
          expect(showDialogStub.args[0][0].error).to.equal(error);
        });
      });
    });

    it('should create SET_FLOW_STATUS when fetching flight shopping page start', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: FlowStatusActionTypes.SET_FLOW_STATUS,
          flowName: 'airBooking',
          status: 'initial'
        });
      }));

    it('should create SET_FLIGHT_SHOPPING_PAGE when fetching flight shopping page has been done', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[7]).to.deep.equal({
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
          response
        });
      }));

    it('should create push action when fetching flight shopping page has been done and has nextPagePath', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[9]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { args: ['/air/booking/adult/outbound/results'], method: 'push' }
        });
      }));

    it('should not create push action when parameter does not have nextPagePath', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest })).then(() => {
        const actions = store.getActions();

        expect(actions[1]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
          request: searchRequest,
          isFetching: true
        });
        expect(actions[7]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
          response,
          isFetching: false
        });
      }));

    it('should clear Apple Pay State when fetching flight shopping page has been done', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[5]).to.deep.equal({
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        });
      }));

    it('should save search request to local store', () => {
      sinon.stub(storeModule, 'set');

      return store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        expect(storeModule.set).to.have.been.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
      });
    });

    describe('multiSelectGroup', () => {
      let searchRequestMultiSelectGroup = {
        currencyType: 'USD',
        departureDate: '2022-09-19',
        destination: 'Boston',
        isDateChanged: true,
        isRoundTrip: true,
        multipleDestinationAirportGroupName: 'Boston',
        multipleDestinationAirports: ['BOS', 'BDL', 'MHT', 'PVD'],
        multipleOriginationAirportGroupName: 'Chicago',
        multipleOriginationAirports: ['MDW', 'ORD'],
        numberOfLapInfants: 0,
        origin: 'Chicago',
        returnDate: '2022-09-22',
        tripType: 'roundTrip'
      };
      const multiSelectGroup = { isSelected: true, origin: ['MDW', 'ORD'], destination: ['BOS', 'BDL', 'MHT', 'PVD'] };

      it('should dispatch fetchFlightShoppingMultiSelectPage and fetchFlightShoppingMultiSelectPageFailed when multiselectgroups is selected', () => {
        const errorHandler = sinon.stub();

        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        FlightBookingApi.findMultiSelectGroup.returns(
          Promise.reject({
            responseJSON: {
              code: 400521200
            }
          })
        );

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              nextPagePath,
              errorHandler,
              multiSelectGroup
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[0]).to.deep.equal({
              isFetching: true,
              request: { ...searchRequestMultiSelectGroup, multiSelectGroup },
              type: 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE'
            });

            expect(actions[8]).to.deep.equal({
              type: 'SET_FLOW_STATUS',
              flowName: 'airBooking',
              status: 'in_progress'
            });

            expect(actions[9]).to.deep.equal({
              type: 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_FAILED',
              error: {
                responseJSON: {
                  code: 400521200
                },
                errorHandler
              },
              isFetching: false
            });
          });
      });

      it('should dispatch fetchFlightShoppingMultiSelectPageSuccess when multiselectgroups is selected', () => {
        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');

        FlightBookingApi.findMultiSelectGroup.returns(Promise.resolve(new MultiSelectGroupBuilder().build()));

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: { ...searchRequestMultiSelectGroup, numberOfAdults: 1 },
              nextPagePath,
              multiSelectGroup
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[9]).to.deep.equal({
              type: 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS',
              response: new MultiSelectGroupBuilder().build().multipleAirportsData,
              isFetching: false
            });
            expect(storeModule.set).to.have.been.calledWith('ShoppingSearchHistoryStore::searchRequests', [
              { ...searchRequestMultiSelectGroup, multiSelectGroup, numberOfAdults: 1 }
            ]);
          });
      });

      it('should dispatch resetFlightShoppingResponse and clearMultiSelectBound when resetMultiSelectBoundSelection is called', () => {
        store.dispatch(AirBookingActions.resetMultiSelectBoundSelection());

        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: 'AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE'
        });
        expect(actions[1]).to.deep.equal({
          type: 'AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND'
        });
      });

      it('should dispatch resetFlightShoppingResponse and clearMultiSelectBound when multiselectgroups is selected', () => {
        const errorHandler = sinon.stub();

        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');

        FlightBookingApi.findMultiSelectGroup.returns(Promise.resolve(new MultiSelectGroupBuilder().build()));

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              nextPagePath,
              errorHandler,
              multiSelectGroup
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[2]).to.deep.equal({
              type: 'AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE'
            });
            expect(actions[3]).to.deep.equal({
              type: 'AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND'
            });
          });
      });

      it('should create push action when multiselectgroups is selected and has nextPagePath', () => {
        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');

        FlightBookingApi.findMultiSelectGroup.returns(Promise.resolve(new MultiSelectGroupBuilder().build()));

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              nextPagePath,
              multiSelectGroup
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[10]).to.deep.equal({
              type: '@@router/CALL_HISTORY_METHOD',
              payload: { args: ['/air/booking/adult/outbound/results'], method: 'push' }
            });
          });
      });

      it('should not create push action when multiselectgroups is selected and parameter does not have nextPagePath', () => {
        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');

        FlightBookingApi.findMultiSelectGroup.returns(Promise.resolve(new MultiSelectGroupBuilder().build()));

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              multiSelectGroup
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[0]).to.deep.equal({
              isFetching: true,
              request: { ...searchRequestMultiSelectGroup, multiSelectGroup },
              type: 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE'
            });
            expect(actions[9]).to.deep.equal({
              type: 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS',
              response: new MultiSelectGroupBuilder().build().multipleAirportsData,
              isFetching: false
            });
            expect(actions[9]).to.not.deep.equal({
              type: '@@router/CALL_HISTORY_METHOD',
              payload: { args: ['/air/booking/adult/outbound/results'], method: 'push' }
            });
          });
      });

      it('should dispatch saveRequest when fetchFlightShoppingMultiSelectPageSuccess', () => {
        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');

        FlightBookingApi.findMultiSelectGroup.returns(Promise.resolve(new MultiSelectGroupBuilder().build()));

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              multiSelectGroup,
              shouldSaveSearchRequest: false
            })
          )
          .then(() => {
            const actions = store.getActions();

            expect(actions[9]).to.deep.equal({
              searchRequest: { ...searchRequestMultiSelectGroup, multiSelectGroup },
              type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST'
            });
          });
      });

      it('should not save search request to local store when multiselectgroups is not selected', () => {
        sinon.stub(FlightBookingApi, 'findMultiSelectGroup');
        sinon.stub(storeModule, 'set');
        FlightBookingApi.findFlightProducts.returns(Q.reject());
        FlightBookingApi.findMultiSelectGroup.returns(Q.reject());

        searchRequestMultiSelectGroup = {
          ...searchRequestMultiSelectGroup,
          multiSelectGroup: {
            isSelected: false
          }
        };

        return store
          .dispatch(
            AirBookingActions.searchForMultiSelectGroupFlights({
              searchRequest: searchRequestMultiSelectGroup,
              nextPagePath,
              multiSelectGroup: searchRequestMultiSelectGroup.multiSelectGroup
            })
          )
          .then(() => {
            expect(storeModule.set).to.not.have.been.called;
          });
      });

      it('should dispatch updateUnavailableMultiSelectGroup when no flight between bound for multiselect group', () => {
        FlightBookingApi.findFlightProducts.returns(
          Q.reject({
            responseJSON: {
              code: 400521204,
              message: 'message'
            }
          })
        );

        return store
          .dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath, multiSelectGroup }))
          .then(() => {
            const actions = store.getActions();

            expect(actions[9]).to.not.deep.equal({
              type: 'AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP',
              response: { origin: 'ATL', destination: 'AUS' }
            });
          });
      });
      it('should update search request and transition to air booking landing page for multi select group', () => {
        const searchRequest = { ...searchRequestMultiSelectGroup, multiSelectGroup };
        const { departureDate, numberOfAdults, numberOfLapInfants = 0, returnDate, ...rest } = searchRequest;
        const expectedActions = [
          {
            searchRequest,
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST
          },
          {
            fieldValues: {
              ...rest,
              departureAndReturnDate: {
                departureDate,
                isDateChanged: true,
                returnDate
              },
              destination: 'BOS,BDL,MHT,PVD',
              numberOfAdults,
              origin: 'MDW,ORD'
            },
            formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
            type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
            url: '/'
          },
          {
            passengerCount: {
              adultCount: numberOfAdults,
              lapChildCount: numberOfLapInfants,
              valueUpdated: true
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
          },
          {
            payload: {
              args: ['/air/booking?clearFormData=false'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(AirBookingActions.transitionToShoppingLandingPage(searchRequest));

        expect(store.getActions()).be.deep.equal(expectedActions);
      });
    });

    it('should delete PayPal data in session storage', () => {
      const removePayPalDataStub = sinon.stub(storeModule.session, 'remove');

      return store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        expect(removePayPalDataStub).to.have.been.called;
      });
    });

    it('should reset selected products', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__RESET_SELECTED_PRODUCTS
        });
      }));

    it('should save search request when transition to next page', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[3]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        });
      }));

    it('should save search request when failed', () => {
      FlightBookingApi.findFlightProducts.returns(
        Q.reject({
          responseJSON: {
            code: 400521204,
            message: 'message'
          }
        })
      );

      return store.dispatch(AirBookingActions.searchForFlights({ searchRequest, nextPagePath })).then(() => {
        const actions = store.getActions();

        expect(actions[3]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        });
      });
    });

    it('should not save search request when multiSelectGroup bound is selected', (done) => {
      store.dispatch(
        AirBookingActions.searchForFlights({ searchRequest, nextPagePath, shouldUpdateMultiSelectBound: true })
      );

      const actions = store.getActions();

      waitFor.untilAssertPass(() => {
        expect(actions[2]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__RESET_SELECTED_PRODUCTS
        });
      }, done);
    });

    it('should dispatch updateMultiSelectBound when multiSelectGroup bound is selected', (done) => {
      store.dispatch(
        AirBookingActions.searchForFlights({ searchRequest, nextPagePath, shouldUpdateMultiSelectBound: true })
      );

      const actions = store.getActions();

      waitFor.untilAssertPass(() => {
        expect(actions[7]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_MULTI_SELECT_BOUND,
          multiSelectAirportBounds: { originBoundAirport: 'ATL', destinationBoundAirport: 'AUS' }
        });
      }, done);
    });

    it('should dispatch customized error dialog and clear multiSelectBounds when no-routes-error returned for request with multiSelectGroup bound selected', () => {
      FlightBookingApi.findFlightProducts.returns(
        Q.reject({
          responseJSON: {
            code: 400521204,
            message: 'message'
          }
        })
      );
      const errorHandler = sinon.stub();
      const errorOptions = {
        error: {
          responseJSON: {
            code: 'MOCKCODE',
            message: 'Mock error message'
          }
        }
      };
      const showDialogStub = sinon.stub(DialogActions, 'showDialog').returns({
        isShowDialog: true,
        type: 'MOCK_TOGGLE_DIALOG'
      });
      const transformToNoRoutesErrorDialogOptionsStub = sinon
        .stub(flightProductSearchRequestTransformers, 'transformToNoRoutesErrorDialogOptions')
        .returns(errorOptions);

      return store
        .dispatch(
          AirBookingActions.searchForFlights({
            errorHandler,
            nextPagePath,
            searchRequest,
            shouldUpdateMultiSelectBound: true
          })
        )
        .then(() => {
          const actions = store.getActions();

          expect(actions[1]).to.deep.equal({
            isFetching: true,
            request: searchRequest,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE
          });
          expect(actions[5]).to.deep.equal({
            error: {
              $customized: true,
              errorHandler,
              responseJSON: {
                code: 400521204,
                message: 'message'
              }
            },
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_FAILED
          });
          expect(actions[6]).to.deep.equal({
            isShowDialog: true,
            type: 'MOCK_TOGGLE_DIALOG'
          });
          expect(actions[7]).to.deep.equal({
            type: AirBookingActionTypes.AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND
          });
          expect(showDialogStub.args[0][0]).to.equal(errorOptions);
          expect(transformToNoRoutesErrorDialogOptionsStub.args[0]).to.have.lengthOf(5);
          expect(transformToNoRoutesErrorDialogOptionsStub.args[0][4]).to.equal(errorHandler);
        });
    });

    it('should not change flow status when preventFlowStatusChange is true', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, preventFlowStatusChange: true })).then(() => {
        const actions = store.getActions()

        actions.forEach(action => {
          expect(action.type).to.not.equal(FlowStatusActionTypes.SET_FLOW_STATUS);
        });
      }));

    it('should save searchRequest and not change AIR_BOOKING_SHOPPING_SEARCH_FORM when preventFlowStatusChange is false', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, preventFlowStatusChange: false })).then(() => {
        const actions = store.getActions();

        actions.forEach(action => {
          expect(action.type).to.not.equal(FormDataActionTypes.UPDATE_FORM_DATA_VALUE);
        })

        expect(actions[3]).to.deep.equal({
          type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST',
          searchRequest: {
            currencyType: 'USD',
            departureDate: '2015-11-10',
            destination: 'AUS',
            isInitialSearch: true,
            isRoundTrip: true,
            numberOfAdults: 1,
            numberOfLapInfants: 0,
            numberOfSeniors: 0,
            origin: 'ATL',
            returnDate: '2015-12-10',
            tripType: 'roundTrip',
            useLowFareCalendar: false
          }
        });
      }));

    it('should change searchRequest and AIR_BOOKING_SHOPPING_SEARCH_FORM when preventFlowStatusChange is true', () =>
      store.dispatch(AirBookingActions.searchForFlights({ searchRequest, preventFlowStatusChange: true })).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.equal({
          type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST',
          searchRequest: {
            origin: 'ATL',
            destination: 'AUS',
            tripType: 'roundTrip',
            departureDate: '2015-11-10',
            returnDate: '2015-12-10',
            numberOfAdults: 1,
            numberOfSeniors: 0,
            numberOfLapInfants: 0,
            currencyType: 'USD',
            isRoundTrip: true,
            useLowFareCalendar: false,
            isInitialSearch: true
          }
        });
        expect(actions[3]).to.deep.equal({
          type: 'UPDATE_FORM_DATA_VALUE',
          formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
          fieldValues: {
            departureAndReturnDate: {
              departureDate: '2015-11-10',
              isDateChanged: true,
              returnDate: '2015-12-10'
            },
            origin: 'ATL',
            destination: 'AUS',
            tripType: 'roundTrip',
            numberOfAdults: 1,
            numberOfSeniors: 0,
            currencyType: 'USD',
            isRoundTrip: true,
            useLowFareCalendar: false,
            isInitialSearch: true
          },
          url: '/'
        });
      }));

    it('should not dispatch saveSearchRequest when shouldSaveSearchRequest is false', () =>
      store.dispatch(AirBookingActions.searchForFlights({ shouldSaveSearchRequest: false, searchRequest })).then(() => {
        const actions = store.getActions();

        actions.forEach((action) =>
          expect(action.type).to.not.equal(AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST)
        );
      }));
  });

  context('getProductList', () => {
    let response;

    beforeEach(() => {
      response = new ProductsBuilder().build();
      sinon.stub(FlightBookingApi, 'findFlightProducts').returns(Q(response));
    });

    it('should create actions for when user fetch flight products on shopping page', () => {
      searchRequest = new SearchForFlightsRequestBuilder().build();
      const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
      const expectedActions = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
          request: searchRequest,
          isFetching: true
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
          formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
          url: '/',
          fieldValues: {
            departureAndReturnDate: {
              departureDate,
              returnDate,
              isDateChanged: true
            },
            numberOfAdults,
            ...rest
          }
        },
        {
          passengerCount: {
            lapChildCount: numberOfLapInfants,
            adultCount: numberOfAdults,
            valueUpdated: true
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
        },
        {
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
          response
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
          isInitialSearch: false
        }
      ];

      sinon.stub(storeModule, 'set');

      return store.dispatch(AirBookingActions.getProductList({ searchRequest })).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
        expect(storeModule.set).to.be.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
      });
    });

    context('when low fare calendar', () => {
      it('should update the selected LFC outbound date when oneway', () => {
        searchRequest = new SearchForFlightsRequestBuilder().withOneWay().withLowFareCalendar(true).build();
        const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
        const expectedActions = [
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
            request: searchRequest,
            isFetching: true
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
            searchRequest
          },
          {
            type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
            formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
            url: '/',
            fieldValues: {
              departureAndReturnDate: {
                departureDate,
                returnDate,
                isDateChanged: true
              },
              numberOfAdults,
              ...rest
            }
          },
          {
            passengerCount: {
              lapChildCount: numberOfLapInfants,
              adultCount: numberOfAdults,
              valueUpdated: true
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
          },
          {
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
            response
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
            isInitialSearch: false
          },
          {
            date: '2015-11-10',
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE'
          }
        ];

        sinon.stub(storeModule, 'set');

        return store.dispatch(AirBookingActions.getProductList({ searchRequest })).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
          expect(storeModule.set).to.be.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
        });
      });

      it('should update the selected LFC outbound and inbounds dates when roundtrip', () => {
        searchRequest = new SearchForFlightsRequestBuilder().withLowFareCalendar(true).build();
        const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
        const expectedActions = [
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
            request: searchRequest,
            isFetching: true
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
            searchRequest
          },
          {
            type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
            formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
            url: '/',
            fieldValues: {
              departureAndReturnDate: {
                departureDate,
                returnDate,
                isDateChanged: true
              },
              numberOfAdults,
              ...rest
            }
          },
          {
            passengerCount: {
              lapChildCount: numberOfLapInfants,
              adultCount: numberOfAdults,
              valueUpdated: true
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
          },
          {
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
            response
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
            isInitialSearch: false
          },
          {
            date: '2015-11-10',
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE'
          },
          {
            date: '2015-12-10',
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE'
          }
        ];

        sinon.stub(storeModule, 'set');

        return store.dispatch(AirBookingActions.getProductList({ searchRequest })).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
          expect(storeModule.set).to.be.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
        });
      });
    });
  });

  context('loadPurchasePagePlacements', () => {
    const {
      AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS,
      AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
      AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED
    } = AirBookingActionTypes;
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [{ mbox: PURCHASE_PAGE_MBOX_ID, params }];

    let getTargetParamsStub;
    let getSegmentsStub;
    let getPlacementsStub;

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
      getMboxConfig.returns(() => Promise.resolve(args));
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getSegments throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(PURCHASE_PAGE_ID, mockChaseWcmAppContext, segment);

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch success action when no errors', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.resolve(content));

      const content = 'content';

      const fetchAction = { type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS, isFetching: true };
      const fetchSuccessAction = {
        type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
        isFetching: false,
        response: content
      };

      await store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(PURCHASE_PAGE_ID, mockChaseWcmAppContext, segment);

      expect(store.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
    });

    it('should dispatch success action with early bird', (done) => {
      const store = mockStore({
        app: {
          toggles: {
            EARLY_BIRD_AB_TESTING: true
          },
          airBooking: {
            earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility
          }
        }
      });

      store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith([
          ...args,
          { mbox: EARLY_BIRD_PURCHASE_VISIBILITY_MBOX_ID, params }
        ]);
        expect(getPlacementsStub).to.have.been.calledWith(
          PURCHASE_PAGE_ID,
          ['earlyBirdEligible', ...mockChaseWcmAppContext],
          segment
        );
      }, done);
    });

    it('should dispatch success action with Uplift', (done) => {
      const store = mockStore({
        app: {
          toggles: {
            USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX: true
          }
        }
      });

      store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith([...args, { mbox: PURCHASE_PAYMENT_METHOD_MBOX_ID, params }]);
        expect(getPlacementsStub).to.have.been.calledWith(PURCHASE_PAGE_ID, mockChaseWcmAppContext, segment);
      }, done);
    });

    it('should dispatch success action with early bird and Uplift', (done) => {
      const store = mockStore({
        app: {
          toggles: {
            EARLY_BIRD_AB_TESTING: true,
            USE_UPLIFT_INSTALLMENT_PAYMENTS_MBOX: true
          }
        }
      });

      store.dispatch(AirBookingActions.loadPurchasePagePlacements());

      untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PURCHASE_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith([
          ...args,
          { mbox: EARLY_BIRD_PURCHASE_VISIBILITY_MBOX_ID, params },
          { mbox: PURCHASE_PAYMENT_METHOD_MBOX_ID, params }
        ]);
        expect(getPlacementsStub).to.have.been.calledWith(PURCHASE_PAGE_ID, mockChaseWcmAppContext, segment);
      }, done);
    });
  });

  context('loadSplitPayPagePlacements', () => {
    const {
      AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS,
      AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_SUCCESS,
      AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_FAILED
    } = AirBookingActionTypes;
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [];

    let getTargetParamsStub;
    let getSegmentsStub;
    let getPlacementsStub;

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
      getMboxConfig.returns(() => Promise.resolve(args));
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadSplitPayPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, CASH_POINTS_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getSegments throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadSplitPayPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, CASH_POINTS_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.loadSplitPayPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, CASH_POINTS_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(CASH_POINTS_INDEX_PAGE_ID, mockAudienceWcmAppContext, segment);

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch success action when no errors', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.resolve(content));

      const content = 'content';

      const fetchAction = { type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS, isFetching: true };
      const fetchSuccessAction = {
        type: AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_SUCCESS,
        isFetching: false,
        response: content
      };

      await store.dispatch(AirBookingActions.loadSplitPayPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, CASH_POINTS_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(CASH_POINTS_INDEX_PAGE_ID, mockAudienceWcmAppContext, segment);

      expect(store.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
    });
  });

  context('airBookingIndexPagePlacements', () => {
    const {
      AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS,
      AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_SUCCESS,
      AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_FAILED
    } = AirBookingActionTypes;
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [];

    let getTargetParamsStub;
    let getSegmentsStub;
    let getPlacementsStub;

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
      getMboxConfig.returns(() => Promise.resolve(args));
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.getAirBookingIndexPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, AIR_BOOKING_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getSegments throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.getAirBookingIndexPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, AIR_BOOKING_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      await store.dispatch(AirBookingActions.getAirBookingIndexPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, AIR_BOOKING_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(AIR_BOOKING_INDEX_PAGE_ID, [], segment, {});

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });

    it('should dispatch success action when no errors', async () => {
      getTargetParamsStub.returns(() => Promise.resolve(params));
      getSegmentsStub.returns(() => Promise.resolve(segment));
      getPlacementsStub.returns(() => Promise.resolve(content));

      const content = 'content';

      const fetchAction = { type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS, isFetching: true };
      const fetchSuccessAction = {
        type: AIR_BOOKING__FETCH_INDEX_PAGE_PLACEMENTS_SUCCESS,
        isFetching: false,
        response: content
      };

      await store.dispatch(AirBookingActions.getAirBookingIndexPagePlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, AIR_BOOKING_INDEX_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith(args);
      expect(getPlacementsStub).to.have.been.calledWith(AIR_BOOKING_INDEX_PAGE_ID, [], segment, {});

      expect(store.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
    });
  });

  context('getConfirmationPagePlacements', () => {
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [{ mbox: CONFIRMATION_PLACEMENT_MBOX_ID, params }];

    let getPlacementsStub, getSegmentsStub, getTargetParamsStub, hasCorporateTokenStub;

    const placements = {
      results: {
        bottomPromo1: {
          content: {
            target: 'url'
          }
        }
      }
    };

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getMboxConfig.returns(() => Promise.resolve(args));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(placements));
      hasCorporateTokenStub = sinon.stub(loginSessionHelper, 'hasCorporateToken').returns(false);
    });

    it('should dispatch success and save response when getPlacements is successful', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getConfirmationPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, CONFIRMATION_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(CONFIRMATION_PAGE_ID, [], segment, { persona: 'leisure' });
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch success and save response when getPlacements is successful and hasCorporateToken is true', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      hasCorporateTokenStub.returns(true);

      return store.dispatch(AirBookingActions.getConfirmationPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, CONFIRMATION_PAGE_ID);
        expect(getPlacementsStub).to.have.been.calledWith(CONFIRMATION_PAGE_ID, [], segment, { persona: 'corporate' });
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch failed action when getTargetParams call errors', () => {
      getTargetParamsStub.returns(() => Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getConfirmationPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getSegments call errors', () => {
      getSegmentsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getConfirmationPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getPlacements call errors', () => {
      getPlacementsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getConfirmationPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('getFlightSelectPagePlacements', () => {
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [];

    let getPlacementsStub, getSegmentsStub, getTargetParamsStub, hasCorporateTokenStub;

    const placements = {
      results: {
        bottomPromo1: {
          content: {
            target: 'url'
          }
        }
      }
    };

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getMboxConfig.returns(() => Promise.resolve(args));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(placements));
      hasCorporateTokenStub = sinon.stub(loginSessionHelper, 'hasCorporateToken').returns(false);
    });

    it('should dispatch success and save response when getPlacements is successful for outbound flow', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements('outbound')).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, SELECT_OUTBOUND_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(SELECT_OUTBOUND_PAGE_ID, [], segment, { persona: 'leisure' });
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch success and save response when getPlacements is successful for inbound flow', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements('inbound')).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, SELECT_INBOUND_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(SELECT_INBOUND_PAGE_ID, [], segment, { persona: 'leisure' });
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch success and save response when getPlacements is successful and hasCorporateToken is true', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      hasCorporateTokenStub.returns(true);

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, SELECT_OUTBOUND_PAGE_ID);
        expect(getPlacementsStub).to.have.been.calledWith(SELECT_OUTBOUND_PAGE_ID, [], segment, {
          persona: 'corporate'
        });
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch failed action when getTargetParams call errors', () => {
      getTargetParamsStub.returns(() => Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getSegments call errors', () => {
      getSegmentsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getPlacements call errors', () => {
      getPlacementsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectPagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('getFlightSelectFarePagePlacements', () => {
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [];

    let getPlacementsStub, getSegmentsStub, getTargetParamsStub, hasCorporateTokenStub;

    const placements = {
      results: {
        bottomPromo1: {
          content: {
            target: 'url'
          }
        }
      }
    };

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getMboxConfig.returns(() => Promise.resolve(args));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(placements));
      hasCorporateTokenStub = sinon.stub(loginSessionHelper, 'hasCorporateToken').returns(false);
    });

    it('should dispatch success and save response when getPlacements is successful for outbound flow', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectFarePagePlacements('outbound')).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, SELECT_OUTBOUND_FARE_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(SELECT_OUTBOUND_FARE_PAGE_ID, [], segment, {
          persona: 'leisure'
        });
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch success and save response when getPlacements is successful and hasCorporateToken is true', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_SUCCESS',
          response: placements,
          isFetching: false
        }
      ];

      hasCorporateTokenStub.returns(true);

      return store.dispatch(AirBookingActions.getFlightSelectFarePagePlacements()).then(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, SELECT_OUTBOUND_FARE_PAGE_ID);
        expect(getPlacementsStub).to.have.been.calledWith(SELECT_OUTBOUND_FARE_PAGE_ID, [], segment, {
          persona: 'corporate'
        });
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(hasCorporateTokenStub).to.have.been.called;
        expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should dispatch failed action when getTargetParams call errors', () => {
      getTargetParamsStub.returns(() => Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectFarePagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getSegments call errors', () => {
      getSegmentsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectFarePagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch failed action when getPlacements call errors', () => {
      getPlacementsStub.resolves(Promise.reject({}));
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS',
          isFetching: true
        },
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_FAILED',
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.getFlightSelectFarePagePlacements()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('setIsSplitPayVisible', () => {
    it('should set isSplitPayVisible true', () => {
      store.dispatch(AirBookingActions.setIsSplitPayVisible('show'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_SPLIT_PAY_VISIBLE,
          isSplitPayVisible: true
        }
      ]);
    });

    it('should set isSplitPayVisible false', () => {
      store.dispatch(AirBookingActions.setIsSplitPayVisible('hide'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_SPLIT_PAY_VISIBLE,
          isSplitPayVisible: false
        }
      ]);
    });
  });

  context('setIsUpliftVisible', () => {
    it('should generate correct action', () => {
      store.dispatch(AirBookingActions.setIsUpliftVisible('true'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_UPLIFT_VISIBLE,
          isUpliftVisible: true
        }
      ]);
    });
  });

  context('generatePurchaseSummaryPage', () => {
    const flightPricingPageResponse = { fakeContent: 'fakeContent' };
    const passengerInfos = [{ firstName: 'Zhen' }];

    it('should create actions when prepare data for purchaseSummary', () => {
      const expectedActions = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
          flightPricingPageResponse,
          passengerInfos
        }
      ];

      store.dispatch(AirBookingActions.generatePurchaseSummaryPage({ flightPricingPageResponse, passengerInfos }));
      const actions = store.getActions();

      expect(actions).to.deep.equal(expectedActions);
    });
  });

  context('selectFlightProductWithUpsell', () => {
    const { flightPricingPage } = new PricesBuilder().build();
    const response = { flightPricingPage };
    const upsellLinkObj = new PricesBuilder().withUpsellBothBoundsOptions().build().flightPricingPage
      ._links.flightPricingUpsellBothBounds;

    it('should create actions when select flight product with upsell success', async () => {
      const expectedActions = [
        {
          isFetching: true,
          request: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE
        },
        {
          earlyBirdEligibility: null,
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY
        },
        {
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
          response
        },
        { type: AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG, response }
      ];

      sinon.stub(FlightBookingApi, 'getProductPrices').resolves(response);

      await store.dispatch(AirBookingActions.selectFlightProductWithUpsell(upsellLinkObj));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should not push to pricing summary page when select flight product with upsell success', async () => {
      const expectedActions = {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          method: 'push',
          args: ['/air/booking/price']
        }
      };

      sinon.stub(FlightBookingApi, 'getProductPrices').resolves(response);

      await store.dispatch(AirBookingActions.selectFlightProductWithUpsell(upsellLinkObj));

      expect(store.getActions()[4]).not.to.deep.equal(expectedActions);
    });

    it('should push to repricing page if api response contain showRepriceNotification', async () => {
      const expectedActions = {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          method: 'push',
          args: ['/air/booking/reprice']
        }
      };
      const responseWithShowRepriceNotification = {
        ...response,
        flightPricingPage: {
          ...response.flightPricingPage,
          _meta: {
            ...response.flightPricingPage._meta,
            showRepriceNotification: true
          }
        }
      };

      sinon.stub(FlightBookingApi, 'getProductPrices').resolves(responseWithShowRepriceNotification);

      await store.dispatch(AirBookingActions.selectFlightProductWithUpsell(upsellLinkObj));

      expect(store.getActions()[4]).to.deep.equal(expectedActions);
    });

    it('should fetchFlightPricingPageFailed when retrieve api fails', async () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE',
          request: true,
          isFetching: true
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR,
          hasUpsellError: true
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_FAILED,
          isFetching: false,
          error: {
            errMsg: 'errMsg'
          }
        }
      ];

      sinon.stub(FlightBookingApi, 'getProductPrices').rejects({ errMsg: 'errMsg' });

      await store.dispatch(AirBookingActions.selectFlightProductWithUpsell(upsellLinkObj));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  context('selectFlightProduct', () => {
    let response;
    let getProductPricesStub;

    const selectedProducts = {
      adult: {
        outbound: {
          fareProductId:
            'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsREFMLF…XTiw1NjI2LDczVyIsInF1b3RlZFByaWNlIjoiMzE2Ljk4In0=',
          flightCardIndex: 0
        }
      }
    };

    const flightPricingPage = {
      href: 'v1/mobile-air-booking/page/flights/prices',
      method: 'POST',
      body: {
        adultPassengers: null,
        currency: 'USD',
        promoCodeToken: null,
        chaseSessionId: null
      }
    };

    const generateSelectFlightProductParameters = ({
      selectedProductsData = selectedProducts,
      paxType = 'adult',
      direction = 'outbound',
      fareProductId = 'new-product-id',
      nextProductPagePath = '/air/booking/adult/inbound/results',
      flightPricingPageData = flightPricingPage,
      searchRequestData = searchRequest,
      flightCardIndex = 0,
      tier = null
    }) => ({
      selectedProducts: selectedProductsData,
      paxType,
      direction,
      fareProductId,
      nextProductPagePath,
      flightPricingPage: flightPricingPageData,
      searchRequest: searchRequestData,
      flightCardIndex,
      tier
    });

    beforeEach(() => {
      const { flightPricingPage } = new PricesBuilder().build();

      searchRequest = new SearchForFlightsRequestBuilder().build();
      response = { flightPricingPage };
      getProductPricesStub = sinon.stub(FlightBookingApi, 'getProductPrices').returns(Q(response));
    });

    it('should merge the selected product id then create SAVE_SELECTED_PRODUCTS action when user select flight product', () => {
      const selectFlightProductParameters = generateSelectFlightProductParameters({
        direction: 'inbound',
        flightCardIndex: 2
      });
      const expectedSelectedProducts = {
        adult: {
          outbound: {
            fareProductId:
              'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsREFMLF…XTiw1NjI2LDczVyIsInF1b3RlZFByaWNlIjoiMzE2Ljk4In0=',
            flightCardIndex: 0
          },
          inbound: {
            fareProductId: 'new-product-id',
            flightCardIndex: 2
          }
        }
      };

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS,
          selectedProducts: expectedSelectedProducts
        });
      });
    });

    it('should create router push action when next page is still air booking shopping page', () => {
      const selectFlightProductParameters = generateSelectFlightProductParameters({});

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions).to.have.lengthOf(2);
        expect(actions[1]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: ['/air/booking/adult/inbound/results']
          }
        });
      });
    });

    it('should start fetch pricing page when user finished select the flight product', () => {
      const selectFlightProductParameters = generateSelectFlightProductParameters({
        selectedProducts: {},
        nextProductPagePath: null
      });
      const expectedSelectedProducts = { adult: { outbound: { fareProductId: 'new-product-id', flightCardIndex: 0 } } };

      const expectedActions = [
        { type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS, selectedProducts: expectedSelectedProducts },
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE
        },
        {
          isEligibleForExpressCheckout: true,
          type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT
        },
        {
          earlyBirdEligibility: null,
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY
        },
        {
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
          response
        },
        { type: AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG, response },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: ['/air/booking/price.html']
          }
        }
      ];

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should save and pass session id when fetch pricing page if session id exist', () => {
      const selectFlightProductParameters = generateSelectFlightProductParameters({
        selectedProducts: {},
        nextProductPagePath: null
      });

      sinon.stub(LocalStorageCache, 'loadChaseSessionId').returns(Q('chaseSessionId'));

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        expect(getProductPricesStub).to.have.been.calledWith({
          body: {
            adultPassengers: {
              numberOfPassengers: 1,
              productIds: ['new-product-id']
            },
            chaseSessionId: 'chaseSessionId',
            currency: 'USD',
            promoCodeToken: null
          },
          href: 'v1/mobile-air-booking/page/flights/prices',
          method: 'POST'
        });

        expect(store.getActions()[2]).to.deep.equal({
          chaseSessionId: 'chaseSessionId',
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_CHASE_SESSION_ID
        });
      });
    });

    it('should pass the string value for tier if it exists', () => {
      const mockTierValue = 'mock tier value';
      const selectFlightProductParameters = generateSelectFlightProductParameters({
        selectedProducts: {},
        nextProductPagePath: null,
        tier: mockTierValue
      });

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        expect(getProductPricesStub).to.have.been.calledWith({
          body: {
            adultPassengers: {
              numberOfPassengers: 1,
              productIds: ['new-product-id']
            },
            chaseSessionId: null,
            currency: 'USD',
            promoCodeToken: null,
            tier: mockTierValue
          },
          href: 'v1/mobile-air-booking/page/flights/prices',
          method: 'POST'
        });
      });
    });

    it('should push to repricing page if api response contain showRepriceNotification', () => {
      const apiResponse = cloneDeep(response);

      apiResponse?.flightPricingPage?._meta?.showRepriceNotification = true;

      FlightBookingApi.getProductPrices.returns(Q(apiResponse));

      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions[6]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: ['/air/booking/reprice']
          }
        });
      });
    });

    it('should dispatch setEarlyBirdEligibility', () => {
      const apiResponse = cloneDeep(response);

      FlightBookingApi.getProductPrices.returns(Q(apiResponse));

      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions[3]).to.deep.equal({
          earlyBirdEligibility: null,
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY
        });
      });
    });

    it('should dispatch setEarlyBirdPricingToken', () => {
      response = { ...response, flightPricingPage: { earlyBirdPricingToken: 'ebToken' } };
      const apiResponse = cloneDeep(response);

      FlightBookingApi.getProductPrices.returns(Q(apiResponse));

      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      store = mockStore({
        app: {
          toggles: {
            EARLY_BIRD_AB_TESTING: true
          }
        }
      });

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.equal({
          earlyBirdPricingToken: 'ebToken',
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_TOKEN
        });
      });
    });

    it('should create FETCH_FLIGHT_PRICING_PAGE_FAILED action when api call failed', () => {
      FlightBookingApi.getProductPrices.returns(Q.reject('api error'));

      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_FAILED,
          isFetching: false,
          error: 'api error'
        });
      });
    });

    it('should dispatch push for web users', () => {
      sinon.stub(OAuthApi, 'grantLeisureToken');
      OAuthApi.grantLeisureToken.returns(Q.resolve({}));

      const responseJSON = {
        code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
        message: 'Mock promo token expired error message'
      };
      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      sinon.stub(LocalStorageCache, 'loadChaseSessionId').returns(Q('chaseSessionId'));
      FlightBookingApi.getProductPrices.returns(Q.reject({ responseJSON }));

      return store.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = store.getActions();
        const { errorHandler } = actions[3].error;
        const expectedActions = [
          {
            selectedProducts: {
              adult: {
                outbound: {
                  fareProductId: 'new-product-id',
                  flightCardIndex: 0
                }
              }
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS
          },
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE
          },
          {
            chaseSessionId: 'chaseSessionId',
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_CHASE_SESSION_ID
          },
          {
            error: {
              errorHandler: sinon.stub(store.getActions()[3].error, 'errorHandler'),
              responseJSON: {
                code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
                message: 'Mock promo token expired error message'
              }
            },
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_FAILED
          },
          {
            isFetching: true,
            type: 'ACCOUNT__GRANT_LEISURE_TOKEN'
          },
          {
            payload: {
              args: [airBookingRoutes['index'].canonicalPath],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        errorHandler();
        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch exit webView for native apps', () => {
      const responseJSON = {
        code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
        message: 'Mock promo token expired error message'
      };
      const mockedStore = mockStore({
        app: {
          webView: {
            isWebView: true
          }
        }
      });
      const exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView').returns({ type: 'action' });
      const selectFlightProductParameters = generateSelectFlightProductParameters({ nextProductPagePath: null });

      sinon.stub(LocalStorageCache, 'loadChaseSessionId').returns(Q('chaseSessionId'));
      FlightBookingApi.getProductPrices.returns(Q.reject({ responseJSON }));

      return mockedStore.dispatch(AirBookingActions.selectFlightProduct(selectFlightProductParameters)).then(() => {
        const actions = mockedStore.getActions();
        const { errorHandler } = actions[3].error;

        errorHandler();
        expect(exitWebViewStub).to.have.been.called;
      });
    });
  });

  context('get credit cards and passenger information with express checkout', () => {
    it('should create actions when fetch user credit cards and passengers success', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          primaryCard: {
            savedCreditCardId: 'someCardID'
          }
        }
      };

      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'M'
      };

      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedActions = [
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO
        },
        {
          isFetching: false,
          passengerDetailsPageResponse,
          paymentSavedCreditCardsPage: { primaryCard: { savedCreditCardId: 'someCardID' } },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
          passengerDetailsPage,
          isInternationalBooking: false
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
          url: 'fakeURL'
        },
        {
          paymentInfo: {
            selectedCardId: 'someCardID'
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
        },
        {
          isExpressCheckout: true,
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT
        },
        {
          payload: {
            args: ['/air/booking/purchase.html'],
            method: 'replace'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          isEligibleForExpressCheckout: false,
          type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT
        }
      ];

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'fakeURL', 1))
        .then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
    });

    it('should set isEligibleForExpressCheckout false when shouldShowChaseInstantCreditCard is true', () => {
      const creditCardsResponse = { savedCreditCards: 'savedCreditCards' };
      const passengerDetailsPageResponse = { passengerDetailsPage: 'passengerDetailsPage' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedExpressCheckoutAction = {
        type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
        isEligibleForExpressCheckout: false
      };

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'url', 1, true, true))
        .then(() => {
          expect(store.getActions()[4]).to.deep.equal(expectedExpressCheckoutAction);
        });
    });

    it('should set duty of care context', () => {
      const creditCardsResponse = { savedCreditCards: 'savedCreditCards' };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dutyOfCareContact: {} } };
      const expectedExpressCheckoutAction = {
        type: FormDataActionTypes.RESET_FORM_DATA
      };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'url', 1, true, true))
        .then(() => {
          expect(store.getActions()[4]).to.deep.equal(expectedExpressCheckoutAction);
          expect(store.getActions()[3]).to.deep.equal({
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_TRAVEL_INFO_METHOD,
            info: {}
          });
        });
    });

    it('should create actions for express check out and delete passenger form data when fetch user credit cards and passengers success', () => {
      const creditCardsResponse = { savedCreditCards: [{ card: 'card' }] };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      const clearFormDataAction = {
        type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
        url: 'fakeURL'
      };
      const setExpressEligibleAction = {
        isEligibleForExpressCheckout: false,
        type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT
      };

      return store
        .dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false, 'fakeURL', 2))
        .then(() => {
          const actions = store.getActions();

          expect(actions[3]).to.deep.equal(clearFormDataAction);
          expect(actions[4]).to.deep.equal(setExpressEligibleAction);
        });
    });

    it('should set isEligibleForExpressCheckout false when fetch user credit cards and passengers fail', () => {
      const creditCardsResponse = { savedCreditCards: 'savedCreditCards' };
      const passengerDetailsPageResponse = { passengerDetailsPage: 'passengerDetailsPage' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedExpressCheckoutAction = {
        type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
        isEligibleForExpressCheckout: false
      };

      return store.dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut(false)).then(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedExpressCheckoutAction);
      });
    });

    it('should create actions when fetch either user credit cards or passengers failed', () => {
      const creditCardsResponse = { savedCreditCards: 'savedCreditCards' };
      const passengerDetailsPageResponse = { passengerDetailsPageError: 'passengerDetailsPageError' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q.reject(passengerDetailsPageResponse));

      const expectedActions = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO,
          isFetching: true
        },
        {
          isEligibleForExpressCheckout: false,
          type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED,
          error: { ...passengerDetailsPageResponse },
          isFetching: false
        }
      ];

      return store.dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut()).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should use custom error handler if ghost card error is received', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const ghostCardFailureResponse = {
        responseJSON: {
          code: 400307630,
          message: 'Mock ghost card error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(ghostCardFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCCsAndPassengerInfoWithExpressCheckOut()).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...ghostCardFailureResponse, errorHandler }
        });
      });
    });
  });

  context('get credit cards and passenger information', () => {
    const responseJSON = {
      code: ERROR_GHOST_CARD_EXPIRED,
      message: 'Mock ghost card error message'
    };

    it('should create actions when fetch user credit cards and passengers success', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          primaryCard: {
            savedCreditCardId: 'someCardID'
          }
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedActions = [
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO
        },
        {
          isFetching: false,
          passengerDetailsPageResponse,
          paymentSavedCreditCardsPage: { primaryCard: { savedCreditCardId: 'someCardID' } },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
          passengerDetailsPage: { dateOfBirth: '1990-02-03' },
          isInternationalBooking: false
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
          url: 'fakeURL'
        },
        {
          paymentInfo: {
            selectedCardId: 'someCardID'
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
        }
      ];

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should not clear form data by url if passenger url empty', () => {
      const creditCardsResponse = {
        paymentSavedCreditCardsPage: {
          primaryCard: {
            savedCreditCardId: 'someCardID'
          }
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage: { dateOfBirth: '1990-02-03' } };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      const expectedActions = [
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO
        },
        {
          isFetching: false,
          passengerDetailsPageResponse,
          paymentSavedCreditCardsPage: { primaryCard: { savedCreditCardId: 'someCardID' } },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
          passengerDetailsPage: { dateOfBirth: '1990-02-03' },
          isInternationalBooking: false
        },
        {
          paymentInfo: {
            selectedCardId: 'someCardID'
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO
        }
      ];

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should reset payment info when fetch user credit cards and passengers fail', () => {
      const creditCardsResponse = { savedCreditCards: 'savedCreditCards' };
      const passengerDetailsPageResponse = { passengerDetailsPage: 'passengerDetailsPage' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject(creditCardsResponse));
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false, 'fakeURL')).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO
          },
          {
            error: {
              savedCreditCards: 'savedCreditCards'
            },
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED
          }
        ]);
      });
    });

    it('should dispatch push for web users', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject({ responseJSON }));
      sinon.stub(OAuthApi, 'grantLeisureToken');
      OAuthApi.grantLeisureToken.returns(Q.resolve({}));

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const actions = store.getActions();
        const { errorHandler } = actions[2].error;
        const expectedActions = [
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO,
            isFetching: true
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED,
            isFetching: false,
            error: {
              responseJSON,
              errorHandler: sinon.stub(store.getActions()[2].error, 'errorHandler')
            }
          },
          {
            isFetching: true,
            type: 'ACCOUNT__GRANT_LEISURE_TOKEN'
          },
          {
            payload: { args: [airBookingRoutes['index'].canonicalPath], method: 'push' },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        errorHandler();
        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch exit webView for native apps', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };
      const mockedStore = mockStore({
        app: {
          webView: {
            isWebView: true
          }
        }
      });

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject({ responseJSON }));
      const exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView').returns({ type: 'action' });

      return mockedStore.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const actions = mockedStore.getActions();

        const { errorHandler } = actions[2].error;

        errorHandler();
        expect(exitWebViewStub).to.have.been.called;
      });
    });

    it('should use custom error handler if ghost card error is received', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const ghostCardFailureResponse = { responseJSON };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(ghostCardFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...ghostCardFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if IRN error is received', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_INTERNAL_REFERENCE_NUMBER_REQUIRED,
          message: 'Mock irn error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if corporate promo token is expired', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
          message: 'Mock promo token error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if corporate promo token is invalid', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID,
          message: 'Mock promo token error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if traveler not associated in passenger info call', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
          message: 'Mock traveler not associated error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if traveler not associated in payment options call', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
          message: 'Mock traveler not associated error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });

    it('should use custom error handler if CID is not available', () => {
      const passengerDetailsPage = {
        dateOfBirth: '1990-02-03',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender'
      };
      const irnFailureResponse = {
        responseJSON: {
          code: ERROR_CID_NOT_AVAILABLE,
          message: 'Mock CID error message'
        }
      };
      const passengerDetailsPageResponse = { passengerDetailsPage };

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(irnFailureResponse);

      return store.dispatch(AirBookingActions.fetchSavedCreditCardsAndPassengerInfo(false)).then(() => {
        const errorHandler = sinon.stub(store.getActions()[2].error, 'errorHandler');

        expect(store.getActions()[2]).to.deep.equal({
          type: 'AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED',
          isFetching: false,
          error: { ...irnFailureResponse, errorHandler }
        });
      });
    });
  });

  context('transitionToShoppingLandingPage', () => {
    it('should update search request and transition to air booking landing page', () => {
      const { departureDate, returnDate, numberOfAdults, numberOfLapInfants = 0, ...rest } = searchRequest;
      const expectedActions = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
          formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
          url: '/',
          fieldValues: {
            departureAndReturnDate: {
              departureDate,
              returnDate,
              isDateChanged: true
            },
            numberOfAdults,
            ...rest
          }
        },
        {
          passengerCount: {
            lapChildCount: numberOfLapInfants,
            adultCount: numberOfAdults,
            valueUpdated: true
          },
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/air/booking?clearFormData=false'],
            method: 'push'
          }
        }
      ];

      store.dispatch(AirBookingActions.transitionToShoppingLandingPage(searchRequest));

      expect(store.getActions()).be.deep.equal(expectedActions);
    });
  });

  context('transitionToSelectCompanyPage', () => {
    it('should transition to select company page', () => {
      const expectedActions = [
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/air/booking/select-company?CLK=swabizomnitoggle'],
            method: 'push'
          }
        }
      ];

      store.dispatch(AirBookingActions.transitionToSelectCompanyPage());

      expect(store.getActions()).be.deep.equal(expectedActions);
    });

    it('should fire the analytics satellite event', () => {
      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
      store.dispatch(AirBookingActions.transitionToSelectCompanyPage());

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('choose company');
    });
  });

  context('deleteCurrentSearchRequest', () => {
    beforeEach(() => {
      sinon.stub(storeModule, 'set');
      sinon.stub(storeModule, 'get').returns(['searchRequest1', 'searchRequest2', 'searchRequest3']);
      store.dispatch(AirBookingActions.deleteCurrentSearchRequest(1));
    });

    it('should delete current search request in local storage', () => {
      expect(storeModule.set).to.have.been.calledWith('ShoppingSearchHistoryStore::searchRequests', [
        'searchRequest1',
        'searchRequest3'
      ]);
    });

    it('should update recent search page state', () => {
      expect(store.getActions()).to.deep.equal([
        {
          searches: ['searchRequest1', 'searchRequest3'],
          type: AirBookingActionTypes.AIR_BOOKING__DELETE_CURRENT_SEARCH_REQUEST
        }
      ]);
    });
  });

  context('resetAirBookingFlowData', () => {
    it('should reset air booking flow data', () => {
      store.dispatch(AirBookingActions.resetAirBookingFlowData());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA
        }
      ]);
    });
  });

  context('gotoFirstPassengerPage', () => {
    it('should go to the first passenger page when user continue form pricing page', () => {
      store.dispatch(
        AirBookingActions.gotoFirstPassengerPage({
          searchRequest,
          path: '/air/booking/passenger/0'
        })
      );

      expect(store.getActions()).to.deep.equal([
        {
          selected: false,
          type: 'SPECIAL_ASSISTANCE_SELECTED'
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
          searchRequest,
          chaseCardHolder: undefined
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/air/booking/passenger/0'],
            method: 'push'
          }
        }
      ]);
    });
  });

  context('generatePassengerPageInfo', () => {
    it('should generate the passenger infos', () => {
      store.dispatch(
        AirBookingActions.generatePassengerPageInfo({
          searchRequest
        })
      );

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
          searchRequest,
          chaseCardHolder: undefined
        }
      ]);
    });
  });

  context('purchaseFlight', () => {
    let purchaseFlightParams;

    beforeEach(() => {
      purchaseFlightParams = new PurchaseFlightParamsBuilder().build();
      sinon.stub(FlightBookingApi, 'purchaseFlight');
    });

    it('should remove PayPal data in session storage', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      const removePayPalDataStub = sinon.stub(storeModule.session, 'remove');

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(removePayPalDataStub).to.have.been.called;
      });
    });

    it('should disable navigation controls when purchase flight has been called', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
          isEnabled: false
        });
      });
    });

    it('should enable navigation controls when purchase flight has completed', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
          isEnabled: false
        });
        expect(actions[4]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/air/booking/confirmation.html'],
            method: 'push'
          }
        });
        expect(actions[5]).to.deep.equal({
          type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
          isEnabled: true
        });
      });
    });

    it('should enable navigation controls if purchase flight fails', () => {
      FlightBookingApi.purchaseFlight.returns(Q.reject('error'));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
          isEnabled: false
        });
        expect(actions[2]).to.deep.equal({
          type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
          isEnabled: true
        });
        expect(actions[4]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED,
          error: 'error',
          isFetching: false
        });
      });
    });

    it('should create FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS when purchase flight has been done', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[3]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
          response: {
            confirmationResponse: 'confirmationResponse'
          },
          isFetching: false
        });
      });
    });

    it('should create SET_FLOW_STATUS as completed when purchase flight has been done', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.equal({
          type: FlowStatusActionTypes.SET_FLOW_STATUS,
          flowName: 'airBooking',
          status: 'completed'
        });
      });
    });

    it('should create push confirmation action when purchase flight has been done', () => {
      FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[4]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/air/booking/confirmation.html'],
            method: 'push'
          }
        });
      });
    });

    it('should play haptic feedback when purchase succeeds', () => {
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      FlightBookingApi.purchaseFlight.resolves({ confirmationResponse: 'confirmationResponse' });

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(playHapticFeedbackStub).to.have.been.called;
      });
    });

    it('should create FETCH_BOOKING_CONFIRMATION_PAGE_FAILED when purchase flight failed', () => {
      FlightBookingApi.purchaseFlight.returns(Q.reject('error'));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[1]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
          isFetching: true
        });
        expect(actions[4]).to.deep.equal({
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED,
          error: 'error',
          isFetching: false
        });
      });
    });

    it('should delete chase session id when purchase with chase card successfully', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().withChaseCreditCard().build();
      const resetChaseDataStub = sinon.stub(ChaseActions, 'resetChaseData');

      FlightBookingApi.purchaseFlight.returns(Promise.resolve({ confirmationResponse: 'confirmationResponse' }));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(resetChaseDataStub).to.have.been.called;
      });
    });

    it('should show chase error dialog if purchase fail due to chase', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().withChaseCreditCard().build();

      FlightBookingApi.purchaseFlight.returns(
        Q.reject({
          code: 404519017,
          message: 'SessionId not found',
          messageKey: 'ERROR__CHASE__SESSION_ID__NOT_FOUND',
          httpStatusCode: 'NOT_FOUND',
          requestId: 'no-exp-id:m-YnAjdrSfaSm1nVHkHCRA:unknown',
          infoList: [
            {
              key: 'message',
              value: 'SessionId not found'
            }
          ]
        })
      );

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const showDialogAction = store.getActions()[4];
        const apiFetchingFailedAction = store.getActions()[5];

        expect(showDialogAction).to.contain({
          type: DialogActionTypes.TOGGLE_DIALOG,
          isShowDialog: true
        });
        expect(showDialogAction.options).to.includes({
          name: 'chase-payment-failure',
          className: 'check-our-work-dialog',
          message:
            'Please use a different form of payment to complete your booking. Your Southwest Rapid Rewards® Credit Card will arrive in your mail shortly.'
        });
        expect(apiFetchingFailedAction).to.deep.equal({
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED,
          error: {
            $customized: true,
            code: 404519017,
            httpStatusCode: 'NOT_FOUND',
            infoList: [
              {
                key: 'message',
                value: 'SessionId not found'
              }
            ],
            message: 'SessionId not found',
            messageKey: 'ERROR__CHASE__SESSION_ID__NOT_FOUND',
            requestId: 'no-exp-id:m-YnAjdrSfaSm1nVHkHCRA:unknown'
          }
        });
      });
    });

    it('should show AFP error if purchase failed and payment method is apple pay', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().withApplePayCard().build();

      FlightBookingApi.purchaseFlight.returns(Q.reject('error'));

      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const afpIntegrationFailed = store.getActions()[4];
        const apiFetchingFailedAction = store.getActions()[6];

        expect(toChapiAfpErrorLogStub).to.have.been.called;
        expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
        expect(afpIntegrationFailed).to.deep.equal({
          popUpError: 'error',
          type: SharedActionTypes.SHARED__TRIGGER_ERROR_POP_UP
        });

        expect(apiFetchingFailedAction).to.deep.equal({
          isFetching: false,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED
        });
      });
    });

    it('should show AFP error if purchase failed and payment method is uplift and message is available', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().withUpliftCard().build();
      const error = {
        responseJSON: {
          message: 'message'
        }
      };

      FlightBookingApi.purchaseFlight.returns(Q.reject(error));

      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(toChapiAfpErrorLogStub).to.have.been.called;
        expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
        expect(store.getActions()).to.deep.equal([
          {
            isEnabled: false,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE
          },
          {
            isEnabled: true,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            fieldName: 'securityCode',
            formId: 'PURCHASE_SUMMARY_FORM',
            type: 'UPDATE_FORM_FIELD_DATA_VALUE',
            url: '/',
            value: ''
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR_SUCCESS
          },
          {
            isFetching: false,
            error,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
          }
        ]);
      });
    });

    it('should not send error action if purchase failed and payment method is uplift and message is not available', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().withUpliftCard().build();
      const error = { error: 'error' };

      FlightBookingApi.purchaseFlight.returns(Q.reject(error));

      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(toChapiAfpErrorLogStub).to.have.been.called;
        expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
        expect(store.getActions()).to.deep.equal([
          {
            isEnabled: false,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE
          },
          {
            isEnabled: true,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            fieldName: 'securityCode',
            formId: 'PURCHASE_SUMMARY_FORM',
            type: 'UPDATE_FORM_FIELD_DATA_VALUE',
            url: '/',
            value: ''
          },
          {
            isFetching: false,
            error,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
          }
        ]);
      });
    });

    it('should clear CVV when purchase failed', () => {
      FlightBookingApi.purchaseFlight.returns(Q.reject('error'));

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = store.getActions();

        expect(actions[3]).to.deep.equal({
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          fieldName: 'securityCode',
          formId: 'PURCHASE_SUMMARY_FORM',
          url: '/',
          value: ''
        });
      });
    });

    context('when custom errors occur', () => {
      let expectedActions;

      beforeEach(() => {
        expectedActions = [
          {
            isEnabled: false,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE
          },
          {
            isEnabled: true,
            type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
          },
          {
            fieldName: 'securityCode',
            formId: 'PURCHASE_SUMMARY_FORM',
            type: 'UPDATE_FORM_FIELD_DATA_VALUE',
            url: '/',
            value: ''
          },
          {
            error: {},
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED
          }
        ];
      });

      it('should handle CID not available error with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_CID_NOT_AVAILABLE,
              message: 'Mock CID not available error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_CID_NOT_AVAILABLE,
              message: 'Mock CID not available error message'
            }
          };

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle traveler not associated error (irn origin) with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
              message: 'Mock traveler not associated error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_TRAVELER_NOT_ASSOCIATED_IRN_ORIGIN,
              message: 'Mock traveler not associated error message'
            }
          };
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle traveler not associated error (ghost card origin) with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
              message: 'Mock traveler not associated error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_TRAVELER_NOT_ASSOCIATED_GHOST_CARD_ORIGIN,
              message: 'Mock traveler not associated error message'
            }
          };
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle expired promo token error with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
              message: 'Mock expired promo token error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_EXPIRED,
              message: 'Mock expired promo token error message'
            }
          };

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle invalid promo token error with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID,
              message: 'Mock invalid promo token error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_VALIDATION_CORPORATE_PROMO_TOKEN_INVALID,
              message: 'Mock invalid promo token error message'
            }
          };

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle changed promo token from shopping to purchase error with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_PROMO_TOKEN_CHANGED_FROM_SHOPPING_TO_PURCHASE,
              message: 'Mock changed promo token error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_PROMO_TOKEN_CHANGED_FROM_SHOPPING_TO_PURCHASE,
              message: 'Mock changed promo token error message'
            }
          };

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });

      it('should handle changed promo token from shopping to purchase error with customized handler', () => {
        FlightBookingApi.purchaseFlight.returns(
          Q.reject({
            responseJSON: {
              code: ERROR_PROMO_TOKEN_EXPIRED_ON_PURCHASE,
              message: 'Mock promo token expired on purchase page error message'
            }
          })
        );

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expectedActions[4].error = {
            errorHandler: sinon.stub(store.getActions()[4].error, 'errorHandler'),
            responseJSON: {
              code: ERROR_PROMO_TOKEN_EXPIRED_ON_PURCHASE,
              message: 'Mock promo token expired on purchase page error message'
            }
          };

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
      });
    });

    context('authenticate purchase', () => {
      it('should purchase flight with authentication when user logged in', () => {
        FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams, true)).then(() => {
          expect(FlightBookingApi.purchaseFlight.args[0][1]).to.be.true;
        });
      });
    });

    context('warm state express checkout', () => {
      let transformToPurchaseRequestStub;

      beforeEach(() => {
        transformToPurchaseRequestStub = sinon.stub(FlightPurchaseRequestTransformer, 'transformToPurchaseRequest');
      });

      it('should call FlightBookingApi and transformToPurchaseRequest with isWarmStateExpressCheckout as true', () => {
        FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams, true, true)).then(() => {
          expect(FlightBookingApi.purchaseFlight.args[0][2]).to.be.true;
          expect(transformToPurchaseRequestStub.args[0][1]).to.be.true;
        });
      });

      it('should call FlightBookingApi and transformToPurchaseRequest with isWarmStateExpressCheckout as true', () => {
        FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams, true, false)).then(() => {
          expect(FlightBookingApi.purchaseFlight.args[0][2]).to.be.false;
          expect(transformToPurchaseRequestStub.args[0][1]).to.be.false;
        });
      });
    });

    context('early bird failed', () => {
      it('should open dialog when early bird failed', async () => {
        const failedEarlyBird = { recordLocator: 'PNR123', firstName: 'passenger', lastName: 'test' };

        FlightBookingApi.purchaseFlight.returns(Q({ flightConfirmationPage: { failedEarlyBird } }));

        const fakeShowEarlybirdFailedDialogAction = { type: 'fakeShowEarlybirdFailedDialogAction' };
        const showEarlybirdFailedDialogActionStub = sinon
          .stub(EarlyBirdActions, 'showEarlybirdFailedDialog')
          .returns(fakeShowEarlybirdFailedDialogAction);

        await store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams));

        expect(store.getActions()[5]).to.deep.equal(fakeShowEarlybirdFailedDialogAction);
        expect(showEarlybirdFailedDialogActionStub).to.have.been.calledWith(failedEarlyBird);
      });
    });

    describe('isApplePay', () => {
      let initiateVoidTransactionStub;
      let isSessionTimeoutErrorStub;
      let purchaseFlightParams;

      beforeEach(() => {
        store = mockStore({
          app: {
            toggles: {
              CEPTOR_VOID_API: true
            }
          }
        });
        initiateVoidTransactionStub = sinon.stub(AlternativeFormsOfPaymentActions, 'initiateVoidTransaction');
        purchaseFlightParams = new PurchaseFlightParamsBuilder().withApplePayCard().build();
        isSessionTimeoutErrorStub = sinon.stub(errorCodesHelper, 'isSessionTimeoutError');
        sinon.stub(LoggingApi, 'sendErrorLog');
        initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
        FlightBookingApi.purchaseFlight.returns(Promise.reject({ responseJSON: { code: 400310764 } }));
      });

      it('should call void transaction if purchase failed with applePayErrorCode and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(false);

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expect(initiateVoidTransactionStub).to.have.been.called;
          const actions = store.getActions();

          expect(actions[4]).to.deep.equal({
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
          });
        });
      });

      it('should not dispatch alternativeFormsOfPaymentFailed if purchase failed with warm state and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(true);

        return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
          expect(initiateVoidTransactionStub).to.not.have.been.called;
          const actions = store.getActions();

          expect(actions).to.deep.equal([
            {
              isEnabled: false,
              type: 'WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS'
            },
            {
              isFetching: true,
              type: 'AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE'
            },
            {
              isEnabled: true,
              type: 'WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS'
            },
            {
              fieldName: 'securityCode',
              formId: 'PURCHASE_SUMMARY_FORM',
              type: 'UPDATE_FORM_FIELD_DATA_VALUE',
              url: '/',
              value: ''
            },
            {
              isFetching: false,
              type: 'AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_FAILED'
            }
          ]);
        });
      });
    });

    context('isUplift', () => {
      let confirmAlternativeFormsOfPaymentStub;

      beforeEach(() => {
        confirmAlternativeFormsOfPaymentStub = sinon.stub(
          AlternativeFormsOfPaymentActions,
          'confirmAlternativeFormOfPayment'
        );
      });

      it('should dispatch confirmAlternativeFormOfPayment action', async () => {
        FlightBookingApi.purchaseFlight.returns(
          Q({
            flightConfirmationPage: {
              pnrs: [
                {
                  recordLocator: 'recordLocator'
                }
              ]
            }
          })
        );
        const purchaseFlightParams = new PurchaseFlightParamsBuilder().withUpliftCard().build();

        const fakeConfirmAfpAction = { type: 'fakeConfirmAlternativeFormOfPayment' };

        confirmAlternativeFormsOfPaymentStub.returns(fakeConfirmAfpAction);

        await store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams));

        expect(store.getActions()[5]).to.deep.equal(fakeConfirmAfpAction);
        expect(confirmAlternativeFormsOfPaymentStub).to.have.been.calledWith('recordLocator');
      });

      it('should not dispatch confirmAlternativeFormOfPayment action when record locator missing', async () => {
        FlightBookingApi.purchaseFlight.returns(Q({ flightConfirmationPage: 'confirmationPage' }));
        const purchaseFlightParams = new PurchaseFlightParamsBuilder().withUpliftCard().build();

        const fakeConfirmAfpAction = { type: 'fakeConfirmAlternativeFormOfPayment' };

        confirmAlternativeFormsOfPaymentStub.returns(fakeConfirmAfpAction);

        await store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams));

        expect(confirmAlternativeFormsOfPaymentStub).to.not.have.been.called;
      });
    });

    context('update saved contact method', () => {
      beforeEach(() => {
        FlightBookingApi.purchaseFlight.returns(Q({ confirmationResponse: 'confirmationResponse' }));
      });

      context('international', () => {
        it('should update saved contact method when receive notifications and turn on save contact method', () => {
          purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder()
            .withInternational('false')
            .withSaveContactMethod('true')
            .build();

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[5]).to.deep.equal({
              type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            });
          });
        });

        it('should not update saved contact method when receive notifications and turn off save contact method', () => {
          purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder()
            .withInternational('true')
            .withSaveContactMethod('false')
            .build();

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[5]).to.not.deep.equal({
              type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            });
          });
        });

        it('should not update saved contact method when decline notifications and turn on save contact method', () => {
          purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder()
            .withInternational('true')
            .withSaveContactMethod('true')
            .build();

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[5]).to.not.deep.equal({
              type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            });
          });
        });
      });

      context('domestic', () => {
        it('should update saved contact method when turn on save contact method', () => {
          purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder().withSaveContactMethod('true').build();

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[5]).to.deep.equal({
              type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            });
          });
        });

        it('should not update saved contact method when turn off save contact method', () => {
          purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder().withSaveContactMethod('true').build();

          return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
            const actions = store.getActions();

            expect(actions[5]).to.deep.equal({
              type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            });
          });
        });
      });
    });

    it('should open custom Token Expired popup when error code 400310756', () => {
      FlightBookingApi.purchaseFlight.rejects({ responseJSON: { code: 400310756 } });

      return store.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        expect(store.getActions()[4]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });
    });

    it('should exit webView when token expired popup is closed in a web view', () => {
      const exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView').returns({ type: 'action' });
      const mockedStore = mockStore({
        app: {
          webView: {
            isWebView: true
          }
        }
      });

      sinon.stub(DialogActions, 'hideDialog').callsFake(() => () => ({
        then: (resolve) => {
          resolve();
        }
      }));
      FlightBookingApi.purchaseFlight.rejects({ responseJSON: { code: 400310756 } });

      return mockedStore.dispatch(AirBookingActions.purchaseFlight(purchaseFlightParams)).then(() => {
        const actions = mockedStore.getActions();
        const errorHandler = actions[4].options.buttons[0].onClick;

        errorHandler();
        expect(exitWebViewStub).to.have.been.called;
      });
    });
  });

  context('contactMethod', () => {
    it('should create UPDATE_CONTACT_METHOD to update contact method info ', () => {
      const contactMethodInfo = new ContactMethodInfoBuilder().build();
      const expectedAction = {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_METHOD,
        info: contactMethodInfo
      };

      store.dispatch(AirBookingActions.updateContactMethod(contactMethodInfo));

      const action = store.getActions()[0];

      expect(action).to.deep.equal(expectedAction);
    });
  });

  context('onSubmitPassengerForm', () => {
    let accountLookupStub;
    let passengerForCheck;
    let passengerInfos;
    let passengerValidationStub;
    let raiseSatelliteEventStub;

    const getSavePassengerActionType = (
      index,
      expectedPath,
      isNewFrequentTraveler = false,
      passengerValidationsSuccess = true
    ) => {
      const passengerInfoWithFrequentTraveler = isNewFrequentTraveler
        ? {
          frequentTravelerId: '',
          frequentTravelerToken: ''
        }
        : {};

      const actionsArray = [
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER,
          index,
          passengerInfo: {
            ...passengerBasicInfo,
            ...passengerInfoWithFrequentTraveler
          }
        },
        {
          payload: {
            args: [expectedPath],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      if (passengerValidationsSuccess) {
        actionsArray.pop();
        actionsArray.push(
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS,
            isFetching: true
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS_SUCCESS,
            response: { response: 'response' },
            isFetching: false
          },
          {
            payload: {
              args: [expectedPath],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        );
      }

      return actionsArray;
    };

    beforeEach(() => {
      accountLookupStub = sinon.stub(AccountsApi, 'accountNumberLookup');
      passengerValidationStub = sinon.stub(FlightBookingApi, 'passengerValidationCall');
      passengerForCheck = passengerBasicInfo;
      passengerInfos = [
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2018-03-22'
        },
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2018-03-22'
        }
      ];
      raiseSatelliteEventStub = sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should dispatch push to next passenger when is not the last passenger', () => {
      accountLookupStub.returns(Q.resolve({}));

      store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 0));
      const action = store.getActions();

      expect(action).to.deep.equal(getSavePassengerActionType(0, '/air/booking/passenger/1', false, false));
    });

    it('should dispatch push to purchase when is the last passenger', async () => {
      accountLookupStub.returns(Q.resolve({}));
      passengerValidationStub.resolves({ response: 'response' });

      await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 1, false));
      const action = store.getActions();

      expect(action).to.deep.equal(getSavePassengerActionType(1, '/air/booking/purchase.html'));
    });

    it('should not dispatch push to purchase page if passenger validation call fails', async () => {
      accountLookupStub.returns(Q.resolve({}));
      passengerValidationStub.rejects({ error: 'error' });

      await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 1, false));
      const action = store.getActions();

      expect(action).to.not.deep.equal(getSavePassengerActionType(1, '/air/booking/purchase.html'));
    });

    it('should not make passenger validation call if passengerValidation does not exist in prices call', async () => {
      accountLookupStub.returns(Q.resolve({}));
      const store = mockStore({
        app: {
          airBooking: {
            flightPricingPage: {},
            passengerInfos: {}
          }
        }
      });

      await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 1, true));

      expect(passengerValidationStub).to.not.have.been.called;
    });

    it('should not make passenger validation call and navigate to purchase page if passengerValidation does not exist in prices call', async () => {
      accountLookupStub.returns(Promise.resolve({}));
      const store = mockStore({
        app: {
          airBooking: {
            flightPricingPage: {},
            passengerInfos: {}
          }
        }
      });

      await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 1));
      const action = store.getActions();

      expect(passengerValidationStub).to.not.have.been.called;
      expect(action[1]).to.deep.equal({
        payload: {
          args: ['/air/booking/purchase.html'],
          method: 'push'
        },
        type: '@@router/CALL_HISTORY_METHOD'
      });
    });

    it('should save and update frequent traveler', async () => {
      accountLookupStub.returns(Promise.resolve({}));
      passengerValidationStub.resolves({ response: 'response' });

      passengerForCheck = {
        ...passengerForCheck,
        frequentTravelerId: '',
        frequentTravelerToken: ''
      };
      await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, passengerForCheck, 1, false));
      const action = store.getActions();
      const expectedActions = getSavePassengerActionType(1, '/air/booking/purchase.html', true);

      expectedActions.splice(1, 0, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
        paxNumber: 1,
        frequentTravelerId: '',
        frequentTravelerToken: '',
        addFrequentTravelerToggle: false
      });

      expect(passengerValidationStub).to.have.been.called;
      expect(action).to.deep.equal(expectedActions);
    });

    describe('Young traveler dialog', () => {
      beforeEach(() => {
        passengerValidationStub.resolves({ ...getPassengerValidationDetails() });
      });

      it('should dispatch showDialog action when modalDetails is truthy', async () => {
        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(store.getActions()[3]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });

      it('should call showDialog with the arguments', async () => {
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(showDialogStub).to.have.been.called;
        expect(showDialogStub.args[0][0]).toMatchSnapshot();
      });

      it('should dispatch traceYoungTravelerPage on click of hideDialog', async () => {
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        sinon.stub(AnalyticsActions, 'traceYoungTravelerPage').returns({ type: 'FAKE_ANALYTICS_TYPE' });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));
        await showDialogStub.args[0][0].buttons[1].onClick();

        expect(store.getActions()[5]).to.deep.equal({
          type: 'FAKE_ANALYTICS_TYPE'
        });
      });

      it('should dispatch hideDialog action when the first button is clicked', async () => {
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));
        await showDialogStub.args[0][0].buttons[0].onClick();

        expect(store.getActions()[4]).to.contains({
          isShowDialog: false,
          type: 'TOGGLE_DIALOG'
        });
      });

      it('should dispatch hideDialog and push actions when the second button is clicked', async () => {
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));
        await showDialogStub.args[0][0].buttons[1].onClick();

        expect(store.getActions()[4]).to.contains({
          isShowDialog: false,
          type: 'TOGGLE_DIALOG'
        });
        expect(store.getActions()[6]).to.deep.equal({
          payload: {
            args: ['/air/booking/young-traveler'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        });
      });

      it('should dispatch hideDialog and push young traveler edit when the second button is clicked from passenger edit', async () => {
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1, true));
        await showDialogStub.args[0][0].buttons[1].onClick();

        expect(store.getActions()[3]).to.contains({
          isShowDialog: false,
          type: 'TOGGLE_DIALOG'
        });
        expect(store.getActions()[6]).to.deep.equal({
          payload: {
            args: ['/air/booking/young-traveler/edit?clearFormData=false'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        });
      });

      it('should not call showDialog action when modalDetails is falsy', async () => {
        const passengerValidationDetails = { youngTraveler: undefined };
        const showDialogStub = sinon.stub(DialogActions, 'showDialog');

        passengerValidationStub.resolves({ passengerValidationDetails });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(showDialogStub).to.have.not.been.called;
      });

      it('should call clearFormDataById action when modalDetails is falsy and AIR_BOOKING_PARENT_OR_GUARDIAN_FORM form data exists', async () => {
        const clearFormDataByIdStub = sinon.stub(FormDataActions, 'clearFormDataById');
        const store = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: new PricesBuilder().build() }
            },
            formData: {
              AIR_BOOKING_PARENT_OR_GUARDIAN_FORM: 'TestData'
            }
          }
        });

        passengerValidationStub.resolves({ passengerValidationDetails: { youngTraveler: undefined } });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(clearFormDataByIdStub).to.have.been.calledWith(AIR_BOOKING_PARENT_OR_GUARDIAN_FORM);
      });

      it('should dispatch router back when modalDetails is falsy and passenger is from edit flow', async () => {
        const store = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: new PricesBuilder().build() }
            },
            formData: {
              AIR_BOOKING_PARENT_OR_GUARDIAN_FORM: 'TestData'
            }
          }
        });

        passengerValidationStub.resolves({ passengerValidationDetails: { youngTraveler: undefined } });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1, true));

        expect(store.getActions()[4]).to.deep.equal({
          payload: { args: [], method: 'goBack' },
          type: '@@router/CALL_HISTORY_METHOD'
        });
      });

      it('should not call clearFormDataById action when modalDetails is falsy and AIR_BOOKING_PARENT_OR_GUARDIAN_FORM form data does not exist', async () => {
        const clearFormDataByIdStub = sinon.stub(FormDataActions, 'clearFormDataById');
        const store = mockStore({
          app: {
            airBooking: {
              flightPricingPage: { response: new PricesBuilder().build() }
            },
            formData: {}
          }
        });

        passengerValidationStub.resolves({ passengerValidationDetails: { youngTraveler: undefined } });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(clearFormDataByIdStub).to.have.not.been.called;
      });

      it('should dispatch showDialog action correctly when body and buttons are falsy', async () => {
        const { passengerValidationDetails } = getPassengerValidationDetails();

        delete passengerValidationDetails.youngTraveler.modalDetails.body;
        delete passengerValidationDetails.youngTraveler.modalDetails.buttons;

        passengerValidationStub.resolves({ passengerValidationDetails });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(store.getActions()[3]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });

      it('should fire analytics satellite event when young traveler modal is displayed', async () => {
        const { passengerValidationDetails } = getPassengerValidationDetails();

        passengerValidationStub.resolves({ passengerValidationDetails });

        await store.dispatch(AirBookingActions.submitPassengerForm(passengerInfos, { ...passengerForCheck }, 1));

        expect(raiseSatelliteEventStub).to.have.been.calledWith('squid', {
          page_description: 'modal: young traveler'
        });
      });
    });
  });

  context('updatePassengerWithSpecialAssistance', () => {
    let specialAssistanceFormData;

    beforeEach(() => {
      specialAssistanceFormData = {
        BLIND: false,
        DEAF: false,
        COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
        ASSISTANCE_ANIMAL: false,
        WHEELCHAIR_ASSISTANCE: 'AISLE_CHAIR',
        WHEELCHAIR_STOWAGE: 'DRY_CELL_BATTERY_WHEELCHAIR',
        PEANUT_DUST_ALLERGY: false,
        PORTABLE_OXYGEN_CONCENTRATOR: false
      };
    });

    it('should dispatch update special assistance and back to previous page if form data is passed', () => {
      store.dispatch(AirBookingActions.updatePassengerWithSpecialAssistance(specialAssistanceFormData, 0));

      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SPECIAL_ASSISTANCE,
          index: 0,
          specialAssistanceFormData: {
            BLIND: false,
            DEAF: false,
            COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
            ASSISTANCE_ANIMAL: false,
            WHEELCHAIR_ASSISTANCE: 'AISLE_CHAIR',
            WHEELCHAIR_STOWAGE: 'DRY_CELL_BATTERY_WHEELCHAIR',
            PEANUT_DUST_ALLERGY: false,
            PORTABLE_OXYGEN_CONCENTRATOR: false
          }
        },
        {
          payload: {
            args: [],
            method: 'goBack'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });
    it('should not dispatch update special assistance if no form data is passed', () => {
      store.dispatch(AirBookingActions.updatePassengerWithSpecialAssistance(null, 0));

      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          payload: {
            args: [],
            method: 'goBack'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });
  });

  context('checkRapidRewardAndUpdatePassenger', () => {
    let passengerForCheck;
    let passengerInfos;

    beforeEach(() => {
      passengerForCheck = passengerBasicInfo;
      passengerInfos = [
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2018-03-22'
        }
      ];
    });

    it('should dispatch rapid reward check success and back to previous page', () => {
      store.dispatch(AirBookingActions.checkRapidRewardAndUpdatePassenger(passengerInfos, passengerForCheck, 0));

      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_PASSENGER,
          index: 0,
          passengerInfo: passengerBasicInfo
        },
        {
          payload: {
            args: [],
            method: 'goBack'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });
  });

  context('updateFrequentTraveler', () => {
    let paxNumber;
    let frequentTravelerId;
    let frequentTravelerToken;
    let addFrequentTravelerToggle;

    beforeEach(() => {
      paxNumber = 0;
      frequentTravelerId = 'ACCOUNT';
      frequentTravelerToken = 'Test token';
      addFrequentTravelerToggle = true;
    });

    it('should dispatch updateFrequentTravelerSelection', () => {
      store.dispatch(
        AirBookingActions.updateFrequentTravelerSelection({
          paxNumber,
          frequentTravelerId,
          frequentTravelerToken,
          addFrequentTravelerToggle
        })
      );
      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID,
          paxNumber: 0,
          frequentTravelerId: 'ACCOUNT',
          frequentTravelerToken: 'Test token',
          addFrequentTravelerToggle: true
        }
      ]);
    });

    it('should dispatch cleanUpFrequentTravelerSelected', () => {
      store.dispatch(AirBookingActions.cleanUpFrequentTravelerSelected());
      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS
        }
      ]);
    });

    it('should dispatch removeFrequentTravelerSelectedByPaxNumber', () => {
      store.dispatch(AirBookingActions.removeFrequentTravelerSelectedByPaxNumber(0));
      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__REMOVE_SELECTED_FREQUENT_TRAVELER_PAX_ID,
          paxNumber: 0
        }
      ]);
    });

    it('should dispatch updatePassengerByClearingSpecialAssistance', () => {
      store.dispatch(AirBookingActions.updatePassengerByClearingSpecialAssistance(0));
      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SPECIAL_ASSISTANCE,
          index: 0
        }
      ]);
    });
  });

  context('express checkout', () => {
    it('should generate correct action for set express checkout eligible', () => {
      store.dispatch(AirBookingActions.setExpressCheckoutEligible(false));
      const expectedActions = {
        type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
        isEligibleForExpressCheckout: false
      };

      expect(store.getActions()[0]).to.deep.equal(expectedActions);
    });

    it('should generate correct action for is using express checkout', () => {
      store.dispatch(AirBookingActions.setIsExpressCheckout(true));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT,
          isExpressCheckout: true
        }
      ]);
    });
  });

  it('should reset passenger info, payment info, credit cards, contact info and isEligibleForExpressCheckout when continue as guest from session expired journey', () => {
    const expectedActions = [
      {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER
      },
      {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO
      },
      {
        type: CreditCardActionTypes.CREDIT_CARD__RESET_SAVED_CREDIT_CARDS
      },
      {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_CONTACT_METHOD
      },
      {
        type: AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT,
        isEligibleForExpressCheckout: true
      },
      {
        type: FormDataActionTypes.RESET_FORM_DATA
      },
      {
        type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS
      },
      {
        type: AirBookingActionTypes.AIR_BOOKING__CLEAR_ACCOUNT_INFO
      }
    ];

    store.dispatch(AirBookingActions.resetAirBookingPurchaseData());

    const action = store.getActions();

    expect(action).to.deep.equal(expectedActions);
  });

  context('resumeAfterLogin', () => {
    it('should generate correct action', () => {
      store.dispatch(AirBookingActions.resumeAfterLogin(false));
      const expectedActions = {
        type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
        shouldResume: false
      };

      expect(store.getActions()[0]).to.deep.equal(expectedActions);
    });
  });

  context('reset search request', () => {
    it('should reset search request', () => {
      store.dispatch(AirBookingActions.resetFlightSearchRequest());

      expect(store.getActions()[0]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_SEARCH_REQUEST
      });
    });
  });

  context('save payment info on payment edit page', () => {
    it('should save payment info and back to previous page', () => {
      const mockPaymentInfo = { addressLine1: 'addressLine1' };

      store.dispatch(AirBookingActions.savePaymentInfoAndBackToPreviousPage(mockPaymentInfo));
      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO,
          paymentInfo: mockPaymentInfo
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'goBack',
            args: []
          }
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
          formId: 'AIRBOOKING_PURCHASE_SUMMARY_FORM',
          fieldName: 'securityCode',
          url: '/',
          value: ''
        }
      ]);
    });
  });

  context('saveTravelFundsBillingAddress', () => {
    it('should save travel funds address information to redux', () => {
      store.dispatch(AirBookingActions.saveTravelFundsBillingAddress({ contact: 'info' }));
      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_TRAVEL_FUNDS_ADDRESS,
          travelFundsAddress: { contact: 'info' }
        }
      ]);
    });
  });

  context('getLowFareCalendar', () => {
    let searchRequest;
    let storeSetStub;
    let isInitialSearch;
    let nextPath;

    beforeEach(() => {
      searchRequest = new SearchForFlightsRequestBuilder().withLowFareCalendar(true).build();
      storeSetStub = sinon.stub(storeModule, 'set');
      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    });
    afterEach(() => {
      sinon.restore();
    });
    context('initial page load (called from shopping landing page)', () => {
      beforeEach(() => {
        isInitialSearch = true;
        nextPath = 'the/next/page';
      });
      it('should fetch Low Fare Calendar data when API succeeds and save recent search', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves({ response: 'response' });
        const expectedActions = [
          {
            flowName: 'airBooking',
            status: 'initial',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR,
            isFetching: true
          },
          {
            type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST',
            searchRequest: {
              origin: 'ATL',
              destination: 'AUS',
              tripType: 'roundTrip',
              departureDate: '2015-11-10',
              returnDate: '2015-12-10',
              numberOfAdults: 1,
              numberOfSeniors: 0,
              numberOfLapInfants: 0,
              currencyType: 'USD',
              isRoundTrip: true,
              useLowFareCalendar: true,
              isInitialSearch: true
            }
          },
          {
            type: 'UPDATE_FORM_DATA_VALUE',
            formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
            fieldValues: {
              departureAndReturnDate: {
                departureDate: '2015-11-10',
                isDateChanged: true,
                returnDate: '2015-12-10'
              },
              origin: 'ATL',
              destination: 'AUS',
              tripType: 'roundTrip',
              numberOfAdults: 1,
              numberOfSeniors: 0,
              currencyType: 'USD',
              isRoundTrip: true,
              useLowFareCalendar: true,
              isInitialSearch: true
            },
            url: '/'
          },
          {
            passengerCount: {
              lapChildCount: 0,
              adultCount: searchRequest.numberOfAdults,
              valueUpdated: true
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
          },
          {
            flowName: 'airBooking',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE',
            date: undefined
          },
          {
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE',
            date: undefined
          },
          {
            isFetching: false,
            response: {
              response: 'response'
            },
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS
          },
          {
            payload: {
              args: ['the/next/page'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));

        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(storeSetStub).to.have.been.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
      });

      it('should not fetch Low Fare Calendar data or save searchRequest when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));

        expect(storeSetStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            flowName: 'airBooking',
            status: 'initial',
            type: 'SET_FLOW_STATUS'
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR,
            isFetching: true
          },
          {
            isFetching: false,
            error: 'error',
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_FAILED
          }
        ]);
      });
    });

    context('switch $/Pts (called from LFC page)', () => {
      beforeEach(() => {
        isInitialSearch = false;
        nextPath = undefined;
      });
      it('should fetch Low Fare Calendar data when API succeeds and save searchRequest', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves({ response: 'response' });
        const expectedActions = [
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR,
            isFetching: true
          },
          {
            type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST',
            searchRequest
          },
          {
            type: 'UPDATE_FORM_DATA_VALUE',
            formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
            fieldValues: {
              departureAndReturnDate: {
                departureDate: '2015-11-10',
                isDateChanged: true,
                returnDate: '2015-12-10'
              },
              origin: 'ATL',
              destination: 'AUS',
              tripType: 'roundTrip',
              numberOfAdults: 1,
              numberOfSeniors: 0,
              currencyType: 'USD',
              isRoundTrip: true,
              useLowFareCalendar: true,
              isInitialSearch: true
            },
            url: '/'
          },
          {
            passengerCount: {
              lapChildCount: 0,
              adultCount: searchRequest.numberOfAdults,
              valueUpdated: true
            },
            type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT
          },
          {
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE',
            date: undefined
          },
          {
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE',
            date: undefined
          },
          {
            isFetching: false,
            response: {
              response: 'response'
            },
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS
          }
        ];

        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));
        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(storeSetStub).to.have.been.calledWith('ShoppingSearchHistoryStore::searchRequests', [searchRequest]);
      });

      it('should not fetch Low Fare Calendar data when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));

        expect(storeSetStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR,
            isFetching: true
          },
          {
            isFetching: false,
            error: 'error',
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_FAILED
          }
        ]);
      });

      context('selected dates', () => {
        it('should set Selected outbound date when roundtrip', async () => {
          sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(lowFareCalendarPageRoundTripResponse);

          await store.dispatch(
            AirBookingActions.getLowFareCalendar(
              { departureDate: '2020-01-25', returnDate: '2020-01-28' },
              nextPath,
              isInitialSearch
            )
          );

          expect(store.getActions()[1]).to.deep.equal({
            type: 'AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST',
            searchRequest: {
              departureDate: '2020-01-25',
              returnDate: '2020-01-28'
            }
          });

          expect(store.getActions()[3]).to.deep.equal({
            type: 'AIR_BOOKING__SAVE_PASSENGER_COUNT',
            passengerCount: {
              lapChildCount: 0,
              adultCount: undefined,
              valueUpdated: true
            }
          });

          expect(store.getActions()[4]).to.deep.equal({
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE',
            date: '2020-01-25'
          });

          expect(store.getActions()[5]).to.deep.equal({
            type: 'AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE',
            date: '2020-01-28'
          });
        });
      });

      it('should fire the analytics satellite event on a successful API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves({ response: 'response' });
        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('Low Fare Calendar');
      });

      it('should not fire the analytics satellite event on an erroneous API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getLowFareCalendar(searchRequest, nextPath, isInitialSearch));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.not.have.been.called;
      });
    });
  });

  context('low fare calendar prev/next', () => {
    let boundPage, error, response;

    beforeEach(() => {
      boundPage = {
        header: { airportInfo: 'DAL - HOU', selectedDate: '2020-01-31' },
        lowFareCalendarDays: [
          {
            date: '2020-01-22',
            lowestPrice: {
              price: { amount: '243.98', currencyCode: 'USD', currencySymbol: '$' },
              pricePointsTax: null
            }
          }
        ],
        _links: {
          previousLowFareCalendarPage: '1stPrevLowFareCalendarPage',
          nextLowFareCalendarPage: '1stNextLowFareCalendarPage'
        }
      };

      response = {
        lowFareCalendarPage: {
          outboundPage: {
            header: { airportInfo: 'DAL - HOU', selectedDate: '2020-01-31' },
            lowFareCalendarDays: [
              {
                date: '2020-02-01',
                lowestPrice: {
                  price: { amount: '243.98', currencyCode: 'USD', currencySymbol: '$' },
                  pricePointsTax: null
                }
              }
            ],
            _links: {
              previousLowFareCalendarPage: '2ndPrevLowFareCalendarPage',
              nextLowFareCalendarPage: '2ndNextLowFareCalendarPage'
            }
          },
          lowFareCalendarAnalytics: 'all the analytics'
        }
      };

      error = 'error';

      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    });

    context('getPrevLowFareCalendarOutboundPage', () => {
      it('should fetch prev outbound Low Fare Calendar data when API succeeds', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarOutboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            response: {
              header: response.lowFareCalendarPage.outboundPage.header,
              lowFareCalendarDays: [
                ...response.lowFareCalendarPage.outboundPage.lowFareCalendarDays,
                ...boundPage.lowFareCalendarDays
              ],
              _links: {
                previousLowFareCalendarPage: '2ndPrevLowFareCalendarPage',
                nextLowFareCalendarPage: '1stNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS'
          }
        ]);
      });

      it('should not fetch prev outbound Low Fare Calendar data when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject(error));
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            error,
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED'
          }
        ]);
      });

      it('should fetch prev outbound Low Fare Calendar data when API succeeds and no more previous fares exists (outboundPage null)', async () => {
        _.set(response, 'lowFareCalendarPage.outboundPage', null);
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarOutboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            response: {
              header: boundPage.header,
              lowFareCalendarDays: [...boundPage.lowFareCalendarDays],
              _links: {
                previousLowFareCalendarPage: null,
                nextLowFareCalendarPage: '1stNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS'
          }
        ]);
      });

      it('should fire the analytics satellite event on a successful API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('Low Fare Calendar');
      });

      it('should fire the analytics satellite event on an erroneous API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.not.have.been.called;
      });
    });

    context('getNextLowFareCalendarOutboundPage', () => {
      it('should fetch prev outbound Low Fare Calendar data when API succeeds', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarOutboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            response: {
              header: response.lowFareCalendarPage.outboundPage.header,
              lowFareCalendarDays: [
                ...boundPage.lowFareCalendarDays,
                ...response.lowFareCalendarPage.outboundPage.lowFareCalendarDays
              ],
              _links: {
                previousLowFareCalendarPage: '1stPrevLowFareCalendarPage',
                nextLowFareCalendarPage: '2ndNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS'
          }
        ]);
      });

      it('should not fetch next outbound Low Fare Calendar data when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject(error));
        await store.dispatch(AirBookingActions.getNextLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            error,
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED'
          }
        ]);
      });

      it('should fetch prev outbound Low Fare Calendar data when API succeeds and no more next fares exists (outboundPage null)', async () => {
        _.set(response, 'lowFareCalendarPage.outboundPage', null);
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarOutboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE'
          },
          {
            response: {
              header: boundPage.header,
              lowFareCalendarDays: [...boundPage.lowFareCalendarDays],
              _links: {
                previousLowFareCalendarPage: '1stPrevLowFareCalendarPage',
                nextLowFareCalendarPage: null
              }
            },
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS'
          }
        ]);
      });

      it('should fire the analytics satellite event on a successful API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('Low Fare Calendar');
      });

      it('should fire the analytics satellite event on an erroneous API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getNextLowFareCalendarOutboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.not.have.been.called;
      });
    });

    context('getPrevLowFareCalendarInboundPage', () => {
      it('should fetch prev inbound Low Fare Calendar data when API succeeds', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarInboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            response: {
              header: response.lowFareCalendarPage.outboundPage.header,
              lowFareCalendarDays: [
                ...response.lowFareCalendarPage.outboundPage.lowFareCalendarDays,
                ...boundPage.lowFareCalendarDays
              ],
              _links: {
                previousLowFareCalendarPage: '2ndPrevLowFareCalendarPage',
                nextLowFareCalendarPage: '1stNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS'
          }
        ]);
      });

      it('should not fetch prev inbound Low Fare Calendar data when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject(error));
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            error,
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED'
          }
        ]);
      });

      it('should fetch prev inbound Low Fare Calendar data when API succeeds and no more prev fares exists (outboundPage null)', async () => {
        _.set(response, 'lowFareCalendarPage.outboundPage', null);
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarInboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            response: {
              header: boundPage.header,
              lowFareCalendarDays: [...boundPage.lowFareCalendarDays],
              _links: {
                previousLowFareCalendarPage: null,
                nextLowFareCalendarPage: '1stNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS'
          }
        ]);
      });

      it('should fire the analytics satellite event on a successful API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('Low Fare Calendar');
      });

      it('should fire the analytics satellite event on an erroneous API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getPrevLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.not.have.been.called;
      });
    });

    context('getNextLowFareCalendarInboundPage', () => {
      it('should fetch next outbound Low Fare Calendar data when API succeeds', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarInboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            response: {
              header: response.lowFareCalendarPage.outboundPage.header,
              lowFareCalendarDays: [
                ...boundPage.lowFareCalendarDays,
                ...response.lowFareCalendarPage.outboundPage.lowFareCalendarDays
              ],
              _links: {
                previousLowFareCalendarPage: '1stPrevLowFareCalendarPage',
                nextLowFareCalendarPage: '2ndNextLowFareCalendarPage'
              }
            },
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS'
          }
        ]);
      });

      it('should not fetch next outbound Low Fare Calendar data when API fails', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject(error));
        await store.dispatch(AirBookingActions.getNextLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            error,
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED'
          }
        ]);
      });

      it('should fetch prev outbound Low Fare Calendar data when API succeeds and no more next fares exist (outboundPage null)', async () => {
        _.set(response, 'lowFareCalendarPage.outboundPage', null);
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarInboundPage(searchRequest, boundPage));

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE'
          },
          {
            response: {
              header: boundPage.header,
              lowFareCalendarDays: [...boundPage.lowFareCalendarDays],
              _links: {
                previousLowFareCalendarPage: '1stPrevLowFareCalendarPage',
                nextLowFareCalendarPage: null
              }
            },
            type: 'AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS'
          },
          {
            lowFareCalendarAnalytics: 'all the analytics',
            type: 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS'
          }
        ]);
      });

      it('should fire the analytics satellite event on a successful API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').resolves(response);
        await store.dispatch(AirBookingActions.getNextLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('Low Fare Calendar');
      });

      it('should fire the analytics satellite event on an erroneous API call', async () => {
        sinon.stub(FlightBookingApi, 'getLowFareCalendar').returns(Q.reject('error'));
        await store.dispatch(AirBookingActions.getNextLowFareCalendarInboundPage(searchRequest, boundPage));
        expect(analyticsEventHelper.raiseSatelliteEvent).to.not.have.been.called;
      });
    });

    context('selectLowFareCalendarOutboundDate', () => {
      it('should set the outbound date for low fare calendar', () => {
        const date = '2020-02-02';

        store.dispatch(AirBookingActions.selectLowFareCalendarOutboundDate(date));

        expect(store.getActions()).to.deep.equal([
          {
            type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE,
            date
          }
        ]);
      });
    });

    context('selectLowFareCalendarInboundDate', () => {
      it('should set the inbound date for low fare calendar', () => {
        const date = '2020-02-02';

        store.dispatch(AirBookingActions.selectLowFareCalendarInboundDate(date));

        expect(store.getActions()).to.deep.equal([
          {
            type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE,
            date
          }
        ]);
      });
    });
  });

  context('loadPricePagePlacements', () => {
    const {
      AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS,
      AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
      AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED
    } = AirBookingActionTypes;

    const segments = ['segment1', 'segment2'];
    const params = { key: 'value' };
    const args = [
      { mbox: PRICING_CHASE_MBOX_ID, params },
      { mbox: PRICE_PROMO_MIDDLE1_MBOX_ID, params }
    ];

    let getTargetParamsStub;
    let getSegmentsStub;
    let getPlacementsStub;
    let shouldCheckPrequalStub;

    beforeEach(() => {
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segments));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(Promise.resolve());
      shouldCheckPrequalStub = sinon.stub(ChaseSelector, 'shouldCheckPrequal');
      getMboxConfig.returns(() => Promise.resolve(args));
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', (done) => {
      getTargetParamsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      store.dispatch(AirBookingActions.loadPricePagePlacements(true));

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.not.have.been.called;
        expect(getPlacementsStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
      }, done);
    });

    it('should dispatch failed action when getSegments throws unhandled exception', (done) => {
      shouldCheckPrequalStub.returns(sinon.stub().returns(false));
      getSegmentsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      store.dispatch(AirBookingActions.loadPricePagePlacements(true));

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(getPlacementsStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
      }, done);
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', (done) => {
      shouldCheckPrequalStub.returns(sinon.stub().returns(false));
      getPlacementsStub.returns(() => Promise.reject(new Error()));

      const fetchAction = { type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS, isFetching: true };
      const fetchFailedAction = {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
        isFetching: false
      };

      store.dispatch(AirBookingActions.loadPricePagePlacements(true));

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(getPlacementsStub).to.have.been.calledWith(PRICING_PAGE_ID, mockChaseWcmAppContext, segments);

        expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
      }, done);
    });

    it('should dispatch success action when no errors', (done) => {
      const deviceType = 'deviceType';
      const mockedStore = mockStore({ app: { webView: { deviceType } } });

      const content = { content: 'value' };
      const isEligibleForDisplayingChaseBanner = true;

      shouldCheckPrequalStub.returns(sinon.stub().returns(false));
      getPlacementsStub.returns(() => Promise.resolve(content));

      const fetchAction = { type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS, isFetching: true };
      const fetchSuccessAction = {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
        isFetching: false,
        response: {
          ...content,
          isEligibleForDisplayingChaseBanner
        }
      };

      mockedStore.dispatch(AirBookingActions.loadPricePagePlacements(isEligibleForDisplayingChaseBanner));

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith(args);
        expect(getPlacementsStub).to.have.been.calledWith(PRICING_PAGE_ID, mockChaseWcmAppContext, segments);

        expect(mockedStore.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
      }, done);
    });

    it('should dispatch functions with correct arguments for early bird', (done) => {
      store = mockStore({
        app: {
          toggles: {
            EARLY_BIRD_AB_TESTING: true
          },
          airBooking: {
            earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility
          }
        }
      });

      store.dispatch(AirBookingActions.loadPricePagePlacements());

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.calledWith([
          ...args,
          { mbox: EARLY_BIRD_PRICE_VISIBILITY_MBOX_ID, params }
        ]);
        expect(getPlacementsStub).to.have.been.calledWith(
          PRICING_PAGE_ID,
          ['earlyBirdEligible', ...mockChaseWcmAppContext],
          segments
        );
      }, done);
    });

    it('should indicate in app context when placement is swa vacations eligible', (done) => {
      store = mockStore({
        app: {
          airBooking: {
            isInternationalBooking: false,
            searchRequest: {
              currencyType: 'USD',
              isRoundTrip: true,
              departureDate: dayjs().add(3, 'days')
            }
          }
        }
      });

      store.dispatch(AirBookingActions.loadPricePagePlacements());

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(
          PRICING_PAGE_ID,
          ['SWAVEligible', ...mockChaseWcmAppContext],
          segments,
          {
            international: false,
            persona: 'leisure'
          }
        );
      }, done);
    });

    it('should send international flag to placements call', (done) => {
      store = mockStore({
        app: {
          airBooking: {
            isInternationalBooking: true
          }
        }
      });

      store.dispatch(AirBookingActions.loadPricePagePlacements());

      waitFor.untilAssertPass(() => {
        expect(getTargetParamsStub).to.have.been.calledWith({}, PRICING_PAGE_ID);
        expect(getSegmentsStub).to.have.been.called;
        expect(getPlacementsStub).to.have.been.calledWith(PRICING_PAGE_ID, mockChaseWcmAppContext, segments, {
          international: true,
          persona: 'leisure'
        });
      }, done);
    });
  });

  context('saveChaseCardPaymentInfo', () => {
    let shouldShowChaseInstantCreditCardStub;

    beforeEach(() => {
      shouldShowChaseInstantCreditCardStub = sinon.stub(PaymentPageSelectors, 'shouldShowChaseInstantCreditCard');
    });

    it('should save payment info when shouldShowChaseInstantCreditCard is true', () => {
      shouldShowChaseInstantCreditCardStub.returns(true);

      store.dispatch(AirBookingActions.saveChaseCardPaymentInfo());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO,
          paymentInfo: RR_VISA_PAYMENT_INFO
        }
      ]);
    });

    it('should not save payment info when shouldShowChaseInstantCreditCard is false', () => {
      shouldShowChaseInstantCreditCardStub.returns(false);

      store.dispatch(AirBookingActions.saveChaseCardPaymentInfo());

      expect(store.getActions()).to.deep.equal([]);
    });
  });

  context('resetPassengerPassport', () => {
    it('should clear passport information form ', () => {
      const expectedActions = [{ type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER_PASSPORT, paxNumber: 0 }];

      store.dispatch(AirBookingActions.resetPassengerPassport(0));

      const action = store.getActions();

      expect(action).to.deep.equal(expectedActions);
    });
  });

  context('transitionToFrequentTravelerPage', () => {
    it('should load frequent traveler Page', () => {
      const expectedActions = [
        {
          payload: {
            args: ['/air/booking/passenger/1/frequent-travelers?formId=AIRBOOKING_PASSENGER_INFO_EDIT_ADULT_0'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          type: 'AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE'
        }
      ];

      store.dispatch(AirBookingActions.transitionToFrequentTravelerPage(1, 'AIRBOOKING_PASSENGER_INFO_EDIT_ADULT_0'));

      expect(store.getActions()).be.deep.equal(expectedActions);
    });

    it('should fire the analytics satellite event', () => {
      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
      store.dispatch(AirBookingActions.transitionToFrequentTravelerPage(1, 'AIRBOOKING_PASSENGER_INFO_EDIT_ADULT_0'));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('otter', {
        page_name: 'frequent traveler'
      });
    });
  });

  context('selectedFrequentTravelerAnalytics', () => {
    it('should call selectedFrequentTravelerAnalytics function', () => {
      const expectedActions = [
        {
          type: 'AIR_BOOKING__SELECTED_FREQUENT_TRAVELER'
        }
      ];

      store.dispatch(AirBookingActions.selectedFrequentTravelerAnalytics());

      expect(store.getActions()).be.deep.equal(expectedActions);
    });
  });

  context('setHasUpsellError', () => {
    it('should generate correct action', () => {
      store.dispatch(AirBookingActions.setHasUpsellError(false));
      const expectedActions = {
        type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR,
        hasUpsellError: false
      };

      expect(store.getActions()[0]).to.deep.equal(expectedActions);
    });
  });

  context('savePassengerCount', () => {
    it('should save passenger count', () => {
      const passengerCount = {
        lapChildCount: 1,
        adultCount: 1,
        valueUpdated: false
      };

      store.dispatch(AirBookingActions.savePassengerCount(passengerCount));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT,
          passengerCount
        }
      ]);
    });
  });

  describe('getSplitPayOptionsList', () => {
    let getSplitPayOptionsListStub, store;

    const error = { error: 'error' };
    const mockedSuccessResponse = {
      content: 'split pay options'
    };
    const splitPayOptionsRequest = new AirBookingApplyRapidRewardsPageApiJsonBuilder().build();

    beforeEach(() => {
      getSplitPayOptionsListStub = sinon.stub(FlightBookingApi, 'fetchSplitPayOptionsList');
      store = mockStore({});
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return response from splitPay secure call', async () => {
      getSplitPayOptionsListStub.resolves(mockedSuccessResponse);

      await store.dispatch(AirBookingActions.getSplitPayOptionsList(splitPayOptionsRequest));

      expect(getSplitPayOptionsListStub).to.be.calledWith(splitPayOptionsRequest);
      expect(store.getActions()[1]).to.deep.equal({
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST_SUCCESS,
        response: mockedSuccessResponse,
        isFetching: false
      });
    });

    it('should save split pay terms and conditions', async () => {
      const mockResponse = {
        content: 'split pay options',
        splitPayPage: {
          termsAndConditions: 'test'
        }
      };

      getSplitPayOptionsListStub.resolves(mockResponse);
      await store.dispatch(AirBookingActions.getSplitPayOptionsList(splitPayOptionsRequest));

      expect(store.getActions()[2]).to.deep.equal({
        type: 'AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS',
        termsAndConditions: 'test'
      });
    });

    it('should trigger failed action when splitPay API rejects', () => {
      const showDialogStub = sinon.stub(DialogActions, 'showDialog').returns({
        isShowDialog: true,
        type: 'split-pay-options-failure'
      });

      getSplitPayOptionsListStub.rejects(error);

      return store.dispatch(AirBookingActions.getSplitPayOptionsList(splitPayOptionsRequest)).catch((expectedError) => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            isFetching: true,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST
          },
          {
            isFetching: false,
            type: AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST_FAILED
          }
        ]);
        expect(expectedError).to.deep.equal(error);
        expect(showDialogStub.args[0][0].name).to.equal('split-pay-options-failure');
      });
    });

    it('should trigger resumeSplitPayAfterLogin action', () => {
      store.dispatch(AirBookingActions.resumeSplitPayAfterLogin(true));
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          shouldResume: true,
          type: AirBookingActionTypes.AIR_BOOKING__SPLIT_PAY_RESUME_AFTER_LOGIN
        }
      ]);
    });

    it('should trigger saveSplitPayTermsAndConditions action', () => {
      store.dispatch(AirBookingActions.saveSplitPayTermsAndConditions('test'));
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          termsAndConditions: 'test',
          type: AirBookingActionTypes.AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS
        }
      ]);
    });

    it('should trigger resetSplitPayTermsAndConditions action', () => {
      store.dispatch(AirBookingActions.resetSplitPayTermsAndConditions());
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AirBookingActionTypes.AIR_BOOKING__RESET_SPLIT_PAY_TERMS_AND_CONDITIONS
        }
      ]);
    });
  });
});
