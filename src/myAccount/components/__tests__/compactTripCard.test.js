import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import CompactTripCard from 'src/myAccount/components/compactTripCard';

describe('CompactTripCard Component', () => {
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

      expect(container.querySelector('.trip-card-header--trip-date').textContent).toEqual('Sep 29 - Oct 2');
    });

    it('should format date as with abbreviated weekday, abbreviated month and day of month, when displayDestinationFirst', () => {
      const { container } = renderComponent({ displayDestinationFirst: true });

      expect(container.querySelector('.trip-card-header--trip-date').textContent).toEqual('Sep 29 - Oct 2');
    });

    it('should render content with the destinationDescription', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.trip-card-header--destination-airport').textContent).toContain('Dallas');
    });
  });

  it('should display the trip card header with the destination first', () => {
    const { container } = renderComponent();

    expect(container.querySelector('.trip-card-header--trip-date').textContent).toContain('Sep 29');
  });

  it('should display the date format as a date range', () => {
    const { container } = renderComponent({ tripType: 'CAR' });

    expect(container.querySelector('.trip-card-header--trip-date').textContent).toEqual('Sep 29 - Oct 2');
  });

  const renderComponent = (props) => {
    const defaultProps = {
      confirmationNumber: '123456',
      dates: {
        first: '2017-09-29',
        second: '2017-10-02'
      },
      destinationDescription: 'Dallas',
      displayDestinationFirst: false,
      showConfirmationNumber: false,
      tripType: 'FLIGHT'
    };
    const compactTripCardProps = { ...defaultProps, ...props };

    return render(<CompactTripCard {...compactTripCardProps} />);
  };
});
