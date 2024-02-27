import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import AirUpgradeBound from 'src/airUpgrade/components/airUpgradeBound';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('AirUpgradeBound', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const getBoundSelectionData = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.boundSelectionDataList[0];

  it('Should render a selectedable bound if it can be upgraded', () => {
    const boundData = getBoundSelectionData();
    const { asFragment } = createComponent(boundData);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render a message explaining why the bound is not selectable if it is not upgradeable', () => {
    const boundData = {
      ...getBoundSelectionData(),
      canUpgrade: false,
      upgradeMessageHeader: 'mock cannot upgrade reason'
    };
    const { asFragment } = createComponent(boundData);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the on change handler when the checkbox state changes', async () => {
    const boundData = getBoundSelectionData();
    const onChange = jest.fn();
    const { container } = createComponent(boundData, onChange);

    const checkbox = container.querySelector('.field .checkbox-button');

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        isSelected: true,
        productId: boundData.productId
      });
    });
  });

  describe('overnight', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const boundData = {
        ...getBoundSelectionData(),
        isOvernight: true
      };

      const { container } = createComponent(boundData);

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => {
      const boundData = {
        ...getBoundSelectionData(),
        isOvernight: false
      };

      const { container } = createComponent(boundData);

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  describe('isNextDay', () => {
    it('should show next day indicator when isNextDayArrival is true', () => {
      const boundData = {
        ...getBoundSelectionData(),
        isNextDayArrival: true
      };

      const { container } = createComponent(boundData);

      expect(container.querySelector('[data-qa="next-day-indicator"]')).toMatchSnapshot();
    });

    it('should not show next day indicator when isNextDayArrival is false', () => {
      const boundData = {
        ...getBoundSelectionData(),
        isNextDayArrival: false
      };

      const { container } = createComponent(boundData);

      expect(container.querySelector('[data-qa="next-day-indicator"]')).toMatchSnapshot();
    });
  });

  const createComponent = (boundData, onChange = () => {}) => {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, { clickableChildren: true });

    return render(
      <MockedForm formData={{ formCheckBox: true }} onSubmit={onSubmitStub}>
        <AirUpgradeBound boundData={boundData} onChange={onChange} />
      </MockedForm>
    );
  };
});
