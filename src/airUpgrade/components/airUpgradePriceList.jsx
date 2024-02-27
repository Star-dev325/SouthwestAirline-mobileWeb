// @flow
import React from 'react';

import AirUpgradePrice from 'src/airUpgrade/components/airUpgradePrice';

import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  pricingDataList: Array<PricingDataType>
};

const AirUpgradePriceList = ({ pricingDataList }: Props): * => (
  <div className="air-upgrade-select-bounds-form--pricing-list">
    {pricingDataList.map((pricingData: PricingDataType) => (
      <AirUpgradePrice key={pricingData.productId} pricingData={pricingData} />
    ))}
  </div>
);

export default AirUpgradePriceList;
