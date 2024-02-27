jest.mock('@swa-ui/analytics', () => ({
  ...jest.requireActual('@swa-ui/analytics'),
  fireTrack: jest.fn()
}));
jest.mock('src/appHistory', () => ({
  history: {
    location: {
      pathname: '/standby/cancel-confirmation',
      search: ''
    },
    push: jest.fn(),
    replace: jest.fn()
  }
}));
jest.mock('src/sameDay/transformers/sameDayPurchaseRequestTransformer', () => ({
  generateSameDayConfirmationRequest: jest.fn().mockReturnValue({})
}));
jest.mock('src/shared/actions/alternativeFormsOfPaymentActions', () => ({
  initiateVoidTransaction: jest.fn().mockReturnValue({ type: 'initiateVoidTransaction' }),
  resetAlternativeFormsOfPayment: jest.fn().mockReturnValue({ type: 'resetAlternativeFormsOfPayment' })
}));
jest.mock('src/shared/actions/creditCardActions', () => ({
  resetSavedCreditCards: jest.fn().mockReturnValue({ type: 'resetSavedCreditCards' })
}));
jest.mock('src/shared/actions/flowStatusActions', () => ({
  setFlowStatus: jest.fn((flowName, status) => ({
    flowName,
    status,
    type: 'SET_FLOW_STATUS'
  }))
}));
jest.mock('src/shared/api/loggingApi', () => ({ sendErrorLog: jest.fn() }));
jest.mock('src/shared/api/sameDayApi', () => ({
  retrieveCancelStandbyListing: jest.fn().mockResolvedValue({}),
  retrieveSameDayFlightDetails: jest.fn(),
  retrieveSameDayPricingInformation: jest.fn(),
  retrieveSameDayShoppingInformation: jest.fn().mockResolvedValue({}),
  updateSameDayConfirmation: jest.fn(),
  updateSameDayConfirmationRefund: jest.fn()
}));
jest.mock('src/shared/transformers/alternativeFormsOfPaymentTransformer', () => ({
  toChapiAfpErrorLog: jest.fn().mockReturnValue('toChapiAfpErrorLog')
}));
jest.mock('src/wcm/actions/wcmActions', () => ({ getPlacements: jest.fn() }));

import * as analytics from '@swa-ui/analytics';
import i18n from '@swa-ui/locale';
import React from 'react';
import { history } from 'src/appHistory';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import sameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import { sameDayRoutes } from 'src/sameDay/constants/sameDayRoutes';
import { asyncChainFinish, asyncChainStart } from 'src/shared/actions/sharedActions';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import * as sameDayApi from 'src/shared/api/sameDayApi';
import { initiateVoidTransaction } from 'src/shared/actions/alternativeFormsOfPaymentActions';
import formDataActionTypes from 'src/shared/actions/formDataActionTypes';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import { ERROR_SAME_DAY_LOGIN_MISMATCH } from 'src/shared/constants/errorCodes.js';
import { STATUS } from 'src/shared/constants/flowConstants';
import { SAME_DAY_SORT_FILTER_FORM } from 'src/shared/constants/formIds';
import { generateSameDayConfirmationRequest } from 'src/sameDay/transformers/sameDayPurchaseRequestTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import SameDayPricingResponseBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { untilAssertPass } from 'test/unit/helpers/waitFor';

const mockStore = configureMockStore();

