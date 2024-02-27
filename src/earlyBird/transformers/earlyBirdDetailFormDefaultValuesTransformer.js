// @flow
import _ from 'lodash';
import type { EarlyBirdBoundType } from 'src/earlyBird/flow-typed/earlyBird.types';

export default (earlyBirdBounds: Array<EarlyBirdBoundType>) =>
  _.chain(earlyBirdBounds)
    .map((bound, boundIndex) =>
      _.chain(bound)
        .get('passengers')
        .reduce(
          (fields, pax, index) =>
            _.merge({}, fields, { [`bound_${boundIndex}_ebPaxCheckBox_${index}`]: pax.canPurchaseEarlyBird }),
          {}
        )
        .value()
    )
    .reduce((acc, fields) => _.merge({}, acc, fields), {})
    .value();
