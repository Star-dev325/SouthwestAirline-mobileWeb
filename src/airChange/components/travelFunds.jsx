// @flow
import React from 'react';
import _ from 'lodash';
import PriceTotalLine from 'src/shared/components/priceTotalLine';

import type { PricingChangeFareItem } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  travelFunds: PricingChangeFareItem,
  totalDueNow: PricingChangeFareItem
};

const formatFundsForPriceTotalLine = (fareItem: PricingChangeFareItem) => ({
  title: _.get(fareItem, 'item'),
  total: _.get(fareItem, 'tax') ? _.get(fareItem, 'tax') : _.get(fareItem, 'fare')
});

export const TravelFunds = (props: Props) => {
  const { travelFunds, totalDueNow } = props;

  return (
    <div className="travel-funds" data-qa="travel-funds">
      <PriceTotalLine
        className="travel-funds-applied"
        type="plain"
        {...formatFundsForPriceTotalLine(travelFunds)}
        showTravelFundAppliedFormat
      />
      <PriceTotalLine
        className="travel-funds-total-due-now"
        type="plain"
        {...formatFundsForPriceTotalLine(totalDueNow)}
      />
    </div>
  );
};

export default TravelFunds;
