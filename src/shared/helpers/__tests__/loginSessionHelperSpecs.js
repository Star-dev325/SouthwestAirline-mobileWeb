import proxyquire from 'proxyquire';
import sinonModule from 'sinon';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import * as LoginInfoHelper from 'src/shared/helpers/loginInfoHelper';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import localStorage from 'store2';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sinonModule.sandbox.create();

describe('loginSessionHelper', () => {
  const decodedToken = { apiContext: { 'companyInformation.companyId': 1234567 } };
  const id_token = 'eyJhbGciOiJSUzI1NiJ9';
  let localStorageStub;

  beforeEach(() => {
    localStorageStub = sinon.stub(localStorage, 'get');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('hasSessionExpired', () => {
    it('should return true if token expired', () => {
      localStorageStub.returns({
        access_token: 'access_token',
        expirationDate: 'date'
      });
      sinon.stub(LoginInfoHelper, 'isAccessTokenExpired').returns(true);

      expect(LoginSessionHelper.hasSessionExpired()).to.be.true;
    });

    it('should return false if token not expired', () => {
      localStorageStub.returns({
        access_token: 'access_token',
        expirationDate: 'date'
      });
      sinon.stub(LoginInfoHelper, 'isAccessTokenExpired').returns(false);

      expect(LoginSessionHelper.hasSessionExpired()).to.be.true;
    });

    it('should return true if expirationDate empty', () => {
      localStorageStub.returns({
        access_token: 'access_token',
        expirationDate: ''
      });
      sinon.stub(LoginInfoHelper, 'isAccessTokenExpired').withArgs('').returns(true);

      expect(LoginSessionHelper.hasSessionExpired()).to.be.true;
    });

    it('should return false if user not signed in', () => {
      localStorageStub.returns({});
      sinon.stub(LoginInfoHelper, 'isAccessTokenExpired').withArgs(undefined).returns(true);

      expect(LoginSessionHelper.hasSessionExpired()).to.be.false;
    });
  });

  context('hasCorporateToken', () => {
    it('should return true if token has swabiz scope ', () => {
      localStorageStub.returns({ scope: 'openid swabiz:mobile:web' });

      expect(LoginSessionHelper.hasCorporateToken()).to.be.true;
    });

    it('should return true if company ID exists ', (done) => {
      const loginSessionHelper = proxyquire('src/shared/helpers/loginSessionHelper', {
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(id_token)
        },
        'jwt-decode': sinon.stub().returns(decodedToken)
      });

      sinon.stub(loginSessionHelper, 'decodeJwt').returns(decodedToken);

      waitFor.untilAssertPass(() => {
        expect(loginSessionHelper.hasCorporateToken()).to.be.true;
      }, done);
    });

    it('should return false if token does not have swabiz scope ', () => {
      localStorageStub.returns({ scope: 'openid dotcom:mobile:web' });

      expect(LoginSessionHelper.hasCorporateToken()).to.be.false;
    });
  });

  context('getCompanyIdFromIdToken', () => {
    it('should return companyId from id_token', () => {
      const loginSessionHelper = proxyquire('src/shared/helpers/loginSessionHelper', {
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(id_token)
        },
        'jwt-decode': sinon.stub().returns(decodedToken)
      });

      sinon.stub(loginSessionHelper, 'decodeJwt').returns(decodedToken);

      expect(loginSessionHelper.getCompanyIdFromIdToken()).to.be.deep.equal(1234567);
    });
  });

  context('hasActiveSessionCookies', () => {
    const id_token = 'eyJhbGciOiJSUzI1NiJ9';

    it('should return true if id_token is found in cookies', () => {
      const loginSessionHelper = proxyquire('src/shared/helpers/loginSessionHelper', {
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(id_token)
        }
      });

      expect(loginSessionHelper.hasActiveSessionCookies()).to.be.true;
    });

    it('should return false if id_token is not found in cookies', () => {
      const loginSessionHelper = proxyquire('src/shared/helpers/loginSessionHelper', {
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(null)
        }
      });

      expect(loginSessionHelper.hasActiveSessionCookies()).to.be.false;
    });
  });

  describe('decodeJwt', () => {
    const mockLocation = '/mock/location/pathname';
    const mockTimestamp = 1234567890;

    let decodeJwtStub;
    let getErrorLogTimestampStub;
    let getLocationPathnameStub;
    let loginSessionHelper;
    let sendErrorLogStub;

    beforeEach(() => {
      decodeJwtStub = sinon.stub();
      getErrorLogTimestampStub = sinon.stub().returns(mockTimestamp);
      getLocationPathnameStub = sinon.stub().returns(mockLocation);
      sendErrorLogStub = sinon.stub();

      loginSessionHelper = proxyquire('src/shared/helpers/loginSessionHelper', {
        'jwt-decode': decodeJwtStub,
        'src/shared/api/helpers/loggingHelper': {
          getErrorLogTimestamp: getErrorLogTimestampStub,
          getLocationPathname: getLocationPathnameStub
        },
        'src/shared/api/loggingApi': {
          sendErrorLog: sendErrorLogStub
        }
      });
    });

    it('should decode a valid jwt', () => {
      decodeJwtStub.returns('decoded token');
      loginSessionHelper.decodeJwt(id_token);

      expect(decodeJwtStub).to.have.been.calledWith(id_token);
    });

    it('should log an error for an invalid jwt', () => {
      decodeJwtStub.throws(new Error('Mock Error'));
      loginSessionHelper.decodeJwt(id_token);

      expect(getErrorLogTimestampStub).to.have.been.called;
      expect(getLocationPathnameStub).to.have.been.called;
      expect(sendErrorLogStub).to.have.been.calledWith(
        [
          {
            action: '',
            component: 'loginSessionHelper',
            count: 1,
            details: `Unable to decode token: ${id_token}`,
            errorCode: null,
            httpCode: null,
            level: LOG_LEVEL.ERROR,
            location: mockLocation,
            message: 'Unable to decode token',
            timestamp: mockTimestamp
          }
        ]
      );
    });
  });
});
