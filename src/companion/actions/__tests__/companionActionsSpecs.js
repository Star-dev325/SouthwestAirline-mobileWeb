import i18n from '@swa-ui/locale';
import _ from 'lodash';
import Q from 'q';
import sinonModule from 'sinon';
import * as purchaseSummaryPageHelper from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import CompanionActionTypes from 'src/companion/actions/companionActionTypes';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import * as AccountActions from 'src/shared/actions/accountActions';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import ContactMethodActionTypes from 'src/shared/actions/contactMethodActionTypes';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as CompanionApi from 'src/shared/api/companionApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import * as LoggingApi from 'src/shared/api/loggingApi';
import { APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { COMPANION_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as errorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import { transformToPaymentInfo } from 'src/shared/transformers/accountInfoTransformer';
import * as AlternativeFormsOfPaymentTransformer from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import * as flightPurchaseRequestTransformer from 'src/shared/transformers/flightPurchaseRequestTransformer';
import store2 from 'store2';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import PurchaseFlightParamsBuilder from 'test/builders/model/purchaseFlightParamsBuilder';
import SavedCreditCardsBuilder from 'test/builders/model/savedCreditCardsBuilderForWAPI';
import createMockStore from 'test/unit/helpers/createMockStore';

const { SET_FLOW_STATUS } = FlowStatusActionTypes;
const { window } = BrowserObject;

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();
const {
  COMPANION__FETCH_PAYMENT_PAGE,
  COMPANION__FETCH_PAYMENT_PAGE_SUCCESS,
  COMPANION__FETCH_PAYMENT_PAGE_FAILED,
  COMPANION__FETCH_PRICING_PAGE,
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_PRICING_PAGE_FAILED,
  COMPANION__FETCH_COMPANION_INFORMATION,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
  COMPANION__FETCH_COMPANION_INFORMATION_FAILED,
  COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
  COMPANION__PREFILL_PASSENGER_INFO,
  COMPANION__UPDATE_PASSENGER_INFO,
  COMPANION__UPDATE_CONTACT_METHOD,
  COMPANION__FETCH_CONFIRMATION_PAGE,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__FETCH_CONFIRMATION_PAGE_FAILED,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  COMPANION__RESET_SPECIAL_ASSISTANCE
} = CompanionActionTypes;

const { SHARED__RESET_CALCULATE_FLOW_DATA } = SharedActionTypes;

_.set(window, 'navigator.vibrate', _.noop);

describe('companionActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {
        isInternationalBooking: false
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('goToCompanionPricingPage', () => {
    const fakeLink = {
      fakeLink: 'fakeLink'
    };

    it('should delete PayPal data', () => {
      const removePayPalDataStub = sinon.stub(store2.session, 'remove');

      sinon.stub(FlightBookingApi, 'getProductPrices').returns(Q({ flightPricingPage: 'flightPricingPage' }));

      return store.dispatch(CompanionActions.goToCompanionPricingPage(fakeLink)).then(() => {
        expect(removePayPalDataStub).to.have.been.called;
      });
    });

    it('should pass response if fetch success', () => {
      const cleanUpAssociatedInfoMockAction = { type: 'CLEAN_UP_ASSOCIATED_INFO_ACTION' };
      const cleanUpAssociatedInfoMock = sinon
        .stub(AccountActions, 'cleanUpAssociatedInfo')
        .returns(cleanUpAssociatedInfoMockAction);

      sinon.stub(FlightBookingApi, 'getProductPrices').returns(Q({ flightPricingPage: 'flightPricingPage' }));

      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_PRICING_PAGE
        },
        {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        },
        {
          response: 'flightPricingPage',
          isFetching: false,
          type: COMPANION__FETCH_PRICING_PAGE_SUCCESS
        },
        {
          response: {
            flightPricingPage: 'flightPricingPage'
          },
          type: COMPANION__SET_INTERNATIONAL_BOOKING_FLAG
        },
        cleanUpAssociatedInfoMockAction,
        {
          status: 'in_progress',
          flowName: 'companion',
          type: SET_FLOW_STATUS
        },
        {
          payload: {
            args: ['/companion/pricing'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPricingPage(fakeLink)).then(() => {
        expect(cleanUpAssociatedInfoMock).to.have.been.called;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should trigger error if fetch fail', () => {
      sinon.stub(FlightBookingApi, 'getProductPrices').returns(Q.reject('error'));
      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_PRICING_PAGE
        },
        {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        },
        {
          type: COMPANION__FETCH_PRICING_PAGE_FAILED,
          isFetching: false,
          error: 'error'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPricingPage()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('fetch companion information', () => {
    it('should pass response if fetch success', () => {
      sinon.stub(CompanionApi, 'getCompanionInformation').returns(Q({ companionDetailsPage: 'companionDetailsPage' }));

      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_COMPANION_INFORMATION
        },
        {
          type: SHARED__RESET_CALCULATE_FLOW_DATA
        },
        {
          response: { companionDetailsPage: 'companionDetailsPage' },
          isFetching: false,
          type: COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS
        },
        {
          isInternationalBooking: false,
          response: { companionDetailsPage: 'companionDetailsPage' },
          type: COMPANION__PREFILL_PASSENGER_INFO
        },
        {
          payload: {
            args: ['/companion/passenger'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPassengerPage(false)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should tigger error if fetch fail', () => {
      sinon.stub(CompanionApi, 'getCompanionInformation').returns(Q.reject('error'));
      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_COMPANION_INFORMATION
        },
        {
          type: COMPANION__FETCH_COMPANION_INFORMATION_FAILED,
          isFetching: false,
          error: 'error'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPassengerPage(false)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('contactMethod', () => {
    it('should create UPDATE_CONTACT_METHOD to update contact method info ', () => {
      const contactMethodInfo = new ContactMethodInfoBuilder().build();
      const expectedAction = {
        type: COMPANION__UPDATE_CONTACT_METHOD,
        info: contactMethodInfo
      };

      store.dispatch(CompanionActions.updateContactMethod(contactMethodInfo));

      const action = store.getActions()[0];

      expect(action).to.deep.equal(expectedAction);
    });
  });

  context('specialAssistance', () => {
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
      store.dispatch(CompanionActions.updateCompanionWithSpecialAssistance(specialAssistanceFormData));

      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: CompanionActionTypes.COMPANION__UPDATE_SPECIAL_ASSISTANCE,
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
      store.dispatch(CompanionActions.updateCompanionWithSpecialAssistance(null));

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

    it('should set special assistance data back to null on reset', () => {
      store.dispatch(CompanionActions.resetCompanionSpecialAssistance());

      const action = store.getActions();

      expect(action).to.deep.equal([
        {
          type: COMPANION__RESET_SPECIAL_ASSISTANCE
        }
      ]);
    });
  });

  context('fetch companion payment', () => {
    it('should go to payment page when fetch success', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));
      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_PAYMENT_PAGE
        },
        {
          isFetching: false,
          response: 'paymentSavedCreditCardsPage',
          type: COMPANION__FETCH_PAYMENT_PAGE_SUCCESS
        },
        {
          payload: {
            args: ['companion/payment'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPaymentPage()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should trigger error if fetch fail', () => {
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject('error'));
      const expectedActions = [
        {
          isFetching: true,
          type: COMPANION__FETCH_PAYMENT_PAGE
        },
        {
          type: COMPANION__FETCH_PAYMENT_PAGE_FAILED,
          isFetching: false,
          error: 'error'
        }
      ];

      return store.dispatch(CompanionActions.goToCompanionPaymentPage()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });

  context('fetch earlybird pricing', () => {
    beforeEach(() => {
      sinon.stub(purchaseSummaryPageHelper, 'transformToEarlybirdInPathRequest').returns({
        earlyBirdRequest: 'earlyBirdRequest'
      });
      sinon.stub(FlightBookingApi, 'retrieveEarlyBirdInPathInfo');
    });

    it('should FETCH_COMPANION_EARLY_BIRD_IN_PATH_INFO_SUCCESS when retrieve early bird pricing has been done', () => {
      FlightBookingApi.retrieveEarlyBirdInPathInfo.returns(Q({ earlyBirdEligibility: 'earlyBirdPricingResponse' }));

      return store.dispatch(CompanionActions.fetchEarlybirdPricing()).then(() => {
        const actions = store.getActions();

        expect(purchaseSummaryPageHelper.transformToEarlybirdInPathRequest).to.have.been.called;
        expect(actions[1]).to.deep.equal({
          type: COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
          response: {
            earlyBirdEligibility: 'earlyBirdPricingResponse'
          },
          isFetching: false
        });
      });
    });

    it('should FETCH_COMPANION_EARLY_BIRD_IN_PATH_INFO_FAILED when retrieve early bird pricing has been failed', () => {
      FlightBookingApi.retrieveEarlyBirdInPathInfo.returns(Q.reject());

      return store.dispatch(CompanionActions.fetchEarlybirdPricing()).then(() => {
        const actions = store.getActions();

        expect(purchaseSummaryPageHelper.transformToEarlybirdInPathRequest).to.have.been.called;
        expect(actions[1]).to.deep.equal({
          type: COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
          isFetching: false
        });
      });
    });
  });

  context('go to companion review page', () => {
    it('should go to companion review page and save payment info', () => {
      const { savedCreditCards } = SavedCreditCardsBuilder.getTwoSavedCreditCards();
      const paymentInfo = transformToPaymentInfo(savedCreditCards);
      const expectedActions = [
        {
          paymentInfo: {
            addressLine1: 'this is street address',
            addressLine2: 'Atlanta',
            city: 'Atlanta',
            creditCardType: 'VISA',
            isoCountryCode: 'US',
            lastFourDigitsOfCreditCard: '1111',
            nameOnCard: 'Mengqiu PENG',
            selectedCardId: '1-ENKS4K',
            stateProvinceRegion: 'CA',
            zipOrPostalCode: '12345'
          },
          type: COMPANION__SAVE_PAYMENT_INFO
        },
        {
          payload: {
            args: ['/companion/purchase'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(CompanionActions.savePaymentInfoAndGoToPurchaseSummaryPage(paymentInfo));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  context('save compaion passenger', () => {
    it('should create UPDATE_PASSENGER_INFO to update compaion passenger info ', () => {
      const formData = {
        emailReceiptTo: 'x222796@wnco.com',
        shareItineraryEmail: '',
        redressNumber: '',
        knownTravelerId: '',
        contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (111111111)`
      };
      const expectedActions = [
        {
          type: COMPANION__UPDATE_PASSENGER_INFO,
          formData
        }
      ];

      store.dispatch(CompanionActions.saveCompanionPassenger(formData, COMPANION_PASSENGER_PERSONAL_INFO_FORM));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  context('go to companion confirmation page', () => {
    let transformToPurchaseRequestStub;
    let purchaseFlightParams;
    let fakePurchaseRequest;

    beforeEach(() => {
      purchaseFlightParams = new PurchaseFlightParamsBuilder().build();
      purchaseFlightParams.contactMethodInfo = new ContactMethodInfoBuilder().withSaveContactMethod().build();
      fakePurchaseRequest = { fakePurchaseRequest: 'fakePurchaseRequest', href: '/x-purchase', xhref: '/x-purchase' };

      transformToPurchaseRequestStub = sinon
        .stub(flightPurchaseRequestTransformer, 'transformToPurchaseRequest')
        .returns({ fakePurchaseRequest: 'fakePurchaseRequest', href: '/x-purchase' });

      sinon.stub(AccountsApi, 'saveContactMethod').returns(Promise.resolve());
    });

    it('should call api and go to conformation page when purchase success with save contact method', () => {
      const purchaseFlightStub = sinon
        .stub(FlightBookingApi, 'purchaseFlight')
        .returns(Q({ flightConfirmationPage: {} }));

      const expectedActions = [
        { type: COMPANION__FETCH_CONFIRMATION_PAGE, isFetching: true, request: fakePurchaseRequest },
        { type: SET_FLOW_STATUS, flowName: 'companion', status: 'completed' },
        { type: COMPANION__RESET_SPECIAL_ASSISTANCE },
        {
          type: COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
          isFetching: false,
          response: { flightConfirmationPage: {} }
        },
        { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/companion/confirmation'] } },
        { type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD },
        { type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_SUCCESS }
      ];

      return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
        expect(transformToPurchaseRequestStub).to.have.been.called;
        expect(purchaseFlightStub).to.have.been.calledWith(fakePurchaseRequest, true);
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should play haptic feedback when companion booking succeeds', () => {
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      sinon.stub(FlightBookingApi, 'purchaseFlight').returns(Q({ flightConfirmationPage: {} }));

      return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
        expect(playHapticFeedbackStub).to.have.been.called;
      });
    });

    it('should call api, clear CVV and throw error when purchase fail', () => {
      const purchaseFlightStub = sinon.stub(FlightBookingApi, 'purchaseFlight').returns(Q.reject({}));

      const expectedActions = [
        { type: COMPANION__FETCH_CONFIRMATION_PAGE, isFetching: true, request: fakePurchaseRequest },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          fieldName: 'securityCode',
          formId: 'PURCHASE_SUMMARY_FORM',
          url: '/',
          value: ''
        },
        { type: COMPANION__FETCH_CONFIRMATION_PAGE_FAILED, isFetching: false, error: {} }
      ];

      return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
        expect(transformToPurchaseRequestStub).to.have.been.called;
        expect(purchaseFlightStub).to.have.been.calledWith(fakePurchaseRequest, true);
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should show AFP error if purchase failed and payment method is apple pay', () => {
      const purchaseFlightStub = sinon.stub(FlightBookingApi, 'purchaseFlight').returns(Q.reject({}));
      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      _.set(purchaseFlightParams, 'paymentInfo.selectedCardId', APPLE_PAY_CARD_ID);

      const applePayPurchaseRequest = {
        body: {
          payment: {
            newCreditCard: {
              digitalPaymentType: APPLE_PAY.key
            }
          }
        },
        xhref: '/'
      };

      transformToPurchaseRequestStub.returns(applePayPurchaseRequest);

      return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
        expect(toChapiAfpErrorLogStub).to.have.been.called;
        expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
        expect(transformToPurchaseRequestStub).to.have.been.called;
        expect(purchaseFlightStub).to.have.been.calledWith(applePayPurchaseRequest, true);

        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: COMPANION__FETCH_CONFIRMATION_PAGE,
          isFetching: true,
          request: applePayPurchaseRequest
        });

        expect(actions[1]).to.deep.equal({
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          fieldName: 'securityCode',
          formId: 'PURCHASE_SUMMARY_FORM',
          url: '/',
          value: ''
        });

        expect(actions[2]).to.deep.equal({
          popUpError: {},
          type: SharedActionTypes.SHARED__TRIGGER_ERROR_POP_UP
        });

        expect(actions[3]).to.contain({
          type: DialogActionTypes.TOGGLE_DIALOG,
          isShowDialog: true
        });

        expect(actions[4]).to.deep.equal({
          type: COMPANION__FETCH_CONFIRMATION_PAGE_FAILED,
          isFetching: false
        });
      });
    });

    describe('isApplePay', () => {
      let applePayPurchaseRequest;
      let initiateVoidTransactionStub;
      let isSessionTimeoutErrorStub;

      beforeEach(() => {
        store = mockStore({
          app: {
            toggles: {
              CEPTOR_VOID_API: true
            }
          }
        });
        initiateVoidTransactionStub = sinon.stub(AlternativeFormsOfPaymentActions, 'initiateVoidTransaction');
        isSessionTimeoutErrorStub = sinon.stub(errorCodesHelper, 'isSessionTimeoutError');
        applePayPurchaseRequest = {
          body: {
            payment: {
              newCreditCard: {
                digitalPaymentType: APPLE_PAY.key
              }
            }
          },
          xhref: '/'
        };
        purchaseFlightParams = {
          ...purchaseFlightParams,
          paymentInfo: {
            ...purchaseFlightParams.paymentInfo,
            selectedCardId: APPLE_PAY_CARD_ID
          }
        };
        transformToPurchaseRequestStub.returns(applePayPurchaseRequest);
        sinon.stub(FlightBookingApi, 'purchaseFlight').returns(Promise.reject({ responseJSON: { code: 400310764 } }));
        sinon.stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog').returns('errorLog');
        sinon.stub(LoggingApi, 'sendErrorLog');
        initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
      });

      it('should call void transaction if purchaseFlight failed with applePayErrorCode and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(false);

        return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
          expect(initiateVoidTransactionStub).to.have.been.called;
          const actions = store.getActions();

          expect(actions[2]).to.deep.equal({
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
          });
        });
      });

      it('should not dispatch alternativeFormsOfPaymentFailed if changePurchase failed with warm state and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(true);

        return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
          expect(initiateVoidTransactionStub).to.not.have.been.called;
          expect(store.getActions()).to.deep.equal([
            {
              type: COMPANION__FETCH_CONFIRMATION_PAGE,
              isFetching: true,
              request: applePayPurchaseRequest
            },
            {
              fieldName: 'securityCode',
              formId: 'PURCHASE_SUMMARY_FORM',
              type: 'UPDATE_FORM_FIELD_DATA_VALUE',
              url: '/',
              value: ''
            },
            {
              type: COMPANION__FETCH_CONFIRMATION_PAGE_FAILED,
              isFetching: false
            }
          ]);
        });
      });
    });

    context('early bird failed', () => {
      it('should open dialog when early bird failed', async () => {
        const failedEarlyBird = { recordLocator: 'PNR123', firstName: 'passenger', lastName: 'test' };

        sinon.stub(FlightBookingApi, 'purchaseFlight').returns(Q({ flightConfirmationPage: { failedEarlyBird } }));

        const fakeShowEarlybirdFailedDialogAction = { type: 'fakeShowEarlybirdFailedDialogAction' };
        const showEarlybirdFailedDialogActionStub = sinon
          .stub(EarlyBirdActions, 'showEarlybirdFailedDialog')
          .returns(fakeShowEarlybirdFailedDialogAction);

        await store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams));

        expect(store.getActions()[5]).to.deep.equal(fakeShowEarlybirdFailedDialogAction);
        expect(showEarlybirdFailedDialogActionStub).to.have.been.calledWith(failedEarlyBird);
      });
    });

    it('should open custom Token Expired popup when error code 400310756', () => {
      sinon.stub(FlightBookingApi, 'purchaseFlight').rejects({ responseJSON: { code: 400310756 } });

      return store.dispatch(CompanionActions.goToCompanionConfirmationPage(purchaseFlightParams)).then(() => {
        expect(store.getActions()[2]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });
    });
  });

  context('save payment info on payment edit page', () => {
    it('should save payment info and back to previous page', () => {
      const mockPaymentInfo = { addressLine1: 'addressLine1' };

      store.dispatch(CompanionActions.savePaymentInfoAndBackToPreviousPage(mockPaymentInfo));
      expect(store.getActions()).to.deep.equal([
        {
          type: COMPANION__SAVE_PAYMENT_INFO,
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
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'COMPANION_PURCHASE_SUMMARY_FORM',
          fieldName: 'securityCode',
          url: '/',
          value: ''
        }
      ]);
    });
  });

  context('save payment info', () => {
    it('should save payment info', () => {
      const mockPaymentInfo = { addressLine1: 'addressLine1' };

      store.dispatch(CompanionActions.savePaymentInfo(mockPaymentInfo));
      expect(store.getActions()).to.deep.equal([
        {
          type: COMPANION__SAVE_PAYMENT_INFO,
          paymentInfo: mockPaymentInfo
        }
      ]);
    });
  });
});
