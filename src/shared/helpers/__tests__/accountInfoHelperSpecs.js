import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import fakeClock from 'test/unit/helpers/fakeClock';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { ACCOUNT_INFO, OAUTH_LOGIN_STATUS, USERNAME_KEY, CHASE_SESSION_ID_KEY } = StorageKeys;
const sinon = sandbox.create();

describe('AccountInfoHelper', () => {
  let mockLocalStorage;
  let AccountInfoHelpers;
  let cleanUpEndOfSessionStub;

  beforeEach(() => {
    fakeClock.setTimeTo('2017-07-20 09:30');
    mockLocalStorage = {
      set: sinon.stub(),
      get: sinon.stub(),
      remove: sinon.stub()
    };
    cleanUpEndOfSessionStub = sinon.stub().returns({ type: 'FAKE_LOGOUT_ACTION' });
    mockLocalStorage.get.withArgs(OAUTH_LOGIN_STATUS).returns({ expirationDate: '2018-12-27T18:25:45.797' });

    AccountInfoHelpers = proxyquire('src/shared/helpers/accountInfoHelper', {
      store2: mockLocalStorage,
      'src/shared/actions/accountActions': {
        cleanUpEndOfSession: cleanUpEndOfSessionStub
      }
    });
  });

  afterEach(() => {
    sinon.restore();
    fakeClock.restore();
  });

  it('should return an empty string if user name is null', () => {
    mockLocalStorage.get.withArgs(USERNAME_KEY).returns(null);

    expect(AccountInfoHelpers.getSavedUserNameOrAccountNumber()).to.equal('');
  });

  it('getSavedUserNameOrAccountNumber', () => {
    mockLocalStorage.get.withArgs(USERNAME_KEY).returns('Yangjie');

    expect(AccountInfoHelpers.getSavedUserNameOrAccountNumber()).to.equal('Yangjie');
  });

  it('forgetUser', () => {
    AccountInfoHelpers.forgetUser();

    expect(mockLocalStorage.remove).to.have.been.calledWith(USERNAME_KEY);
  });

  it('rememberUser', () => {
    AccountInfoHelpers.rememberUser('Yangjie');

    expect(mockLocalStorage.set).to.have.been.calledWith(USERNAME_KEY, 'Yangjie');
  });

  it('removeOauthLoginSession', () => {
    AccountInfoHelpers.removeOauthLoginSession();

    expect(mockLocalStorage.remove).to.have.been.calledWith(OAUTH_LOGIN_STATUS);
  });

  it('rememberOauthLoginSession', () => {
    const oauthLoginResponse = { expires_in: 1800 };

    AccountInfoHelpers.rememberOauthLoginSession(oauthLoginResponse);

    expect(mockLocalStorage.set).to.have.been.calledWith(OAUTH_LOGIN_STATUS, {
      expires_in: 1800,
      expirationDate: '2017-07-20T10:00:00.000'
    });
  });

  it('removeOauthLoginSession', () => {
    AccountInfoHelpers.removeChaseSessionId();

    expect(mockLocalStorage.remove).to.have.been.calledWith(CHASE_SESSION_ID_KEY);
  });

  it('rememberBasicAccountInfo', () => {
    const basicAccountInfo = {
      customerInfo: {
        accountNumber: '610293923'
      }
    };

    AccountInfoHelpers.rememberBasicAccountInfo(basicAccountInfo);

    expect(mockLocalStorage.set).to.have.been.calledWith(ACCOUNT_INFO, basicAccountInfo);
  });

  it('getExpirationDate', () => {
    mockLocalStorage.get.withArgs(OAUTH_LOGIN_STATUS).returns({ expirationDate: '2018-12-27T18:25:45.797' });

    expect(AccountInfoHelpers.getExpirationDate()).to.deep.equal('2018-12-27T18:25:45.797');
  });

  context('account Infos', () => {
    const accountInfos = {
      customerInfo: {
        accountNumber: '601491240',
        name: {
          userName: 'Yangjie Lu'
        }
      },
      rapidRewardsDetails: {
        redeemablePoints: 41391,
        tierInfo: {
          tier: 'NON_ELITE'
        }
      },
      companionFullName: 'Hellen Wang',
      companionName: {
        firstName: 'Hellen',
        lastName: 'Wang'
      }
    };

    beforeEach(() => {
      mockLocalStorage.get.withArgs(ACCOUNT_INFO).returns(accountInfos);
    });

    it('should return account info', () => {
      expect(AccountInfoHelpers.getAccountInfo()).to.deep.equal(accountInfos);
    });

    context('isOauthSessionExpired', () => {
      it('should return false when OAUTH session is not expired', () => {
        mockLocalStorage.get.withArgs(OAUTH_LOGIN_STATUS).returns({ expirationDate: '2018-12-27T18:25:45.797' });
        expect(AccountInfoHelpers.isOauthSessionExpired()).to.be.false;
      });

      it('should return true when OAUTH session is marked with expiration date as empty string (expired)', () => {
        mockLocalStorage.get.withArgs(OAUTH_LOGIN_STATUS).returns({ expirationDate: '' });
        expect(AccountInfoHelpers.isOauthSessionExpired()).to.be.true;
      });

      it('should return true when OAUTH session has expired', () => {
        mockLocalStorage.get.withArgs(OAUTH_LOGIN_STATUS).returns({ expirationDate: '2017-07-19 09:30' });
        expect(AccountInfoHelpers.isOauthSessionExpired()).to.be.true;
      });
    });

    it('getAccountNumber', () => {
      expect(AccountInfoHelpers.getAccountNumber()).to.equal('601491240');
    });

    it('getUserName', () => {
      expect(AccountInfoHelpers.getUserName()).to.equal('Yangjie Lu');
    });

    it('getAccountRedeemablePoints', () => {
      expect(AccountInfoHelpers.getAccountRedeemablePoints()).to.equal(41391);
    });

    it('getAccountTier', () => {
      expect(AccountInfoHelpers.getAccountTier()).to.equal('NON_ELITE');
    });

    it('getCompanionFullName', () => {
      expect(AccountInfoHelpers.getCompanionFullName()).to.equal('Hellen Wang');
    });

    it('getCompanionFullName', () => {
      expect(AccountInfoHelpers.getCompanionName()).to.deep.equal({
        firstName: 'Hellen',
        lastName: 'Wang'
      });
    });
  });

  context('isLoggedIn', () => {
    it('should return true when local storage has account infos', () => {
      mockLocalStorage.get.withArgs(ACCOUNT_INFO).returns({
        customerInfo: {
          accountNumber: '601491240'
        }
      });

      expect(AccountInfoHelpers.isLoggedIn()).to.be.true;
    });

    it('should return false when local storage does NOT has account infos', () => {
      mockLocalStorage.get.withArgs(ACCOUNT_INFO).returns({});
      expect(AccountInfoHelpers.isLoggedIn()).to.be.false;
    });
  });
});
