import _ from 'lodash';
import sinonModule from 'sinon';
import store2 from 'store2';

import i18n from '@swa-ui/locale';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as EarlyBirdAPI from 'src/shared/api/earlyBirdApi';
import * as LoggingApi from 'src/shared/api/loggingApi';
import { APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { ANALYTICS_DATA } from 'src/shared/constants/earlyBirdInPathConstants';
import { EARLY_BIRD_CHECK_IN_FORM } from 'src/shared/constants/formIds';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as errorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as AlternativeFormsOfPaymentTransformer from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { EARLY_BIRD_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';

const { window } = BrowserObject;

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

_.set(window, 'navigator.vibrate', _.noop);

const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };
const {
  EARLY_BIRD__RESET_FLOW_DATA,
  EARLY_BIRD__FETCH_PURCHASE,
  EARLY_BIRD__FETCH_PURCHASE_SUCCESS,
  EARLY_BIRD__FETCH_PURCHASE_FAILED,
  EARLY_BIRD__FETCH_RESERVATION,
  EARLY_BIRD__FETCH_RESERVATION_SUCCESS,
  EARLY_BIRD__FETCH_RESERVATION_FAILED,
  EARLY_BIRD__FETCH_PAYMENT_OPTIONS,
  EARLY_BIRD__FETCH_PAYMENT_OPTIONS_SUCCESS,
  EARLY_BIRD__FETCH_PAYMENT_OPTIONS_FAILED,
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
  EARLY_BIRD__RESET_PAYMENT_INFO,
  EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS
} = earlyBirdActionTypes;

const { SET_FLOW_STATUS } = FlowStatusActionTypes;
const { CREDIT_CARD__SET_SAVED_CREDIT_CARDS } = CreditCardActionTypes;

describe('EarlyBirdActions', () => {
  let store;

  beforeEach(() => {
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('earlybird');
    BrowserObject.location = null;
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('showEarlybirdFailedDialog', () => {
    it('should hide error popup when user clicks maybe later button', (done) => {
      store.dispatch(EarlyBirdActions.showEarlybirdFailedDialog('fakePNR'));

      const showDialogAction = _.find(store.getActions(), (action) => action.type === 'TOGGLE_DIALOG');

      showDialogAction.options.buttons[0].onClick();

      waitFor.untilAssertPass(() => {
        expect(store.getActions()[1]).to.contain({
          type: 'TOGGLE_DIALOG',
          isShowDialog: false
        });
      }, done);
    });

    it('should add dataAnalytics attributes for early bird popup buttons', () => {
      store.dispatch(EarlyBirdActions.showEarlybirdFailedDialog('fakePNR'));

      const showDialogAction = _.find(store.getActions(), (action) => action.type === 'TOGGLE_DIALOG');

      expect(showDialogAction.options.buttons[0].dataAnalytics).to.equal(ANALYTICS_DATA.ADD_EB_LATER);
      expect(showDialogAction.options.buttons[1].dataAnalytics).to.equal(ANALYTICS_DATA.ADD_EB_NOW);
    });

    it('should navigate to early bird checkin flow when user clicks add early bird button', (done) => {
      BrowserObject.location = { pathname: '/earlybird/checkin' };

      store.dispatch(
        EarlyBirdActions.showEarlybirdFailedDialog({
          recordLocator: 'TesPNR',
          firstName: 'First',
          lastName: 'Last'
        })
      );

      const showDialogAction = _.find(store.getActions(), (action) => action.type === 'TOGGLE_DIALOG');

      showDialogAction.options.buttons[1].onClick();

      waitFor.untilAssertPass(() => {
        const actions = store.getActions();

        expect(actions[0]).to.contain({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true
        });
        expect(actions[1]).to.deep.equal({ type: 'SET_FLOW_STATUS', flowName: 'earlyBird', status: 'initial' });
        expect(actions[2]).to.deep.equal({
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          fieldName: 'recordLocator',
          url: '/',
          value: 'TesPNR',
          formId: EARLY_BIRD_CHECK_IN_FORM
        });
        expect(actions[3]).to.includes({ fieldName: 'firstName', value: 'First' });
        expect(actions[4]).to.includes({ fieldName: 'lastName', value: 'Last' });
        expect(actions[5]).to.contain({
          type: 'TOGGLE_DIALOG',
          isShowDialog: false
        });
        expect(actions[6]).to.contain({
          type: 'TOGGLE_DIALOG',
          isShowDialog: false
        });
        expect(actions[7]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/earlybird/checkin?clearFormData=false'] }
        });
      }, done);
    });
  });

  context('getEarlyBirdReservation', () => {
    it('should delete PayPal data', () => {
      const removePayPalDataStub = sinon.stub(store2.session, 'remove');

      sinon
        .stub(EarlyBirdAPI, 'retrieveReservation')
        .resolves({ viewEarlyBirdReservationPage: { earlyBirdBounds: ['FakeBounds'] } });
      const link = {
        href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      };

      const result = store.dispatch(EarlyBirdActions.getEarlyBirdReservation(link, 'NAAHHN', true));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(removePayPalDataStub).to.have.been.called;
      });
    });

    it('should setEarlyBirdFlowStatus and push to detail page when retrieve api success', () => {
      BrowserObject.location = { pathname: '/earlybird' };
      sinon
        .stub(EarlyBirdAPI, 'retrieveReservation')
        .resolves({ viewEarlyBirdReservationPage: { earlyBirdBounds: ['FakeBounds'] } });
      const link = {
        href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      };

      const result = store.dispatch(EarlyBirdActions.getEarlyBirdReservation(link, 'NAAHHN', true));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_RESERVATION
          },
          {
            type: EARLY_BIRD__RESET_FLOW_DATA
          },
          {
            isFetching: false,
            response: { earlyBirdBounds: ['FakeBounds'] },
            type: EARLY_BIRD__FETCH_RESERVATION_SUCCESS
          },
          {
            status: 'in_progress',
            flowName: 'earlyBird',
            type: SET_FLOW_STATUS
          },
          {
            payload: {
              args: ['/earlybird/select.html'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });
    });

    it('should setEarlyBirdFlowStatus and push to detail page when successful api response', () => {
      BrowserObject.location = { pathname: '/earlybird/select.html' };
      sinon
        .stub(EarlyBirdAPI, 'retrieveReservation')
        .resolves({ viewEarlyBirdReservationPage: { earlyBirdBounds: ['FakeBounds'] } });
      const link = {
        href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      };

      const result = store.dispatch(EarlyBirdActions.getEarlyBirdReservation(link, 'NAAHHN', true));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()[5]).to.deep.equal({
          payload: {
            args: ['/earlybird/select.html'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        });
      });
    });

    it('should not setEarlyBirdFlowStatus or push to detail page when retrieve api fail', () => {
      sinon.stub(EarlyBirdAPI, 'retrieveReservation').rejects({ errMsg: 'errMsg' });
      const pnr = { recordLocator: 'PNR123', firstName: 'passenger', lastName: 'test' };

      const result = store.dispatch(EarlyBirdActions.getEarlyBirdReservation(pnr));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_RESERVATION
          },
          {
            isFetching: false,
            type: EARLY_BIRD__FETCH_RESERVATION_FAILED,
            error: {
              errMsg: 'errMsg'
            }
          }
        ]);
      });
    });

    it('should throw INELIGIBLE error when earlyBirdBounds is empty', () => {
      BrowserObject.location = { pathname: '/earlybird/checkin' };
      sinon
        .stub(EarlyBirdAPI, 'retrieveReservation')
        .resolves({ viewEarlyBirdReservationPage: { earlyBirdBounds: [] } });
      const pnr = { recordLocator: 'PNR123', firstName: 'passenger', lastName: 'test' };

      const result = store.dispatch(EarlyBirdActions.getEarlyBirdReservation(pnr));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        const errorMessage = store.getActions()[2].error.message;

        expect(store.getActions()[2]).to.includes({
          isFetching: false,
          type: EARLY_BIRD__FETCH_RESERVATION_FAILED
        });

        expect(errorMessage).to.be.eql(i18n('EARLY_BIRD_INELIGIBLE'));
      });
    });
  });

  context('get payment options', () => {
    it('should save payment options when api call success', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .resolves({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' });

      const result = store.dispatch(EarlyBirdActions.getPaymentOptions());

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS
          },
          {
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage',
            type: CREDIT_CARD__SET_SAVED_CREDIT_CARDS
          },
          {
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS_SUCCESS,
            response: 'paymentSavedCreditCardsPage',
            isFetching: false
          }
        ]);
      });
    });

    it('should dispatch correct actions when api call fail', () => {
      const expectedError = { errMsg: 'errMsg' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(expectedError);

      const result = store.dispatch(EarlyBirdActions.getPaymentOptions());

      return expect(result).to.eventually.be.rejected.then((e) => {
        expect(e).to.equal(expectedError);

        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS
          },
          {
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS_FAILED,
            error: { errMsg: 'errMsg' },
            isFetching: false
          }
        ]);
      });
    });
  });

  context('gotoReviewPage', () => {
    const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
    const formData = new EarlyBirdDetailFormDataBuilder().build();
    const priceResponse = { earlyBirdBounds, recordLocator: 'TSTPNR', receiptEmail: 'arris@gmail.com' };
    const expectedReviewPage = {
      firstName: 'HARRY',
      lastName: 'POTTER',
      receiptEmail: 'arris@gmail.com',
      productIds: ['productId01', 'productId10'],
      earlyBirdBounds: [
        {
          arrivalAirportCode: 'ALB',
          arrivalTime: '13:35',
          boundType: 'DEPARTING',
          departureAirportCode: 'AUS',
          departureDate: '2018-06-08',
          departureTime: '05:30',
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$',
            description: null
          },
          flight: '461/1125',
          isNextDayArrival: false,
          isOvernight: false,
          passengers: [
            {
              _meta: {
                productId: 'productId01'
              },
              accountNumber: '601534942',
              canPurchaseEarlyBird: false,
              decisionDescription: 'A-List',
              name: 'HARRY POTTER'
            }
          ]
        },
        {
          arrivalAirportCode: 'AUS',
          arrivalTime: '16:00',
          boundType: 'RETURNING',
          departureAirportCode: 'ALB',
          departureDate: '2018-06-17',
          departureTime: '06:15',
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$',
            description: null
          },
          flight: '461/1125',
          isNextDayArrival: false,
          isOvernight: false,
          passengers: [
            {
              _meta: {
                productId: 'productId10'
              },
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'PAUL LIU'
            }
          ]
        }
      ],
      moneyTotalFare: {
        amount: '30.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      recordLocator: 'TSTPNR'
    };

    it('should fetch credit cards, generate review page data and and push to review page when user login', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .resolves({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' });

      const result = store.dispatch(EarlyBirdActions.gotoReviewPage('nextPagePath', true, formData, priceResponse));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.include.members([
          {
            isFetching: false,
            response: 'paymentSavedCreditCardsPage',
            type: 'EARLY_BIRD__FETCH_PAYMENT_OPTIONS_SUCCESS'
          },
          {
            payload: {
              args: ['nextPagePath'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });
    });

    it('should generate review page data and push to review page when user not login', () => {
      store.dispatch(EarlyBirdActions.gotoReviewPage('nextPagePath', false, formData, priceResponse));
      expect(store.getActions()).to.deep.include.members([
        {
          type: EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
          reviewPage: expectedReviewPage
        },
        {
          payload: {
            args: ['nextPagePath'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should return api errors of AccountsApi fetchPaymentOptions', () => {
      const connectionError = { errorMsg: 'connection failed' };

      sinon.stub(AccountsApi, 'fetchPaymentOptions').rejects(connectionError);

      const isLoggedIn = true;

      const result = store.dispatch(
        EarlyBirdActions.gotoReviewPage('nextPagePath', isLoggedIn, formData, priceResponse)
      );

      return expect(result).to.eventually.be.rejected.then((e) => {
        expect(e).to.deep.equal(connectionError);

        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS
          },
          {
            error: connectionError,
            isFetching: false,
            type: EARLY_BIRD__FETCH_PAYMENT_OPTIONS_FAILED
          }
        ]);
      });
    });
  });

  context('savePaymentInfoAndBackToPreviousPage', () => {
    it('should save payment info go back to previous page', () => {
      const mockPaymentInfo = { addressLine1: 'addressLine1' };

      store.dispatch(EarlyBirdActions.savePaymentInfoAndBackToPreviousPage(mockPaymentInfo));
      expect(store.getActions()).to.deep.equal([
        {
          type: EARLY_BIRD__SAVE_PAYMENT_INFO,
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
          formId: 'EARLY_BIRD_REVIEW_FORM',
          fieldName: 'securityCode',
          url: '/',
          value: ''
        }
      ]);
    });
  });

  context('purchase earlybird', () => {
    const formData = {
      paymentInfo: { selectedCardId: '1-JJKG9' }
    };
    const earlyBirdPurchaseInfo = {
      moneyTotalFare: 'moneyTotalFare',
      recordLocator: 'recordLocator'
    };

    it('should dispatch success, push and setEarlyBirdFlowStatus action when call api success', () => {
      BrowserObject.location = { pathname: '/earlybird' };
      sinon.stub(EarlyBirdAPI, 'purchase').resolves({ earlyBirdConfirmationPage: { recordLocator: 'ABC123' } });

      const result = store.dispatch(EarlyBirdActions.purchase({ formData, earlyBirdPurchaseInfo, isLoggedIn: true }));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PURCHASE
          },
          {
            isFetching: false,
            response: { recordLocator: 'ABC123' },
            type: EARLY_BIRD__FETCH_PURCHASE_SUCCESS
          },
          {
            type: SET_FLOW_STATUS,
            flowName: 'earlyBird',
            status: 'completed'
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/earlybird/confirmation.html'] }
          }
        ]);
      });
    });

    it('should play haptic feedback when earlybird purchase succeeds', () => {
      BrowserObject.location = { pathname: '/earlybird' };
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      sinon.stub(EarlyBirdAPI, 'purchase').resolves({ earlyBirdConfirmationPage: { recordLocator: 'ABC123' } });

      return store
        .dispatch(EarlyBirdActions.purchase({ formData, earlyBirdPurchaseInfo, isLoggedIn: true }))
        .then(() => {
          expect(playHapticFeedbackStub).to.have.been.called;
        });
    });

    it('should play haptic feedback when earlybird purchase succeeds on new route', () => {
      BrowserObject.location = { pathname: '/earlybird/confirmation.html' };
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      sinon.stub(EarlyBirdAPI, 'purchase').resolves({ earlyBirdConfirmationPage: { recordLocator: 'ABC123' } });

      return store
        .dispatch(EarlyBirdActions.purchase({ formData, earlyBirdPurchaseInfo, isLoggedIn: true }))
        .then(() => {
          expect(playHapticFeedbackStub).to.have.been.called;
        });
    });

    it('should dispatch success, push and setEarlyBirdFlowStatus action when call api success and purchase with paypal', () => {
      BrowserObject.location = { pathname: '/earlybird' };
      sinon.stub(EarlyBirdAPI, 'purchase').resolves({ earlyBirdConfirmationPage: { recordLocator: 'ABC123' } });
      const payPal = {
        token: 'EC-123'
      };

      const result = store.dispatch(
        EarlyBirdActions.purchase({
          formData,
          earlyBirdPurchaseInfo,
          payPal,
          isLoggedIn: true
        })
      );

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PURCHASE
          },
          {
            isFetching: false,
            response: { recordLocator: 'ABC123' },
            type: EARLY_BIRD__FETCH_PURCHASE_SUCCESS
          },
          {
            type: SET_FLOW_STATUS,
            flowName: 'earlyBird',
            status: 'completed'
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/earlybird/confirmation.html'] }
          }
        ]);
      });
    });

    it('should  dispatch fail action when call api fail', () => {
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      sinon.stub(EarlyBirdAPI, 'purchase').rejects({ errorMsg: 'errorMsg' });

      const result = store.dispatch(EarlyBirdActions.purchase({ formData, earlyBirdPurchaseInfo, isLoggedIn: true }));

      return expect(result).to.eventually.be.fulfilled.then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: EARLY_BIRD__FETCH_PURCHASE
          },
          clearFormDataByIdStub,
          {
            isFetching: false,
            error: {
              errorMsg: 'errorMsg'
            },
            type: EARLY_BIRD__FETCH_PURCHASE_FAILED
          }
        ]);
      });
    });

    it('should show AFP error if purchase failed and payment method is apple pay', () => {
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
      sinon.stub(EarlyBirdAPI, 'purchase').rejects({ errorMsg: 'errorMsg' });
      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      const applePayFormData = {
        paymentInfo: {
          selectedCardId: APPLE_PAY_CARD_ID
        }
      };

      return store
        .dispatch(EarlyBirdActions.purchase({ formData: applePayFormData, earlyBirdPurchaseInfo, isLoggedIn: true }))
        .then(() => {
          expect(toChapiAfpErrorLogStub).to.have.been.called;
          expect(sendErrorLogStub).to.have.been.calledWith('errorLog');

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            isFetching: true,
            type: EARLY_BIRD__FETCH_PURCHASE
          });

          expect(actions[1]).to.deep.equal(clearFormDataByIdStub);

          expect(actions[2]).to.deep.equal({
            popUpError: {
              errorMsg: 'errorMsg'
            },
            type: SharedActionTypes.SHARED__TRIGGER_ERROR_POP_UP
          });

          expect(actions[3]).to.contain({
            type: DialogActionTypes.TOGGLE_DIALOG,
            isShowDialog: true
          });

          expect(actions[4]).to.deep.equal({
            isFetching: false,
            type: EARLY_BIRD__FETCH_PURCHASE_FAILED
          });
        });
    });

    describe('isApplePay', () => {
      let applePayFormData;
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
        sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);
        sinon.stub(EarlyBirdAPI, 'purchase').rejects({ responseJSON: { code: 400310764 } });
        sinon.stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog').returns('errorLog');
        sinon.stub(LoggingApi, 'sendErrorLog');
        initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
        applePayFormData = {
          paymentInfo: {
            selectedCardId: APPLE_PAY_CARD_ID
          }
        };
      });

      it('should call void transaction if changePurchase failed with applePayErrorCode and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(false);

        return store
          .dispatch(EarlyBirdActions.purchase({ formData: applePayFormData, earlyBirdPurchaseInfo, isLoggedIn: true }))
          .then(() => {
            expect(initiateVoidTransactionStub).to.have.been.called;
            const actions = store.getActions();

            expect(actions[2]).to.deep.equal({
              type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
            });
          });
      });

      it('should not dispatch alternativeFormsOfPaymentFailed if changePurchase failed with warm state and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(true);

        return store
          .dispatch(EarlyBirdActions.purchase({ formData: applePayFormData, earlyBirdPurchaseInfo, isLoggedIn: true }))
          .then(() => {
            expect(initiateVoidTransactionStub).to.not.have.been.called;
            expect(store.getActions()).to.deep.equal([
              {
                isFetching: true,
                type: EARLY_BIRD__FETCH_PURCHASE
              },
              clearFormDataByIdStub,
              {
                isFetching: false,
                type: EARLY_BIRD__FETCH_PURCHASE_FAILED
              }
            ]);
          });
      });
    });
  });

  context('resetPaymentInfo', () => {
    it('should dispatch resetPaymentInfo action', () => {
      store.dispatch(EarlyBirdActions.resetPaymentInfo());
      expect(store.getActions()[0]).to.deep.equal({ type: EARLY_BIRD__RESET_PAYMENT_INFO });
    });
  });

  context('fetchEarlyBirdPlacements', () => {
    const params = { key: 'value' };
    const segment = 'segment';
    const args = [{ mbox: '', params }];
    let getMboxConfigStub = null;

    let getTargetParamsStub;
    let getSegmentsStub;
    let getPlacementsStub;

    beforeEach(() => {
      getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig');
      getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(params));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
      getMboxConfigStub.returns(() => Promise.resolve(args));
    });

    afterEach(() => {
      AdobeTargetActions.getMboxConfig.restore();
    });

    it('should dispatch failed action when getTargetParams returns success dispatch', async () => {
      getPlacementsStub.returns(() => Promise.resolve([]));
      getMboxConfigStub.returns(() => Promise.resolve([]));

      const fetchAction = { isFetching: true, type: EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS };
      const fetchSuccessAction = {
        type: 'EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS_SUCCESS',
        response: [],
        isFetching: false
      };

      await store.dispatch(EarlyBirdActions.fetchEarlyBirdPlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, EARLY_BIRD_PAGE_ID);
      expect(getSegmentsStub).to.have.been.calledWith([]);
      expect(getPlacementsStub).to.have.been.calledWith('early-bird-index', [], 'segment');

      expect(store.getActions()).to.deep.equal([fetchAction, fetchSuccessAction]);
    });

    it('should dispatch failed action when getTargetParams throws unhandled exception', async () => {
      getTargetParamsStub.returns(() => Promise.reject('Error'));

      const fetchAction = { isFetching: true, type: EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS };
      const fetchFailedAction = {
        error: 'Error',
        isFetching: false,
        type: 'EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS_FAILED'
      };

      await store.dispatch(EarlyBirdActions.fetchEarlyBirdPlacements());

      expect(getTargetParamsStub).to.have.been.calledWith({}, EARLY_BIRD_PAGE_ID);
      expect(getSegmentsStub).to.not.have.been.called;
      expect(getPlacementsStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([fetchAction, fetchFailedAction]);
    });
  });
});
