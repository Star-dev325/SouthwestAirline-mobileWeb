import { render } from '@testing-library/react';
import React from 'react';
import AirUpgradeTotalPrice from 'src/airUpgrade/components/airUpgradeTotalPrice';
import * as airUpgradeSelectBoundsHelper from 'src/airUpgrade/helpers/airUpgradeSelectBoundsHelper';
import * as currencyHelper from 'src/shared/api/helpers/currencyHelper';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('AirUpgradeTotalPrice', () => {
  let mockAddCurrency;
  let mockAddPoints;

  beforeEach(() => {
    mockAddCurrency = jest.spyOn(currencyHelper, 'addCurrency').mockReturnValue({
      amount: '6,000.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    });

    mockAddPoints = jest.spyOn(airUpgradeSelectBoundsHelper, 'addPoints').mockReturnValue({
      amount: '120,000',
      currencyCode: 'PTS'
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const getPointsPricingDataList = () =>
    new AirUpgradeViewReservationApiJsonBuilder().withPointsBooking().build().viewUpgradeReservationPage
      .pricingDataList;
  const getPointsBooking = () =>
    new AirUpgradeViewReservationApiJsonBuilder().withPointsBooking().withPointsBothBoundsNotSelected().build()
      .viewUpgradeReservationPage.pricingDataList;
  const getPricingDataList = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.pricingDataList;

  it('Should render a default amount of 0.00 if no bounds have been selected', () => {
    const pricingDataList = getPricingDataList();
    const { container } = createComponent(pricingDataList);

    expect(container).toMatchSnapshot();
  });

  it('Should render the total amount of one selected bound', () => {
    const [bound1, bound2] = getPricingDataList();
    const selectedBound = { ...bound1, isSelected: true };
    const { container } = createComponent([selectedBound, bound2]);

    expect(container).toMatchSnapshot();
  });

  it('Should render the sum of all dollar bounds if they are selected', () => {
    const { container } = createComponent(getPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(container).toMatchSnapshot();
  });

  it('Should call addCurrency when all dollar bounds are selected', () => {
    createComponent(getPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(mockAddCurrency).toHaveBeenCalled();
  });

  it('Should not call addPoints when all dollar bounds are selected', () => {
    createComponent(getPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(mockAddPoints).not.toHaveBeenCalled();
  });

  it('Should render points booking total correctly with 1 selected bound', () => {
    const [bound1, bound2] = getPointsPricingDataList();
    const selectedBound = {
      ...bound1,
      isSelected: true
    };
    const { container } = createComponent([selectedBound, bound2]);

    expect(container).toMatchSnapshot();
  });

  it('Should render points booking total correctly with no selected bound', () => {
    const { container } = createComponent(
      getPointsBooking().map((bound) => ({ ...bound, isSelected: false })),
      false
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render points booking total correctly with 2 selected bounds', () => {
    const { container } = createComponent(getPointsPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(container).toMatchSnapshot();
  });
  it('Should call addPoints with 2 selected point bounds', () => {
    createComponent(getPointsPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(mockAddPoints).toHaveBeenCalled();
  });

  it('Should not call addCurrency with 2 selected point bounds', () => {
    createComponent(getPointsPricingDataList().map((bound) => ({ ...bound, isSelected: true })));

    expect(mockAddCurrency).not.toHaveBeenCalled();
  });

  const createComponent = (pricingDataList) => render(<AirUpgradeTotalPrice pricingDataList={pricingDataList} />);
});
