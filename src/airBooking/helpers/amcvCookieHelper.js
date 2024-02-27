// @flow
import _ from 'lodash';
import * as Cookie from 'src/shared/swa-persistence/cookie';

import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';

const AMCV_COOKIE_NAME = 'AMCV_65D316D751E563EC0A490D4C%40AdobeOrg';
const AMCV_COOKIE_KEY_SEPARATOR = 'MID';
const AMCV_COOKIE_PIPE_SEPARATOR = '|';
const CHASE_URL_KEYWORD = 'creditcard';

export type ChaseAppendParams = {
  isChaseCombo?: boolean,
  pageId?: string
};

export const getMcvid = () => {
  const value = Cookie.getValue(AMCV_COOKIE_NAME);

  return _.chain(value).split(AMCV_COOKIE_KEY_SEPARATOR).nth(1).split(AMCV_COOKIE_PIPE_SEPARATOR).nth(1).value() || '';
};

// Deprecated - please use appendParamsIfChaseUrl instead
export const addMvcidToChaseUrl = (url: string, isChase: boolean) => {
  let updateUrl = url;

  if (!_.isEmpty(url) && (isChase || url.includes(CHASE_URL_KEYWORD))) {
    const mcvid = getMcvid();

    if (!_.isEmpty(mcvid)) {
      updateUrl = `${url}&mcvid=${mcvid}`;
    }
  }

  return updateUrl;
};

export const appendParamsIfChaseUrl = (target: string = '', params: ChaseAppendParams = {}) => {
  const { isChaseCombo = false, pageId = '' } = params;
  const query = {};
  const isChaseUrl = _.includes(target, CHASE_URL_KEYWORD) || isChaseCombo;
  const mcvid = isChaseUrl && getMcvid();

  mcvid && _.set(query, 'mcvid', mcvid);
  pageId && _.set(query, 'pageId', pageId);

  return buildPathWithQuery(target, query);
};
