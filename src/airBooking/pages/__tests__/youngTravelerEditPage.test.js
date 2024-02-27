jest.mock('src/shared/selectors/appSelector', () => ({
  getCurrentAppFlow: jest.fn().mockReturnValue('air/booking')
}));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { YoungTravelerEditPage } from 'src/airBooking/pages/youngTravelerEditPage';
import { getParentOrGuardianFormData, getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('YoungTravelerEditPage', () => {
  let pushStub;

  beforeEach(() => {
    pushStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call push with "/air/booking/young-traveler-parent-consent" on parent consent link click', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.parent-or-guardian-form--disclaimer-text a'));

    expect(pushStub).toHaveBeenCalledWith('/air/booking/young-traveler-parent-consent');
  });

  it('should call push with "/air/booking/purchase.html" on submit', () => {
    const { container } = createComponent({});
    const parentOrGuardianForm = container.querySelector('form');

    fireEvent.submit(parentOrGuardianForm);

    expect(pushStub).toHaveBeenCalledWith('/air/booking/purchase.html');
  });

  const defaultState = {
    app: {
      formData: {
        AIR_BOOKING_PARENT_OR_GUARDIAN_FORM: {
          data: getParentOrGuardianFormData()
        }
      }
    }
  };
  const createComponent = (props = {}, state = defaultState) => {
    const defaultProps = {
      history: { push: pushStub },
      youngTravelerPageInfo:
        getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <YoungTravelerEditPage {...finalProps} />
      </Provider>
    );
  };
});
