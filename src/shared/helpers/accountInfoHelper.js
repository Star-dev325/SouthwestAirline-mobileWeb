import localStorage from 'store2';
import _ from 'lodash';
import { transformToOauthLoginSession } from 'src/shared/transformers/oauthSessionTransformer';
import { isAccessTokenExpired } from 'src/shared/helpers/loginInfoHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { ACCOUNT_INFO, OAUTH_LOGIN_STATUS, USERNAME_KEY, CHASE_SESSION_ID_KEY } = StorageKeys;

export const getSavedUserNameOrAccountNumber = () => localStorage.get(USERNAME_KEY) || '';

export const forgetUser = () => {
  localStorage.remove(USERNAME_KEY);
};

export const rememberUser = (userNameOrAccountNumber) => {
  localStorage.set(USERNAME_KEY, userNameOrAccountNumber);
};

export const getOauthLoginSession = () => localStorage.get(OAUTH_LOGIN_STATUS);

export const removeOauthLoginSession = () => {
  localStorage.remove(OAUTH_LOGIN_STATUS);
};

export const rememberOauthLoginSession = (oauthLoginResponse) => {
  localStorage.set(OAUTH_LOGIN_STATUS, transformToOauthLoginSession(oauthLoginResponse));
};

export const removeChaseSessionId = () => {
  localStorage.remove(CHASE_SESSION_ID_KEY);
};

export const rememberBasicAccountInfo = (basicAccountInfo) => {
  localStorage.set(ACCOUNT_INFO, basicAccountInfo);
};

export const getExpirationDate = () => _.get(localStorage.get(OAUTH_LOGIN_STATUS), 'expirationDate');

export const isOauthSessionExpired = () => isAccessTokenExpired(getExpirationDate());

export const getAccountInfo = () => localStorage.get(ACCOUNT_INFO);

const getInfoFromAccountInfo = (key) => _.get(getAccountInfo(), key);

export const getAccountNumber = () => getInfoFromAccountInfo('customerInfo.accountNumber');

export const getUserName = () => getInfoFromAccountInfo('customerInfo.name.userName');

export const getAccountRedeemablePoints = () => getInfoFromAccountInfo('rapidRewardsDetails.redeemablePoints');

export const getAccountTier = () => getInfoFromAccountInfo('rapidRewardsDetails.tierInfo.tier');

export const getCompanionFullName = () => getInfoFromAccountInfo('companionFullName');

export const getCompanionName = () => getInfoFromAccountInfo('companionName');

export const isLoggedIn = () => !_.isEmpty(getAccountInfo());

export const removeAccountInfo = () => {
  localStorage.remove(ACCOUNT_INFO);
};
