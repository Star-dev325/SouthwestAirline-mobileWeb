import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import PartialBooking from 'src/airBooking/components/partialBooking';

describe('PartialBooking component', () => {
  let onSearchFlightClickStub;

  beforeEach(() => {
    const noop = () => {};

    onSearchFlightClickStub = jest.fn(noop);
  });

  describe('render', () => {
    it('should display title for partial booking', () => {
      const { container: partialBooking, baseElement } = createComponent();
      const message = partialBooking.querySelector('.swa-message');

      expect(baseElement).toMatchSnapshot();
      expect(message).toHaveTextContent('AIR_BOOKING__PARTIAL_BOOKING__HEADER');
    });

    it('should display partial booking message', () => {
      const { container: partialBooking } = createComponent();
      const customContainer = partialBooking.querySelector('.custom-container');

      expect(customContainer.querySelectorAll('div > p')[0]).toHaveTextContent(
        'AIR_BOOKING__PARTIAL_BOOKING__MAIN_INSTRUCTION'
      );
      expect(customContainer.querySelectorAll('div > p')[1]).toHaveTextContent(
        'AIR_BOOKING__PARTIAL_BOOKING__SUB_INSTRUCTION'
      );
    });

    it('should display the failed passenger name', () => {
      const { container: partialBooking } = createComponent();
      const passengerNames = partialBooking.querySelectorAll('span.xlarge');

      expect(passengerNames.length).toEqual(2);
      expect(passengerNames[0]).toHaveTextContent('Amber Awesome');
      expect(passengerNames[1]).toHaveTextContent('Ron Hackmann');
    });
  });

  it('should trigger onSearchFlightClick callback when user click the search flight button', () => {
    const { container: partialBooking } = createComponent();

    fireEvent.click(partialBooking.querySelector('[data-qa="search-flight"]'));

    expect(onSearchFlightClickStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      failedPassengers: ['Amber Awesome', 'Ron Hackmann'],
      onSearchFlightClick: onSearchFlightClickStub
    };

    return render(<PartialBooking {...defaultProps} {...props} />);
  };
});
