// @flow
import React from 'react';
import _ from 'lodash';

import { convertNamedIcon } from 'src/shared/helpers/productDefinitionsHelper';

import type { FormattedProductDetails } from 'src/shared/flow-typed/shared.types';

type Props = {
  features: Array<FormattedProductDetails>
};

const FeaturesList = (props: Props) => (
  <ul className="features-list">
    {_.map(props.features, (feature, index: number) => {
      const icon = convertNamedIcon(feature.icon);
      const classNames = `icon icon_${icon} features-list${icon ? '--item' : '--no-icon'}`;

      return (
        <li className={classNames} key={index}>
          <span className="features-list--text">
            {feature.label}
            {feature.suffix && <sup>{feature.suffix}</sup>}
          </span>
        </li>
      );
    })}
  </ul>
);

export default FeaturesList;
