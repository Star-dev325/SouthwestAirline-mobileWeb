import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PassengerCheckbox from 'src/shared/components/passengerCheckbox';
import { airChangeSplitPnrDetailsWithPassengerTypeText, getSplitPnrDetails } from 'test/builders/model/selectPassengersPageBuilder';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('PassengerCheckbox', () => {
  it('should render the component correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the component with passenger type text when passengerTypeText exists', () => {
    const passengerSelection = airChangeSplitPnrDetailsWithPassengerTypeText.passengerSelections[0];
    const { container } = createComponent({ passengerSelection });

    expect(container).toMatchSnapshot();
  });

  it('should call onPassengerSelectedFn with passengerId and value', () => {
    const onPassengerSelectedFnStub = jest.fn();
    const { container } = createComponent({ onPassengerSelectedFn: onPassengerSelectedFnStub });
    const toggleSwitch = container.querySelector('.toggle-switch');

    fireEvent.click(toggleSwitch);

    expect(onPassengerSelectedFnStub).toHaveBeenCalledWith('id1', true);
  });

  const createComponent = (props = {}) => {
    const { passengerSelections } = getSplitPnrDetails();
    const defaultProps = {
      passengerSelection: passengerSelections[0],
      value: true
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store);

    return render(
      <MockedForm>
        <PassengerCheckbox name="id1" {...finalProps} />
      </MockedForm>
    );
  };
});
