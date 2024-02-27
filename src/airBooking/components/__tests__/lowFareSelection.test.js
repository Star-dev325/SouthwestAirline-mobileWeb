import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import LowFareSelection from 'src/airBooking/components/lowFareSelection';

describe('LowFareSelection', () => {
  it('should render the date and bounds when a date is provided', () => {
    const { container: lfcSelectionComponent } = createComponent({ selectionDate: '2020-02-02' });
    const lfcSelection = lfcSelectionComponent.querySelector('.low-fare-calendar-page--selection');

    expect(lfcSelection.querySelector('.value')).toHaveTextContent('Sun, Feb 2, 2020 (ALB - AUS)');
    expect(lfcSelection.querySelector('.value')).toMatchSnapshot();
  });

  it('should render not show a date when it is not provided', () => {
    const { container: lfcSelectionComponent } = createComponent({ selectionDate: null });
    const lfcSelection = lfcSelectionComponent.querySelector('.low-fare-calendar-page--selection');

    expect(lfcSelection.querySelector('.value')).toHaveTextContent('- -');
    expect(lfcSelection.querySelector('.value')).toMatchSnapshot();
  });

  it('should have a selection class when provided', () => {
    const { container: lfcSelectionComponent } = createComponent({ selectionClass: 'inbound' });
    const lfcSelection = lfcSelectionComponent.querySelector('.low-fare-calendar-page--selection.inbound');

    expect(lfcSelection).toBeInTheDocument();
    expect(lfcSelection).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      origin: 'ALB',
      destination: 'AUS',
      header: 'Select Depart'
    };

    return render(<LowFareSelection {...{ ...defaultProps, ...props }} />);
  };
});
