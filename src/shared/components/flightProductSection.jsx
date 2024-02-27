// @flow
import _ from 'lodash';
import Currency from 'src/shared/components/currency';
import cx from 'classnames';
import FeaturesList from 'src/shared/components/featuresList';
import React from 'react';
import StylizedLabel from 'src/shared/components/stylizedLabel';
import { convertBrandColor } from 'src/shared/helpers/productDefinitionsHelper';

import type { FareProduct, ProductDefinition } from 'src/shared/flow-typed/shared.types';

type Props = {
  fareProduct: ?FareProduct,
  productDefinition: ProductDefinition,
  canBeSelected?: boolean,
  unavailableDefault: string,
  isPromoCodeApplied: boolean,
  showPriceDifference?: boolean,
  onFareSelected: (FareProduct) => void
};

const renderFarePurchaseInfo = (
  fareProduct: ?FareProduct,
  isPromoCodeApplied: boolean,
  reasonIfUnavailable: ?string,
  showPriceDifference: boolean
) => {
  let farePurchaseInfo;

  if (reasonIfUnavailable || !fareProduct) {
    farePurchaseInfo = reasonIfUnavailable;
  } else {
    const { price, pricePointTax, discountedPrice, discountedPricePointTax, priceDifference, priceDiffPointsTax } =
      fareProduct;

    const needShowDiscountPrice = isPromoCodeApplied && !!discountedPrice;
    let originalUnDiscountedPrice = needShowDiscountPrice && price;
    let finalFareTaxes = discountedPricePointTax ? discountedPricePointTax : pricePointTax;
    let finalPrice = needShowDiscountPrice ? discountedPrice : price;
    let taxSign = '+';

    if (showPriceDifference) {
      originalUnDiscountedPrice = null;
      finalPrice = priceDifference;
      finalFareTaxes = priceDiffPointsTax;
      taxSign = null;
    }

    farePurchaseInfo = (
      <div>
        {originalUnDiscountedPrice ? (
          <Currency className="original-price" {...originalUnDiscountedPrice} strikeThrough />
        ) : (
          <div className="original-price">&nbsp;</div>
        )}
        <Currency className="final-price" {...finalPrice} />
        {finalFareTaxes ? (
          <div className="intl-points-taxes">
            {taxSign}
            <Currency className="intl-points-taxes--currency" {...finalFareTaxes} />
          </div>
        ) : (
          <div className="intl-points-taxes">&nbsp;</div>
        )}
      </div>
    );
  }

  return farePurchaseInfo;
};

const FlightProductSection = ({
  productDefinition,
  fareProduct,
  canBeSelected,
  isPromoCodeApplied,
  showPriceDifference,
  unavailableDefault,
  onFareSelected
}: Props) => {
  const isAvailable = canBeSelected && fareProduct && !fareProduct.reasonIfUnavailable;
  const borderColor = `bd${convertBrandColor(productDefinition.primaryThemeColor, 'grey5')}`;
  const { limitedSeats, earnPoints } = fareProduct || {};

  let reasonIfUnavailable = fareProduct && fareProduct.reasonIfUnavailable;

  if (!isAvailable && !reasonIfUnavailable) {
    reasonIfUnavailable = unavailableDefault;
  }

  const _handleOnFareSelected = () => isAvailable && fareProduct && onFareSelected(fareProduct);

  return (
    <div data-qa={productDefinition.productId} className="flight-product-section" onClick={_handleOnFareSelected}>
      <div
        style={{ borderColor: productDefinition.primaryThemeHexColor }}
        className={`flight-product-section--header ${borderColor}`}
      >
        <div className="xlarge bold">
          <StylizedLabel value={productDefinition.stylizedLabel} defaultText={productDefinition.label} />
        </div>
        {!_.isEmpty(limitedSeats) && <div className="red bold">{limitedSeats}</div>}
      </div>
      <div className="flight-product-section--container">
        <div className="main-col">
          <FeaturesList features={productDefinition.features || []} />
        </div>
        <div className="fare-col">
          <div className={cx('fare-container', { unavailable: !isAvailable })}>
            <div
              className={cx('fare-content', {
                unavailable: !isAvailable,
                bdb3: isAvailable,
                [borderColor]: isAvailable
              })}
              style={{ borderColor: productDefinition.primaryThemeHexColor }}
            >
              {renderFarePurchaseInfo(
                fareProduct,
                isPromoCodeApplied,
                reasonIfUnavailable,
                showPriceDifference || false
              )}
            </div>
          </div>
          {isAvailable && earnPoints && (
            <div className="pt4 black bold center" data-qa="earn-points">
              {earnPoints}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightProductSection;
