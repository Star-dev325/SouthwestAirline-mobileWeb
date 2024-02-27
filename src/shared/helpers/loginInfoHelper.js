import dayjs from 'dayjs';
import _ from 'lodash';

export const isAccessTokenExpired = (expirationTime) => {
  if (expirationTime) {
    return dayjs(expirationTime).subtract(60, 'seconds').isBefore(dayjs());
  } else {
    return true;
  }
};

export const isUserLoginExpired = (loginInfo) => {
  // right now we don't support refresh token, so expired datetime is same as accessToken expired
  const hotExpirationDateTime = _.get(loginInfo, 'accessTokenDetails.hotExpirationDateTimeUtc');

  if (hotExpirationDateTime) {
    return dayjs(loginInfo.accessTokenDetails.hotExpirationDateTimeUtc).subtract(60, 'seconds').isBefore(dayjs());
  } else {
    return true;
  }
};
