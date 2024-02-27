import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ParentOrGuardianForm from 'src/airBooking/components/parentOrGuardianForm';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM } from 'src/shared/constants/formIds';
import { getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('ParentOrGuardianForm', () => {
  it('should render the component correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the component correctly when isEditMode is true', () => {
    const { container } = createComponent({ isEditMode: true });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}, state = {}) => {
    const { body, disclaimerText, linkText } =
      getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo;
    const defaultProps = {
      disclaimerText,
      formId: AIR_BOOKING_PARENT_OR_GUARDIAN_FORM,
      infoText: body,
      linkText,
      onClickYoungTravelerParentConsent: () => {},
      onSubmit: () => {}
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <ParentOrGuardianForm {...finalProps} />
      </Provider>
    );
  };
});
