// @flow
import React from 'react';

import AirUpgradeTotalPrice from 'src/airUpgrade/components/airUpgradeTotalPrice';
import i18n from '@swa-ui/locale';
import Button from 'src/shared/components/button';

import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  pricingDataList: Array<PricingDataType>
};

const AirUpgradeSelectBoundsSubmit = ({ pricingDataList }: Props) => (
  <div className="purchase-content--summary-footer">
    <AirUpgradeTotalPrice pricingDataList={pricingDataList} />
    <div className="purchase-content--summary-footer-nav">
      <Button type="submit" color="yellow" size="huge" fluid>
        {i18n('AIR_UPGRADE_SELECT_BOUNDS_SUBMIT_TEXT')}
      </Button>
    </div>
  </div>
);

export default AirUpgradeSelectBoundsSubmit;
