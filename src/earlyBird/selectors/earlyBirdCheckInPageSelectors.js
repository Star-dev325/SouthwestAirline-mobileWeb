// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getProductFeature = (state) => _.get(state, 'app.wcmContent.earlyBirdBanner.product_feature');

export const getEarlyBirdBanner = createSelector([getProductFeature], (bannerProductFeatures) =>
  (bannerProductFeatures
    ? {
      image: _.get(bannerProductFeatures, 'image'),
      alt: _.get(bannerProductFeatures, 'alt_text')
    }
    : {})
);
