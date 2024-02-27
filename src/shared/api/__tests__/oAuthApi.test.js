jest.mock('src/shared/api/apiRoutes', () => ({
  oAuth: 'https://the.mobile.com',
  oAuthClientId: 'oauth-client-id-v4',
  oAuthClientIdCookie: 'oauth-client-id-cookie',
  oAuthClientIdCorporate: 'oauth-client-id-v4-corporate',
  oAuthClientIdCorporateCookie: 'oauth-client-id-corporate-cookie',
  securityApi: '/'
}));
jest.mock('src/shared/api/restClient');
jest.mock('src/shared/swa-persistence/cookie', () => ({ getValue: jest.fn() }));
jest.mock('store2', () => ({ get: jest.fn() }));

import * as OAuthApi from 'src/shared/api/oAuthApi';
import localStorage from 'store2';
import Cookie from 'src/shared/swa-persistence/cookie';

describe('OAuthApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call login with credentials', () => {
    const credentials = {
      userNameOrAccountNumber: '489448944894',
      password: 'Test1234'
    };

    return OAuthApi.login(credentials)
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).toContain('v4/security/token');
        expect(optionsSentToAjax.type).toEqual('POST');
        expect(optionsSentToAjax.body).toEqual({
          response_type: 'id_token swa_token',
          scope: 'openid',
          client_id: 'oauth-client-id-cookie',
          username: '489448944894',
          password: 'Test1234'
        });
        expect(optionsSentToAjax.dataType).toEqual('json');
      });
  });

  it('should call logout', () =>
    OAuthApi.logout()
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).toContain('v4/security/logout');
        expect(optionsSentToAjax.type).toEqual('POST');
        expect(optionsSentToAjax.dataType).toEqual('json');
        expect(optionsSentToAjax.authentication).toEqual(true);
      })
  );

  it('should call fetchUserInfo', () =>
    OAuthApi.fetchUserInfo()
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).toContain('v4/security/userinfo');
        expect(optionsSentToAjax.type).toEqual('GET');
        expect(optionsSentToAjax.dataType).toEqual('json');
        expect(optionsSentToAjax.authentication).toEqual(true);
      })
  );

  it('should call grantCorporateToken', () => {
    const companyId = '99587574';

    localStorage.get.mockReturnValueOnce({ id_token: 'mock-corporate-id-token%' });

    return OAuthApi.grantCorporateToken(companyId)
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).toContain('v4/security/token');
        expect(optionsSentToAjax.type).toEqual('POST');
        expect(optionsSentToAjax.body).toEqual({
          assertion: 'mock-corporate-id-token%25',
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          scope: 'openid',
          client_id: 'oauth-client-id-corporate-cookie',
          company_id: companyId
        });
        expect(optionsSentToAjax.dataType).toEqual('json');
        expect(optionsSentToAjax.authentication).toEqual(true);
        expect(optionsSentToAjax.timeout).toEqual(9000);
        expect(optionsSentToAjax.channelId).toEqual('MWEB_CORP');
      });
  });

  it('should call grantLeisureToken', () => {
    Cookie.getValue.mockReturnValueOnce('mock-leisure-id-token%');

    return OAuthApi.grantLeisureToken()
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).toContain('v4/security/token');
        expect(optionsSentToAjax.type).toEqual('POST');
        expect(optionsSentToAjax.body).toEqual({
          assertion: 'mock-leisure-id-token%25',
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          scope: 'openid',
          client_id: 'oauth-client-id-cookie'
        });
        expect(optionsSentToAjax.dataType).toEqual('json');
        expect(optionsSentToAjax.authentication).toEqual(true);
        expect(optionsSentToAjax.timeout).toEqual(9000);
        expect(optionsSentToAjax.channelId).toEqual('MWEB');
      });
  });

  describe('when using api gateway cookies', () => {
    it('should login using cookies ', () => {
      const credentials = {
        userNameOrAccountNumber: '489448944894',
        password: 'Test1234'
      };

      return OAuthApi.login(credentials, true)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).toContain('v4/security/token');
          expect(optionsSentToAjax.type).toEqual('POST');
          expect(optionsSentToAjax.body).toEqual({
            response_type: 'id_token swa_token',
            scope: 'openid',
            client_id: 'oauth-client-id-cookie',
            username: '489448944894',
            password: 'Test1234'
          });
          expect(optionsSentToAjax.dataType).toEqual('json');
        });
    });

    it('should use corporate cookie id for grantCorporateToken', () => {
      const companyId = '99587574';

      localStorage.get.mockReturnValueOnce({ id_token: 'mock-corporate-id-token' });

      return OAuthApi.grantCorporateToken(companyId, true)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).toContain('v4/security/token');
          expect(optionsSentToAjax.type).toEqual('POST');
          expect(optionsSentToAjax.body).toEqual({
            assertion: 'mock-corporate-id-token',
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            scope: 'openid',
            client_id: 'oauth-client-id-corporate-cookie',
            company_id: companyId
          });
          expect(optionsSentToAjax.dataType).toEqual('json');
          expect(optionsSentToAjax.authentication).toEqual(true);
          expect(optionsSentToAjax.timeout).toEqual(9000);
          expect(optionsSentToAjax.channelId).toEqual('MWEB_CORP');
        });
    });

    it('should call grantLeisureToken', () => {
      Cookie.getValue.mockReturnValueOnce('mock-leisure-id-token');

      return OAuthApi.grantLeisureToken(true)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).toContain('v4/security/token');
          expect(optionsSentToAjax.type).toEqual('POST');
          expect(optionsSentToAjax.body).toEqual({
            assertion: 'mock-leisure-id-token',
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            scope: 'openid',
            client_id: 'oauth-client-id-cookie'
          });
          expect(optionsSentToAjax.dataType).toEqual('json');
          expect(optionsSentToAjax.authentication).toEqual(true);
          expect(optionsSentToAjax.timeout).toEqual(9000);
          expect(optionsSentToAjax.channelId).toEqual('MWEB');
        });
    });
  });
});
