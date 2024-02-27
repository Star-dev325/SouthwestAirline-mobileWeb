// @flow
import _ from 'lodash';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

import type { WcmContentResponse, DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

export const filterAndSortContent = (
  homeResponse: WcmContentResponse,
  type: string
): Array<DynamicPlacementResponse> => {
  const homeResults = _.get(homeResponse, 'results', {});

  return Object.keys(homeResults)
    .filter((key) => key.includes(type))
    .sort()
    .map((key) => toDynamicPlacement(homeResponse, key));
};
