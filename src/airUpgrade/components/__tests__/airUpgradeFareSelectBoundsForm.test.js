import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AirUpgradeSelectBoundsFormDefaultExport from 'src/airUpgrade/components/airUpgradeFareSelectBoundsForm';
import { AIR_UPGRADE_SELECT_BOUNDS_FORM } from 'src/shared/constants/formIds';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

let onBoundSelectionChangeStub;
let onSubmitStub;

describe('AirUpgradeFareSelectBoundsSubmit', () => {
  beforeEach(() => {
    onBoundSelectionChangeStub = jest.fn();
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should call onSubmit when submit button is pressed and no validation error', () => {
    const boundIndex = 0;
    const { container } = createComponent({});

    fireEvent.click(container.querySelectorAll('.field .checkbox-button')[boundIndex]);
    fireEvent.submit(container.querySelectorAll('form')[0]);

    expect(onSubmitStub).toHaveBeenCalled();
  });

  it('it should not call onSubmit for an invalid form', () => {
    const { boundSelectionDataList, pricingDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
      .viewUpgradeReservationPage;
    const { container } = createComponent({ boundSelectionDataList, pricingDataList });
  
    fireEvent.submit(container.querySelectorAll('form')[0]);

    expect(onSubmitStub).not.toHaveBeenCalled();
  });

  it('should call onBoundSelectionChange when first checkbox is clicked', () => {
    const boundIndex = 0;
    const { boundSelectionDataList, pricingDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
      .viewUpgradeReservationPage;
    const { container } = createComponent(
      {
        boundSelectionDataList,
        pricingDataList
      }
    );

    fireEvent.click(container.querySelectorAll('.field .checkbox-button')[boundIndex]);

    expect(onBoundSelectionChangeStub).toHaveBeenCalledWith({
      isSelected: true,
      productId: pricingDataList[boundIndex].productId
    });
  });

  it('should call onBoundSelectionChange when the 2nd checkbox is clicked', () => {
    const boundIndex = 1;
    const { boundSelectionDataList, pricingDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
      .viewUpgradeReservationPage;
    const { container } = createComponent(
      {
        boundSelectionDataList,
        pricingDataList
      }
    );

    fireEvent.click(container.querySelectorAll('.field .checkbox-button')[boundIndex]);

    expect(onBoundSelectionChangeStub).toHaveBeenCalledWith({
      isSelected: true,
      productId: pricingDataList[boundIndex].productId
    });
  });

  const createComponent = (props) => {
    const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().build();
    const {
      boundSelectionDataList,
      boundSelectionMessage,
      dates,
      destinationDescription,
      fareRulesMessageWithLinks,
      originationDestinationDescription,
      pricingDataList,
      recordLocator
    } = viewUpgradeReservationPage;

    const combinedProps = {
      boundSelectionDataList,
      boundSelectionMessage,
      dates,
      destinationDescription,
      fareRulesMessageWithLinks,
      formId: AIR_UPGRADE_SELECT_BOUNDS_FORM,
      onBoundSelectionChange: onBoundSelectionChangeStub,
      onSubmit: onSubmitStub,
      originationDestinationDescription,
      pricingDataList,
      recordLocator,
      ...props
    };
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <AirUpgradeSelectBoundsFormDefaultExport {...combinedProps} />
      </Provider>
    );
  };
});
