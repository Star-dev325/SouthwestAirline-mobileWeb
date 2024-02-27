// @flow
import React from 'react';

import AirUpgradeBound from 'src/airUpgrade/components/airUpgradeBound';

import type { BoundSelectionDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  boundDataList: Array<BoundSelectionDataType>,
  onChange: ({ productId: string, isSelected: boolean }) => void
};

const AirUpgradeBoundList = ({ boundDataList, onChange }: Props): * => (
  <div className="air-upgrade-select-bounds-form--bound-list">
    {boundDataList.map((boundData) => (
      <AirUpgradeBound key={boundData.productId} boundData={boundData} onChange={onChange} />
    ))}
  </div>
);

export default AirUpgradeBoundList;
