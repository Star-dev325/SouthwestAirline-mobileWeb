import i18n from '@swa-ui/locale';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import _ from 'lodash';
import { changeShoppingPage } from 'mocks/templates/air-change/changeShoppingPageForOneWayWithOutbound';
import proxyquire from 'proxyquire';
import Q from 'q';
import { sandbox } from 'sinon';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import { AIR_CHANGE_SPLIT_PNR_FLOW_NAME } from 'src/airChange/constants/airChangeConstants';
import * as changeRequestHelper from 'src/airChange/helpers/changeRequestHelper';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import * as ApplyTravelFunds from 'src/shared/actions/applyTravelFundsActions';
import contactMethodActionTypes from 'src/shared/actions/contactMethodActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import * as DialogActions from 'src/shared/actions/dialogActions';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { asyncChainFinish, asyncChainStart } from 'src/shared/actions/sharedActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as AirChangeApi from 'src/shared/api/airChangeApi';
import * as AirReaccomApi from 'src/shared/api/airReaccomApi';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import * as LoggingApi from 'src/shared/api/loggingApi';
import * as ReservationApi from 'src/shared/api/reservationApi';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { STATUS } from 'src/shared/constants/flowConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as errorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import * as shoppingSearchHelper from 'src/shared/helpers/shoppingSearchHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as AlternativeFormsOfPaymentTransformer from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import * as flightProductSearchRequestTransformers from 'src/shared/transformers/flightProductSearchRequestTransformer';
import store2 from 'store2';
import HawaiiNoRoutesPopupErrorBuilder from 'test/builders/apiResponse/v1/content-delivery/query/hawaiiNoRoutesPopupErrorBuilder';
import PassengerInformationBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/air-booking/passengerInformationBuilder';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import {
  getPaymentInfoForApplePayCard,
  getPaymentInfoForUseNewCreditCard
} from 'test/builders/model/paymentInfoBuilder';
import { splitPnrLinkObjWithSelectedIdsAndEmail } from 'test/builders/model/selectPassengersPageBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };
const {
  AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE,
  AIR_CHANGE__RESET_PAYMENT_INFO,
  AIR_CHANGE__RESET_FLOW_DATA,
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION,
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS,
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_FAILED,
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS,
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS_SUCCESS,
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS_FAILED,
  AIR_CHANGE__FETCH_PASSENGER_INFO,
  AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
  AIR_CHANGE__FETCH_PASSENGER_INFO_FAILED,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_FAILED,
  AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
  AIR_CHANGE__UPDATE_CONTACT_METHOD,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__SAVE_PNR,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_FAILED,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_FAILED,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_FAILED,
  AIR_CHANGE__SAVE_REACCOM_PNR,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_FAILED
} = airChangeActionTypes;

const { CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD } = contactMethodActionTypes;
const { window } = BrowserObject;
const { SET_FLOW_STATUS } = FlowStatusActionTypes;

const sinon = sandbox.create();
const mockStore = createMockStore();
const { SHARED__RESET_CALCULATE_FLOW_DATA } = SharedActionTypes;
const MockResetCalculateFlowData = { type: SHARED__RESET_CALCULATE_FLOW_DATA };
const { CREDIT_CARD__SET_SAVED_CREDIT_CARDS } = CreditCardActionTypes;
const airChangeResetPaymentInfoAction = { type: AIR_CHANGE__RESET_PAYMENT_INFO };
const resetReaccomConfirmationPageAction = { type: AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE };
const resetSavedCreditCardsMockAction = { type: 'resetSavedCreditCardsMockAction' };

_.set(window, 'navigator.vibrate', _.noop);

