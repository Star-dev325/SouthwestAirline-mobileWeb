import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import {
  CAR_BOOKING_DROPOFF_CITY_MODAL_ID,
  CAR_BOOKING_PICKUP_CITY_MODAL_ID
} from 'src/carBooking/constants/carBookingConstants';
import * as FSMHelpers from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import CarBookingCitySelectorField from 'src/shared/form/fields/carBookingCitySelectorField';
import { getCarLocations } from 'test/builders/model/carLocationsBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Car Booking City Selector Field', () => {
  let onChangeMock;
  let onSubmitMock;
  let retrieveCarLocationsFnMock;
  let showFullScreenModalMock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    onSubmitMock = jest.fn();
    retrieveCarLocationsFnMock = jest.fn();
    showFullScreenModalMock = jest.spyOn(FSMHelpers, 'showFullScreenModal');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('display', () => {
    it('should display the placeholder text when there is no value for the car city', () => {
      const { getAllByText, getByText } = createComponent();

      expect(getByText('Pick-up')).toBeTruthy();
      expect(getAllByText('CAR_BOOKING__SELECT')).toBeTruthy();
    });

    it('should display the car icon', () => {
      const { container } = createComponent();

      expect(container.querySelector('.icon_car')).toBeTruthy();
    });

    it('should display formatted car city when passing the value of city code', () => {
      const props = {
        value: {
          dropOff: 'HOU',
          pickUp: 'DAL'
        }
      };

      const { container } = createComponent(props);

      const dropOff = container.querySelectorAll('[data-qa="car-drop-off"]');
      const pickUp = container.querySelectorAll('[data-qa="car-pick-up"]');

      expect(pickUp[0].textContent).toBe('DALDallas (Love Field), TX, TX');
      expect(dropOff[0].textContent).toBe('HOUHouston (Hobby), TX');
    });
  });

  describe('modals', () => {
    it('should display car station modal when pickUp is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('div.clickable-div')[0]);

      expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_PICKUP_CITY_MODAL_ID);
    });

    it('should display car station modal when dropOff is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('div.clickable-div')[1]);

      expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_DROPOFF_CITY_MODAL_ID);
    });

    it('should display car station modal and fetch carLocations when carLocations is empty', () => {
      const { container } = createComponent({
        carLocations: [],
        retrieveCarLocationsFn: retrieveCarLocationsFnMock
      });

      fireEvent.click(container.querySelectorAll('div.clickable-div')[0]);

      expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_PICKUP_CITY_MODAL_ID);
      expect(retrieveCarLocationsFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const MockedForm = createMockedForm(createMockedFormStore());

    const defaultProps = {
      carLocations: getCarLocations(),
      name: 'citySelectField',
      onChange: onChangeMock,
      value: {
        dropOff: '',
        pickUp: ''
      }
    };

    return render(
      <MockedForm onSubmit={onSubmitMock}>
        <CarBookingCitySelectorField {...defaultProps} {...props} />
      </MockedForm>
    );
  };
});
