import store from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';

function saveExperienceIdToSessionStore(experienceId) {
  store.session(StorageKeys.EXPERIENCE_ID_KEY, experienceId);
}

function loadSavedExperienceId() {
  return store.session(StorageKeys.EXPERIENCE_ID_KEY);
}

export default {
  saveExperienceIdToSessionStore,
  loadSavedExperienceId
};
