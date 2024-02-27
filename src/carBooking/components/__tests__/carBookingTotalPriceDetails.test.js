import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CarBookingTotalPrice from 'src/carBooking/components/carBookingTotalPrice';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('Car Booking Total Price Component', () => {
  let component;
  const carReservation = new CarReservationBuilder().build();

  beforeEach(() => {
    component = render(<CarBookingTotalPrice carReservation={carReservation} />);
    fireEvent.click(component.container.querySelector('[data-qa="price-breakdown"]'));
  });

  describe('total price details when breakdown is shown', () => {
    it('should display correct PriceLine numbers', () => {
      expect(screen.getByText('+ Tax')).not.toBeNull();
      expect(screen.getByText('+ AIRPORT CONCESSION RECOVERY:')).not.toBeNull();
      expect(screen.getByText('+ PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:')).not.toBeNull();
      expect(screen.getByText('+ ENERGY SURCHARGE:')).not.toBeNull();
    });

    it('should display correct PriceTotalLine numbers', () => {
      expect(component.container.querySelectorAll('.price-total--info-col')).toHaveLength(2);
    });

    it('should display total amount in price details', () => {
      const totalPrice = component.container.querySelector('[data-qa="total-amount"]');

      expect(totalPrice.textContent).toEqual('181.75');
    });
  });
});
