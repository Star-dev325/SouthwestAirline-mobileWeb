import uuidGenerator from 'uuid-js';

class UUIDRepo {
  constructor() {
    this.uuid = '';
  }

  restoreUUID = (inputUUID) => {
    if (inputUUID) {
      this.uuid = uuidGenerator.fromURN(inputUUID.toString());
    }
  };

  generateUUID = () => {
    this.uuid = uuidGenerator.create();
  };

  getUUID() {
    return this.uuid.toString();
  }
}

export default new UUIDRepo();
