import _ from 'lodash';
import { sandbox } from 'sinon';

import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import { afpAvailability } from 'src/shared/reducers/alternativeFormsOfPaymentReducer';

import { INITIAL_AVAILABILITY } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

const sinon = sandbox.create();

describe('alternativeFormsOfPaymentReducer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('afpAvailability', () => {
    it('should return updated availability if fetch availability success', () => {
      const paymentMethod = 'paymentMethod';
      const availability = _.merge({}, INITIAL_AVAILABILITY, { paymentMethod, isAvailable: true });

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
        response: [availability]
      };
      const state = afpAvailability(undefined, action, paymentMethod);

      expect(state).to.eql(availability);
    });

    it('should return initial availability if fetch availability failed', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED
      };
      const state = afpAvailability(undefined, action);

      expect(state).to.eql(INITIAL_AVAILABILITY);
    });

    it('should return initial availability action if reset availability', () => {
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
      };
      const state = afpAvailability(undefined, action);

      expect(state).to.eql(INITIAL_AVAILABILITY);
    });

    it('should return initial availability action type is not an expected case', () => {
      const action = {
        type: ''
      };
      const state = afpAvailability(undefined, action);

      expect(state).to.eql(INITIAL_AVAILABILITY);
    });

    it('should update afp lastUpdateFailed with new availability if update is successful ', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable, lastUpdateFailed: true };
      const availability = { paymentMethod, isAvailable: true, parameters: { offers: [] } };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS,
        response: [availability]
      };
      const state = afpAvailability(initialState, action, paymentMethod);

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        lastUpdateFailed: false,
        parameters: { offers: [] }
      });
    });

    it('should update afp lastUpdateFailed to true if update fails', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable, lastUpdateFailed: INITIAL_AVAILABILITY.lastUpdateFailed };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED
      };
      const state = afpAvailability(initialState, action, paymentMethod);

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        lastUpdateFailed: !INITIAL_AVAILABILITY.lastUpdateFailed
      });
    });

    context('should initiate afp', () => {
      it('and return isActive as true when paymentMethod matches and hasError as false', () => {
        const paymentMethod = 'paymentMethod';
        const isAvailable = true;
        const initialState = { paymentMethod, isAvailable };

        const action = {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT
        };
        const state = afpAvailability(initialState, action, paymentMethod);

        expect(state).to.eql({
          paymentMethod,
          isAvailable,
          isActive: true,
          hasError: false
        });
      });

      it('and return isActive as false when paymentMethod does not match and hasError as false', () => {
        const paymentMethod = 'paymentMethod';
        const isAvailable = true;
        const initialState = { paymentMethod, isAvailable };

        const action = {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT
        };
        const state = afpAvailability(initialState, action, 'badPaymentMethod');

        expect(state).to.eql({
          paymentMethod,
          isAvailable,
          isActive: false,
          hasError: false
        });
      });
    });

    it('should reset isActive when initiate afp fails', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED
      };
      const state = afpAvailability(initialState, action, paymentMethod);

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        isActive: false
      });
    });

    it('should set hasError to true when integration fails', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
      };
      const state = afpAvailability(initialState, action, paymentMethod);

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        hasError: true
      });
    });

    it('should set isActive to true when reload and submit is successful and paymentMethod matches', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_SUCCESS
      };
      const state = afpAvailability(initialState, action, paymentMethod);

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        isActive: true
      });
    });

    it('should set isActive correctly when reload and submit is successful and paymentMethod doesnt match', () => {
      const paymentMethod = 'paymentMethod';
      const isAvailable = true;
      const initialState = { paymentMethod, isAvailable };

      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_SUCCESS
      };
      const state = afpAvailability(initialState, action, 'diffPaymentMethod');

      expect(state).to.eql({
        paymentMethod,
        isAvailable,
        isActive: false
      });
    });
  });
});