describe('SameDayActions', () => {
  const {
    SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED,
    SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
    SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
    SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_FAILED,
    SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
    SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO,
    SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_FAILED,
    SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
    SAME_DAY__FETCH_SAME_DAY_PRICING_INFO,
    SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_FAILED,
    SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
    SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
    SAME_DAY__RESET_FLOW_DATA,
    SAME_DAY__RESET_PAYMENT_INFO,
    SAME_DAY__SAVE_CHANGE_FLOW,
    SAME_DAY__SAVE_PAYMENT_INFO,
    SAME_DAY__SAVE_SELECTED_FLIGHT,
    SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER,
    SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_FAILED,
    SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS,
    SAME_DAY__UPDATE_SAME_DAY_CANCELLATION,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_FAILED,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_FAILED,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
    SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
  } = sameDayActionTypes;
  const boundReference = 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R';
  const isLoggedIn = true;
  const mockChainMessages = [i18n('SPINNER_MESSAGE__HANG_TIGHT'), i18n('SPINNER_MESSAGE__STILL_WORKING')];
  const productId = 'testProductID';
  const sameDayShoppingInfo = {
    href: '/v1/mobile-air-operations/page/same-day/shopping/28DIXX',
    method: 'POST',
    body: {
      sameDayToken:
        'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2pZxX0k1GtpcWb28okHxM9yEPt6Nic3LbR1NTQyTsl8afOXxewf1G8B-8J2fgRo_UX0MlsMY7SOtlJmbg=='
    }
  };

  const sameDayPricingInfo = {
    href: '/v1/mobile-air-operations/page/same-day/pricing/28DIXX',
    method: 'POST',
    body: {
      sameDayToken: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p',
      boundReference: boundReference,
      productId: productId
    }
  };

  const sameDayConfirmationObj = {
    body: {
      boundReference: boundReference,
      payment: {
        moneyTotalFare: undefined,
        savedCreditCard: {
          intentToStore: false,
          savedCreditCardId: '1-XI9N76'
        },
        savedCreditCardSelected: true
      },
      productId: productId,
      recipientEmail: 'test@test.com',
      refundMethod: undefined,
      sameDayToken: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p'
    },
    href: '/v1/mobile-air-operations/page/same-day/confirmation',
    method: 'PUT'
  };

  const sameDayFormDataObj = {
    paymentInfo: { selectedCardId: '1-XI9N76' },
    recipientEmail: 'test@test.com'
  };

  const savedCreditCard = {
    intentToStore: true,
    securityCode: '123',
    savedCreditCardId: 'testCardID'
  };

  const sameDayConfirmationRefundObj = {
    ...sameDayConfirmationObj,
    ...{
      href: '/v1/mobile-air-operations/page/same-day/28DIXX/confirmation-refund',
      body: { ...sameDayConfirmationObj.body, ...{ boundSelection: 'test' } }
    }
  };

  const sameDayCancellationLink = {
    body: {
      sameDayToken: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p'
    },
    href: '/v1/mobile-air-operations/page/standby/3WJKXX',
    labelText: 'Cancel standby listing',
    method: 'PUT'
  };

  const sameDayFlightDetailsInfo = {
    href: '/v1/mobile-air-operations/page/same-day/pricing/28DIXX',
    method: 'POST',
    body: {
      sameDayToken: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p',
      flightIdentifier: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p'
    }
  };

  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('shouldRedirectToHomePage', () => {
    const isWebViewFalseState = {
      app: {
        webView: {
          isWebView: false
        }
      }
    };

    const isWebViewTrueState = {
      app: {
        webView: {
          isWebView: true
        }
      }
    };

    it('should always return true when in webView regardless of error', () => {
      expect(sameDayActions.shouldRedirectToHomePage(isWebViewTrueState, null)).toEqual(true);
    });

    it('should return true when error code is 400308420 and not in webView', () => {
      const error = { responseJSON: { code: 400308420 } };

      expect(sameDayActions.shouldRedirectToHomePage(isWebViewFalseState, error)).toEqual(true);
    });

    it('should return false when error code is not 400308420 and not in webView', () => {
      const error = { responseJSON: { code: 400318420 } };

      expect(sameDayActions.shouldRedirectToHomePage(isWebViewFalseState, error)).toEqual(false);
    });

    it('should return false when error code does not exist and not in webView', () => {
      const error = undefined;

      expect(sameDayActions.shouldRedirectToHomePage(isWebViewFalseState, error)).toEqual(false);
    });

    it('should return true when error code is 400308420 and in webView', () => {
      const error = { responseJSON: { code: 400318420 } };

      expect(sameDayActions.shouldRedirectToHomePage(isWebViewTrueState, error)).toEqual(true);
    });
  });

  it('should update the same day shopping sort and filter form', () => {
    const mockFormData = { test: 'data' };
    const initialState = {
      app: {
        formData: {
          [SAME_DAY_SORT_FILTER_FORM]: {
            data: mockFormData
          }
        }
      }
    };
    const mockFormStore = mockStore(initialState);

    mockFormStore.dispatch(sameDayActions.applySameDayShoppingPageSortFilter());

    expect(mockFormStore.getActions()[0]).toEqual({
      formData: mockFormData,
      type: SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
    });
  });

  describe('retrieveSameDayShoppingInformation', () => {
    it('should dispatch correct actions when fetch same Day Shopping information successfully', async () => {
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO
        },
        {
          flowName: 'sameDay',
          status: STATUS.INITIAL,
          type: 'SET_FLOW_STATUS'
        },
        {
          exactMatch: true,
          formId: SAME_DAY_SORT_FILTER_FORM,
          type: formDataActionTypes.CLEAR_FORM_DATA_BY_ID
        },
        {
          isFetching: false,
          type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS
        },
        {
          flowName: 'sameDay',
          status: STATUS.IN_PROGRESS,
          type: 'SET_FLOW_STATUS'
        }
      ];

      sameDayApi.retrieveSameDayShoppingInformation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformation(sameDayShoppingInfo, boundReference));

      expect(sameDayApi.retrieveSameDayShoppingInformation).toHaveBeenCalledWith(sameDayShoppingInfo, boundReference);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should push to the shopping page when it receives a response and replace is not specified', async () => {
      sameDayApi.retrieveSameDayShoppingInformation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformation(sameDayShoppingInfo, boundReference));

      expect(history.push).toHaveBeenCalledWith(sameDayRoutes.shopping);
    });

    it('should replace the current page with the shopping page when it receives a response and replace is true', async () => {
      sameDayApi.retrieveSameDayShoppingInformation.mockResolvedValueOnce({});

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformation(sameDayShoppingInfo, boundReference, true)
      );

      expect(history.replace).toHaveBeenCalledWith(sameDayRoutes.shopping);
    });

    it('should dispatch SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_FAILED when api failed', async () => {
      const customizedError = { message: 'error' };
      const expectedActions = [
        {
          flowName: 'sameDay',
          status: STATUS.IN_PROGRESS,
          type: 'SET_FLOW_STATUS'
        },
        {
          error: customizedError,
          isFetching: false,
          shouldRedirectToHomePage: sameDayActions.shouldRedirectToHomePage,
          type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_FAILED
        }
      ];

      sameDayApi.retrieveSameDayShoppingInformation.mockRejectedValueOnce(customizedError);

      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformation({})).catch(() => {
        expect(store.getActions().slice(2)).toEqual(expectedActions);
      });
    });
  });

  describe('retrieveSameDayShoppingInformationMethod', () => {
    const selectBoundMock = 0;
    const boundSelections = [{ boundReference: 'bound1' }, { boundReference: 'bound2' }];
    const sameDayShoppingInfo = {
      body: {
        boundReference: boundReference,
        sameDayToken:
          'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2pZxX0k1GtpcWb28okHxM9yEPt6Nic3LbR1NTQyTsl8afOXxewf1G8B-8J2fgRo_UX0MlsMY7SOtlJmbg=='
      },
      href: '/v1/mobile-air-operations/page/same-day/shopping4ENWXX',
      method: 'POST'
    };
    const viewForSameDayPageMock = {
      _links: { sameDayShopping: sameDayShoppingInfo },
      _meta: { showBoundSelction: true },
      boundSelectionMessage: '',
      boundSelections: boundSelections
    };

    it('should call retrieveSameDayShoppingInformation', async () => {
      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0].type).toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should call retrieveSameDayShoppingInformation when firstbound is true in selectBound', async () => {
      const selectBoundMock = 0;

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0].type).toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should call retrieveSameDayShoppingInformation when firstbound is false and secondbound is true in selectBound', async () => {
      const selectBoundMock = 1;

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0].type).toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should call retrieveSameDayShoppingInformation when secondBound is undefined of selectBound and showBoundSelection is false', async () => {
      const selectBoundMock = 0;
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        _meta: { showBoundSelection: false },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0].type).toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when viewForSameDayPageMock object and selectBound is present', async () => {
      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformationMethod(undefined, selectBoundMock));

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when viewForSameDayPageMock is {} and selectBound is present', async () => {
      const viewForSameDayPageMock = {};

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when first element is undefined of boundSelections in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const selectBoundReference = 'boundReference';
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        _meta: { showBoundSelction: true },
        boundSelections: [undefined, undefined],
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundReference)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when boundReference of first element is undefined of boundSelections in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const selectBoundMock = 0;
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        _meta: { showBoundSelction: true },
        boundSelections: [{ boundReference: undefined }, undefined],
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when boundReference of second element of boundSelections is undefined in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const selectBoundMock = 0;
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        _meta: { showBoundSelction: true },
        boundSelections: [undefined, undefined],
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when second element in boundSelections is {} in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const selectBoundMock = 0;
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        boundSelections: [undefined, {}],
        boundSelectionMessage: '',
        _meta: { showBoundSelction: true }
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );
      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when  boundReference of second element is undefined in boundReference of boundSelections in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const selectBoundMock = 1;
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: sameDayShoppingInfo
        },
        _meta: { showBoundSelction: true },
        boundSelections: [undefined, { boundReference: undefined }],
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when _links is undefined in samDayviewForSameDayPageMock is present and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: undefined,
        _meta: { showBoundSelction: true },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when _links is {} in viewForSameDayPageMock object and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: {},
        _meta: { showBoundSelction: true },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when sameDayShopping is undefined in viewForSameDayPageMock object and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: undefined
        },
        _meta: { showBoundSelction: true },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when sameDayShopping is {} in viewForSameDayPageMock object and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: {
            href: '/v1/mobile-air-operations/page/same-day/shopping4ENWXX'
          }
        },
        _meta: { showBoundSelction: true },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when sameDayShopping - body is undefined in viewForSameDayPageMock object and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: {
            body: undefined,
            href: '/v1/mobile-air-operations/page/same-day/shopping4ENWXX'
          }
        },
        _meta: { showBoundSelction: true },
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when sameDayShopping - body is {} in viewForSameDayPageMock object and selectBound is present', async () => {
      const viewForSameDayPageMock = {
        _links: {
          sameDayShopping: {
            body: {},
            href: '/v1/mobile-air-operations/page/same-day/shopping4ENWXX',
            method: 'POST'
          }
        },
        _meta: {},
        boundSelections: boundSelections,
        boundSelectionMessage: ''
      };

      await store.dispatch(
        sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, selectBoundMock)
      );

      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when viewForSameDayPageMock is present and selectBound is undefined', async () => {
      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformationMethod(viewForSameDayPageMock, undefined));
      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });

    it('should not dispatch retrieveSameDayShoppingInformation when viewForSameDayPageMock is undefined and selectBound is undefined', async () => {
      await store.dispatch(sameDayActions.retrieveSameDayShoppingInformationMethod(undefined, undefined));
      expect(store.getActions()[0]).not.toEqual(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO);
    });
  });

  describe('retrieveSameDayPricingDetailsInformation', () => {
    it('should call retrieveSameDayPricingInformation when correct same Day Pricing information is passed', async () => {
      sameDayApi.retrieveSameDayPricingInformation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveSameDayPricingDetailsInformation(sameDayPricingInfo));

      expect(sameDayApi.retrieveSameDayPricingInformation).toHaveBeenCalledWith(sameDayPricingInfo);
    });

    it('should dispatch correct actions when same Day Pricing info is fetched successfully', async () => {
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO
        },
        {
          isFetching: false,
          type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS
        },
        {
          flowName: 'sameDay',
          status: STATUS.IN_PROGRESS,
          type: 'SET_FLOW_STATUS'
        }
      ];

      sameDayApi.retrieveSameDayPricingInformation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveSameDayPricingDetailsInformation(sameDayPricingInfo));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_FAILED when api failed', (done) => {
      const customizedError = new Error();
      const expectedAction = {
        error: customizedError,
        isFetching: false,
        type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_FAILED
      };

      sameDayApi.retrieveSameDayPricingInformation.mockRejectedValueOnce(customizedError);

      store.dispatch(sameDayActions.retrieveSameDayPricingDetailsInformation({})).finally(() => {
        expect(store.getActions()[1]).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('updateSameDayConfirmation', () => {
    it('should call updateSameDayConfirmation when complete updateSameDayConfirmation object is passed', async () => {
      const sameDayPricingPage = new SameDayPricingResponseBuilder().build();

      sameDayApi.updateSameDayConfirmation.mockResolvedValueOnce({});

      await store.dispatch(
        sameDayActions.updateSameDayConfirmationMethod(
          isLoggedIn,
          sameDayFormDataObj,
          {},
          sameDayPricingPage,
          savedCreditCard
        )
      );

      expect(sameDayApi.updateSameDayConfirmation).toHaveBeenCalledWith(isLoggedIn, {});
    });

    it('should dispatch correct actions when same day confirmation update is successful', async () => {
      const expectedActions = [
        {
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION,
          isFetching: true
        },
        asyncChainStart(mockChainMessages),
        {
          isFetching: false,
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS
        },
        {
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
          isFetching: false
        },
        asyncChainFinish(),
        {
          flowName: 'sameDay',
          status: STATUS.COMPLETED,
          type: 'SET_FLOW_STATUS'
        }
      ];
      const isLoggedIn = false;
      const sameDayPricingPage = new SameDayPricingResponseBuilder().build();

      sameDayApi.updateSameDayConfirmation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, sameDayPricingPage));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch failed action when api call fails', (done) => {
      const testError = new Error();
      const expectedAction = {
        error: testError,
        isFetching: false,
        shouldRedirectToHomePage: sameDayActions.shouldRedirectToHomePage,
        type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_FAILED
      };

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(testError);
      store
        .dispatch(
          sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
        )
        .finally(() => {
          expect(store.getActions()[3]).toEqual(expectedAction);
          done();
        });
    });

    it('should call the error handler when api call fails', (done) => {
      const mockErrorHandler = jest.fn();
      const testError = new Error();

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(testError);
      store
        .dispatch(
          sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, null, {}, mockErrorHandler)
        )
        .finally(() => {
          expect(mockErrorHandler).toHaveBeenCalled();
          done();
        });
    });

    it('should cancel a standby listing when confirmation call fails in standby in webview', async () => {
      const store = mockStore({
        app: { webView: { isWebView: true } }
      });

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce({});

      await store.dispatch(sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, {}, {}));

      const actions = await store.getActions();

      expect(actions[3]).toEqual({
        isFetching: true,
        type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION
      });
    });

    it('should dispatch custom error dialog when api call fails on account mismatch error', (done) => {
      const mockExperienceId = 'experienceId';
      const mockRequestId = 'requestId';
      const testError = {
        responseJSON: {
          code: ERROR_SAME_DAY_LOGIN_MISMATCH,
          message: 'mock error message',
          requestId: `${mockExperienceId}:${mockRequestId}:channel`
        }
      };
      const expectedAction = {
        isShowDialog: true,
        options: {
          active: true,
          buttons: [
            {
              label: i18n('SHARED__BUTTON_TEXT__OK'),
              onClick: expect.any(Function)
            }
          ],
          contentView: (
            <div>
              <p>Error 401308425</p>
              <p>(experienceId:requestId:channel)</p>
            </div>
          ),
          error: testError,
          message: 'mock error message',
          title: 'mock error message'
        },
        type: 'TOGGLE_DIALOG'
      };

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(testError);
      store
        .dispatch(
          sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {})
        )
        .finally(() => {
          expect(store.getActions()[3]).toEqual(expectedAction);
          done();
        });
    });

    it('should end the async chain when the api call fails', (done) => {
      const testError = new Error();
      const expectedAction = asyncChainFinish();

      jest.spyOn(sameDayApi, 'updateSameDayConfirmation').mockRejectedValueOnce(testError);
      store
        .dispatch(sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}))
        .finally(() => {
          expect(store.getActions()[2]).toEqual(expectedAction);
          done();
        });
    });

    it('should not thrown an exception if call fails and the error is undefined', () => {
      const expectedAction = {
        error: undefined,
        isFetching: false,
        shouldRedirectToHomePage: sameDayActions.shouldRedirectToHomePage,
        type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_FAILED
      };

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(undefined);

      return store
        .dispatch(sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}))
        .finally(() => {
          expect(store.getActions()[3]).toEqual(expectedAction);
        });
    });

    it('should make an analytics call when confirmation fails', () => {
      const mockErrorCode = '400999999';
      const mockErrorMessage = 'mock error';
      const mockExperienceId = 'experienceId';
      const mockRequestId = 'requestId';
      const testError = {
        responseJSON: {
          code: mockErrorCode,
          message: mockErrorMessage,
          requestId: `${mockExperienceId}:${mockRequestId}:channel`
        }
      };

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(testError);

      return store
        .dispatch(
          sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
        )
        .finally(() => {
          expect(analytics.fireTrack).toHaveBeenCalledWith('squid', {
            error_code: mockErrorMessage,
            error_trackingcode: mockErrorCode,
            page_description: 'error message',
            global_experienceid: mockExperienceId,
            global_requestid: mockRequestId
          });
        });
    });

    it('should log when an Apple Pay call fails', async () => {
      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce({});
      generateSameDayConfirmationRequest.mockReturnValueOnce({
        body: {
          payment: {
            newCreditCard: {
              digitalPaymentType: APPLE_PAY.key
            }
          }
        }
      });

      await store.dispatch(
        sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
      );

      expect(sendErrorLog).toHaveBeenCalledWith('toChapiAfpErrorLog');
    });

    it('should initiate a void transaction when an Apple Pay call fails', async () => {
      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce({});
      generateSameDayConfirmationRequest.mockReturnValueOnce({
        body: {
          payment: {
            newCreditCard: {
              digitalPaymentType: APPLE_PAY.key
            }
          }
        }
      });

      await store.dispatch(
        sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
      );

      expect(initiateVoidTransaction).toHaveBeenCalledWith('ApplePay', {});
    });

    it('should not initiate a void transaction when Ceptor void API is toggled off and the error is not session timeout', async () => {
      const mockErrorResponse = {
        responseJSON: {
          code: 400310654
        }
      };
      const mockStoreWithCeptorToggledOff = mockStore({
        app: {
          toggles: {
            CEPTOR_VOID_API: true
          }
        }
      });

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(mockErrorResponse);
      generateSameDayConfirmationRequest.mockReturnValueOnce({
        body: {
          payment: {
            newCreditCard: {
              digitalPaymentType: APPLE_PAY.key
            }
          }
        }
      });

      await mockStoreWithCeptorToggledOff.dispatch(
        sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
      );

      expect(initiateVoidTransaction).not.toHaveBeenCalled();
    });
  });

  describe('updateSameDayConfirmationRefundMethod', () => {
    it('should call updateSameDayConfirmationRefundMethod when complete updateSameDayConfirmationRefund object is passed', async () => {
      sameDayApi.updateSameDayConfirmationRefund.mockResolvedValueOnce({});

      await store.dispatch(
        sameDayActions.updateSameDayConfirmationRefundMethod({}, sameDayConfirmationRefundObj, true)
      );

      expect(sameDayApi.updateSameDayConfirmationRefund).toHaveBeenCalledWith(sameDayConfirmationRefundObj, true, {});
    });

    it('should dispatch correct actions when same day confirmation update is successful and refund page should not be shown', async () => {
      const mockRefundResponse = {
        sameDayRefundPage: {
          _links: {
            sameDayConfirmation: {
              body: {},
              href: '/v1/mobile-air-operations/page/same-day/confirmation'
            }
          },
          showRefundPage: false
        }
      };
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND
        },
        asyncChainStart(mockChainMessages),
        {
          flowName: 'sameDay',
          status: STATUS.IN_PROGRESS,
          type: 'SET_FLOW_STATUS'
        },
        {
          isFetching: true,
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
        },
        {
          isFetching: false,
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS
        },
        {
          isFetching: false,
          type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS
        },
        asyncChainFinish(),
        {
          flowName: 'sameDay',
          status: STATUS.COMPLETED,
          type: 'SET_FLOW_STATUS'
        }
      ];

      sameDayApi.updateSameDayConfirmationRefund.mockResolvedValueOnce(mockRefundResponse);
      sameDayApi.updateSameDayConfirmation.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.updateSameDayConfirmationRefundMethod({}, sameDayConfirmationRefundObj));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch correct actions when same day confirmation update is successful and refund page should be shown', async () => {
      const mockRefundResponse = {
        sameDayRefundPage: {
          _links: {
            sameDayConfirmation: {
              body: {},
              href: '/v1/mobile-air-operations/page/same-day/confirmation'
            }
          },
          showRefundPage: true
        }
      };

      sameDayApi.updateSameDayConfirmationRefund.mockResolvedValueOnce(mockRefundResponse);

      await store.dispatch(sameDayActions.updateSameDayConfirmationRefundMethod({}, sameDayConfirmationRefundObj));

      expect(history.push).toHaveBeenCalledWith('/same-day/refund-method');
    });

    it('should dispatch custom error dialog when api call fails on account mismatch error', (done) => {
      const mockExperienceId = 'experienceId';
      const mockRequestId = 'requestId';
      const testError = {
        responseJSON: {
          code: ERROR_SAME_DAY_LOGIN_MISMATCH,
          message: 'mock error message',
          requestId: `${mockExperienceId}:${mockRequestId}:channel`
        }
      };
      const expectedAction = {
        isShowDialog: true,
        options: {
          active: true,
          buttons: [
            {
              label: i18n('SHARED__BUTTON_TEXT__OK'),
              onClick: expect.any(Function)
            }
          ],
          contentView: (
            <div>
              <p>Error 401308425</p>
              <p>(experienceId:requestId:channel)</p>
            </div>
          ),
          error: testError,
          message: 'mock error message',
          title: 'mock error message'
        },
        type: 'TOGGLE_DIALOG'
      };

      sameDayApi.updateSameDayConfirmation.mockRejectedValueOnce(testError);
      store
        .dispatch(
          sameDayActions.updateSameDayConfirmationMethod(isLoggedIn, sameDayFormDataObj, savedCreditCard, {}, {})
        )
        .finally(() => {
          expect(store.getActions()[3]).toEqual(expectedAction);
          done();
        });
    });

    it('should dispatch failed action when api call fails', (done) => {
      const testError = new Error();
      const expectedAction = {
        error: testError,
        isFetching: false,
        type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_FAILED
      };

      sameDayApi.updateSameDayConfirmationRefund.mockRejectedValueOnce(testError);

      store.dispatch(sameDayActions.updateSameDayConfirmationRefundMethod({})).finally(() => {
        expect(store.getActions()[3]).toEqual(expectedAction);
        done();
      });
    });
    
    it('should end async chain when api call fails', (done) => {
      const testError = new Error();

      jest.spyOn(sameDayApi, 'updateSameDayConfirmationRefund').mockRejectedValueOnce(testError);

      store.dispatch(sameDayActions.updateSameDayConfirmationRefundMethod({})).then(() => {
        expect(store.getActions()[2]).toEqual(asyncChainFinish());
        done();
      });
    });
  });

  describe('retrieveCancelStandbyListingMethod', () => {
    it('should call updateSameDayCancellation when complete updateSameDayCancellation object is passed', async () => {
      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveCancelStandbyListingMethod(sameDayCancellationLink));

      expect(sameDayApi.retrieveCancelStandbyListing).toHaveBeenCalledWith(sameDayCancellationLink);
    });

    it('should dispatch correct actions when same day confirmation update is successful', async () => {
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION
        },
        {
          isFetching: false,
          type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS
        },
        {
          flowName: 'standby',
          status: STATUS.COMPLETED,
          type: 'SET_FLOW_STATUS'
        }
      ];

      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveCancelStandbyListingMethod(sameDayCancellationLink));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch failed action when api call fails', (done) => {
      const testError = new Error();
      const expectedAction = {
        error: testError,
        isFetching: false,
        type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_FAILED
      };

      sameDayApi.retrieveCancelStandbyListing.mockRejectedValueOnce(testError);

      store.dispatch(sameDayActions.retrieveCancelStandbyListingMethod({})).finally(() => {
        expect(store.getActions()[1]).toEqual(expectedAction);
        done();
      });
    });

    it('should push to cancel-confirmation page if isBackNavCancel is false', async () => {
      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveCancelStandbyListingMethod(sameDayCancellationLink, false));

      expect(history.push).toHaveBeenCalledWith(sameDayRoutes.cancel);
    });

    it('should not push to cancel-confirmation page if isBackNavCancel is true', async () => {
      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveCancelStandbyListingMethod(sameDayCancellationLink, true));

      expect(history.push).not.toHaveBeenCalledWith(sameDayRoutes.cancel);
    });
  });

  describe('initiating void transactions', () => {
    it('should initiate a void transaction if an Apple Pay card is available and the API is toggled on', () => {
      const mockStoreWithApplePayCardAndCeptor = mockStore({
        app: {
          applePay: {
            applePayCard: { test: 'some value' }
          },
          toggles: { CEPTOR_VOID_API: true }
        }
      });

      mockStoreWithApplePayCardAndCeptor.dispatch(sameDayActions.initiateSameDayVoidTransactionForGuest());

      expect(initiateVoidTransaction).toHaveBeenCalledWith(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest');
    });

    it('should not initiate a void transaction if no Apple Pay card is available', () => {
      const mockStoreWithCeptor = mockStore({
        app: {
          toggles: { CEPTOR_VOID_API: true }
        }
      });

      mockStoreWithCeptor.dispatch(sameDayActions.initiateSameDayVoidTransactionForGuest());

      expect(initiateVoidTransaction).not.toHaveBeenCalled();
    });

    it('should not initiate a void transaction if the API is toggled off', () => {
      const mockStoreWithApplePayCard = mockStore({
        app: {
          applePay: {
            applePayCard: { test: 'some value' }
          }
        }
      });

      mockStoreWithApplePayCard.dispatch(sameDayActions.initiateSameDayVoidTransactionForGuest());

      expect(initiateVoidTransaction).not.toHaveBeenCalled();
    });    
    
    it('should not initiate a void transaction if no app state data can be found', () => {
      const mockStoreWithApplePayCard = mockStore({});

      mockStoreWithApplePayCard.dispatch(sameDayActions.initiateSameDayVoidTransactionForGuest());

      expect(initiateVoidTransaction).not.toHaveBeenCalled();
    });
  });

  describe('retrieveSameDayFlightDetailsInformation', () => {
    it('should call retrieveSameDayFlightDetails when correct same Day flight Details information is passed', async () => {
      sameDayApi.retrieveSameDayFlightDetails.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.retrieveSameDayFlightDetailsInformation(sameDayFlightDetailsInfo));

      expect(sameDayApi.retrieveSameDayFlightDetails).toHaveBeenCalledWith(sameDayFlightDetailsInfo);
    });

    it('should dispatch correct actions when SameDayFlightDetails info is fetched successfully', async () => {
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO
        },
        {
          isFetching: false,
          response: {
            flightIdentifier: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p',
            sameDayFlightDetails: {
              changeDetails: 'changeDetails',
              standbyDetails: 'standbyDetails'
            }
          },
          type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS
        }
      ];

      sameDayApi.retrieveSameDayFlightDetails.mockResolvedValue({
        sameDayFlightDetails: {
          changeDetails: 'changeDetails',
          standbyDetails: 'standbyDetails'
        }
      });

      await store.dispatch(sameDayActions.retrieveSameDayFlightDetailsInformation(sameDayFlightDetailsInfo));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_FAILED when api failed', (done) => {
      const customizedError = new Error();
      const expectedAction = [
        {
          isFetching: true,
          type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO
        },
        {
          error: customizedError,
          isFetching: false,
          type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_FAILED
        }
      ];

      sameDayApi.retrieveSameDayFlightDetails.mockRejectedValueOnce(customizedError);

      store.dispatch(sameDayActions.retrieveSameDayFlightDetailsInformation({})).finally(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('retrieveSameDayPurchaseConfirmationPlacement', () => {
    const contactMethod = 'EMAIL';

    it('should call WcmActions getPlacements', async () => {
      WcmActions.getPlacements.mockImplementation(() => () => Promise.resolve({}));

      await store.dispatch(sameDayActions.retrieveSameDayPurchaseConfirmationPlacement(contactMethod));
      expect(WcmActions.getPlacements).toHaveBeenCalled();
    });

    it('should dispatch correct actions when same day confirmation update is successful', async () => {
      const expectedActions = [
        {
          isFetching: true,
          type: SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS
        },
        {
          isFetching: false,
          response: {},
          type: SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS
        }
      ];

      await store.dispatch(sameDayActions.retrieveSameDayPurchaseConfirmationPlacement(contactMethod));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch failed action when api call fails', async () => {
      const expectedAction = {
        isFetching: false,
        type: SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED
      };

      WcmActions.getPlacements.mockImplementation(() => () => Promise.reject(new Error()));

      await store.dispatch(sameDayActions.retrieveSameDayPurchaseConfirmationPlacement({}));
      const result = store.getActions()[1];

      untilAssertPass(() => {
        expect(result).toEqual(expectedAction);
      });
    });
  });

  describe('selectedFlight', () => {
    it('should save selected flight and then go to the select-fare page', () => {
      const selectedFlight = {
        arrivalTime: '13:00',
        changeUnavailableText: null,
        departureTime: '10:00',
        duration: '3h 0m'
      };
      const expectedActions = [
        {
          selectedFlight,
          type: SAME_DAY__SAVE_SELECTED_FLIGHT
        },
        {
          isChangeFlow: true,
          type: SAME_DAY__SAVE_CHANGE_FLOW
        },
        {
          payload: { args: [`${sameDayRoutes.shopping}/select-fare`], method: 'push' },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(sameDayActions.selectFare(selectedFlight, true));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('update payment Information ', () => {
    it('should dispatch save paymentInfo and redirect to review page', () => {
      const paymentInfo = { selectedCardId: '1-usedxed' };

      store.dispatch(sameDayActions.savePaymentInfoAndGoToReviewPage(paymentInfo));

      expect(store.getActions()).toEqual([
        { paymentInfo, type: SAME_DAY__SAVE_PAYMENT_INFO },
        {
          payload: {
            args: [],
            method: 'goBack'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          fieldName: 'securityCode',
          formId: 'SAME_DAY_REVIEW_FORM',
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          url: '/standby/cancel-confirmation',
          value: ''
        }
      ]);
    });
  });

  describe('reset flow', () => {
    it('should dispatch reset flow', () => {
      store.dispatch(sameDayActions.resetSameDayFlowData());

      expect(store.getActions()).toEqual([{ type: SAME_DAY__RESET_FLOW_DATA }]);
    });

    it('should reset same day payment data', () => {
      store.dispatch(sameDayActions.resetSameDayPaymentData());

      expect(store.getActions()).toEqual([
        { type: SAME_DAY__RESET_PAYMENT_INFO },
        { type: 'resetAlternativeFormsOfPayment' },
        { type: 'resetSavedCreditCards' }
      ]);
    });
  });

  describe('update save change flow Information ', () => {
    it('should dispatch save change flow', () => {
      const changeFlow = true;

      store.dispatch(sameDayActions.saveChangeFlow(changeFlow));

      expect(store.getActions()).toEqual([{ isChangeFlow: changeFlow, type: SAME_DAY__SAVE_CHANGE_FLOW }]);
    });
  });

  describe('cancelStandbyListingAndBackToPreviousPage', () => {
    it('should call retrieveCancelStandbyListing with sameDayCancellation object', async () => {
      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      await store.dispatch(sameDayActions.cancelStandbyListingAndBackToPreviousPage(sameDayCancellationLink));

      expect(sameDayApi.retrieveCancelStandbyListing).toHaveBeenCalledWith(sameDayCancellationLink);
    });

    it('should push back to review/price-difference page', () => {
      sameDayApi.retrieveCancelStandbyListing.mockResolvedValueOnce({});

      store.dispatch(sameDayActions.cancelStandbyListingAndBackToPreviousPage(sameDayCancellationLink));

      expect(history.replace).toHaveBeenCalledWith(sameDayRoutes.review);
    });
  });
});
