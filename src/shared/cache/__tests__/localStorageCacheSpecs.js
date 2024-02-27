import { sandbox } from 'sinon';
import localStorage from 'store2';

import StoreWithExpiration from 'src/shared/helpers/storeWithExpiration';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import * as EnvironmentConfig from 'src/shared/config/environmentConfig';
import * as HashHelper from 'src/shared/helpers/hashHelper';
import CacheConfig from 'src/shared/cache/cacheConfig';

import StorageKeys from 'src/shared/helpers/storageKeys';

const {
  ACCOUNT_INFO,
  CHASE_SESSION_ID_KEY,
  LAST_BOOKABLE_DATE_CACHE_KEY,
  PRODUCT_DEFINITIONS_CACHE_KEY,
  CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY,
  CHASE_PREQUAL_OFFERS_KEY,
  CHASE_SWA_OFFERS_IDENTITY_KEY,
  CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY,
  USER_INFO_CACHE_KEY
} = StorageKeys;

const sinon = sandbox.create();

describe('LocalStorageCache', () => {
  const offerIdentifier = '1234567';
  const swaOffersIdentitySource = 't';

  beforeEach(() => {
    sinon.stub(localStorage, 'set');
    sinon.stub(localStorage, 'clear');
    sinon.stub(localStorage, 'remove');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#validateAppVersion', () => {
    const currentVersion = '1.0.0';
    const newVersion = '1.1.0';

    beforeEach(() => {
      sinon.stub(localStorage, 'get').withArgs('version').returns(currentVersion);
    });

    context('when app version matches version saved in local storage', () => {
      beforeEach(() => {
        sinon.stub(EnvironmentConfig, 'getAppVersion').returns(currentVersion);

        LocalStorageCache.validateAppVersion();
      });

      it('should NOT clear localStorage', () => {
        expect(localStorage.clear).to.not.be.called;
      });
    });

    context('when app version DOES NOT match version saved in local storage', () => {
      beforeEach(() => {
        sinon.stub(EnvironmentConfig, 'getAppVersion').returns(newVersion);

        LocalStorageCache.validateAppVersion();
      });

      it('should clear localStorage', () => {
        expect(localStorage.clear).to.be.called;
      });

      it('should write the new version to localStorage', () => {
        expect(localStorage.set).to.be.calledWith('version', newVersion);
      });
    });
  });

  describe('chase', () => {
    context('session id', () => {
      const fakeSessionId = 'fakeSessionId';

      it('should save id', () => {
        LocalStorageCache.saveChaseSessionId(fakeSessionId).then((sessionId) => {
          expect(sessionId).to.equal(fakeSessionId);
        });
      });

      it('should return id when not expired', () => {
        sinon.stub(StoreWithExpiration, 'load').withArgs(CHASE_SESSION_ID_KEY).returns(fakeSessionId);
        LocalStorageCache.saveChaseSessionId(fakeSessionId);

        LocalStorageCache.loadChaseSessionId().then((sessionId) => {
          expect(sessionId).to.equal(fakeSessionId);
        });
      });

      it('should error message when expired', () => {
        sinon.stub(StoreWithExpiration, 'load').withArgs(CHASE_SESSION_ID_KEY).returns(null);

        LocalStorageCache.loadChaseSessionId().catch((error) => {
          expect(error).to.equal("Can't find chase session id from localStorage.");
        });
      });
    });

    context('swa offers identity', () => {
      it('should save identity object', () => {
        const offersData = { offerIdentifier, swaOffersIdentitySource };
        const saveStub = sinon.stub(StoreWithExpiration, 'save').returns(offersData);

        sinon.stub(StoreWithExpiration, 'load').withArgs(CHASE_PREQUAL_OFFERS_KEY).returns(offersData);

        LocalStorageCache.saveSwaOffersIdentity();

        expect(saveStub).to.have.been.calledWith(
          CHASE_SWA_OFFERS_IDENTITY_KEY,
          { offerIdentifier: '1234567', swaOffersIdentitySource: 't' },
          30,
          undefined
        );
      });

      it('should return identity object', () => {
        sinon.stub(StoreWithExpiration, 'load').withArgs(CHASE_SWA_OFFERS_IDENTITY_KEY).returns('t');

        expect(LocalStorageCache.getSwaOffersIdentity()).to.equal('t');
      });
    });

    context('prequal offers', () => {
      const hashedAccountNumber = 'hashed-account-number';
      const offers = { accountNumber: hashedAccountNumber };

      context('save', () => {
        it('should save offers with ttl and timestamp override', async () => {
          const override = 'override';
          const ttl = 'ttl';

          const saveStub = sinon.stub(StoreWithExpiration, 'save').returns(offers);

          const result = await LocalStorageCache.saveChasePrequalOffers(offers, ttl, override);

          expect(result).to.equal(offers);
          expect(saveStub).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY, offers, ttl, override);
        });
      });

      context('load', () => {
        const accountNumber = 'account-number';
        const accountInfo = { customerInfo: { accountNumber } };

        let createSha256HashStub;
        let loadStub;

        beforeEach(() => {
          createSha256HashStub = sinon.stub(HashHelper, 'createSha256Hash');
          loadStub = sinon.stub(StoreWithExpiration, 'load').withArgs(CHASE_PREQUAL_OFFERS_KEY);

          sinon.stub(localStorage, 'get').withArgs(ACCOUNT_INFO).returns(accountInfo);
        });

        it('should return offers when logged in account number matches', async () => {
          createSha256HashStub.returns(hashedAccountNumber);
          loadStub.returns(offers);

          const result = await LocalStorageCache.loadChasePrequalOffers();

          expect(result).to.equal(offers);
          expect(loadStub).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY);
          expect(createSha256HashStub).to.have.been.calledWith(accountNumber);
        });

        it('should return rejected promise when logged in account number does not match', async () => {
          createSha256HashStub.returns('different-hashed-account-number');
          loadStub.returns(offers);

          await LocalStorageCache.loadChasePrequalOffers().catch((error) =>
            expect(error.message).to.equal('Current account number and prequal account number are different.')
          );

          expect(loadStub).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY);
          expect(createSha256HashStub).to.have.been.calledWith(accountNumber);
        });

        it('should return rejected promise when offers are expired', async () => {
          loadStub.returns(null);

          await LocalStorageCache.loadChasePrequalOffers().catch((error) =>
            expect(error).to.equal("Can't find chasePrequalOffers from localStorage.")
          );

          expect(loadStub).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY);
          expect(createSha256HashStub).to.not.have.been.called;
        });

        it('should return offers when it should not validate account', async () => {
          createSha256HashStub.returns('different-hashed-account-number');
          loadStub.returns(offers);

          const result = await LocalStorageCache.loadChasePrequalOffers(false);

          expect(result).to.equal(offers);
          expect(loadStub).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY);
        });
      });

      context('delete', () => {
        it('should call remove method from localStorage', () => {
          LocalStorageCache.deleteChasePrequalOffers();

          expect(localStorage.remove).to.have.been.calledWith(CHASE_PREQUAL_OFFERS_KEY);
        });
      });
    });
  });

  describe('last bookable date', () => {
    const fakeDate = '2020-08-12';

    it('should save last bookable date', () => {
      LocalStorageCache.saveLastBookableDate(fakeDate).then((response) => {
        expect(response).to.equal(fakeDate);
      });
    });

    it('should return last bookable date when not expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(LAST_BOOKABLE_DATE_CACHE_KEY).returns(fakeDate);
      LocalStorageCache.saveLastBookableDate(fakeDate);

      const response = LocalStorageCache.loadLastBookableDate();

      expect(response).to.equal(fakeDate);
    });

    it('should not return last bookable date when expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(LAST_BOOKABLE_DATE_CACHE_KEY).returns(null);

      const response = LocalStorageCache.loadLastBookableDate();

      expect(response).to.equal(null);
    });
  });

  describe('calendar schedule message', () => {
    const testMessage = 'test message';

    it('should save calendar schedule message', () => {
      LocalStorageCache.saveCalendarScheduleMessage(testMessage).then((response) => {
        expect(response).to.equal(testMessage);
      });
    });

    it('should return calendar schedule message when not expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY).returns(testMessage);
      LocalStorageCache.saveCalendarScheduleMessage(testMessage);

      const response = LocalStorageCache.loadCalendarScheduleMessage();

      expect(response).to.equal(testMessage);
    });

    it('should not return calendar schedule message when expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(CALENDAR_SCHEDULE_MESSAGE_CACHE_KEY).returns(null);

      const response = LocalStorageCache.loadCalendarScheduleMessage();

      expect(response).to.equal(null);
    });
  });

  describe('product definitions', () => {
    const fakeProductDefinitions = { product: 'definitions' };

    it('should save product definitions', () => {
      LocalStorageCache.saveProductDefinitions(fakeProductDefinitions).then((response) => {
        expect(response).to.equal(fakeProductDefinitions);
      });
    });

    it('should return product definitions when not expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(PRODUCT_DEFINITIONS_CACHE_KEY).returns(fakeProductDefinitions);
      LocalStorageCache.saveProductDefinitions(fakeProductDefinitions);

      const response = LocalStorageCache.loadProductDefinitions();

      expect(response).to.equal(fakeProductDefinitions);
    });

    it('should not return product definitions when expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(PRODUCT_DEFINITIONS_CACHE_KEY).returns(null);

      const response = LocalStorageCache.loadProductDefinitions();

      expect(response).to.equal(null);
    });
  });
  describe('user info', () => {
    it('save user info', async () => {
      const userData = { name: 'user1' };
      const saveStub = sinon.stub(StoreWithExpiration, 'save').returns(userData);
      const data = await LocalStorageCache.saveUserInfo(userData);

      expect(data).to.equal(userData);
      expect(saveStub).to.have.been.calledWith(USER_INFO_CACHE_KEY, userData, CacheConfig.USER_INFO_EXPIRED_MINUTES);
    });

    it('load user info', async () => {
      const userData = { name: 'user1' };
      const loadStub = sinon.stub(StoreWithExpiration, 'load').returns(userData);
      const data = await LocalStorageCache.loadUserInfo();

      expect(data).to.equal(userData);
      expect(loadStub).to.have.been.calledWith(USER_INFO_CACHE_KEY);
    });

    it('delete user info', async () => {
      LocalStorageCache.deleteUserInfo();

      expect(localStorage.remove).to.have.been.calledWith(USER_INFO_CACHE_KEY);
    });
  });
  describe('when corporate', () => {
    const mockSwitchInfo = { switchLabel: 'SWABIZ Booking' };

    it('should save corporate switch info', () => {
      LocalStorageCache.saveCorporateBookingSwitchInfo(mockSwitchInfo).then((response) => {
        expect(response).to.equal(mockSwitchInfo);
      });
    });

    it('should return corporate switch info when not expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY).returns(mockSwitchInfo);
      LocalStorageCache.saveCorporateBookingSwitchInfo(mockSwitchInfo);

      const response = LocalStorageCache.loadCorporateBookingSwitchInfo();

      expect(response).to.equal(mockSwitchInfo);
    });

    it('should not return corporate switch info when expired', () => {
      sinon.stub(StoreWithExpiration, 'load').withArgs(CORPORATE_BOOKING_SWITCH_INFO_CACHE_KEY).returns(null);

      const response = LocalStorageCache.loadCorporateBookingSwitchInfo();

      expect(response).to.equal(null);
    });
  });
});