describe('airChangeActions', () => {
  let store;

  beforeEach(() => {
    sinon.stub(ApplyTravelFunds, 'resetCalculateFlowData').returns(MockResetCalculateFlowData);
    sinon.stub(CreditCardActions, 'resetSavedCreditCards').returns(resetSavedCreditCardsMockAction);
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('updateContactMethod', () => {
    it('should dispatch updateContactMethod', () => {
      const contactMethodInfo = {
        contactMethod: 'TEXT',
        declineNotifications: 'false',
        email: null,
        phoneCountryCode: '1',
        phoneNumber: '123456789',
        preferredLanguage: 'EN'
      };
      const expectedActions = [
        {
          type: AIR_CHANGE__UPDATE_CONTACT_METHOD,
          contactMethodInfo
        }
      ];

      store.dispatch(AirChangeActions.updateContactMethod(contactMethodInfo));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('fareSelected', () => {
    const pricingFake = (changePricingPage, allSelectedProducts, isLoggedIn, shouldResetCalculateFundsFlow) => ({
      type: 'AIR_CHANGE__STUB_PRICING_ACTION',
      data: {
        changePricingPage,
        allSelectedProducts,
        isLoggedIn,
        shouldResetCalculateFundsFlow
      }
    });
    const showDialogActionType = 'SHOW_DIALOG_STUB_ACTION';
    const hideDialogActionType = 'HIDE_DIALOG_STUB_ACTION';
    const flightCardIndex = 42;
    const productId = 'theSelectFareProductId';
    const fareProductId = productId;
    const sortByValue = 'departureTime';
    const fareProduct = {
      _meta: {
        productId
      }
    };
    const checkedInNotice = {
      title: 'You must check in again for all of your flights.',
      message: 'We will delete your existing boarding passes.'
    };

    beforeEach(() => {
      sinon.stub(DialogActions, 'showDialog').callsFake((args) => ({
        type: showDialogActionType,
        args
      }));
      sinon.stub(DialogActions, 'hideDialog').callsFake(() => (dispatch) => {
        dispatch({
          type: hideDialogActionType
        });

        return {
          then: (resolve) => {
            resolve();
          }
        };
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should go to next results selection page page when outbound and second bound exists', () => {
      const direction = 'outbound';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId,
          flightProductType: 'NORMAL'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isLoggedIn: true,
        fareProduct,
        sortByValue,
        selectedBounds: {
          secondbound: true
        },
        page: {
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _meta: {},
          _links: changeShoppingPage._links
        }
      };

      store.dispatch(AirChangeActions.fareSelected(selectedFare));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
          selectedProducts: expectedSelectProducts
        },
        {
          type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
          shouldForbidForward: false
        },
        {
          type: 'AIR_CHANGE__SORT_SHOPPING_PAGE_BY',
          direction: 'inbound', // the next bound type
          sortStrategy: sortByValue
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: [getNormalizedRoute({ routeName: 'flightShopping' })],
            method: 'push'
          }
        }
      ]);
    });

    it('should go to price page when outbound and there is no inbound', () => {
      const direction = 'outbound';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId,
          flightProductType: 'NORMAL'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isLoggedIn: false,
        fareProduct,
        selectedBounds: {
          secondbound: false
        },
        page: {
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _meta: {},
          _links: changeShoppingPage._links
        }
      };

      store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
          selectedProducts: expectedSelectProducts
        },
        {
          type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
          shouldForbidForward: false
        },
        {
          type: 'AIR_CHANGE__STUB_PRICING_ACTION',
          data: {
            allSelectedProducts: expectedSelectProducts,
            changePricingPage: changeShoppingPage._links.changePricingPage,
            isLoggedIn: false,
            shouldResetCalculateFundsFlow: true
          }
        }
      ]);
    });

    it('should go to price page with correct product-type when dynamic waiver', () => {
      const direction = 'inbound';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId,
          flightProductType: 'DYNAMIC_WAIVER'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isDynamicWaiver: true,
        isLoggedIn: true,
        fareProduct,
        selectedBounds: {
          secondbound: false
        },
        page: {
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _meta: {},
          _links: changeShoppingPage._links
        }
      };

      store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
          selectedProducts: expectedSelectProducts
        },
        {
          type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
          shouldForbidForward: false
        },
        {
          type: 'AIR_CHANGE__STUB_PRICING_ACTION',
          data: {
            allSelectedProducts: expectedSelectProducts,
            changePricingPage: changeShoppingPage._links.changePricingPage,
            isLoggedIn: true,
            shouldResetCalculateFundsFlow: true
          }
        }
      ]);
    });

    it('should go to price page when the current bound is inbound', () => {
      const direction = 'inbound';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId,
          flightProductType: 'NORMAL'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isLoggedIn: true,
        fareProduct,
        selectedBounds: {
          secondbound: false
        },
        page: {
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _meta: {},
          _links: changeShoppingPage._links
        }
      };

      store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
          selectedProducts: expectedSelectProducts
        },
        {
          type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
          shouldForbidForward: false
        },
        {
          type: 'AIR_CHANGE__STUB_PRICING_ACTION',
          data: {
            allSelectedProducts: expectedSelectProducts,
            changePricingPage: changeShoppingPage._links.changePricingPage,
            isLoggedIn: true,
            shouldResetCalculateFundsFlow: true
          }
        }
      ]);
    });

    describe('with checkin', () => {
      const direction = 'inbound';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId,
          flightProductType: 'NORMAL'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isLoggedIn: true,
        fareProduct,
        selectedBounds: {
          secondbound: false
        },
        page: {
          checkedInNotice,
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _links: changeShoppingPage._links
        }
      };

      it('should open warning dialog when no remaining bounds to select', () => {
        store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

        const actions = store.getActions();

        expect(actions.length).to.equal(3);
        const dialogAction = actions[2];

        expect(dialogAction.type).to.equal(showDialogActionType);
        const okFunction = dialogAction.args.buttons[0].onClick;
        const cancelFunction = dialogAction.args.buttons[1].onClick;

        expect(store.getActions()).to.deep.equal([
          {
            type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
            selectedProducts: expectedSelectProducts
          },
          {
            type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
            shouldForbidForward: false
          },
          {
            type: showDialogActionType,
            args: {
              title: 'You must check in again for all of your flights.',
              message: 'We will delete your existing boarding passes.',
              buttons: [
                {
                  label: 'OK',
                  onClick: okFunction
                },
                {
                  label: 'Cancel',
                  onClick: cancelFunction
                }
              ]
            }
          }
        ]);
      });

      it('should close warning dialog when cancel clicked', () => {
        store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

        const actions = store.getActions();
        const dialogAction = actions[2];
        const cancelFunction = dialogAction.args.buttons[1].onClick;

        store.clearActions();
        cancelFunction();
        expect(store.getActions()).to.deep.equal([
          {
            type: 'HIDE_DIALOG_STUB_ACTION'
          }
        ]);
      });

      it('should close warning dialog and continue to price page when ok clicked', () => {
        store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

        const actions = store.getActions();
        const dialogAction = actions[2];
        const okFunction = dialogAction.args.buttons[0].onClick;

        store.clearActions();
        okFunction();
        expect(store.getActions()).to.deep.equal([
          {
            type: 'HIDE_DIALOG_STUB_ACTION'
          },
          {
            type: 'AIR_CHANGE__STUB_PRICING_ACTION',
            data: {
              allSelectedProducts: expectedSelectProducts,
              changePricingPage: changeShoppingPage._links.changePricingPage,
              isLoggedIn: true,
              shouldResetCalculateFundsFlow: true
            }
          }
        ]);
      });
    });

    it('should go to reaccom page when there no remaining bounds to select - even if checked-in', () => {
      const direction = 'outbound';
      const reaccomProductId = 'theReaccomProductId';
      const expectedSelectProducts = {
        [direction]: {
          flightCardIndex,
          fareProductId: reaccomProductId,
          flightProductType: 'NORMAL'
        }
      };
      const selectedFare = {
        flightCardIndex,
        isLoggedIn: true,
        isReaccom: true,

        fareProduct: {
          _meta: {
            reaccomProductId
          }
        },
        selectedBounds: {
          secondbound: false
        },
        page: {
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' },
          _meta: {
            isCheckedIn: true
          },
          _links: changeShoppingPage._links
        }
      };

      store.dispatch(AirChangeActions.fareSelected(selectedFare, pricingFake));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS',
          selectedProducts: expectedSelectProducts
        },
        {
          type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
          shouldForbidForward: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: [getNormalizedRoute({ routeName: 'reaccom' })],
            method: 'push'
          }
        }
      ]);
    });

    describe('reaccom newProducts', () => {
      const transformToFlightSummaryStub = sinon.stub().returns({ test: 'testProduct' });
      const airChangeActions = proxyquire('src/airChange/actions/airChangeActions', {
        'src/airChange/transformers/airReaccomTripSummaryTransformer': {
          transformToFlightSummary: transformToFlightSummaryStub
        }
      });
      const direction = 'outbound';
      const reaccomProductId = 'theReaccomProductId';
      let expectedSelectProducts = {
        [direction]: {
          fareProductId: reaccomProductId,
          flightCardIndex,
          flightProductType: 'NORMAL'
        },
        newProducts: {
          outbound: {
            test: 'testProduct'
          }
        }
      };
      let selectedFare = {
        fareProduct: {
          _meta: {
            reaccomProductId
          }
        },
        flightCardIndex,
        isLoggedIn: true,
        isReaccom: true,
        page: {
          _links: changeShoppingPage._links,
          _meta: {
            isCheckedIn: true
          },
          flightBoundPageInfo: changeShoppingPage.flights.outboundPage,
          isChangingTwoBounds: false,
          isOutbound: direction === 'outbound',
          params: { direction, paxType: 'adult' }
        },
        selectedBounds: {
          secondbound: false
        }
      };

      it('should return correct newProducts values when isChangingTwoBounds is false', () => {
        store.dispatch(airChangeActions.fareSelected(selectedFare, pricingFake));

        expect(transformToFlightSummaryStub).to.have.been.called;
        expect(store.getActions()[0]).to.deep.equal({
          selectedProducts: expectedSelectProducts,
          type: 'AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS'
        });
      });

      it('should return correct newProducts values when isChangingTwoBounds is true', () => {
        expectedSelectProducts = {
          ...expectedSelectProducts,
          newProducts: {
            inbound: {
              test: 'testProduct'
            },
            outbound: {
              test: 'testProduct'
            }
          }
        };
        selectedFare = {
          ...selectedFare,
          selectedProducts: {
            newProducts: {
              inbound: {
                test: 'testProduct'
              }
            }
          },
          page: {
            ...selectedFare.page,
            isChangingTwoBounds: true
          }
        };

        store.dispatch(airChangeActions.fareSelected(selectedFare, pricingFake));

        expect(transformToFlightSummaryStub).to.have.been.called;
        expect(store.getActions()[0]).to.deep.equal({
          selectedProducts: expectedSelectProducts,
          type: 'AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS'
        });
      });
    });
  });

  describe('selectedFlight', () => {
    beforeEach(() => {
      sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
    });

    it('should save selected flight and then go to the select-fare page', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'outbound', paxType: 'adult' }
        },
        currentDirection: 'outbound'
      };

      store.dispatch(AirChangeActions.selectFare(selectedFlight));

      expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('select new fare page');
    });

    it('should save selected flight and then go to the select-fare page with default paxType - adult', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'DAL-SEA',
          params: { direction: 'outbound' }
        },
        currentDirection: 'outbound'
      };
      const expectedResult = [
        {
          selectedFlight: {
            currentDirection: 'outbound',
            flightDetails: {
              airportInfo: 'DAL-SEA',
              params: {
                direction: 'outbound',
                paxType: 'adult'
              }
            }
          },
          type: 'AIR_CHANGE__SAVE_SELECTED_FLIGHT'
        },
        {
          payload: {
            args: ['/air/change/outbound/select-fare'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(AirChangeActions.selectFare(selectedFlight));
      const result = await store.getActions();

      expect(result).to.eql(expectedResult);
    });
  });

  describe('saveSelectedBounds', () => {
    it('should dispatch saveSelectedBounds', () => {
      const expectedActions = [
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_BOUNDS',
          selectedBounds: { secondbound: true }
        }
      ];

      store.dispatch(AirChangeActions.saveSelectedBounds({ secondbound: true }));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('sortAirChangeShoppingPage', () => {
    it('should dispatch sortAirChangeShoppingPage with action AIR_CHANGE__SORT_SHOPPING_PAGE_BY  when isReaccom is false', () => {
      const expectedActions = [
        {
          type: 'AIR_CHANGE__SORT_SHOPPING_PAGE_BY',
          sortStrategy: 'durationMinutes',
          direction: OUTBOUND
        }
      ];

      store.dispatch(AirChangeActions.sortAirChangeShoppingPage('durationMinutes', OUTBOUND, false));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch sortAirChangeShoppingPage with action AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY  when isReaccom is false', () => {
      const expectedActions = [
        {
          type: 'AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY',
          sortStrategy: 'durationMinutes',
          direction: OUTBOUND
        }
      ];

      store.dispatch(AirChangeActions.sortAirChangeShoppingPage('durationMinutes', OUTBOUND, true));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('clearSelectedProducts', () => {
    it('should dispatch action AIR_CHANGE__CLEAR_SELECTED_PRODUCTS when isReaccom is false', () => {
      const expectedActions = [
        {
          type: 'AIR_CHANGE__CLEAR_SELECTED_PRODUCTS'
        }
      ];

      store.dispatch(AirChangeActions.clearSelectedProducts(false));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch action AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS when isReaccom is true', () => {
      const expectedActions = [
        {
          type: 'AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS'
        }
      ];

      store.dispatch(AirChangeActions.clearSelectedProducts(true));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('savePNR', () => {
    it('should call actions with the correct pnr info', () => {
      const pnr = {
        confirmationNumber: 'ABD679',
        firstName: 'first name',
        lastName: 'last name'
      };

      store.dispatch(AirChangeActions.savePNR(pnr));
      expect(store.getActions()[0]).to.deep.equal({
        type: 'AIR_CHANGE__SAVE_PNR',
        pnr
      });
    });
  });

  describe('resetReaccomConfirmationPage', () => {
    it('should reset air change reaccom confirmation page data', () => {
      store.dispatch(AirChangeActions.resetReaccomConfirmationPage());
      expect(store.getActions()).to.deep.equal([
        {
          type: AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE
        }
      ]);
    });
  });

  describe('resetAirChangeData', () => {
    it('should reset air change payment info, reset reaccom confirmation page and saved credit cards', () => {
      const expectedActions = [
        MockResetCalculateFlowData,
        resetReaccomConfirmationPageAction,
        airChangeResetPaymentInfoAction,
        resetSavedCreditCardsMockAction
      ];

      store.dispatch(AirChangeActions.resetAirChangeData());

      const action = store.getActions();

      expect(action).to.deep.equal(expectedActions);
    });
  });

  describe('resetPaymentInfo', () => {
    it('should reset payment info', () => {
      store.dispatch(AirChangeActions.resetPaymentInfo());
      expect(store.getActions()).to.deep.equal([airChangeResetPaymentInfoAction]);
    });
  });

  describe('reset AirChange flow data', () => {
    it('should dispatch reset flow data action', () => {
      store.dispatch(AirChangeActions.resetAirChangeFlowData());
      expect(store.getActions()).to.deep.equal([
        {
          type: AIR_CHANGE__RESET_FLOW_DATA
        }
      ]);
    });
  });

  describe('searchForFlights', () => {
    let goToNextPathStub, options;

    beforeEach(() => {
      options = {
        searchRequest: {
          href: 'url',
          from: 'DAL',
          to: 'AUS',
          departureDate: '2019-04-17'
        },
        changeShoppingLink: {
          href: 'url',
          method: 'POST'
        },
        selectedBounds: {
          firstBound: true,
          secondBound: false
        },
        boundSelections: []
      };
      sinon.stub(AirChangeApi, 'findFlightProducts');
      sinon.stub(store2.session, 'remove');
      sinon.stub(shoppingSearchHelper, 'generateSearchRequest').returns('api request');
      goToNextPathStub = sinon.stub();
    });

    it('should delete PayPal data when start to search flights', () => {
      AirChangeApi.findFlightProducts.returns(Q('response'));

      return store.dispatch(AirChangeActions.searchForFlights(options, goToNextPathStub)).then(() => {
        expect(store2.session.remove).to.have.been.called;
      });
    });

    it('should call actions with the correct order when AirChangeApi.flightShopping success', () => {
      AirChangeApi.findFlightProducts.returns(Q('response'));

      return store.dispatch(AirChangeActions.searchForFlights(options, goToNextPathStub)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING',
            isFetching: true
          },
          {
            fieldName: 'departureAndReturnDate',
            formId: 'AIR_CHANGE_SHOPPING_SEARCH_FORM',
            type: 'UPDATE_FORM_FIELD_DATA_VALUE',
            url: '/',
            value: undefined
          },
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS',
            response: 'response',
            isFetching: false
          },
          {
            searchRequest: {
              from: 'DAL',
              href: 'url',
              to: 'AUS',
              departureDate: '2019-04-17'
            },
            type: 'AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST'
          }
        ]);
        expect(goToNextPathStub).to.have.been.called;
      });
    });

    it('should call actions with the correct order when AirChangeApi.flightShopping failed', async () => {
      AirChangeApi.findFlightProducts.returns(Q.reject('error'));

      await store.dispatch(AirChangeActions.searchForFlights(options, goToNextPathStub));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
          isFetching: true
        },
        {
          type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
      expect(goToNextPathStub).to.have.not.been.called;
    });

    describe('when no-routes-error received for a route that includes Hawaii', () => {
      let getContentStub, showDialogStub;

      const error = {
        responseJSON: {
          code: 400310589,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      };

      beforeEach(() => {
        AirChangeApi.findFlightProducts.returns(Q.reject(error));
        showDialogStub = sinon.stub(DialogActions, 'showDialog');
        getContentStub = sinon.stub(ContentDeliveryApi, 'getContent');
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should dispatch customized dialog using content from ContentDeliveryApi', () => {
        getContentStub.returns(Q(new HawaiiNoRoutesPopupErrorBuilder().build()));

        return store.dispatch(AirChangeActions.searchForFlights({ options, goToNextPathStub })).then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
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
          expect(DialogActions.showDialog.args[0][0]).to.contain({
            title: 'Test: Trying to get to Hawaii?'
          });
          expect(showDialogStub.args[0][0].error).to.deep.equal({
            responseJSON: {
              code: 400310589,
              message: 'message',
              requestId: 'mkddk90:mweb',
              httpStatusCode: '3008333'
            },
            $customized: true
          });
        });
      });

      it('should dispatch normal error dialog when call to ContentDeliveryApi fails', async () => {
        getContentStub.returns(Q.reject({ error: 'WCM Content Service error' }));

        await store.dispatch(AirChangeActions.searchForFlights({ options, goToNextPathStub })).then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
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
        expect(showDialogStub.args[0][0]).to.contain({
          title: i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE')
        });
        expect(showDialogStub.args[0][0].error).to.deep.equal({
          responseJSON: {
            code: 400310589,
            message: 'message',
            requestId: 'mkddk90:mweb',
            httpStatusCode: '3008333'
          },
          $customized: true
        });
      });
    });

    describe('when no-routes-error received for an invalid bound request on a non-Hawaii dynamic waiver route', () => {
      beforeEach(() => {
        AirChangeApi.findFlightProducts.returns(
          Q.reject({
            responseJSON: {
              code: 400310306,
              message: 'No flights were found for your search',
              messageKey: 'ERROR_AIR_TRAVEL__INVALID_BOUND_REQUESTED'
            }
          })
        );
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should dispatch showDialog action with returnToChangeShoppingPage call back when it comes from IB', () => {
        const transformToNoRoutesErrorDialogOptionsSpy = sinon.spy(
          flightProductSearchRequestTransformers,
          'transformToNoRoutesErrorDialogOptions'
        );

        return store.dispatch(AirChangeActions.searchForFlights(options, goToNextPathStub)).then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
            error: {
              responseJSON: {
                code: 400310306,
                message: 'No flights were found for your search',
                messageKey: 'ERROR_AIR_TRAVEL__INVALID_BOUND_REQUESTED'
              },
              $customized: true
            },
            isFetching: false
          });

          const showDialogAction = actions[2];

          expect(showDialogAction.type).to.equal('TOGGLE_DIALOG');
          expect(showDialogAction.isShowDialog).to.be.true;
          expect(showDialogAction.options.active).to.be.true;
          expect(showDialogAction.options.closeLabel).to.equal('OK');
          expect(showDialogAction.options.message).to.equal(i18n('ERROR__NO_ROUTES_EXISTS'));
          expect(showDialogAction.options.name).to.equal('no-routes-non-hawaii-error');
          expect(showDialogAction.options.title).to.equal(i18n('ERROR__NO_ROUTES_EXISTS_HEADER'));
          expect(showDialogAction.options.verticalLinks.links[0].isExternal).to.be.true;
          expect(showDialogAction.options.verticalLinks.links[0].href).to.equal(
            'https://www.southwest.com/air/flight-schedules/?destinationAirportCode=AUS&originationAirportCode=DAL&departureDate=2019-04-17'
          );
          expect(showDialogAction.options.verticalLinks.links[0].label).to.equal('Learn More');
          expect(transformToNoRoutesErrorDialogOptionsSpy.args[0]).to.have.lengthOf(4);
        });
      });

      it('should dispatch showDialog action without returnToChangeShoppingPage call back when it comes from search page', () => {
        const pathname = getNormalizedRoute({ routeName: 'flightShoppingIndex' });
        const transformToNoRoutesErrorDialogOptionsSpy = sinon.spy(
          flightProductSearchRequestTransformers,
          'transformToNoRoutesErrorDialogOptions'
        );

        return store.dispatch(AirChangeActions.searchForFlights(options, goToNextPathStub, pathname)).then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED,
            error: {
              responseJSON: {
                code: 400310306,
                message: 'No flights were found for your search',
                messageKey: 'ERROR_AIR_TRAVEL__INVALID_BOUND_REQUESTED'
              },
              $customized: true
            },
            isFetching: false
          });

          const showDialogAction = actions[2];

          expect(showDialogAction.type).to.equal('TOGGLE_DIALOG');
          expect(showDialogAction.isShowDialog).to.be.true;
          expect(showDialogAction.options.active).to.be.true;
          expect(showDialogAction.options.closeLabel).to.equal('OK');
          expect(showDialogAction.options.message).to.equal(i18n('ERROR__NO_ROUTES_EXISTS'));
          expect(showDialogAction.options.name).to.equal('no-routes-non-hawaii-error');
          expect(showDialogAction.options.title).to.equal(i18n('ERROR__NO_ROUTES_EXISTS_HEADER'));
          expect(showDialogAction.options.verticalLinks.links[0].isExternal).to.be.true;
          expect(showDialogAction.options.verticalLinks.links[0].href).to.equal(
            'https://www.southwest.com/air/flight-schedules/?destinationAirportCode=AUS&originationAirportCode=DAL&departureDate=2019-04-17'
          );
          expect(showDialogAction.options.verticalLinks.links[0].label).to.equal('Learn More');
          expect(transformToNoRoutesErrorDialogOptionsSpy.args[0]).to.have.lengthOf(3);
        });
      });
    });
  });

  describe('get payment options', () => {
    it('should save payment options when api call success', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

      return store.dispatch(AirChangeActions.getPaymentOptions()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AIR_CHANGE__FETCH_PAYMENT_OPTIONS
          },
          {
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage',
            type: CREDIT_CARD__SET_SAVED_CREDIT_CARDS
          },
          {
            type: AIR_CHANGE__FETCH_PAYMENT_OPTIONS_SUCCESS,
            response: 'paymentSavedCreditCardsPage',
            isFetching: false
          }
        ]);
      });
    });

    it('should dispatch correct actions when api call fail', () => {
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject({ errMsg: 'errMsg' }));

      return store.dispatch(AirChangeActions.getPaymentOptions()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AIR_CHANGE__FETCH_PAYMENT_OPTIONS
          },
          {
            type: AIR_CHANGE__FETCH_PAYMENT_OPTIONS_FAILED,
            error: { errMsg: 'errMsg' },
            isFetching: false
          }
        ]);
      });
    });
  });

  describe('get passenger info', () => {
    it('should save payment options when api call success', () => {
      const passengerDetailsPageResponse = new PassengerInformationBuilder()
        .withContactMethodAsTEXT('1', '123456789')
        .build();

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirChangeActions.getPassengerInfo(false)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AIR_CHANGE__FETCH_PASSENGER_INFO
          },
          {
            type: 'AIR_CHANGE__SAVE_CONTACT_INFORMATION',
            contactMethodInfo: {
              contactMethod: 'TEXT',
              declineNotifications: false,
              email: null,
              phoneCountryCode: '1',
              phoneNumber: '123456789',
              preferredLanguage: 'EN',
              isNotificationsEnabled: true
            }
          },
          {
            type: AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
            response: passengerDetailsPageResponse.passengerDetailsPage,
            isFetching: false
          }
        ]);
      });
    });

    it('should not save contact method when is international flight with contact method is call', () => {
      const passengerDetailsPageResponse = new PassengerInformationBuilder()
        .withContactMethodAsCALL('1', '123456789')
        .build();

      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q(passengerDetailsPageResponse));

      return store.dispatch(AirChangeActions.getPassengerInfo(true)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AIR_CHANGE__FETCH_PASSENGER_INFO
          },
          {
            type: 'AIR_CHANGE__SAVE_CONTACT_INFORMATION',
            contactMethodInfo: {}
          },
          {
            type: AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
            response: passengerDetailsPageResponse.passengerDetailsPage,
            isFetching: false
          }
        ]);
      });
    });

    it('should dispatch correct actions when api call fail', () => {
      sinon.stub(FlightBookingApi, 'fetchPassengerInfo').returns(Q.reject({ errMsg: 'errMsg' }));

      return store.dispatch(AirChangeActions.getPassengerInfo()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: AIR_CHANGE__FETCH_PASSENGER_INFO
          },
          {
            type: AIR_CHANGE__FETCH_PASSENGER_INFO_FAILED,
            error: { errMsg: 'errMsg' },
            isFetching: false
          }
        ]);
      });
    });
  });

  describe('goToPricingReview', () => {
    const request = {
      href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
      method: 'POST',
      body: {
        changeRequests: [
          {
            productId: 'mock product id 1',
            boundReference: 'mock bound reference 1'
          },
          {
            productId: 'mock product id 2',
            boundReference: 'mock bound reference 2'
          }
        ]
      }
    };

    const getSuccessResult = (response, successRoute) => [
      {
        type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
        request,
        isFetching: true
      },
      {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
      },
      {
        type: 'SET_FLOW_STATUS',
        flowName: 'airChange',
        status: 'in_progress'
      },
      clearFormDataByIdStub,
      clearFormDataByIdStub,
      clearFormDataByIdStub,
      {
        type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
        response,
        isFetching: false
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          method: 'push',
          args: [successRoute]
        }
      }
    ];

    it('should call actions with the correct order and push to the repricing page when AirChangeApi.getPricing is successful and shouldShowRepriceNotification is true', async () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: true,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      const expectedResult = getSuccessResult(response, getNormalizedRoute({ routeName: 'reprice' }));

      sinon.stub(AirChangeApi, 'getPricing').returns(Promise.resolve(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      await store.dispatch(AirChangeActions.goToPricingReview(request, false, false));

      const result = await store.getActions();

      expect(result).to.eql(expectedResult);
    });

    it('should call actions with the correct order and push to the pricing review when AirChangeApi.getPricing is successful and shouldShowRepriceNotification is false', async () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            changeConfirmationPage: {
              href: '/v1/mobile-air-booking/page/flights/change',
              method: 'PUT'
            }
          }
        }
      };
      const expectedResult = getSuccessResult(response, getNormalizedRoute({ routeName: 'reconcile' }));

      sinon.stub(AirChangeApi, 'getPricing').returns(Promise.resolve(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      await store.dispatch(AirChangeActions.goToPricingReview(request, false, false));

      const result = await store.getActions();

      expect(result).to.eql(expectedResult);
    });

    it('should call actions with the correct order when the request fails', async () => {
      const errorResponse = { errorMsg: 'mock error message' };
      const expectedResult = [
        {
          type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
          request,
          isFetching: true
        },
        {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        },
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'airChange',
          status: 'in_progress'
        },
        {
          type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_FAILED',
          error: errorResponse,
          isFetching: false
        }
      ];

      sinon.stub(AirChangeApi, 'getPricing').returns(Promise.reject(errorResponse));

      await store.dispatch(AirChangeActions.goToPricingReview(request));

      const result = await store.getActions();

      expect(result).to.eql(expectedResult);
    });
  });

  describe('goToPricing', () => {
    const nextPath = 'some path';
    const searchRequest = {
      href: 'url',
      method: 'POST',
      body: {
        changeRequests: [
          {
            productId: 'string',
            boundReference: 'string'
          }
        ]
      }
    };

    beforeEach(() => {
      sinon.stub(AirChangeApi, 'getPricing');
    });

    it('should call actions with the correct order and push to repricing page when AirChangeApi.getPricing success and shouldShowRepriceNotification is true', () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: true,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));

      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
            response,
            isFetching: false
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              method: 'push',
              args: [getNormalizedRoute({ routeName: 'reprice' })]
            }
          }
        ]);
      });
    });

    it('should call actions with the correct order and push to pricing page when AirChangeApi.getPricing success and shouldShowRepriceNotification is false', () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
            response,
            isFetching: false
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              method: 'push',
              args: [getNormalizedRoute({ routeName: 'price' })]
            }
          }
        ]);
      });
    });

    it('should push to pricing summary when AirChangeApi.getPricing success and shouldShowRepriceNotification is false', () => {
      const url = getNormalizedRoute({ routeName: 'price' });
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions[6]).to.deep.equal({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: [url]
          }
        });
      });
    });

    it('should clear the applyTravelFunds flow if boolean is passed as true', () => {
      const clearApplyTravelFundsFlow = true;
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store
        .dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false, clearApplyTravelFundsFlow))
        .then(() => {
          const actions = store.getActions();

          expect(actions[2]).to.deep.equal({
            type: 'SHARED__RESET_CALCULATE_FLOW_DATA'
          });
        });
    });

    it('should not handle navigation if ignoreNavigationLogic is passed as true', () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: true,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: 'qwer7890',
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false, false, true)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
            response,
            isFetching: false
          }
        ]);
      });
    });

    it('should not fail even if calculateFunds is null ', () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            calculateFunds: null
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
            response,
            isFetching: false
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              method: 'push',
              args: [getNormalizedRoute({ routeName: 'price' })]
            }
          }
        ]);
      });
    });

    it('should not fail even if fundsAppliedToken is null ', () => {
      const response = {
        changePricingPage: {
          isRepriceNotification: false,
          _links: {
            calculateFunds: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'POST',
              body: {
                fundsAppliedToken: null,
                itineraryPricingToken: 'asdf1234'
              }
            }
          }
        }
      };

      AirChangeApi.getPricing.returns(Q(response));
      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
            response,
            isFetching: false
          },
          {
            type: '@@router/CALL_HISTORY_METHOD',
            payload: {
              method: 'push',
              args: [getNormalizedRoute({ routeName: 'price' })]
            }
          }
        ]);
      });
    });

    it('should call actions with the correct order when AirChangeApi.goToPricing failed (not 400310756 funds error)', () => {
      AirChangeApi.getPricing.returns(Q.reject('error'));

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING',
            request: searchRequest,
            isFetching: true
          },
          {
            type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
          },
          {
            type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_FAILED',
            error: 'error',
            isFetching: false
          }
        ]);
      });
    });

    it('should call actions to display popup dialog AirChangeApi.goToPricing failed with 400310756 funds error', () => {
      AirChangeApi.getPricing.returns(Q.reject({ responseJSON: { code: 400310756 } }));

      return store.dispatch(AirChangeActions.goToPricing(searchRequest, nextPath, false)).then(() => {
        const actions = store.getActions();

        expect(actions[2]).to.deep.contain({
          type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_FAILED',
          isFetching: false
        });
        expect(actions[3]).to.contain({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true
        });
      });
    });
  });

  describe('saveSelectedProducts', () => {
    let selectedProducts;

    beforeEach(() => {
      selectedProducts = {
        outbound: {
          fareProductId: 'fare product id outbound',
          flightCardIndex: 0
        },
        inbound: {
          fareProductId: 'fare product id inbound',
          flightCardIndex: 1
        }
      };
    });

    it('should save selectedProducts with AIR_CHANGE__SAVE_SELECTED_PRODUCTS action when isReaccom is false', () => {
      store.dispatch(AirChangeActions.saveSelectedProducts(selectedProducts, false));
      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
          selectedProducts
        }
      ]);
    });

    it('should save selectedProducts with AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS action when isReaccom is true', () => {
      store.dispatch(AirChangeActions.saveSelectedProducts(selectedProducts, true));
      expect(store.getActions()).to.deep.equal([
        {
          type: 'AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS',
          selectedProducts
        }
      ]);
    });
  });

  describe('changeFlight', () => {
    const changeConfirmationPageLink = {
      href: '/v1/mobile-air-booking/page/flights/change',
      method: 'PUT',
      xhref: '/v1/mobile-air-booking/page/flights/x-change',
      body: {
        changeSession: {
          inboundBoundReference: null,
          outboundBoundReference: 'changeSession'
        },
        productIdToken: {
          inbound: null,
          outbound: 'outbound'
        },
        newFlightToken: 'newFlightToken'
      }
    };

    const fightChangeDownGradeRequestData = {
      emailReceiptTo: '',
      refundMethod: 'HOLD_FUTURE_USE',
      contactMethodInfo: {
        contactMethod: 'TEXT',
        email: null,
        phoneNumber: '980-700-7070',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: 'false',
        saveContactMethod: true
      }
    };

    let generateChangeRequestStub;

    beforeEach(() => {
      generateChangeRequestStub = sinon.stub(changeRequestHelper, 'generateChangeRequest');
    });

    it('should dispatch expected actions when changeFlight success', () => {
      sinon.stub(AirChangeApi, 'changePurchase').returns(Promise.resolve({ changeConfirmation: 'changeConfirmation' }));
      sinon.stub(AccountsApi, 'saveContactMethod').returns(Promise.resolve({}));

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeDownGradeRequestData, changeConfirmationPageLink, false))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            {
              isFetching: true,
              type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION
            },
            {
              isFetching: false,
              response: 'changeConfirmation',
              type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS
            },
            {
              flowName: 'airChange',
              status: STATUS.COMPLETED,
              type: SET_FLOW_STATUS
            },
            {
              payload: {
                args: [getNormalizedRoute({ routeName: 'confirmation' })],
                method: 'push'
              },
              type: CALL_HISTORY_METHOD
            },
            {
              type: CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD
            },
            {
              type: 'CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_SUCCESS'
            }
          ]);

          expect(generateChangeRequestStub).to.have.been.calledWith(
            fightChangeDownGradeRequestData,
            changeConfirmationPageLink
          );
        });
    });

    it('should play haptic feedback when change succeeds', () => {
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      sinon.stub(AirChangeApi, 'changePurchase').resolves({ changeConfirmation: 'changeConfirmation' });

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeDownGradeRequestData, changeConfirmationPageLink, false))
        .then(() => {
          expect(playHapticFeedbackStub).to.have.been.called;
        });
    });

    it('should dispatch save contact method actions when choose to save and upgradeFlight success', () => {
      sinon.stub(AirChangeApi, 'changePurchase').returns(Q({ changeConfirmation: 'changeConfirmation' }));
      sinon.stub(AccountsApi, 'saveContactMethod').returns(Q());

      const paymentInfo = Object.assign({}, getPaymentInfoForUseNewCreditCard());
      const fightChangeUpGradeRequestData = {
        emailReceiptTo: '',
        paymentInfo,
        paymentRequired: true,
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false',
          saveContactMethod: true
        }
      };

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeUpGradeRequestData, changeConfirmationPageLink, true))
        .then(() => {
          const actions = store.getActions();

          expect(actions[4]).to.deep.equal({
            type: 'CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD'
          });
          expect(actions[5]).to.deep.equal({
            type: 'CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_SUCCESS'
          });
        });
    });

    it('should dispatch expected actions when changeFlight fail', () => {
      sinon.stub(AirChangeApi, 'changePurchase').returns(Q.reject({ errorMsg: 'errorMsg' }));

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeDownGradeRequestData, changeConfirmationPageLink, false))
        .then(() => {
          expect(store.getActions()).to.deep.equal([
            {
              isFetching: true,
              type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION
            },
            {
              fieldName: 'securityCode',
              formId: 'AIR_CHANGE_REVIEW_FORM',
              type: 'UPDATE_FORM_FIELD_DATA_VALUE',
              url: '/',
              value: ''
            },
            {
              isFetching: false,
              error: {
                errorMsg: 'errorMsg'
              },
              type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_FAILED
            }
          ]);
        });
    });

    it('should show AFP error if purchase failed and payment method is apple pay', () => {
      sinon.stub(AirChangeApi, 'changePurchase').returns(Q.reject({ errorMsg: 'errorMsg' }));
      const toChapiAfpErrorLogStub = sinon
        .stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog')
        .returns('errorLog');
      const sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');

      generateChangeRequestStub.returns({
        body: {
          payment: {
            newCreditCard: {
              digitalPaymentType: APPLE_PAY.key
            }
          }
        }
      });

      const paymentInfo = Object.assign({}, getPaymentInfoForApplePayCard());
      const fightChangeUpGradeRequestData = {
        emailReceiptTo: '',
        paymentInfo,
        paymentRequired: true,
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false',
          saveContactMethod: true
        }
      };

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeUpGradeRequestData, changeConfirmationPageLink, true))
        .then(() => {
          expect(toChapiAfpErrorLogStub).to.have.been.called;
          expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            isFetching: true,
            type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION
          });

          expect(actions[1]).to.deep.equal({
            fieldName: 'securityCode',
            formId: 'AIR_CHANGE_REVIEW_FORM',
            type: 'UPDATE_FORM_FIELD_DATA_VALUE',
            url: '/',
            value: ''
          });

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
            type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_FAILED
          });
        });
    });

    describe('isApplePay', () => {
      let initiateVoidTransactionStub;
      let isSessionTimeoutErrorStub;
      const paymentInfo = Object.assign({}, getPaymentInfoForApplePayCard());
      const fightChangeUpGradeRequestData = {
        emailReceiptTo: '',
        paymentInfo,
        paymentRequired: true,
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false',
          saveContactMethod: true
        }
      };

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
        sinon.stub(AirChangeApi, 'changePurchase').returns(Promise.reject({ responseJSON: { code: 400310764 } }));
        sinon.stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog').returns('errorLog');
        sinon.stub(LoggingApi, 'sendErrorLog');
        generateChangeRequestStub.returns({
          body: {
            payment: {
              newCreditCard: {
                digitalPaymentType: APPLE_PAY.key
              }
            }
          }
        });
        initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
      });

      it('should call void transaction if changePurchase failed with applePayErrorCode and payment method is apple pay', () => {
        isSessionTimeoutErrorStub.returns(false);

        return store
          .dispatch(AirChangeActions.changeFlight(fightChangeUpGradeRequestData, changeConfirmationPageLink, true))
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
          .dispatch(AirChangeActions.changeFlight(fightChangeUpGradeRequestData, changeConfirmationPageLink, true))
          .then(() => {
            expect(initiateVoidTransactionStub).to.not.have.been.called;

            expect(store.getActions()).to.deep.equal([
              {
                isFetching: true,
                type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION
              },
              {
                fieldName: 'securityCode',
                formId: 'AIR_CHANGE_REVIEW_FORM',
                type: 'UPDATE_FORM_FIELD_DATA_VALUE',
                url: '/',
                value: ''
              },
              {
                isFetching: false,
                type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_FAILED
              }
            ]);
          });
      });
    });

    it('should remove PayPal data in session storage', () => {
      sinon.stub(AirChangeApi, 'changePurchase').returns(Promise.resolve({ changeConfirmation: 'changeConfirmation' }));

      const removePayPalDataStub = sinon.stub(store2.session, 'remove');

      return store
        .dispatch(AirChangeActions.changeFlight(fightChangeDownGradeRequestData, changeConfirmationPageLink, false))
        .then(() => {
          expect(removePayPalDataStub).to.have.been.called;
        });
    });
  });

  describe('resumeAfterLogin', () => {
    it('should generate correct action', () => {
      store.dispatch(AirChangeActions.resumeAfterLogin(false));
      const expectedActions = {
        type: AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
        shouldResume: false
      };

      expect(store.getActions()[0]).to.deep.equal(expectedActions);
    });
  });

  describe('update paymentInfo', () => {
    it('should dispatch save paymentInfo and redirect to review page', () => {
      const paymentInfo = getPaymentInfoForUseNewCreditCard();

      store.dispatch(AirChangeActions.savePaymentInfoAndGoToReviewPage(paymentInfo));
      expect(store.getActions()).to.deep.equal([
        { paymentInfo, type: AIR_CHANGE__SAVE_PAYMENT_INFO },
        {
          payload: {
            args: [],
            method: 'goBack'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          fieldName: 'securityCode',
          formId: 'AIR_CHANGE_REVIEW_FORM',
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          url: '/',
          value: ''
        }
      ]);
    });
  });

  describe('retrieve reservation for Change', () => {
    const viewReservationViewPage = new ViewReservationBuilder().withDayOfTravelContactInfo().build();
    let changeLink;

    beforeEach(() => {
      changeLink = {
        href: '/v1/change/fakeRecordLocator',
        query: { 'first-name': 'firstName', 'last-name': 'lastName' }
      };

      sinon.stub(ReservationApi, 'retrieveReservation').returns(Promise.resolve({
        viewReservationViewPage: {
          ...viewReservationViewPage.viewReservationViewPage,
          _links: {
            change: changeLink
          }
        }
      }));
      sinon.stub(ReservationApi, 'retrieveReservationChangeable').returns(Promise.resolve({
        changeFlightPage: {
          splitPnrDetails: {}
        }
      }));
    });

    it('should call the reservation API when given air change request', async () => {
      await store.dispatch(AirChangeActions.retrieveReservationChangeable(changeLink));

      expect(ReservationApi.retrieveReservationChangeable).to.be.calledWith(changeLink);
    });

    it('should fetch the reservation and change data when hitting the air change page directly with a searchToken and defaulting the asyncChain initiated to false', async () => {
      const searchToken = 'abcde';

      await store.dispatch(AirChangeActions.retrieveReservationChangeableWithSearchToken(searchToken));

      const actions = store.getActions();

      expect(ReservationApi.retrieveReservation).to.be.calledWith({
        hasEditedName: false,
        passengerSearchToken: searchToken,
        recordLocator: 'RECLOC'
      });
      expect(actions[2]).to.deep.equal({
        flowName: 'airChange',
        status: 'in_progress',
        type: 'SET_FLOW_STATUS'
      });
      expect(actions[3]).to.deep.equal(asyncChainStart());
      expect(actions[10]).to.deep.equal(asyncChainFinish());
      expect(ReservationApi.retrieveReservationChangeable).to.be.called;
    });

    it('should fetch the reservation and change data when hitting the air change page directly with a searchToken and setting the asyncChain initiated to true', async () => {
      const searchToken = 'abcde';

      await store.dispatch(AirChangeActions.retrieveReservationChangeableWithSearchToken(searchToken, true));

      const actions = store.getActions();

      expect(ReservationApi.retrieveReservation).to.be.calledWith({
        hasEditedName: false,
        passengerSearchToken: searchToken,
        recordLocator: 'RECLOC'
      });
      expect(ReservationApi.retrieveReservationChangeable).to.be.called;
      expect(actions[2]).to.deep.equal({
        flowName: 'airChange',
        status: 'in_progress',
        type: 'SET_FLOW_STATUS'
      });
      expect(actions[9]).to.deep.equal(asyncChainFinish());
    });

    it('should redirect to the selectPassengers page when hitting the air change page directly with a searchToken and the reservation is a split pnr', async () => {
      const searchToken = 'abcde';

      await store.dispatch(AirChangeActions.retrieveReservationChangeableWithSearchToken(searchToken));

      const actions = store.getActions();

      expect(actions[8]).to.deep.equal({
        flowName: 'airChangeSplitPnr',
        status: 'initial',
        type: 'SET_FLOW_STATUS'
      });
      expect(actions[9]).to.deep.equal({
        payload: { method: 'push', args: [ '/?searchToken=abcde' ] },
        type: '@@router/CALL_HISTORY_METHOD'
      });
    });

    it('should trigger fetchReservationChangeableSuccess action when reservation API success', async () => {
      await store.dispatch(AirChangeActions.retrieveReservationChangeable(changeLink));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          isFetching: true,
          request: changeLink,
          type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE
        },
        {
          type: AIR_CHANGE__RESET_FLOW_DATA
        },
        {
          isFetching: false,
          response: {
            changeFlightPage: {
              splitPnrDetails: {}
            }
          },
          type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS
        },
        {
          pnr: {
            confirmationNumber: 'fakeRecordLocator',
            firstName: 'firstName',
            lastName: 'lastName'
          },
          type: AIR_CHANGE__SAVE_PNR
        }
      ]);
    });

    it('should trigger to fetchReservationChangeableFailed action when reservation API failed', async () => {
      ReservationApi.retrieveReservationChangeable.returns(Promise.reject('error'));

      await store
        .dispatch(AirChangeActions.retrieveReservationChangeable(changeLink))
        .catch((err) => expect(err).to.equal('error'));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
          request: changeLink,
          isFetching: true
        },
        {
          type: AIR_CHANGE__RESET_FLOW_DATA
        },
        {
          type: AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });

  describe('update should forbid forward', () => {
    it('should call actions with the correct flag when pass true', () => {
      store.dispatch(AirChangeActions.updateShouldForbidForward(true));

      expect(store.getActions()[0]).to.deep.equal({
        type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
        shouldForbidForward: true
      });
    });

    it('should call actions with the correct flag when pass false', () => {
      store.dispatch(AirChangeActions.updateShouldForbidForward(false));

      expect(store.getActions()[0]).to.deep.equal({
        type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
        shouldForbidForward: false
      });
    });
  });

  describe('retrieveReaccomFlightProducts', () => {
    let reaccomLink;

    beforeEach(() => {
      reaccomLink = {
        href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/S8JKW6',
        method: 'GET',
        query: {
          'first-name': 'Tang',
          'last-name': 'Phillips'
        }
      };
    });

    it('should call chapi findFlightReaccomProducts when called with the correct link', async () => {
      sinon.stub(AirReaccomApi, 'findFlightReaccomProducts').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.retrieveReaccomFlightProducts(reaccomLink));

      expect(AirReaccomApi.findFlightReaccomProducts).to.be.calledWith(reaccomLink);
    });

    it('should call trigger fetchReaccomFlightPageSuccess and saveReaccomPNR when api returns successfully', async () => {
      sinon.stub(AirReaccomApi, 'findFlightReaccomProducts').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.retrieveReaccomFlightProducts(reaccomLink));

      expect(AirReaccomApi.findFlightReaccomProducts).to.be.calledWith(reaccomLink);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request: reaccomLink,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE
        },
        {
          type: AIR_CHANGE__RESET_FLOW_DATA
        },
        {
          type: AIR_CHANGE__SAVE_REACCOM_PNR,
          pnr: {
            confirmationNumber: 'S8JKW6',
            firstName: 'Tang',
            lastName: 'Phillips'
          }
        },
        {
          isFetching: false,
          response: 'response',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS
        }
      ]);
    });

    it('should call trigger fetchReaccomFlightPageFailed api fails', async () => {
      sinon.stub(AirReaccomApi, 'findFlightReaccomProducts').returns(Promise.reject('error'));
      await store
        .dispatch(AirChangeActions.retrieveReaccomFlightProducts(reaccomLink))
        .catch((err) => expect(err).to.equal('error'));

      expect(AirReaccomApi.findFlightReaccomProducts).to.be.calledWith(reaccomLink);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request: reaccomLink,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE
        },
        {
          type: AIR_CHANGE__RESET_FLOW_DATA
        },
        {
          isFetching: false,
          error: 'error',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_FAILED
        }
      ]);
    });
  });

  describe('searchForReaccomFlights', () => {
    let request;

    beforeEach(() => {
      request = {
        href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
        method: 'POST',
        body: {
          outbound: {
            date: '2019-10-03',
            'origin-airport': 'AUS',
            'destination-airport': 'DAL',
            isChangeBound: true
          },
          inbound: null,
          shareDataToken: 'token'
        }
      };
    });

    it('should call chapi searchForReaccomFlights when called with the correct link', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.searchForReaccomFlights(request));

      expect(AirReaccomApi.findReaccomFlightShopping).to.be.calledWith(request);
    });

    it('should call trigger fetchReaccomFlightShoppingSuccess api returns successfully', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.searchForReaccomFlights(request));

      expect(AirReaccomApi.findReaccomFlightShopping).to.be.calledWith(request);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING
        },
        {
          isFetching: false,
          response: 'response',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS
        }
      ]);
    });

    it('should call trigger fetchReaccomFlightShoppingFailed when api fails', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.reject('error'));
      await store
        .dispatch(AirChangeActions.searchForReaccomFlights(request))
        .catch((err) => expect(err).to.equal('error'));

      expect(AirReaccomApi.findReaccomFlightShopping).to.be.calledWith(request);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING
        },
        {
          isFetching: false,
          error: 'error',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_FAILED
        }
      ]);
    });

    it('should push to next page when api returns successfully and a path is specified', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      const nextPagePath = '/next/page';

      await store.dispatch(AirChangeActions.searchForReaccomFlights(request, nextPagePath));

      expect(AirReaccomApi.findReaccomFlightShopping).to.be.calledWith(request);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING
        },
        {
          isFetching: false,
          response: 'response',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS
        },
        {
          payload: {
            args: [nextPagePath],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should dispatch saveReaccomCoTerminalProducts action when isReaccomCoTerminalEligible is true', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      store = mockStore({
        app: {
          airChange: {
            reaccomFlightPage: {
              response: {
                boundSelections: [new BoundSelectionBuilder().withReaccomCoTerm().build()]
              }
            }
          }
        }
      });
      await store.dispatch(AirChangeActions.searchForReaccomFlights(request));

      expect(store.getActions()[2]).to.deep.equal({
        reaccomCoTerminalProducts: request,
        type: 'AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS'
      });
    });

    it('should handle correctly and not dispatch saveReaccomCoTerminalProducts action when state is falsy', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      store.getState = () => undefined;
      await store.dispatch(AirChangeActions.searchForReaccomFlights(request));

      expect(store.getActions()[2]).to.not.deep.equal({
        reaccomCoTerminalProducts: request,
        type: 'AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS'
      });
    });

    it('should not push to next page when api returns successfully and a path is not specified', async () => {
      sinon.stub(AirReaccomApi, 'findReaccomFlightShopping').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.searchForReaccomFlights(request));

      expect(AirReaccomApi.findReaccomFlightShopping).to.be.calledWith(request);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING
        },
        {
          isFetching: false,
          response: 'response',
          type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS
        }
      ]);
    });
  });

  describe('changeReaccomFlight', () => {
    let request;

    beforeEach(() => {
      request = {
        href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
        method: 'PUT',
        body: {
          reaccomProductIds: {
            inbound: 'inbound-id',
            outbound: 'outbound-id'
          },
          shareDataToken: 'token'
        }
      };
    });

    it('should call chapi changeReaccomFlight when called with the correct link', async () => {
      sinon.stub(AirReaccomApi, 'reaccomPurchase').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.changeReaccomFlight(request, true));

      expect(AirReaccomApi.reaccomPurchase).to.be.calledWith(request, true);
    });

    it('should call trigger fetchReaccomConfirmationPageSuccess and ush to next page when api returns successfully', async () => {
      sinon.stub(AirReaccomApi, 'reaccomPurchase').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.changeReaccomFlight(request, false));

      expect(AirReaccomApi.reaccomPurchase).to.be.calledWith(request, false);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE
        },
        {
          isFetching: false,
          response: 'response',
          type: AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS
        },
        {
          flowName: 'airChange',
          status: 'completed',
          type: 'SET_FLOW_STATUS'
        },
        {
          payload: {
            args: [getNormalizedRoute({ routeName: 'confirmation' })],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should play haptic feedback when reaccom succeeds', async () => {
      const playHapticFeedbackStub = sinon.stub(HapticFeedbackHelper, 'playHapticFeedback');

      sinon.stub(AirReaccomApi, 'reaccomPurchase').returns(Promise.resolve('response'));
      await store.dispatch(AirChangeActions.changeReaccomFlight(request, false));

      expect(playHapticFeedbackStub).to.have.been.called;
    });

    it('should call trigger fetchReaccomConfirmationPageFailed when api fails', async () => {
      sinon.stub(AirReaccomApi, 'reaccomPurchase').returns(Promise.reject('error'));
      await store
        .dispatch(AirChangeActions.changeReaccomFlight(request, false))
        .catch((err) => expect(err).to.equal('error'));

      expect(AirReaccomApi.reaccomPurchase).to.be.calledWith(request, false);

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          request,
          type: AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE
        },
        {
          isFetching: false,
          error: 'error',
          type: AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_FAILED
        }
      ]);
    });
  });

  describe('getSplitPnrReservationForChange', () => {
    beforeEach(() => {
      sinon.stub(ReservationApi, 'retrieveSplitPnrReservation').returns(Promise.resolve('response'));
    });

    it('should call the reservation API when given link object', async () => {
      await store.dispatch(AirChangeActions.getSplitPnrReservationForChange(splitPnrLinkObjWithSelectedIdsAndEmail));

      expect(ReservationApi.retrieveSplitPnrReservation).to.be.calledWith(splitPnrLinkObjWithSelectedIdsAndEmail);
    });

    it('should trigger fetchSplitPnrReservationSuccess action when reservation API success', async () => {
      await store.dispatch(AirChangeActions.getSplitPnrReservationForChange(splitPnrLinkObjWithSelectedIdsAndEmail));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION,
          request: splitPnrLinkObjWithSelectedIdsAndEmail,
          isFetching: true
        },
        {
          flowName: AIR_CHANGE_SPLIT_PNR_FLOW_NAME,
          status: STATUS.IN_PROGRESS,
          type: SET_FLOW_STATUS
        },
        {
          type: AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS,
          response: 'response',
          isFetching: false
        },
        {
          flowName: AIR_CHANGE_SPLIT_PNR_FLOW_NAME,
          status: STATUS.COMPLETED,
          type: SET_FLOW_STATUS
        },
        {
          type: CALL_HISTORY_METHOD,
          payload: {
            args: [buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'view' }), { searchToken: 'abcde ' })],
            method: 'push'
          }
        }
      ]);
    });

    it('should redirect to the air change view page with a searchToken url param when a searchToken is present', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/change');

      await store.dispatch(AirChangeActions.getSplitPnrReservationForChange(splitPnrLinkObjWithSelectedIdsAndEmail, 'abcde'));

      const actions = store.getActions();

      expect(actions[4]).to.deep.equal({
        payload: {
          args: [buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'view' }), {}, { searchToken: 'abcde' })],
          method: 'push'
        },
        type: CALL_HISTORY_METHOD
      });
    });

    it('should trigger fetchSplitPnrReservationFailed action when reservation API fails', async () => {
      ReservationApi.retrieveSplitPnrReservation.returns(Promise.reject('error'));

      await store
        .dispatch(AirChangeActions.getSplitPnrReservationForChange(splitPnrLinkObjWithSelectedIdsAndEmail))
        .catch((error) => expect(error).to.equal('error'));

      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          type: AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION,
          request: splitPnrLinkObjWithSelectedIdsAndEmail,
          isFetching: true
        },
        {
          flowName: AIR_CHANGE_SPLIT_PNR_FLOW_NAME,
          status: STATUS.IN_PROGRESS,
          type: SET_FLOW_STATUS
        },
        {
          type: AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });
  });
});
