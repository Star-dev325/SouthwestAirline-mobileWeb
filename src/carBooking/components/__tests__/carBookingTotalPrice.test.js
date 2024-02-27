import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CarBookingTotalPrice from 'src/carBooking/components/carBookingTotalPrice';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('Car Booking Total Price Component', () => {
  let wrapper;
  const carReservation = new CarReservationBuilder().build();

  beforeEach(() => {
    wrapper = render(<CarBookingTotalPrice carReservation={carReservation} />);
  });

  describe('render', () => {
    it('should render correct PriceTotalLine numbers', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display total amount', () => {
      const totalPrice = wrapper.container.querySelector('.price-total--info');

      expect(totalPrice.textContent).toContain(`${i18n('CAR_BOOKING__PURCHASE_FORM__TOTAL')}$181.75`);
    });
  });

  describe('when toggle breakdown', () => {
    it("should display text 'Show' when breakdown is hidden", () => {
      const { container } = wrapper;

      expect(container.querySelector('[data-qa="price-breakdown"]').textContent).toEqual(i18n('CAR_BOOKING__PURCHASE_FORM__SHOW_PRICE_BREAKDOWN'));
      expect(container.querySelector('.price-total--price-break-down')).toBeNull();
    });

    it("should display text 'Hide' when breakdown is shown", () => {
      const { container } = wrapper;
      const showPrice = container.querySelector('[data-qa="price-breakdown"]');

      fireEvent.click(showPrice);

      expect(showPrice.textContent).toEqual(i18n('CAR_BOOKING__PURCHASE_FORM__HIDE_PRICE_BREAKDOWN'));
      expect(container.querySelector('.price-line--title')).not.toBeNull();
      expect(container.querySelector('.price-total--price-break-down')).not.toBeNull();
    });
  });
});
