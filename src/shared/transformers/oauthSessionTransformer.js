import _ from 'lodash';
import dayjs from 'dayjs';

export function transformToOauthLoginSession(apiResponse) {
  const expiresIn = _.get(apiResponse, 'expires_in', 0);
  const expirationDate = dayjs().add(expiresIn, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSS');

  return { ...apiResponse, expirationDate };
}
