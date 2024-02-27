import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { CAR_BOOKING_CALENDAR_MODAL_ID } from 'src/carBooking/constants/carBookingConstants';
import * as FSMHelpers from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { CarBookingDateSelectorField } from 'src/shared/form/fields/carBookingDateSelectorField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingDateSelectorField', () => {
  let component;
  let showFullScreenModalMock;

  beforeEach(() => {
    showFullScreenModalMock = jest.spyOn(FSMHelpers, 'showFullScreenModal');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('default values', () => {
    it('should show placeholder and defaultDate when no pickUpDate and dropOffDate', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.car-booking-date-selector--date-label')[0].textContent).toBe('Pick-up Date');
      expect(container.querySelectorAll('.car-booking-date-selector--date-label')[1].textContent).toBe('Return Date');
    });

    it('should show defaultDate greyed when isDateChanged is false', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.gray4').length).toBe(4);
    });
  });

  describe('dates populated', () => {
    beforeEach(() => {
      const props = {
        value: {
          dropOffDate: '2018-09-01',
          isDateChanged: true,
          pickUpDate: '2018-08-28'
        }
      };

      component = createComponent(props);
    });

    it('should show formatted date when pickUpDate and dropOffDate have values', () => {
      const { container } = component;

      expect(container.querySelectorAll('.car-booking-search-form--triptych-side')[0].querySelector('.fluid').textContent).toBe('8/28');
      expect(container.querySelectorAll('.car-booking-date-selector--date-label')[0].textContent).toBe('Tue, Aug 28, 2018');
      expect(container.querySelectorAll('.car-booking-search-form--triptych-side')[1].querySelector('.fluid').textContent).toBe('9/01');
      expect(container.querySelectorAll('.car-booking-date-selector--date-label')[1].textContent).toBe('Sat, Sep 1, 2018');
    });

    it('should show defaultDate with greyed when isDateChanged is true', () => {
      const { container } = component;

      expect(container.querySelectorAll('.car-booking-date-selector--date-label.gray4').length).toBe(2);
    });
  });

  describe('modals', () => {
    it('should display calendar modal when pickUp date is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('div[data-qa="pickup-and-return-dates"]')[0]);

      expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_CALENDAR_MODAL_ID);
    });

    it('should display calendar modal when dropOff date is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('div[data-qa="pickup-and-return-dates"]')[1]);

      expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_CALENDAR_MODAL_ID);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      lastBookableDate: dayjs().add(90, 'days'),
      onChange: jest.fn(),
      value: {
        dropOffDate: '',
        pickUpDate: ''
      }
    };

    const modalId = 'modal_id';
    const state = {
      app: {},
      router: {
        location: {
          search: `_modal=${modalId}`
        }
      }
    };

    const MockedForm = createMockedForm(createMockedFormStore(state), {});
    const wrapper = render(
      <MockedForm initialFormData={{ ...defaultProps }} onSubmit={jest.fn()}>
        <CarBookingDateSelectorField {...defaultProps} {...props} />
      </MockedForm>
    );

    return wrapper;
  };
});
