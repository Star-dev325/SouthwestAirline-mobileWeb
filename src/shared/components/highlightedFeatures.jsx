// @flow
import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import type { FormattedProductDetails } from 'src/shared/flow-typed/shared.types';

type Props = {
  highlightedFeatures: Array<FormattedProductDetails>
};

const _getIconClass = (icon: ?string) => {
  if (icon === 'Suitcase') {
    return 'feature-icon--suitcase';
  } else if (icon === 'DollarCircle') {
    return 'feature-icon--dollar-circle';
  }
};

const HighlightedFeatures = (props: Props) => {
  const { highlightedFeatures } = props;

  return (
    <div className="highlighted-features">
      {_.map(highlightedFeatures, (highlightedFeature, index: number) => {
        const { icon, label, suffix } = highlightedFeature;
        const iconClass = _getIconClass(icon);
        const uniqueKey = label ? `${label}-${index}` : index;

        return (
          <div data-qa="highlighted-feature" key={uniqueKey}>
            {iconClass && <div data-qa="feature-icon" className={cx('feature-icon', iconClass)} />}
            {
              <span>
                {label}
                <sup>{suffix}</sup>
              </span>
            }
          </div>
        );
      })}
    </div>
  );
};

export default HighlightedFeatures;
