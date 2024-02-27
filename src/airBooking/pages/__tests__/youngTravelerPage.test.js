import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { YoungTravelerPage } from 'src/airBooking/pages/youngTravelerPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import {
  getParentOrGuardianFormData,
  getPassengerValidationDetails
} from 'test/builders/model/youngTravelerPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('YoungTravelerPage', () => {
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

  it('should push the young traveler parent consent page', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.parent-or-guardian-form--disclaimer-text').querySelectorAll('a')[0]);

    expect(pushStub).toHaveBeenCalled();
  });

  it('should call push with "/air/booking/purchase.html" on submit', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');

    const stateWithFormData = {
      app: {
        formData: {
          AIR_BOOKING_PARENT_OR_GUARDIAN_FORM: {
            data: getParentOrGuardianFormData()
          }
        }
      }
    };
    const { container } = createComponent({}, stateWithFormData);
    const parentOrGuardianForm = container.querySelector('form');

    fireEvent.submit(parentOrGuardianForm);

    expect(pushStub).toHaveBeenCalledWith('/air/booking/purchase.html');
  });

  it('should render company name if it is a swabiz account', () => {
    const { container } = createComponent({
      selectedCompanyName: 'lexcorp'
    });

    expect(container.querySelector('.company-name-banner--label').textContent).toEqual('lexcorp');
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      flightPricingPageBounds: new PricesBuilder().build().flightPricingPage.bounds,
      history: {
        location: {
          pathname: '/air/booking/young-traveler',
          search: ''
        },
        push: pushStub
      },
      youngTravelerPageInfo:
        getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <YoungTravelerPage {...finalProps} />
      </Provider>
    );
  };
});
