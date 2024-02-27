// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

import Currency from 'src/shared/components/currency';

import type { FareProduct } from 'src/shared/flow-typed/shared.types';
import i18n from '@swa-ui/locale';

type Props = {
  fareProduct: FareProduct,
  isPromoCodeApplied: boolean,
  canBeSelected: boolean
};

const FarePurchaseInfo = (props: Props) => {
  const {
    fareProduct: {
      reasonIfUnavailable,
      hasLowestFare,
      fareDescription,
      earnPoints,
      limitedSeats,
      priceDifference,
      priceDiffPointsTax
    },
    canBeSelected
  } = props;

  const _isProductAvailable = () => !reasonIfUnavailable && canBeSelected;

  const _shouldDisplaySeatsLeft = () => !_.isEmpty(limitedSeats);

  const _renderFarePurchaseInfo = () => {
    let farePurchaseInfo;

    if (_isProductAvailable()) {
      if (priceDifference) {
        farePurchaseInfo = (
          <div>
            <Currency {...priceDifference} />
            {!!priceDiffPointsTax && (
              <div className="intl-points-taxes">
                <Currency className="intl-points-taxes--currency" {...priceDiffPointsTax} />
              </div>
            )}
            {!!hasLowestFare && <div className="lowest-flag">{i18n('AIR_BOOKING__LOW_FARE_UPPERCASE')}</div>}
          </div>
        );
      }
    } else {
      farePurchaseInfo = reasonIfUnavailable || 'Available';
    }

    return farePurchaseInfo;
  };

  const fareType = _.get(props, 'fareProduct.price.currencyCode');

  return (
    <div
      className={cx('fare-purchase-info', {
        'fare-purchase-info--selectable': _isProductAvailable(),
        'fare-purchase-info--selectable_points': fareType === 'PTS'
      })}
    >
      <div className="main-col">
        <div className="fare-purchase-info--main-info">
          <div className="fare-purchase-info--fare-type">{fareDescription}</div>
          {earnPoints && <div className="fare-purchase-info--earn-points gray5 medium">{earnPoints}</div>}
        </div>
        {_isProductAvailable() && _shouldDisplaySeatsLeft() && (
          <div className="fare-purchase-info--limited-seats label">{limitedSeats}</div>
        )}
      </div>

      <div className="aside-col">
        <div className="value">{_renderFarePurchaseInfo()}</div>
      </div>
    </div>
  );
};

export default FarePurchaseInfo;
