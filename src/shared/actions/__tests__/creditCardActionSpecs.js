import Q from 'q';
import sinonModule from 'sinon';
import * as AccountsApi from 'src/shared/api/accountsApi';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import createMockStore from 'test/unit/helpers/createMockStore';
import GlobalHeaderActionTypes from 'src/shared/actions/globalHeaderActionTypes';

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

const { GLOBAL_HEADER__SHOW_EDIT_BUTTON, GLOBAL_HEADER__HIDE_BUTTON } = GlobalHeaderActionTypes;

describe('creditCardActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('credit card update', () => {
    it('should set credit card update info when fetch one credit card info success', () => {
      sinon
        .stub(AccountsApi, 'fetchSavedCreditCardsById')
        .returns(Q({ updateSavedCreditCardPage: 'updateSavedCreditCardPage' }));

      return store.dispatch(CreditCardActions.getSavedCreditCardById('creditCardId', 'fakeModalId')).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID
          },
          {
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_SUCCESS,
            updateSavedCreditCardPage: 'updateSavedCreditCardPage'
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch error when fetch one credit card info fail', () => {
      sinon.stub(AccountsApi, 'fetchSavedCreditCardsById').returns(Q.reject('error'));

      return store.dispatch(CreditCardActions.getSavedCreditCardById()).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID
          },
          {
            error: 'error',
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_FAILED
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should call hideFullScreenModal after fetchSavedCreditCardsAfterUpdate', async () => {
      const updateCreditCardReponse = { updateCreditCardReponse: 'updateCreditCardReponse' };
      const updateCreditCardFormData = {
        addressLine1: '956 Main St',
        addressLine2: '',
        cardDescription: 'VISA 9999',
        city: 'Brooklyn',
        creditCardType: 'VISA',
        expiration: '2021-05',
        isoCountryCode: 'US',
        nameOnCard: 'Li Rui',
        savedCreditCardId: '1-J2PASC',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '37693'
      };

      const hideFullScreenModalStub = sinon.stub(fullScreenModalHelper, 'hideFullScreenModal');
      const fetchPaymentOptionsStub = sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q());

      sinon.stub(AccountsApi, 'updateCreditCard').returns(Q(updateCreditCardReponse));

      await store.dispatch(CreditCardActions.updateCreditCard(updateCreditCardFormData, 'fakeModalId'));

      expect(fetchPaymentOptionsStub).to.have.been.called;
      expect(hideFullScreenModalStub).to.have.been.called;
      expect(hideFullScreenModalStub).to.have.been.calledAfter(fetchPaymentOptionsStub);
    });

    it('should dispatch update credit card success and fetch saved credit cards when both update credit card and fetch saved credit cards success', () => {
      const updateCreditCardReponse = { updateCreditCardReponse: 'updateCreditCardReponse' };
      const updateCreditCardFormData = {
        addressLine1: '956 Main St',
        addressLine2: '',
        cardDescription: 'VISA 9999',
        city: 'Brooklyn',
        creditCardType: 'VISA',
        expiration: '2021-05',
        isoCountryCode: 'US',
        nameOnCard: 'Li Rui',
        savedCreditCardId: '1-J2PASC',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '37693'
      };

      sinon.stub(AccountsApi, 'updateCreditCard').returns(Q(updateCreditCardReponse));
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

      return store.dispatch(CreditCardActions.updateCreditCard(updateCreditCardFormData, 'fakeModalId')).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD
          },
          {
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD_SUCCESS
          },
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE
          },
          {
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_SUCCESS
          },
          {
            type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
          },
          {
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage',
            type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch update credit card success and dispatch error when update credit card success and fetch saved credit cards fail', () => {
      const updateCreditCardReponse = { updateCreditCardReponse: 'updateCreditCardReponse' };
      const updateCreditCardFormData = {
        addressLine1: '956 Main St',
        addressLine2: '',
        cardDescription: 'VISA 9999',
        city: 'Brooklyn',
        creditCardType: 'VISA',
        expiration: '2021-05',
        isoCountryCode: 'US',
        nameOnCard: 'Li Rui',
        savedCreditCardId: '1-J2PASC',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '37693'
      };

      sinon.stub(AccountsApi, 'updateCreditCard').returns(Q(updateCreditCardReponse));
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject('errorMessage'));

      return store.dispatch(CreditCardActions.updateCreditCard(updateCreditCardFormData, 'fakeModalId')).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD
          },
          {
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD_SUCCESS
          },
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE
          },
          {
            error: 'errorMessage',
            isFetching: false,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_FAILED
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch update credit card fail when update credit card fail', () => {
      const updateCreditCardFormData = {
        addressLine1: '956 Main St',
        addressLine2: '',
        cardDescription: 'VISA 9999',
        city: 'Brooklyn',
        creditCardType: 'VISA',
        expiration: '2021-05',
        isoCountryCode: 'US',
        nameOnCard: 'Li Rui',
        savedCreditCardId: '1-J2PASC',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '37693'
      };

      sinon.stub(AccountsApi, 'updateCreditCard').returns(Q.reject('error'));

      return store.dispatch(CreditCardActions.updateCreditCard(updateCreditCardFormData, 'fakeModalId')).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD
          },
          {
            isFetching: false,
            error: 'error',
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD_FAILED
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch fetch credit cards and hide button when user relogin success', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

      return store.dispatch(CreditCardActions.fetchCreditCardsAndQuitEditMode()).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          { type: GLOBAL_HEADER__HIDE_BUTTON },
          { type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE, isFetching: true },
          { type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_SUCCESS, isFetching: false },
          { type: GLOBAL_HEADER__SHOW_EDIT_BUTTON },
          {
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage',
            type: 'CREDIT_CARD__SET_SAVED_CREDIT_CARDS'
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch fetch credit cards , hide button and go back when user relogin success with go back flag', () => {
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

      return store.dispatch(CreditCardActions.fetchCreditCardsAndQuitEditMode(true)).then(() => {
        const actions = store.getActions();
        const expectedActions = [
          { type: GLOBAL_HEADER__HIDE_BUTTON },
          { type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE, isFetching: true },
          { type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_SUCCESS, isFetching: false },
          { type: GLOBAL_HEADER__SHOW_EDIT_BUTTON },
          {
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage',
            type: 'CREDIT_CARD__SET_SAVED_CREDIT_CARDS'
          },
          {
            payload: {
              args: [],
              method: 'goBack'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        expect(actions).to.deep.equal(expectedActions);
      });
    });
  });

  context('credit card edit', () => {
    context('make credit card primary', () => {
      it('should dispatch success action when makeCreditCardPrimaryAndUpdateCreditCard and fetchPaymentOptions both success', () => {
        sinon.stub(AccountsApi, 'makeCreditCardPrimary').returns(Q());
        sinon
          .stub(AccountsApi, 'fetchPaymentOptions')
          .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_SUCCESS,
            isFetching: false
          },
          {
            type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
            paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage'
          }
        ];

        return store.dispatch(CreditCardActions.makeCreditCardPrimaryAndUpdateCreditCard('1-J1I8Z8')).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });

      it('should dispatch fail action when makeCreditCardPrimaryAndUpdateCreditCard fail and fetchPaymentOptions success', () => {
        sinon.stub(AccountsApi, 'makeCreditCardPrimary').returns(Q.reject('error'));
        sinon
          .stub(AccountsApi, 'fetchPaymentOptions')
          .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            error: 'error',
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_FAILED,
            isFetching: false
          }
        ];

        return store.dispatch(CreditCardActions.makeCreditCardPrimaryAndUpdateCreditCard('1-J1I8Z8')).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });

      it('should dispatch fail action when makeCreditCardPrimaryAndUpdateCreditCard success and fetchPaymentOptions fail', () => {
        sinon.stub(AccountsApi, 'makeCreditCardPrimary').returns(Q());
        sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject('error'));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            error: 'error',
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_FAILED,
            isFetching: false
          }
        ];

        return store.dispatch(CreditCardActions.makeCreditCardPrimaryAndUpdateCreditCard('1-J1I8Z8')).catch(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });

      it('should dispatch fail action when makeCreditCardPrimaryAndUpdateCreditCard fail and fetchPaymentOptions success', () => {
        sinon.stub(AccountsApi, 'makeCreditCardPrimary').returns(Q.reject('error'));
        sinon
          .stub(AccountsApi, 'fetchPaymentOptions')
          .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            error: 'error',
            type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_FAILED,
            isFetching: false
          }
        ];

        return store.dispatch(CreditCardActions.makeCreditCardPrimaryAndUpdateCreditCard('1-J1I8Z8')).catch(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });
    });

    context('delete credit cards', () => {
      it('should dispatch correct action when deleteCreditCards and fetchPaymentOptions both success', () => {
        sinon.stub(AccountsApi, 'deleteCreditCards').returns(Q());
        sinon
          .stub(AccountsApi, 'fetchPaymentOptions')
          .returns(Q({ paymentSavedCreditCardsPage: { primaryCard: 'any card' } }));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_SUCCESS,
            isFetching: false
          },
          {
            type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
            paymentSavedCreditCardsPage: { primaryCard: 'any card' }
          }
        ];

        return store.dispatch(CreditCardActions.deleteCreditCardsAndUpdateCreditCard(['1-J1I8Z8'])).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });

      it('should dispatch correct action when deleteCreditCards and fetchPaymentOptions both success', () => {
        sinon.stub(AccountsApi, 'deleteCreditCards').returns(Q());
        sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q({ paymentSavedCreditCardsPage: null }));

        const expectedActions = [
          {
            type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD,
            isFetching: true
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_SUCCESS,
            isFetching: false
          },
          {
            type: GLOBAL_HEADER__HIDE_BUTTON
          },
          {
            type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
            paymentSavedCreditCardsPage: null
          }
        ];

        return store.dispatch(CreditCardActions.deleteCreditCardsAndUpdateCreditCard(['1-J1I8Z8'])).then(() => {
          const actions = store.getActions();

          expect(actions).to.deep.equal(expectedActions);
        });
      });
    });

    it('should dispatch fail action when deleteCreditCards fail and fetchPaymentOptions success', () => {
      sinon.stub(AccountsApi, 'deleteCreditCards').returns(Q.reject('error'));
      sinon
        .stub(AccountsApi, 'fetchPaymentOptions')
        .returns(Q({ paymentSavedCreditCardsPage: 'paymentSavedCreditCardsPage' }));

      const expectedActions = [
        {
          type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD,
          isFetching: true
        },
        {
          error: 'error',
          type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_FAILED,
          isFetching: false
        }
      ];

      return store.dispatch(CreditCardActions.deleteCreditCardsAndUpdateCreditCard(['1-J1I8Z8'])).then(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
      });
    });

    it('should dispatch fail action when deleteCreditCards success and fetchPaymentOptions fail', () => {
      sinon.stub(AccountsApi, 'makeCreditCardPrimary').returns(Q());
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject('error'));

      const expectedActions = [
        {
          type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD,
          isFetching: true
        },
        {
          error: 'error',
          type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_FAILED,
          isFetching: false
        }
      ];

      return store.dispatch(CreditCardActions.deleteCreditCardsAndUpdateCreditCard(['1-J1I8Z8'])).catch(() => {
        const actions = store.getActions();

        expect(actions).to.deep.equal(expectedActions);
      });
    });
  });

  context('fetch saved credit cards', () => {
    it('should fetch all saved credit cards and transiton to next page', () => {
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q({ paymentSavedCreditCardsPage: 'savedCreditCards' }));

      return store.dispatch(CreditCardActions.fetchSavedCreditCardsAndGoToNextPage()).then(() => {
        expect(store.getActions()).to.be.deep.equal([
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS
          },
          {
            isFetching: false,
            response: 'savedCreditCards',
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS
          },
          {
            payload: {
              args: [undefined],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });
    });

    it('should trigger actions when fetching all saved credit cards succeeds', () => {
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q({ paymentSavedCreditCardsPage: 'savedCreditCards' }));

      return store.dispatch(CreditCardActions.getSavedCreditCards()).then(() => {
        expect(store.getActions()).to.be.deep.equal([
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS
          },
          {
            isFetching: false,
            response: 'savedCreditCards',
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS
          }
        ]);
      });
    });
    it('should trigger actions when fetching all saved credit cards fails', () => {
      sinon.stub(AccountsApi, 'fetchPaymentOptions').returns(Q.reject('error'));

      return store.dispatch(CreditCardActions.getSavedCreditCards()).then(() => {
        expect(store.getActions()).to.be.deep.equal([
          {
            isFetching: true,
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS
          },
          {
            isFetching: false,
            error: 'error',
            type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_FAILED
          }
        ]);
      });
    });
  });

  context('reset saved credit cards', () => {
    it('should dispatch reset saved credit cards action', () => {
      store.dispatch(CreditCardActions.resetSavedCreditCards());
      expect(store.getActions()).to.be.deep.equal([
        {
          type: CreditCardActionTypes.CREDIT_CARD__RESET_SAVED_CREDIT_CARDS
        }
      ]);
    });
  });
});
