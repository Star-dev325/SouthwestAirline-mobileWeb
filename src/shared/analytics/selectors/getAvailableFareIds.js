import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { getProductDefinitions } from 'src/shared/bootstrap/productDefinitions';

export const getAvailableFareIds = createSelector(getProductDefinitions, (productDefinitions) =>
  _.get(productDefinitions, 'products', []).map(({ productId }) => productId)
);
