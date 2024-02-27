import { render } from '@testing-library/react';
import React from 'react';
import AirUpgradeSelectBoundsSubmit from 'src/airUpgrade/components/airUpgradeSelectBoundsSubmit';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('AirUpgradeSelectBoundsSubmit', () => {
  const getPricingDataList = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.pricingDataList;

  it('should render correctly', () => {
    const pricingDataList = getPricingDataList();
    const { container } = createComponent(pricingDataList);

    expect(container).toMatchSnapshot();
  });

  const createComponent = (pricingDataList) => render(<AirUpgradeSelectBoundsSubmit pricingDataList={pricingDataList} />);
});
