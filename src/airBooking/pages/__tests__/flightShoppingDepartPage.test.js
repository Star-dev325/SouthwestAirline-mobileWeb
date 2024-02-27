import { render } from '@testing-library/react';
import React from 'react';
import FlightShoppingDepartPage from 'src/airBooking/pages/flightShoppingDepartPage';
import FlightShoppingPage from 'src/airBooking/pages/flightShoppingPage';

jest.mock('src/airBooking/pages/flightShoppingPage', () => jest.fn(() => null));

describe('FlightShoppingDepartPage', () => {
  it('should render FlightShoppingPage with the correct props', () => {
    createComponent();

    const props = {
      params: {
        direction: 'outbound'
      }
    };

    expect(FlightShoppingPage).toHaveBeenCalledWith(props, {});
  });

  const createComponent = () => render(<FlightShoppingDepartPage />);
});
