import ExperienceIdHelper from 'src/shared/helpers/experienceIdHelper';
import { sandbox } from 'sinon';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { saveExperienceIdToSessionStore, loadSavedExperienceId } = ExperienceIdHelper;

const sinon = sandbox.create();

describe('ExperienceIdHelper', () => {
  let store;
  const uuid = 'a890af8f-ad4c-4d57-8b0c-8ff6e011fa12';

  beforeEach(() => {
    store = require('store2');
    sinon.stub(store, 'session').withArgs(StorageKeys.EXPERIENCE_ID_KEY).returns(uuid);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('saveExperienceIdToSessionStore', () => {
    it('should call store.session with the right arguments', () => {
      const newUUID = 'a649e354-71ae-45de-b3f4-c8948a2f4a0b';

      const ret = saveExperienceIdToSessionStore(newUUID);

      expect(store.session).to.be.calledOnce.calledWith(StorageKeys.EXPERIENCE_ID_KEY, newUUID);
      expect(ret).to.equal(undefined);
    });
  });

  context('loadSavedExperienceId', () => {
    it('should return the value returned from the store', () => {
      const returnedExperienceId = loadSavedExperienceId();

      expect(store.session).to.be.calledOnce.calledWith(StorageKeys.EXPERIENCE_ID_KEY);
      expect(returnedExperienceId).to.equal(uuid);
    });
  });
});
