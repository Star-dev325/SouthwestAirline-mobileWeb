import Q from 'q';
import sinonModule from 'sinon';
import * as ContactMethodActions from 'src/shared/actions/contactMethodActions';
import ContactMethodActionTypes from 'src/shared/actions/contactMethodActionTypes';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as AccountsApi from 'src/shared/api/accountsApi';

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

context('contactMethod', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('updateSavedContactMethod', () => {
    beforeEach(() => {
      sinon.stub(AccountsApi, 'saveContactMethod');
    });

    it('should create CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_SUCCESS when updateSavedContactMethod success', () => {
      AccountsApi.saveContactMethod.returns(Q());

      return store
        .dispatch(
          ContactMethodActions.updateSavedContactMethod(new ContactMethodInfoBuilder().withSaveContactMethod().build())
        )
        .then(() => {
          const actions = store.getActions();

          expect(actions[1]).to.deep.equal({
            type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_SUCCESS
          });
        });
    });

    it('should create CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD_FAILED when updateSavedContactMethod failed', () => {
      AccountsApi.saveContactMethod.returns(Q.reject());

      return store
        .dispatch(ContactMethodActions.updateSavedContactMethod(new ContactMethodInfoBuilder().build()))
        .then(() => {
          expect(store.getActions()).to.deep.equal([]);
        });
    });
  });
});
