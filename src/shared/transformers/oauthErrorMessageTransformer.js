import _ from 'lodash';
import i18n from '@swa-ui/locale';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

export const transformToOAuthErrorMessage = (response) => {
  const { responseJSON } = response;

  // TODO: Improve bootstrap implementation in MOB-118603
  const errorCodeMap = fetchBootstrapData(BootstrapConstants.ERROR_CODE_MAP_PATH);

  if (_.isUndefined(responseJSON)) {
    return {};
  }

  const i18nKey = _.get(errorCodeMap, responseJSON.code);
  const errorMessage = i18n(i18nKey);

  !!errorMessage && _.set(response, 'responseJSON.message', errorMessage);

  return response;
};
