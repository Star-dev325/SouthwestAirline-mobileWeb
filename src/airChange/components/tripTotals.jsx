// @flow
import React from 'react';
import _ from 'lodash';

import PriceTotalLine from 'src/shared/components/priceTotalLine';

import type { PricingChangeFareItem } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  originalTripCost: ?PricingChangeFareItem,
  newTripCost: ?PricingChangeFareItem
};

const TripTotals = ({ originalTripCost, newTripCost }: Props) => {
  const _isPointsChange = (fareItem: ?PricingChangeFareItem): boolean => _.get(fareItem, 'fare.currencyCode') === 'PTS';

  const newTripTotal = {
    title: _.get(newTripCost, 'item'),
    total: _isPointsChange(newTripCost) ? _.get(newTripCost, 'tax') : _.get(newTripCost, 'fare'),
    pointsTotal: _isPointsChange(newTripCost) ? _.get(newTripCost, 'fare') : null
  };
  const originalTripTotal = {
    title: _.get(originalTripCost, 'item'),
    total: _isPointsChange(originalTripCost) ? _.get(originalTripCost, 'tax') : _.get(originalTripCost, 'fare'),
    pointsTotal: _isPointsChange(originalTripCost) ? _.get(originalTripCost, 'fare') : null
  };

  return (
    <div className="trip-totals">
      <PriceTotalLine className="trip-totals--new-trip-total" type="total" {...newTripTotal} showPts />
      <PriceTotalLine className="trip-totals--original-trip-total" type="total" {...originalTripTotal} showPts />
    </div>
  );
};

export default TripTotals;
