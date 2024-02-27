import store from 'store2';
import dayjs from 'dayjs';

const StoreWithExpiration = {
  save(key, jsonData, expirationMin, timestampOverride) {
    const timestamp = expirationMin ? dayjs().add(expirationMin, 'minutes').unix() : undefined;

    const record = { value: jsonData, timestamp: timestampOverride || timestamp };

    store.set(key, record);

    return jsonData;
  },
  load(key) {
    const record = store.get(key);

    if (!record) {
      return null;
    }

    if (!record.timestamp) {
      return record.value;
    } else if (dayjs().unix() >= record.timestamp) {
      store.remove(key);

      return null;
    } else {
      return record.value;
    }
  }
};

export default StoreWithExpiration;
