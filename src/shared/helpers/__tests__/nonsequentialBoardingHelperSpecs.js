import store from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  saveHasSeenNonsequentialMessage,
  loadHasSeenNonsequentialMessage,
  clearHasSeenNonsequentialMessage
} from 'src/shared/helpers/nonsequentialBoardingHelper';

const { NONSEQUENTIAL_BOARDING_FLAG_KEY } = StorageKeys;

describe('nonsequentialBoardingHelper', () => {
  context('saveHasSeenNonsequentialMessage', () => {
    afterEach(() => {
      clearHasSeenNonsequentialMessage();
    });

    it('should store recordLocator string in an array in session storage', () => {
      saveHasSeenNonsequentialMessage('ABC123');
      expect(store.session(NONSEQUENTIAL_BOARDING_FLAG_KEY)).to.deep.equal(['ABC123']);
    });

    it('should append recordLocator string to existing array in session storage', () => {
      saveHasSeenNonsequentialMessage('ABC123');
      expect(store.session(NONSEQUENTIAL_BOARDING_FLAG_KEY)).to.deep.equal(['ABC123']);

      saveHasSeenNonsequentialMessage('ABC123');
      expect(store.session(NONSEQUENTIAL_BOARDING_FLAG_KEY)).to.deep.equal(['ABC123', 'ABC123']);
    });
  });

  context('loadHasSeenNonsequentialMessage', () => {
    afterEach(() => {
      clearHasSeenNonsequentialMessage();
    });

    it('should return false if no item in this session storage exists', () => {
      const result = loadHasSeenNonsequentialMessage('ABC123');

      expect(result).to.be.false;
    });

    it('should return false if given string is not in session storage array', () => {
      saveHasSeenNonsequentialMessage('123456');
      const result = loadHasSeenNonsequentialMessage('ABC123');

      expect(result).to.be.false;
    });

    it('should return true if given string is in session storage array', () => {
      saveHasSeenNonsequentialMessage('ABC123');
      const result = loadHasSeenNonsequentialMessage('ABC123');

      expect(result).to.be.true;
    });
  });

  context('clearHasSeenNonsequentialMessage', () => {
    it('should set session storage item to empty array', () => {
      saveHasSeenNonsequentialMessage('ABC123');
      expect(store.session(NONSEQUENTIAL_BOARDING_FLAG_KEY)).to.deep.equal(['ABC123']);

      clearHasSeenNonsequentialMessage();
      expect(store.session(NONSEQUENTIAL_BOARDING_FLAG_KEY)).to.deep.equal([]);
    });
  });
});
