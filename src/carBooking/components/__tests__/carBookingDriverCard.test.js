import { render } from '@testing-library/react';
import React from 'react';
import CarBookingDriverCard from 'src/carBooking/components/carBookingDriverCard';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('Car Booking Driver Card Component', () => {
  let component;
  const carReservation = new CarReservationBuilder().build();
  const confirmationNumber = '04372326US0';
  const driver = {
    firstName: 'XF',
    lastName: 'YUAN'
  };

  beforeEach(() => {
    component = render(
      <CarBookingDriverCard carReservation={carReservation} confirmationNumber={confirmationNumber} driver={driver} />
    );
  });

  describe('render', () => {
    it('should render correctly with CarReservationItinerary and CarReservationDetail', () => {
      const { container } = component;
      
      expect(container).toMatchSnapshot();
    });
  });
});
