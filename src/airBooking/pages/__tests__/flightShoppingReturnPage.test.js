import { render } from '@testing-library/react';
import React from 'react';
import FlightShoppingPage from 'src/airBooking/pages/flightShoppingPage';
import FlightShoppingReturnPage from 'src/airBooking/pages/flightShoppingReturnPage';

jest.mock('src/airBooking/pages/flightShoppingPage', () => jest.fn(() => null));

describe('FlightShoppingReturnPage', () => {
  it('should render FlightShoppingPage with the correct props', () => {
    createComponent();

    const props = {
      params: {
        direction: 'inbound'
      }
    };

    expect(FlightShoppingPage).toHaveBeenCalledWith(props, {});
  });

  const createComponent = () => render(<FlightShoppingReturnPage />);
});
