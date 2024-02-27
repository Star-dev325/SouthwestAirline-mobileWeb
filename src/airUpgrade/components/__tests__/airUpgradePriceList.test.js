import { render } from '@testing-library/react';
import React from 'react';
import AirUpgradePriceList from 'src/airUpgrade/components/airUpgradePriceList';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('AirUpgradePriceList', () => {
  const getPricingDataList = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.pricingDataList;

  it('should render a list of AirUpgradePrice components', () => {
    const pricingDataList = getPricingDataList();
    const { container } = render(<AirUpgradePriceList pricingDataList={pricingDataList} />);

    expect(container).toMatchSnapshot();
  });
});
