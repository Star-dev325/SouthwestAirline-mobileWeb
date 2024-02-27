import { sandbox } from 'sinon';

import applePayReducer from 'src/shared/reducers/applePayReducer';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import * as AlternativeFormsOfPaymentReducer from 'src/shared/reducers/alternativeFormsOfPaymentReducer';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

import { getApplePayCard, getNativeApplePayCard } from 'test/builders/model/paymentInfoBuilder';

const sinon = sandbox.create();

describe('applePayReducer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('applePayAvailability', () => {
    let afpAvailabilityStub;

    beforeEach(() => {
      afpAvailabilityStub = sinon.stub(AlternativeFormsOfPaymentReducer, 'afpAvailability');
    });

    it('should return initial availability if fetch availability failed', () => {
      const availability = {
        paymentMethod: 'ApplePay',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 100
      };

      afpAvailabilityStub.returns(availability);

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED
      };

      const state = applePayReducer(undefined, action);

      expect(state.applePayAvailability).to.eql(availability);
    });

    it('should return existing state if action is undefined', () => {
      const applePayAvailability = {
        paymentMethod: 'ApplePay',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 100
      };

      afpAvailabilityStub.returns(applePayAvailability);

      const state = applePayReducer({ applePayAvailability }, undefined);

      expect(state.applePayAvailability).to.eql(applePayAvailability);
    });
  });

  context('applePayCard', () => {
    const initialCard = null;
    const { formData, ...applePayCard } = getApplePayCard();

    it('should return formData if action is save form data', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA,
        formData
      };
      const state = applePayReducer(undefined, action);

      expect(state.applePayCard).to.eql({ formData });
    });

    it('should return applePayCard if action is initiate payment success', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.APPLE_PAY, uatpCard: applePayCard }
      };
      const state = applePayReducer(undefined, action);

      expect(state.applePayCard).to.eql(applePayCard);
    });

    it('should return applePayCard with formData if action is initiate payment success and formData exists in state', () => {
      const initialState = { applePayCard: { formData } };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.APPLE_PAY, uatpCard: applePayCard }
      };
      const state = applePayReducer(initialState, action);

      expect(state.applePayCard).to.eql({ ...applePayCard, formData, isNativeApplePay: false });
    });

    it('should return applePayCard with formData if action is web view handle apple pay and formData exists in state', () => {
      const initialState = { applePayCard: { formData } };

      const { purchaseRequest } = getNativeApplePayCard();

      const request = { request: 'data' };

      sinon.stub(WebViewHelper, 'decodeMessage').returns(request);

      const action = {
        type: WebViewActionTypes.WEB_VIEW__HANDLE_APPLE_PAY,
        request: purchaseRequest
      };

      const state = applePayReducer(initialState, action);

      expect(state.applePayCard).to.eql({ purchaseRequest: request, formData, isNativeApplePay: true });
    });

    it('should return existing state if action is initiate payment success but payment method is not apple pay', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.UPLIFT, uatpCard: applePayCard }
      };
      const state = applePayReducer({}, action);

      expect(state.applePayCard).to.eql(null);
    });

    it('should return initialCard if action is reset availability', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
      };
      const state = applePayReducer(undefined, action);

      expect(state.applePayCard).to.eql(initialCard);
    });

    it('should return initialCard if action type is not an expected case', () => {
      const action = {
        type: ''
      };
      const state = applePayReducer(undefined, action);

      expect(state.applePayCard).to.eql(initialCard);
    });

    it('should return existing state if action is undefined', () => {
      const initialState = { applePayCard: { formData } };

      const state = applePayReducer(initialState, undefined);

      expect(state.applePayCard).to.eql(initialState.applePayCard);
    });
  });
});
