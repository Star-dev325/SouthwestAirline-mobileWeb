import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { EnrollPersonalInfoPage } from 'src/enroll/pages/enrollPersonalInfoPage';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EnrollPersonalInfoPage', () => {
  let pushMock;
  let analyticsTrackSubmitFormFnMock;

  beforeEach(() => {
    pushMock = jest.fn();
    analyticsTrackSubmitFormFnMock = jest.spyOn(AnalyticsActions, 'trackSubmitForm');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render progress bar', () => {
    const { container } = createComponent();

    expect(container.querySelector('.step-item--inner')).not.toBeNull();
  });

  it('should render enroll personal info form', () => {
    const { container } = createComponent();

    expect(container.querySelector('.enroll-personal-info-form')).not.toBeNull();
  });

  it('should call push and analytics track form when form is successfully submitted', () => {
    const { container } = createComponent();
    const selectOptions = container.querySelectorAll('select');

    fireEvent.change(container.querySelector('input[name="firstName"]'), { target: { value: 'Fred' } });
    fireEvent.change(container.querySelector('input[name="lastName"]'), { target: { value: 'Flint' } });
    fireEvent.change(container.querySelector('input[name="middleName"]'), { target: { value: 'Edward' } });
    fireEvent.change(container.querySelector('input[name="preferredName"]'), { target: { value: 'Eddy' } });
    fireEvent.change(container.querySelector('[name="suffix"]'), { target: { value: 'CEO' } });
    fireEvent.change(selectOptions[0], { target: { value: 'CEO' } });
    fireEvent.change(selectOptions[1], { target: { value: '03' } });
    fireEvent.change(selectOptions[2], { target: { value: '23' } });
    fireEvent.change(selectOptions[3], { target: { value: '1990' } });
    fireEvent.click(container.querySelectorAll('.switch-button--item')[0]);
    fireEvent.submit(container.querySelector('form'));

    expect(analyticsTrackSubmitFormFnMock).toHaveBeenCalledWith('enroll-personal-info');
    expect(pushMock).toHaveBeenCalledWith(getNormalizedRoute({ routeName: 'contact' }));
  });

  it('should trigger form validation and display error header when Continue button is pressed and required fields are empty', () => {
    const { container } = createComponent();

    fireEvent.submit(container.querySelector('.enroll-personal-info-form'));

    expect(container.querySelector('.error-header').textContent).toEqual('Please correct the highlighted errors.');
    expect(analyticsTrackSubmitFormFnMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  const createComponent = () => {
    const mockStore = createMockedFormStore();
    const defaultProps = {
      analyticsTrackSubmitFormFn: analyticsTrackSubmitFormFnMock,
      fieldNameEnabledForChange: undefined,
      LOYALTY_AGE_VERIFICATION: false,
      minAgeThreshold: 13,
      push: pushMock
    };

    return render(
      <Provider store={mockStore}>
        <EnrollPersonalInfoPage {...defaultProps} />
      </Provider>
    );
  };
});
