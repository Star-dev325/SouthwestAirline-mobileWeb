// @flow
import React from 'react';
import _ from 'lodash';

import FlightProductSection from 'src/shared/components/flightProductSection';

import type { FareProduct, ProductDefinitions } from 'src/shared/flow-typed/shared.types';

type Props = {
  fares: ?Array<FareProduct>,
  productDefinitions: ProductDefinitions,
  isPromoCodeApplied: boolean,
  showPriceDifference?: boolean,
  onFareSelected: (FareProduct) => void
};

const FareProductList = ({
  fares,
  productDefinitions,
  isPromoCodeApplied,
  showPriceDifference,
  onFareSelected
}: Props) => (
  <div className="pt3" data-qa="flight-products">
    {_.map(productDefinitions.products, (product) => {
      const fare = _.find(fares, (fareProduct) => fareProduct._meta.fareProductId === product.productId);

      return (
        <FlightProductSection
          key={product.productId}
          fareProduct={fare}
          productDefinition={product}
          isPromoCodeApplied={isPromoCodeApplied}
          onFareSelected={onFareSelected}
          unavailableDefault="Unavailable"
          showPriceDifference={showPriceDifference}
          canBeSelected
        />
      );
    })}
  </div>
);

export default FareProductList;
