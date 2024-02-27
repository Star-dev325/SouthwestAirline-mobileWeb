import sinonModule from 'sinon';

import upliftReducer from 'src/shared/reducers/upliftReducer';
import * as AlternativeFormsOfPaymentReducer from 'src/shared/reducers/alternativeFormsOfPaymentReducer';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';

import { getUpliftCard } from 'test/builders/model/paymentInfoBuilder';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

const sinon = sinonModule.sandbox.create();

describe('upliftReducer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('upliftAvailability', () => {
    let afpAvailabilityStub;

    beforeEach(() => {
      afpAvailabilityStub = sinon.stub(AlternativeFormsOfPaymentReducer, 'afpAvailability');
    });

    it('should return initial availability if fetch availability failed', () => {
      const availability = {
        paymentMethod: 'PayMonthly',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 100
      };

      afpAvailabilityStub.returns(availability);

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED
      };

      const state = upliftReducer(undefined, action);

      expect(state.upliftAvailability).to.eql(availability);
    });

    it('should return existing state if action is undefined', () => {
      const availability = {
        paymentMethod: 'PayMonthly',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 100
      };

      afpAvailabilityStub.returns(availability);

      const state = upliftReducer({ availability }, undefined);

      expect(state.upliftAvailability).to.eql(availability);
    });

    it('should return state when fetch availability successful', () => {
      const availability = {
        paymentMethod: 'PayMonthly',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 100
      };

      afpAvailabilityStub.returns(availability);

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS
      };

      const state = upliftReducer({ availability }, action);

      expect(state.upliftAvailability).to.eql(availability);
    });
  });

  context('upliftCard', () => {
    const { formData, ...upliftCard } = getUpliftCard();

    it('should return initial state if action is undefined', () => {
      const state = upliftReducer({}, undefined);

      expect(state.upliftCard).to.eql(null);
    });

    it('should return formData if action is save form data', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA,
        formData
      };
      const state = upliftReducer(undefined, action);

      expect(state.upliftCard).to.eql({ formData });
    });

    it('should return initial state if action is reset availability', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
      };
      const state = upliftReducer({}, action);

      expect(state.upliftCard).to.eql(null);
    });

    it('should return initial state if action is initiate payment failed', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED
      };
      const state = upliftReducer({}, action);

      expect(state.upliftCard).to.eql(null);
    });

    it('should return upliftCard if action is initiate payment success and payment method is uplift', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.UPLIFT, uatpCard: upliftCard }
      };
      const state = upliftReducer({}, action);

      expect(state.upliftCard).to.eql(upliftCard);
    });

    it('should return upliftCard with formData if action is initiate payment success and formData exists in state and payment method is uplift', () => {
      const initialState = { upliftCard: { formData } };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.UPLIFT, uatpCard: upliftCard }
      };
      const state = upliftReducer(initialState, action);

      expect(state.upliftCard).to.eql({ ...upliftCard, formData });
    });

    it('should return initial state if action is initiate payment success but payment method is not uplift', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS,
        response: { paymentMethod: PAYMENT_METHODS.APPLE_PAY, uatpCard: upliftCard }
      };
      const state = upliftReducer({}, action);

      expect(state.upliftCard).to.eql(null);
    });
  });
});
