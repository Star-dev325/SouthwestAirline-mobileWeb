// @flow

import createHash from 'sha.js';

export const createSha256Hash = (item: string) => {
  if (!item) {
    return '';
  }

  return createHash('sha256').update(item, 'utf8').digest('hex');
};
