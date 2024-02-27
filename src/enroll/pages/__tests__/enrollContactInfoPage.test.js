import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { EnrollContactInfoPage } from 'src/enroll/pages/enrollContactInfoPage';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EnrollContactInfoPage', () => {
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

  it('should render progress bar correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.step-item--inner')).not.toBeNull();
  });

  it('should render enroll contact info form', () => {
    const { container } = createComponent();

    expect(container.querySelector('.enroll-contact-info-form')).not.toBeNull();
  });

  it('should call push and analytics track form when form is successfully submitted', () => {
    const { container } = createComponent();
    const form = container.querySelector('.enroll-contact-info-form');

    fireEvent.change(container.querySelector('input[name="addressLine1"]'), { target: { value: '123 Riverside Dr' } });
    fireEvent.change(container.querySelector('input[name="zipOrPostalCode"]'), { target: { value: '76021' } });
    fireEvent.change(container.querySelector('input[name="city"]'), { target: { value: 'Bedford' } });
    fireEvent.change(container.querySelector('input[name="phoneNumber"]'), { target: { value: '555-321-4455' } });
    fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: 'test@yahoo.com' } });
    fireEvent.change(container.querySelector('input[name="confirmedEmail"]'), { target: { value: 'test@yahoo.com' } });
    fireEvent.change(container.querySelector('[name="stateProvinceRegion"]'), { target: { value: 'TX' } });
    fireEvent.submit(form);

    expect(analyticsTrackSubmitFormFnMock).toHaveBeenCalledWith('enroll-contact-info');
    expect(pushMock).toHaveBeenCalledWith(getNormalizedRoute({ routeName: 'security' }));
  });

  it('should trigger form validation and display error header when Continue button is pressed and required fields are empty', () => {
    const { container } = createComponent();

    fireEvent.submit(container.querySelector('.enroll-contact-info-form'));

    expect(container.querySelector('.error-header').textContent).toEqual('Please correct the highlighted errors.');
    expect(analyticsTrackSubmitFormFnMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  const createComponent = () => {
    const mockStore = createMockedFormStore();
    const defaultProps = {
      analyticsTrackSubmitFormFn: analyticsTrackSubmitFormFnMock,
      push: pushMock
    };

    return render(
      <Provider store={mockStore}>
        <EnrollContactInfoPage {...defaultProps} />
      </Provider>
    );
  };
});
