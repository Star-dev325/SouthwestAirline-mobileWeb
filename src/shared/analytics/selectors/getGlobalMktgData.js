// @flow
import _ from 'lodash';
import UUIDRepo from 'src/app/stores/uuidRepo';
import SharedConstants from 'src/shared/constants/sharedConstants';
import {
  getAccountNumber,
  getAccountRedeemablePoints,
  getAccountTier,
  isLoggedIn as getIsLoggedIn
} from 'src/shared/helpers/accountInfoHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getWebViewChannel, getWebViewCorporateChannel } from 'src/shared/helpers/webViewHelper';
import localStorage from 'store2';

const { OAUTH } = SharedConstants;

export const getIsWebView = (state: *) => _.get(state, 'app.webView.isWebView', false);
const getDeviceType = (state: *) => {
  const isWebView = _.get(state, 'app.webView.isWebView', false);
  const webViewChannel = isWebView && getWebViewChannel();

  if (isWebView) {
    if (_.includes(webViewChannel, 'IOS')) {
      return 'iOS';
    } else if (_.includes(webViewChannel, 'ANDROID')) {
      return 'Android';
    } else {
      return '';
    }
  } else {
    return 'mobile';
  }
};

const getExperienceIdAndChannelId = () => {
  const webViewChannel = getWebViewChannel();
  const webViewCorporateChannel = getWebViewCorporateChannel();
  const webViewExperienceId = localStorage.get(StorageKeys.WEB_VIEW_EXPERIENCE_ID);

  const corporateChannelId = webViewCorporateChannel || OAUTH.CHANNEL_ID_CORPORATE;
  const leisureChannelId = webViewChannel || OAUTH.CHANNEL_ID;
  const shouldUseWebViewChannel = webViewChannel || webViewCorporateChannel;

  const channelId = shouldUseWebViewChannel
    ? hasCorporateToken()
      ? corporateChannelId
      : leisureChannelId
    : hasCorporateToken()
      ? OAUTH.CHANNEL_ID_CORPORATE
      : OAUTH.CHANNEL_ID;
  const experienceId = webViewExperienceId || UUIDRepo.getUUID();

  return { channelId, experienceId };
};

export const getGlobalMktgData = createSelector(
  [getIsLoggedIn, getIsWebView, getDeviceType, getAccountNumber, getAccountTier, getAccountRedeemablePoints],
  (isLoggedIn, isWebView, deviceType, accountNumber, accountTier, accountRedeemablePoints) => {
    const { channelId, experienceId } = getExperienceIdAndChannelId();

    const baseParams = {
      devicetype: deviceType,
      global_channelid: channelId,
      global_experienceid: experienceId,
      iswebview: isWebView ? '1' : '0',
      page_language: 'EN',
      responsivesize: 'na',
      user_loginstate: isLoggedIn ? 'hot' : 'cold'
    };

    const loggedInParams = {
      member_number: accountNumber || null,
      member_pointsbalance: accountRedeemablePoints || null,
      member_status: accountTier || null
    };

    return { ...baseParams, ...(isLoggedIn && loggedInParams) };
  }
);
