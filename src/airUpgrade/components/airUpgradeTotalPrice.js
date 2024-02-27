// @flow
import React, { useEffect, useState } from 'react';

import PriceTotal from 'src/shared/components/priceTotal';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import { POINTS, DOLLAR } from 'src/shared/constants/currencyTypes';
import { unselectedMoneyTotal, unselectedPointsTotal } from 'src/airUpgrade/constants/airUpgradeConstants';
import { addPoints } from 'src/airUpgrade/helpers/airUpgradeSelectBoundsHelper';

import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  pricingDataList: Array<PricingDataType>
};

const AirUpgradeTotalPrice = ({ pricingDataList }: Props) => {
  const [totals, setTotals] = useState({
    moneyTotal: unselectedMoneyTotal,
    pointsTotal: null
  });
  const upgradeCurrencyType = pricingDataList.length > 0 ? pricingDataList[0].upgradePrice.currencyCode : DOLLAR;

  useEffect(() => {
    const newTotals = calculateTotals(pricingDataList);

    setTotals(newTotals);
  }, [pricingDataList]);

  const calculateTotals = (pricingList) => {
    const selectedUpgradePrices = pricingList
      .filter((pricingData) => pricingData.isSelected)
      .map(({ upgradeTotalPrice }) => upgradeTotalPrice);
    let moneyTotal = unselectedMoneyTotal;
    let pointsTotal = null;

    if (selectedUpgradePrices.length === 0) {
      return upgradeCurrencyType === DOLLAR
        ? { moneyTotal, pointsTotal }
        : { moneyTotal, pointsTotal: unselectedPointsTotal };
    }

    const moneyPrices = selectedUpgradePrices.filter((pricingData) => pricingData.currencyCode !== POINTS);
    const pointsPrices = selectedUpgradePrices.filter((pricingData) => pricingData.currencyCode === POINTS);

    moneyTotal = moneyPrices.length > 0 ? addCurrency(...moneyPrices) : unselectedMoneyTotal;
    pointsTotal = pointsPrices.length > 0 ? addPoints(...pointsPrices) : null;

    return { moneyTotal, pointsTotal };
  };

  return (
    <PriceTotal
      totals={totals}
      shouldHidePriceBreakdown
      showPoints
      showOnlyPointsTotal={upgradeCurrencyType === POINTS}
    />
  );
};

export default AirUpgradeTotalPrice;
