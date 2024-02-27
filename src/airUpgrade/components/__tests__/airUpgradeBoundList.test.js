import { render } from '@testing-library/react';
import React from 'react';
import AirUpgradeBoundList from 'src/airUpgrade/components/airUpgradeBoundList';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('AirUpgradeBoundList', () => {
  const getBoundList = () =>
    new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage.boundSelectionDataList;

  it('should render a list of AirUpgradeBounds', () => {
    const boundDataList = getBoundList();
    const { container } = createComponent(boundDataList);

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (boundDataList) => {
  const noop = () => {};
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, { clickableChildren: true });

  return render(
    <MockedForm formData={{ formCheckBox: true }} onSubmit={noop}>
      <AirUpgradeBoundList boundDataList={boundDataList} onChange={noop} />
    </MockedForm>
  );
};
