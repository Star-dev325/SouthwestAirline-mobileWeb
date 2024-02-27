const clearRequireCache = require('../clearRequireCache');

let pathToStatefulObject = 'src/shared/api/accountsApi';

describe('clearRequireCache', () => {
  context('when an object has been required and cleared', () => {
    let originalStatefulObject;

    beforeEach(() => {
      originalStatefulObject = require(pathToStatefulObject);
      originalStatefulObject.state = 'something we changed it to, somewhere';

      expect(isCached(pathToStatefulObject)).to.be.true;

      clearRequireCache();
    });

    it('should not exist in the require.cache object', () => {
      expect(isCached(pathToStatefulObject)).to.be.false;
    });

    it('should not clear redux store', () => {
      const createReduxStoreFilePath = 'src/shared/redux/createStore';

      require(createReduxStoreFilePath);

      clearRequireCache();

      expect(isCached(createReduxStoreFilePath)).to.be.true;
    });

    context('and is required again', () => {
      let statefulObjectAfterClearingCache;

      beforeEach(() => {
        statefulObjectAfterClearingCache = require(pathToStatefulObject);
      });

      it('should return an entirely different object', () => {
        expect(statefulObjectAfterClearingCache).to.not.be.equal(originalStatefulObject);
      });
    });
  });

  context('objects not in src', () => {
    it('should still be cached', () => {
      pathToStatefulObject = './statefulObjectUsedToTestSpecIsolation';
      require(pathToStatefulObject);
      clearRequireCache();
      expect(isCached(pathToStatefulObject)).to.be.true;
    });
  });

  function isCached(path) {
    const cachedValue = require.cache[require.resolve(path)];

    return typeof(cachedValue) !== 'undefined';
  }
});
