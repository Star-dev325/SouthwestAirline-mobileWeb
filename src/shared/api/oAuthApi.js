import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { get } from 'src/shared/helpers/jsUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import localStorage from 'store2';
import url from 'url';

const { OAUTH } = SharedConstants;

export const login = (credentials) => {
  const loginQuery = {
    response_type: OAUTH.RESPONSE_TYPE,
    scope: OAUTH.SCOPE,
    client_id: environment.oAuthClientIdCookie,
    username: credentials.userNameOrAccountNumber,
    password: credentials.password
  };

  return restClient.ajax({
    url: url.resolve(environment.securityApi, 'v4/security/token'),
    type: 'POST',
    body: loginQuery,
    contentType: OAUTH.CONTENT_TYPE,
    dataType: 'json'
  });
};

export const logout = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.securityApi, 'v4/security/logout'),
      type: 'POST',
      contentType: OAUTH.CONTENT_TYPE,
      dataType: 'json'
    },
    true
  );

export const fetchUserInfo = () =>
  restClient.ajax(
    {
      url: url.resolve(environment.securityApi, 'v4/security/userinfo'),
      type: 'GET',
      contentType: OAUTH.CONTENT_TYPE,
      dataType: 'json'
    },
    true
  );

export const grantCorporateToken = (companyId) => {
  const idToken = encodeURIComponent(get(localStorage.get(StorageKeys.OAUTH_LOGIN_STATUS), 'id_token'));

  const requestBody = {
    assertion: idToken,
    grant_type: OAUTH.GRANT_TYPE,
    scope: OAUTH.SCOPE,
    client_id: environment.oAuthClientIdCorporateCookie,
    company_id: companyId
  };

  return restClient.ajax(
    {
      url: url.resolve(environment.securityApi, 'v4/security/token'),
      type: 'POST',
      body: requestBody,
      contentType: OAUTH.CONTENT_TYPE,
      dataType: 'json'
    },
    true,
    9000,
    OAUTH.CHANNEL_ID_CORPORATE
  );
};

export const grantLeisureToken = () => {
  const requestBody = {
    assertion: encodeURIComponent(Cookie.getValue('id_token')),
    grant_type: OAUTH.GRANT_TYPE,
    scope: OAUTH.SCOPE,
    client_id: environment.oAuthClientIdCookie
  };

  return restClient.ajax(
    {
      url: url.resolve(environment.securityApi, 'v4/security/token'),
      type: 'POST',
      body: requestBody,
      contentType: OAUTH.CONTENT_TYPE,
      dataType: 'json'
    },
    true,
    9000,
    OAUTH.CHANNEL_ID,
    undefined,
    true
  );
};
