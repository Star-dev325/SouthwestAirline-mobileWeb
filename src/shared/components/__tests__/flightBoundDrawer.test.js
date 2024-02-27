import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FlightBoundDrawer from 'src/shared/components/flightBoundDrawer';

describe('flightBound', () => {
  let searchFlightsFromBoundMock;
  const bound = { destinationAirport: 'AUS', originAirport: 'MDW' };

  beforeEach(() => {
    searchFlightsFromBoundMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { container } = createComponent({ bound });

    expect(container).toMatchSnapshot();
  });

  it('should send the request if bound is not open', () => {
    const { container } = createComponent({ bound });

    fireEvent.click(container.getElementsByClassName('flight-bound--container')[0]);

    expect(searchFlightsFromBoundMock).toHaveBeenCalledWith('MDW', 'AUS', false);
  });

  it('should not send the request again if bound is open', () => {
    const { container } = createComponent({ bound, isBoundDrawerOpen: true });

    fireEvent.click(container.getElementsByClassName('flight-bound--container')[0]);

    expect(searchFlightsFromBoundMock).toHaveBeenCalledWith('MDW', 'AUS', true);
  });

  it('should contain unavailable text if bound is unavailable', () => {
    const { container } = createComponent({ bound, isBoundUnavailable: true });

    expect(container).toMatchSnapshot();
  });

  it('should not send the request if bound is unavailable', () => {
    const { container } = createComponent({ bound, isBoundUnavailable: true });

    fireEvent.click(container.getElementsByClassName('flight-bound--container')[0]);

    expect(searchFlightsFromBoundMock).not.toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      bound: [],
      isBoundDrawerOpen: false,
      isBoundUnavailable: false,
      searchFlightsFromBound: searchFlightsFromBoundMock
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(<FlightBoundDrawer {...finalProps} />);
  };
});
