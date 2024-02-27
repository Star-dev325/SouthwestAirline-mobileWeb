import store2 from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { NONSEQUENTIAL_BOARDING_FLAG_KEY } = StorageKeys;

export const saveHasSeenNonsequentialMessage = (newRecordLocator) => {
  const nonSequentialPnrs = store2.session.get(NONSEQUENTIAL_BOARDING_FLAG_KEY) || [];

  nonSequentialPnrs.push(newRecordLocator);
  store2.session.set(NONSEQUENTIAL_BOARDING_FLAG_KEY, nonSequentialPnrs);
};

export const loadHasSeenNonsequentialMessage = (recordLocator) =>
  (store2.session.get(NONSEQUENTIAL_BOARDING_FLAG_KEY)
    ? store2.session.get(NONSEQUENTIAL_BOARDING_FLAG_KEY).includes(recordLocator)
    : false);

export const clearHasSeenNonsequentialMessage = () => {
  store2.session.set(NONSEQUENTIAL_BOARDING_FLAG_KEY, []);
};
