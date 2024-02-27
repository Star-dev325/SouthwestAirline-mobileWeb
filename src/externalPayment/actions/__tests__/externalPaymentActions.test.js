jest.mock('src/shared/actions/alternativeFormsOfPaymentActions', () => ({
  retrieveAFPParams: jest.fn(() => () => Promise.resolve({ type: 'fake-type' })),
  selectAlternativeFormOfPayment: jest.fn(() => () => Promise.resolve({ type: 'fake-type' })),
  setUpAlternativeFormsOfPayment: jest.fn(() => () => Promise.resolve({ type: 'fake-type' })),
  updateAlternativeFormsOfPayment: jest.fn(() => () => Promise.resolve({ type: 'fake-type' }))
}));

import _ from 'lodash';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { getCeptorConfigParams, getCeptorConfigWithAmount } from 'test/builders/model/ceptorBuilder';
import * as ExternalPaymentActions from 'src/externalPayment/actions/externalPaymentActions';
import ExternalPaymentActionTypes from 'src/externalPayment/actions/externalPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { INITIAL_AVAILABILITY } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

const {
  EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT,
  EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_SUCCESS,
  EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_FAILED,
  EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT,
  EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_SUCCESS,
  EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_FAILED,
  EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
  EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON
} = ExternalPaymentActionTypes;

const mockStore = configureMockStore();

describe('ExternalPaymentActions', () => {
  let store;
  const ceptorConfig = getCeptorConfigWithAmount(10000);
  const ceptorConfigParams = getCeptorConfigParams();
  const requestedAFPParams = _.get(ceptorConfig, 'requestedAFPParams');
  const provider = 'provider';
  const paymentMethod = 'paymentMethod';
  const persistenceIdentifier = 'uuid';

  beforeEach(() => {
    store = mockStore({ app: { externalPayment: { requestedAFPParams } } });

    jest.clearAllMocks();
  });

  describe('setUpExternalPaymentPage', () => {
    describe('when retrieve params resolves', () => {
      it('should call setUpAlternativeFormsOfPaymentFn', async () => {
        await store.dispatch(
          ExternalPaymentActions.setUpExternalPaymentPage(
            ceptorConfigParams,
            [INITIAL_AVAILABILITY],
            provider,
            paymentMethod,
            persistenceIdentifier,
            _.noop
          )
        );

        const ceptorConfigWithParams = {
          ceptorConfigParams: ceptorConfigParams.ceptorConfigParams,
          requestedAFPParams
        };
        const actions = store.getActions();

        expect(actions).toEqual([
          { type: EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT, isFetching: true },
          { type: EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_SUCCESS, isFetching: false }
        ]);
        expect(AlternativeFormsOfPaymentActions.retrieveAFPParams).toHaveBeenCalled;
        expect(AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment).toHaveBeenCalledWith(
          [INITIAL_AVAILABILITY],
          ceptorConfigWithParams,
          expect.anything(),
          expect.anything(),
          false
        );
      });
    });

    describe('when retrieve params rejects', () => {
      it('should error scenario', async () => {
        AlternativeFormsOfPaymentActions.retrieveAFPParams.mockImplementationOnce(
          () => () => Promise.reject(new Error()));

        await store.dispatch(
          ExternalPaymentActions.setUpExternalPaymentPage(
            ceptorConfigParams,
            provider,
            paymentMethod,
            persistenceIdentifier,
            _.noop
          )
        );

        expect(store.getActions()).toEqual([
          { type: EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT, isFetching: true },
          { type: EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_FAILED, isFetching: false }
        ]);

        expect(AlternativeFormsOfPaymentActions.retrieveAFPParams).toHaveBeenCalled;
      });
    });
  });

  describe('initiateExternalPaymentMethod', () => {
    it('should dispatch initiate actions and call selectAlternativeFormOfPayment and setUpAlternativeFormsOfPayment when select resolves', async () => {
      await store.dispatch(
        ExternalPaymentActions.initiateExternalPaymentMethod(
          ceptorConfigParams,
          requestedAFPParams,
          provider,
          paymentMethod
        )
      );

      const actions = store.getActions();

      expect(actions).toEqual([
        { type: EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT, isFetching: true },
        { type: EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_SUCCESS, isFetching: false }
      ]);

      expect(AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment).toHaveBeenCalled;
      expect(AlternativeFormsOfPaymentActions.updateAlternativeFormsOfPayment).toHaveBeenCalledWith(
        { ceptorConfigParams: ceptorConfigParams.ceptorConfigParams, requestedAFPParams },
        true
      );
    });

    it('should dispatch initiate actions and call selectAlternativeFormOfPayment and not call setUpAlternativeFormsOfPayment when select rejects', async () => {
      AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment.mockImplementationOnce(
        () => () => Promise.reject('Error'));
      await store.dispatch(
        ExternalPaymentActions.initiateExternalPaymentMethod(
          ceptorConfigParams,
          requestedAFPParams,
          provider,
          paymentMethod
        )
      );

      const actions = store.getActions();

      expect(actions).toEqual([
        { type: EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT, isFetching: true },
        { type: EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_FAILED, isFetching: false, error: 'Error' }
      ]);

      expect(AlternativeFormsOfPaymentActions.electAlternativeFormOfPayment).toHaveBeenCalled;
      expect(AlternativeFormsOfPaymentActions.updateAlternativeFormsOfPayment).not.toHaveBeenCalled;
    });
  });

  describe('completeExternalPayment', () => {
    it('should dispatch action', () => {
      store.dispatch(ExternalPaymentActions.completeExternalPayment({}));

      expect(store.getActions()).toEqual([{
        type: EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
        response: {}
      }]);
    });
  });

  describe('setDisplayButton', () => {
    it('should dispatch action', () => {
      store.dispatch(ExternalPaymentActions.setDisplayButton(true));

      expect(store.getActions()).toEqual([{
        type: EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON,
        shouldDisplayButton: true
      }]);
    });
  });
});
