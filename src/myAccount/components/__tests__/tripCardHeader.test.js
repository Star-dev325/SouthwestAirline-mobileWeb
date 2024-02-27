import { render } from '@testing-library/react';
import React from 'react';
import TripCardHeader from 'src/myAccount/components/tripCardHeader';

describe('TripCardHeader Component', () => {
  describe('icon', () => {
    it('should render flight icon for flight trip', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.icon_airplane-depart')).not.toBeNull();
    });

    it('should render car icon for car trip', () => {
      const { container } = renderComponent({ tripType: 'CAR' });

      expect(container.querySelector('.icon_car')).not.toBeNull();
    });
  });

  describe('date and destination', () => {
    it('should render date range from dates', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.trip-card-header--trip-date').textContent).toContain('Sep 29 - 30');
    });

    it('should format date as with abbreviated weekday, abbreviated month and day of month, when displayWeekday', () => {
      const { container } = renderComponent({ displayWeekday: true, departureDate: '2017-09-30' });

      expect(container.querySelector('.trip-card-header--trip-date').textContent).toContain('Sat, Sep 30');
    });

    it('should render content with the destinationDescription', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.trip-card-header--destination-airport').textContent).toContain('Austin');
    });
  });

  describe('confirmation number', () => {
    it('should render the confirmation number and not the trip icon', () => {
      const { container } = renderComponent({ showConfirmationNumber: true });

      expect(container.querySelector('.trip-card-header--confirmation-number')).not.toBeNull();
      expect(container.querySelector('.icon')).toBeNull();
    });

    it('should not render the confirmation number but render trip icon', () => {
      const { container } = renderComponent({ showConfirmationNumber: false });

      expect(container.querySelector('.trip-card-header--confirmation-number')).toBeNull();
      expect(container.querySelector('.icon')).not.toBeNull();
    });
  });

  const renderComponent = (props) => {
    const defaultProps = {
      dates: {
        first: '2017-09-29',
        second: '2017-09-30'
      },
      destinationDescription: 'Austin',
      tripType: 'FLIGHT',
      confirmationNumber: 'ABC123'
    };
    const tripCardHeaderProps = { ...defaultProps, ...props };

    return render(<TripCardHeader {...tripCardHeaderProps} />);
  };
});
