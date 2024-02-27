import { render } from '@testing-library/react';
import React from 'react';
import AirUpgradePrice from 'src/airUpgrade/components/airUpgradePrice';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('AirUpgradePrice', () => {
  const getPointsPricingData = () =>
    new AirUpgradeViewReservationApiJsonBuilder().withPointsBooking().build().viewUpgradeReservationPage
      .pricingDataList[0];
  const getPricingData = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.pricingDataList[0];

  it('Should render a default amount of 0.00 if the bound has not been selected', () => {
    const pricingData = getPricingData();
    const { container } = createComponent(pricingData);

    expect(container).toMatchSnapshot();
  });

  it('Should render a default amount of 0 if the bound value is points and has not been selected', () => {
    const pricingData = getPointsPricingData();
    const { container } = createComponent(pricingData);

    expect(container).toMatchSnapshot();
  });

  it('Should render the amount and the totalUpgrade dollar amount of a selected bound', () => {
    const pricingData = { ...getPricingData(), isSelected: true };
    const { container } = createComponent(pricingData);

    expect(container).toMatchSnapshot();
  });

  it('Should render the amount and the totalUpgrade points amount of a selected bound', () => {
    const pricingData = { ...getPointsPricingData(), isSelected: true };
    const { container } = createComponent(pricingData);

    expect(container).toMatchSnapshot();
  });

  const createComponent = (pricingData) => render(<AirUpgradePrice pricingData={pricingData} />);
});
