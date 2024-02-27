// @flow
import React from 'react';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import AirUpgradeBoundList from 'src/airUpgrade/components/airUpgradeBoundList';
import AirUpgradePriceList from 'src/airUpgrade/components/airUpgradePriceList';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import AirUpgradeSelectBoundsSubmit from 'src/airUpgrade/components/airUpgradeSelectBoundsSubmit';
import BoundsHeader from 'src/shared/components/boundsHeader';
import airUpgradeSelectValidator from 'src/shared/form/formValidators/airUpgradeSelectValidator';

import type {
  BaseUpgradeReservationPageType,
  BoundSelectionDataType,
  PricingDataType
} from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = BaseUpgradeReservationPageType & {
  formId: string,
  onSubmit: () => void,
  onBoundSelectionChange: ({ productId: string, isSelected: boolean }) => void,
  boundSelectionDataList: Array<BoundSelectionDataType>,
  pricingDataList: Array<PricingDataType>
};

export const AirUpgradeSelectBoundsForm = ({
  onSubmit,
  formId,
  destinationDescription,
  dates,
  recordLocator,
  originationDestinationDescription,
  boundSelectionMessage,
  fareRulesMessageWithLinks,
  onBoundSelectionChange,
  boundSelectionDataList,
  pricingDataList
}: Props) => (
  <Form
    name="air-upgrade-select-bounds-form"
    className="air-upgrade-select-bounds-form"
    formId={formId}
    onSubmit={onSubmit}
  >
    <BoundsHeader
      dates={dates}
      destinationDescription={destinationDescription}
      recordLocator={recordLocator}
      originationDestinationDescription={originationDestinationDescription}
    />
    <div className="air-upgrade-select-bounds-form--message">{boundSelectionMessage}</div>
    <AirUpgradeBoundList boundDataList={boundSelectionDataList} onChange={onBoundSelectionChange} />
    <AirUpgradePriceList pricingDataList={pricingDataList} />
    <PriceSummaryNotice fareRulesWithLinks={fareRulesMessageWithLinks} shouldOpenLinkInSelf={false} />
    <AirUpgradeSelectBoundsSubmit pricingDataList={pricingDataList} />
  </Form>
);

export default withForm({
  formValidator: airUpgradeSelectValidator,
  autoClearFormData: false
})(AirUpgradeSelectBoundsForm);
