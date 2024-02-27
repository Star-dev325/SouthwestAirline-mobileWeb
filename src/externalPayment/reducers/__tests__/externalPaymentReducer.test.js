import _ from 'lodash';
import { getCeptorConfig, getCeptorCallbackResponse } from 'test/builders/model/ceptorBuilder';
import externalPaymentReducer from 'src/externalPayment/reducers/externalPaymentReducer';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import ExternalPaymentActionTypes from 'src/externalPayment/actions/externalPaymentActionTypes';

describe('externalPaymentReducer', () => {
  describe('requestedAFPParams', () => {
    it('should return intial state if action unmatched', () => {
      const action = {
        type: 'fake-action'
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.requestedAFPParams).toEqual(null);
    });

    it('should return intial state if action undefined', () => {
      const result = externalPaymentReducer(undefined, undefined);

      expect(result.requestedAFPParams).toEqual(null);
    });

    it('should return action response object if retrieve params success', () => {
      const { requestedAFPParams } = getCeptorConfig();
      const action = {
        type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_SUCCESS,
        response: requestedAFPParams
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.requestedAFPParams).toEqual(requestedAFPParams);
    });
  });

  describe('tokenAvailability', () => {
    it('should return intial state if action unmatched', () => {
      const action = {
        type: 'fake-action'
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.tokenAvailability).toEqual({
        isAvailable: false
      });
    });

    it('should return intial state if action undefined', () => {
      const result = externalPaymentReducer(undefined, undefined);

      expect(result.tokenAvailability).toEqual({
        isAvailable: false
      });
    });

    it('should return isAvailable as false if complete external payment with error code', () => {
      const ceptorResponse = _.merge({}, getCeptorCallbackResponse(), { code: '500' });
      const action = {
        type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
        response: ceptorResponse
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.tokenAvailability).toEqual({
        isAvailable: false
      });
    });

    it('should return isAvailable as true if complete external payment with success code', () => {
      const ceptorResponse = _.merge({}, getCeptorCallbackResponse(), { code: '201' });
      const action = {
        type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
        response: ceptorResponse
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.tokenAvailability).toEqual({
        isAvailable: true
      });
    });
  });

  describe('displayButton', () => {
    it('should return intial state if action unmatched', () => {
      const action = {
        type: 'fake-action'
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.displayButton).toBe(false);
    });

    it('should return intial state if action undefined', () => {
      const result = externalPaymentReducer(undefined, undefined);

      expect(result.displayButton).toBe(false);
    });

    it('should return shouldDisplayButton if setDisplayButton action', () => {
      const action = {
        type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON,
        shouldDisplayButton: true
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.displayButton).toBe(true);
    });

    it('should return true if setup external payment page failed', () => {
      const action = {
        type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_FAILED
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.displayButton).toBe(true);
    });

    it('should return true if initiate external payment page failed', () => {
      const action = {
        type: ExternalPaymentActionTypes.EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_FAILED
      };
      const result = externalPaymentReducer(undefined, action);

      expect(result.displayButton).toBe(true);
    });
  });
});
